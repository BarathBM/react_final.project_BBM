import { NavLink } from "react-router-dom";
import { useAuth } from "../context/loginContext"
import classes from "./NavBar.module.css"
const NavBar =()=>{
    const {isLogged, logout} = useAuth()
    return (
        <nav className={classes.navbar}>
            <NavLink to='/' className={({isActive}) =>isActive ? classes.active : classes.link}>Áruház</NavLink>
            {isLogged && <NavLink to='form' className={({isActive}) =>isActive ? classes.active : classes.link}>Új áru</NavLink>}
            {!isLogged ? <NavLink to='login' className={({isActive}) =>isActive ? classes.active : classes.link}>Bejelentkezés</NavLink> : <a onClick={logout} className={classes.isActive}>Kijelentkezés</a>}
            
        </nav>
    )
}
export default NavBar;