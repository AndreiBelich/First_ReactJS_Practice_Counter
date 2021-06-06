import React from 'react';
import style from "./ContentBlock.module.sass";

function ContentBlock({headerCaption, children}) {
  return (
    <>
      <div className={style.block}>
        <h2 className={style.blockHeader}>{headerCaption}</h2>
        <div className={style.flexColumn}>
          {children}
        </div>
      </div>
    </>
  )
}

export default ContentBlock;
