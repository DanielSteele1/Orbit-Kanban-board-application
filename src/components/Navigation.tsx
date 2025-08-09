
import { BsArrow90DegLeft } from "react-icons/bs";
import { CgSun } from "react-icons/cg";
import { SlOrganization } from "react-icons/sl";

function Navigation() {
    return (
        <div className="navigation">

            <div className="nav-logo">
                <span id="gradient"> _____ - Task managment tool <SlOrganization style={{ fontSize: '18px', display: 'flex', margin: '10px' }} /> </span>
            </div>

            <div className="nav-buttons">
                <div className="back-button">
                    <BsArrow90DegLeft style={{ display: 'flex', fontSize: '20px', margin: '10px' }} /> 
                </div>

                <div className="theme-button">
                    <CgSun style={{ display: 'flex', fontSize: '20px', margin: '10px' }} /> 
                </div>
            </div>

        </div>
    )
}

export default Navigation;
