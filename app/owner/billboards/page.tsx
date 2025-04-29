"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import * as z from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PocketBase from "pocketbase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Layout from "@/components/Layout";
import Image from "next/image";
import { Edit, Trash2, Plus, Upload } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

// Initialize PocketBase client
const pb = new PocketBase(
   process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://localhost:8090"
);

// Define the billboard type to match PocketBase schema
interface Billboard {
   id: string;
   collectionId: string;
   collectionName: string;
   owner_id: string[];
   name: string;
   location: string;
   latitude: number;
   longitude: number;
   price_per_month: number;
   status: string[];
   image: string;
   description: string;
   size: string;
   created: string;
   updated: string;
}

// Define the status options
const STATUS_OPTIONS = ["Available", "Booked", "Under Maintenance"] as const;
type StatusType = (typeof STATUS_OPTIONS)[number];

// Define the form schema with zod
const billboardFormSchema = z.object({
   name: z.string().min(1, { message: "Billboard name is required" }),
   location: z.string().min(1, { message: "Location is required" }),
   latitude: z.coerce.number({
      required_error: "Latitude is required",
      invalid_type_error: "Latitude must be a number",
   })
   .min(-90, { message: "Latitude must be between -90 and 90" })
   .max(90, { message: "Latitude must be between -90 and 90" })
   .refine(val => val !== 0, { message: "Latitude cannot be zero" }),
   longitude: z.coerce.number({
      required_error: "Longitude is required",
      invalid_type_error: "Longitude must be a number",
   })
   .min(-180, { message: "Longitude must be between -180 and 180" })
   .max(180, { message: "Longitude must be between -180 and 180" })
   .refine(val => val !== 0, { message: "Longitude cannot be zero" }),
   price_per_month: z.coerce.number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
   }),
   status: z.enum(STATUS_OPTIONS, {
      required_error: "Status is required",
   }),
   description: z.string().optional(),
   size: z.string()
     .min(1, { message: "Size is required" })
     .regex(/^\d+ft x \d+ft$/, { message: "Size must be in the format '_ft x _ft'" }),
});

type BillboardFormValues = z.infer<typeof billboardFormSchema>;

export default function Billboards() {
   const { data: session } = useSession();
   const currentOwner = session?.user?.id || "";
   const queryClient = useQueryClient();

   const [isOpen, setIsOpen] = useState(false);
   const [currentBillboard, setCurrentBillboard] = useState<Billboard | null>(
      null
   );
   const [imageFile, setImageFile] = useState<File | null>(null);
   const [imagePreview, setImagePreview] = useState<string>("");
   const [toastMessage, setToastMessage] = useState<{
      show: boolean;
      message: string;
      type: "success" | "error";
   }>({ show: false, message: "", type: "success" });

   // Form definition
   const form = useForm<BillboardFormValues>({
      resolver: zodResolver(billboardFormSchema),
      defaultValues: {
         name: "",
         location: "",
         latitude: 0,
         longitude: 0,
         price_per_month: 0,
         status: "Available" as StatusType,
         description: "",
         size: "",
      },
   });

   // Reset form when modal closes
   useEffect(() => {
      if (!isOpen) {
         resetForm();
      }
   }, [isOpen]);

   // filter owner
   const { data: billboards = [], isLoading } = useQuery({
      queryKey: ["billboards", currentOwner], 
      queryFn: async () => {
         try {
            if (!currentOwner) {
               return [];
            }
            
            // Fetch only billboards owned by the current user
            const records = await pb
               .collection("billboards")
               .getFullList<Billboard>({
                  filter: `owner_id ~ "${currentOwner}"`,
               });
            return records;
         } catch (error) {
            console.error("Failed to fetch billboards:", error);
            showToast("Failed to fetch billboards", "error");
            return [];
         }
      },
      // To run the query only when there is currentOwner
      enabled: !!currentOwner,
   });

   // Create mutation
   const createMutation = useMutation({
      mutationFn: async (formData: BillboardFormValues) => {
         try {
            // Create the initial data object (without image)
            const data: Record<string, any> = {
               name: formData.name,
               location: formData.location,
               latitude: formData.latitude,
               longitude: formData.longitude,
               price_per_month: formData.price_per_month,
               status: [formData.status],
               owner_id: [currentOwner],
               description: formData.description,
               size: formData.size,
            };

            // for image
            if (imageFile) {
               const formDataWithFile = new FormData();

               // Add all the fields to FormData
               Object.entries(data).forEach(([key, value]) => {
                  if (Array.isArray(value)) {
                     // Handle arrays like status and owner_id
                     value.forEach((val) => {
                        formDataWithFile.append(key, val);
                     });
                  } else if (value !== undefined && value !== null) {
                     formDataWithFile.append(key, value);
                  }
               });

               // Add the image file
               formDataWithFile.append("image", imageFile);

               // Create the record with the image included
               return await pb
                  .collection("billboards")
                  .create(formDataWithFile);
            } else {
               // Create without image
               return await pb.collection("billboards").create(data);
            }
         } catch (error) {
            console.error("Failed to create billboard:", error);
            throw error;
         }
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["billboards", currentOwner] });
         showToast("Billboard created successfully", "success");
         setIsOpen(false);
      },
      onError: (error) => {
         console.error("Error creating billboard:", error);
         showToast(
            `Failed to create billboard: ${error instanceof Error ? error.message : "Unknown error"}`,
            "error"
         );
      },
   });

   // Update mutation
   const updateMutation = useMutation({
      mutationFn: async ({
         id,
         formData,
      }: {
         id: string;
         formData: BillboardFormValues;
      }) => {
         try {
            if (imageFile) {
               // If new image, use FormData for the update
               const formDataWithFile = new FormData();

               // Add all form fields
               formDataWithFile.append("name", formData.name);
               formDataWithFile.append("location", formData.location);
               formDataWithFile.append(
                  "latitude",
                  formData.latitude.toString()
               );
               formDataWithFile.append(
                  "longitude",
                  formData.longitude.toString()
               );
               formDataWithFile.append(
                  "price_per_month",
                  formData.price_per_month.toString()
               );
               formDataWithFile.append("status", formData.status);
               formDataWithFile.append("owner_id", currentOwner);
               formDataWithFile.append(
                  "description",
                  formData.description || ""
               );
               formDataWithFile.append("size", formData.size);

               // Add the image file
               formDataWithFile.append("image", imageFile);

               // Update with all data including image
               return await pb
                  .collection("billboards")
                  .update(id, formDataWithFile);
            } else {
               // Update without changing the image
               const data = {
                  name: formData.name,
                  location: formData.location,
                  latitude: formData.latitude,
                  longitude: formData.longitude,
                  price_per_month: formData.price_per_month,
                  status: [formData.status],
                  owner_id: [currentOwner],
                  description: formData.description,
                  size: formData.size,
               };

               return await pb.collection("billboards").update(id, data);
            }
         } catch (error) {
            console.error("Failed to update billboard:", error);
            throw error;
         }
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["billboards", currentOwner] });
         showToast("Billboard updated successfully", "success");
         setIsOpen(false);
      },
      onError: (error) => {
         console.error("Error updating billboard:", error);
         showToast(
            `Failed to update billboard: ${error instanceof Error ? error.message : "Unknown error"}`,
            "error"
         );
      },
   });

   // Delete mutation
   const deleteMutation = useMutation({
      mutationFn: async (id: string) => {
         try {
            await pb.collection("billboards").delete(id);
            return id;
         } catch (error) {
            console.error("Failed to delete billboard:", error);
            throw error;
         }
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["billboards", currentOwner] });
         showToast("Billboard deleted successfully", "success");
      },
      onError: (error) => {
         console.error("Error deleting billboard:", error);
         showToast(
            `Failed to delete billboard: ${error instanceof Error ? error.message : "Unknown error"}`,
            "error"
         );
      },
   });

   // Handle form submission
   const onSubmit = (data: BillboardFormValues) => {
      if (currentBillboard) {
         // Update existing billboard
         updateMutation.mutate({
            id: currentBillboard.id,
            formData: data,
         });
      } else {
         // Create new billboard
         createMutation.mutate(data);
      }
   };

   // Handle file input change
   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
         showToast("Image size should be less than 5MB", "error");
         return;
      }

      // Check file type
      if (!file.type.match("image.*")) {
         showToast("Only image files are allowed", "error");
         return;
      }

      // Store the file for later upload
      setImageFile(file);

      // Create object URL for preview
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);

      showToast(
         "Image selected. It will be uploaded when you save.",
         "success"
      );
   };

   // Handle edit button click
   const handleEdit = (billboard: Billboard) => {
      setCurrentBillboard(billboard);

      // Set the image preview
      setImagePreview(
         billboard.image ? pb.files.getUrl(billboard, billboard.image) : ""
      );

      // Reset form with billboard data
      form.reset({
         name: billboard.name,
         location: billboard.location,
         latitude: billboard.latitude,
         longitude: billboard.longitude,
         price_per_month: billboard.price_per_month,
         status: billboard.status[0] as StatusType,
         description: billboard.description || "",
         size: billboard.size,
      });

      setIsOpen(true);
   };

   // Handle delete button click
   const handleDelete = (id: string) => {
      if (confirm("Are you sure you want to delete this billboard?")) {
         deleteMutation.mutate(id);
      }
   };

   // Reset form state
   const resetForm = () => {
      form.reset({
         name: "",
         location: "",
         latitude: 0,
         longitude: 0,
         price_per_month: 0,
         status: "Available",
         description: "",
         size: "",
      });
      setCurrentBillboard(null);
      setImageFile(null);
      setImagePreview("");
   };

   // Toast message handler
   const showToast = (message: string, type: "success" | "error") => {
      setToastMessage({ show: true, message, type });
      setTimeout(() => {
         setToastMessage({ show: false, message: "", type: "success" });
      }, 3000);
   };

   // Get image URL helper
   const getBillboardImageUrl = (billboard: Billboard) => {
      if (!billboard.image) return "/api/placeholder/400/320";

      if (billboard.image.startsWith("http")) {
         return billboard.image;
      } else {
         try {
            return pb.files.getUrl(billboard, billboard.image);
         } catch (error) {
            return "/api/placeholder/400/320";
         }
      }
   };

   // Toast component
   const Toast = () => {
      if (!toastMessage.show) return null;

      return (
         <div
            className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${
               toastMessage.type === "success" ? "bg-green-500" : "bg-red-500"
            } text-white z-50 transition-opacity`}
         >
            {toastMessage.message}
         </div>
      );
   };

   return (
      <Layout title="Billboard Management">
         <div className="max-w-7xl mx-auto p-6">
            {/* Toast notification */}
            <Toast />

            <div className="flex justify-between items-center mb-8">
               <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-black to-red-700">
                  My Billboard Inventory
               </h1>

               <Dialog
                  open={isOpen}
                  onOpenChange={(open) => {
                     setIsOpen(open);
                  }}
               >
                  <DialogTrigger asChild>
                     <Button className="bg-red-500 hover:bg-red-700 text-white flex items-center gap-2">
                        <Plus size={20} />
                        Add Billboard
                     </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                     <DialogHeader>
                        <DialogTitle>
                           {currentBillboard
                              ? "Edit Billboard"
                              : "Add New Billboard"}
                        </DialogTitle>
                     </DialogHeader>
                     <Form {...form}>
                        <form
                           onSubmit={form.handleSubmit(onSubmit)}
                           className="space-y-4"
                        >
                           <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Billboard Name</FormLabel>
                                    <FormControl>
                                       <Input
                                          placeholder="Enter billboard name"
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={form.control}
                              name="location"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                       <Input
                                          placeholder="Enter location"
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <div className="grid grid-cols-2 gap-4">
                              <FormField
                                 control={form.control}
                                 name="latitude"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel>Latitude</FormLabel>
                                       <FormControl>
                                          <Input
                                             type="number"
                                             step="any"
                                             placeholder="Enter latitude"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />

                              <FormField
                                 control={form.control}
                                 name="longitude"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel>Longitude</FormLabel>
                                       <FormControl>
                                          <Input
                                             type="number"
                                             step="any"
                                             placeholder="Enter longitude"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>

                           <FormField
                              control={form.control}
                              name="price_per_month"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Price (USD/month)</FormLabel>
                                    <FormControl>
                                       <Input
                                          type="number"
                                          placeholder="Enter monthly price"
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={form.control}
                              name="size"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Size</FormLabel>
                                    <FormControl>
                                       <Input
                                          placeholder="e.g., 10ft x 20ft"
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={form.control}
                              name="description"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                       <Textarea
                                          placeholder="Enter billboard description"
                                          {...field}
                                          rows={3}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={form.control}
                              name="status"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                       onValueChange={field.onChange}
                                       defaultValue={field.value}
                                       value={field.value}
                                    >
                                       <FormControl>
                                          <SelectTrigger>
                                             <SelectValue placeholder="Select status" />
                                          </SelectTrigger>
                                       </FormControl>
                                       <SelectContent>
                                          <SelectItem value="Available">
                                             Available
                                          </SelectItem>
                                          <SelectItem value="Booked">
                                             Booked
                                          </SelectItem>
                                          <SelectItem value="Under Maintenance">
                                             Under Maintenance
                                          </SelectItem>
                                       </SelectContent>
                                    </Select>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           {/* Billboard Image Field */}
                           <div className="space-y-2">
                              <Label>Billboard Image</Label>
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                 <input
                                    type="file"
                                    id="image-upload"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                 />
                                 <label
                                    htmlFor="image-upload"
                                    className="cursor-pointer"
                                 >
                                    <div className="flex flex-col items-center">
                                       <Button
                                          type="button"
                                          variant="outline"
                                          className="mb-4"
                                       >
                                          <Upload className="h-4 w-4 mr-2" />
                                          Choose Image
                                       </Button>
                                       <p className="text-sm text-gray-500 mb-2">
                                          JPEG, PNG (Max 5MB)
                                       </p>

                                       {imagePreview && (
                                          <div className="mt-2 relative h-40 w-full">
                                             <Image
                                                src={imagePreview}
                                                alt="Billboard Preview"
                                                layout="fill"
                                                objectFit="contain"
                                                className="rounded-md"
                                             />
                                          </div>
                                       )}
                                    </div>
                                 </label>
                              </div>
                           </div>

                           <div className="flex justify-end space-x-3 pt-4">
                              <Button
                                 type="button"
                                 variant="outline"
                                 onClick={() => setIsOpen(false)}
                              >
                                 Cancel
                              </Button>
                              <Button
                                 type="submit"
                                 className="bg-red-500 hover:bg-red-700 text-white"
                                 disabled={
                                    createMutation.isPending ||
                                    updateMutation.isPending
                                 }
                              >
                                 {createMutation.isPending ||
                                 updateMutation.isPending
                                    ? "Saving..."
                                    : currentBillboard
                                      ? "Update Billboard"
                                      : "Add Billboard"}
                              </Button>
                           </div>
                        </form>
                     </Form>
                  </DialogContent>
               </Dialog>
            </div>

            {isLoading ? (
               <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500"></div>
               </div>
            ) : (
               <div className="grid gap-6">
                  {billboards.length === 0 ? (
                     <div className="text-center py-10">
                        <p className="text-gray-500">
                           No billboards found. Add your first billboard.
                        </p>
                     </div>
                  ) : (
                     billboards.map((board) => (
                        <Card
                           key={board.id}
                           className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                           <div className="flex flex-col md:flex-row">
                              <div className="w-full md:w-96 h-64 relative">
                                 <Image
                                    src={getBillboardImageUrl(board)}
                                    alt={board.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                                 />
                              </div>

                              <div className="flex-1 p-6">
                                 <div className="flex justify-between items-start">
                                    <div className="space-y-4">
                                       <h2 className="text-2xl font-bold text-gray-900">
                                          {board.name}
                                       </h2>
                                       <div className="space-y-2 text-gray-600">
                                          <p>
                                             <span className="font-semibold">
                                                Location:
                                             </span>{" "}
                                             {board.location}
                                          </p>
                                          <p>
                                             <span className="font-semibold">
                                                Coordinates:
                                             </span>{" "}
                                             {board.latitude}, {board.longitude}
                                          </p>
                                          <p>
                                             <span className="font-semibold">
                                                Size:
                                             </span>{" "}
                                             {board.size}
                                          </p>
                                          <p>
                                             <span className="font-semibold">
                                                Status:
                                             </span>{" "}
                                             <span
                                                className={`${
                                                   board.status[0] ===
                                                   "Available"
                                                      ? "text-green-600"
                                                      : board.status[0] ===
                                                          "Booked"
                                                        ? "text-red-600"
                                                        : "text-yellow-600"
                                                }`}
                                             >
                                                {board.status[0]}
                                             </span>
                                          </p>
                                          {board.description && (
                                             <p>
                                                <span className="font-semibold">
                                                   Description:
                                                </span>{" "}
                                                {board.description}
                                             </p>
                                          )}
                                          <p className="text-xl font-bold text-red-600">
                                             $
                                             {Number(
                                                board.price_per_month
                                             ).toLocaleString()}
                                             /month
                                          </p>
                                       </div>
                                    </div>

                                    <div className="flex gap-2">
                                       <Button
                                          className="bg-black hover:opacity-80 text-white"
                                          size="sm"
                                          onClick={() => handleEdit(board)}
                                       >
                                          <Edit size={18} />
                                       </Button>

                                       <Button
                                          className="bg-red-500 hover:bg-red-600 text-white"
                                          size="sm"
                                          onClick={() => handleDelete(board.id)}
                                          disabled={deleteMutation.isPending}
                                       >
                                          <Trash2 size={18} />
                                       </Button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </Card>
                     ))
                  )}
               </div>
            )}
         </div>
      </Layout>
   );
}