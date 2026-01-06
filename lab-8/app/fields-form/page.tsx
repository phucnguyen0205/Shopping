"use client";

import React, { useState } from 'react';

interface Education {
  id: number;
  school: string;
  degree: string;
  year: string;
}

interface EducationErrors {
  [key: number]: {
    school?: string;
    degree?: string;
    year?: string;
  };
}

export default function DynamicForm() {
  const [educations, setEducations] = useState<Education[]>([
    { id: Date.now(), school: 'VTC Academy', degree: 'Cử Nhân', year: '2018' }
  ]);
  const [errors, setErrors] = useState<EducationErrors>({});

  const handleInputChange = (id: number, field: keyof Education, value: string) => {
    setEducations(educations.map(edu => (edu.id === id ? { ...edu, [field]: value } : edu)));
    // Xóa lỗi khi người dùng nhập
    if (errors[id]?.[field as keyof EducationErrors[number]]) {
      setErrors({
        ...errors,
        [id]: { ...errors[id], [field]: undefined }
      });
    }
  };

  const addEducation = () => {
    setEducations([...educations, { id: Date.now(), school: '', degree: '', year: '' }]);
  };

  const removeEducation = (id: number) => {
    if (educations.length > 1) {
      setEducations(educations.filter(edu => edu.id !== id));
    }
  };

  const validate = () => {
    const newErrors: EducationErrors = {};
    educations.forEach(edu => {
      const eduErrors: any = {};
      if (!edu.school.trim()) eduErrors.school = 'Vui lòng nhập trường!';
      if (!edu.degree.trim()) eduErrors.degree = 'Vui lòng nhập bằng cấp!';
      if (!edu.year.trim()) eduErrors.year = 'Vui lòng nhập năm tốt nghiệp!';
      
      if (Object.keys(eduErrors).length > 0) {
        newErrors[edu.id] = eduErrors;
      }
    });
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      alert('Lưu thông tin thành công!');
      console.log(educations);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 font-sans">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Dynamic Form Fields</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {educations.map((edu, index) => (
          <div key={edu.id} className="relative p-6 border border-blue-100 bg-blue-50/30 rounded-xl space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-800">Học vấn #{index + 1}</h3>
              {educations.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(edu.id)}
                  className="text-red-400 hover:text-red-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Tên trường"
                  value={edu.school}
                  onChange={(e) => handleInputChange(edu.id, 'school', e.target.value)}
                  className={`w-full p-2 border rounded-md outline-none transition-all ${
                    errors[edu.id]?.school ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors[edu.id]?.school && <p className="text-red-500 text-sm mt-1">{errors[edu.id]?.school}</p>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Bằng cấp"
                  value={edu.degree}
                  onChange={(e) => handleInputChange(edu.id, 'degree', e.target.value)}
                  className={`w-full p-2 border rounded-md outline-none transition-all ${
                    errors[edu.id]?.degree ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors[edu.id]?.degree && <p className="text-red-500 text-sm mt-1">{errors[edu.id]?.degree}</p>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Năm tốt nghiệp"
                  value={edu.year}
                  onChange={(e) => handleInputChange(edu.id, 'year', e.target.value)}
                  className={`w-full p-2 border rounded-md outline-none transition-all ${
                    errors[edu.id]?.year ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors[edu.id]?.year && <p className="text-red-500 text-sm mt-1">{errors[edu.id]?.year}</p>}
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addEducation}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 hover:border-gray-400 transition-all flex justify-center items-center gap-2"
        >
          <span className="text-xl">+</span> Thêm học vấn
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-8 rounded-md transition-colors"
        >
          Lưu thông tin
        </button>
      </form>
    </div>
  );
}