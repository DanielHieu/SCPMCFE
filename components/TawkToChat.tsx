'use client';

import { useEffect } from 'react';

export default function TawkToChat() {
  useEffect(() => {
    // Tích hợp Tawk.to script chính thức
    const addTawkToScript = () => {
      const s1 = document.createElement("script");
      const s0 = document.getElementsByTagName("script")[0];
      
      if (s0 && s0.parentNode) {
        s1.async = true;
        s1.src = 'https://embed.tawk.to/680a66a4361c49190a47d3f5/1ipka1sp5';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
      } else {
        // Fallback nếu không tìm thấy script tag nào
        document.head.appendChild(s1);
      }
      
      // Tùy chỉnh style cho widget Tawk.to
      setTimeout(() => {
        const tawkToStyle = document.createElement('style');
        tawkToStyle.innerHTML = `
          .tawk-min-container {
            margin: 0 !important;
            bottom: 20px !important;
            right: 20px !important;
          }
          .tawk-button {
            width: 60px !important;
            height: 60px !important;
            background-color: #10b981 !important;
            box-shadow: 0 4px 10px rgba(16, 185, 129, 0.25) !important;
            transition: transform 0.3s ease !important;
          }
          .tawk-button:hover {
            transform: scale(1.05) !important;
          }
          .tawk-button svg {
            width: 28px !important;
            height: 28px !important;
          }
          .tawk-footer {
            display: none !important;
          }
          .tawk-card {
            border-radius: 12px !important;
            overflow: hidden !important;
          }
          .tawk-card .tawk-card-primary {
            background-color: #10b981 !important;
          }
          .tawk-card .tawk-card-primary svg {
            fill: white !important;
          }
          .tawk-card .tawk-card-primary .tawk-card-title {
            color: white !important;
          }
          .tawk-card .tawk-card-secondary {
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05) !important;
          }
          .tawk-card .tawk-button-circle.tawk-button-large {
            background-color: #10b981 !important;
          }
        `;
        document.head.appendChild(tawkToStyle);
      }, 1000); // Đợi widget load xong
    };

    // Gọi hàm thêm script
    addTawkToScript();

    // Không cần cleanup vì không có vấn đề nếu script vẫn tồn tại
    return () => {};
  }, []);

  return null;
} 