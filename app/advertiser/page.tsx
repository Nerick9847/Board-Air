"use client"

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AdvertiserDashboard = () => {
  // Sample user data
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '+1 (555) 123-4567',
    profileImage: '/api/placeholder/50/50'
  });

  // Sample bookings data
  const bookings = [
    {
      id: 'BKG-001',
      billboardId: 'BB-1234',
      location: 'Downtown Main St',
      startDate: '2025-04-01',
      endDate: '2025-04-30',
      status: 'Active',
      amount: 2500.00
    },
    {
      id: 'BKG-002',
      billboardId: 'BB-5678',
      location: 'Highway 101 Exit 23',
      startDate: '2025-05-15',
      endDate: '2025-06-14',
      status: 'Upcoming',
      amount: 3200.00
    },
    {
      id: 'BKG-003',
      billboardId: 'BB-9012',
      location: 'Shopping Mall Entrance',
      startDate: '2025-02-01',
      endDate: '2025-02-28',
      status: 'Completed',
      amount: 1800.00
    }
  ];

  // Sample payments data
  const payments = [
    {
      id: 'PMT-001',
      date: '2025-03-15',
      amount: 2500.00,
      method: 'Credit Card',
      status: 'Completed',
      bookingId: 'BKG-001'
    },
    {
      id: 'PMT-002',
      date: '2025-03-01',
      amount: 3200.00,
      method: 'Bank Transfer',
      status: 'Completed',
      bookingId: 'BKG-002'
    },
    {
      id: 'PMT-003',
      date: '2025-01-20',
      amount: 1800.00,
      method: 'Credit Card',
      status: 'Completed',
      bookingId: 'BKG-003'
    }
  ];

  // Handle user info updates
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({...user});

  // Password change state
  const [passwordState, setPasswordState] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleEditToggle = () => {
    if (isEditing) {
      setUser(editedUser);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = () => {
    setPasswordError('');
    
    // Validation
    if (!passwordState.current || !passwordState.new || !passwordState.confirm) {
      setPasswordError('All fields are required');
      return;
    }
    
    if (passwordState.new !== passwordState.confirm) {
      setPasswordError('New passwords do not match');
      return;
    }
    
    if (passwordState.new.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    }
    
    // Success path
    setPasswordSuccess(true);
    setTimeout(() => {
      setPasswordSuccess(false);
      setPasswordDialogOpen(false);
      setPasswordState({ current: '', new: '', confirm: '' });
    }, 1500);
  };

  // Status badge component for consistent styling
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      'Active': { bg: 'bg-green-100', text: 'text-green-800' },
      'Upcoming': { bg: 'bg-blue-100', text: 'text-blue-800' },
      'Completed': { bg: 'bg-gray-100', text: 'text-gray-600' },
      'Cancelled': { bg: 'bg-red-100', text: 'text-red-800' }
    };
    
    const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-800' };
    
    return (
      <Badge className={`${config.bg} ${config.text}`}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 bg-white min-h-screen">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-rose-500">Board</span>
            <span className="text-gray-800">Air</span>
            <span className="ml-2 text-lg font-normal text-gray-500">Dashboard</span>
          </h1>
        </div>
      </header>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full flex justify-start mb-6 border-b border-gray-200">
          <TabsTrigger value="profile" className="text-sm px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-rose-500 data-[state=active]:text-rose-600">
            Profile
          </TabsTrigger>
          <TabsTrigger value="bookings" className="text-sm px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-rose-500 data-[state=active]:text-rose-600">
            Bookings
          </TabsTrigger>
          <TabsTrigger value="payments" className="text-sm px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-rose-500 data-[state=active]:text-rose-600">
            Payments
          </TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-0 animate-in fade-in-50">
          <Card className="shadow-sm border rounded-lg overflow-hidden">
            <CardHeader className="pb-4 bg-gray-50 border-b">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-white shadow">
                    <AvatarImage src={user.profileImage} alt={user.name} />
                    <AvatarFallback className="bg-rose-100 text-rose-600">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl font-medium text-gray-800">{user.name}</CardTitle>
                    <CardDescription className="text-rose-600">Advertiser</CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleEditToggle} variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </Button>
                  <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                        Change Password
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription>
                          Enter your current password and a new password to update your credentials.
                        </DialogDescription>
                      </DialogHeader>
                      
                      {passwordError && (
                        <Alert className="bg-red-50 border-red-200 text-red-700">
                          <AlertDescription>{passwordError}</AlertDescription>
                        </Alert>
                      )}
                      
                      {passwordSuccess && (
                        <Alert className="bg-green-50 border-green-200 text-green-700">
                          <AlertDescription>Password updated successfully!</AlertDescription>
                        </Alert>
                      )}
                      
                      <div className="space-y-4 py-2">
                        <div className="space-y-2">
                          <Label htmlFor="current">Current Password</Label>
                          <Input 
                            id="current" 
                            name="current" 
                            type="password" 
                            value={passwordState.current}
                            onChange={handlePasswordChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new">New Password</Label>
                          <Input 
                            id="new" 
                            name="new" 
                            type="password"
                            value={passwordState.new}
                            onChange={handlePasswordChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm">Confirm New Password</Label>
                          <Input 
                            id="confirm" 
                            name="confirm" 
                            type="password"
                            value={passwordState.confirm}
                            onChange={handlePasswordChange}
                          />
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button 
                          type="submit" 
                          onClick={handlePasswordSubmit}
                          className="bg-rose-600 hover:bg-rose-700"
                          disabled={passwordSuccess}
                        >
                          Update Password
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-gray-600 text-sm">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={editedUser.name} 
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-rose-500 focus:ring-rose-500"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-gray-600 text-sm">Email Address</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        value={editedUser.email} 
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-rose-500 focus:ring-rose-500"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-gray-600 text-sm">Phone Number</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        value={editedUser.phone} 
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-rose-500 focus:ring-rose-500" 
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="profile" className="text-gray-600 text-sm">Profile Picture</Label>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.profileImage} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" className="text-gray-700 border-gray-300">
                          Change Photo
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-y-6 p-6 rounded-lg bg-gray-50">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                      <dd className="mt-1 text-gray-800">{user.email}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                      <dd className="mt-1 text-gray-800">{user.phone}</dd>
                    </div>
                  </dl>
                )}
              </div>
            </CardContent>
            {isEditing && (
              <CardFooter className="bg-gray-50 flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsEditing(false)} className="border-gray-300">
                  Cancel
                </Button>
                <Button onClick={handleEditToggle} className="bg-rose-600 hover:bg-rose-700 text-white">
                  Save Changes
                </Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
        
        {/* Bookings Tab */}
        <TabsContent value="bookings" className="mt-0 animate-in fade-in-50">
          <Card className="shadow-sm border rounded-lg overflow-hidden">
            <CardHeader className="pb-4 bg-gray-50 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium text-gray-800">Your Billboard Bookings</CardTitle>
                <Button className="bg-rose-600 hover:bg-rose-700 text-white">New Booking</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 border-b">
                      <TableHead className="text-gray-600 font-medium">Booking ID</TableHead>
                      <TableHead className="text-gray-600 font-medium">Billboard</TableHead>
                      <TableHead className="text-gray-600 font-medium">Duration</TableHead>
                      <TableHead className="text-gray-600 font-medium">Status</TableHead>
                      <TableHead className="text-gray-600 font-medium text-right">Amount</TableHead>
                      <TableHead className="text-gray-600 font-medium"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id} className="hover:bg-gray-50 border-b">
                        <TableCell className="font-medium text-gray-700">{booking.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="text-gray-800">{booking.location}</div>
                            <div className="text-xs text-gray-500">ID: {booking.billboardId}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <time dateTime={booking.startDate} className="text-sm text-gray-700">{booking.startDate}</time>
                            <span className="text-xs text-gray-500">to</span>
                            <time dateTime={booking.endDate} className="text-sm text-gray-700">{booking.endDate}</time>
                          </div>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={booking.status} />
                        </TableCell>
                        <TableCell className="text-right font-medium text-rose-600">${booking.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-rose-600 hover:bg-gray-100">
                            <span className="sr-only">Details</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                            </svg>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Payments Tab */}
        <TabsContent value="payments" className="mt-0 animate-in fade-in-50">
          <Card className="shadow-sm border rounded-lg overflow-hidden">
            <CardHeader className="pb-4 bg-gray-50 border-b">
              <CardTitle className="text-lg font-medium text-gray-800">Payment History</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 border-b">
                      <TableHead className="text-gray-600 font-medium">Payment ID</TableHead>
                      <TableHead className="text-gray-600 font-medium">Date</TableHead>
                      <TableHead className="text-gray-600 font-medium">Booking</TableHead>
                      <TableHead className="text-gray-600 font-medium">Method</TableHead>
                      <TableHead className="text-gray-600 font-medium">Status</TableHead>
                      <TableHead className="text-gray-600 font-medium text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id} className="hover:bg-gray-50 border-b">
                        <TableCell className="font-medium text-gray-700">{payment.id}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.bookingId}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell>
                          <StatusBadge status={payment.status} />
                        </TableCell>
                        <TableCell className="text-right font-medium text-rose-600">${payment.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="m-6">
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md border">
                  <div>
                    <h3 className="text-base font-medium text-gray-800">Total Payments</h3>
                    <p className="text-xs text-gray-500">All time</p>
                  </div>
                  <div className="text-2xl font-semibold text-rose-600">
                    ${payments.reduce((sum, payment) => sum + payment.amount, 0).toFixed(2)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvertiserDashboard;