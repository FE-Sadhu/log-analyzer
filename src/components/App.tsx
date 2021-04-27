import React, { FC } from 'react';
import Header from './header/Header';
import style from './App.css';

const App: FC = () => {
  return (
    <div className={style.app}>
      <Header />
    </div>
  );
};

export default App;
