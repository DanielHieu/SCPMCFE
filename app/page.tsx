"use client"

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TawkToChat from '@/components/TawkToChat';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100">
          <div className="absolute right-0 top-0 h-full w-1/2 bg-emerald-50 clip-diagonal z-0 hidden lg:block"></div>
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                  Giải pháp đỗ xe thông minh #1 Việt Nam
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-6">
                  Đỗ xe thông minh,<br />
                  <span className="relative text-emerald-600 inline-block">
                    tiết kiệm thời gian
                    <span className="absolute bottom-1 left-0 w-full h-3 bg-emerald-200 opacity-30 -z-10 rounded"></span>
                  </span>
                </h1>
                <p className="text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
                  Tìm và đặt chỗ đỗ xe một cách dễ dàng, thanh toán nhanh chóng và theo dõi thời gian thực.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="#download"
                    className="group px-7 py-4 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span className="flex items-center justify-center">
                      <span>Tải ứng dụng ngay</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Link>
                  <Link
                    href="#features"
                    className="px-7 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-colors"
                  >
                    Tìm hiểu thêm
                  </Link>
                </div>

                <div className="mt-10 flex items-center justify-center lg:justify-start space-x-5">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-sm font-medium border-2 border-white shadow-md">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <div className="text-slate-600 flex items-center">
                    <span className="flex text-emerald-500 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </span>
                    <span className="font-semibold text-slate-800">4.8/5</span> từ 2,000+ đánh giá
                  </div>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-300 rounded-full opacity-30 blur-2xl"></div>
                <div className="absolute -left-5 -bottom-5 w-24 h-24 bg-teal-300 rounded-full opacity-20 blur-xl"></div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-yellow-300 rounded-full opacity-20 blur-lg"></div>

                <div className="relative bg-white p-4 rounded-3xl shadow-2xl transform rotate-1">
                  <div className="aspect-[9/16] bg-emerald-100 rounded-2xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 rounded-2xl"></div>
                    <Image
                      src="/images/entrance.jpg"
                      alt="Parking entrance"
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-2xl"
                      priority
                    />
                    <div className="absolute bottom-4 left-4 right-4 z-20 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-800">Smart Parking</h3>
                          <p className="text-xs text-emerald-600">Vị trí được xác nhận</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
              {[
                { number: '50+', text: 'Bãi đỗ xe đối tác', icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636' },
                { number: '20k+', text: 'Người dùng tích cực', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
                { number: '100k+', text: 'Lượt đặt chỗ mỗi tháng', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
                { number: '98%', text: 'Khách hàng hài lòng', icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md p-5 text-center hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-emerald-50 to-emerald-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                    </svg>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-emerald-600 mb-1">{stat.number}</div>
                  <div className="text-sm md:text-base text-slate-500">{stat.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                Tính năng nổi bật
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-5">
                Giải pháp đỗ xe <span className="text-emerald-600">toàn diện</span>
              </h2>
              <p className="text-lg text-slate-600">
                Khám phá các tính năng giúp Smart Parking trở thành ứng dụng đỗ xe thông minh hàng đầu
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Tìm kiếm thời gian thực",
                  description: "Tìm kiếm các bãi đỗ xe gần bạn với thông tin chỗ trống theo thời gian thực, tiết kiệm thời gian tìm kiếm.",
                  icon: "/icons/search.svg",
                  color: "emerald",
                  gradient: "from-emerald-500 to-emerald-600"
                },
                {
                  title: "Đặt chỗ trước",
                  description: "Đặt chỗ đỗ xe trước khi đến nơi, đảm bảo luôn có chỗ và tránh mất thời gian tìm kiếm.",
                  icon: "/icons/calendar.svg",
                  color: "teal",
                  gradient: "from-teal-500 to-teal-600"
                },
                {
                  title: "Thanh toán dễ dàng",
                  description: "Thanh toán trực tuyến nhanh chóng qua ứng dụng, hỗ trợ nhiều phương thức thanh toán an toàn.",
                  icon: "/icons/payment.svg",
                  color: "cyan",
                  gradient: "from-cyan-500 to-cyan-600"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="relative bg-white border border-slate-200 p-8 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-bl-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        width={32}
                        height={32}
                        className="brightness-[10]"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>

                    <Link href="#" className="inline-flex items-center mt-5 text-emerald-600 font-medium hover:text-emerald-700 group-hover:underline">
                      <span>Tìm hiểu thêm</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 md:p-12 lg:p-16 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full -mr-32 -mt-32 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-100 rounded-full -ml-32 -mb-32 opacity-50"></div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative">
                <div>
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                    Tính năng đặc biệt
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-5">Bản đồ thông minh</h3>
                  <p className="text-slate-600 mb-6">
                    Tích hợp bản đồ thông minh với chỉ dẫn chi tiết, thông tin về giá cả, số lượng chỗ trống và đánh giá từ người dùng khác.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Định vị GPS chính xác",
                      "Chỉ đường tới bãi đỗ xe",
                      "Thông tin lưu lượng giao thông",
                      "Thời gian di chuyển ước tính"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <div className="shrink-0 w-5 h-5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mt-1 mr-3 shadow-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Link
                      href="#download"
                      className="inline-flex items-center px-5 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      <span>Khám phá ngay</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-xl p-4 relative transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <div className="aspect-video bg-emerald-100 rounded-lg overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 rounded-lg"></div>
                    <Image
                      src="/images/exit.png"
                      alt="Bản đồ thông minh"
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-lg"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 z-20 shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="download" className="py-20 md:py-28 bg-gradient-to-br from-emerald-600 to-teal-700 text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-64 bg-white/10 -rotate-12 transform -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-full h-64 bg-white/10 -rotate-12 transform translate-y-1/2"></div>
          </div>

          <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-300 mr-2"></span>
              Tải ứng dụng ngay
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Sẵn sàng trải nghiệm<br />
              <span className="relative inline-block">
                Smart Parking?
                <span className="absolute bottom-1 left-0 w-full h-3 bg-emerald-300/30 -z-10 rounded"></span>
              </span>
            </h2>
            <p className="text-lg md:text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
              Tải ứng dụng Smart Parking ngay hôm nay và quên đi nỗi lo tìm chỗ đỗ xe
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
              <a href="#" className="group flex items-center bg-black rounded-xl px-7 py-4 hover:bg-gray-900 transition transform hover:-translate-y-1 hover:shadow-xl duration-300">
                <Image
                  src="/icons/apple.svg"
                  alt="App Store"
                  width={28}
                  height={28}
                  className="mr-3 group-hover:scale-110 transition-transform duration-300"
                />
                <div className="text-left">
                  <div className="text-xs">Tải về trên</div>
                  <div className="text-lg font-semibold">App Store</div>
                </div>
              </a>
              <a href="#" className="group flex items-center bg-black rounded-xl px-7 py-4 hover:bg-gray-900 transition transform hover:-translate-y-1 hover:shadow-xl duration-300">
                <Image
                  src="/icons/google-play.svg"
                  alt="Google Play"
                  width={28}
                  height={28}
                  className="mr-3 group-hover:scale-110 transition-transform duration-300"
                />
                <div className="text-left">
                  <div className="text-xs">Tải về trên</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
              </a>
            </div>

            <div className="relative max-w-md mx-auto">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl">
                <div className="aspect-[3/1.5] bg-emerald-800/30 rounded-xl flex items-center justify-center overflow-hidden">
                  <div className="grid grid-cols-5 gap-4 p-4 w-full">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="aspect-square bg-white/10 rounded-md flex items-center justify-center overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-300 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-12 h-1.5 bg-white/30 rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full -mr-32 -mt-32 opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-100 rounded-full -ml-32 -mb-32 opacity-30"></div>

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                Đánh giá từ người dùng
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-5">
                Khách hàng nói gì về <span className="text-emerald-600">chúng tôi</span>
              </h2>
              <p className="text-lg text-slate-600">
                Hàng nghìn người dùng đã tiết kiệm thời gian và giảm stress khi tìm chỗ đỗ xe với Smart Parking
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Nguyễn Văn A",
                  role: "Doanh nhân",
                  comment: "Ứng dụng Smart Parking giúp tôi tiết kiệm rất nhiều thời gian. Tôi có thể dễ dàng tìm và đặt chỗ đỗ xe trước khi đến nơi. Giao diện rất trực quan và dễ sử dụng."
                },
                {
                  name: "Trần Thị B",
                  role: "Nhân viên văn phòng",
                  comment: "Từ ngày sử dụng Smart Parking, tôi không còn lo lắng về việc tìm chỗ đỗ xe nữa. Ứng dụng giúp tôi tiết kiệm ít nhất 15 phút mỗi ngày, và tôi luôn biết mình sẽ đỗ xe ở đâu."
                },
                {
                  name: "Lê Văn C",
                  role: "Kỹ sư IT",
                  comment: "Tính năng thanh toán trực tuyến rất tiện lợi. Tôi không cần mang tiền mặt và xếp hàng chờ đợi. Đặc biệt ấn tượng với tính năng nhắc nhở thời gian hết hạn đỗ xe."
                }
              ].map((testimonial, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-bl-full -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xl font-semibold mr-4 shadow-md">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">{testimonial.name}</h4>
                      <p className="text-emerald-600 text-sm">{testimonial.role}</p>
                      <div className="flex text-amber-400 mt-1">
                        {[...Array(5)].map((_, j) => (
                          <svg key={j} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-4 relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-100 absolute -top-3 -left-2 -z-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    {testimonial.comment}
                  </p>
                  <div className="text-sm text-slate-500 flex items-center justify-between">
                    <span>Đánh giá vào {new Date().toLocaleDateString()}</span>
                    <span className="text-emerald-600">Người dùng xác thực</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link href="#" className="inline-flex items-center px-6 py-3 border-2 border-emerald-600 text-emerald-600 font-medium rounded-xl hover:bg-emerald-50 transition-colors">
                <span>Xem thêm đánh giá</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Chat Widget */}
      <TawkToChat />

      <Footer />

      <style jsx global>{`
        .clip-diagonal {
          clip-path: polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%);
        }
      `}</style>
    </>
  );
}
