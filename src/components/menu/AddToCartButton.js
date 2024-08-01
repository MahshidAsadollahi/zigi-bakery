import React from 'react';
import FlyingButton from 'react-flying-item';
export default function AddToCartButton({hasFillingOrBread,onClick, basePrice,image})
{
    if(!hasFillingOrBread){
        return(
            <div className="flying-button-parent"> 
             <FlyingButton 
            targetTop={'5%'}
            targetLeft={'95%'}
            src={image}>
                <div onClick={onClick}>
                    Add to cart ${basePrice}
                </div>
            </FlyingButton>
            </div>
           
        );
    }
    
    return(
        <button 
                    type="button"
                    onClick={onClick}
                    className="mt-4 bg-primary text-white rounded-full
                    px-8 py-2">
                       <span>Add to cart (from ${basePrice})</span>

                        </button>
    );
}