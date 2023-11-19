import { useState, useEffect, useRef } from 'react'
import { useStopwatch } from 'react-timer-hook'
import '../styles/Game.css'
import image1 from "../assets/image/image1.jpeg"
import waldo from "../assets/characters/waldo.jpg"
import wilma from "../assets/characters/wilma.jpg"
import wizard from "../assets/characters/wizard.jpg"
import odlaw from "../assets/characters/odlaw.jpg"
import waldoClose from "../assets/closeups/waldo.jpg"
import wilmaClose from "../assets/closeups/wilma.jpg"
import wizardClose from "../assets/closeups/wizard.jpg"
import odlawClose from "../assets/closeups/odlaw.jpg"
import Checkmark from './Checkmark'
import Endgame from './Endgame'

function Game() {
  const [charSelect, setCharSelect] = useState(false);
  const [foundWaldo, setFoundWaldo] = useState(false);
  const [foundWilma, setFoundWilma] = useState(false);
  const [foundWizard, setFoundWizard] = useState(false);
  const [foundOdlaw, setFoundOdlaw] = useState(false);
  const [foundAll, setFoundAll] = useState(false);
  const [foundFlags, setFoundFlags] = useState([]);

  const {
    seconds,
    minutes,
    hours,
    pause,
  } = useStopwatch({ autoStart: true });

  const dropdownRef = useRef();

  useEffect(() => {
    const gameImage = document.querySelector(".gameImage");
    const dropdownCircle = document.querySelector(".dropdownCircle");
    gameImage.addEventListener("click", clickHandler);
    dropdownCircle.addEventListener("click", clickHandler);

    // Prevents listeners adding up and creating performance issues
    return () => {
      gameImage.removeEventListener("click", clickHandler);
      dropdownCircle.removeEventListener("click", clickHandler);
    }
  });

  useEffect(() => {
    const selectors = document.querySelectorAll(".selector");
    selectors.forEach((selector) => {
      selector.addEventListener("click", selectorHandler);
    });

    // Prevents listeners adding up and creating performance issues
    return () => {
      selectors.forEach((selector) => {
        selector.removeEventListener("click", selectorHandler);
      });
    }
  });

  useEffect(() => {
    if (foundWaldo && foundWilma && foundWizard && foundOdlaw) {
      setFoundAll(true);
      pause();
    }
  }, [foundWaldo, foundWilma, foundWizard, foundOdlaw]);


  const clickHandler = (e) => {
    if (charSelect) {
      setCharSelect(false);
      dropdownRef.current.style.display = "none";
    } else {
      setCharSelect({x: e.layerX, y: e.layerY});
      dropdownRef.current.style.display = "block";
      dropdownRef.current.style.top = `${e.layerY - 20}px`;
      dropdownRef.current.style.left = `${e.layerX - 20}px`;
    }
  }
  
  const selectorHandler = async (e) => {
    try {
      const reqResponse = await fetch("http://localhost:3000/api/coordinate", {
        method: "post",
        credentials: "include",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          character: e.target.classList[1],
          x: charSelect.x,
          y: charSelect.y,
        }),
      });
      const response = await reqResponse.json();
      if (response.found) {
        markOffCharacter(response.character);
      } else {
        alert("Character not on that spot!");
      }
    } catch(err) {
      alert("Connection error detected: " + err);
    }
  }

  const markOffCharacter = (char) => {
    switch (char){
      case "Waldo":
        if (!foundWaldo) {
          setFoundWaldo(true);
          getCoordinate(char);
        }
        break;
      case "Wilma":
        if (!foundWilma) {
          setFoundWilma(true);
          getCoordinate(char);
        }
        break;
      case "Wizard":
        if (!foundWizard) {
          setFoundWizard(true);
          getCoordinate(char);
        }
        break;
      case "Odlaw":
        if (!foundOdlaw) {
          setFoundOdlaw(true);
          getCoordinate(char);
        }
        break;
      default:
        console.error("Could not identify character: " + char);
    }
  }

  const getCoordinate = async (char) => {
    try {
      const reqResponse = await fetch(`http://localhost:3000/api/coordinate/${char}`, {
        credentials: "include",
      });
      const response = await reqResponse.json();
      setFoundFlags([...foundFlags, <Checkmark key={char} x={response.x} y={response.y} />]);
    } catch(err) {
      alert("Connection error detected: " + err);
    }
  }

  return (
    <>
      {foundAll && <Endgame seconds={seconds} minutes={minutes} hours={hours} />}
      <header>
        <h1>Where's Waldo?</h1>
        <div className='headerChars'>
          <p className='findChars'>Find all the characters: </p>
          <div className='charIcons'>
            <img src={waldo} alt="waldo" />
            <img src={wilma} alt="wilma" />
            <img src={wizard} alt="wizard" />
            <img src={odlaw} alt="odlaw" />
          </div>
          <div className='timer'>
            {/* Makes sure time display is always XX:XX:XX and not X:X:XX or similar */}
            {hours.toString().length == "1" ? "0" : ""}{hours}:
            {minutes.toString().length == "1" ? "0" : ""}{minutes}:
            {seconds.toString().length == "1" ? "0" : ""}{seconds}
          </div>
        </div>
      </header>
      <div className='gameContent'>
        <img src={image1} alt="" className='gameImage' />
        {foundFlags}
        <div className='dropdown' style={{position: "absolute", top: 0, left: 0, display: "none"}} ref={dropdownRef}>
          <span className='dropdownCircle'></span>
          <div className='dropdownCharList'>
            <p>Choose a character: </p>
            <img className='selector waldoSelect' src={waldoClose} alt="waldo" />
            <img className='selector wilmaSelect' src={wilmaClose} alt="wilma" />
            <img className='selector wizardSelect' src={wizardClose} alt="wizard" />
            <img className='selector odlawSelect' src={odlawClose} alt="odlaw" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Game
