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

    // Password validation
    const [passwordStrength, setPasswordStrength] = useState({
        minLength: false,
        hasNumber: false,
        hasUppercase: false,
        hasSpecialChar: false,
    });

    // Calculate overall password strength
    const strengthPercentage = Object.values(passwordStrength).filter(Boolean).length * 25;

    const getStrengthColor = () => {
        if (strengthPercentage <= 25) return "bg-red-500";
        if (strengthPercentage <= 50) return "bg-orange-500";
        if (strengthPercentage <= 75) return "bg-yellow-500";
        return "bg-green-500";
    };

    const getStrengthText = () => {
        if (strengthPercentage <= 25) return "Yếu";
        if (strengthPercentage <= 50) return "Trung bình";
        if (strengthPercentage <= 75) return "Khá";
        return "Mạnh";
    };

    const validatePassword = (password: string) => {
        setPasswordStrength({
            minLength: password.length >= 8,
            hasNumber: /\d/.test(password),
            hasUppercase: /[A-Z]/.test(password),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPass = e.target.value;
        setNewPassword(newPass);
        validatePassword(newPass);
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

        // Check password strength
        const isStrongPassword = Object.values(passwordStrength).every(Boolean);
        if (!isStrongPassword) {
            setError("Mật khẩu mới không đủ mạnh. Vui lòng tuân thủ các yêu cầu.");
            return;
        }

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
            setPasswordStrength({
                minLength: false,
                hasNumber: false,
                hasUppercase: false,
                hasSpecialChar: false,
            });

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

                                {newPassword && (
                                    <div className="mt-3 space-y-3 animate-fadeIn">
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-medium text-slate-500">Độ mạnh mật khẩu: <span className={`font-semibold ${strengthPercentage >= 75 ? 'text-green-600' : strengthPercentage >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>{getStrengthText()}</span></span>
                                                <span className="text-xs font-medium text-slate-500">{strengthPercentage}%</span>
                                            </div>
                                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${getStrengthColor()} transition-all duration-300 ease-in-out`}
                                                    style={{ width: `${strengthPercentage}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium text-slate-600 mb-2">Mật khẩu mới phải đáp ứng các điều kiện sau:</p>
                                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                                <li className={`flex items-center p-2 rounded ${passwordStrength.minLength ? 'bg-green-50 text-green-700' : 'bg-slate-50 text-slate-600'}`}>
                                                    {passwordStrength.minLength ? (
                                                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                                                    ) : (
                                                        <XCircle className="h-4 w-4 mr-2 text-slate-400" />
                                                    )}
                                                    Có ít nhất 8 ký tự
                                                </li>
                                                <li className={`flex items-center p-2 rounded ${passwordStrength.hasUppercase ? 'bg-green-50 text-green-700' : 'bg-slate-50 text-slate-600'}`}>
                                                    {passwordStrength.hasUppercase ? (
                                                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                                                    ) : (
                                                        <XCircle className="h-4 w-4 mr-2 text-slate-400" />
                                                    )}
                                                    Có ít nhất 1 chữ hoa
                                                </li>
                                                <li className={`flex items-center p-2 rounded ${passwordStrength.hasNumber ? 'bg-green-50 text-green-700' : 'bg-slate-50 text-slate-600'}`}>
                                                    {passwordStrength.hasNumber ? (
                                                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                                                    ) : (
                                                        <XCircle className="h-4 w-4 mr-2 text-slate-400" />
                                                    )}
                                                    Có ít nhất 1 chữ số
                                                </li>
                                                <li className={`flex items-center p-2 rounded ${passwordStrength.hasSpecialChar ? 'bg-green-50 text-green-700' : 'bg-slate-50 text-slate-600'}`}>
                                                    {passwordStrength.hasSpecialChar ? (
                                                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                                                    ) : (
                                                        <XCircle className="h-4 w-4 mr-2 text-slate-400" />
                                                    )}
                                                    Có ít nhất 1 ký tự đặc biệt
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
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
