
import { useMutation } from "@tanstack/react-query";
import { pb } from "@/lib/pocketbase"; // Make sure to configure your PocketBase client

interface AdvertisementData {
  collectionId: string;
  collectionName: string;
  billboard_id: string[];
  file: string;
  title: string;
  notes: string;
  user_id: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  brandName: string;
  startDate: string;
  endDate: string;
}

export const useCreateAdvertisement = () => {
  return useMutation({
    mutationFn: async (data: AdvertisementData) => {
      const formData = new FormData();
      
      Object.entries(data).forEach(([key, value]) => {
        if (key === "billboard_id" || key === "user_id") {
          value.forEach((id: string) => formData.append(`${key}[]`, id));
        } else if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      const record = await pb.collection('advertisements').create(formData);
      return record;
    },
    onSuccess: (data) => {
      console.log("Advertisement created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating advertisement:", error);
    }
  });
};