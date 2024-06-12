import { useState } from 'react';
import { TestExample } from '../componenets/TestExample';

export default function Landing() {
  const [count, setCount] = useState(0);

  console.log('Re-rendering');

  function handleCount() {
    setCount(count + 1);
  }

  function handleSubtract() {
    setCount(count - 1);
  }
  return (
    <>
      <h2>{count}</h2>
      <button onClick={handleCount} style={{ backgroundColor: 'red' }}>
        Add
      </button>
      <button onClick={handleSubtract}>Subtract</button>
      <TestExample cardTitle="Landing Page" cardBody="Fox jumped over the fence" />
    </>
  );
}
