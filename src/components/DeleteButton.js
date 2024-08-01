import { useState } from "react";

export default function DeleteButton({label,onDelete}){
    const [showConfirm, setShowConfirm]=useState(false);
    
    if(showConfirm){
        return(
            <div className="fixed bg-black/80 inset-0 flex items-center
            h-full justify-center">

                <div className="bg-white p-4 rounded-lg"> 
                <div>Are you sure you want to delete this item?</div>
                <div className="flex gap-2 mt-2">
                <button 
                onClick={()=> setShowConfirm(false)}
                type="button">
                Cancel
                </button>

                <button 
                onClick={()=> {onDelete();
                setShowConfirm(false);
                }}
                className="primary"
                type="button">
                Yes,&nbsp; Delete!
                </button>

                </div>
            </div>

            </div>
            
            
        )
    }
    return(
        <button 
        onClick={()=> setShowConfirm(true)}
        type="button">
            {label}
        </button>

    );
}