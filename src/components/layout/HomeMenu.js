'use client';
import Image from "next/image";
import MenuItem from "@/components/menu/MenuItem";
import SectionHeaders from "./SectionsHeaders";
import { useEffect, useState } from "react";
export default function HomeMenu(){

    const [bestSellers, setBestSellers]= useState([]);
    useEffect(() => {
        fetch ('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setBestSellers (menuItems.slice(-3));
            });
        });

    },[]);
    return(
        <section className="">
        <div className="absolute left-0 right-0 w-full justify-start">
            <div className="absolute -top-10 right-0 -z-10">
                <Image src={'/gandom1.png'} width={109} height={189}
                alt={'gandom1'}/>
            </div>
            <div className="absolute left-0 -top-[80px] -z-10 text-left">
                <Image src={'/gandom2.png'} width={107} height={195} alt={'gandom1'}/>
            </div>
        </div>
        
        <div className="text-center mb-4">
            <SectionHeaders
              subHeader={'check out'}
              mainHeader={'Our Best Sellers'}/>
              
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
            {bestSellers?. length > 0 && bestSellers.map(item => (
                <MenuItem key={item._id} {...item} />
            ))}
        </div>
        </section>



    );
}