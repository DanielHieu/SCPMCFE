"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, LockKeyhole, CheckCircle2, XCircle, Shield } from "lucide-react";
import { fetchApi } from "@/lib/api/api-helper";

export default function ChangePasswordPage() {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Form fields
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Validate passwords
        if (newPassword !== confirmPassword) {
            setError("Mật khẩu mới không khớp với mật khẩu xác nhận");
            return;
        }

        // Remove password strength check
        setIsLoading(true);

        try {
            await fetchApi("/staff/changePassword", {
                method: "POST",
                body: JSON.stringify({
                    staffId: session?.user?.id,
                    newPassword,
                    confirmPassword
                }),
            });

            setSuccess("Mật khẩu đã được thay đổi thành công!");

            toast.success("Mật khẩu đã được thay đổi thành công!");

            // Reset form
            setNewPassword("");
            setConfirmPassword("");

        } catch (error) {
            console.error("Error changing password:", error);
            setError("Đã xảy ra lỗi khi thay đổi mật khẩu. Vui lòng thử lại sau.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8 border-b pb-4">
                    <h1 className="text-2xl font-bold">Đổi mật khẩu</h1>
                    <p className="text-muted-foreground mt-1">Cập nhật mật khẩu đăng nhập của bạn</p>
                </header>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center mb-6 pb-4 border-b">
                        <Shield className="h-6 w-6 mr-2 text-emerald-600" />
                        <h2 className="text-xl font-semibold">Thay đổi mật khẩu</h2>
                    </div>
                    
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm flex items-center border border-red-100 animate-fadeIn">
                            <XCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-lg text-sm flex items-center border border-green-100 animate-fadeIn">
                            <CheckCircle2 className="h-5 w-5 mr-2 flex-shrink-0" />
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="new-password" className="block text-sm font-medium text-slate-700 mb-2">
                                    Mật khẩu mới
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <LockKeyhole className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        id="new-password"
                                        type="password"
                                        value={newPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full pl-10 px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
                                        placeholder="Nhập mật khẩu mới"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700 mb-2">
                                    Xác nhận mật khẩu mới
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <LockKeyhole className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        id="confirm-password"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className={`w-full pl-10 px-4 py-3 rounded-lg border ${confirmPassword && newPassword !== confirmPassword
                                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                            : "border-slate-300 focus:ring-emerald-500 focus:border-emerald-500"
                                            } outline-none transition-all bg-white`}
                                        placeholder="Nhập lại mật khẩu mới"
                                        required
                                    />
                                </div>
                                {confirmPassword && newPassword !== confirmPassword && (
                                    <p className="mt-1 text-xs text-red-500 flex items-center">
                                        <XCircle className="h-4 w-4 mr-1" />
                                        Mật khẩu xác nhận không khớp
                                    </p>
                                )}
                                {confirmPassword && newPassword === confirmPassword && newPassword && (
                                    <p className="mt-1 text-xs text-green-500 flex items-center">
                                        <CheckCircle2 className="h-4 w-4 mr-1" />
                                        Mật khẩu xác nhận khớp
                                    </p>
                                )}
                            </div>
                        </div>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 transition-all duration-200"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Đang xử lý...
                                </>
                            ) : (
                                "Cập nhật mật khẩu"
                            )}
                        </Button>
                    </form>
                </div>
            </div>

            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
