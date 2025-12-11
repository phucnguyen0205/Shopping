import { Star } from "lucide-react";

const categories = [
    { name: "Biscuit Snacks", items: 4 },
    { name: "Chocolate", items: 4 },
    { name: "Shakes Biscuit", items: 4 },
];

function ProductItem({ name }: { name: string }) {
    return (
        <div className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm flex gap-4 items-center">  
            <div className="w-16 h-16 bg-gray-300 rounded-md flex-shrink-0"></div>
            <div className="flex-grow">
            <div className="flex text-red-500 text-sm mb-1">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-red-500" />
                ))}
            </div>
            <p className="text-sm font-medium text-gray-700">{name}</p>
            <p className="text-sm font-bold text-gray-900">$31.00</p>
        </div>
        </div>
    );
}

export default function ProductsPage() {
    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-white rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Trang Sản phẩm (Products Grid)</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categories.map((category) => (
                    <div key={category.name}>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-700">
                        {category.name}
                    </h2>
                    <div className="space-y-4">
                        {[...Array(category.items)].map((_, index) => (
                            <ProductItem 
                                key={index} 
                                name={`Product Item ${index + 1}`} 
                            />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}