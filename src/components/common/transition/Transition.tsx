import React, { FC, useState } from 'react';
import style from './Transition.css';

function Transition<FC>(props) {
  return (
    <div className={style.wrapper}>
      <span className={`${style.antSpinDot} ${style.antSpinDotSpin}`}>
        <i className={style.f} />
        <i className={style.s} />
        <i className={style.t} />
        <i className={style.four} />
      </span>
      <em className={style.word}>Just Wait A Moment...</em>
    </div>
  );
}

export default Transition;
