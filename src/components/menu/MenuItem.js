import Image from "next/image";
import { useContext, useState } from "react";
import { CartContext } from "@/components/AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "@/components/menu/MenuItemTile";
import React from 'react';
import FlyingButton from 'react-flying-item';

export default function MenuItem(menuItem) {
    const {
        image,name,description,basePrice,fillings,breadType,}=menuItem;

     const [selectedFilling,setSelectedFilling]=useState(fillings?.[0] || null);
     const [selectedBread,setSelectedBread]=useState([]);
     const [showPopup ,setShowPopup]=useState(false);
     const {addToCart}=useContext(CartContext);
    
     async function handleAddToCartButtonClick(){
        const hasOptions=fillings.length > 0 || breadType .length >  0;
        if(hasOptions && !showPopup){
            setShowPopup(true);
               return;
           }

            addToCart(menuItem, selectedFilling, selectedBread);
            await new Promise(resolve => setTimeout(resolve, 1000));
                setShowPopup(false);
            toast.success ('Added to cart');
        }
       

     function handBreadTypeClick(ev, bread){
        const checked=ev.target.checked;
        if(checked){
            setSelectedBread(prev => [...prev, bread]);
        }else{
            setSelectedBread(prev => {
                return prev.filter(e => e.name !== bread.name);
            });
        }

    }
       let selectedPrice=basePrice;
            if (selectedFilling) {
                selectedPrice += selectedFilling.price;
            }
            if (selectedBread?.length > 0) {
                for (const extra of selectedBread) {
                    selectedPrice += extra.price;
                }
            }
     

    return(
        <>
        {showPopup && (
            <div 
            onClick={() => setShowPopup(false)}
            className="fixed inset-0 bg-black/80 flex items-center justify-center">
                <div 
                onClick={ev => ev.stopPropagation()}
                className="my-8 bg-white p-2 rounded-lg max-w-md w-full">
                    <div className="overflow-y-scroll p-2"
                    style={{maxHeight: 'calc(100vh - 100px)'}}>
                    <Image
                    src={image}
                    alt={name}
                    width={300} height={200}
                    className="mx-auto"/>
                    <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
                    <p className="text-center text-gray-500 text-sm mb-2">{description}</p>
                     {fillings?.length > 0 && (
                        <div className="py-2"> 
                            <h3 className="text-center text-gray-700">Pick your bread type</h3>
                            {fillings.map(filling => (
                                <label 
                                    key={filling._id}
                                    className="flex items-center gap-1 mt-2 p-3 border rounded-md mb-1">
                                    <input type="radio" 
                                    onChange={() => setSelectedFilling(filling)}
                                    checked={selectedFilling?.name === filling.name}
                                    name="filling"/>
                                    {filling.name} ${basePrice + filling.price}
                                </label>
                            ))}
                        </div>
                     )}  
                     {breadType?.length > 0 && (
                        <div className="py-2"> 
                        <h3 className="text-center text-gray-700">Pick your filling</h3>
                    
                        {breadType.map(bread => (
                            <label 
                                key={bread._id}
                                className="flex items-center gap-1 mt-2 p-3 border rounded-md mb-1">
                                <input 
                                type="checkbox" 
                                onChange={ev => handBreadTypeClick(ev,bread)}
                                checked={selectedBread.map(e => e._id).includes(
                                    bread._id)}
                                name={bread.name}/>
                                {bread.name} +${bread.price}
                            </label>
                        ))}
                    </div>  
                     )}    
                     <FlyingButton
                      targetTop={'5%'}
                      targetLeft={'95%'}
                         src={image}>
                       <div className="primary sticky bottom-2"
                            onClick={handleAddToCartButtonClick}>
                            Add to cart ${selectedPrice}
                       </div>
                     </FlyingButton> 
            
                    <button className="mt-2"
                    onClick={() => setShowPopup(false)}>
                        Cancel
                    </button>

                    </div>
                          
                </div>
            </div>
        )}
         <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
       

            </>
    );
}