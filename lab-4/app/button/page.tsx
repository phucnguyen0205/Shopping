"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState<string[]>([]); 

  const [counter, setCounter] = useState(5);

  const handleButtonClick = () => {
    alert("Bạn vừa nhấn nút!");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        const trimmedValue = inputValue.trim();
        
        if (trimmedValue) {
            setTasks(prevTasks => [...prevTasks, trimmedValue]);
            setInputValue('');
        }
    }
  };
  const handleDecrement = () => {
    if (counter > 0) {
      setCounter(prevCounter => prevCounter - 1);
    }
  };

  const handleIncrement = () => {
    setCounter(prevCounter => prevCounter + 1);
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <Button 
          className="bg-blue-400 hover:bg-blue-600 text-white px-6 py-3 text-lg rounded-lg shadow-md" 
          onClick={handleButtonClick}
        >
          Click Me!
        </Button>
      </div>
      <div className="flex flex-col items-center p-8 bg-white min-h-screen">  
        {/* 1. Text Input */}
        <div className="w-full max-w-md mb-8">
          <Input 
            type="text"
            value={inputValue} 
            onChange={handleInputChange}
            className="p-4 text-lg"
          />
        </div>
        <p className="text-xl font-medium text-gray-800">
          Giá trị hiện tại: <span className="text-black ">{inputValue}</span>
        </p>     
      </div>    

      <div className="flex flex-col items-center justify-center min-h-screen relative bottom-70">
        <Button className="text-2xl bg-sky-500 hover:bg-red-700 w-60 h-60">Hover me!</Button>
      </div>

   <div className="flex flex-col items-center p-8 bg-white min-h-screen">
            <div className="w-full max-w-md mb-8">
                <Input 
                    type="text"
                    value={inputValue} 
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown} 
                    className="p-4 text-lg border-blue-500 ring-2 ring-blue-500" 
                    placeholder="Nhập text và nhấn Enter..." 
                />
            </div>
            <div className="w-full max-w-md space-y-2">
                {tasks.map((task, index) => (
                    <div 
                        key={index} 
                        className="p-4 bg-gray-50 border border-gray-200 rounded-md text-gray-800 text-lg shadow-sm"
                    >
                        <span className="font-bold mr-2">{index + 1}.</span> {task}
                    </div>
                ))}
                
                {tasks.length === 0 && (
                    <p className="text-gray-500 text-center mt-4">Chưa có task nào.</p>
                )}
            </div>
        </div>
      <div className="flex flex-col items-center p-8 min-h-[50vh]">
        <div className="flex items-center space-x-6">
            <Button 
                onClick={handleDecrement}
                disabled={counter === 0} 
                className={`text-xl px-6 py-3 rounded-lg shadow-md ${counter === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
                — Giảm
            </Button>
            <span className="text-5xl font-extrabold text-black w-12 text-center">
                {counter}
            </span>
            <Button 
                onClick={handleIncrement}
                className="text-xl px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md"
            >
                + Tăng
            </Button>
        </div>
      </div>
    </div>
  );
}