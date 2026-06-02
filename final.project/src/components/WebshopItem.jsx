import { NavLink } from "react-router";
import Swal from "sweetalert2";
import Card from "../wrappers/Card";
import { useAuth } from "../context/loginContext";
const WebshopItem=({item, deleteItem})=>{  
    const {isLogged} = useAuth()
  console.log(item.id)
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Biztosan törölni szeretnéd ezt az utazást?");
    if (confirmDelete) {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "authorization": localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Sikeres törlés",
          text: "Az utazás sikeresen törölve lett!",
        });
        deleteItem(id);
      } else {
        Swal.fire({
          icon: "error",
          title: "Hiba",
          text: "Az utazás törlése nem sikerült!",
        });
      }
    }
  };
    return(
        <div>
            <h2>{item.name}</h2>
            <p>
                
            </p>
            <img src={item.img_url} alt="" width="150px" height="100px" />
            <h3>
                {item.price}
            </h3>
            {isLogged && <button onClick={() => handleDelete(item.id)}>Törlés</button>}
      
            <NavLink to={`/details/${item.id}`}>
                <button>Részletek</button>
            </NavLink>
        </div>
    )
}
export default WebshopItem;