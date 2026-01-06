"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button'; // Giả định bạn có component Button

// Sửa đổi các import để khớp với cấu trúc thư mục
import Exercise1Counter from "@/components/exercise1/exercise-1-counter";
import Exercise2Input from "@/components/exercise2/exercise-2-input";
import Exercise3MemoBox from "@/components/exercise3/exercise-3-memo-box";
import Exercise4SumList from "@/components/exercise4/exercise-4-sum-list";
import Exercise5Debounce from "@/components/exercise5/exercise-5-debounce";

// Khai báo kiểu dữ liệu cho bài tập
type ExerciseKey = 'ex1' | 'ex2' | 'ex3' | 'ex4' | 'ex5';

// Danh sách các bài tập
const EXERCISES: { key: ExerciseKey, name: string, component: React.FC }[] = [
    { key: 'ex1', name: '1. Counter Hook', component: Exercise1Counter },
    { key: 'ex2', name: '2. Quản lý Input', component: Exercise2Input },
    { key: 'ex3', name: '3. Thay đổi màu Box', component: Exercise3MemoBox },
    { key: 'ex4', name: '4. Memoize Tổng', component: Exercise4SumList },
    { key: 'ex5', name: '5. Debounce Input', component: Exercise5Debounce },
];

// Component Menu điều hướng (Tạo menu ngang)
function NavMenu({ activeKey, onSelect }: { activeKey: ExerciseKey, onSelect: (key: ExerciseKey) => void }) {
    return (
        <div className="flex flex-wrap justify-center border-b border-gray-300 bg-white p-2 shadow-md mb-8">
            {EXERCISES.map((ex) => (
                <Button
                    key={ex.key}
                    onClick={() => onSelect(ex.key)}
                    // Tailwind classes cho Menu
                    className={`
                        mx-2 my-1 px-4 py-2 text-sm font-medium transition-all duration-200
                        ${activeKey === ex.key 
                            ? 'bg-blue-600 text-white shadow-lg' 
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                        }
                    `}
                >
                    {ex.name}
                </Button>
            ))}
        </div>
    );
}

export default function Home() {
    const [activeExercise, setActiveExercise] = useState<ExerciseKey>('ex1');
    
    // Tìm component đang được chọn
    const ActiveComponent = EXERCISES.find(ex => ex.key === activeExercise)?.component || (() => <div className="text-center p-10">Không tìm thấy bài tập.</div>);

    return (
        <div className="min-h-screen bg-gray-100">

            
            {/* Menu Ngang */}
            <NavMenu 
                activeKey={activeExercise} 
                onSelect={setActiveExercise} 
            />
            
            {/* Khu vực hiển thị Component Full */}
            <div className="p-4 md:p-8 max-w-5xl mx-auto">
                {/* Component đang hoạt động được render ở đây.
                    Các div bên trong component con nên sử dụng w-full để chiếm hết không gian.
                    Ở đây tôi thêm class w-full và flex justify-center để component con căn giữa và mở rộng nếu cần.
                */}
                <div className="w-full flex justify-center">
                    <ActiveComponent />
                </div>
            </div>
        </div>
    );
}