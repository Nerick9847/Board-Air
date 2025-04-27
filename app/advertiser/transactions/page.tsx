"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { jsPDF } from "jspdf";
import { 
  CreditCard, 
  Calendar, 
  Download, 
  User, 
  DollarSign,
  FileText,
  Search,
  Building,
  Loader2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import PocketBase from 'pocketbase';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { data: session } = useSession();
  const currentUserId = session?.user?.id || "";
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (!currentUserId) return;
        
        // Fetch advertisements for the current user (advertiser)
        const records = await pb.collection('advertisements').getFullList({
          expand: 'billboard_id',
          sort: '-created',
          filter: `user_id = "${currentUserId}"`
        });
        
        // Transform the data into transaction format
        const formattedTransactions = records.map(ad => {
          // Ensure amount is properly parsed - use price field if amount_paid doesn't exist
          const amount = ad.amount_paid ? parseFloat(ad.amount_paid) : 
                         ad.price ? parseFloat(ad.price) : 0;
          
          return {
            id: ad.id,
            paymentType: ad.payment_method || "Stripe",
            amount: amount,
            date: ad.created,
            status: ad.payment_status || "completed",
            company: ad.brand || 'My Advertisement',
            billboardLocation: ad.expand?.billboard_id?.location || 'Unknown Location',
            duration: `${new Date(ad.start_date).toLocaleDateString()} - ${new Date(ad.end_date).toLocaleDateString()}`,
            billboardName: ad.expand?.billboard_id?.name || 'Unknown Billboard',
            firstName: ad.first_name || '',
            lastName: ad.last_name || ''
          };
        });
        
        setTransactions(formattedTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [currentUserId]);

  const generateInvoice = (transaction) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = margin;
    
    // Add logo or header
    doc.setFontSize(24);
    doc.setTextColor(44, 62, 80);
    doc.text("INVOICE", pageWidth / 2, yPosition, { align: "center" });
    yPosition += 20;

    // Company Info
    doc.setFontSize(12);
    doc.text("Board Air", margin, yPosition);
    doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, pageWidth - margin, yPosition, { align: "right" });
    yPosition += 15;

    // Divider
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Customer Info
    doc.setFontSize(14);
    doc.text("Bill To:", margin, yPosition);
    yPosition += 10;
    doc.setFontSize(12);
    doc.text(transaction.company, margin, yPosition);
    yPosition += 7;
    doc.text(`${transaction.firstName} ${transaction.lastName}`.trim(), margin, yPosition);
    yPosition += 15;

    // Transaction Details Header
    doc.setFillColor(241, 242, 246);
    doc.rect(margin, yPosition, pageWidth - margin * 2, 10, "F");
    doc.setTextColor(44, 62, 80);
    doc.setFontSize(12);
    doc.text("Description", margin + 5, yPosition + 7);
    doc.text("Amount", pageWidth - margin - 25, yPosition + 7, { align: "right" });
    yPosition += 15;

    // Transaction Items
    doc.setFontSize(11);
    
    // Billboard Rental
    doc.text(`Billboard Advertising - ${transaction.billboardName}`, margin + 5, yPosition);
    doc.text(`$${transaction.amount.toFixed(2)}`, pageWidth - margin - 25, yPosition, { align: "right" });
    yPosition += 10;
    
    // Location
    doc.text(`Location: ${transaction.billboardLocation}`, margin + 5, yPosition);
    yPosition += 10;
    
    // Duration
    doc.text(`Duration: ${transaction.duration}`, margin + 5, yPosition);
    yPosition += 10;
    
    // Payment Method
    doc.text(`Payment Method: ${transaction.paymentType}`, margin + 5, yPosition);
    yPosition += 15;

    // Total
    doc.setFontSize(12);
    doc.setDrawColor(200, 200, 200);
    doc.line(pageWidth - margin - 60, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;
    doc.text("Total:", pageWidth - margin - 50, yPosition);
    doc.text(`$${transaction.amount.toFixed(2)}`, pageWidth - margin - 25, yPosition, { align: "right" });
    yPosition += 15;

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("Thank you for your business!", pageWidth / 2, yPosition, { align: "center" });
    yPosition += 5;
    doc.text("Want to Advertise Again? Visit BoardAir", pageWidth / 2, yPosition, { align: "center" });

    doc.save(`invoice_${transaction.id}.pdf`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const PaymentTypeIcon = ({ type }) => {
    return type === "Credit Card" ? (
      <CreditCard className="text-blue-500" size={20} />
    ) : (
      <Building className="text-green-500" size={20} />
    );
  };

  const filteredTransactions = transactions.filter(transaction => 
    transaction.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.billboardLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.billboardName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${transaction.firstName} ${transaction.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin text-gray-500" size={24} />
          <span className="text-gray-600">Loading transactions...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            My Transactions
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            View all your payment transactions
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              asChild
              variant="outline"
              className="border-gray-300 hover:bg-gray-50"
            >
              <a href="/advertiser/bookings">Bookings</a>
            </Button>
            <Button 
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Transactions
            </Button>
          </div>
        </div>

        {/* Search and Stats */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search transactions..." 
              className="pl-10 pr-4 py-2 w-full bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="text-lg font-bold text-gray-900">
                ${transactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600">Total Ads</p>
              <p className="text-lg font-bold text-gray-900">
                {transactions.length}
              </p>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="grid gap-6">
          {filteredTransactions.length === 0 ? (
            <Card className="text-center py-12 bg-white">
              <div className="flex flex-col items-center gap-4">
                <CreditCard className="h-12 w-12 text-gray-400" />
                <div>
                  <p className="text-gray-500 mb-3">
                    {currentUserId 
                      ? "You don't have any transactions yet" 
                      : "Please sign in to view transactions"}
                  </p>
                  {currentUserId && (
                    <Button 
                      asChild
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      <a href="/billboards">Browse Billboards</a>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ) : (
            filteredTransactions.map((transaction) => (
              <Card 
                key={transaction.id} 
                className="bg-white overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <PaymentTypeIcon type={transaction.paymentType} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {transaction.company}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {transaction.billboardName}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">
                          ${transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar size={14} />
                          {formatDate(transaction.date)}
                        </div>
                      </div>
                      
                      <Button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 flex items-center gap-2"
                        onClick={() => generateInvoice(transaction)}
                      >
                        <Download size={18} />
                        Invoice
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Location:</span>
                        {transaction.billboardLocation}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Payment Method:</span>
                        {transaction.paymentType}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Status:</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                          transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}