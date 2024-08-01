'use client';
import { signOut, useSession } from 'next-auth/react';
import ShoppingCart from "@/components/icons/ShoppingCart";
import { CartContext } from "@/components/AppContext";
import Link from 'next/link';
import { useContext, useState } from 'react';
import Bars3 from "@/components/icons/Bars3";

function AuthLinks({status, userName}){
  if(status === 'authenticated'){
    return(
    <>
     <Link href={"/profile"} className="whitespace-nowrap">
    Hello, {userName}
    </Link>
    <button 
    onClick={()=> signOut()}
    className="bg-primary rounded-full text-white px-8 py-2">Logout
    </button>
    </>
    );
  }
  if (status === 'unauthenticated'){
    return(
      <>
      <Link href={'/login'}>Login</Link>
     <Link href={'/register'}className="bg-primary rounded-full text-white px-8 py-2">Register
     </Link>
      </>
    );
  }
}

export default function Header(){
  const session=useSession();
  const status=session?.status;
  const userData=session.data?.user;
  let userName=userData?.name || userData?.email;
  const {cartProducts}= useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  if (userName && userName.includes(' ')){
    userName= userName.split(' ')[0];
  }

    return(

<header>
  <div className="flex items-center md:hidden justify-between">
  <Link className="text-primary font-semibold text-2xl" href={'/'}>
  ZIGI SOURDEW
  </Link>
  <div className="flex items-center gap-8 text-nav-text">
  <Link href={'/cart'} className="relative">
  <ShoppingCart />
  {cartProducts?.length > 0 && (
        <span className="absolute -top-2 -right-4 bg-light-olive-green text-white text-xs
        py-1 px-1 rounded-full leading-3">
   {cartProducts.length}
   </span>       
  )}
  </Link>
  <button 
  className="p-1 border"
  onClick={()=> setMobileNavOpen(prev => !prev)}>
    <Bars3 />
    </button>
  </div>
  </div>

  {mobileNavOpen && (
    <div
    onClick={() => setMobileNavOpen(false)}
    className="md:hidden p-4 bg-white/30 backdrop-blur-xs rounded-lg mt-2 flex flex-col gap-2 text-center border border-gray-200 shadow-lg">
       <Link href={'/'}>Home</Link>
       <Link href={'/menu'}>Menu</Link>
       <Link href={'/#about'}>About</Link>
       <Link href={'/#contact'}>Contact</Link>
       <AuthLinks status={status} userName={userName} />
    </div>
  )}
  <div className="hidden md:flex items-center justify-between">

    <nav className="flex items-center gap-4 text-nav-text">
    <Link className="text-primary font-semibold text-2xl" href={'/'}>
    ZIGI SOURDEW
  </Link>

       <Link href={'/'}>Home</Link>
       <Link href={'/menu'}>Menu</Link>
       <Link href={'/#about'}>About</Link>
       <Link href={'/#contact'}>Contact</Link>
  </nav>
  <nav className="flex items-center gap-4 text-nav-text">
  <AuthLinks status={status} userName={userName} />
          <Link href={'/cart'} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
               <span className="absolute -top-2 -right-4 bg-light-olive-green text-white text-xs
               py-1 px-1 rounded-full leading-3">
                {cartProducts.length}
          </span>
            )}
                </Link>
        </nav>
      </div>
    </header>
  );
}
