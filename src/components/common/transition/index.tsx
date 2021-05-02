import React, { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import Transition from './Transition';
import style from './index.css';

let show;
let disappear;
function TransitionContainer<FC>(props) {
  const [flag, setFlag] = useState(false);

  show = () => {
    setFlag(true);
  };

  disappear = () => {
    setFlag(false);
  };

  if (!flag) return null;

  return (
    <div className={style.wrapper}>
      <Transition />
    </div>
  );
}

let el = document.querySelector('#transition-wrapper');
if (!el) {
  el = document.createElement('div');
  el.className = 'transition-wrapper';
  el.id = 'transition-wrapper';
  document.body.append(el);
}

ReactDOM.render(<TransitionContainer />, el);

export default {
  show,
  disappear,
};
