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
  const buyBlueBtn = useRef();
  const buyGreenBtn = useRef();
  const buyOrangeBtn = useRef();
  const buyPinkBtn = useRef();
  const buyPurpleBtn = useRef();
  const buyFunnyFaceBtn = useRef();
  const buyDiscoBtn = useRef();
  const buyFloralBtn = useRef();
  const buyPolkaDotsBtn = useRef();
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
  const shopStock = [redButton, blueButton, orangeButton, pinkButton, purpleButton, funnyFaceButton, discoButton, floralButton, polkaDotsButton];
  var redButton = {
    src: "red-button.svg",
    name: "Red",
    owned: true,
    price: 1000,
  }
  var blueButton = {
    src: "blue-button.svg",
    name: "Blue",
    owned: {value: false, writable: true},
    price: 1,
    buyButton: buyBlueBtn.current,
  }
  var greenButton = {
    src: "green-button.svg",
    name: "Green",
    owned: {value: false, writable: true},
    price: 1000,
    buyButton: buyGreenBtn.current,
  }
  var orangeButton = {
    src: "orange-button.svg",
    name: "Orange",
    owned: {value: false, writable: true},
    price: 1000,
    buyButton: buyOrangeBtn.current,
  }
  var pinkButton = {
    src: "pink-button.svg",
    name: "Pink",
    owned: {value: false, writable: true},
    price: 1000,
    buyButton: buyPinkBtn.current,

  }
  var purpleButton = {
    src: "purple-button.svg",
    name: "Purple",
    owned: {value: false, writable: true},
    price: 1000,
    buyButton: buyPurpleBtn.current,
  }
  var funnyFaceButton = {
    src: "funny-face-button.svg",
    name: "Funny face",
    owned: {value: false, writable: true},
    price: 15000,
    buyButton: buyFunnyFaceBtn.current,
  }
  var discoButton = {
    src: "disco-button.svg",
    name: "Disco",
    owned: {value: false, writable: true},
    price: 15000,
    buyButton: buyDiscoBtn.current,
  }
  var floralButton = {
    src: "floral-button.svg",
    name: "Floral",
    owned: {value: false, writable: true},
    price: 15000,
    buyButton: buyFloralBtn.current,
  }
  var polkaDotsButton = {
    src: "polkadots-button.svg",
    name: "Polka dots",
    owned: {value: false, writable: true},
    price: 15000,
    buyButton: buyPolkaDotsBtn.current,
  }
  const [buyBlueMsg, setBuyBlueMsg] = useState(`Price: $${blueButton.price}`);
  const [buyGreenMsg, setBuyGreenMsg] = useState(`Price: $${greenButton.price}`);
  const [buyOrangeMsg, setBuyOrangeMsg] = useState(`Price: $${orangeButton.price}`);
  const [buttonStyle, setButtonStyle] = useState(redButton.src);

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
      //console.log(`Received ${dollarsPerSec} dollars`);
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
      console.log()
  }

  function closeShop(){
    console.log("closing shop window");
    document.getElementById('shop-holder').style.display = "none";
  }

  function buy(itemObj){
    console.log(`buy button: ${itemObj.buyButton}`);
    console.log(`item is owned: ${itemObj.owned.value}`);
    if (itemObj.owned.value == false){
      console.log(`attempting to buy ${itemObj.name} button`);
      if (dollars >= itemObj.price){
        console.log(`bought ${itemObj.name} button`);
        setDollars(dollars - itemObj.price);
        itemObj.buyButton.style.animation = "success 1s ease-out";
        setTimeout(() => {itemObj.buyButton.style.animation = "";}, 1400);
        itemObj.owned.value = true;
        setButtonStyle(itemObj.src);
        switch (itemObj.name){
          case "Blue":
            setBuyBlueMsg("Use");
            break;
        }
      } else {
        console.log("buy failed, cannot afford.");
        itemObj.buyButton.style.animation = "failure 1s ease-out";
        setTimeout(() => {itemObj.buyButton.style.animation = "";}, 1400);
      }
    } else {
      console.log("item already owned. Applying...");
      setButtonStyle(itemObj.src);
    }
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
        <h2 id="shop-dollar-display">${dollarDisplay}</h2>
        <p>New styles for you!</p>
        <h3>Button Styles</h3>
        <div id="button-styles" className="store-section">
          <div className="store-item">
            <img src={blueButton.src}></img>
            <p>{blueButton.name}</p>
            <button ref={buyBlueBtn} onClick={()=>buy(blueButton)}>{buyBlueMsg}</button>
          </div>
          <div className="store-item">
            <img src={greenButton.src}></img>
            <p>{greenButton.name}</p>
            <button onClick={()=>buy(greenButton)} ref={buyGreenBtn}>{buyGreenMsg}</button>
          </div>
          <div className="store-item">
            <img src={orangeButton.src}></img>
            <p>{orangeButton.name}</p>
            <button ref={buyOrangeBtn} onClick={()=>buy(orangeButton)}>Price: ${orangeButton.price}</button>
          </div>
          <div className="store-item">
            <img src={pinkButton.src}></img>
            <p>{pinkButton.name}</p>
            <button ref={buyPinkBtn} onClick={()=>buy(pinkButton)}>Price: ${pinkButton.price}</button>
          </div>
          <div className="store-item">
            <img src={purpleButton.src}></img>
            <p>{purpleButton.name}</p>
            <button ref={buyPurpleBtn} onClick={()=>buy(purpleButton)}>Price: ${purpleButton.price}</button>
          </div>
          <div className="store-item">
            <img src={funnyFaceButton.src}></img>
            <p>{funnyFaceButton.name}</p>
            <button ref={buyFunnyFaceBtn} onClick={()=>buy(funnyFaceButton)}>Price: ${funnyFaceButton.price}</button>
          </div>
          <div className="store-item">
            <img src={discoButton.src}></img>
            <p>{discoButton.name}</p>
            <button ref={buyDiscoBtn} onClick={()=>buy(discoButton)}>Price: ${discoButton.price}</button>
          </div>
          <div className="store-item">
            <img src={floralButton.src}></img>
            <p>{floralButton.name}</p>
            <button ref={buyFloralBtn} onClick={()=>buy(floralButton)}>Price: ${floralButton.price}</button>
          </div>
          <div className="store-item">
            <img src={polkaDotsButton.src}></img>
            <p>{polkaDotsButton.name}</p>
            <button ref={buyPolkaDotsBtn} onClick={()=>buy(polkaDotsButton)}>Price: ${polkaDotsButton.price}</button>
          </div>
        </div>
        <h3>Color Schemes</h3>
        <div id="color-schemes" className="store-section">
          <img src=""></img>
        </div>
      </div>

      
      <h1 className="unselectable">Clicker game</h1>
      <p className="unselectable">Click the button and see what happens...</p>
      <img src={buttonStyle} id="theButton" onMouseDown={btnClick} ref={button}></img>
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