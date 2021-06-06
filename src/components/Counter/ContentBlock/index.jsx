import React from 'react';
import PropTypes from "prop-types";
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

ContentBlock.defaultProps = {
  headerCaption: "Header caption"
};


ContentBlock.propTypes = {
  headerCaption: PropTypes.string.isRequired
};

export default ContentBlock;
