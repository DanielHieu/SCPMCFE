import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kích hoạt tài khoản | Smart Car Parking',
    description: 'Kích hoạt tài khoản khách hàng Smart Car Parking',
};

interface PageProps {
    searchParams: Promise<{
        activationCode?: string;
        code?: string;
    }>;
}

export default async function ActivatePage({ searchParams }: PageProps) {
    // Await searchParams theo yêu cầu của Next.js 15
    const params = await searchParams;

    // Lấy mã kích hoạt từ tham số URL (hỗ trợ cả 'code' và 'activationCode')
    const activationCode = params.activationCode || params.code;

    // Nếu có mã kích hoạt, chuyển hướng đến trang kích hoạt với mã trong đường dẫn
    if (activationCode) {
        redirect(`/activate/${activationCode}`);
    }

    // Nếu không có mã kích hoạt, chuyển hướng đến trang kích hoạt trống để hiển thị lỗi
    redirect('/activate/undefined');
} 