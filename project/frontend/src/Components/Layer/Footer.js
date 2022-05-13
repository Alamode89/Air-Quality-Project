import React from 'react'
import "./Footer.css"
import logo from '../../favicon.png';

const Footer = () => {
    return (
        <div className='footer'>
            <p>Made by yours truly, Yahallo Inc.<a href="/test" ><img className="logo" src={logo} alt="logo" /></a></p>
        </div>
    )
}

export default Footer