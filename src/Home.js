import React, { useEffect, useState } from 'react'
import './Home.css'
// import PlaytimeCounter from './PlaytimeCounter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSquareCheck, faSquareXmark, faThumbsUp, faCloudSun, faMoon, faCoffee, faCat, faGamepad, faPlay} from "@fortawesome/free-solid-svg-icons";

function Home() {
    const [gaveBreakfast, setGaveBreakfast] = useState(false);
    const [gaveMorningChuru, setGaveMorningChuru] = useState(false);
    const [gaveEveningChuru, setGaveEveningChuru] = useState(false);
    var [date, setDate] = useState(new Date());
    const [morningChuruDate, setMorningChuruDate] = useState(new Date());
    const [eveningChuruDate, setEveningChuruDate] = useState(new Date());
    const [breakfastClickDate, setBreakfastClickDate] = useState(new Date());
    const [playtimes, setPlaytimes] = useState([])
    
    useEffect(() => {
      var timer = setInterval(() => setDate(new Date()), 1000);
      if (date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0) {
        handleResetClick();
      }
      return function cleanup() {
        clearInterval(timer);
      }
    })

    // THERE'S A BUG WHERE THE VERY FIRST ELEMENT DOESN'T GET SAVED INTO LOCALSTORAGE, NEED TO FIX
    useEffect(() => {
      setGaveBreakfast(localStorage.getItem("gaveBreakfast"));
      setGaveMorningChuru(localStorage.getItem("gaveMorningChuru"));
      setGaveEveningChuru(localStorage.getItem("gaveEveningChuru"));
      setBreakfastClickDate(new Date(localStorage.getItem("breakfastDate")));
      setMorningChuruDate(new Date(localStorage.getItem("morningChuruDate")));
      setEveningChuruDate(new Date(localStorage.getItem("eveningChuruDate")));
      if (localStorage.getItem("playtimes")) {
        var localStoragePlaytimes = JSON.parse(localStorage.getItem("playtimes"));
        if (localStoragePlaytimes) {
          setPlaytimes(localStoragePlaytimes);
        }
      }
    }, []);

    const addPlaytime = () => {
      setPlaytimes([ ...playtimes, {
          id: playtimes.length,
          value: date.toLocaleString([], {hour: '2-digit', minute: '2-digit'})
      }])
      localStorage.setItem("playtimes", JSON.stringify(playtimes));
      console.log("Playtimes (in add func): ", playtimes)
    }

    function handleBreakfastClick() {
      setGaveBreakfast(!gaveBreakfast);
      setBreakfastClickDate(new Date());
      if (gaveBreakfast) {
        localStorage.setItem("gaveBreakfast", "true");
        localStorage.setItem("breakfastDate", breakfastClickDate);
      } else {
        localStorage.setItem("gaveBreakfast", "false");
      }
    }
    
    function handleMorningChuruClick() {
      setGaveMorningChuru(!gaveMorningChuru);
      setMorningChuruDate(new Date());
      if (gaveMorningChuru) {
        localStorage.setItem("gaveMorningChuru", "true");
        localStorage.setItem("morningChuruDate", morningChuruDate);
      } else {
        localStorage.setItem("gaveMorningChuru", "false");
      }
    }

    function handleEveningChuruClick() {
      setGaveEveningChuru(!gaveMorningChuru);
      setEveningChuruDate(new Date());
      if (gaveEveningChuru) {
        localStorage.setItem("gaveEveningChuru", "true");
        localStorage.setItem("eveningChuruDate", eveningChuruDate);
      } else {
        localStorage.setItem("gaveEveningChuru", "false");
      }
    }

    function handleResetClick() {
      localStorage.setItem("gaveBreakfast", "false");
      localStorage.setItem("gaveMorningChuru", "false");
      localStorage.setItem("gaveEveningChuru", "false");
      localStorage.setItem("breakfastDate", null);
      localStorage.setItem("morningChuruDate", null);
      localStorage.setItem("eveningChuruDate", null);
      localStorage.setItem("playtimes", "");
      setGaveBreakfast(false);
      setGaveMorningChuru(false);
      setGaveEveningChuru(false);
      setEveningChuruDate(null);
      setMorningChuruDate(null);
      setBreakfastClickDate(null);
      setPlaytimes([]);
    }

    return (
    <div>
      <div className='main-box'>
        <h1>
          Shade's Food Tracker{" "}
          <FontAwesomeIcon icon={faCat}></FontAwesomeIcon>
          </h1>
        <div className='breakfast-box'>
          <h2>
            <FontAwesomeIcon icon={faCoffee}></FontAwesomeIcon>
            {" "}Breakfast
            {(localStorage.getItem("gaveBreakfast") === "true") ? (<FontAwesomeIcon icon={faSquareCheck} id='checkmark'/>) 
              : (<FontAwesomeIcon icon={faSquareXmark} id='checkmark'/>)}
          </h2>
          {(localStorage.getItem("gaveBreakfast") === "false") ? (<button onClick={handleBreakfastClick}>Gave</button>)
          : (null)}
          {(localStorage.getItem("gaveBreakfast") === "true") ? 
           (<p id='breakfast-message'>
            Shade was given breakfast! 아침 줬음! <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
            <p id='breakfastDate'>
              Shade was given breakfast on {breakfastClickDate.toLocaleDateString()} at {breakfastClickDate.toLocaleString([], {hour: '2-digit', minute: '2-digit'})}
            </p>
            </p>) : (null)}
        </div>
        <div className='churu-box1'>
          <h2>
            <FontAwesomeIcon icon={faCloudSun}></FontAwesomeIcon>
              {" "}Morning Churu
              {(localStorage.getItem("gaveMorningChuru") === "true") ? (<FontAwesomeIcon icon={faSquareCheck} id='checkmark'/>) 
              : (<FontAwesomeIcon icon={faSquareXmark} id='checkmark'/>)}
          </h2>
          {(localStorage.getItem("gaveMorningChuru") === "false") ? (<button onClick={handleMorningChuruClick} id='churu-gave-button'>Gave</button>)
          : (null)}
          {(localStorage.getItem("gaveMorningChuru") === "true") ?
           (<p id='churu-message'>
            Shade was given morning churu! 아침 츄르 줬음! <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
            <p id='churuDate'>
              Shade was given breakfast churu on {morningChuruDate.toLocaleDateString()} at {morningChuruDate.toLocaleString([], {hour: '2-digit', minute: '2-digit'})}
            </p>
            </p>) : (null)}
        </div>
        <div className='churu-box2'>
          <h2>
              <FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>
              {" "}Evening Churu
              {(localStorage.getItem("gaveEveningChuru") === "true") ? (<FontAwesomeIcon icon={faSquareCheck} id='checkmark'/>) 
              : (<FontAwesomeIcon icon={faSquareXmark} id='checkmark'/>)}
          </h2>
          {(localStorage.getItem("gaveEveningChuru") === "false") ? (<button onClick={handleEveningChuruClick} id='churu-gave-button'>Gave</button>)
          : (null)}
          {(localStorage.getItem("gaveEveningChuru") === "true") ?
           (<p id='churu-message'>
            Shade was given evening churu! 저녁 츄르 줬음! <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
            <p id='churuDate'>
              Shade was given evening churu on {eveningChuruDate.toLocaleDateString()} at {eveningChuruDate.toLocaleString([], {hour: '2-digit', minute: '2-digit'})}
            </p>
            </p>) : (null)}
        </div>
        <div className='play-tracker-box'>
          <h4>
            <FontAwesomeIcon icon={faGamepad}></FontAwesomeIcon> <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
            {" "}Playtime
          </h4>
          <button onClick={addPlaytime} id='playtime-button'>Record a playtime</button>
          <ul>
            <p>
              {playtimes.map(playtime => (
              <li key={playtime.id}>
                Shade played at {playtime.value}, thanks! :)
              </li>
            ))}
            </p>
          </ul>
          <button onClick={handleResetClick} id='reset-button'>Reset</button>
        </div>
        <div className='time_box'>
          <label id='current-date'>
            Current date: {date.toLocaleDateString()}
          </label>
        </div>
      </div>
    </div>
  )
}

export default Home
