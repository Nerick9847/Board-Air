"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { 
  Calendar, 
  User, 
  Clock, 
  Image as ImageIcon, 
  Building, 
  Loader2, 
  Mail, 
  Phone, 
  ExternalLink,
  X as XIcon
} from "lucide-react";
import PocketBase from 'pocketbase';

// Initialize PocketBase client
const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090');

export default function Bookings() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const { data: session } = useSession();
  const currentOwnerId = session?.user?.id || "";
  
  // Fetch advertisements data from PocketBase, filtered by owner
  const { data: bookings, isLoading, isError, error } = useQuery({
    queryKey: ['advertisements', currentOwnerId],
    queryFn: async () => {
      if (!currentOwnerId) return [];
      
      try {
        // Fetch all billboards owned by the current user
        const ownedBillboards = await pb.collection('billboards').getFullList({
          filter: `owner_id ~ "${currentOwnerId}"`
        });
        
        // Extract billboard IDs
        const billboardIds = ownedBillboards.map(b => b.id);
        
        // If no billboards, return empty array
        if (billboardIds.length === 0) return [];
        
        // Create filter string for bookings
        let filterString = '';
        if (billboardIds.length === 1) {
          filterString = `billboard_id = "${billboardIds[0]}"`;
        } else {
          filterString = billboardIds.map(id => `billboard_id = "${id}"`).join(' || ');
        }
        
        // Now get bookings for these billboards only
        const records = await pb.collection('advertisements').getFullList({
          sort: '-created',
          expand: 'billboard_id,user_id',
          filter: filterString
        });
        
        return records;
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
        throw new Error("Failed to load bookings data");
      }
    },
    enabled: !!currentOwnerId 
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  };

  const getMediaUrl = (booking) => {
    if (!booking.media) return null;
    return pb.getFileUrl(booking, booking.media);
  };

  const openMediaViewer = (booking) => {
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
      <Layout title="Booking Management">
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            <p className="text-gray-600">Loading bookings...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout title="Booking Management">
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="p-6 bg-red-50 text-red-700 rounded-lg max-w-lg mx-auto">
            <h2 className="text-lg font-semibold mb-2">Error loading bookings</h2>
            <p>{error?.message || "Something went wrong while fetching bookings. Please try again later."}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-red-500 hover:bg-red-600 text-white"
            >
              Retry
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Booking Management">
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              My Billboard Bookings
            </h1>
            <p className="text-lg text-gray-600">
              View all bookings for your billboards
            </p>
          </div>

          <div className="grid gap-6">
            {bookings && bookings.length > 0 ? (
              bookings.map((booking) => (
                <Card 
                  key={booking.id} 
                  className="bg-white overflow-hidden border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Building className="h-5 w-5 text-gray-500" />
                          <h2 className="text-xl font-semibold text-gray-900">
                            {booking.brand}
                          </h2>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <User className="h-4 w-4" />
                          <span>{booking.first_name} {booking.last_name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="h-4 w-4" />
                          <span>{booking.email}</span>
                        </div>
                      </div>
                      
                      {booking.expand?.billboard_id && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <h3 className="font-medium text-gray-900 mb-1">Billboard</h3>
                          <p className="text-gray-600">{booking.expand.billboard_id.name}</p>
                          <p className="text-gray-600 text-sm">{booking.expand.billboard_id.location}</p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm font-medium">Booked Date</span>
                        </div>
                        <p className="text-gray-900">{formatDate(booking.created)}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm font-medium">Start Date</span>
                        </div>
                        <p className="text-gray-900">{formatDate(booking.start_date)}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm font-medium">End Date</span>
                        </div>
                        <p className="text-gray-900">{formatDate(booking.end_date)}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm font-medium">Duration</span>
                        </div>
                        <p className="text-gray-900">{calculateDuration(booking.start_date, booking.end_date)}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="h-4 w-4" />
                          <span className="text-sm font-medium">Contact</span>
                        </div>
                        <p className="text-gray-900">{booking.phone_number}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-600">
                          <ImageIcon className="h-4 w-4" />
                          <span className="text-sm font-medium">Media File</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-900 truncate">
                            {booking.media || "No media file"}
                          </p>
                          {booking.media && (
                            <Button
                              onClick={() => openMediaViewer(booking)}
                              variant="outline"
                              size="sm"
                              className="ml-2 bg-red-500 text-white hover:bg-red-700 hover:text-white"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <h3 className="text-sm font-medium text-gray-600 mb-2">Additional Notes</h3>
                        <p className="text-gray-900 whitespace-pre-line">{booking.notes}</p>
                      </div>
                    )}
                  </div>
                </Card>
              ))
            ) : (
              <Card className="text-center py-12 bg-white">
                <p className="text-gray-500">
                  {currentOwnerId 
                    ? "No bookings found for your billboards" 
                    : "Please sign in to view your bookings"}
                </p>
              </Card>
            )}
          </div>
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
                variant="ghost"
                size="icon"
              >
                <XIcon className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-4 overflow-auto flex-1 flex items-center justify-center">
              {selectedMedia.url && (
                selectedMedia.filename.match(/\.(jpeg|jpg|png|gif|webp)$/i) ? (
                  <img 
                    src={selectedMedia.url} 
                    alt={selectedMedia.filename}
                    className="max-w-full max-h-[70vh] object-contain"
                  />
                ) : selectedMedia.filename.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video 
                    src={selectedMedia.url} 
                    controls
                    className="max-w-full max-h-[70vh]"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <p className="mb-4">This file type cannot be previewed</p>
                    <Button asChild>
                      <a 
                        href={selectedMedia.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Open in new tab
                      </a>
                    </Button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}