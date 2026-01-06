import { useState, useCallback } from 'react';

const MIN_VALUE = -5;
const MAX_VALUE = 5;
const RESET_VALUE = 0;

const useCounter = (initialValue = RESET_VALUE) => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount(prevCount => Math.min(MAX_VALUE, prevCount + 1));
  }, []);

  const decrement = useCallback(() => {
    setCount(prevCount => Math.max(MIN_VALUE, prevCount - 1));
  }, []);

  const reset = useCallback(() => {
    setCount(RESET_VALUE);
  }, []);

  return {
    count,
    increment,
    decrement,
    reset,
    MIN_VALUE,
    MAX_VALUE,
  };
};

export default useCounter;