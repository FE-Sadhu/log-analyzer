import React, { FC, useState } from 'react';
import style from './FileHandler.css';
import search from './image/search.png';

const FileHandler: FC = () => {
  const [flag, setFlag] = useState(false);

  const onChange = (e) => {
    console.log(e);
  };

  const getProperDisplay = () => {
    return flag ? (
      <div className="inputWrapper">
        <img src={search} alt="oops..." className={style.prefix} />
        <input placeholder="write in RegExp to sift what u want" className={style.input} onChange={onChange} />
      </div>
    ) : (
      <>
        <div className="dropArea" />
        <input type="file" />
      </>
    );
  };
  return <div className={style.wrapper}>{getProperDisplay()}</div>;
};

export default FileHandler;
