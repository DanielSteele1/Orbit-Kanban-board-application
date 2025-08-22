
import { CgSun } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineEditNote } from "react-icons/md";

function Navigation() {
    return (
        <div className="navigation">

            <div className="nav-logo">
                <span id="gradient"> Task managment tool <MdOutlineEditNote style={{ fontSize: '25px', display: 'flex', margin: '10px' }} /> </span>
            </div>

            <div className="nav-buttons">
                <div className="back-button">
                    <IoIosArrowBack  style={{ display: 'flex', margin: '10px' }} /> 
                </div>

                <div className="theme-button">
                    <CgSun style={{ display: 'flex', margin: '10px' }} /> 
                </div>
            </div>

        </div>
    )
}

export default Navigation;
