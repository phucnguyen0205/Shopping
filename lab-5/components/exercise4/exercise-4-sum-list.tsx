"use client";
import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Thêm import Input

interface Item {
    name: string;
    value: number;
}

export default function Exercise4SumList() {
  // 1. Bỏ sản phẩm mẫu, khởi tạo mảng rỗng
  const [items, setItems] = useState<Item[]>([]);
  
  // State quản lý giá trị nhập vào từ input (luôn là string)
  const [inputValue, setInputValue] = useState('');

  const [count, setCount] = useState(0); 

  // Tính tổng
  const totalSum = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]); 
  
  // Hàm xử lý thay đổi input
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // Chỉ cho phép nhập các ký tự số (và dấu trừ/dấu chấm nếu cần, nhưng ở đây tôi chỉ cho phép số nguyên)
    const value = e.target.value;
    if (value === '' || /^-?\d*$/.test(value)) {
        setInputValue(value);
    }
  }, []);

  // Hàm thêm Item
  const addItem = useCallback(() => {
    const trimmedValue = inputValue.trim();
    const numericValue = parseInt(trimmedValue, 10);

    // 3. Kiểm tra: Không thêm nếu input rỗng hoặc không phải số hợp lệ
    if (trimmedValue === '' || isNaN(numericValue)) {
      // Không có hiện tượng gì xảy ra, chỉ cần return
      return;
    }

    const newItem: Item = { 
        name: `Item ${items.length + 1}`, 
        value: numericValue 
    };
    
    setItems(prev => [...prev, newItem]);
    setInputValue(''); // Xóa input sau khi thêm thành công
  }, [inputValue, items.length]);

  return (
    <div className="p-6 bg-white border border-blue-200 rounded-lg shadow-md w-full max-w-3xl">
      <h3 className="text-xl font-semibold mb-4 text-blue-700">4. Memoize Tổng (useMemo)</h3>
      
      <div className="mb-4 space-y-2">
        <p className="text-2xl font-bold text-green-700">Tổng Giá Trị (Memoized): {totalSum}</p>
        <p className="text-sm text-gray-500">State phụ (Count): {count}</p>
      </div>

      <div className="flex flex-col space-y-4 mb-4">
        {/* Input nhập số */}
        <div className="flex space-x-4">
          <Input 
              type="text" // Dùng text và regex để kiểm soát nhập liệu tốt hơn
              value={inputValue} 
              onChange={handleInputChange} 
              className="p-3 text-lg flex-grow border-green-300"
              placeholder="Nhập giá trị số..."
          />
          <Button 
              onClick={addItem} 
              className="bg-blue-500 hover:bg-blue-600"
              disabled={inputValue.trim() === '' || isNaN(parseInt(inputValue, 10))} // Disable nút khi không có số hợp lệ
          >
            Thêm Item
          </Button>
        </div>
        
        <Button onClick={() => setCount(c => c + 1)} className="bg-indigo-500 hover:bg-indigo-600 w-fit">
          Tăng Count (Không thay đổi [items])
        </Button>
      </div>

      <ul className="list-disc pl-5 max-h-40 overflow-y-auto border p-3 rounded">
        {items.length === 0 ? (
            <li className="text-gray-500 text-center py-2">Chưa có item nào được thêm.</li>
        ) : (
            items.map((item, index) => (
                <li key={index} className="text-gray-700">
                    {item.name}: **{item.value}**
                </li>
            ))
        )}
      </ul>
    </div>
  );
}