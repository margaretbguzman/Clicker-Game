import React, {useState, useRef, useEffect} from 'react';
import './App.css';
import {round} from 'mathjs'
var intervals = [];

//state variables-------------------------------

export default function Clickergame() {
  const button = useRef();
  const msgElement = useRef();
  const altMsgElement = useRef();
  const moneyAnimation = useRef();
  const upgPerSecBtn = useRef();
  const upgPerClickBtn = useRef();
  const [animateValue, setAnimateValue] = useState("");
  const [msg, setMsg] = useState("Get clicking!");
  const [altMsg, setAltMsg] = useState("");
  const [clicks, setClicks] = useState(1);
  const [dollars, setDollars] = useState(0);
  const [dollarDisplay, setDollarDisplay] = useState(0);
  const [dollarsPerSec, setDPerSec] = useState(0);
  const [dollarsPerClick, setDPerClick] = useState(1);
  const [dollarsPerSecDisp, setDPerSecDisp] = useState(0);
  const [dollarsPerClickDisp, setDPerClickDisp] = useState(1);
  const [perClickUpgCost, setPerClickUpgCost] = useState(5);
  const [perSecUpgCost, setPerSecUpgCost] = useState(10);
  const [perClickUpgCostDisp, setPerClickUpgCostDisp] = useState(5);
  const [perSecUpgCostDisp, setPerSecUpgCostDisp] = useState(10);
  const [buttonStyle, setButtonStyle] = useState("")
  const basicButtonPrice = 1000;
  const lvl2ButtonPrice = 10000;
  const lvl3ButtonPrice = 100000;
  const EliteButtonPrice = 1000000;

//effects----------------------------------
  useEffect(() => {
    console.log("Initializing game.");
  }, []);

  useEffect(() => {
    return () => {
      console.log("unmounting button window");
      //clear existing intervals
      for (var i=0; i<intervals.length; i++){
        clearInterval(intervals[i]);
      }
      intervals = [];
      //create new interval
      const perSecAllowance = setInterval(function(){
        console.log(`Received ${dollarsPerSec} dollars`);
        setDollars(dollars+dollarsPerSec);
      }, 1000);
      intervals.push(perSecAllowance);
      console.log(`created new interval: ${perSecAllowance}`);
    }
  }, []);
  
  useEffect(() => {
    //clear existing intervals
    for (var i=0; i<intervals.length; i++){
      clearInterval(intervals[i]);
    }
    intervals = [];
    //create new interval
    const perSecAllowance = setInterval(function(){
      console.log(`Received ${dollarsPerSec} dollars`);
      setDollars(dollars+dollarsPerSec);
    }, 1000);
    intervals.push(perSecAllowance);
    console.log(`created new interval: ${perSecAllowance}`);
    //display new value
    setDollarDisplay(dollars);
    if (dollars >= 1000){//thousands
      setDollarDisplay((dollars/1000)+"K");
    }
    else if (dollars >= 1000000){//millions
      setDollarDisplay(round(dollars/1000000, 3)+"M");
    }
  }, [dollars]);

  useEffect(() => {
    console.log("dollars per click changed");
    setDPerClickDisp(dollarsPerClick);
    if (dollarsPerClick >= 1000){
      setDPerClickDisp((dollarsPerClick/1000)+"K");
    }
    else if (dollarsPerClick >= 1000000){
      setDPerClickDisp(round(dollarsPerClick/1000000, 3)+"M");
    }
  }, [dollarsPerClick]);

  useEffect(() => {
    console.log("dollars per click upgrade cost changed");
    setPerClickUpgCostDisp(perClickUpgCost);
    if (perClickUpgCost >= 1000){
      setPerClickUpgCostDisp((perClickUpgCost/1000)+"K");
    }
    else if (perClickUpgCost >= 1000000){
      setPerClickUpgCostDisp(round(perClickUpgCost/1000000, 3)+"M");
    }
  }, [perClickUpgCost]);

  useEffect(() => {
    console.log("dollars per second changed");
    setDPerSecDisp(dollarsPerSec);
    if (dollarsPerSec >= 1000){
      setDPerSecDisp((dollarsPerSec/1000)+"K");
    }
    else if (dollarsPerSec >= 1000000){
      setDPerSecDisp(round(dollarsPerSec/1000000, 3)+"M");
    }
  }, [dollarsPerSec]);

  useEffect(() => {
    console.log("dollars per second upgrade cost changed");
    setPerSecUpgCostDisp(perSecUpgCost);
    if (perSecUpgCost >= 1000){
      setPerSecUpgCostDisp((perSecUpgCost/1000)+"K");
    }
    else if (perSecUpgCost >= 1000000){
      setPerSecUpgCostDisp(round(perSecUpgCost/1000000, 3)+"M");
    }
  }, [perSecUpgCost]);
  
  //functions--------------------------------
  function btnClick(){
    setClicks(clicks+1);
    setDollars(dollars+dollarsPerClick);
    
    button.current.style.filter = "brightness(1.3)";
    button.current.style.transform = "scale(1.2)";
    setTimeout(function(){
      button.current.style.filter = "brightness(1)";
      button.current.style.transform = "scale(1)";
    }, 100);
    switch (clicks){
      case 1:
        setMsg("Good job following instructions.");
        break;
      case 10:
        setMsg("Great start! You can now afford the passive money upgrade.");
        break;
      case 20: 
        setMsg("You're well on your way to riches.");
        break;
      case 50: 
        setMsg("What a hard worker you are.");
        break;
      case 100: 
        setMsg("Dollaz 4 Dayz!!");
        break;
      case 150: 
        setMsg("If only this was real money...");
        break;
      case 200: 
        setMsg("Look at you, smashing a red button over and over. So easily entertained.");
        break;
      case 250: 
        setMsg("I hope you're using a touchscreen or a touchpad. And at least two fingers.");
        break;
      case 300: 
        setMsg("If you stop clicking, you'll die. Jk... maybe");
        break;
      case 400: 
        setMsg("Do your fingers hurt yet?");
        break;
      case 500: 
        setMsg("You're very persistent. You must be proud of yourself.");
        break;
      case 550: 
        setMsg("Sit back, relax, and click some more. You know you want to.");
        break;
      case 600: 
        setMsg("I bet you're a millionaire by now!");
        break;
    }
  }
  
  function upgradeClick(){
    if (dollars >= perClickUpgCost){
      upgPerClickBtn.current.style.animation = "success 1s ease-out";
      setTimeout(() => {upgPerClickBtn.current.style.animation = "";}, 1100);
      setDPerClick((dollarsPerClick+1)*2);
      setDollars(dollars - perClickUpgCost);
      setPerClickUpgCost(perClickUpgCost*3);
    } else {
      upgPerClickBtn.current.style.animation = "failure 1s ease-out";
      setTimeout(() => {upgPerClickBtn.current.style.animation = "";}, 1100);
      setAltMsg("You are too poor, Keep clicking.")
      setTimeout(function(){setAltMsg("")}, 2000)
    }
  }
  
  function upgradePerSec(){
    if (dollars >= perSecUpgCost){
      upgPerSecBtn.current.style.animation = "success 1s ease-out";
      setTimeout(() => {upgPerSecBtn.current.style.animation = "";}, 1400);
      setDPerSec((dollarsPerSec+1)*2);
      setDollars(dollars - perSecUpgCost);
      setPerSecUpgCost(perSecUpgCost*3);
    } else {
      upgPerSecBtn.current.style.animation = "failure 1s ease-out";
      setTimeout(() => {upgPerSecBtn.current.style.animation = "";}, 1400);
      setAltMsg("You are too poor, Keep clicking.")
      setTimeout(() => {setAltMsg("")}, 2000)
    }
  }

  function openShop(){
      console.log("opening shop window");
      document.getElementById('shop-holder').style.display = "block";
  }

  function closeShop(){
    console.log("closing shop window");
    document.getElementById('shop-holder').style.display = "none";
  }
  
  //elements--------------------------------------
  return (
    <main>
      
      <div id="shop-holder">
        <svg height="50px" width="50px" id="closeicon" onClick={closeShop}>
          <line x1="0" y1="0" x2="50" y2="50" stroke="black" strokeWidth="3px" />
          <line x1="50" y1="0" x2="0" y2="50" stroke="black" strokeWidth="3px" />
        </svg>
        <h1>Shop</h1>
        <p>New styles for you!</p>
        <h3>Button Styles</h3>
        <div id="button-styles" className="store-section">
          <div className="store-item">
            <img src="blue-button.svg"></img>
            <p>Blue</p>
            <button>Price: ${basicButtonPrice}</button>
          </div>
          <div className="store-item">
            <img src="green-button.svg"></img>
            <p>Green</p>
            <button>Price: ${basicButtonPrice}</button>
          </div>
          <div className="store-item">
            <img src="orange-button.svg"></img>
            <p>Orange</p>
            <button>Price: ${basicButtonPrice}</button>
          </div>
          <div className="store-item">
            <img src="pink-button.svg"></img>
            <p>Pink</p>
            <button>Price: ${basicButtonPrice}</button>
          </div>
          <div className="store-item">
            <img src="purple-button.svg"></img>
            <p>Purple</p>
            <button>Price: ${basicButtonPrice}</button>
          </div>
          <div className="store-item">
            <img src="funny-face-button.svg"></img>
            <p>Funny face</p>
            <button>Price: ${lvl2ButtonPrice}</button>
          </div>
          <div className="store-item">
            <img src="disco-button.svg"></img>
            <p>Disco</p>
            <button>Price: ${lvl2ButtonPrice}</button>
          </div>
        </div>
        <h3>Color Schemes</h3>
        <div id="color-schemes" className="store-section">
          <img src=""></img>
        </div>
      </div>

      
      <h1 className="unselectable">Clicker game</h1>
      <p className="unselectable">Click the button and see what happens...</p>
      <img src="red-button.svg" id="theButton" onMouseDown={btnClick} ref={button}></img>
      <img src="/shopping-cart-icon.svg" id="shopicon" onClick={openShop}></img>
      <div id="two-grid">
        <div>
          <h1 className="unselectable" ref={moneyAnimation} id="moneyAnimation">${animateValue}</h1>
          <h1 className="unselectable">${dollarDisplay}</h1>
          <p ref={msgElement} className="unselectable">{msg}</p>
          <p ref={altMsgElement} className="unselectable" id="altMsg">{altMsg}</p>
        </div>
        <div>
          <p className="unselectable">${dollarsPerClickDisp} per click</p>
          <button className="unselectable" onClick={upgradeClick} ref={upgPerClickBtn}>Upgrade: ${perClickUpgCostDisp}</button>
          <p className="unselectable">${dollarsPerSecDisp} per second</p>
          <button className="unselectable" onClick={upgradePerSec} ref={upgPerSecBtn}>Upgrade: ${perSecUpgCostDisp}</button>
        </div>
      </div>
      
    </main>
  )
}