"use client";
import { Button } from "@/components/ui/button";
import useCounter from "@/hooks/use-counter"; 

export default function Exercise1Counter() {
  const { count, increment, decrement, reset, MIN_VALUE, MAX_VALUE } = useCounter(); 

  return (
    <div className="p-6 bg-white border border-blue-200 rounded-lg shadow-md w-full max-w-3xl">
      <div className="flex items-center justify-center space-x-6">
        <Button 
          onClick={decrement}
          disabled={count === MIN_VALUE} 
          className={`text-xl px-6 py-3 rounded-lg shadow-md ${count === MIN_VALUE ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          — Giảm
        </Button>
        <span className="text-5xl font-extrabold text-black w-12 text-center">
          {count}
        </span>
        <Button 
          onClick={increment}
          disabled={count === MAX_VALUE} 
          className={`text-xl px-6 py-3 rounded-lg shadow-md ${count === MAX_VALUE ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          + Tăng
        </Button>
        <Button 
          onClick={reset}
          className="text-xl px-6 py-3 bg-gray-500 hover:bg-gray-600 rounded-lg shadow-md"
        >
          ↻ Reset
        </Button>
      </div>
    </div>
  );
}