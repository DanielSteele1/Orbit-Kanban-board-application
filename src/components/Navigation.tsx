
import type { JSX, MouseEventHandler } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from 'react';
import { useLocation } from "react-router-dom";

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { RiComputerLine } from "react-icons/ri";

import { BsLightbulbOff } from "react-icons/bs";
import { BsLightbulbFill } from "react-icons/bs";
import { TbPlanet } from "react-icons/tb";
import Hamburger from 'hamburger-react';

function Navigation(): JSX.Element {
    const location = useLocation();

    const handleBackButton: MouseEventHandler = () => {
        window.history.back();
    }

    // get whether the user is looking at a board or not. If user isnt looking at board then we hide the back button
    const isLookingAtBoard = location.pathname.startsWith("/board/");

    const options = [
        { value: 'light', label: <span style={{ display: 'flex', alignItems: 'center' }}><BsLightbulbFill style={{ marginRight: '8px' }} /> Light Mode</span> },
        { value: 'dark', label: <span style={{ display: 'flex', alignItems: 'center' }}>< BsLightbulbOff style={{ marginRight: '8px' }} /> Dark Mode </span> },
        { value: 'system', label: <span style={{ display: 'flex', alignItems: 'center' }}><RiComputerLine style={{ marginRight: '8px' }} /> System </span> }
    ]

    const [isOpen, setOpen] = useState(false);

    return (

        <div className="navigation">
            <div className="nav-logo">
                <span> <TbPlanet style={{ fontSize: '25px', display: 'flex', marginRight: '10px' }} /> Orbit - Task tracking app </span>
            </div>
            <div className="nav-buttons">

                {isLookingAtBoard && (
                    <div className="back-button" onClick={handleBackButton}>
                        <IoIosArrowBack style={{ display: 'flex', fontSize: '20px' }} />
                        <span id="button-text"> Back </span>
                    </div>
                )
                }

                <Dropdown className="theme-button"
                    options={options}
                    arrowClosed={<span className="arrow-closed" />}
                    arrowOpen={<span className="arrow-open" />}
                    value={options[2]}
                />
            </div>

            <div className="nav-hamburger">
                <Hamburger toggled={isOpen} toggle={setOpen} />
            </div>

            {isOpen && (

                <div className="nav-menu-mobile">

                    <div className="nav-button">

                        {isLookingAtBoard && (
                            <div className="back-button" onClick={handleBackButton}>
                                <IoIosArrowBack style={{ display: 'flex', fontSize: '20px' }} />
                                <span id="button-text"> Back </span>
                            </div>
                        )
                        }

                    </div>

                    <div className="nav-button">

                        <Dropdown className="theme-button"
                            options={options}
                            arrowClosed={<span className="arrow-closed" />}
                            arrowOpen={<span className="arrow-open" />}
                            value={options[2]}
                        />
                    </div>

                </div>
            )}

        </div>
    )
}

export default Navigation;
