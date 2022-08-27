import React from "react";
import Tilty from "react-tilty";
import './Logo.style.css';
import brain from './brain-logo.png';

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilty className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150}} >
        <div className="Tilt-inner pa3">
          <img src={brain} alt='logo' />
        </div>
      </Tilty>
    </div>
  )
}

export default Logo;