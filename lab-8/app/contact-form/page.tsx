"use client";

import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập họ tên!';
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email!';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ!';
    }
    if (!formData.message.trim()) newErrors.message = 'Vui lòng nhập tin nhắn!';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      alert('Gửi tin nhắn thành công!');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 font-sans">
      <h2 className="text-2xl font-bold mb-2">Simple Contact Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">
            <span className="text-red-500">*</span> Họ tên
          </label>
          <input
            name="name"
            type="text"
            placeholder="Nhập họ tên của bạn"
            value={formData.name}
            onChange={handleChange}
            className={`p-2 border rounded-md outline-none transition-all ${
              errors.name ? 'border-red-500' : 'border-gray-300 focus:border-blue-400'
            }`}
          />
          {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">
            <span className="text-red-500">*</span> Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="Nhập email của bạn"
            value={formData.email}
            onChange={handleChange}
            className={`p-2 border rounded-md outline-none transition-all ${
              errors.email ? 'border-red-500' : 'border-gray-300 focus:border-blue-400'
            }`}
          />
          {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium">
            <span className="text-red-500">*</span> Tin nhắn
          </label>
          <textarea
            name="message"
            rows={4}
            maxLength={500}
            placeholder="Nhập tin nhắn của bạn"
            value={formData.message}
            onChange={handleChange}
            className={`p-2 border rounded-md outline-none transition-all resize-none ${
              errors.message ? 'border-red-500' : 'border-gray-300 focus:border-blue-400'
            }`}
          />
          <div className="flex justify-between mt-1 items-start">
            <div className="flex-1">
              {errors.message && <span className="text-red-500 text-sm">{errors.message}</span>}
            </div>
            <span className="text-gray-400 text-sm ml-2">{formData.message.length} / 500</span>
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#4285f4] hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-colors w-fit"
        >
          Gửi tin nhắn
        </button>
      </form>
    </div>
  );
}