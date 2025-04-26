// "use client";
// import React, { useState, useRef } from "react";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { ChevronRight, Upload, Clock, ImageIcon, FilmIcon } from "lucide-react";
// import Link from "next/link";
// import { useSearchParams, useRouter } from "next/navigation";

// interface FormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   brandName: string;
//   mediaType: "photo" | "video";
//   file: File | null;
//   filePreview: string | null;
//   termsAccepted: boolean;
//   photoVideoAcknowledged: boolean;
// }

// const BillboardBookingForm = () => {
//   const [formData, setFormData] = useState<FormData>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     brandName: "",
//     mediaType: "photo",
//     file: null,
//     filePreview: null,
//     termsAccepted: false,
//     photoVideoAcknowledged: false,
//   });
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const id = searchParams.get("id");
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData({ 
//           ...formData, 
//           file,
//           filePreview: reader.result as string 
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleMediaTypeChange = (value: "photo" | "video") => {
//     setFormData({ 
//       ...formData, 
//       mediaType: value, 
//       file: null,
//       filePreview: null 
//     });
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!formData.file) {
//       alert("Please upload a file before proceeding");
//       return;
//     }
    
//     if (!formData.termsAccepted || !formData.photoVideoAcknowledged) {
//       alert("Please accept all terms and conditions");
//       return;
//     }

//     // Convert file to base64 for storage
//     const reader = new FileReader();
//     reader.readAsDataURL(formData.file);
//     reader.onloadend = () => {
//       const base64File = reader.result as string;
//       const formDataToStore = {
//         ...formData,
//         file: base64File,
//         fileType: formData.file?.type,
//         fileName: formData.file?.name
//       };
//       localStorage.setItem('billboardFormData', JSON.stringify(formDataToStore));
//       router.push(`/service/billboard/date?id=${id}`);
//     };
//     reader.onerror = () => {
//       alert("Error processing file. Please try again.");
//     };
//   };

//   const BillboardPreview = () => {
//     const isVideo = formData.mediaType === "video";

//     return (
//       <div className="w-full max-w-md mx-auto">
//         <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-xl">
//           <div className="absolute bottom-0 left-0 right-0 h-16 z-10 bg-gradient-to-t from-red/80 to-transparent pointer-events-none" />
//           {formData.filePreview ? (
//             <div className="absolute inset-0">
//               {isVideo ? (
//                 <video
//                   src={formData.filePreview}
//                   className="w-full h-full object-cover"
//                   controls
//                   autoPlay
//                   loop
//                   muted
//                 />
//               ) : (
//                 <img
//                   src={formData.filePreview}
//                   alt="Billboard Preview"
//                   className="w-full h-full object-cover"
//                 />
//               )}
//             </div>
//           ) : (
//             <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-50 via-red-100 to-red-200">
//               <div className="text-center p-6">
//                 <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Upload className="w-10 h-10 text-white" />
//                 </div>
//                 <h3 className="text-red-700 font-bold text-xl mb-2">
//                   Your {formData.mediaType} here
//                 </h3>
//                 <p className="text-red-600/80">
//                   See your content on our premium billboard
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <Card className="overflow-hidden rounded-xl shadow-2xl">
//         <div className="bg-red-600 p-6 text-white relative">
//           <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 rounded-full -translate-y-1/2 translate-x-1/2 opacity-40"></div>
//           <h2 className="text-3xl font-bold relative z-10">
//             Book Your Billboard
//           </h2>
//           <p className="mt-1 text-red-100 relative z-10">
//             Complete the form below to showcase your content
//           </p>
//         </div>

//         <div className="p-8">
//           {/* Preview Section */}
//           <div className="mb-10">
//             <div className="flex items-center mb-6">
//               <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
//                 <span className="text-white font-bold">1</span>
//               </div>
//               <h3 className="text-xl font-bold text-gray-800">
//                 Preview Your Billboard
//               </h3>
//             </div>
//             <div className="border-l-4 border-red-600 pl-6 ml-4">
//               <BillboardPreview />
//             </div>
//           </div>

//           {/* Media Type Section */}
//           <div className="mb-10">
//             <div className="flex items-center mb-6">
//               <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
//                 <span className="text-white font-bold">2</span>
//               </div>
//               <h3 className="text-xl font-bold text-gray-800">
//                 Choose Media Type
//               </h3>
//             </div>

//             <div className="border-l-4 border-red-600 pl-6 ml-4">
//               <RadioGroup
//                 value={formData.mediaType}
//                 onValueChange={handleMediaTypeChange}
//                 className="grid grid-cols-2 gap-4"
//               >
//                 <div
//                   className={`cursor-pointer rounded-xl p-6 border-2 transition-all ${
//                     formData.mediaType === "photo"
//                       ? "border-red-500 bg-red-50"
//                       : "border-gray-200 hover:border-red-300"
//                   }`}
//                   onClick={() => handleMediaTypeChange("photo")}
//                 >
//                   <div className="flex justify-between items-start mb-3">
//                     <ImageIcon className="h-6 w-6 text-red-600" />
//                     <RadioGroupItem value="photo" id="photo" />
//                   </div>
//                   <h4 className="font-bold text-lg text-gray-800 mb-1">
//                     Photo
//                   </h4>
//                   <p className="text-sm text-gray-600">
//                     Static image for your billboard display
//                   </p>
//                 </div>

//                 <div
//                   className={`cursor-pointer rounded-xl p-6 border-2 transition-all ${
//                     formData.mediaType === "video"
//                       ? "border-red-500 bg-red-50"
//                       : "border-gray-200 hover:border-red-300"
//                   }`}
//                   onClick={() => handleMediaTypeChange("video")}
//                 >
//                   <div className="flex justify-between items-start mb-3">
//                     <FilmIcon className="h-6 w-6 text-red-600" />
//                     <RadioGroupItem value="video" id="video" />
//                   </div>
//                   <h4 className="font-bold text-lg text-gray-800 mb-1">
//                     Video
//                   </h4>
//                   <p className="text-sm text-gray-600">
//                     30-second video for dynamic presentation
//                   </p>
//                 </div>
//               </RadioGroup>

//               <div className="mt-6 bg-gray-50 p-5 rounded-xl border border-gray-200">
//                 <h4 className="font-bold text-gray-700 flex items-center mb-3">
//                   <Clock className="h-4 w-4 mr-2 text-red-600" />
//                   Media Requirements
//                 </h4>
//                 <ul className="space-y-2 text-gray-600 text-sm">
//                   {formData.mediaType === "photo" ? (
//                     <>
//                       <li className="flex items-start">
//                         <div className="mr-2 h-5 w-5 flex items-center justify-center">
//                           <div className="h-1.5 w-1.5 bg-red-600 rounded-full"></div>
//                         </div>
//                         <span>JPG or PNG format (5MB max)</span>
//                       </li>
//                       <li className="flex items-start">
//                         <div className="mr-2 h-5 w-5 flex items-center justify-center">
//                           <div className="h-1.5 w-1.5 bg-red-600 rounded-full"></div>
//                         </div>
//                         <span>
//                           Landscape orientation recommended (16:9 ratio)
//                         </span>
//                       </li>
//                     </>
//                   ) : (
//                     <>
//                       <li className="flex items-start">
//                         <div className="mr-2 h-5 w-5 flex items-center justify-center">
//                           <div className="h-1.5 w-1.5 bg-red-600 rounded-full"></div>
//                         </div>
//                         <span>MP4 format (50MB max)</span>
//                       </li>
//                       <li className="flex items-start">
//                         <div className="mr-2 h-5 w-5 flex items-center justify-center">
//                           <div className="h-1.5 w-1.5 bg-red-600 rounded-full"></div>
//                         </div>
//                         <span>Maximum duration: 30 seconds</span>
//                       </li>
//                     </>
//                   )}
//                   <li className="flex items-start">
//                     <div className="mr-2 h-5 w-5 flex items-center justify-center">
//                       <div className="h-1.5 w-1.5 bg-red-600 rounded-full"></div>
//                     </div>
//                     <span>
//                       Content should be high resolution for best display
//                     </span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Upload Section */}
//           <div className="mb-10">
//             <div className="flex items-center mb-6">
//               <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
//                 <span className="text-white font-bold">3</span>
//               </div>
//               <h3 className="text-xl font-bold text-gray-800">
//                 Upload Your {formData.mediaType}
//               </h3>
//             </div>

//             <div className="border-l-4 border-red-600 pl-6 ml-4">
//               <div className="border-3 border-dashed border-red-300 rounded-xl p-8 text-center bg-red-50 hover:bg-red-100 transition-colors relative overflow-hidden">
//                 <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-red-200 rounded-full opacity-50"></div>
//                 <div className="absolute -left-6 -top-6 w-16 h-16 bg-red-200 rounded-full opacity-30"></div>

//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   accept={
//                     formData.mediaType === "photo" ? "image/*" : "video/*"
//                   }
//                   onChange={handleFileChange}
//                   className="hidden"
//                   id="file-upload"
//                 />
//                 <Label
//                   htmlFor="file-upload"
//                   className="cursor-pointer flex flex-col items-center relative z-10"
//                 >
//                   <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mb-4">
//                     <Upload className="h-8 w-8 text-red-600" />
//                   </div>
//                   <span className="text-red-700 font-bold text-lg">
//                     Drop {formData.mediaType} here or click to browse
//                   </span>
//                   <span className="text-red-600/70 mt-2 text-sm max-w-md mx-auto">
//                     {formData.mediaType === "photo"
//                       ? "Select a high-quality image to maximize impact"
//                       : "Choose a captivating video clip (max 30 seconds)"}
//                   </span>
//                 </Label>
//               </div>
//               {formData.file && (
//                 <div className="mt-4 text-sm text-green-600">
//                   {formData.file.name} uploaded successfully
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Information Section */}
//           <div className="mb-10">
//             <div className="flex items-center mb-6">
//               <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
//                 <span className="text-white font-bold">4</span>
//               </div>
//               <h3 className="text-xl font-bold text-gray-800">
//                 Your Information
//               </h3>
//             </div>

//             <div className="border-l-4 border-red-600 pl-6 ml-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <div>
//                   <Label
//                     htmlFor="firstName"
//                     className="text-gray-700 font-medium"
//                   >
//                     First Name
//                   </Label>
//                   <Input
//                     id="firstName"
//                     value={formData.firstName}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         firstName: e.target.value,
//                       })
//                     }
//                     className="mt-1 border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
//                   />
//                 </div>
//                 <div>
//                   <Label
//                     htmlFor="lastName"
//                     className="text-gray-700 font-medium"
//                   >
//                     Last Name
//                   </Label>
//                   <Input
//                     id="lastName"
//                     value={formData.lastName}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         lastName: e.target.value,
//                       })
//                     }
//                     className="mt-1 border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <div>
//                   <Label
//                     htmlFor="email"
//                     className="text-gray-700 font-medium"
//                   >
//                     Email Address
//                   </Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         email: e.target.value,
//                       })
//                     }
//                     className="mt-1 border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
//                   />
//                 </div>
//                 <div>
//                   <Label
//                     htmlFor="phone"
//                     className="text-gray-700 font-medium"
//                   >
//                     Phone Number
//                   </Label>
//                   <Input
//                     id="phone"
//                     value={formData.phone}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         phone: e.target.value,
//                       })
//                     }
//                     className="mt-1 border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
//                   />
//                 </div>
//               </div>

//               <div className="mb-2">
//                 <Label
//                   htmlFor="brandName"
//                   className="text-gray-700 font-medium"
//                 >
//                   Brand or Company Name
//                 </Label>
//                 <Input
//                   id="brandName"
//                   value={formData.brandName}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       brandName: e.target.value,
//                     })
//                   }
//                   className="mt-1 border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
//                   placeholder="Enter the name to be displayed with your content"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Terms Section */}
//           <div className="mb-10">
//             <div className="flex items-center mb-6">
//               <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
//                 <span className="text-white font-bold">5</span>
//               </div>
//               <h3 className="text-xl font-bold text-gray-800">
//                 Terms & Agreements
//               </h3>
//             </div>

//             <div className="border-l-4 border-red-600 pl-6 ml-4">
//               <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
//                 <div className="flex items-start space-x-3 mb-4">
//                   <Checkbox
//                     id="terms"
//                     checked={formData.termsAccepted}
//                     onCheckedChange={(checked) =>
//                       setFormData({
//                         ...formData,
//                         termsAccepted: checked as boolean,
//                       })
//                     }
//                     className="mt-1 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
//                   />
//                   <div>
//                     <Label
//                       htmlFor="terms"
//                       className="text-gray-800 font-medium"
//                     >
//                       Terms & Conditions
//                     </Label>
//                     <p className="text-gray-500 text-sm mt-1">
//                       I have read and agree to the billboard service terms and
//                       conditions
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-3">
//                   <Checkbox
//                     id="photo-video-terms"
//                     checked={formData.photoVideoAcknowledged}
//                     onCheckedChange={(checked) =>
//                       setFormData({
//                         ...formData,
//                         photoVideoAcknowledged: checked as boolean,
//                       })
//                     }
//                     className="mt-1 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
//                   />
//                   <div>
//                     <Label
//                       htmlFor="photo-video-terms"
//                       className="text-gray-800 font-medium"
//                     >
//                       Content Compliance
//                     </Label>
//                     <p className="text-gray-500 text-sm mt-1">
//                       I confirm my {formData.mediaType} complies with content
//                       guidelines and does not contain unauthorized brands, logos,
//                       or inappropriate material
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Navigation */}
//           <div className="flex justify-between pt-4 border-t border-gray-200">
//             <Button
//               variant="outline"
//               className="border-gray-300 hover:bg-gray-50 text-gray-700"
//             >
//               Previous Step
//             </Button>
//             <Button 
//               className="bg-red-600 hover:bg-red-700 text-white px-6"
//               onClick={handleSubmit}
//               disabled={!formData.file || !formData.termsAccepted || !formData.photoVideoAcknowledged}
//             >
//               Select Display Date
//               <ChevronRight className="ml-2 h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default BillboardBookingForm;

"use client";
import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight, Upload, Clock, ImageIcon, FilmIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

// IndexedDB setup
const DB_NAME = "BillboardAppDB";
const DB_VERSION = 1;
const STORE_NAME = "mediaFiles";

const openIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = (event) => {
      reject("IndexedDB error: " + request.error);
    };
    
    request.onsuccess = (event) => {
      resolve(request.result);
    };
    
    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
  });
};

const saveToIndexedDB = async (id, mediaData) => {
  const db = await openIndexedDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    
    const request = store.put({ id, ...mediaData });
    
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
};

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  brandName: string;
  mediaType: "photo" | "video";
  file: File | null;
  filePreview: string | null;
  fileName?: string;
  fileType?: string;
  termsAccepted: boolean;
  photoVideoAcknowledged: boolean;
}

const BillboardBookingForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    brandName: "",
    mediaType: "photo",
    file: null,
    filePreview: null,
    termsAccepted: false,
    photoVideoAcknowledged: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id") || "default";
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ 
          ...formData, 
          file,
          filePreview: reader.result as string 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMediaTypeChange = (value: "photo" | "video") => {
    setFormData({ 
      ...formData, 
      mediaType: value, 
      file: null,
      filePreview: null 
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.file) {
      alert("Please upload a file before proceeding");
      return;
    }
    
    if (!formData.termsAccepted || !formData.photoVideoAcknowledged) {
      alert("Please accept all terms and conditions");
      return;
    }

    setIsProcessing(true);
    
    try {
      // For photo, use localStorage
      if (formData.mediaType === "photo") {
        // Convert file to base64 for storage
        const reader = new FileReader();
        reader.readAsDataURL(formData.file);
        reader.onloadend = () => {
          const base64File = reader.result as string;
          const formDataToStore = {
            ...formData,
            file: base64File,
            fileType: formData.file?.type,
            fileName: formData.file?.name
          };
          
          // Store basic form data in localStorage
          localStorage.setItem('billboardFormData', JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            brandName: formData.brandName,
            mediaType: formData.mediaType,
            fileType: formData.file?.type,
            fileName: formData.file?.name,
            file: base64File
          }));
          
          router.push(`/service/billboard/date?id=${id}`);
        };
      } 
      // For video, use IndexedDB
      else {
        // Store blob in IndexedDB
        const formDataToStore = {
          mediaData: {
            file: formData.file,
            fileType: formData.file?.type,
            fileName: formData.file?.name
          }
        };
        
        await saveToIndexedDB(id, formDataToStore);
        
        // Store basic form data in localStorage (without the file)
        localStorage.setItem('billboardFormData', JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          brandName: formData.brandName,
          mediaType: formData.mediaType,
          fileType: formData.file?.type,
          fileName: formData.file?.name,
          // Instead of storing the file, add a flag for IndexedDB
          useIndexedDB: true
        }));
        
        router.push(`/service/billboard/date?id=${id}`);
      }
    } catch (error) {
      console.error("Error storing data:", error);
      alert("Error processing your media. Please try again with a smaller file size.");
      setIsProcessing(false);
    }
  };

  const BillboardPreview = () => {
    const isVideo = formData.mediaType === "video";

    return (
      <div className="w-full max-w-md mx-auto">
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-xl">
          <div className="absolute bottom-0 left-0 right-0 h-16 z-10 bg-gradient-to-t from-red-600/80 to-transparent pointer-events-none" />
          {formData.filePreview ? (
            <div className="absolute inset-0">
              {isVideo ? (
                <video
                  src={formData.filePreview}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  loop
                  muted
                />
              ) : (
                <img
                  src={formData.filePreview}
                  alt="Billboard Preview"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-50 via-red-100 to-red-200">
              <div className="text-center p-6">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-red-700 font-bold text-xl mb-2">
                  Your {formData.mediaType} here
                </h3>
                <p className="text-red-600/80">
                  See your content on our premium billboard
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="overflow-hidden rounded-xl shadow-2xl">
        <div className="bg-red-600 p-6 text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 rounded-full -translate-y-1/2 translate-x-1/2 opacity-40"></div>
          <h2 className="text-3xl font-bold relative z-10">
            Book Your Billboard
          </h2>
          <p className="mt-1 text-red-100 relative z-10">
            Complete the form below to showcase your content
          </p>
        </div>

        <div className="p-8">
          {/* Preview Section */}
          <div className="mb-10">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Preview Your Billboard
              </h3>
            </div>
            <div className="border-l-4 border-red-600 pl-6 ml-4">
              <BillboardPreview />
            </div>
          </div>

          {/* Media Type Section */}
          <div className="mb-10">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Choose Media Type
              </h3>
            </div>

            <div className="border-l-4 border-red-600 pl-6 ml-4">
              <RadioGroup
                value={formData.mediaType}
                onValueChange={handleMediaTypeChange}
                className="grid grid-cols-2 gap-4"
              >
                <div
                  className={`cursor-pointer rounded-xl p-6 border-2 transition-all ${
                    formData.mediaType === "photo"
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-red-300"
                  }`}
                  onClick={() => handleMediaTypeChange("photo")}
                >
                  <div className="flex justify-between items-start mb-3">
                    <ImageIcon className="h-6 w-6 text-red-600" />
                    <RadioGroupItem value="photo" id="photo" />
                  </div>
                  <h4 className="font-bold text-lg text-gray-800 mb-1">
                    Photo
                  </h4>
                  <p className="text-sm text-gray-600">
                    Static image for your billboard display
                  </p>
                </div>

                <div
                  className={`cursor-pointer rounded-xl p-6 border-2 transition-all ${
                    formData.mediaType === "video"
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-red-300"
                  }`}
                  onClick={() => handleMediaTypeChange("video")}
                >
                  <div className="flex justify-between items-start mb-3">
                    <FilmIcon className="h-6 w-6 text-red-600" />
                    <RadioGroupItem value="video" id="video" />
                  </div>
                  <h4 className="font-bold text-lg text-gray-800 mb-1">
                    Video
                  </h4>
                  <p className="text-sm text-gray-600">
                    30-second video for dynamic presentation
                  </p>
                </div>
              </RadioGroup>

              <div className="mt-6 bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-700 flex items-center mb-3">
                  <Clock className="h-4 w-4 mr-2 text-red-600" />
                  Media Requirements
                </h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {formData.mediaType === "photo" ? (
                    <>
                      <li className="flex items-start">
                        <div className="mr-2 h-5 w-5 flex items-center justify-center">
                          <div className="h-1.5 w-1.5 bg-red-600 rounded-full"></div>
                        </div>
                        <span>JPG or PNG format (5MB max)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 h-5 w-5 flex items-center justify-center">
                          <div className="h-1.5 w-1.5 bg-red-600 rounded-full"></div>
                        </div>
                        <span>
                          Landscape orientation recommended (16:9 ratio)
                        </span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start">
                        <div className="mr-2 h-5 w-5 flex items-center justify-center">
                          <div className="h-1.5 w-1.5 bg-red-600 rounded-full"></div>
                        </div>
                        <span>MP4 format (50MB max)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 h-5 w-5 flex items-center justify-center">
                          <div className="h-1.5 w-1.5 bg-red-600 rounded-full"></div>
                        </div>
                        <span>Maximum duration: 30 seconds</span>
                      </li>
                    </>
                  )}
                  <li className="flex items-start">
                    <div className="mr-2 h-5 w-5 flex items-center justify-center">
                      <div className="h-1.5 w-1.5 bg-red-600 rounded-full"></div>
                    </div>
                    <span>
                      Content should be high resolution for best display
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="mb-10">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Upload Your {formData.mediaType}
              </h3>
            </div>

            <div className="border-l-4 border-red-600 pl-6 ml-4">
              <div className="border-3 border-dashed border-red-300 rounded-xl p-8 text-center bg-red-50 hover:bg-red-100 transition-colors relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-red-200 rounded-full opacity-50"></div>
                <div className="absolute -left-6 -top-6 w-16 h-16 bg-red-200 rounded-full opacity-30"></div>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept={formData.mediaType === "photo" ? "image/*" : "video/*"}
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <Label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center relative z-10"
                >
                  <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mb-4">
                    <Upload className="h-8 w-8 text-red-600" />
                  </div>
                  <span className="text-red-700 font-bold text-lg">
                    Drop {formData.mediaType} here or click to browse
                  </span>
                  <span className="text-red-600/70 mt-2 text-sm max-w-md mx-auto">
                    {formData.mediaType === "photo"
                      ? "Select a high-quality image to maximize impact"
                      : "Choose a captivating video clip (max 30 seconds)"}
                  </span>
                </Label>
              </div>
              {formData.file && (
                <div className="mt-4 text-sm text-green-600">
                  {formData.file.name} uploaded successfully
                </div>
              )}
            </div>
          </div>

          {/* Information Section */}
          <div className="mb-10">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Your Information
              </h3>
            </div>

            <div className="border-l-4 border-red-600 pl-6 ml-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="firstName" className="text-gray-700 font-medium">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        firstName: e.target.value,
                      })
                    }
                    className="mt-1 border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-gray-700 font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        lastName: e.target.value,
                      })
                    }
                    className="mt-1 border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className="mt-1 border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-gray-700 font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                    className="mt-1 border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
                  />
                </div>
              </div>

              <div className="mb-2">
                <Label htmlFor="brandName" className="text-gray-700 font-medium">
                  Brand or Company Name
                </Label>
                <Input
                  id="brandName"
                  value={formData.brandName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      brandName: e.target.value,
                    })
                  }
                  className="mt-1 border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200"
                  placeholder="Enter the name to be displayed with your content"
                />
              </div>
            </div>
          </div>

          {/* Terms Section */}
          <div className="mb-10">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">5</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                Terms & Agreements
              </h3>
            </div>

            <div className="border-l-4 border-red-600 pl-6 ml-4">
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <div className="flex items-start space-x-3 mb-4">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        termsAccepted: checked as boolean,
                      })
                    }
                    className="mt-1 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                  />
                  <div>
                    <Label htmlFor="terms" className="text-gray-800 font-medium">
                      Terms & Conditions
                    </Label>
                    <p className="text-gray-500 text-sm mt-1">
                      I have read and agree to the billboard service terms and
                      conditions
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="photo-video-terms"
                    checked={formData.photoVideoAcknowledged}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        photoVideoAcknowledged: checked as boolean,
                      })
                    }
                    className="mt-1 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                  />
                  <div>
                    <Label htmlFor="photo-video-terms" className="text-gray-800 font-medium">
                      Content Compliance
                    </Label>
                    <p className="text-gray-500 text-sm mt-1">
                      I confirm my {formData.mediaType} complies with content
                      guidelines and does not contain unauthorized brands, logos,
                      or inappropriate material
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              className="border-gray-300 hover:bg-gray-50 text-gray-700"
            >
              Previous Step
            </Button>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white px-6"
              onClick={handleSubmit}
              disabled={!formData.file || !formData.termsAccepted || !formData.photoVideoAcknowledged || isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Select Display Date
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BillboardBookingForm;