import { useState } from 'react'
import { AuthProvider } from './context/loginContext'
import './App.css'
import NavBar from './components/Navbar'
import { Route,Routes } from 'react-router-dom'
import WebshopList from './components/WebshopList'
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import { useEffect } from 'react';
import Details from './components/Details'
import WebshopForm from './components/WebshopForm'
function App() {
  const [ItemData, setItemData] = useState([]);
  const handleItemData = (data)=>{
    setItemData((prevData)=> [...prevData,data]);
  getItemData();
  };

  const getItemData = async () => {
    try {
      const response = await fetch('http://localhost:3000/products', {
        
      });
      if (response.ok) {
        const data = await response.json();
        setItemData(data);
      } else {
        console.error('Hiba az adatok lekérésekor');
      }
    } catch (error) {
      console.error('Hiba:', error);
    }
  };
  useEffect(() => {
    getItemData();
  }, []);

  const deleteItem = (id) => {
    getItemData();
  }
  
 

  return (
    <>
      <AuthProvider>
        <NavBar/>
          <Routes>
            <Route path='/' element={<WebshopList items={ItemData} deleteItem={deleteItem} />}/>
            <Route path='form' element={<ProtectedRoute><WebshopForm SendDataToApp={handleItemData}></WebshopForm></ProtectedRoute>}></Route>
            <Route path='login' element={<Login/>}></Route>
            <Route path='details/:id' element={<Details/>}></Route>
          </Routes>
      </AuthProvider>
    </>
  )
}

export default App
