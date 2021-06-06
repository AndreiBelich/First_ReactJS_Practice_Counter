import React, {useState, useEffect} from 'react'
import Button from "./Button";
import ContentBlock from "./ContentBlock";
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
    setValue((prevState) => prevState + step);
  }

  const decrease = () => {
    setValue((prevState) => prevState - step < 0 ? 0 : prevState - step);
  }

  const changeMode = () => {
    setIsIncrease((prev) => !prev);
  }

  const autoClick = () => {
    setIsAutoMode((prevState) => !prevState);
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
      <ContentBlock headerCaption={`Блок регулирования режима`}>
          <p className={style.paragraph}>Выберите режим increase или decrease</p>
          <Button handler={changeMode} caption={"Change Mode"} />
      </ContentBlock>

      <div className={style.display}>{value}</div>

      <ContentBlock headerCaption={`Блок для регулирования шага`}>
        <p className={style.paragraph}>Текущее значение шага = {step}</p>
        <p className={style.paragraph}>Введите новое значение шага и нажмите Enter</p>
        <input onChange={changeStep} onKeyUp={validateStep} type="number" value={controlValue} min={minStep} max={maxStep} />
      </ContentBlock>

      <ContentBlock headerCaption={`Текущий режим`}>
        <Button handler={isIncrease ? increase : decrease}
                caption={isIncrease ? "Increase" : "Decrease"}/>
      </ContentBlock>

      <ContentBlock headerCaption={`Блок автоклика`}>
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
      </ContentBlock>
    </article>
  )
}

export default Counter;