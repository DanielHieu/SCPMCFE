"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

// Create fixed positions for the floating elements to avoid hydration errors
const floatingElements = Array.from({ length: 20 }).map((_, i) => ({
  top: (i * 5) % 100,
  left: (i * 7) % 100,
  scale: 0.5 + (i % 3) * 0.5,
  duration: 10 + (i % 10)
}));

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const errorType = searchParams.get("error");

  useEffect(() => {
    // Handle errors from URL parameters
    if (errorType) {
      switch (errorType) {
        case "CredentialsSignin":
          setError("Tài khoản hoặc mật khẩu không chính xác");
          break;
        default:
          setError("Đã xảy ra lỗi khi đăng nhập");
          break;
      }
    }
  }, [errorType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log("Submitting login form with:", { username, callbackUrl });
      
      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      console.log("Sign in result:", result);

      if (result?.error) {
        setError("Tài khoản hoặc mật khẩu không chính xác");
        setIsLoading(false);
      } else {
        toast?.success("Đăng nhập thành công!");
        router.push(callbackUrl);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!email || !email.includes('@')) {
      setError("Vui lòng nhập email hợp lệ");
      setIsLoading(false);
      return;
    }

    try {
      // In a real application, you would make an API call to send a password reset email
      // For now, we'll simulate a successful request with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess("Hướng dẫn đặt lại mật khẩu đã được gửi vào email của bạn");
      setEmail("");
    } catch (error) {
      console.error(`Error Message: ${error}`);
      setError("Đã xảy ra lỗi khi gửi email đặt lại mật khẩu");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword);
    setError("");
    setSuccess("");
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-emerald-600 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 right-0 w-full h-full bg-white opacity-20 transform rotate-45 translate-x-1/2 -translate-y-1/4 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-white opacity-20 transform -rotate-45 -translate-x-1/2 translate-y-1/4 rounded-full"></div>
        <div className="grid grid-cols-10 grid-rows-10 gap-4 h-full w-full absolute">
          {floatingElements.map((el, i) => (
            <div key={i} className="w-8 h-8 bg-white rounded-full opacity-10 absolute" style={{
              top: `${el.top}%`,
              left: `${el.left}%`,
              transform: `scale(${el.scale})`,
              animation: `float ${el.duration}s ease-in-out infinite alternate`
            }}></div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 z-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-emerald-600 font-bold mr-2 shadow-xl">
                  SP
                </div>
                <span className="text-3xl font-bold text-white drop-shadow-md">SmartParking</span>
              </div>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">  
            <div className="relative">
              <h1 className="text-2xl font-bold text-slate-800 mb-2 text-center">
                {isForgotPassword ? "Quên mật khẩu" : "Đăng nhập hệ thống"}
              </h1>
              <p className="text-slate-500 text-center mb-6">
                {isForgotPassword 
                  ? "Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu" 
                  : "Vui lòng đăng nhập để tiếp tục sử dụng dịch vụ"}
              </p>

              {error && (
                <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg text-sm flex items-center border border-red-100">
                  <svg className="h-5 w-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                  </svg>
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 p-4 bg-green-50 text-green-600 rounded-lg text-sm flex items-center border border-green-100">
                  <svg className="h-5 w-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  {success}
                </div>
              )}

              {isForgotPassword ? (
                <form onSubmit={handleForgotPassword} className="space-y-6">
                  <div>
                    <label
                      htmlFor="forgot-email"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <input
                        id="forgot-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
                        placeholder="your-email@example.com"
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-3">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-emerald-600 text-white font-semibold rounded-xl py-4 shadow-lg hover:bg-emerald-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center"
                    >
                      {isLoading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        "Gửi hướng dẫn đặt lại mật khẩu"
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={toggleForgotPassword}
                      className="text-center text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                    >
                      Quay lại đăng nhập
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Tên đăng nhập
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full pl-10 px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
                        placeholder="Nhập tên đăng nhập"
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Mật khẩu
                      </label>
                      <button
                        type="button"
                        onClick={toggleForgotPassword}
                        className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                      >
                        Quên mật khẩu?
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-emerald-600 text-white font-semibold rounded-xl py-4 shadow-lg hover:bg-emerald-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      "Đăng nhập"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
          100% { transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
} 