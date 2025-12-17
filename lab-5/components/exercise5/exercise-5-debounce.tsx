"use client";
import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";

const mockSearchAPI = (query: string) => {
    return new Promise<string>(resolve => {
        setTimeout(() => {
            resolve(`Kết quả tìm kiếm cho: "${query}"`);
        }, 500);
    });
};

export default function Exercise5Debounce() {
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState('Chờ nhập liệu...');
  const DEBOUNCE_DELAY = 1000;

  const performSearch = useCallback(async (query: string) => {
    if (query.trim() === '') {
        setSearchResult('Chờ nhập liệu...');
        return;
    }
    setSearchResult('Đang tìm kiếm...');
    const result = await mockSearchAPI(query);
    setSearchResult(result);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
        setSearchTerm(inputValue);
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, DEBOUNCE_DELAY]);

  useEffect(() => {
    performSearch(searchTerm);
  }, [searchTerm, performSearch]);


  return (
    <div className="p-6 bg-white border border-blue-200 rounded-lg shadow-md w-full max-w-3xl">
      <h3 className="text-xl font-semibold mb-4 text-blue-700">5. Debounce Input (useCallback + useEffect)</h3>
      <Input 
        type="text"
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)}
        className="p-3 text-lg border-red-300 ring-1 ring-red-300 mb-4"
        placeholder={`Gõ để tìm kiếm (Delay: ${DEBOUNCE_DELAY / 1000}s)...`}
      />
      
      <p className="text-md text-gray-600">Giá trị hiện tại: {inputValue}</p>
      <p className="text-md text-gray-600 mb-4">Giá trị Debounce: {searchTerm}</p>

      <div className="p-4 bg-yellow-100 border border-yellow-300 rounded">
        <p className="font-semibold text-yellow-800">Kết quả Search:</p>
        <p className="text-lg text-yellow-900">{searchResult}</p>
      </div>
    </div>
  );
}