import React, { useState } from 'react';
import { Lock, User, KeyRound, ArrowRight, CheckCircle, XCircle, Mail, Key } from 'lucide-react';


import ProductListing from './ProductListing'; 

interface Account {
  usernameOrEmail: string;
  password: string;
}

interface LoginData extends Account {
  rememberMe: boolean;
}

interface RegistrationData extends Account {
  confirmPassword: string;
}

interface LoginFormProps {
  onSubmit: (data: LoginData) => void;
  onSwitchToRegister: () => void;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading, onSwitchToRegister }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!usernameOrEmail || !password) {
      setError('Vui lòng nhập đầy đủ Tên đăng nhập/Email và Mật khẩu.');
      return;
    }

    if (!isLoading) {
      onSubmit({ usernameOrEmail, password, rememberMe });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-sm transform transition-all duration-300 hover:shadow-xl">
        {/* Phần Header */}
        <div className="flex items-center mb-6">
          <div className="p-3 mr-4 rounded-xl bg-white border-2 border-red-100 shadow-md">
            <Lock className="w-7 h-7 text-red-600" strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Đăng Nhập</h2>
          </div>
        </div>

        {/* Thông báo mô tả */}
        <p className="text-sm text-gray-500 mb-6">
          Sử dụng tài khoản đã đăng ký của bạn.
        </p>
        
        {/* Error message from client-side validation */}
        {error && (
            <div className="p-3 mb-4 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium border border-yellow-300">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input: Username / email address */}
          <div>
            <div className={`flex items-center border-b py-3 focus-within:border-red-600 transition-colors duration-200 ${!usernameOrEmail && error ? 'border-yellow-500' : 'border-gray-300'}`}>
              <User className="w-5 h-5 text-gray-500 mr-3" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Tên đăng nhập / Email"
                value={usernameOrEmail}
                onChange={(e) => { setUsernameOrEmail(e.target.value); setError(''); }}
                className="w-full text-lg appearance-none bg-transparent border-none focus:outline-none placeholder-gray-500"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Input: Password */}
          <div>
            <div className={`flex items-center border-b py-3 focus-within:border-red-600 transition-colors duration-200 ${!password && error ? 'border-yellow-500' : 'border-gray-300'}`}>
              <KeyRound className="w-5 h-5 text-gray-500 mr-3" strokeWidth={1.5} />
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="w-full text-lg appearance-none bg-transparent border-none focus:outline-none placeholder-gray-500"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Remember me & Forget Password */}
          <div className="flex justify-between items-center pt-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="form-checkbox h-4 w-4 text-red-600 rounded-sm border-gray-300 focus:ring-red-500"
                disabled={isLoading}
              />
              <span className="ml-2 text-sm text-gray-700">Ghi nhớ tôi</span>
            </label>
            <a href="#" className="text-sm text-gray-500 hover:text-red-600 font-medium">
              Quên mật khẩu?
            </a>
          </div>

          {/* Button: Login Now */}
          <button
            type="submit"
            className={`w-full flex justify-center items-center font-semibold py-3 px-4 rounded-lg shadow-md transition duration-200 mt-8 ${
              isLoading
                ? 'bg-red-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center text-white">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang Đăng Nhập...
              </span>
            ) : (
              <span className="flex items-center text-lg text-white">
                Đăng Nhập Ngay
                <ArrowRight className="w-5 h-5 ml-2" strokeWidth={2} />
              </span>
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-500">
            Chưa có tài khoản?{' '}
            <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-red-600 hover:text-red-700 font-semibold focus:outline-none"
            >
                Đăng Ký
            </button>
        </div>
      </div>
    </div>
  );
};

// --- REGISTER FORM COMPONENT (KHÔNG THAY ĐỔI) ---
interface RegisterFormProps {
  onSubmit: (data: RegistrationData) => void;
  onSwitchToLogin: () => void;
  isLoading: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isLoading, onSwitchToLogin }) => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!usernameOrEmail || !password || !confirmPassword) {
            setError('Vui lòng điền đầy đủ tất cả các trường.');
            return;
        }

        if (password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp.');
            return;
        }

        if (!isLoading) {
            onSubmit({ usernameOrEmail, password, confirmPassword });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-sm transform transition-all duration-300 hover:shadow-xl">
                {/* Phần Header */}
                <div className="flex items-center mb-6">
                    <div className="p-3 mr-4 rounded-xl bg-white border-2 border-green-100 shadow-md">
                        <User className="w-7 h-7 text-green-600" strokeWidth={2} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">Đăng Ký</h2>
                    </div>
                </div>

                {/* Thông báo mô tả */}
                <p className="text-sm text-gray-500 mb-6">
                    Tạo một tài khoản mới để trải nghiệm dịch vụ.
                </p>

                {/* Error message from client-side validation */}
                {error && (
                    <div className="p-3 mb-4 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium border border-yellow-300">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Input: Email */}
                    <div>
                        <div className={`flex items-center border-b py-3 focus-within:border-green-600 transition-colors duration-200 ${!usernameOrEmail && error ? 'border-yellow-500' : 'border-gray-300'}`}>
                            <Mail className="w-5 h-5 text-gray-500 mr-3" strokeWidth={1.5} />
                            <input
                                type="email"
                                placeholder="Địa chỉ Email"
                                value={usernameOrEmail}
                                onChange={(e) => { setUsernameOrEmail(e.target.value); setError(''); }}
                                className="w-full text-lg appearance-none bg-transparent border-none focus:outline-none placeholder-gray-500"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {/* Input: Password */}
                    <div>
                        <div className={`flex items-center border-b py-3 focus-within:border-green-600 transition-colors duration-200 ${(!password || password.length < 6) && error ? 'border-yellow-500' : 'border-gray-300'}`}>
                            <KeyRound className="w-5 h-5 text-gray-500 mr-3" strokeWidth={1.5} />
                            <input
                                type="password"
                                placeholder="Mật khẩu (tối thiểu 6 ký tự)"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                className="w-full text-lg appearance-none bg-transparent border-none focus:outline-none placeholder-gray-500"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {/* Input: Confirm Password */}
                    <div>
                        <div className={`flex items-center border-b py-3 focus-within:border-green-600 transition-colors duration-200 ${(!confirmPassword || password !== confirmPassword) && error ? 'border-yellow-500' : 'border-gray-300'}`}>
                            <Key className="w-5 h-5 text-gray-500 mr-3" strokeWidth={1.5} />
                            <input
                                type="password"
                                placeholder="Xác nhận Mật khẩu"
                                value={confirmPassword}
                                onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                                className="w-full text-lg appearance-none bg-transparent border-none focus:outline-none placeholder-gray-500"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {/* Button: Register Now */}
                    <button
                        type="submit"
                        className={`w-full flex justify-center items-center font-semibold py-3 px-4 rounded-lg shadow-md transition duration-200 mt-8 ${
                            isLoading
                                ? 'bg-green-400 cursor-not-allowed'
                                : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center text-white">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Đang Đăng Ký...
                            </span>
                        ) : (
                            <span className="flex items-center text-lg text-white">
                                Đăng Ký Ngay
                                <ArrowRight className="w-5 h-5 ml-2" strokeWidth={2} />
                            </span>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Đã có tài khoản?{' '}
                    <button
                        type="button"
                        onClick={onSwitchToLogin}
                        className="text-red-600 hover:text-red-700 font-semibold focus:outline-none"
                    >
                        Đăng Nhập
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- MAIN APP COMPONENT ---
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true); // State để chuyển đổi giữa Login và Register
  const [loginStatus, setLoginStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // MÔ PHỎNG: State lưu trữ tài khoản (được thiết lập ban đầu với 1 tài khoản test)
  const [accounts, setAccounts] = useState<Account[]>([
    { usernameOrEmail: 'test@example.com', password: '123456' },
  ]);

  const handleLogin = async (data: LoginData) => {
    setLoginStatus('loading');
    setErrorMessage(null);

    // Dữ liệu đăng nhập (chỉ hiển thị)
    console.log("Dữ liệu đăng nhập:", data);

    // --- MÔ PHỎNG: Dùng setTimeout để giả lập độ trễ API ---
    await new Promise(resolve => setTimeout(resolve, 1500));

    const foundAccount = accounts.find(
      acc => acc.usernameOrEmail === data.usernameOrEmail && acc.password === data.password
    );

    if (foundAccount) {
      setIsLoggedIn(true);
      setLoginStatus('success');
    } else {
      setErrorMessage('Sai tên đăng nhập/email hoặc mật khẩu. Vui lòng thử lại.');
      setLoginStatus('error');
    }
  };
  
  const handleRegister = async (data: RegistrationData) => {
    setLoginStatus('loading');
    setErrorMessage(null);

    // Dữ liệu đăng ký (chỉ hiển thị)
    console.log("Dữ liệu đăng ký:", data);
    
    // --- MÔ PHỎNG: Dùng setTimeout để giả lập độ trễ API ---
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Kiểm tra xem email đã tồn tại chưa
    const isExisting = accounts.some(acc => acc.usernameOrEmail === data.usernameOrEmail);

    if (isExisting) {
        setErrorMessage('Email này đã được đăng ký. Vui lòng đăng nhập hoặc dùng email khác.');
        setLoginStatus('error');
    } else {
        // MÔ PHỎNG: Lưu tài khoản mới vào state
        const newAccount: Account = { usernameOrEmail: data.usernameOrEmail, password: data.password };
        setAccounts(prev => [...prev, newAccount]);
        
        setErrorMessage('Đăng ký thành công! Vui lòng đăng nhập.');
        setLoginStatus('success'); // Dùng status 'success' để hiển thị thông báo thành công
        setIsLoginView(true); // Chuyển về màn hình đăng nhập
    }
  };

  // ------------------------------------------------------------------

  if (isLoggedIn) {
    return <ProductListing />; // Dòng này không thay đổi, vì ProductListing đã được import
  }

  return (
    <div className="relative">
      {/* Hiển thị thông báo lỗi/thành công (nếu có) */}
      {(loginStatus === 'error' || loginStatus === 'success') && errorMessage && (
        <div 
            className={`absolute top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md p-4 rounded-lg shadow-lg flex items-center z-50 animate-fadeIn ${
                loginStatus === 'error' ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-green-100 border border-green-400 text-green-700'
            }`}
        >
          {loginStatus === 'error' ? (
            <XCircle className="w-5 h-5 mr-3 flex-shrink-0" />
          ) : (
            <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
          )}
          
          <p className="text-sm font-medium">{errorMessage}</p>
          <button onClick={() => setErrorMessage(null)} className="ml-auto text-current opacity-70 hover:opacity-100">
            &times;
          </button>
        </div>
      )}

      {isLoginView ? (
        <LoginForm 
          onSubmit={handleLogin} 
          isLoading={loginStatus === 'loading'} 
          onSwitchToRegister={() => { 
            setIsLoginView(false); 
            setErrorMessage(null);
            setLoginStatus('idle');
          }}
        />
      ) : (
        <RegisterForm 
          onSubmit={handleRegister} 
          isLoading={loginStatus === 'loading'} 
          onSwitchToLogin={() => { 
            setIsLoginView(true); 
            setErrorMessage(null); 
            setLoginStatus('idle');
          }}
        />
      )}
    </div>
  );
}

