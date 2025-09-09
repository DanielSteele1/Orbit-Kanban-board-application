import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoEarthOutline } from "react-icons/io5";

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';



function Footer() {
    return (
        <div className="footer">

            <div className="footer-item">
                <span> Daniel Steele ©2025  </span>
            </div>

            <div className="footer-flavourText">
              
            </div>

            <Tippy
                content={"View my Stuff :)"}
                interactive={true}
                placement="top"
                trigger="mouseenter focus"
                arrow={true}
                hideOnClick={false}

            >
                <div className="footer-item">
                    <a className="social" href="https://www.linkedin.com/in/daniel-steele1/" target="_blank" rel="noopener noreferrer"> <FaLinkedin /> </a>

                    <a className="social" href="https://github.com/DanielSteele1" target="_blank" rel="noopener noreferrer"> <FaGithub /> </a>

                    <a className="social" href="https://www.danielsteele.dev" target="_blank" rel="noopener noreferrer"> <IoEarthOutline /> </a>
                </div>
            </Tippy>

        </div>
    )
}

export default Footer;
