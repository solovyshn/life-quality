import './styles.css'
import { useContext } from 'react'
import {Link, useResolvedPath, useMatch} from "react-router-dom"
import Logo from './images/exit_icon-icons.com_70975.svg'
import UserContext from './userContext'

export default function NavBar() {
    const { setUser } = useContext(UserContext);

    const handleLogout = () => {
        setUser(null, null);
    };

    return <nav className="nav">
        <p className='site-title'>Якість життя</p> 
        <ul>
            {/* <CustomLink to="/mainPageDoctor">Мій кабінет</CustomLink> */}
            <CustomLink>Мій кабінет</CustomLink>
            <li>
                <Link to="/login" onClick={handleLogout}><img className ="group-main"src ={Logo} alt ="Group"/></Link>
            </li>
        </ul>
    </nav>
}

// function CustomLink({to, children,  ...props}){
//     const resolvedPath = useResolvedPath(to)
//     const isActive = useMatch({path:resolvedPath.pathname, end:true})
//     return(
//         <li className={isActive ? "active" : ""}>
//             <Link to={to} {...props}>
//                 {children}
//             </Link>
//         </li>
//     )
// }


function CustomLink({ to, children, ...props }) {
    const { userID, userType } = useContext(UserContext);

    // Function to build the dynamic path based on userType and userID
    const buildDynamicPath = () => {
      if (userType === 'doctor') {
        return `/mainPageDoctor/${userID}`;
      } else if (userType === 'patient') {
        return `/mainPagePatient/${userID}`;
      } else {
        // Handle other user types or provide a default path
        return '/login';
      }
    };
  
    // Resolve the path and check if it is active
    const resolvedPath = useResolvedPath(buildDynamicPath());
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  
    return (
      <li className={isActive ? 'active' : ''}>
        {/* Use the dynamically built path */}
        <Link to={buildDynamicPath()} {...props}>
          {children}
        </Link>
      </li>
    );
  }