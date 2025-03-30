"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { jsPDF } from "jspdf";
import { 
  CreditCard, 
  Calendar, 
  Download, 
  User, 
  DollarSign,
  FileText,
  Search,
  BuildingIcon
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Transactions() {
  const [transactions, setTransactions] = useState([
    { 
      id: 1, 
      paymentType: "Credit Card", 
      amount: 500,
      date: "2025-02-22", 
      from: "John Doe",
      status: "completed",
      cardLastFour: "4242",
      company: "Tech Solutions Inc."
    },
    { 
      id: 2, 
      paymentType: "Bank Transfer", 
      amount: 750,
      date: "2025-02-21", 
      from: "Jane Smith",
      status: "completed",
      accountLastFour: "8890",
      company: "Design Studio Co."
    },
    { 
      id: 3, 
      paymentType: "Credit Card", 
      amount: 1200,
      date: "2025-02-20", 
      from: "Mike Johnson",
      status: "completed",
      cardLastFour: "1234",
      company: "Marketing Pro LLC"
    }
  ]);

  const generateInvoice = (transaction) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFontSize(24);
    doc.setTextColor(44, 62, 80);
    doc.text("INVOICE", pageWidth / 2, 20, { align: "center" });
    
    // Company Info
    doc.setFontSize(12);
    doc.text("Billboard Management System", 20, 40);
    doc.text(new Date().toLocaleDateString(), pageWidth - 20, 40, { align: "right" });
    
    // Customer Info
    doc.setFontSize(14);
    doc.text("Bill To:", 20, 60);
    doc.setFontSize(12);
    doc.text(transaction.company, 20, 70);
    doc.text(transaction.from, 20, 80);
    
    // Transaction Details
    doc.setFillColor(241, 242, 246);
    doc.rect(20, 100, pageWidth - 40, 10, "F");
    doc.setTextColor(44, 62, 80);
    doc.text("Transaction Details", 30, 107);
    
    doc.text(`Payment Type: ${transaction.paymentType}`, 20, 120);
    doc.text(`Amount: $${transaction.amount.toLocaleString()}`, 20, 130);
    doc.text(`Date: ${new Date(transaction.date).toLocaleDateString()}`, 20, 140);
    doc.text(`Transaction ID: ${transaction.id}`, 20, 150);
    
    doc.save(`invoice_${transaction.id}.pdf`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const PaymentTypeIcon = ({ type }) => {
    return type === "Credit Card" ? (
      <CreditCard className="text-blue-500" size={20} />
    ) : (
      <BuildingIcon className="text-green-500" size={20} />
    );
  };

  return (
    <Layout title="Transaction Management">
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 py-12">
          {/* Header Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Transactions
            </h1>
            <div className="flex items-center justify-between">
              <p className="text-lg text-gray-600">
                Manage and track your payment transactions
              </p>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    placeholder="Search transactions..." 
                    className="pl-10 pr-4 py-2 w-64 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-white">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <DollarSign className="text-blue-500" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${transactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-white">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <FileText className="text-green-500" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Transactions</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {transactions.length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <CreditCard className="text-purple-500" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Methods</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Transactions List */}
          <div className="grid gap-6">
            {transactions.map((transaction) => (
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
                          ${transaction.amount.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar size={14} />
                          {formatDate(transaction.date)}
                        </div>
                      </div>
                      
                      <Button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 flex items-center gap-2"
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
                        <span className="font-medium">Payment Method:</span>
                        {transaction.paymentType}
                        {transaction.cardLastFour && ` (**** ${transaction.cardLastFour})`}
                        {transaction.accountLastFour && ` (**** ${transaction.accountLastFour})`}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Transaction ID:</span>
                        #{transaction.id}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}