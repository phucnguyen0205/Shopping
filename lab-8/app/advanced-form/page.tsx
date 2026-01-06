"use client";

import React, { useState } from 'react';

export default function AdvancedValidationForm() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    birthDate: '',
    creditCard: ''
  });

  const [errors, setErrors] = useState<any>({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'creditCard') {
      const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      const matches = v.match(/\d{4,16}/g);
      const match = (matches && matches[0]) || '';
      const parts = [];
      for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
      }
      setFormData({ ...formData, [name]: parts.length > 1 ? parts.join('-') : value });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validate = () => {
    const newErrors: any = {};

    if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt';
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp!';
    }

    if (!formData.birthDate) {
      newErrors.birthDate = 'Vui lòng chọn ngày sinh!';
    }

    const cleanCard = formData.creditCard.replace(/-/g, '');
    if (cleanCard.length !== 16) {
      newErrors.creditCard = 'Số thẻ tín dụng không hợp lệ (phải đủ 16 số)!';
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      alert('Xác nhận thông tin thành công!');
      console.log('Dữ liệu hợp lệ:', formData);
    } else {
      setErrors(validationErrors);
    }
  };
  const EyeIcon = ({ show, toggle }: { show: boolean, toggle: () => void }) => (
    <button type="button" onClick={toggle} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
      {show ? (
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
  );

  return (
    <div className="max-w-xl mx-auto p-8 font-sans text-gray-800">
      <h2 className="text-2xl font-bold mb-2">Exercise 5: Advanced Form Validation</h2>
      <p className="text-gray-500 mb-6 text-sm">Form với các quy tắc validation nâng cao cho mật khẩu, ngày tháng và các trường đặc biệt khác</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Mật khẩu */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium"><span className="text-red-500">*</span> Mật khẩu</label>
          <div className="relative">
            <input
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md outline-none pr-10 ${errors.password ? 'border-red-500' : 'border-gray-300 focus:border-blue-400'}`}
            />
            <EyeIcon show={showPass} toggle={() => setShowPass(!showPass)} />
          </div>
          <p className={`text-xs mt-1 ${errors.password ? 'text-red-500' : 'text-gray-400'}`}>
            Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt
          </p>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium"><span className="text-red-500">*</span> Xác nhận mật khẩu</label>
          <div className="relative">
            <input
              name="confirmPassword"
              type={showConfirmPass ? "text" : "password"}
              placeholder="Xác nhận mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md outline-none pr-10 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300 focus:border-blue-400'}`}
            />
            <EyeIcon show={showConfirmPass} toggle={() => setShowConfirmPass(!showConfirmPass)} />
          </div>
          {errors.confirmPassword && <span className="text-red-500 text-xs mt-1">{errors.confirmPassword}</span>}
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium"><span className="text-red-500">*</span> Ngày sinh</label>
          <input
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            className={`p-2 border rounded-md outline-none ${errors.birthDate ? 'border-red-500' : 'border-gray-300 focus:border-blue-400'}`}
          />
          {errors.birthDate && <span className="text-red-500 text-xs mt-1">{errors.birthDate}</span>}
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium"><span className="text-red-500">*</span> Số thẻ tín dụng</label>
          <input
            name="creditCard"
            type="text"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            maxLength={19}
            value={formData.creditCard}
            onChange={handleChange}
            className={`p-2 border rounded-md outline-none ${errors.creditCard ? 'border-red-500' : 'border-gray-300 focus:border-blue-400'}`}
          />
          {errors.creditCard && <span className="text-red-500 text-xs mt-1">{errors.creditCard}</span>}
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-8 rounded-md transition-all shadow-sm">
          Xác nhận
        </button>
      </form>
    </div>
  );
}