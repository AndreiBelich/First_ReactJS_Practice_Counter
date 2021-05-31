import React, {useState, useEffect} from 'react'
import Button from "../Button";
import style from "./Counter.module.scss";

const Counter = () => {

  const [isIncrease, setIsIncrease] = useState(true);
  const [value, setValue] = useState(0);
  const [step, setStep] = useState(1);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [controlValue, setControlValue] = useState("1");
  const [delay, setDelay] = useState(1000);
  const [minStep, setMinStep] = useState(1);
  const [maxStep, setMaxStep] = useState(100);
  const [minDelay, setMinDelay] = useState(500);
  const [maxDelay, setMaxDelay] = useState(10000);
  const [isCorrectDelay, setIsCorrectDelay] = useState(true);

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
      const minDelayStr = "" + minDelay;
      if(value.length < minDelayStr.length){
        setIsCorrectDelay(false);
        return;
      }
      const regex = new RegExp(`[5-9][0-9]{2}[0-9]{0,1}$|(${maxDelay})`);
      if(regex.test(value)){
        setIsCorrectDelay(true);
        target.value = value;
        setDelay(+value);
        target.blur();
      }else{
        setIsCorrectDelay(false);
        return;
      }
    }
  }

  const onKeyUp = ({target, charCode}) => {
    if(charCode < 48 || charCode > 57){
      target.value = target.value.replace(/[^\d]/g,'');
      return;
    }
  }

  const validateStep = ({target, target: { value }}) => {
    if(value.length >= 3 && +value !== maxStep){
      console.log("Mistake");
      target.value = value.slice(0, 2);
      setStep(+target.value);
      setControlValue(target.value);
      return;
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
    <article className={style.counter}>
      <div className={style.block}>
        <h2 className={style.blockHeader}>Блок регулирования режима</h2>
        <div className={style.flexColumn}>
          <p className={style.paragraph}>Выберите режим increase или decrease</p>
          <Button handler={changeMode} caption={"Change Mode"} />
        </div>
      </div>
 
      <div className={style.display}>{value}</div>
      <div className={style.block}>
        <h2 className={style.blockHeader}>Блок для регулирования шага</h2>
        <div className={style.flexColumn}>
          <p className={style.paragraph}>Текущее значение шага = {step}</p>
          <p className={style.paragraph}>Введите новое значение шага и нажмите Enter</p>
          <input onChange={changeStep} onKeyUp={validateStep} type="number" value={controlValue} min={minStep} max={maxStep} />
        </div>
      </div>

      <div className={style.block}>
        <h2 className={style.blockHeader}>Текущий режим</h2>
        <div className={style.flexColumn}>
          <Button handler={isIncrease ? increase : decrease}
                caption={isIncrease ? "Increase" : "Decrease"}/>
        </div>
      </div>
      <div className={style.block}>
        <h2 className={style.blockHeader}>Блок автоклика</h2>
        <div className={style.flexColumn}>
          <p className={`${style.paragraph} ${!isCorrectDelay ? style.wrongEnter : ""}`}>
            {
              isCorrectDelay ? `Текущая задержка для автоклика в милисекундах: ${delay}`
                             : `Указано некорректное значение, значение задержки для счетчика НЕ было  изменено, применятеся предидущее значение ${delay} `
            }
          </p>
          <p className={style.paragraph}>Введите время для задержки между срабатываниями и нажмите Enter</p>
          <input className={style.input} onKeyUp={onKeyUp} onKeyPress={changeDelay} type="text" placeholder={`Enter delay time from ${minDelay} to ${maxDelay} ms`} />
          <p className={style.paragraph}>Нажмите на кнопку что бы активировать/деактивиротать авторежим</p>
          <Button handler={autoClick}
                  caption={`Auto Click Mode: ${isAutoMode ? "On" : "Off"}`}/>
        </div>
      </div>
    </article>
  )
}

export default Counter;