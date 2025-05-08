"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, Clock, Calendar, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { fetchApi } from "@/lib/api/api-helper";
import { Task, TaskStatus } from "@/types/taskEach";
import { useSession } from "next-auth/react";

export default function TasksPage() {
    const { data: session } = useSession();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [completingTask, setCompletingTask] = useState<string | null>(null);

    const fetchTasks = async () => {
        try {
            setLoading(true);

            const response = await fetchApi(`/staff/${session?.user?.id}/tasks`);

            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            toast.error("Không thể tải danh sách công việc");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const completeTask = async (taskId: string) => {
        try {
            setCompletingTask(taskId);

            await fetchApi(`/TaskEach/Complete/${taskId}`);

            // Update the local tasks list
            setTasks(tasks.map(task =>
                task.taskEachId === taskId
                    ? { ...task, status: TaskStatus.Completed }
                    : task
            ));

            toast.success("Đã hoàn thành công việc");
        } catch (error) {
            console.error("Error completing task:", error);
            toast.error("Không thể báo cáo hoàn thành công việc");
        } finally {
            setCompletingTask(null);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Completed':
                return <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"><CheckCircle className="mr-1 h-3 w-3" /> Hoàn thành</Badge>;
            case 'InProgress':
                return <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"><Clock className="mr-1 h-3 w-3" /> Đang thực hiện</Badge>;
            case 'Pending':
                return <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"><AlertCircle className="mr-1 h-3 w-3" /> Chờ xử lý</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const getPriorityBadge = (priority: string) => {
        switch (priority) {
            case 'High':
                return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">Cao</Badge>;
            case 'Medium':
                return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">Trung bình</Badge>;
            case 'Low':
                return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">Thấp</Badge>;
            default:
                return null;
        }
    };

    const isTaskOverdue = (dueDate: string) => {
        return new Date(dueDate) < new Date() && status !== TaskStatus.Completed;
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] p-8">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground">Đang tải danh sách công việc...</h3>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8 border-b pb-4">
                    <h1 className="text-2xl font-bold">Danh sách công việc</h1>
                    <p className="text-muted-foreground mt-1">Quản lý và theo dõi các công việc được giao</p>
                </header>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center mb-6 pb-4 border-b">
                        <CheckCircle className="h-6 w-6 mr-2 text-emerald-600" />
                        <h2 className="text-xl font-semibold">Công việc của bạn</h2>
                    </div>

                    {tasks?.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg bg-muted/20">
                            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
                                <CheckCircle className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Không có công việc nào</h3>
                            <p className="text-muted-foreground text-center max-w-md">
                                Hiện tại bạn chưa được giao công việc nào. Các công việc được giao sẽ xuất hiện ở đây.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {tasks?.map((task) => (
                                <div
                                    key={task.taskEachId}
                                    className={`border rounded-lg p-4 transition-all hover:shadow-md ${
                                        task.status === TaskStatus.Completed
                                            ? "bg-muted/40"
                                            : isTaskOverdue(task.endDate)
                                                ? "border-red-200"
                                                : "border-slate-200"
                                    }`}
                                >
                                    <div className="pb-2 flex flex-row items-start justify-between space-y-0">
                                        <div>
                                            <h3 className="text-lg font-semibold mb-1">{task.title}</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {getStatusBadge(task.status)}
                                                {getPriorityBadge(task.priority)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="py-3">
                                        <p className="text-sm text-muted-foreground mb-4">
                                            {task.description}
                                        </p>

                                        <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground">
                                            <div className="flex items-center">
                                                <Calendar className="h-3.5 w-3.5 mr-2 text-emerald-500" />
                                                <span>Bắt đầu: {formatDate(task.startDate)}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Calendar className="h-3.5 w-3.5 mr-2 text-amber-500" />
                                                <span className={isTaskOverdue(task.endDate) ? "text-red-500 font-medium" : ""}>
                                                    Hạn: {formatDate(task.endDate)}
                                                    {isTaskOverdue(task.endDate) && " (Quá hạn)"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-3 border-t">
                                        {task.status !== TaskStatus.Completed && (
                                            <Button
                                                className="w-full"
                                                onClick={() => completeTask(task.taskEachId)}
                                                disabled={completingTask === task.taskEachId}
                                            >
                                                {completingTask === task.taskEachId ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Đang xử lý
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle className="mr-2 h-4 w-4" />
                                                        Hoàn thành
                                                    </>
                                                )}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
