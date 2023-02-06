import React from "react";
import './FaceRecognition.style.css';

const FaceRecognition = ({ imageURL, box }) => {
  return (
    <div className="center mt4">
      <img id='input_image' src={ imageURL } alt="" width='500px' height='auto' />
      <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
    </div>
  );
}

export default FaceRecognition;