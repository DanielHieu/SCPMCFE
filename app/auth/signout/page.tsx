"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Create fixed positions for the floating elements to avoid hydration errors
const floatingElements = Array.from({ length: 20 }).map((_, i) => ({
  top: (i * 5) % 100,
  left: (i * 7) % 100,
  scale: 0.5 + (i % 3) * 0.5,
  duration: 10 + (i % 10)
}));

export default function SignOut() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const performSignOut = async () => {
      try {
        await signOut({ redirect: false });
        // Redirect to home page after a short delay
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } catch (error) {
        console.error(`Error Message: ${error}`);
        setError("Đã xảy ra lỗi khi đăng xuất. Vui lòng thử lại.");
      } finally {
        setIsLoading(false);
      }
    };

    performSignOut();
  }, [router]);

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

          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6 text-center">
            <div className="mb-4">
              {isLoading ? (
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                  <svg className="animate-spin h-8 w-8 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : error ? (
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>

            <h1 className="text-2xl font-bold text-slate-800 mb-2">
              {isLoading ? "Đang đăng xuất..." : error ? "Lỗi đăng xuất" : "Đăng xuất thành công"}
            </h1>
            
            <p className="text-slate-500 mb-6">
              {isLoading 
                ? "Vui lòng đợi trong giây lát..."
                : error 
                  ? error
                  : "Bạn đã đăng xuất khỏi tài khoản. Đang chuyển hướng về trang chủ..."}
            </p>

            {!isLoading && (
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:bg-emerald-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Về trang chủ
              </Link>
            )}
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