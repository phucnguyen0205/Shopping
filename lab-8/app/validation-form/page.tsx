"use client";

import React, { useState } from 'react';

interface RegisterData {
  fullName: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  gender: string;
  address: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    birthDate: '',
    gender: '',
    address: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Xóa lỗi khi người dùng nhập liệu
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ tên!';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email!';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ!';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Vui lòng nhập số điện thoại!';
    } else if (!/^\d{10,11}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Số điện thoại phải có 10-11 chữ số!';
    }
    
    if (!formData.birthDate) newErrors.birthDate = 'Vui lòng chọn ngày sinh!';
    if (!formData.gender) newErrors.gender = 'Vui lòng chọn giới tính!';
    if (!formData.address.trim()) newErrors.address = 'Vui lòng nhập địa chỉ!';

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length === 0) {
      alert('Đăng ký thành công!');
      console.log('Dữ liệu đăng ký:', formData);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 font-sans">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Form Validation</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Họ và tên */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">
            <span className="text-red-500">*</span> Họ và tên
          </label>
          <input
            name="fullName"
            type="text"
            placeholder="Nhập họ và tên"
            value={formData.fullName}
            onChange={handleChange}
            className={`p-2 border rounded-md outline-none transition-all ${
              errors.fullName ? 'border-red-500' : 'border-gray-300 focus:border-blue-400'
            }`}
          />
          {errors.fullName && <span className="text-red-500 text-sm mt-1">{errors.fullName}</span>}
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">
            <span className="text-red-500">*</span> Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="Nhập email"
            value={formData.email}
            onChange={handleChange}
            className={`p-2 border rounded-md outline-none transition-all ${
              errors.email ? 'border-red-500' : 'border-gray-300 focus:border-blue-400'
            }`}
          />
          {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">
            <span className="text-red-500">*</span> Số điện thoại
          </label>
          <input
            name="phoneNumber"
            type="text"
            placeholder="Nhập số điện thoại"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`p-2 border rounded-md outline-none transition-all ${
              errors.phoneNumber ? 'border-red-500' : 'border-gray-300 focus:border-blue-400'
            }`}
          />
          {errors.phoneNumber && <span className="text-red-500 text-sm mt-1">{errors.phoneNumber}</span>}
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">
            <span className="text-red-500">*</span> Ngày sinh
          </label>
          <input
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            className={`p-2 border rounded-md outline-none transition-all text-gray-600 ${
              errors.birthDate ? 'border-red-500' : 'border-gray-300 focus:border-blue-400'
            }`}
          />
          {errors.birthDate && <span className="text-red-500 text-sm mt-1">{errors.birthDate}</span>}
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">
            <span className="text-red-500">*</span> Giới tính
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`p-2 border rounded-md outline-none bg-white transition-all ${
              errors.gender ? 'border-red-500' : 'border-gray-300 focus:border-blue-400'
            }`}
          >
            <option value="">Chọn giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
          {errors.gender && <span className="text-red-500 text-sm mt-1">{errors.gender}</span>}
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">
            <span className="text-red-500">*</span> Địa chỉ
          </label>
          <textarea
            name="address"
            rows={3}
            placeholder="Nhập địa chỉ"
            value={formData.address}
            onChange={handleChange}
            className={`p-2 border rounded-md outline-none transition-all resize-none ${
              errors.address ? 'border-red-500' : 'border-gray-300 focus:border-blue-400'
            }`}
          />
          {errors.address && <span className="text-red-500 text-sm mt-1">{errors.address}</span>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-md transition-colors shadow-sm"
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
}