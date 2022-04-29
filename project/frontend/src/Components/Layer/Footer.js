import React from 'react'
import "./Footer.css"
import logo from '../../favicon.png';

const Footer = () => {
    return (
        <div className='footer'>
            <p>by yours truly, Yahallo Inc.</p>
            <img className="logo" src={logo} alt="logo" />
            <div class="footer_links">
                <a href="/" class="btn_nav">Home</a>
                <a href="/graph" class="btn_nav">Graph</a>

            </div>
        </div>
    )
}

export default Footer