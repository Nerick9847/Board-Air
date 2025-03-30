import PocketBase from "pocketbase";

export const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

// Function to handle authentication
export const loginWithPassword = async (email: string, password: string) => {
   try {
      const authData = await pb
         .collection("users")
         .authWithPassword(email, password);
      return authData;
   } catch (error) {
      throw error;
   }
};

export const registerUser = async (userData: {
   email: string;
   password: string;
   passwordConfirm: string;
   name?: string;
}) => {
   try {
      const newUser = await pb.collection("users").create(userData);
      return newUser;
   } catch (error) {
      throw error;
   }
};

export const logoutUser = () => {
   pb.authStore.clear();
};
