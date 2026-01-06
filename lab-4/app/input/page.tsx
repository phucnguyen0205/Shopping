"use client"; 

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import React from 'react';

export default function FileInput() {
    // State để lưu trữ tệp đã chọn (có thể là null nếu chưa chọn)
    const [selectedFile, setSelectedFile] = useState<File | null>(null); 
    
    // State để lưu trữ tên tệp (dễ hiển thị hơn)
    const [fileName, setFileName] = useState("Chưa có tệp nào được chọn."); 

    // Hàm xử lý sự kiện khi tệp được chọn
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // e.target.files là một đối tượng FileList
        const files = e.target.files;

        if (files && files.length > 0) {
            // Lấy tệp đầu tiên trong danh sách (vì type="file" mặc định chỉ cho chọn 1)
            const file = files[0];
            setSelectedFile(file);
            setFileName(file.name);
        } else {
            // Nếu người dùng hủy chọn tệp
            setSelectedFile(null);
            setFileName("Chưa có tệp nào được chọn.");
        }
    };

    return (
        <div className="flex flex-col items-center p-8 bg-white min-h-screen">
            
            {/* Tiêu đề */}
            <h2 className="text-2xl font-semibold mb-6">File Input Example</h2>

            {/* 1. File Input */}
            <div className="w-full max-w-md mb-8">
                <label className="block mb-2 text-lg font-medium text-gray-700">
                    Chọn tệp của bạn:
                </label>
                <Input 
                    // Thay đổi type thành "file"
                    type="file"
                    // Bỏ thuộc tính value={} vì Input file không sử dụng value để hiển thị
                    onChange={handleFileChange}
                    className="p-4 text-lg border-gray-300 file:mr-4 file:py-2 file:px-4
                               file:rounded-full file:border-0 file:text-sm file:font-semibold
                               file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
            </div>
            
            {/* 2. Hiển thị thông tin tệp đã chọn */}
            <p className="text-xl font-medium text-gray-800 mt-4">
                Tên tệp đã chọn: <span className="text-blue-600 font-bold break-words">{fileName}</span>
            </p>

            {/* (Tùy chọn) Hiển thị thông tin chi tiết tệp */}
            {selectedFile && (
                <div className="mt-4 text-sm text-gray-600">
                    <p>Kích thước: {(selectedFile.size / 1024).toFixed(2)} KB</p>
                    <p>Loại tệp: {selectedFile.type || "Không xác định"}</p>
                </div>
            )}
        </div>
    );
}