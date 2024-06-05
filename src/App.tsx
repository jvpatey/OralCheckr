import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  console.log("Re-rendering");

  /* function handleCount(number1: number, number2: number) {
    return number1 + number2;
  }

  handleCount(5, "hello"); */

  function handleCount() {
    setCount(count + 1);
  }

  function handleSubtract() {
    setCount(count - 1);
  }

  return (
    <>
      <h2>{count}</h2>
      <button onClick={handleCount} style={{ backgroundColor: "red" }}>
        Add
      </button>
      <button onClick={handleSubtract}>Subtract</button>
    </>
  );
}

export default App;
