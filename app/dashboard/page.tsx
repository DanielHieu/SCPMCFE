"use client";

import { useSession } from "next-auth/react";
import { Home, Info } from "lucide-react";

const DashboardPage = () => {
    const { data: session } = useSession();

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8 border-b pb-4">
                    <h1 className="text-2xl font-bold">Tổng quan</h1>
                    <p className="text-muted-foreground mt-1">Thông tin tổng quát hệ thống</p>
                </header>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center mb-6 pb-4 border-b">
                        <Home className="h-6 w-6 mr-2 text-emerald-600" />
                        <h2 className="text-xl font-semibold">Chào mừng trở lại, {session?.user?.name || 'User'}</h2>
                    </div>
                    
                    <div className="text-slate-700">
                        <p className="flex items-center">
                            <Info className="h-5 w-5 mr-2 text-slate-500" />
                            Đây là trang tổng quan của hệ thống quản lý bãi đỗ xe thông minh.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
