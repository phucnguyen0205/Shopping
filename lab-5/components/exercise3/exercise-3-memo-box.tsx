"use client";
import { useState } from "react";

export default function Exercise3MemoBox() {
  const [isHovering, setIsHovering] = useState(false);

  const boxStyle = {
    width: '150px',
    height: '150px',
    backgroundColor: isHovering ? 'red' : 'skyblue',
    transition: 'background-color 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '8px',
    cursor: 'pointer'
  };

  return (
    <div className="p-6 bg-white border border-blue-200 rounded-lg shadow-md w-full max-w-3xl">
      <h3 className="text-xl font-semibold mb-4 text-blue-700">3. Thay đổi màu Box (Hover/Leave)</h3>
      <div className="flex justify-center">
        <div 
          style={boxStyle as React.CSSProperties}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {isHovering ? 'Hover' : 'Hover Active'}
        </div>
      </div>
    </div>
  );
}