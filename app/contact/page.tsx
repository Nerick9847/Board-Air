"use client";

import React, { useState } from "react";
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactPage = () => {
   const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
   });

   const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("Form submitted:", formData);
   };

   return (
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
               <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Contact Us
               </h1>
               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Have a question about our billboard services? We're here to
                  help. Send us a message and we'll respond as soon as possible.
               </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="space-y-6">
                  <Card>
                     <CardContent className="pt-6">
                        <div className="flex items-center space-x-4">
                           <MapPin className="h-6 w-6 text-red-500" />
                           <div>
                              <h3 className="font-semibold">Visit Us</h3>
                              <p className="text-gray-600">
                                 Ward 8
                              </p>
                              <p className="text-gray-600">
                                 Kirtipur, Kathmandu
                              </p>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className="pt-6">
                        <div className="flex items-center space-x-4">
                           <Phone className="h-6 w-6 text-red-500" />
                           <div>
                              <h3 className="font-semibold">Call Us</h3>
                              <p className="text-gray-600">(977) 9847361166</p>
                              <p className="text-gray-600">Mon-Fri, 10am-4pm</p>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className="pt-6">
                        <div className="flex items-center space-x-4">
                           <Mail className="h-6 w-6 text-red-500" />
                           <div>
                              <h3 className="font-semibold">Email Us</h3>
                              <p className="text-gray-600">
                                 info@billboardcompany.com
                              </p>
                              <p className="text-gray-600">
                                 sales@billboardcompany.com
                              </p>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className="pt-6">
                        <div className="flex items-center space-x-4">
                           <Clock className="h-6 w-6 text-red-500" />
                           <div>
                              <h3 className="font-semibold">Business Hours</h3>
                              <p className="text-gray-600">
                                 Monday - Friday: 10am - 4pm
                              </p>
                              <p className="text-gray-600">
                                 Saturday: 10am - 1pm
                              </p>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </div>

               <div className="lg:col-span-2">
                  <Card>
                     <CardHeader>
                        <CardTitle>Send us a message</CardTitle>
                        <CardDescription>
                           Fill out the form below and we'll get back to you
                           within 24 hours.
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                 <label
                                    htmlFor="firstName"
                                    className="text-sm font-medium"
                                 >
                                    First Name
                                 </label>
                                 <Input
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="John"
                                    required
                                 />
                              </div>
                              <div className="space-y-2">
                                 <label
                                    htmlFor="lastName"
                                    className="text-sm font-medium"
                                 >
                                    Last Name
                                 </label>
                                 <Input
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Doe"
                                    required
                                 />
                              </div>
                           </div>

                           <div className="space-y-2">
                              <label
                                 htmlFor="email"
                                 className="text-sm font-medium"
                              >
                                 Email
                              </label>
                              <Input
                                 id="email"
                                 name="email"
                                 type="email"
                                 value={formData.email}
                                 onChange={handleChange}
                                 placeholder="john@example.com"
                                 required
                              />
                           </div>

                           <div className="space-y-2">
                              <label
                                 htmlFor="phone"
                                 className="text-sm font-medium"
                              >
                                 Phone
                              </label>
                              <Input
                                 id="phone"
                                 name="phone"
                                 type="tel"
                                 value={formData.phone}
                                 onChange={handleChange}
                                 placeholder="(555) 123-4567"
                              />
                           </div>

                           <div className="space-y-2">
                              <label
                                 htmlFor="subject"
                                 className="text-sm font-medium"
                              >
                                 Subject
                              </label>
                              <Input
                                 id="subject"
                                 name="subject"
                                 value={formData.subject}
                                 onChange={handleChange}
                                 placeholder="How can we help you?"
                                 required
                              />
                           </div>

                           <div className="space-y-2">
                              <label
                                 htmlFor="message"
                                 className="text-sm font-medium"
                              >
                                 Message
                              </label>
                              <Textarea
                                 id="message"
                                 name="message"
                                 value={formData.message}
                                 onChange={handleChange}
                                 placeholder="Tell us about your billboard needs..."
                                 className="h-32"
                                 required
                              />
                           </div>

                           <Button type="submit" className="w-full">
                              Send Message
                           </Button>
                        </form>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </div>
      </main>
   );
};

export default ContactPage;
