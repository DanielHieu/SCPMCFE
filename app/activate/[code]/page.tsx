import { Link } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kích hoạt tài khoản | Smart Car Parking',
  description: 'Kích hoạt tài khoản khách hàng Smart Car Parking',
};

// Định nghĩa kiểu kết quả kích hoạt
interface ActivationResult {
  success: boolean;
  message: string;
  statusCode?: number;
  error?: string;
}

async function activateAccount(activationCode: string): Promise<ActivationResult> {
  const API_BASE_URL = process.env.API_URL || "https://scpm-be-hmgperdbe4g8h2h9.southeastasia-01.azurewebsites.net/api";

  try {
    console.log(`Activating customer account with code: ${activationCode}`);

    const response = await fetch(`${API_BASE_URL}/Customer/Activate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: activationCode }),
      cache: 'no-store'
    });

    if (!response.ok) {
      console.error(`Customer activation failed with status: ${response.status}`);
      return {
        success: false,
        message: `Kích hoạt không thành công (Mã lỗi: ${response.status})`,
        statusCode: response.status
      };
    }

    const data = await response.json();
    console.log('Customer activation response:', data);

    return {
      success: data.success === true, // Đảm bảo giá trị boolean
      message: data.message || (data.success ? 'Kích hoạt tài khoản thành công' : 'Đã xảy ra lỗi khi kích hoạt tài khoản'),
      statusCode: response.status
    };
  } catch (error) {
    console.error('Error activating customer account:', error);
    return {
      success: false,
      message: 'Đã xảy ra lỗi khi kích hoạt tài khoản. Vui lòng thử lại sau.',
      error: String(error),
      statusCode: 500 // Internal server error
    };
  }
}

type PageProps = {
  params: Promise<{ code: string }>
}

// Trong Next.js 15, params được truyền vào dưới dạng Promise
export default async function ActivatePage(props: PageProps) {
  // Truy cập params theo kiểu Promise
  const resolvedParams = await props.params;
  const activationCode = resolvedParams.code;

  // Kiểm tra mã kích hoạt
  if (!activationCode || activationCode === 'undefined') {
    return renderActivationView({
      success: false,
      message: 'Không tìm thấy mã kích hoạt',
      statusCode: 400
    }, null);
  }

  // Xử lý kích hoạt tài khoản
  const result = await activateAccount(activationCode);
  return renderActivationView(result, activationCode);
}

function renderActivationView(result: ActivationResult, activationCode: string | null) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Smart Car Parking</h1>
          <p className="text-sm text-gray-500 mt-1">Hệ thống đỗ xe thông minh</p>
        </div>

        {/* Card chính */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 relative overflow-hidden">
          {/* Trang trí góc card */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-bl-3xl opacity-50"></div>

          <div className="text-center mb-6 relative">
            <h2 className="text-2xl font-bold text-gray-800">Kích hoạt tài khoản</h2>
            <p className="text-gray-500 mt-2">
              {!activationCode
                ? 'Không tìm thấy mã kích hoạt'
                : result.success
                  ? 'Tài khoản của bạn đã được kích hoạt thành công'
                  : 'Không thể kích hoạt tài khoản của bạn'}
            </p>
          </div>

          {/* Icon kết quả */}
          <div className="flex justify-center mb-6">
            <div className={`rounded-full p-4 ${!activationCode
              ? 'bg-blue-50 text-blue-500'
              : result.success
                ? 'bg-green-50 text-green-500'
                : 'bg-red-50 text-red-500'
              }`}>
              {!activationCode ? (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              ) : result.success ? (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              ) : (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              )}
            </div>
          </div>

          {/* Thông báo */}
          <div className={`mb-6 p-4 rounded-lg text-sm ${!activationCode
            ? 'bg-blue-50 text-blue-600 border border-blue-100'
            : result.success
              ? 'bg-green-50 text-green-600 border border-green-100'
              : 'bg-red-50 text-red-600 border border-red-100'
            }`}>
            <p className="flex items-center">
              <svg className="h-5 w-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                {!activationCode ? (
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                ) : result.success ? (
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                ) : (
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                )}
              </svg>
              {result.message}
            </p>
          </div>

          {/* Thêm thông tin khi kích hoạt thành công */}
          {result.success && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <h3 className="font-medium text-gray-700 mb-2">Bước tiếp theo</h3>
              <p className="text-sm text-gray-600">
                Bạn đã kích hoạt tài khoản thành công. Bây giờ bạn có thể truy cập vào trang đăng nhập của ứng dụng để sử dụng các dịch vụ của Smart Car Parking.
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              Quay về trang chủ
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p className="mb-2">
            © {new Date().getFullYear()} Smart Car Parking. Tất cả các quyền đã được bảo lưu.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Trang chủ</Link>
            <Link href="/terms" className="hover:text-emerald-600 transition-colors">Điều khoản</Link>
            <Link href="/privacy" className="hover:text-emerald-600 transition-colors">Quyền riêng tư</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
