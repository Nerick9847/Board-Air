"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/Layout";
import Image from "next/image";
import { Edit, Trash2, Plus, Upload } from "lucide-react";

export default function Billboards() {
  const [billboards, setBillboards] = useState([
    {
      id: 1,
      name: "Central Plaza Billboard",
      image: "/billboard.webp",
      location: "Kathmandu Central Business District",
      size: "40x60 ft",
      price: "2500",
      owner: "Nepal Outdoor Media Ltd."
    },
    {
      id: 2,
      name: "Highway Junction Display",
      image: "/billboard.webp",
      location: "Lalitpur Ring Road Junction",
      size: "30x50 ft",
      price: "1800",
      owner: "Urban Advertising Solutions"
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentBillboard, setCurrentBillboard] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    size: "",
    price: "",
    owner: "",
    image: "/billboard.webp"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing && currentBillboard) {
      setBillboards(billboards.map(board => 
        board.id === currentBillboard.id 
          ? { ...formData, id: board.id } 
          : board
      ));
    } else {
      setBillboards([...billboards, { ...formData, id: Date.now() }]);
    }
    resetForm();
  };

  const handleEdit = (billboard) => {
    setIsEditing(true);
    setCurrentBillboard(billboard);
    setFormData(billboard);
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentBillboard(null);
    setFormData({
      name: "",
      location: "",
      size: "",
      price: "",
      owner: "",
      image: "/billboard.webp"
    });
  };

  const handleDelete = (id) => {
    setBillboards(billboards.filter((board) => board.id !== id));
  };

  const BillboardForm = ({ onClose }) => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Billboard Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter billboard name"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Enter location"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="size">Size</Label>
          <Input
            id="size"
            name="size"
            value={formData.size}
            onChange={handleInputChange}
            placeholder="Enter size (e.g., 40x60 ft)"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="price">Price (USD/month)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Enter monthly price"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="owner">Owner</Label>
          <Input
            id="owner"
            name="owner"
            value={formData.owner}
            onChange={handleInputChange}
            placeholder="Enter owner name"
            className="mt-1"
          />
        </div>

        <div>
          <Label>Upload Image</Label>
          <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Button type="button" variant="outline" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Choose Image
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
          {isEditing ? "Update Billboard" : "Add Billboard"}
        </Button>
      </div>
    </form>
  );

  return (
    <Layout title="Billboard Management">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Billboard Inventory
          </h1>
          
          <Dialog onOpenChange={(open) => !open && resetForm()}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white flex items-center gap-2">
                <Plus size={20} />
                Add Billboard
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>
                  {isEditing ? "Edit Billboard" : "Add New Billboard"}
                </DialogTitle>
              </DialogHeader>
              <BillboardForm onClose={() => resetForm()} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          {billboards.map((board) => (
            <Card 
              key={board.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-96 h-64 relative">
                  <Image
                    src={board.image}
                    alt={board.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                  />
                </div>
                
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-gray-900">{board.name}</h2>
                      <div className="space-y-2 text-gray-600">
                        <p>
                          <span className="font-semibold">Location:</span> {board.location}
                        </p>
                        <p>
                          <span className="font-semibold">Size:</span> {board.size}
                        </p>
                        <p>
                          <span className="font-semibold">Owner:</span> {board.owner}
                        </p>
                        <p className="text-xl font-bold text-blue-600">
                          ${Number(board.price).toLocaleString()}/month
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Dialog onOpenChange={(open) => !open && resetForm()}>
                        <DialogTrigger asChild>
                          <Button 
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                            size="sm"
                            onClick={() => handleEdit(board)}
                          >
                            <Edit size={18} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Edit Billboard</DialogTitle>
                          </DialogHeader>
                          <BillboardForm onClose={() => resetForm()} />
                        </DialogContent>
                      </Dialog>
                      
                      <Button
                        className="bg-red-500 hover:bg-red-600 text-white"
                        size="sm"
                        onClick={() => handleDelete(board.id)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}

