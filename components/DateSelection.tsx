
// "use client";
// import React, { useState, useEffect } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft, ChevronRight, Calendar, Clock, Info, Loader2 } from "lucide-react";
// import Link from "next/link";
// import { pb } from "@/lib/pocketbase";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   PaymentElement,
//   useStripe,
//   useElements,
//   LinkAuthenticationElement,
// } from "@stripe/react-stripe-js";
// import { useCreateAdvertisement } from "@/hooks/useAdvertisement";
// import { useRouter } from "next/navigation";
// import { useSearchParams } from "next/navigation";
// import { useSession } from "next-auth/react";

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

// interface DateSelectionProps {
//   onPrevious?: () => void;
//   onContinue?: () => void;
// }

// const PaymentForm = ({ amount, onPaymentSuccess, formData }: { 
//   amount: number;
//   onPaymentSuccess: () => void;
//   formData: any;
// }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [email, setEmail] = useState("");
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [paymentError, setPaymentError] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     setIsProcessing(true);
//     setPaymentError("");

//     const { error, paymentIntent } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: `${window.location.origin}/service/billboard/confirmation`,
//         receipt_email: email,
//       },
//       redirect: "if_required",
//     });

//     if (error) {
//       setPaymentError(error.message || "Payment failed. Please try again.");
//       setIsProcessing(false);
//     } else if (paymentIntent && paymentIntent.status === "succeeded") {
//       onPaymentSuccess();
//     } else {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <LinkAuthenticationElement 
//         onChange={(e) => setEmail(e.value.email)}
//       />
      
//       <PaymentElement />
      
//       {paymentError && (
//         <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
//           {paymentError}
//         </div>
//       )}
      
//       <Button 
//         type="submit" 
//         className="w-full bg-red-600 hover:bg-red-700 text-white" 
//         disabled={!stripe || isProcessing}
//       >
//         {isProcessing ? (
//           <>
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             Processing...
//           </>
//         ) : (
//           `Pay $${amount}`
//         )}
//       </Button>
//     </form>
//   );
// };

// const DateSelection = ({ onPrevious, onContinue }: DateSelectionProps) => {
//   const [startDate, setStartDate] = useState<string | null>(null);
//   const [endDate, setEndDate] = useState<string | null>(null);
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [selectionMode, setSelectionMode] = useState<"start" | "end">("start");
//   const [showPayment, setShowPayment] = useState(false);
//   const [clientSecret, setClientSecret] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState<any>(null);
  
//   const searchParams = useSearchParams();
//   const id = searchParams.get("id");
//   const router = useRouter();
//   const { mutate: createAdvertisement } = useCreateAdvertisement();
//   const { data: session } = useSession();

//   useEffect(() => {
//     const fetchFormData = async () => {
//       try {
//         const storedData = localStorage.getItem('billboardFormData');
//         if (storedData) {
//           const parsedData = JSON.parse(storedData);
//           setFormData(parsedData);
          
//           if (!parsedData.file) {
//             console.error("No file data found in stored form data");
//             router.push(`/service/billboard/upload?id=${id}`);
//           }
//         } else {
//           router.push(`/service/billboard/upload?id=${id}`);
//         }
//       } catch (error) {
//         console.error("Error fetching form data:", error);
//         router.push(`/service/billboard/upload?id=${id}`);
//       }
//     };
    
//     fetchFormData();
//   }, [id, router]);

//   const handlePaymentSuccess = async () => {
//     if (!startDate || !endDate || !formData) {
//       console.error("Missing required data");
//       return;
//     }

//     try {
//       let pocketbaseUserId = null;
//       const userEmail = session?.user?.email || formData.email;
      
//       if (userEmail) {
//         try {
//           const userRecord = await pb.collection('users').getFirstListItem(`email="${userEmail}"`);
//           pocketbaseUserId = userRecord.id;
//         } catch (userError) {
//           console.warn("User not found in PocketBase, proceeding as guest");
//         }
//       }

//       // Convert base64 file back to Blob
//       const base64Response = await fetch(formData.file);
//       const blob = await base64Response.blob();
//       const file = new File([blob], formData.fileName || "billboard-media", {
//         type: formData.fileType || (formData.mediaType === "photo" ? "image/jpeg" : "video/mp4")
//       });

//       const formDataWithFile = new FormData();
//       formDataWithFile.append('media', file);
//       formDataWithFile.append('billboard_id', id || "");
      
//       if (pocketbaseUserId) {
//         formDataWithFile.append('user_id', pocketbaseUserId);
//       }
      
//       formDataWithFile.append('first_name', formData.firstName || "");
//       formDataWithFile.append('last_name', formData.lastName || "");
//       formDataWithFile.append('email', userEmail || "");
//       formDataWithFile.append('brand', formData.brandName || "");
//       formDataWithFile.append('phone_number', formData.phone || "");
//       formDataWithFile.append('start_date', new Date(`${startDate}T00:00:00.000Z`).toISOString());
//       formDataWithFile.append('end_date', new Date(`${endDate}T23:59:59.000Z`).toISOString());
//       formDataWithFile.append('payment_status', "completed");
//       formDataWithFile.append('amount_paid', calculateTotal().toString());

//       const record = await pb.collection("advertisements").create(formDataWithFile);
//       console.log("Advertisement created successfully:", record);
      
//       localStorage.removeItem('billboardFormData');
//       router.push("/service/billboard/confirmation");
      
//     } catch (error: any) {
//       console.error("Error in handlePaymentSuccess:", error);
      
//       if (error?.response?.data) {
//         const { data } = error.response;
//         alert(`Validation error: ${JSON.stringify(data)}`);
//       } else {
//         alert(error.message || "Failed to complete booking. Please try again.");
//       }
//     }
//   };

//   const getDaysInMonth = (date: Date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     const firstDayOfMonth = new Date(year, month, 1).getDay();

//     const days = [];
//     for (let i = 0; i < firstDayOfMonth; i++) {
//       days.push(null);
//     }

//     for (let day = 1; day <= daysInMonth; day++) {
//       days.push(day);
//     }

//     return days;
//   };

//   const formatMonth = (date: Date) => {
//     return date.toLocaleString("default", { month: "long", year: "numeric" });
//   };

//   const isDateDisabled = (day: number) => {
//     if (!day) return true;
//     const date = new Date(
//       currentMonth.getFullYear(),
//       currentMonth.getMonth(),
//       day
//     );
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
    
//     if (date < today) return true;
    
//     if (selectionMode === "end" && startDate) {
//       const startDateObj = new Date(startDate);
//       return date < startDateObj;
//     }
    
//     return false;
//   };

//   const isDateInRange = (day: number) => {
//     if (!day || !startDate || !endDate) return false;
    
//     const date = new Date(
//       currentMonth.getFullYear(),
//       currentMonth.getMonth(),
//       day
//     ).toISOString().split("T")[0];
    
//     return date > startDate && date < endDate;
//   };

//   const handleDateClick = (day: number | null) => {
//     if (!day || isDateDisabled(day)) return;
    
//     const date = new Date(
//       currentMonth.getFullYear(),
//       currentMonth.getMonth(),
//       day
//     );
//     const dateString = date.toISOString().split("T")[0];
    
//     if (selectionMode === "start") {
//       setStartDate(dateString);
//       setEndDate(null);
//       setSelectionMode("end");
//     } else {
//       setEndDate(dateString);
//       setSelectionMode("start");
//     }
//   };

//   const handlePreviousMonth = () => {
//     setCurrentMonth(
//       new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
//     );
//   };

//   const handleNextMonth = () => {
//     setCurrentMonth(
//       new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
//     );
//   };

//   const resetSelection = () => {
//     setStartDate(null);
//     setEndDate(null);
//     setSelectionMode("start");
//   };

//   const calculateNumberOfDays = () => {
//     if (!startDate || !endDate) return 0;
    
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const diffTime = Math.abs(end.getTime() - start.getTime());
//     return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
//   };

//   const formatDateRange = () => {
//     if (!startDate) return "Please select start date";
//     if (!endDate) return `Start date: ${formatDate(startDate)} - Select end date`;
    
//     return `${formatDate(startDate)} to ${formatDate(endDate)} (${calculateNumberOfDays()} days)`;
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       weekday: 'short', 
//       month: 'short', 
//       day: 'numeric'
//     });
//   };

//   const calculateTotal = () => {
//     const days = calculateNumberOfDays();
//     if (days >= 3) {
//       return Math.round(199 * days * 0.9);
//     }
//     return 199 * days;
//   };

//   const initiatePayment = async () => {
//     if (!startDate || !endDate) return;
    
//     setIsLoading(true);
//     try {
//       const response = await fetch('/api/create-payment-intent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           amount: calculateTotal() * 100,
//           currency: 'usd',
//           metadata: {
//             startDate,
//             endDate,
//             numberOfDays: calculateNumberOfDays(),
//             billboardId: id,
//             userId: session?.user?.id || "guest",
//           },
//         }),
//       });

//       const data = await response.json();
      
//       if (data.clientSecret) {
//         setClientSecret(data.clientSecret);
//         setShowPayment(true);
//       } else {
//         console.error('Failed to get client secret');
//       }
//     } catch (error) {
//       console.error('Error initiating payment:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const closePayment = () => {
//     setShowPayment(false);
//   };

//   const stripeOptions = {
//     clientSecret,
//     appearance: {
//       theme: 'stripe',
//       variables: {
//         colorPrimary: '#dc2626',
//         colorBackground: '#ffffff',
//         colorText: '#1f2937',
//         colorDanger: '#ef4444',
//         fontFamily: 'system-ui, sans-serif',
//         borderRadius: '8px',
//       },
//     },
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <Card className="overflow-hidden rounded-xl shadow-2xl">
//         <div className="bg-red-600 p-6 text-white relative">
//           <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 rounded-full -translate-y-1/2 translate-x-1/2 opacity-40"></div>
//           <h2 className="text-3xl font-bold relative z-10">Select Display Dates</h2>
//           <p className="mt-1 text-red-100 relative z-10">Choose when your content will appear on our billboard</p>
//         </div>
        
//         <div className="p-8">
//           {/* Date Selection Section */}
//           <div className="mb-10">
//             <div className="flex items-center mb-6">
//               <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
//                 <span className="text-white font-bold">1</span>
//               </div>
//               <h3 className="text-xl font-bold text-gray-800">Choose Your Display Dates</h3>
//             </div>
            
//             <div className="border-l-4 border-red-600 pl-6 ml-4">
//               <div className="flex items-center mb-4 text-center">
//                 <div className={`flex-1 p-3 rounded-l-lg border ${selectionMode === "start" ? "bg-red-50 border-red-300" : "bg-gray-50 border-gray-200"}`}>
//                   <div className="text-sm font-medium text-gray-500">STEP 1</div>
//                   <div className={`font-bold ${selectionMode === "start" ? "text-red-600" : "text-gray-700"}`}>Select Start Date</div>
//                 </div>
//                 <div className={`flex-1 p-3 rounded-r-lg border ${selectionMode === "end" ? "bg-red-50 border-red-300" : "bg-gray-50 border-gray-200"}`}>
//                   <div className="text-sm font-medium text-gray-500">STEP 2</div>
//                   <div className={`font-bold ${selectionMode === "end" ? "text-red-600" : "text-gray-700"}`}>Select End Date</div>
//                 </div>
//               </div>
              
//               <div className="mb-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={handlePreviousMonth}
//                     className="border-red-200 hover:bg-red-50 hover:border-red-300"
//                   >
//                     <ChevronLeft className="h-4 w-4 text-red-600" />
//                   </Button>
//                   <h3 className="text-xl font-bold text-red-600">
//                     {formatMonth(currentMonth)}
//                   </h3>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={handleNextMonth}
//                     className="border-red-200 hover:bg-red-50 hover:border-red-300"
//                   >
//                     <ChevronRight className="h-4 w-4 text-red-600" />
//                   </Button>
//                 </div>

//                 <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
//                   <div className="grid grid-cols-7 gap-2 mb-2">
//                     {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
//                       (day) => (
//                         <div
//                           key={day}
//                           className="text-center text-sm font-medium py-2 text-gray-700"
//                         >
//                           {day}
//                         </div>
//                       )
//                     )}
//                   </div>

//                   <div className="grid grid-cols-7 gap-2">
//                     {getDaysInMonth(currentMonth).map((day, index) => {
//                       if (!day) return <div key={index} className="invisible p-3"></div>;
                      
//                       const date = new Date(
//                         currentMonth.getFullYear(),
//                         currentMonth.getMonth(),
//                         day
//                       ).toISOString().split("T")[0];
                      
//                       const isStart = date === startDate;
//                       const isEnd = date === endDate;
//                       const isRange = isDateInRange(day);
//                       const isDisabled = isDateDisabled(day);
                      
//                       return (
//                         <div
//                           key={index}
//                           className={`
//                             p-3 text-center transition-all cursor-pointer relative
//                             ${isDisabled ? "text-gray-300 cursor-not-allowed" : "hover:bg-red-50 border border-transparent hover:border-red-200"}
//                             ${isStart ? "bg-red-600 text-white hover:bg-red-700 border border-red-600 rounded-l-lg" : ""}
//                             ${isEnd ? "bg-red-600 text-white hover:bg-red-700 border border-red-600 rounded-r-lg" : ""}
//                             ${isRange ? "bg-red-100 text-red-800 border-red-200" : ""}
//                             ${(isStart || isEnd) && "z-10"}
//                           `}
//                           onClick={() => !isDisabled && handleDateClick(day)}
//                         >
//                           {day}
//                           {isStart && (
//                             <span className="absolute bottom-0 left-0 right-0 text-xs font-medium text-white">Start</span>
//                           )}
//                           {isEnd && (
//                             <span className="absolute bottom-0 left-0 right-0 text-xs font-medium text-white">End</span>
//                           )}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex items-center justify-between mb-4">
//                 <Button 
//                   variant="outline" 
//                   size="sm" 
//                   onClick={resetSelection}
//                   className="text-red-600 border-red-200 hover:bg-red-50"
//                 >
//                   Reset Selection
//                 </Button>
//                 <div className="text-sm text-gray-600">
//                   {selectionMode === "start" ? "Select start date first" : "Now select end date"}
//                 </div>
//               </div>
              
//               <div className="flex items-start p-4 bg-red-50 rounded-xl border border-red-100">
//                 <Calendar className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
//                 <div>
//                   <p className="text-red-800 font-medium">
//                     {formatDateRange()}
//                   </p>
//                   {startDate && endDate && (
//                     <p className="text-red-600 text-sm mt-1">
//                       {calculateNumberOfDays()} day billboard booking
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Display Information Section */}
//           <div className="mb-10">
//             <div className="flex items-center mb-6">
//               <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
//                 <span className="text-white font-bold">2</span>
//               </div>
//               <h3 className="text-xl font-bold text-gray-800">Display Information</h3>
//             </div>
            
//             <div className="border-l-4 border-red-600 pl-6 ml-4">
//               <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
//                 <div className="flex items-start mb-6">
//                   <Clock className="h-5 w-5 text-red-600 mt-0.5 mr-3" />
//                   <div>
//                     <h4 className="font-bold text-gray-800 mb-1">Display Schedule</h4>
//                     <p className="text-gray-700">
//                       Your content will play 15 seconds every hour, each day during your selected date range.
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start">
//                   <Info className="h-5 w-5 text-red-600 mt-0.5 mr-3" />
//                   <div>
//                     <h4 className="font-bold text-gray-800 mb-1">Important Note</h4>
//                     <p className="text-gray-700 mb-2">
//                       We will send you your hourly time slots at least 1 day prior to your display start date.
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       *We ensure a minimum of 22 plays per day in case of power shortages or technical issues. Under normal circumstances, your content will play once per hour from midnight to 11pm on each day of your booking.
//                     </p>
//                   </div>
//                 </div>
                
//                 {startDate && endDate && calculateNumberOfDays() > 1 && (
//                   <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-100">
//                     <h4 className="font-bold text-red-800 mb-1">Multi-Day Booking Summary</h4>
//                     <p className="text-gray-700">
//                       Total days: <span className="font-bold">{calculateNumberOfDays()}</span>
//                     </p>
//                     <p className="text-gray-700">
//                       Approximate total plays: <span className="font-bold">{calculateNumberOfDays() * 24}</span>
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Pricing Section */}
//           <div className="mb-10">
//             <div className="flex items-center mb-6">
//               <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
//                 <span className="text-white font-bold">3</span>
//               </div>
//               <h3 className="text-xl font-bold text-gray-800">Pricing</h3>
//             </div>
            
//             <div className="border-l-4 border-red-600 pl-6 ml-4">
//               <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
//                 <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-100">
//                   <div className="text-gray-700">Billboard display rate</div>
//                   <div className="font-bold text-gray-900">$199 per day</div>
//                 </div>
                
//                 {startDate && endDate && (
//                   <>
//                     <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-100">
//                       <div className="text-gray-700">Selected days</div>
//                       <div className="font-bold text-gray-900">{calculateNumberOfDays()} days</div>
//                     </div>
                    
//                     <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-100">
//                       <div className="text-gray-700">Subtotal</div>
//                       <div className="font-bold text-gray-900">${199 * calculateNumberOfDays()}</div>
//                     </div>
                    
//                     {calculateNumberOfDays() >= 3 && (
//                       <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-100">
//                         <div className="text-green-600">Multi-day discount (10%)</div>
//                         <div className="font-bold text-green-600">-${Math.round(199 * calculateNumberOfDays() * 0.1)}</div>
//                       </div>
//                     )}
                    
//                     <div className="flex justify-between items-center mt-4">
//                       <div className="text-lg font-bold text-gray-900">Total</div>
//                       <div className="text-xl font-bold text-red-600">
//                         ${calculateTotal()}
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Navigation */}
//           <div className="flex justify-between pt-4 border-t border-gray-200">
//             <Link href="/service/billboard/upload">
//               <Button variant="outline" className="border-gray-300 hover:bg-gray-50 text-gray-700">
//                 <ChevronLeft className="mr-2 h-4 w-4" />
//                 Previous Step
//               </Button>
//             </Link>
//             <Button 
//               className="bg-red-600 hover:bg-red-700 text-white px-6"
//               disabled={!startDate || !endDate || isLoading}
//               onClick={initiatePayment}
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Loading...
//                 </>
//               ) : (
//                 <>
//                   Pay ${calculateTotal()}
//                   <ChevronRight className="ml-2 h-4 w-4" />
//                 </>
//               )}
//             </Button>
//           </div>
//         </div>
//       </Card>

//       {/* Payment Modal */}
//       {showPayment && clientSecret && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl w-full max-w-lg p-8 relative">
//             <button 
//               className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
//               onClick={closePayment}
//             >
//               ✕
//             </button>
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Payment</h2>
            
//             <Elements stripe={stripePromise} options={stripeOptions}>
//               <PaymentForm 
//                 amount={calculateTotal()} 
//                 onPaymentSuccess={handlePaymentSuccess}
//                 formData={formData}
//               />
//             </Elements>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DateSelection;



"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar, Clock, Info, Loader2 } from "lucide-react";
import Link from "next/link";
import { pb } from "@/lib/pocketbase";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { useCreateAdvertisement } from "@/hooks/useAdvertisement";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

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

const getFromIndexedDB = async (id) => {
  const db = await openIndexedDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);
    
    const request = store.get(id);
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

interface DateSelectionProps {
  onPrevious?: () => void;
  onContinue?: () => void;
}

const PaymentForm = ({ amount, onPaymentSuccess, formData }: { 
  amount: number;
  onPaymentSuccess: () => void;
  formData: any;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setPaymentError("");

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/service/billboard/confirmation`,
        receipt_email: email,
      },
      redirect: "if_required",
    });

    if (error) {
      setPaymentError(error.message || "Payment failed. Please try again.");
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      onPaymentSuccess();
    } else {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <LinkAuthenticationElement 
        onChange={(e) => setEmail(e.value.email)}
      />
      
      <PaymentElement />
      
      {paymentError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {paymentError}
        </div>
      )}
      
      <Button 
        type="submit" 
        className="w-full bg-red-600 hover:bg-red-700 text-white" 
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          `Pay $${amount}`
        )}
      </Button>
    </form>
  );
};

const DateSelection = ({ onPrevious, onContinue }: DateSelectionProps) => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectionMode, setSelectionMode] = useState<"start" | "end">("start");
  const [showPayment, setShowPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "default";
     const price = searchParams.get("price_per_month");

  const router = useRouter();
  const { mutate: createAdvertisement } = useCreateAdvertisement();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const storedData = localStorage.getItem('billboardFormData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setFormData(parsedData);
          
          // Check if we need to retrieve from IndexedDB
          if (parsedData.useIndexedDB) {
            try {
              const indexedDBData = await getFromIndexedDB(id);
              if (indexedDBData && indexedDBData.mediaData && indexedDBData.mediaData.file) {
                setMediaFile(indexedDBData.mediaData.file);
              } else {
                console.error("Failed to retrieve file from IndexedDB");
                router.push(`/service/billboard/upload?id=${id}`);
              }
            } catch (indexedDBError) {
              console.error("Error retrieving from IndexedDB:", indexedDBError);
              router.push(`/service/billboard/upload?id=${id}`);
            }
          } else if (!parsedData.file) {
            console.error("No file data found in stored form data");
            router.push(`/service/billboard/upload?id=${id}`);
          }
        } else {
          router.push(`/service/billboard/upload?id=${id}`);
        }
      } catch (error) {
        console.error("Error fetching form data:", error);
        router.push(`/service/billboard/upload?id=${id}`);
      }
    };
    
    fetchFormData();
  }, [id, router]);

  const handlePaymentSuccess = async () => {
    if (!startDate || !endDate || !formData) {
      console.error("Missing required data");
      return;
    }

    try {
 
      let pocketbaseUserId = null;
const userEmail = session?.user?.email;

if (userEmail) {
  try {
    // Authenticate as admin first 
    await pb.collection('_superusers').authWithPassword('testuser@gmail.com', 'nerick8518march');

    // Now query the user by email - admin auth bypasses email visibility restrictions
    const userRecord = await pb.collection('users').getFirstListItem(`email="${userEmail}"`);
    pocketbaseUserId = userRecord.id;
  } catch (userError) {
    console.warn("User not found in PocketBase or admin auth failed, proceeding as guest");
  }
}
      // Prepare the file
      let file;
      
      // If we have a file from IndexedDB
      if (mediaFile) {
        file = mediaFile;
      } 
      // Otherwise, convert base64 from localStorage to File
      else if (formData.file) {
        const base64Response = await fetch(formData.file);
        const blob = await base64Response.blob();
        file = new File([blob], formData.fileName || "billboard-media", {
          type: formData.fileType || (formData.mediaType === "photo" ? "image/jpeg" : "video/mp4")
        });
      } else {
        throw new Error("No media file available");
      }

      const formDataWithFile = new FormData();
      formDataWithFile.append('media', file);
      formDataWithFile.append('billboard_id', id);
      
      if (pocketbaseUserId) {
        formDataWithFile.append('user_id', pocketbaseUserId);
      }
      
      formDataWithFile.append('first_name', formData.firstName || "");
      formDataWithFile.append('last_name', formData.lastName || "");
      formDataWithFile.append('email', userEmail || "");
      formDataWithFile.append('brand', formData.brandName || "");
      formDataWithFile.append('phone_number', formData.phone || "");
      formDataWithFile.append('start_date', new Date(`${startDate}T00:00:00.000Z`).toISOString());
      formDataWithFile.append('end_date', new Date(`${endDate}T23:59:59.000Z`).toISOString());
      formDataWithFile.append('payment_status', "completed");
      formDataWithFile.append('amount_paid', calculateTotal().toString());

      const record = await pb.collection("advertisements").create(formDataWithFile);
      console.log("Advertisement created successfully:", record);
      
      // Clean up stored data
      localStorage.removeItem('billboardFormData');
      
      // Also clean up IndexedDB if needed
      try {
        const db = await openIndexedDB();
        const transaction = db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        store.delete(id);
      } catch (cleanupError) {
        console.warn("Error cleaning up IndexedDB:", cleanupError);
      }
      
      router.push("/service/billboard/confirmation");
      
    } catch (error: any) {
      console.error("Error in handlePaymentSuccess:", error);
      
      if (error?.response?.data) {
        const { data } = error.response;
        alert(`Validation error: ${JSON.stringify(data)}`);
      } else {
        alert(error.message || "Failed to complete booking. Please try again.");
      }
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  const isDateDisabled = (day: number) => {
    if (!day) return true;
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) return true;
    
    if (selectionMode === "end" && startDate) {
      const startDateObj = new Date(startDate);
      return date < startDateObj;
    }
    
    return false;
  };

  const isDateInRange = (day: number) => {
    if (!day || !startDate || !endDate) return false;
    
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    ).toISOString().split("T")[0];
    
    return date > startDate && date < endDate;
  };

  const handleDateClick = (day: number | null) => {
    if (!day || isDateDisabled(day)) return;
    
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    const dateString = date.toISOString().split("T")[0];
    
    if (selectionMode === "start") {
      setStartDate(dateString);
      setEndDate(null);
      setSelectionMode("end");
    } else {
      setEndDate(dateString);
      setSelectionMode("start");
    }
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const resetSelection = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectionMode("start");
  };

  const calculateNumberOfDays = () => {
    if (!startDate || !endDate) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const formatDateRange = () => {
    if (!startDate) return "Please select start date";
    if (!endDate) return `Start date: ${formatDate(startDate)} - Select end date`;
    
    return `${formatDate(startDate)} to ${formatDate(endDate)} (${calculateNumberOfDays()} days)`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short', 
      month: 'short', 
      day: 'numeric'
    });
  };

  const calculateTotal = () => {
    const days = calculateNumberOfDays();
    if (days >= 3) {
      return Math.round(price * days * 0.9);
    }
    return price * days;
  };

  const initiatePayment = async () => {
    if (!startDate || !endDate) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: calculateTotal() * 100,
          currency: 'usd',
          metadata: {
            startDate,
            endDate,
            numberOfDays: calculateNumberOfDays(),
            billboardId: id,
            userId: session?.user?.id || "guest",
          },
        }),
      });

      const data = await response.json();
      
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        setShowPayment(true);
      } else {
        console.error('Failed to get client secret');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const closePayment = () => {
    setShowPayment(false);
  };

  const stripeOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#dc2626',
        colorBackground: '#ffffff',
        colorText: '#1f2937',
        colorDanger: '#ef4444',
        fontFamily: 'system-ui, sans-serif',
        borderRadius: '8px',
      },
    },
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="overflow-hidden rounded-xl shadow-2xl">
        <div className="bg-red-600 p-6 text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 rounded-full -translate-y-1/2 translate-x-1/2 opacity-40"></div>
          <h2 className="text-3xl font-bold relative z-10">Select Display Dates</h2>
          <p className="mt-1 text-red-100 relative z-10">Choose when your content will appear on our billboard</p>
        </div>
        
        <div className="p-8">
          {/* Date Selection Section */}
          <div className="mb-10">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Choose Your Display Dates</h3>
            </div>
            
            <div className="border-l-4 border-red-600 pl-6 ml-4">
              <div className="flex items-center mb-4 text-center">
                <div className={`flex-1 p-3 rounded-l-lg border ${selectionMode === "start" ? "bg-red-50 border-red-300" : "bg-gray-50 border-gray-200"}`}>
                  <div className="text-sm font-medium text-gray-500">STEP 1</div>
                  <div className={`font-bold ${selectionMode === "start" ? "text-red-600" : "text-gray-700"}`}>Select Start Date</div>
                </div>
                <div className={`flex-1 p-3 rounded-r-lg border ${selectionMode === "end" ? "bg-red-50 border-red-300" : "bg-gray-50 border-gray-200"}`}>
                  <div className="text-sm font-medium text-gray-500">STEP 2</div>
                  <div className={`font-bold ${selectionMode === "end" ? "text-red-600" : "text-gray-700"}`}>Select End Date</div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePreviousMonth}
                    className="border-red-200 hover:bg-red-50 hover:border-red-300"
                  >
                    <ChevronLeft className="h-4 w-4 text-red-600" />
                  </Button>
                  <h3 className="text-xl font-bold text-red-600">
                    {formatMonth(currentMonth)}
                  </h3>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNextMonth}
                    className="border-red-200 hover:bg-red-50 hover:border-red-300"
                  >
                    <ChevronRight className="h-4 w-4 text-red-600" />
                  </Button>
                </div>

                <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
                  <div className="grid grid-cols-7 gap-2 mb-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <div
                          key={day}
                          className="text-center text-sm font-medium py-2 text-gray-700"
                        >
                          {day}
                        </div>
                      )
                    )}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {getDaysInMonth(currentMonth).map((day, index) => {
                      if (!day) return <div key={index} className="invisible p-3"></div>;
                      
                      const date = new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth(),
                        day
                      ).toISOString().split("T")[0];
                      
                      const isStart = date === startDate;
                      const isEnd = date === endDate;
                      const isRange = isDateInRange(day);
                      const isDisabled = isDateDisabled(day);
                      
                      return (
                        <div
                          key={index}
                          className={`
                            p-3 text-center transition-all cursor-pointer relative
                            ${isDisabled ? "text-gray-300 cursor-not-allowed" : "hover:bg-red-50 border border-transparent hover:border-red-200"}
                            ${isStart ? "bg-red-600 text-white hover:bg-red-700 border border-red-600 rounded-l-lg" : ""}
                            ${isEnd ? "bg-red-600 text-white hover:bg-red-700 border border-red-600 rounded-r-lg" : ""}
                            ${isRange ? "bg-red-100 text-red-800 border-red-200" : ""}
                            ${(isStart || isEnd) && "z-10"}
                          `}
                          onClick={() => !isDisabled && handleDateClick(day)}
                        >
                          {day}
                          {isStart && (
                            <span className="absolute bottom-0 left-0 right-0 text-xs font-medium text-white">Start</span>
                          )}
                          {isEnd && (
                            <span className="absolute bottom-0 left-0 right-0 text-xs font-medium text-white">End</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={resetSelection}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  Reset Selection
                </Button>
                <div className="text-sm text-gray-600">
                  {selectionMode === "start" ? "Select start date first" : "Now select end date"}
                </div>
              </div>
              
              <div className="flex items-start p-4 bg-red-50 rounded-xl border border-red-100">
                <Calendar className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-red-800 font-medium">
                    {formatDateRange()}
                  </p>
                  {startDate && endDate && (
                    <p className="text-red-600 text-sm mt-1">
                      {calculateNumberOfDays()} day billboard booking
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Display Information Section */}
          <div className="mb-10">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Display Information</h3>
            </div>
            
            <div className="border-l-4 border-red-600 pl-6 ml-4">
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <div className="flex items-start mb-6">
                  <Clock className="h-5 w-5 text-red-600 mt-0.5 mr-3" />
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Display Schedule</h4>
                    <p className="text-gray-700">
                      Your content will play 15 seconds every hour, each day during your selected date range.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-red-600 mt-0.5 mr-3" />
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Important Note</h4>
                    <p className="text-gray-700 mb-2">
                      We will send you your hourly time slots at least 1 day prior to your display start date.
                    </p>
                    <p className="text-sm text-gray-600">
                      *We ensure a minimum of 22 plays per day in case of power shortages or technical issues. Under normal circumstances, your content will play once per hour from midnight to 11pm on each day of your booking.
                    </p>
                  </div>
                </div>
                
                {startDate && endDate && calculateNumberOfDays() > 1 && (
                  <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-100">
                    <h4 className="font-bold text-red-800 mb-1">Multi-Day Booking Summary</h4>
                    <p className="text-gray-700">
                      Total days: <span className="font-bold">{calculateNumberOfDays()}</span>
                    </p>
                    <p className="text-gray-700">
                      Approximate total plays: <span className="font-bold">{calculateNumberOfDays() * 24}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mb-10">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Pricing</h3>
            </div>
            
            <div className="border-l-4 border-red-600 pl-6 ml-4">
              <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-100">
                  <div className="text-gray-700">Billboard display rate</div>
                  <div className="font-bold text-gray-900">{price}</div>
                </div>
                
                {startDate && endDate && (
                  <>
                    <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-100">
                      <div className="text-gray-700">Selected days</div>
                      <div className="font-bold text-gray-900">{calculateNumberOfDays()} days</div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-100">
                      <div className="text-gray-700">Subtotal</div>
                      <div className="font-bold text-gray-900">${price * calculateNumberOfDays()}</div>
                    </div>
                    
                    {calculateNumberOfDays() >= 3 && (
                      <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-100">
                        <div className="text-green-600">Multi-day discount (10%)</div>
                        <div className="font-bold text-green-600">-${Math.round(price * calculateNumberOfDays() * 0.1)}</div>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-lg font-bold text-gray-900">Total</div>
                      <div className="text-xl font-bold text-red-600">
                        ${calculateTotal()}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-4 border-t border-gray-200">
            <Link href="/service/billboard/upload">
              <Button variant="outline" className="border-gray-300 hover:bg-gray-50 text-gray-700">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous Step
              </Button>
            </Link>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white px-6"
              disabled={!startDate || !endDate || isLoading}
              onClick={initiatePayment}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  Pay ${calculateTotal()}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Payment Modal */}
      {showPayment && clientSecret && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg p-8 relative">
            <button 
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={closePayment}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Payment</h2>
            
            <Elements stripe={stripePromise} options={stripeOptions}>
              <PaymentForm 
                amount={calculateTotal()} 
                onPaymentSuccess={handlePaymentSuccess}
                formData={formData}
              />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSelection;