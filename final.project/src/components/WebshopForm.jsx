import { useRef } from "react";
import Swal from "sweetalert2";
import Card from "../wrappers/Card";

const WebshopForm = ({ sendDataToApp }) => {
  const nameref = useRef();
  const descriptionref = useRef();
  const imgref = useRef();
  const priceref = useRef();
  const stockref = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    summarizeWebshopData();
  };

  const summarizeWebshopData = () => {
    const name = nameref.current.value;
    const description = descriptionref.current.value;
    const img = imgref.current.value;
    const price = priceref.current.value;
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
            authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            name,
            description,
            img_url: img,
            price,
            stock,
          }),
        });

        if (response.ok) {
          const data = await response.json();

          Swal.fire({
            icon: "success",
            title: "Siker",
            text: "A termék sikeresen mentve!",
          });

          sendDataToApp(data);

          nameref.current.value = "";
          descriptionref.current.value = "";
          imgref.current.value = "";
          priceref.current.value = "";
          stockref.current.value = "";
        } else {
          Swal.fire({
            icon: "error",
            title: "Hiba",
            text: "Az áru mentése nem sikerült!",
          });
        }
      } catch (error) {
        console.error("Hiba:", error);

        Swal.fire({
          icon: "error",
          title: "Hiba",
          text: "Szerverhiba történt!",
        });
      }
    };

    saveWebshopDataToDatabase();
  };

  return (
    <Card>
      <div>
        <h2>Új termék hozzáadása</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Termék neve</label>
            <input type="text" id="name" ref={nameref} />
          </div>

          <div>
            <label htmlFor="description">Leírás</label>
            <input type="text" id="description" ref={descriptionref} />
          </div>

          <div>
            <label htmlFor="img">Kép URL</label>
            <input type="text" id="img" ref={imgref} />
          </div>

          <div>
            <label htmlFor="price">Ár</label>
            <input type="number" id="price" ref={priceref} />
          </div>

          <div>
            <label htmlFor="stock">Készlet</label>
            <input type="number" id="stock" ref={stockref} />
          </div>

          <button type="submit">Mentés</button>
        </form>
      </div>
    </Card>
  );
};

export default WebshopForm;