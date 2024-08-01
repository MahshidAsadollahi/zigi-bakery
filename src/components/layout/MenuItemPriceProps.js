import Trash from "@/components/icons/Trash"; 
import Plus from "@/components/icons/Plus"; 
import Up from "@/components/icons/Up"; 
import Down from "@/components/icons/Down"; 
import { useState } from "react";

export default function MenuItemPriceProps({name,addLabel, props,setProps}){

    const[isOpen, setIsOpen]=useState(false);


    function addProp(){
        setProps(oldProps=> {
            return [...oldProps,{name:'',price:0}];
        });

    }

    function editProp(ev, index, prop){
     const newValue=ev.target.value;
     setProps(prevFillings =>{
        const newFillings=[...prevFillings];
        newFillings[index][prop]=newValue;
        return newFillings;
     });
    }

    function removeProp(indexToRemove){
        setProps (prev => prev.filter((v,index)=>index !== indexToRemove));


    } 

    return(

        
        <div className="p-2 rounded-md mb-2 bg-green-50 border border-light-olive-green ">
            <button onClick={()=>setIsOpen(prev => !prev)}
            className="inline-flex p-1 border-0 justify-start"
            type="button">
                {isOpen && (
                    <Up />
                )}
                {!isOpen && (
                    <Down />
                )}
            
            <span>{name}</span>
            <span>({props?.length})</span>
            </button>
            <div className={isOpen ? 'block' : 'hidden'}>
            {props?.length>0 && props.map((filling,index)=>(
            <div key={index}
            className="flex items-end gap-2">
                <div>
                    <label>Type</label>
                <input className="focus:outline-none focus:ring-0 focus:border-gray-500"
                type="text" 
                placeholder="Type of filling" 
                value={filling.name}
                onChange={ev => editProp(ev, index, 'name')}/>
                </div>
                
                 <div> 
                    <label>New Price</label>
                <input className="focus:outline-none focus:ring-0 focus:border-gray-500"
                type="text" 
                placeholder="New price" 
                value={filling.price}
                onChange={ev => editProp(ev, index, 'price')}/>
                </div>
               <div>
                <button type="button"
                onClick={()=>removeProp(index)}
                className="border border-black mb-4 px-0 py-0 ">
                    <Trash />
                    </button>
               </div>
            </div>
        ))}
        <button 
        type="button"
        onClick={addProp}
        className= "bg-gray-100">
            <Plus />
            <span>{addLabel}</span>
        </button>

            </div>
            
        </div>
    );

}