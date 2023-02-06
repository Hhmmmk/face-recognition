import { useState, useEffect } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation.component";
import Logo from "./components/Logo/Logo.component";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.component.jsx";
import Rank from "./components/Rank/Rank.component.jsx";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
import Clarifai from 'clarifai';
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.component";


const app = new Clarifai.App({
  apiKey: '3ae07ea523a84fc7a5ed47e3dd6883ca'
});


const App = () => {

  //States --> Start
  const [searchField, setSearchField] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [box, setBox] = useState({});
  // States --> End


  // Initialize Background Particles --> Start
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);

    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);
  // Initialize Background Particles --> End


  const calculateFaceLocation = (response => {
    const clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('input_image');
    const iWidth = Number(image.width);
    const iHeight = Number(image.height);
    return ({
      leftCol: (clarifaiFace.left_col * iWidth),
      topRow: (clarifaiFace.top_row * iHeight),
      rightCol: (iWidth - (clarifaiFace.right_col * iWidth)),
      bottomRow: (iHeight - (clarifaiFace.bottom_row * iHeight))
    })
  })

  const displayFaceBox = (box) => {
    setBox(box);
    console.log(box);
  }

  const onInputChange = (event) => {    
    setSearchField(event.target.value)
    console.log(searchField);
  }

  const onButtonSubmit= () => {
    setImageURL(searchField);
    app.models.predict(Clarifai.FACE_DETECT_MODEL, `${imageURL}`)
      .then(response => displayFaceBox(calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }


  return (
    <div className="App">
      <Particles 
      className='particles'
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: '#00d47a1',
          }
        },
        fps_limit: 120,
        particles: {
          color: {
            value: '#ffffff',
          },
          links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            directions: 'none',
            enable: true,
            outModes: {
              default: 'bounce',
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 75,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 5 },
          },
          detectRetina: true,
        },
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: 'push',
            },
            onHover: {
              enable: true,
              mode: 'repulse',
            },
            modes: {
              push: {
                quantity: 10,
              },
              repulse: {
                distance: 10,
                duration: 2,
              }
            }
          }
        }
      }} 
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm 
        onInputChange={onInputChange} 
        onButtonSubmit={onButtonSubmit} 
      />
      <FaceRecognition box={box} imageURL={imageURL} />
    </div>
  );
};

export default App;
