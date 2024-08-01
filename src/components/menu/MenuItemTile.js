import Image from "next/image";
import AddToCartButton from "@/components/menu/AddToCartButton";
export default function MenuItemTile({onAddToCart, ...item}){
    const {image, description,name,basePrice,fillings,breadType,}=item;

    const hasFillingOrBread = fillings?.length > 0 || breadType?.length > 0;

    return(
        <div className="p-4 rounded-lg text-center bg-light-olive-green bg-opacity-50
         hover:bg-light-olive-green-light hover:shadow-lg
           hover:shadow-black/50 transition-all">

                
                <div className="text-center">
                    <Image src={image} width={200} height={600} className="max-h-auto max-h-28 
                    block mx-auto" alt="Bread"></Image> 
                </div>

                <h4 className="font-semibold text-xl my-3 text-nav-text">{name}</h4>
                <p className="text-nav-text text-sm line-clamp-3"> 
                    {description}
                     </p>

                     <AddToCartButton 
                     image={image}
                     hasFillingOrBread={hasFillingOrBread} 
                     onClick={onAddToCart}
                     basePrice={basePrice}/>
                    


            </div>
    );
}