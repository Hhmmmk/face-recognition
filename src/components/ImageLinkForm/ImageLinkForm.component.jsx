import React from "react";
import './ImageLinkForm.style.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3">
        {'This Magic Brain will detect faces in your pictures. Give it a try!'}
      </p>
      <div className="form">
        <div className="pa4 br3 shadow-5">
          <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange} />
          <button className="detect f4 grow pa2 fw-30 g4 link br3 ph3 pv2 dib white bg-light-purple" onClick={onButtonSubmit}>Detect</button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm;




