import Image from "next/image";
import Right from "@/components/icons/Right"; 
import Link from "next/link";
export default function Hero(){
    return(
        <section className="hero md:mt-6">
        <div className="py-4 md:py-12">
            <h1 className="text-4xl font-semibold text-nav-text">
            Home-Baked Sourdough by Zigi Bakery</h1>
            <p className=" text-nav-text text-sm my-6">
            At Zigi Bakery, we believe in the art of home-baked 
            sourdough. With each loaf crafted by 
            hand and baked with care, we bring you 
            the wholesome goodness and comforting 
            flavors of tradition in every bite.
            </p>   

            <div className="flex gap-4 text-sm py-4 scroll-smooth">
                <Link href="/menu">
                <button className="bg-primary uppercase flex justify-center items-center gap-2 text-white
                px-4 py-2 rounded-full"> 
                    Order Now
                    <Right />
                </button>
                
                    </Link>

                    <Link href={'/#about'}>
                <button className="flex border-0 items-center gap-2 py-2 text-nav-text font-semibold">
                    Learn More
                    <Right />
                </button>
                </Link>
            </div>

        </div>
            
            
            <div className="relative hidden md:block"> 
            <Image src={'/sourdew.png'} 
            fill
            style={{objectFit: 'contain'}}
            alt={'Sourdough Bread'}></Image>
            </div>
            
        </section>
       


    );
}