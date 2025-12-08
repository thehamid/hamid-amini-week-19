import { Navbar } from "@/components/Navbar";
import { LucideShoppingCart } from "lucide-react";



export default function Home() {



  return (
    <div >
      <Navbar/>
      <h1 className="flex justify-center items-center text-2xl font-bold mb-4">
        <LucideShoppingCart className="text-lg ml-2" /> به بوتوشاپ خوش آمدید
      </h1>
   
    </div>
  );
}
