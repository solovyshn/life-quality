import './styles.css'
import {Link, useResolvedPath, useMatch} from "react-router-dom"
import Logo from './images/exit_icon-icons.com_70975.svg'

export default function NavBar() {
    return <nav className="nav">
        <p className='site-title'>Якість життя</p> 
        <ul>
            <CustomLink to="/mainPageDoctor">Мій кабінет</CustomLink>
            <li>
                <Link to="/login"><img className ="group-main"src ={Logo} alt ="Group"/>
</Link>
            </li>
        </ul>
    </nav>
}

function CustomLink({to, children,  ...props}){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path:resolvedPath.pathname, end:true})
    return(
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}
