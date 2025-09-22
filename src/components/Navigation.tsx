
import type { JSX, MouseEventHandler } from "react";
import { IoIosArrowBack, IoIosStar, IoIosStarOutline } from "react-icons/io";
import { useState } from 'react';
import { useLocation } from "react-router-dom";

import { FiMoon } from "react-icons/fi";
import { FiSun } from "react-icons/fi";
import Hamburger from 'hamburger-react';
import { TfiLayoutListThumbAlt } from "react-icons/tfi";
import { FaMoon } from "react-icons/fa";

interface NavigationProps {

    handleThemeButton: React.MouseEventHandler<HTMLButtonElement>;
    islightOn?: boolean;
}

function Navigation({ handleThemeButton, islightOn }: NavigationProps): JSX.Element {
    const location = useLocation();

    const handleBackButton: MouseEventHandler = () => {
        window.history.back();
    }

    // get whether the user is looking at a board or not. If user isnt looking at board then we hide the back button
    const isLookingAtBoard = location.pathname.startsWith("/board/");

    const [isOpen, setOpen] = useState(false);

    return (

        <div className="navigation-container">
            <div className="navigation">
                <div className="nav-logo">
                    <span id="logo">
                        <TfiLayoutListThumbAlt id="gradient" style={{ fontSize: '30px', display: 'flex' }} />
                        <span id="logo-text"> Orbit Productivity Tracker </span>
                        <span id="logo-text-mobile"> Orbit </span>
                    </span>
                </div>
                <div className="nav-buttons">

                    {isLookingAtBoard && (
                        <div className="back-button" onClick={handleBackButton}>
                            <IoIosArrowBack style={{ display: 'flex', margin: '10px', fontSize: '20px' }} />
                            <span id="back-text"> Back </span>
                        </div>
                    )
                    }

                    {islightOn ? (
                        <button className="theme-button" onClick={handleThemeButton}>
                            <span className="theme-icon">
                                <FiSun style={{ margin: '10px', fontSize: '20px' }} />
                                Light Mode
                            </span>
                        </button>

                    ) : (

                        <button className="theme-button" onClick={handleThemeButton}>
                            <span className="theme-icon">
                                <FaMoon style={{ margin: '10px', fontSize: '18px' }} />
                                Dark Mode
                            </span>
                        </button>
                    )}

                    {islightOn ? (
                        <a className="star-button" href="https://github.com/DanielSteele1/Orbit-Kanban-board-application">
                            <IoIosStarOutline style={{ display: 'flex', margin: '10px', fontSize: '20px' }} />
                            <span className="star-text">
                                Star on github
                            </span>
                        </a>
                    ) : (
                        <a className="star-button" href="https://github.com/DanielSteele1/Orbit-Kanban-board-application">
                            <IoIosStar style={{ display: 'flex', margin: '10px', fontSize: '20px' }} />
                            <span className="star-text">
                                Star on github
                            </span>
                        </a>
                    )}

                </div>

                <div className="nav-hamburger-container">
                    <div className="nav-hamburger">
                        <Hamburger toggled={isOpen} toggle={setOpen} />
                    </div>
                </div>

                {isOpen && (

                    <div className="nav-menu-mobile-container">
                        <div className="nav-menu-mobile">

                            <div className="nav-button">

                                {isLookingAtBoard && (
                                    <div className="back-button" onClick={handleBackButton}>
                                        <IoIosArrowBack style={{ display: 'flex', fontSize: '20px' }} />
                                        <span id="button-text"> Back </span>
                                    </div>
                                )
                                }

                                {islightOn ? (
                                    <button className="theme-button" onClick={handleThemeButton}>
                                        <span className="theme-icon">
                                            <FiSun style={{ margin: '10px' }} />
                                        </span>
                                    </button>

                                ) : (

                                    <button className="theme-button" onClick={handleThemeButton}>
                                        <span className="theme-icon">
                                            <FiMoon style={{ margin: '10px' }} />
                                        </span>
                                    </button>
                                )}

                            </div>

                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Navigation;
