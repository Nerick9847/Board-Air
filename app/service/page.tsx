import BillboardCard from "@/components/BillboardCard";

export default function Service() {
   return (
      <main className="grid gap-5 lg:grid-cols-3 p-[3rem]">
         <BillboardCard />
         <BillboardCard />

         <BillboardCard />
         <BillboardCard />
         <BillboardCard />
         <BillboardCard />
      </main>
   );
}
