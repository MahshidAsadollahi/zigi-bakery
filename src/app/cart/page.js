'use client';
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionsHeaders";
import { useContext, useEffect, useState } from "react";
import AddressInputs from "@/components/layout/AddressInputs";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";
import CartProduct from "@/components/menu/CartProduct";





export default function CartPage(){
    const {cartProducts, removeCartProduct}= useContext(CartContext);
    const [address, setAddress]= useState({});
    const {data:profileData}=useProfile();

    useEffect(()=>{
        if(typeof window !== 'undefined'){
            if(window.location.href.includes('canceled=1')){
                toast.error('Payment failed');
            }
        }

    },[]);

    useEffect(()=> {
        if(profileData?.city){
            const{phone, streetAddress, city, postalCode, country}= profileData;
            const addressFromProfile ={ phone, streetAddress, city, postalCode, country};
            setAddress(addressFromProfile);
        }
    },[profileData]);



    let subtotal=0;
    for(const p of cartProducts){
        subtotal += cartProductPrice(p);
    }

    function handleAddressChange(propName, value){
        setAddress(prevAddress => ({...prevAddress, [propName]:value}));

    }

    async function proceedToCheckout(ev){
        ev.preventDefault();
        const promise= new Promise((resolve, reject) => {
            fetch('/api/checkout',{
                method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                address,
                cartProducts,
            }),
        }).then(async (response)=> {
            if(response.ok){
                resolve();
                 window.location=  await response.json();
            }else{
                reject();
            }
        }); 
        });
        await toast.promise(promise, {
            loading:'Preparing your order...',
            success: 'Redirecting to payment page...',
            error: 'Something went wrong! Please try again.',
        })
       
        
    }
    if(cartProducts?.length === 0){
        return(
            <section className="mt-8 text-center">
                <SectionHeaders mainHeader="Cart"/>
                <p className="mt-4">Your shopping cart is empty</p>
            </section>
        );
    }
    return (
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Cart"/>
            </div>
        
        <div className="mt-8 grid gap-8 grid-cols-2">
            <div>
                {cartProducts?.length === 0 && (
                    <div>No produt is in your shopping cart</div>
                )}
                {cartProducts?.length > 0 && cartProducts.map((product, index)=>(

                <CartProduct 
                key={`${product._id}-${index}`}
                product={product} 
                onRemove={removeCartProduct}
                index={index}/>
                ))}
                <div className="py-2 pr-16 flex justify-end items-center">
                    <div className="text-gray-500">Subtotal: <br /> 
                    Delivery Fee: <br /> Total Price:</div>
                    
                    <div className="font-semibold pl-2 text-right">
                        ${subtotal} <br />
                        $5 <br />
                        ${subtotal + 5}
                    </div>
                </div>

               

            </div>
            <div className="bg-checkout p-4 rounded-lg h-96 flex flex-col justify-between">
                <h2>Checkout</h2>
                <form onSubmit={proceedToCheckout}>
                    <AddressInputs 
                    addressProps={address}
                    setAddressProps={handleAddressChange}

                    />
                    <button type="submit">
                        Pay ${subtotal}
                    </button>
                </form>
            </div>
        </div>
        </section>
    );

}