"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
  BuildingIcon,
  Loader2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090');

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get current user
  const currentUser = pb.authStore.model;

  // Fetch transactions for current user
  const { data: transactions, isLoading, isError } = useQuery({
    queryKey: ['transactions', currentUser?.id],
    queryFn: async () => {
      if (!currentUser?.id) return [];
      const records = await pb.collection('advertisements').getFullList({
        filter: `user_id = "${currentUser.id}"`,
        expand: 'billboard_id',
        sort: '-created',
      });
      
      return records.map(ad => ({
        id: ad.user_id,
        paymentType: "Stripe", // Default payment type
        amount: parseFloat(ad.amount_paid) || 0,
        date: ad.created,
        from: `${ad.first_name} ${ad.last_name}`.trim() || 'Unknown',
        status: "completed",
        company: ad.brand || 'Unknown Brand',
        billboardLocation: ad.expand?.billboard_id?.location || 'Unknown Location',
        duration: `${new Date(ad.start_date).toLocaleDateString()} - ${new Date(ad.end_date).toLocaleDateString()}`,
        media: ad.media
      }));
    }
  });

  const generateInvoice = (transaction: any) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = margin;
    
    doc.setFontSize(24);
    doc.setTextColor(44, 62, 80);
    doc.text("INVOICE", pageWidth / 2, yPosition, { align: "center" });
    yPosition += 20;

    doc.setFontSize(12);
    doc.text("Board Air", margin, yPosition);
    doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, pageWidth - margin, yPosition, { align: "right" });
    yPosition += 15;

    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    doc.setFontSize(14);
    doc.text("Bill To:", margin, yPosition);
    yPosition += 10;
    doc.setFontSize(12);
    doc.text(transaction.company, margin, yPosition);
    yPosition += 7;
    doc.text(transaction.from, margin, yPosition);
    yPosition += 15;

    doc.setFillColor(241, 242, 246);
    doc.rect(margin, yPosition, pageWidth - margin * 2, 10, "F");
    doc.setTextColor(44, 62, 80);
    doc.setFontSize(12);
    doc.text("Description", margin + 5, yPosition + 7);
    doc.text("Amount", pageWidth - margin - 25, yPosition + 7, { align: "right" });
    yPosition += 15;

    doc.setFontSize(11);
    doc.text(`Billboard Advertising - ${transaction.billboardLocation}`, margin + 5, yPosition);
    doc.text(`$${transaction.amount.toFixed(2)}`, pageWidth - margin - 25, yPosition, { align: "right" });
    yPosition += 10;
    
    doc.text(`Duration: ${transaction.duration}`, margin + 5, yPosition);
    yPosition += 10;
    
    doc.text(`Payment Method: ${transaction.paymentType}`, margin + 5, yPosition);
    yPosition += 15;

    doc.setFontSize(12);
    doc.setDrawColor(200, 200, 200);
    doc.line(pageWidth - margin - 60, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;
    doc.text("Total:", pageWidth - margin - 50, yPosition);
    doc.text(`$${transaction.amount.toFixed(2)}`, pageWidth - margin - 25, yPosition, { align: "right" });
    yPosition += 15;

    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("Thank you for your business!", pageWidth / 2, yPosition, { align: "center" });
    yPosition += 5;
    doc.text("Want to Air Again? Lets BoardAir", 
      pageWidth / 2, yPosition, { align: "center" });

    doc.save(`invoice_${transaction.id}.pdf`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const PaymentTypeIcon = ({ type }: { type: string }) => {
    return type === "Credit Card" ? (
      <CreditCard className="text-blue-500" size={20} />
    ) : (
      <BuildingIcon className="text-green-500" size={20} />
    );
  };

  const filteredTransactions = transactions?.filter((transaction: any) => 
    transaction.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.billboardLocation.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin text-blue-500" size={24} />
          <span>Loading transactions...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="p-6 bg-red-50 text-red-700 rounded-lg max-w-lg mx-auto">
          <h2 className="text-lg font-semibold mb-2">Error loading transactions</h2>
          <p>Something went wrong. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                My Transactions
              </h1>
              <p className="text-lg text-gray-600">
                Manage and track your payment transactions
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="Search transactions..." 
                  className="pl-10 pr-4 py-2 w-64 bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 bg-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <DollarSign className="text-red-700" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${transactions?.reduce((sum: number, t: any) => sum + t.amount, 0).toLocaleString(undefined, { minimumFractionDigits: 2 }) || '0.00'}
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <FileText className="text-green-700" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {transactions?.length || 0}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <CreditCard className="text-purple-800" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Methods</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(transactions?.map((t: any) => t.paymentType)).size || 1}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Transactions List */}
        <div className="grid gap-6">
          {filteredTransactions.length === 0 ? (
            <Card className="p-8 text-center bg-white">
              <p className="text-gray-500">No transactions found</p>
            </Card>
          ) : (
            filteredTransactions.map((transaction: any) => (
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
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <User size={14} />
                          {transaction.from}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          ${transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar size={14} />
                          {formatDate(transaction.date)}
                        </div>
                      </div>
                      
                      <Button
                        className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 flex items-center gap-2"
                        onClick={() => generateInvoice(transaction)}
                      >
                        <Download size={18} />
                        Invoice
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Billboard Location:</span>
                        {transaction.billboardLocation}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Payment Method:</span>
                        {transaction.paymentType}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Transaction ID:</span>
                        #{transaction.id}
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