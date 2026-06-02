import WebshopItem from "./WebshopItem"
const WebshopList=({items,deleteItem})=>{
    return(
        <div className="webshop-list">
            {items.length==0 ? <h2>Nincs megjeleníthető termék</h2>:items.map((item)=>(<WebshopItem key={item.id} item={item} deleteItem={deleteItem} />))}
        </div>
    )
}
export default WebshopList;