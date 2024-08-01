export default function AddressInputs({addressProps, setAddressProps,disabled=false}){
    const {phone, streetAddress , postalCode, city, country}=addressProps;
    return(
        <>
        <label>Phone Number:</label>
            <input 
            disabled={disabled}
            className="focus:outline-none focus:ring-0 focus:border-gray-500"
            type="tel"
            placeholder="Phone number"
            value={phone || ''}
            onChange={ev=>setAddressProps('phone' ,ev.target.value)}/>

            <label>Street Address:</label>
            <input 
            disabled={disabled}
            className="focus:outline-none focus:ring-0 focus:border-gray-500"
            type="text"
            placeholder="Street address"
            value={streetAddress || ''}
            onChange={ev=>setAddressProps('streetAddress' ,ev.target.value)}/>

            <div className="grid grid-cols-2 gap-2">

             <div>
            <label>City:</label>

            <input 
            disabled={disabled}
            className="focus:outline-none focus:ring-0 focus:border-gray-500"
            type="text"
            placeholder="City"
            value={city || ''}
            onChange={ev=>setAddressProps('city' ,ev.target.value)}/>
            </div>

            <div>
            <label>Postal Code:</label>    

            <input 
            disabled={disabled}
            className="focus:outline-none focus:ring-0 focus:border-gray-500"
            type="text"
            placeholder="Postal code"
            value={postalCode || ''}
            onChange={ev=>setAddressProps('postalCode' ,ev.target.value)}/>
            </div>
            
            </div>
            
            <label>Country:</label>
            <input 
            disabled={disabled}
            className="focus:outline-none focus:ring-0 focus:border-gray-500"
            type="text"
            placeholder="Country"
            value={country || ''}
            onChange={ev=>setAddressProps('country' ,ev.target.value)}/>
        </>
    );
}