'use client';
import EditableImage from "@/components/layout/EditableImage";
import { useEffect, useState } from "react";
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";

export default function MenuItemForm({onSubmit,menuItem}){

    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const[fillings,setFillings]=useState(menuItem?.fillings || []);
    const [breadType,setBreadType]=useState(menuItem?.breadType || []);
    const [category, setCategory] = useState(menuItem?.category || '');
    const [categories, setCategories] = useState([]);


     useEffect(() => {
    fetch('/api/categories').then(res => {
      res.json().then(categories => {
        setCategories(categories);
      });
    });
  }, []);





    return(        
        <form 
        onSubmit={ev => 
            onSubmit(ev, {
                image,name,description,basePrice,fillings,breadType,category,
            })
        } 
        className="mt-8 max-w-xl mx-auto">
            <div className="grid items-start gap-4"
              style={{gridTemplateColumns:'.3fr .7fr'}}>
                <div>
                    <EditableImage link={image} setLink={setImage} />
                </div>
                <div className="grow"> 
                    <label>Menu Items:</label>
                    <input className="focus:outline-none focus:ring-0 focus:border-gray-500"
                    type="text"
                    value={name}
                    onChange={ev => setName(ev.target.value)}/>

                    <label>Description:</label>
                    <input className="focus:outline-none focus:ring-0 focus:border-gray-500"
                    type="text"
                    value={description}
                    onChange={ev => setDescription(ev.target.value)}/>

                     <label>Category</label>
                     <select value={category} onChange={ev => setCategory(ev.target.value)}>
                        <option value="" disabled>Select a category</option> {/* Placeholder option */}
                        {categories?.length > 0 && categories.map(c => (
                            <option key={c._id} value={c._id}>{c.name}</option>
                        ))}
                    </select>

                    <label>Price:</label>
                    <input className="focus:outline-none focus:ring-0 focus:border-gray-500"
                    type="text"
                    value={basePrice}
                    onChange={ev => setBasePrice(ev.target.value)}/>


                    <MenuItemPriceProps 
                   name={'Bread Type'}
                   addLabel={'Add Bread Type'}
                   props={fillings}
                   setProps={setFillings}/>


                   <MenuItemPriceProps 
                   name={'Type of filling'} 
                   addLabel={'Add Filling'}
                   props={breadType} 
                   setProps={setBreadType} />
                   
                 
                 <button type="submit">Save</button>
                </div>

            </div>
        </form>



    );
}