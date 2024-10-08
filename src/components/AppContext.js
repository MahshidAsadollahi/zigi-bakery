'use client';
import React, { createContext } from 'react';
import { SessionProvider } from "next-auth/react";
import {useEffect, useState } from "react";
import toast from 'react-hot-toast';

export const CartContext= createContext({});
export function cartProductPrice(cartProduct){
let price= cartProduct.basePrice;
if(cartProduct.filling){
    price +=cartProduct.filling.price;
}
if(cartProduct.breadTypes?.length > 0){
    for(const extra of cartProduct.breadTypes){
        price += extra.price;
    }
}
return price;
}
export function AppProvider ({children}){
    const [cartProducts,setCartProducts]=useState([]);
    const ls=typeof window !== 'undefined' ? window.localStorage : null;

    useEffect(()=>{
        if(ls && ls.getItem('cart')){
            setCartProducts(JSON.parse(ls.getItem('cart')));
        }

    },[]);

    function clearCart(){
        setCartProducts([]);
        saveCartProductsToLocalStorage([]);
    }

    function removeCartProduct(indexToRemove){
        setCartProducts(prevCartProducts=>{
            const newCartProducts=prevCartProducts
            .filter((v,index)=>index !== indexToRemove);
            saveCartProductsToLocalStorage(newCartProducts);
            
            return newCartProducts;
        });
        
    }

    function saveCartProductsToLocalStorage(cartProducts){
        if(ls){
            ls.setItem('cart', JSON.stringify(cartProducts));
        }
    }
     



    function addToCart(product, filling=null , breadTypes=[]){
        setCartProducts(prevProducts =>{
            const cartProduct={...product, filling, breadTypes};
            const newProducts=[...prevProducts,cartProduct];
            saveCartProductsToLocalStorage(newProducts);
            return newProducts;
        });
        

    }
    return(
        <SessionProvider>
            <CartContext.Provider
            value={{
                cartProducts, setCartProducts,
                addToCart,removeCartProduct,clearCart,
            }}>

            {children}
            </CartContext.Provider>
            
            </SessionProvider>



    );
}