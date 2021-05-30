import React, {useState, useEffect} from 'react'

const Counter = () => {

  const [isIncrease, setIsIncrease] = useState(true);
  const [value, setValue] = useState(0);
  const [step, setStep] = useState(1);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [controlValue, setControlValue] = useState("1");
  const [delay, setDelay] = useState(1000);

  const changeStep = ({target: {value}}) => {
    setStep(+value || 1);
    setControlValue(value);
  }

  const increase = () => {
    setValue((prev) => prev + step);
  }

  const decrease = () => {
    setValue((prev) => prev - step < 0 ? 0 : prev - step);
  }

  const changeMode = () => {
    setIsIncrease((prev) => !prev);
  }

  const autoClick = () => {
    setIsAutoMode((prev) => !prev);
  }

  const changeDelay = ({target, target: { value }, code}) => {
    if(code === "Enter"){
      const regex = /^[1-9][0-9]{1,3}$|(10000)/;
      if(regex.test(value)){
        console.log("Regex = true");
        target.value = value;
        setDelay(+value);
      }else{
        console.log("Invalid value!!!");
        return;
      }
    }
  }

  useEffect(()=> {
    let id = null;
    if(isAutoMode){
      id = setTimeout(() => {
        if(isIncrease){
          increase();
        }else{
          decrease();
        }
      }, delay);
    }
    return () => clearTimeout(id);
  });
  return (
    <article>
      <button onClick={changeMode}>Change Mode</button>
      <div className="display">{value}</div>
      <div>Current step = {step}</div>
      <button onClick={isIncrease ? increase : decrease}>{isIncrease ? "Increase" : "Decrease"}</button>
      <input onChange={changeStep} type="number" value={controlValue} min="1" max="30" />
      <button onClick={autoClick}>Auto Click Mode {isAutoMode ? "On" : "Off"}</button>
      <input onKeyPress={changeDelay} type="text" placeholder="Enter delay time from 10 to 10000 ms" />
    </article>
  )
}

export default Counter;