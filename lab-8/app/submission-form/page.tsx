"use client";

import React, { useState } from 'react';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  apiError?: string;
}

export default function ApiFormSubmission() {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validate = () => {
    const newErrors: FormErrors = {};
    if (formData.username.length < 4) {
      newErrors.username = 'Tên đăng nhập phải có ít nhất 4 ký tự!';
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ!';
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          firstName: 'User',
          lastName: 'New'
        })
      });

      if (!response.ok) {
        throw new Error('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau!');
      }

      const data = await response.json();
      setFormData({ username: '', email: '', password: '' });
      alert('Đăng ký tài khoản thành công!');
      
    } catch (error: any) {
      setErrors({ apiError: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 font-sans text-gray-800">
      <h2 className="text-2xl font-bold mb-2 text-gray-900">Exercise 4: API Form Submission</h2>
      <p className="text-gray-500 mb-6 text-sm italic">
        Form đăng ký tài khoản với xử lý gửi dữ liệu lên API và hiển thị thông báo lỗi
      </p>

      {errors.apiError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 relative animate-in fade-in duration-300">
          <div className="bg-red-500 text-white rounded-full p-1 text-[10px] w-5 h-5 flex items-center justify-center mt-0.5">✕</div>
          <div className="flex-1">
            <p className="text-red-800 font-bold text-sm">Lỗi</p>
            <p className="text-red-600 text-sm leading-relaxed">{errors.apiError}</p>
          </div>
          <button onClick={() => setErrors({})} className="text-gray-400 hover:text-gray-600 absolute right-4 text-xl">×</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium"><span className="text-red-500">*</span> Tên đăng nhập</label>
          <input
            name="username"
            type="text"
            placeholder="Nhập tên đăng nhập"
            value={formData.username}
            onChange={handleChange}
            className={`p-2.5 border rounded-md outline-none transition-all ${
              errors.username ? 'border-red-500 bg-red-50/20' : 'border-gray-300 focus:border-blue-400'
            }`}
          />
          {errors.username && <span className="text-red-500 text-xs mt-1">{errors.username}</span>}
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium"><span className="text-red-500">*</span> Email</label>
          <input
            name="email"
            type="text"
            placeholder="Nhập email"
            value={formData.email}
            onChange={handleChange}
            className={`p-2.5 border rounded-md outline-none transition-all ${
              errors.email ? 'border-red-500 bg-red-50/20' : 'border-gray-300 focus:border-blue-400'
            }`}
          />
          {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium"><span className="text-red-500">*</span> Mật khẩu</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md outline-none pr-10 bg-blue-50/30 focus:border-blue-400 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-all shadow-sm flex items-center justify-center gap-2 ${
            isLoading ? 'opacity-70 cursor-not-allowed text-blue-100' : ''
          }`}
        >
          {isLoading && (
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
        </button>
      </form>
    </div>
  );
}