import { useRef } from "react";
import Swal from "sweetalert2";
import Card from "../wrappers/Card";
const WebshopForm = ({sendDataToApp})=> {
    const nameref=useRef();
    const descriptionref=useRef();
    const imgref = useRef();
    const priceref = useRef();
    const stockref = useRef();

    const handleSubmit=(event)=> {
        event.preventDefault();
        summarizeWebshopData();    };
    const summarizeWebshopData=()=>{
        const name= nameref.current.value;
        const description=descriptionref.current.value;
        const img = imgref.current.value;
        const price=priceref.current.value;
        const stock = stockref.current.value;
        if (!name || !description || !img || !price || !stock) {
      Swal.fire({
        icon: "error",
        title: "Hiba",
        text: "Kérem töltse ki a kötelező mezőket!",
      });
      return;
    }
    const saveWebshopDataToDatabase = async () => {
      try {
        const response = await fetch("http://localhost:3000/products", { 

          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            name:name,
            description: description,
            img_url: img,
            price: price,
            stock:stock,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          sendDataToApp(data);
        } else {
          Swal.fire({
            icon: "error",
            title: "Hiba",
            text: "Az áru mentése nem sikerült!",
          });
        }
      } catch (error) {
        console.error("Hiba:", error);
      }
    };
    saveWebshopDataToDatabase();
    };
    ;

}