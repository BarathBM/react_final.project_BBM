import {useRef} from 'react';
import Swal from 'sweetalert2';
export default function WebshopForm({SendDataToApp}){
    const nameref=useRef();
    const descref=useRef();
    const imgref=useRef();
    const priceref=useRef();
    const stockref=useRef();
    
    const handleSubmit=(event)=>{
        event.preventDefault();
        summarizeItemData();
    };
    const summarizeItemData=()=>{
        const name=nameref.current.value;
        const desc=descref.current.value;
        const img=imgref.current.value;
        const price=priceref.current.value;
        const stock = stockref.current.value;

        if(!name||!desc||!img||!price||!stock){
            Swal.fire({
                icon:"error",
                title:"Hiba",
                text:"Kérem töltse ki az összes mezőt.",
            });
            return;
        }
        const saveWebshopDataToDatabase=async()=>{
          try{
            const response = await fetch("http://localhost:3000/products", { 

          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            name:name,
            description:desc,
            img_url: img,
            price:price,
            stock:stock,
          }),
          });
          if (response.ok) {
            const data = await response.json();
            SendDataToApp(data);
          } else {
            Swal.fire({
            icon: "error",
            title: "Hiba",
            text: "Az utazás mentése nem sikerült!",
          });
        }
        }catch (error) {
        console.error("Hiba:", error);
        }
      };
        saveWebshopDataToDatabase()
    };
    return(
        <div>
            <h2>Új táplálék kiegészítő</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label >Termék neve</label>
                    <input type="text" id='name' ref={nameref}/>

                </div>
                <div>
                    <label>Leírás</label>
                    <textarea name="" id="desc" ref={descref}></textarea>
                    
                </div>
                <div>
                    <label>Kép link</label>
                    <input type="text" id='img' ref={imgref}/>
                </div>
                <div>
                    <label>Ár</label>
                    <input type="number" id='price' ref={priceref}/>
                </div>
                <div>
                    <label>Készleten</label>
                    <input type="num" id='stock' ref={stockref}/>
                </div>
                <button type='Submit'>Beküldés</button>
            </form>
        </div>
    );
};
