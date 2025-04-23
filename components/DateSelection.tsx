"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar, Clock, Info, Loader2 } from "lucide-react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";

// Replace with your publishable key from Stripe Dashboard
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "your_stripe_publishable_key");

interface DateSelectionProps {
  onPrevious?: () => void;
  onContinue?: () => void;
}

// Payment Form Component
const PaymentForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setPaymentError("");

    // Create the payment
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
      setPaymentSucceeded(true);
      // Redirect or show success message
      window.location.href = "/service/billboard/confirmation";
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
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 1)); // February 2025
  const [selectionMode, setSelectionMode] = useState<"start" | "end">("start");
  const [showPayment, setShowPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    
    // Disable dates before today
    if (date < today) return true;
    
    // If selecting end date, disable dates before start date
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
      return Math.round(199 * days * 0.9);
    }
    return 199 * days;
  };

  // Create payment intent and get client secret
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
          amount: calculateTotal() * 100, // Stripe uses cents
          currency: 'usd',
          metadata: {
            startDate,
            endDate,
            numberOfDays: calculateNumberOfDays(),
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

  // Close payment modal
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
        {/* Red header banner */}
        <div className="bg-red-600 p-6 text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 rounded-full -translate-y-1/2 translate-x-1/2 opacity-40"></div>
          <h2 className="text-3xl font-bold relative z-10">Select Display Dates</h2>
          <p className="mt-1 text-red-100 relative z-10">Choose when your content will appear on our billboard</p>
        </div>
        
        <div className="p-8">
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
                  <div className="font-bold text-gray-900">$199 per day</div>
                </div>
                
                {startDate && endDate && (
                  <>
                    <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-100">
                      <div className="text-gray-700">Selected days</div>
                      <div className="font-bold text-gray-900">{calculateNumberOfDays()} days</div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-100">
                      <div className="text-gray-700">Subtotal</div>
                      <div className="font-bold text-gray-900">${199 * calculateNumberOfDays()}</div>
                    </div>
                    
                    {calculateNumberOfDays() >= 3 && (
                      <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-100">
                        <div className="text-green-600">Multi-day discount (10%)</div>
                        <div className="font-bold text-green-600">-${Math.round(199 * calculateNumberOfDays() * 0.1)}</div>
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
              <PaymentForm amount={calculateTotal()} />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSelection;