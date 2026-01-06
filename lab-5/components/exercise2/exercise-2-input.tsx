"use client";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Exercise2Input() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleShowAlert = useCallback(() => {
    if (inputValue.trim()) {
      alert(`Giá trị input hiện tại là: "${inputValue}"`);
    } else {
      alert("Vui lòng nhập giá trị!");
    }
  }, [inputValue]);

  return (
    <div className="p-6 bg-white border border-blue-200 rounded-lg shadow-md w-full max-w-3xl">
      <h3 className="text-xl font-semibold mb-4 text-blue-700">2. Quản lý Input (useState)</h3>
      <div className="w-full flex space-x-4">
        <Input 
          type="text"
          value={inputValue} 
          onChange={handleInputChange}
          className="p-3 text-lg flex-grow border-blue-300"
          placeholder="Nhập giá trị..."
        />
        <Button 
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 text-lg rounded-lg shadow-md" 
          onClick={handleShowAlert}
        >
          Hiển thị Alert
        </Button>
      </div>
    </div>
  );
}