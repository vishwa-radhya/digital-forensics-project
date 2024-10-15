import { Outlet } from "react-router-dom";
import './navbar.styles.scss';
import { Fragment } from "react";
import NavImage from '../../assets/shield-antivirus-svgrepo-com.svg';
import { useNavigate } from "react-router-dom";

const Navbar=()=>{

    const navigateRouter = useNavigate();

    return(
        <Fragment>
        <nav className="navbar-container">
            <div onClick={()=>navigateRouter('/')}>
                <img src={NavImage}  />
                <p>Malware Analyzer</p>
            </div>
            <ul>
                <li onClick={()=>navigateRouter('scan')}>Scanner</li>
                <li onClick={()=>navigateRouter('summary-report')}>Report</li>
                <li>opt3</li>
            </ul>
        </nav>
            <Outlet/>
        </Fragment>
    )
}
export default Navbar;