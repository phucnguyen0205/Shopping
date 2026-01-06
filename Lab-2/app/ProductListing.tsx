import React, { useState } from 'react';
import { Menu, Grid } from 'lucide-react';

// ----------------------------------------------------
// ĐỊNH NGHĨA TYPES VÀ DỮ LIỆU (Giữ nguyên)
// ----------------------------------------------------
interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string; 
}

const dummyProducts: Product[] = [
  { id: 1, name: 'Bradley Burgess 2', price: '$20.00', imageUrl: 'elephant' },
  { id: 2, name: 'Allie Sharp', price: '$30.00', imageUrl: 'bird-black' },
  { id: 3, name: 'Nathaniel Baldwin', price: '$40.00', imageUrl: 'horse' },
  { id: 4, name: 'Ellie Rios', price: '$40.00', imageUrl: 'owls' },
  { id: 5, name: 'Small Bird', price: '$25.00', imageUrl: 'bird-wood' },
  { id: 6, name: 'Vase Wood', price: '$50.00', imageUrl: 'vase' },
  { id: 7, name: 'Black Pot', price: '$35.00', imageUrl: 'pot' },
  { id: 8, name: 'Green Bowl', price: '$45.00', imageUrl: 'bowl' },
];

// ----------------------
// Các Sub-Component (Giữ nguyên)
// ----------------------

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="flex flex-col items-start space-y-2">
    <div className="w-full aspect-square bg-gray-200 flex items-center justify-center rounded-lg">
      <span className="text-gray-500 text-sm capitalize">{product.imageUrl}</span>
    </div>
    <p className="text-sm font-medium text-gray-800 pt-2">{product.name}</p>
    <p className="text-base font-bold text-gray-900">{product.price}</p>
  </div>
);

const FilterSidebar: React.FC = () => {
  const [price, setPrice] = useState(100);

  const categoryItems = ['Kids', 'Mens', 'Womens'];
  const colorItems = ['Black', 'Blue', 'Gray', 'Green', 'Red'];
  const brandItems = ['Adidas', 'Balenciaga', 'Balmain', 'Burberry', 'Chloe'];

  const renderCheckbox = (label: string) => (
    <div key={label} className="flex items-center text-sm text-gray-700 mb-2">
      <input
        type="checkbox"
        id={`filter-${label}`}
        className="h-4 w-4 text-red-600 border-gray-300 rounded-sm focus:ring-red-500 mr-2"
      />
      <label htmlFor={`filter-${label}`}>{label}</label>
    </div>
  );

  return (
    <div className="w-full space-y-8">
      {/* Category Section */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-gray-900">Category</h3>
        {categoryItems.map((cat) => (
          <p key={cat} className="text-sm text-gray-700 hover:text-red-600 cursor-pointer transition-colors">
            {cat}
          </p>
        ))}
      </div>

      {/* Filter Section (Price Range) */}
      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-bold text-gray-900">Filter</h3>
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">{price}$</p>
          {/* Range Slider - Tái tạo giao diện mẫu */}
          <input
            type="range"
            min="0"
            max="200"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            // Custom styling for the range input thumb to match the red color
            className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer range-lg 
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 
                       [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full 
                       [&::-webkit-slider-thumb]:bg-red-600 [&::-moz-range-thumb]:bg-red-600"
            style={{ '--tw-range-thumb-color': '#dc2626' } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Color Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900">Color</h3>
        {colorItems.map(renderCheckbox)}
      </div>

      {/* Brand/Color Section (Giữ tên như ảnh mẫu) */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900">Color</h3>
        {brandItems.map(renderCheckbox)}
      </div>
    </div>
  );
};

// ----------------------
// Component Chính
// ----------------------

const ProductListing: React.FC = () => {
  return (
    // Khung màu xám nhạt bao quanh toàn bộ component
    <div className="bg-gray-100 min-h-screen p-8 md:p-12">
      <div className="max-w-7xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg">
        {/* Header Bar */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-8">
         
          <div className="flex items-center space-x-4">

          </div>
        </div>

        {/* Main Content: Listing Grid + Sidebar */}
        <div className="md:flex">
          
          {/* 1. Product Grid (75% chiều rộng) - Đã chuyển lên trước */}
          <div className="w-full md:w-3/4 md:pr-8"> {/* Đã đổi md:pl-8 thành md:pr-8 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {dummyProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
          
          {/* 2. Filter Sidebar (25% chiều rộng) - Đã chuyển xuống sau */}
          <div className="w-full md:w-1/4 pl-0 md:pl-8 md:border-l border-gray-200 mb-8 md:mb-0"> 
            {/* Đã đổi pr-0, pr-8, border-r thành pl-0, pl-8, border-l */}
            <FilterSidebar />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductListing;