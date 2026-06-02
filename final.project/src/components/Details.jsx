import { useParams, useNavigate } from "react-router-dom";


function Details({ items }) {

  const { id } = useParams();
  const navigate = useNavigate();

  const item = items.find(
    (item) => item.id === Number(id)
  );

  if (!item) {
    return <h1>Nincs ilyen termék</h1>;
  }

  return (
    <div>
      <h1>{item.name}</h1>

      <img
        src={item.img_url}
        alt={item.name}
        width="200"
      />
      <h2>Ár: {item.price}</h2>
      <h3>Készleten: {item.stock}</h3>

      
      <p>
        <strong>Leírás:</strong> {item.description}
      </p>

      <button onClick={() => navigate(-1)}>
        Vissza
      </button>
    </div>
  );
}

export default Details;