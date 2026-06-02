import { useRef } from 'react';
import { useAuth } from '../context/loginContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (usernameRef.current.value !== "") {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: usernameRef.current.value,
            password: passwordRef.current.value
          })
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.token);
          login();
          navigate('/form');
        } else {
          console.error('Sikertelen bejelentkezés');
        }

      } catch (error) {
        console.error('Error:', error);
      }
    }
  };



  return (
    <div>
      <h2>Bejelentkezés</h2>
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          placeholder="Felhasználónév"
          ref={usernameRef}
          
        />
        <input
          type="password"
          placeholder="Jelszó"
          
          ref={passwordRef}
        />
        <button type="submit" >Belépés</button>
      </form>
    </div>
  );
}
export default Login;