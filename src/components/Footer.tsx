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


                <a className="social" href="https://www.linkedin.com/in/daniel-steele1/" target="_blank" rel="noopener noreferrer"> <FaLinkedin /> </a>

                <a className="social" href="https://github.com/DanielSteele1" target="_blank" rel="noopener noreferrer"> <FaGithub/> </a>

                <a className="social" href="https://www.danielsteele.dev" target="_blank" rel="noopener noreferrer"> <IoEarthOutline /> </a>


               

            </div>

        </div>
    )
}

export default Footer;
