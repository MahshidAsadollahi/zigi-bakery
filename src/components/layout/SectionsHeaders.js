export default function SectionHeaders({subHeader,mainHeader}){
    return(

        <>
        <h3 className="uppercase text-nav-text font-semibold leading-3">
                {subHeader}
        </h3>
        
        <h2 className="text-light-olive-green font-bold text-4xl">
                {mainHeader}
        </h2>
        </>


    );
}