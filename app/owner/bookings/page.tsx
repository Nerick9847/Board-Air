"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Check, X, Calendar, User, Clock, Image as ImageIcon, Building, MapPin } from "lucide-react";

export default function Bookings() {
  const [bookings, setBookings] = useState([
    { 
      id: 1, 
      advertiser: "John Doe", 
      company: "Tech Solutions Inc.",
      bookedDate: "2025-02-10", 
      airDate: "2025-03-01", 
      media: "Billboard Ad Campaign.jpg",
      status: "pending",
      duration: "30 days",
      location: "Central Plaza Billboard"
    },
    { 
      id: 2, 
      advertiser: "Jane Smith", 
      company: "Fashion Brands Co.",
      bookedDate: "2025-02-15", 
      airDate: "2025-03-05", 
      media: "Spring Collection Launch.mp4",
      status: "pending",
      duration: "45 days",
      location: "Highway Junction Display"
    }
  ]);

  const handleStatusChange = (id, newStatus) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Layout title="Booking Management">
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 py-12">
          {/* Header Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Billboard Bookings
            </h1>
            <div className="flex items-center justify-between">
              <p className="text-lg text-gray-600">
                Manage your billboard booking requests
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Pending</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Accepted</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Declined</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bookings Grid */}
          <div className="grid gap-8">
            {bookings.map((booking) => (
              <Card 
                key={booking.id} 
                className="bg-white overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-8">
                  {/* Booking Header */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <Building size={18} />
                        <span className="text-2xl font-semibold text-gray-900">
                          {booking.company}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <User size={16} />
                        <span>{booking.advertiser}</span>
                      </div>
                    </div>
                    
                    {booking.status === 'pending' && (
                      <div className="flex gap-3">
                        <Button
                          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 flex items-center gap-2 rounded-lg transition-colors"
                          onClick={() => handleStatusChange(booking.id, 'accepted')}
                        >
                          <Check size={18} />
                          Accept
                        </Button>
                        <Button
                          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 flex items-center gap-2 rounded-lg transition-colors"
                          onClick={() => handleStatusChange(booking.id, 'declined')}
                        >
                          <X size={18} />
                          Decline
                        </Button>
                      </div>
                    )}

                    {booking.status === 'accepted' && (
                      <div className="px-4 py-2 rounded-lg bg-green-50 text-green-700 font-medium">
                        Accepted
                      </div>
                    )}

                    {booking.status === 'declined' && (
                      <div className="px-4 py-2 rounded-lg bg-red-50 text-red-700 font-medium">
                        Declined
                      </div>
                    )}
                  </div>

                  {/* Booking Details Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar size={16} />
                        <span className="text-sm font-medium">Booked Date</span>
                      </div>
                      <p className="text-gray-900">{formatDate(booking.bookedDate)}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock size={16} />
                        <span className="text-sm font-medium">Air Date</span>
                      </div>
                      <p className="text-gray-900">{formatDate(booking.airDate)}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock size={16} />
                        <span className="text-sm font-medium">Duration</span>
                      </div>
                      <p className="text-gray-900">{booking.duration}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin size={16} />
                        <span className="text-sm font-medium">Location</span>
                      </div>
                      <p className="text-gray-900">{booking.location}</p>
                    </div>
                  </div>

                  {/* Media File Section */}
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <ImageIcon size={16} />
                      <span className="text-sm font-medium">Media File</span>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 rounded-lg">
                      <p className="text-gray-900">{booking.media}</p>
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