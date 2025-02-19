"use client";

// import React, { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { ChevronRight } from "lucide-react";

// interface FormData {
//    firstName: string;
//    lastName: string;
//    email: string;
//    confirmEmail: string;
//    phone: string;
//    mediaType: "photo" | "video";
//    file: File | null;
//    frameStyle: "red" | "birthday";
//    termsAccepted: boolean;
//    photoVideoAcknowledged: boolean;
// }

// const BillboardBookingForm = () => {
//    const [formData, setFormData] = useState<FormData>({
//       firstName: "",
//       lastName: "",
//       email: "",
//       confirmEmail: "",
//       phone: "",
//       mediaType: "photo",
//       file: null,
//       frameStyle: "red",
//       termsAccepted: false,
//       photoVideoAcknowledged: false,
//    });

//    const [preview, setPreview] = useState<string | null>(null);

//    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const file = e.target.files?.[0];
//       if (file) {
//          setFormData({ ...formData, file });
//          const reader = new FileReader();
//          reader.onloadend = () => {
//             setPreview(reader.result as string);
//          };
//          reader.readAsDataURL(file);
//       }
//    };

//    const BillboardPreview = ({
//       frameStyle,
//    }: {
//       frameStyle: "red" | "birthday";
//    }) => {
//       return (
//          <div className="relative w-full max-w-md mx-auto mb-8">
//             <div
//                className={`relative aspect-[16/9] rounded-lg overflow-hidden ${
//                   frameStyle === "red" ? "bg-red-100" : "bg-gray-100"
//                }`}
//             >
//                {/* Frame Border */}
//                <div
//                   className={`absolute inset-0 border-8 ${
//                      frameStyle === "red" ? "border-red-500" : "border-gray-300"
//                   } rounded-lg`}
//                >
//                   {/* Preview Area */}
//                   {preview ? (
//                      <div className="absolute inset-2 overflow-hidden">
//                         <img
//                            src={preview}
//                            alt="Billboard Preview"
//                            className="w-full h-full object-cover"
//                         />
//                      </div>
//                   ) : (
//                      <div className="absolute inset-2 flex items-center justify-center bg-gray-50">
//                         <p className="text-gray-400">
//                            Image preview will appear here
//                         </p>
//                      </div>
//                   )}
//                </div>
//             </div>
//          </div>
//       );
//    };

//    return (
//       <div className="max-w-3xl mx-auto p-6">
//          <Card className="p-6">
//             <h2 className="text-2xl font-bold mb-6">
//                Step 2: Book Your Billboard!
//             </h2>

//             {/* Billboard Preview Section */}
//             <div className="mb-8">
//                <h3 className="text-lg font-semibold mb-4">Billboard Preview</h3>
//                <div className="flex gap-4 mb-4">
//                   <button
//                      className={`p-2 rounded ${formData.frameStyle === "red" ? "ring-2 ring-red-500" : ""}`}
//                      onClick={() =>
//                         setFormData({ ...formData, frameStyle: "red" })
//                      }
//                   >
//                      Red Frame
//                   </button>
//                   <button
//                      className={`p-2 rounded ${formData.frameStyle === "birthday" ? "ring-2 ring-blue-500" : ""}`}
//                      onClick={() =>
//                         setFormData({ ...formData, frameStyle: "birthday" })
//                      }
//                   >
//                      Birthday Frame
//                   </button>
//                </div>
//                <BillboardPreview frameStyle={formData.frameStyle} />
//             </div>

//             <div className="grid grid-cols-2 gap-4 mb-6">
//                <div>
//                   <Label htmlFor="firstName">First Name</Label>
//                   <Input
//                      id="firstName"
//                      value={formData.firstName}
//                      onChange={(e) =>
//                         setFormData({ ...formData, firstName: e.target.value })
//                      }
//                   />
//                </div>
//                <div>
//                   <Label htmlFor="lastName">Last Name</Label>
//                   <Input
//                      id="lastName"
//                      value={formData.lastName}
//                      onChange={(e) =>
//                         setFormData({ ...formData, lastName: e.target.value })
//                      }
//                   />
//                </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4 mb-6">
//                <div>
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                      id="email"
//                      type="email"
//                      value={formData.email}
//                      onChange={(e) =>
//                         setFormData({ ...formData, email: e.target.value })
//                      }
//                   />
//                </div>
//                <div>
//                   <Label htmlFor="confirmEmail">Confirm Email</Label>
//                   <Input
//                      id="confirmEmail"
//                      type="email"
//                      value={formData.confirmEmail}
//                      onChange={(e) =>
//                         setFormData({
//                            ...formData,
//                            confirmEmail: e.target.value,
//                         })
//                      }
//                   />
//                </div>
//             </div>

//             <div className="mb-6">
//                <Label htmlFor="phone">Phone</Label>
//                <Input
//                   id="phone"
//                   value={formData.phone}
//                   onChange={(e) =>
//                      setFormData({ ...formData, phone: e.target.value })
//                   }
//                />
//             </div>

//             <div className="mb-6">
//                <Label>Media Type</Label>
//                <RadioGroup
//                   value={formData.mediaType}
//                   onValueChange={(value: "photo" | "video") =>
//                      setFormData({ ...formData, mediaType: value })
//                   }
//                   className="flex gap-4"
//                >
//                   <div className="flex items-center space-x-2">
//                      <RadioGroupItem value="photo" id="photo" />
//                      <Label htmlFor="photo">Photo</Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                      <RadioGroupItem value="video" id="video" />
//                      <Label htmlFor="video">Video</Label>
//                   </div>
//                </RadioGroup>
//             </div>

//             <div className="mb-6">
//                <h3 className="font-semibold mb-2">Photo Specs:</h3>
//                <ul className="list-disc pl-6 space-y-1">
//                   <li>Photos must be JPG or PNG format</li>
//                   <li>
//                      Our billboard is landscape format - horizontal photos are
//                      preferred
//                   </li>
//                   <li>Photo file size must be under 5MB</li>
//                   <li>
//                      You will have the option to crop your photos after
//                      uploading
//                   </li>
//                </ul>
//             </div>

//             <div className="mb-6">
//                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                   <input
//                      type="file"
//                      accept={
//                         formData.mediaType === "photo" ? "image/*" : "video/*"
//                      }
//                      onChange={handleFileChange}
//                      className="hidden"
//                      id="file-upload"
//                   />
//                   <Label
//                      htmlFor="file-upload"
//                      className="cursor-pointer text-blue-600 hover:text-blue-800"
//                   >
//                      Drop files here or click to upload
//                   </Label>
//                </div>
//             </div>

//             <div className="space-y-4 mb-6">
//                <div className="flex items-center space-x-2">
//                   <Checkbox
//                      id="terms"
//                      checked={formData.termsAccepted}
//                      onCheckedChange={(checked) =>
//                         setFormData({
//                            ...formData,
//                            termsAccepted: checked as boolean,
//                         })
//                      }
//                   />
//                   <Label htmlFor="terms">
//                      I have read and agree to the Terms & Conditions
//                   </Label>
//                </div>

//                <div className="flex items-center space-x-2">
//                   <Checkbox
//                      id="photo-video-terms"
//                      checked={formData.photoVideoAcknowledged}
//                      onCheckedChange={(checked) =>
//                         setFormData({
//                            ...formData,
//                            photoVideoAcknowledged: checked as boolean,
//                         })
//                      }
//                   />
//                   <Label htmlFor="photo-video-terms">
//                      I acknowledge that my photo/video does not contain any
//                      brands or logos
//                   </Label>
//                </div>
//             </div>

//             <div className="flex justify-between">
//                <Button variant="outline">Previous</Button>
//                <Button className="bg-red-600 hover:bg-red-700">
//                   Next
//                   <ChevronRight className="ml-2 h-4 w-4" />
//                </Button>
//             </div>
//          </Card>
//       </div>
//    );
// };

// export default BillboardBookingForm;

import React, { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight, Upload } from "lucide-react";
import Link from "next/link";

interface FormData {
   firstName: string;
   lastName: string;
   email: string;
   confirmEmail: string;
   phone: string;
   mediaType: "photo" | "video";
   file: File | null;
   frameStyle: "red" | "birthday";
   termsAccepted: boolean;
   photoVideoAcknowledged: boolean;
}

const BillboardBookingForm = () => {
   const [formData, setFormData] = useState<FormData>({
      firstName: "",
      lastName: "",
      email: "",
      confirmEmail: "",
      phone: "",
      mediaType: "photo",
      file: null,
      frameStyle: "red",
      termsAccepted: false,
      photoVideoAcknowledged: false,
   });

   const [preview, setPreview] = useState<string | null>(null);
   const videoRef = useRef<HTMLVideoElement>(null);

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         setFormData({ ...formData, file });
         const reader = new FileReader();
         reader.onloadend = () => {
            setPreview(reader.result as string);
         };
         reader.readAsDataURL(file);
      }
   };

   const BillboardPreview = ({
      frameStyle,
   }: {
      frameStyle: "red" | "birthday";
   }) => {
      const isVideo = formData.file?.type.startsWith("video/");

      return (
         <div className="relative w-full max-w-md mx-auto mb-8">
            <div
               className={`relative aspect-[16/9] rounded-lg overflow-hidden ${
                  frameStyle === "red" ? "bg-red-100" : "bg-gray-100"
               }`}
            >
               {/* Frame Border */}
               <div
                  className={`absolute inset-0 border-8 ${
                     frameStyle === "red" ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
               >
                  {/* Preview Area */}
                  {preview ? (
                     <div className="absolute inset-2 overflow-hidden">
                        {isVideo ? (
                           <video
                              ref={videoRef}
                              src={preview}
                              className="w-full h-full object-cover"
                              controls
                              autoPlay
                              loop
                              muted
                           />
                        ) : (
                           <img
                              src={preview}
                              alt="Billboard Preview"
                              className="w-full h-full object-cover"
                           />
                        )}
                     </div>
                  ) : (
                     <div className="absolute inset-2 flex items-center justify-center bg-gray-50">
                        <div className="text-center">
                           <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                           <p className="text-gray-400">
                              Upload your {formData.mediaType} here
                           </p>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      );
   };

   const handleMediaTypeChange = (value: "photo" | "video") => {
      setFormData({ ...formData, mediaType: value, file: null });
      setPreview(null);
      if (videoRef.current) {
         videoRef.current.src = "";
      }
   };

   return (
      <div className="max-w-3xl mx-auto p-6">
         <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">
               Step 2: Book Your Billboard!
            </h2>

            {/* Billboard Preview Section */}
            <div className="mb-8">
               <h3 className="text-lg font-semibold mb-4">Billboard Preview</h3>
               <div className="flex gap-4 mb-4">
                  <button
                     className={`p-2 rounded ${formData.frameStyle === "red" ? "ring-2 ring-red-500" : ""}`}
                     onClick={() =>
                        setFormData({ ...formData, frameStyle: "red" })
                     }
                  >
                     Red Frame
                  </button>
                  <button
                     className={`p-2 rounded ${formData.frameStyle === "birthday" ? "ring-2 ring-blue-500" : ""}`}
                     onClick={() =>
                        setFormData({ ...formData, frameStyle: "birthday" })
                     }
                  >
                     Birthday Frame
                  </button>
               </div>
               <BillboardPreview frameStyle={formData.frameStyle} />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
               <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                     id="firstName"
                     value={formData.firstName}
                     onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                     }
                  />
               </div>
               <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                     id="lastName"
                     value={formData.lastName}
                     onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                     }
                  />
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
               <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                     id="email"
                     type="email"
                     value={formData.email}
                     onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                     }
                  />
               </div>
               <div>
                  <Label htmlFor="confirmEmail">Confirm Email</Label>
                  <Input
                     id="confirmEmail"
                     type="email"
                     value={formData.confirmEmail}
                     onChange={(e) =>
                        setFormData({
                           ...formData,
                           confirmEmail: e.target.value,
                        })
                     }
                  />
               </div>
            </div>

            <div className="mb-6">
               <Label htmlFor="phone">Phone</Label>
               <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                     setFormData({ ...formData, phone: e.target.value })
                  }
               />
            </div>

            <div className="mb-6">
               <Label>Media Type</Label>
               <RadioGroup
                  value={formData.mediaType}
                  onValueChange={handleMediaTypeChange}
                  className="flex gap-4"
               >
                  <div className="flex items-center space-x-2">
                     <RadioGroupItem value="photo" id="photo" />
                     <Label htmlFor="photo">Photo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                     <RadioGroupItem value="video" id="video" />
                     <Label htmlFor="video">Video</Label>
                  </div>
               </RadioGroup>
            </div>

            <div className="mb-6">
               <h3 className="font-semibold mb-2">Media Specs:</h3>
               <ul className="list-disc pl-6 space-y-1">
                  {formData.mediaType === "photo" ? (
                     <>
                        <li>Photos must be JPG or PNG format</li>
                        <li>
                           Our billboard is landscape format - horizontal photos
                           are preferred
                        </li>
                        <li>Photo file size must be under 5MB</li>
                     </>
                  ) : (
                     <>
                        <li>Videos must be MP4 format</li>
                        <li>Maximum video duration: 30 seconds</li>
                        <li>Video file size must be under 50MB</li>
                     </>
                  )}
                  <li>
                     You will have the option to crop your media after uploading
                  </li>
               </ul>
            </div>

            <div className="mb-6">
               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                     type="file"
                     accept={
                        formData.mediaType === "photo" ? "image/*" : "video/*"
                     }
                     onChange={handleFileChange}
                     className="hidden"
                     id="file-upload"
                  />
                  <Label
                     htmlFor="file-upload"
                     className="cursor-pointer text-blue-600 hover:text-blue-800"
                  >
                     Drop {formData.mediaType} here or click to upload
                  </Label>
               </div>
            </div>

            <div className="space-y-4 mb-6">
               <div className="flex items-center space-x-2">
                  <Checkbox
                     id="terms"
                     checked={formData.termsAccepted}
                     onCheckedChange={(checked) =>
                        setFormData({
                           ...formData,
                           termsAccepted: checked as boolean,
                        })
                     }
                  />
                  <Label htmlFor="terms">
                     I have read and agree to the Terms & Conditions
                  </Label>
               </div>

               <div className="flex items-center space-x-2">
                  <Checkbox
                     id="photo-video-terms"
                     checked={formData.photoVideoAcknowledged}
                     onCheckedChange={(checked) =>
                        setFormData({
                           ...formData,
                           photoVideoAcknowledged: checked as boolean,
                        })
                     }
                  />
                  <Label htmlFor="photo-video-terms">
                     I acknowledge that my {formData.mediaType} does not contain
                     any brands or logos
                  </Label>
               </div>
            </div>

            <div className="flex justify-between">
               <Button variant="outline">Previous</Button>
               <Link href="/service/billboard/date">
                  <Button className="bg-red-600 hover:bg-red-700">
                     Next
                     <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
               </Link>
            </div>
         </Card>
      </div>
   );
};

export default BillboardBookingForm;
