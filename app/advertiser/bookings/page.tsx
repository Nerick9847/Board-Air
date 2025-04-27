"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Calendar, 
  User, 
  Clock, 
  Image as ImageIcon, 
  Building, 
  Mail, 
  Phone, 
  ExternalLink,
  Loader2,
  X as XIcon
} from "lucide-react";
import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090');

export default function BookingsPage() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  
  // Get current user
  const currentUser = pb.authStore.model;
  
  // Fetch advertisements data for current user
  const { data: bookings, isLoading, isError, error } = useQuery({
    queryKey: ['advertisements', currentUser?.id],
    queryFn: async () => {
      if (!currentUser?.id) return [];
      const records = await pb.collection('advertisements').getList(1, 50, {
        filter: `user_id = "${currentUser.id}"`,
        sort: '-created',
        expand: 'billboard_id'
      });
      return records.items;
    }
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  };

  const getMediaUrl = (booking: any) => {
    if (!booking.media) return null;
    return pb.getFileUrl(booking, booking.media);
  };

  const openMediaViewer = (booking: any) => {
    const mediaUrl = getMediaUrl(booking);
    if (mediaUrl) {
      setSelectedMedia({
        url: mediaUrl,
        filename: booking.media,
        brand: booking.brand
      });
    }
  };

  const closeMediaViewer = () => {
    setSelectedMedia(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="p-6 bg-red-50 text-red-700 rounded-lg max-w-lg mx-auto">
          <h2 className="text-lg font-semibold mb-2">Error loading bookings</h2>
          <p>{error?.message || "Something went wrong. Please try again later."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            My Billboard Bookings
          </h1>
          <p className="text-lg text-gray-600">
            View all your billboard booking requests
          </p>
        </div>

        {/* Bookings Grid */}
        <div className="grid gap-8">
          {bookings && bookings.length > 0 ? (
            bookings.map((booking: any) => (
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
                          {booking.brand}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <User size={16} />
                        <span>{booking.first_name} {booking.last_name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={16} />
                        <span>{booking.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar size={16} />
                        <span className="text-sm font-medium">Booked Date</span>
                      </div>
                      <p className="text-gray-900">{formatDate(booking.created)}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock size={16} />
                        <span className="text-sm font-medium">Start Date</span>
                      </div>
                      <p className="text-gray-900">{formatDate(booking.start_date)}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock size={16} />
                        <span className="text-sm font-medium">End Date</span>
                      </div>
                      <p className="text-gray-900">{formatDate(booking.end_date)}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock size={16} />
                        <span className="text-sm font-medium">Duration</span>
                      </div>
                      <p className="text-gray-900">{calculateDuration(booking.start_date, booking.end_date)}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone size={16} />
                        <span className="text-sm font-medium">Contact</span>
                      </div>
                      <p className="text-gray-900">{booking.phone_number}</p>
                    </div>
                  </div>

                  {/* Media File Section */}
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <ImageIcon size={16} />
                        <span className="text-sm font-medium">Media File</span>
                      </div>
                      {booking.media && (
                        <Button
                          onClick={() => openMediaViewer(booking)}
                          className="flex items-center gap-2 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                        >
                          <ExternalLink size={16} />
                          View Media
                        </Button>
                      )}
                    </div>
                    <div className="bg-gray-50 px-4 py-3 rounded-lg">
                      <p className="text-gray-900">{booking.media || "No media file"}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">No bookings found</p>
            </div>
          )}
        </div>
      </div>

      {/* Media Viewer Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-lg">
                {selectedMedia.brand} - {selectedMedia.filename}
              </h3>
              <Button 
                onClick={closeMediaViewer}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <XIcon size={20} />
              </Button>
            </div>
            <div className="p-4 overflow-auto flex-1">
              {selectedMedia.url && (
                selectedMedia.filename.match(/\.(jpeg|jpg|png|gif|webp)$/i) ? (
                  <img 
                    src={selectedMedia.url} 
                    alt={selectedMedia.filename}
                    className="max-w-full mx-auto"
                  />
                ) : selectedMedia.filename.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video 
                    src={selectedMedia.url} 
                    controls
                    className="max-w-full mx-auto"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="flex items-center justify-center p-8">
                    <div className="text-center">
                      <p className="mb-2">File type not previewable</p>
                      <a 
                        href={selectedMedia.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center justify-center gap-2"
                      >
                        <ExternalLink size={16} />
                        Open file in new tab
                      </a>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="p-4 border-t flex justify-end">
              <Button
                onClick={closeMediaViewer}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}