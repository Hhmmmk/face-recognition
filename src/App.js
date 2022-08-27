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

  const [searchField, setSearchField] = useState('');
  const [imageURL, setImageURL] = useState('https://samples.clarifai.com/face-det.jpg');

  const particlesInit = useCallback(async (engine) => {
    console.log(engine);

    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  const onInputChange = (event) => {
    const searchFieldString = event.target.value;
    setSearchField(searchFieldString);
  }

  const onButtonSubmit= () => {
    setImageURL(searchField);
    console.log('click');
    app.models.predict(Clarifai.FACE_DETECT_MODEL, `${imageURL}`)
      .then(
        function (response) {
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        },
        function (err) {
          console.log(err);
        }
      );
  }

  // "https://samples.clarifai.com/face-det.jpg"

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
      <FaceRecognition imageURL={imageURL} />
    </div>
  );
};

export default App;
