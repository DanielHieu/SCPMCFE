"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Loader2,
    CheckCircle,
    Clock,
    AlertCircle,
    PlayCircle
} from "lucide-react";
import { toast } from "sonner";
import { fetchApi } from "@/lib/api/api-helper";
import { Task, TaskStatus } from "@/types/taskEach";
import { useSession } from "next-auth/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TasksPage() {
    const { data: session } = useSession();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [processingTask, setProcessingTask] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("all");
    const [activePriorityTab, setActivePriorityTab] = useState("all");

    const fetchTasks = async () => {
        try {
            setLoading(true);

            const response = await fetchApi(`/staff/${session?.user?.id}/tasks`);

            setTasks(response);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            toast.error("Không thể tải danh sách công việc");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (session?.user?.id) {
            fetchTasks();
        }
    }, [session?.user?.id]);

    const updateTaskStatus = async (taskId: string, newStatus: TaskStatus, successMessage: string) => {
        try {
            setProcessingTask(taskId);

            await fetchApi(`/TaskEach/${taskId}/${newStatus}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            toast.success(successMessage);

            // Update the local tasks list
            setTasks(tasks.map(task =>
                task.taskEachId === taskId
                    ? { ...task, status: newStatus }
                    : task
            ));
        } catch (error) {
            console.error(`Error updating task to ${newStatus}:`, error);
            toast.error(`Không thể cập nhật trạng thái công việc sang ${newStatus}`);
        } finally {
            setProcessingTask(null);
        }
    };

    const startTask = async (taskId: string) => {
        updateTaskStatus(taskId, TaskStatus.InProgress, "Đã bắt đầu công việc");
    };

    const completeTask = async (taskId: string) => {
        updateTaskStatus(taskId, TaskStatus.Completed, "Đã hoàn thành công việc");
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

    // Filter tasks based on search, priority and tab
    const filteredTasks = tasks.filter(task => {
        // Priority filter
        const matchesPriority = activePriorityTab !== "all" ? task.priority === activePriorityTab : true;

        // Status tab filter
        let matchesTab = true;
        if (activeTab === "pending") {
            matchesTab = task.status === TaskStatus.Pending;
        } else if (activeTab === "inProgress") {
            matchesTab = task.status === TaskStatus.InProgress;
        } else if (activeTab === "completed") {
            matchesTab = task.status === TaskStatus.Completed;
        }

        return matchesPriority && matchesTab;
    });

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
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 border-b pb-4">
                    <h1 className="text-2xl font-bold">Danh sách công việc</h1>
                    <p className="text-muted-foreground mt-1">Quản lý và theo dõi các công việc được giao</p>
                </header>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b">
                        <div className="flex items-center">
                            <CheckCircle className="h-6 w-6 mr-2 text-emerald-600" />
                            <h2 className="text-xl font-semibold">Công việc của bạn</h2>
                        </div>
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
                        <div className="space-y-4">
                            {/* Status Tabs */}
                            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <div className="border-b">
                                    <TabsList className="mb-0 bg-transparent p-0 h-auto">
                                        <TabsTrigger
                                            value="all"
                                            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-2"
                                        >
                                            Tất cả
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="pending"
                                            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-2"
                                        >
                                            Chờ xử lý
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="inProgress"
                                            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-2"
                                        >
                                            Đang thực hiện
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="completed"
                                            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-2"
                                        >
                                            Hoàn thành
                                        </TabsTrigger>
                                    </TabsList>
                                </div>
                            </Tabs>

                            {/* Priority Tabs */}
                            <Tabs defaultValue="all" value={activePriorityTab} onValueChange={setActivePriorityTab} className="w-full">
                                <div className="border-b mb-4">
                                    <TabsList className="mb-0 bg-transparent p-0 h-auto">
                                        <TabsTrigger
                                            value="all"
                                            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-2"
                                        >
                                            Tất cả mức độ
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="High"
                                            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-red-500 text-red-700 rounded-none px-6 py-2"
                                        >
                                            Cao
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="Medium"
                                            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-amber-500 text-amber-700 rounded-none px-6 py-2"
                                        >
                                            Trung bình
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="Low"
                                            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 text-blue-700 rounded-none px-6 py-2"
                                        >
                                            Thấp
                                        </TabsTrigger>
                                    </TabsList>
                                </div>
                            </Tabs>

                            {/* Table Content */}
                            <TaskTable
                                tasks={filteredTasks}
                                processingTask={processingTask}
                                startTask={startTask}
                                completeTask={completeTask}
                                getStatusBadge={getStatusBadge}
                                getPriorityBadge={getPriorityBadge}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

interface TaskTableProps {
    tasks: Task[];
    processingTask: string | null;
    startTask: (taskId: string) => Promise<void>;
    completeTask: (taskId: string) => Promise<void>;
    getStatusBadge: (status: string) => React.ReactNode;
    getPriorityBadge: (priority: string) => React.ReactNode | null;
}

function TaskTable({
    tasks,
    processingTask,
    startTask,
    completeTask,
    getStatusBadge,
    getPriorityBadge
}: TaskTableProps) {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[30%]">Tiêu đề</TableHead>
                        <TableHead className="w-[15%]">Trạng thái</TableHead>
                        <TableHead className="w-[10%]">Ưu tiên</TableHead>
                        <TableHead className="w-[15%]">Ngày bắt đầu</TableHead>
                        <TableHead className="w-[15%]">Hạn hoàn thành</TableHead>
                        <TableHead className="w-[15%]">Thao tác</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                                Không tìm thấy công việc nào
                            </TableCell>
                        </TableRow>
                    ) : (
                        tasks.map((task) => (
                            <TableRow
                                key={task.taskEachId}
                                className={task.status === TaskStatus.Completed ? "bg-muted/20" : ""}
                            >
                                <TableCell>
                                    <div>
                                        <div className="font-medium">{task.title}</div>
                                        <div className="text-sm text-muted-foreground line-clamp-2">{task.description}</div>
                                    </div>
                                </TableCell>
                                <TableCell>{getStatusBadge(task.status)}</TableCell>
                                <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                                <TableCell>{task.startDate}</TableCell>
                                <TableCell>
                                    <span className={task.isOverdue ? "text-red-500 font-medium" : ""}>
                                        {task.endDate}
                                        {task.isOverdue && (
                                            <div className="text-xs text-red-500 font-normal">(Quá hạn)</div>
                                        )}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        {task.status === TaskStatus.Pending && (
                                            <Button
                                                size="sm"
                                                onClick={() => startTask(task.taskEachId)}
                                                disabled={processingTask === task.taskEachId}
                                                className="h-8"
                                            >
                                                {processingTask === task.taskEachId ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <>
                                                        <PlayCircle className="mr-1 h-4 w-4" />
                                                        Bắt đầu
                                                    </>
                                                )}
                                            </Button>
                                        )}
                                        {task.status !== TaskStatus.Completed && (
                                            <Button
                                                size="sm"
                                                variant={task.status === TaskStatus.Pending ? "outline" : "default"}
                                                onClick={() => completeTask(task.taskEachId)}
                                                disabled={processingTask === task.taskEachId}
                                                className="h-8"
                                            >
                                                {processingTask === task.taskEachId ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <>
                                                        <CheckCircle className="mr-1 h-4 w-4" />
                                                        Hoàn thành
                                                    </>
                                                )}
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
