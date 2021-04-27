import React, { FC } from 'react';
import style from './Header.css';
import sun from './image/sun.png';

const Header: FC = () => {
  return (
    <div>
      <div className={style.slogan}>
        <img src={sun} alt="图片加载失败" className={style.sun} />
        analyze efficiently, live easier.
      </div>
    </div>
  );
};

export default Header;
