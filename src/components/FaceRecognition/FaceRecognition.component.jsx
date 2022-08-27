import React from "react";

const FaceRecognition = ({ imageURL }) => {
  return (
    <div className="center mt4">
      <img src={ imageURL } alt="ImageInput" width='500px' height='auto' />
    </div>
  );
}

export default FaceRecognition;