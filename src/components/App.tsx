import React from 'react';
import './App.css';

interface IProps {
  name: string;
  age: number;
}

function App(props: IProps) {
  const { name, age } = props;
  return (
    <div className="app">
      <span>{`hello! I'm ${name}, ${age} years old.`}</span>
    </div>
  );
}

export default App;
