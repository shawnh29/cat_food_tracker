import React, { useEffect, useState } from 'react'
import './Home.css'
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
    const [playtime1, setPlaytime1] = useState(false);
    const [playtime2, setPlaytime2] = useState(false);
    const [playtime1Date, setPlaytime1Date] = useState(new Date());
    const [playtime2Date, setPlaytime2Date] = useState(new Date());
    
    useEffect(() => {
      var timer = setInterval(() => setDate(new Date()), 1000);
      if (date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0) {
        handleResetClick();
      }
      return function cleanup() {
        clearInterval(timer);
      }
    })

    useEffect(() => {
      setGaveBreakfast(localStorage.getItem("gaveBreakfast"));
      setGaveMorningChuru(localStorage.getItem("gaveMorningChuru"));
      setGaveEveningChuru(localStorage.getItem("gaveEveningChuru"));
      setBreakfastClickDate(new Date(localStorage.getItem("breakfastDate")));
      setMorningChuruDate(new Date(localStorage.getItem("morningChuruDate")));
      setEveningChuruDate(new Date(localStorage.getItem("eveningChuruDate")));
      setPlaytime1(localStorage.getItem("playtime1"));
      setPlaytime2(localStorage.getItem("playtime2"));
    }, []);

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

    function handlePlaytime1_click() {
      setPlaytime1(!gaveMorningChuru);
      setPlaytime1Date(new Date());
      if (playtime1) {
        localStorage.setItem("playtime1", "true");
        localStorage.setItem("playtime1Date", playtime1Date);
      } else {
        localStorage.setItem("playtime1", "false");
      }
    }

    function handlePlaytime2_click() {
      setPlaytime2(!gaveMorningChuru);
      setPlaytime2Date(new Date());
      if (playtime2) {
        localStorage.setItem("playtime2", "true");
        localStorage.setItem("playtime2Date", playtime2Date);
      } else {
        localStorage.setItem("playtime2", "false");
      }
    }

    function handleResetClick() {
      localStorage.setItem("gaveBreakfast", "false");
      localStorage.setItem("gaveMorningChuru", "false");
      localStorage.setItem("gaveEveningChuru", "false");
      localStorage.setItem("breakfastDate", null);
      localStorage.setItem("morningChuruDate", null);
      localStorage.setItem("eveningChuruDate", null);
      localStorage.setItem("playtime1", "false");
      localStorage.setItem("playtime2", "false");
      localStorage.setItem("playtime1Date", null);
      localStorage.setItem("playtime2Date", null);
      setGaveBreakfast(false);
      setGaveMorningChuru(false);
      setGaveEveningChuru(false);
      setPlaytime1(false);
      setPlaytime2(false);
      setEveningChuruDate(null);
      setMorningChuruDate(null);
      setBreakfastClickDate(null);
      setPlaytime2Date(null);
      setPlaytime2Date(null);
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
          <span className='playtime-header'>
            <FontAwesomeIcon icon={faGamepad} className='play-icons'></FontAwesomeIcon> <FontAwesomeIcon icon={faPlay} className='play-icons'></FontAwesomeIcon>
            Playtime
          </span>
          <div className='playtime1box'>
            <span className='playtime-labels'> Day-time </span>
            {(localStorage.getItem("playtime1") === "false") ? (<button onClick={handlePlaytime1_click}>Played</button>)
            : (null)}
            {(localStorage.getItem("playtime1") === "true") ?
              (<span>
                  @ {playtime1Date.toLocaleDateString()} at {playtime1Date.toLocaleString([], {hour: '2-digit', minute: '2-digit'})}
              </span>) : (null)}
          </div>
          <div className='playtime2box'>
            <span className='playtime-labels'> Night-time </span>
            {(localStorage.getItem("playtime2") === "false") ? (<button onClick={handlePlaytime2_click}>Played</button>)
            : (null)}
            {(localStorage.getItem("playtime2") === "true") ?
              (<p>
                  @ {playtime2Date.toLocaleDateString()} at {playtime2Date.toLocaleString([], {hour: '2-digit', minute: '2-digit'})}
              </p>) : (null)}
          </div>
        </div>
        <button onClick={handleResetClick} id='reset-button'>Reset</button>
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
