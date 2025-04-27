"use client";
import { ReactNode } from "react";
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Layout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex ">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold">Dashboard</h2>
          <nav className="space-y-4 mt-6">
            <Link href="/owner/billboards" className="block hover:text-blue-400">Billboards</Link>
            <Link href="/owner/bookings" className="block hover:text-blue-400">Bookings</Link>
            <Link href="/owner/transactions" className="block hover:text-blue-400">Transactions</Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        {/* <header className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{title}</h2>
          <User className="w-6 h-6 text-gray-600" />
        </header> */}

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
