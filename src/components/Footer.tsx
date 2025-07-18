import { CgCoffee } from "react-icons/cg";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoEarthOutline } from "react-icons/io5";

function Footer() {
    return (
        <div className="footer">

            <div className="footer-item">
                <span> Daniel Steele ©2025  </span>
            </div>

            <div className="footer-item">
                <span className="gradient"> Made with TypeScript , React & lots of coffee <CgCoffee style={{ marginLeft: '10px' }} /></span>
            </div>

            <div className="footer-item">
                <span className="social">
                    <FaLinkedin />
                </span>

                <span>
                    <FaGithub />
                </span>

                <span>
                    <IoEarthOutline />
                </span>

            </div>

        </div>
    )
}

export default Footer;
