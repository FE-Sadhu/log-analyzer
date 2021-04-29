import React, { FC } from 'react';
import Header from './header/Header';
import FileHandler from './file-handler/FileHandler';
import style from './App.css';

const App: FC = () => {
  return (
    <div className={style.app}>
      <Header />
      <FileHandler />
    </div>
  );
};

export default App;
