"use client";

import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addDays, addMonths, startOfMonth, endOfMonth } from "date-fns";
import { vi } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calendar as CalendarIcon, MapPin, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { fetchApi } from "@/lib/api/api-helper";
import { useSession } from "next-auth/react";
import { Task, TaskStatus, TaskPriority } from "@/types/taskEach";

// Cấu hình date-fns cho react-big-calendar
const locales = {
    'vi': vi,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

// Kiểu dữ liệu cho sự kiện trong lịch
interface ScheduleEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    description?: string;
    priority?: "Low" | "Medium" | "High";
    status?: "Pending" | "InProgress" | "Completed";
}

export default function SchedulePage() {
    const { data: session } = useSession();
    const [events, setEvents] = useState<ScheduleEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
    const [view, setView] = useState("month");
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        fetchSchedule();
    }, [date, session?.user?.id]);

    const fetchSchedule = async () => {
        setLoading(true);
        try {
            // Gửi request tới API để lấy dữ liệu lịch
            const response = await fetchApi("/Staff/Schedule", {
              method: "POST",
              body: JSON.stringify({
                staffId: session?.user?.id,
                startDate: format(startOfMonth(date), 'yyyy-MM-dd'),
                endDate: format(endOfMonth(date), 'yyyy-MM-dd')
              })
            });

            // Chuyển đổi dữ liệu từ API response sang định dạng ScheduleEvent
            const scheduleEvents: ScheduleEvent[] = response.map((item: Task) => ({
                id: item.taskEachId,
                title: item.title,
                start: new Date(item.startDate),
                end: new Date(item.endDate),
                description: item.description,
                priority: item.priority,
                status: item.status
            }));

            setEvents(scheduleEvents);

        } catch (error) {
            console.error("Error fetching schedule:", error);
            toast.error("Không thể tải lịch công tác");
            // Sử dụng dữ liệu demo nếu API call thất bại
            const demoEvents = generateDemoEvents();
            setEvents(demoEvents);
        } finally {
            setLoading(false);
        }
    };

    // Tạo dữ liệu demo cho lịch
    const generateDemoEvents = (): ScheduleEvent[] => {
        const startDate = new Date();
        const demoEvents: ScheduleEvent[] = [];

        // Thêm các công việc với priority và status khác nhau
        for (let i = 0; i < 10; i++) {
            const start = addDays(startDate, i * 2);
            start.setHours(8, 0, 0);
            const end = new Date(start);
            end.setHours(17, 0, 0);

            // Xác định priority và status theo vị trí
            const priority = i % 3 === 0 ? "High" : i % 3 === 1 ? "Medium" : "Low";
            const status = i % 3 === 0 ? "Pending" : i % 3 === 1 ? "InProgress" : "Completed";

            demoEvents.push({
                id: `task-${i}`,
                title: `Công việc ${i + 1}`,
                start,
                end,
                description: `Mô tả chi tiết cho công việc ${i + 1}`,
                priority,
                status
            });
        }

        return demoEvents;
    };

    // Xử lý khi click vào event
    const handleSelectEvent = (event: ScheduleEvent) => {
        setSelectedEvent(event);
    };

    // Hiển thị màu sắc dựa trên priority và status
    const eventStyleGetter = (event: ScheduleEvent) => {
        let backgroundColor = '#3174ad'; // Màu mặc định
        let borderColor = 'transparent';
        let textColor = 'white';
        
        // Màu sắc dựa trên priority
        if (event.priority) {
            switch (event.priority) {
                case 'High':
                    backgroundColor = '#f87171'; // red-400
                    break;
                case 'Medium':
                    backgroundColor = '#fb923c'; // orange-400
                    break;
                case 'Low':
                    backgroundColor = '#60a5fa'; // blue-400
                    break;
            }
        }
        
        // Điều chỉnh dựa trên status
        if (event.status) {
            switch (event.status) {
                case 'Completed':
                    // Giảm độ đậm cho công việc hoàn thành
                    backgroundColor = '#d1d5db'; // gray-300
                    break;
                case 'InProgress':
                    // Thêm viền cho công việc đang thực hiện
                    borderColor = '#22c55e'; // green-500
                    borderColor = '2px solid ' + borderColor;
                    break;
                case 'Pending':
                    // Thêm độ trong suốt cho công việc chờ xử lý
                    backgroundColor = backgroundColor + 'cc'; // thêm độ trong suốt
                    break;
            }
        }

        const style = {
            backgroundColor,
            borderColor,
            borderWidth: event.status === 'InProgress' ? '2px' : '0',
            borderStyle: 'solid',
            borderRadius: '4px',
            opacity: 0.9,
            color: textColor,
            display: 'block',
            padding: '2px 5px'
        };

        return { style };
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] p-8">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground">Đang tải lịch công tác...</h3>
            </div>
        );
    }

    // Tạo các nút để chuyển đổi giữa các chế độ xem
    const getViewButtons = () => {
        const views = [
            { key: "month", label: "Tháng" },
            { key: "week", label: "Tuần" },
            { key: "day", label: "Ngày" },
            { key: "agenda", label: "Lịch trình" },
        ];

        return (
            <div className="flex space-x-2 mb-4">
                {views.map((v) => (
                    <Button
                        key={v.key}
                        variant={view === v.key ? "default" : "outline"}
                        size="sm"
                        onClick={() => setView(v.key)}
                    >
                        {v.label}
                    </Button>
                ))}
            </div>
        );
    };

    // Hiển thị chi tiết sự kiện khi được chọn
    const renderEventDetails = () => {
        if (!selectedEvent) return null;

        const getStatusBadge = (status?: string) => {
            if (!status) return null;
            
            switch (status) {
                case 'Completed':
                    return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="mr-1 h-3 w-3" /> Hoàn thành</Badge>;
                case 'InProgress':
                    return <Badge variant="secondary" className="bg-blue-100 text-blue-800"><Clock className="mr-1 h-3 w-3" /> Đang thực hiện</Badge>;
                case 'Pending':
                    return <Badge variant="secondary" className="bg-amber-100 text-amber-800"><AlertCircle className="mr-1 h-3 w-3" /> Chờ xử lý</Badge>;
                default:
                    return null;
            }
        };

        const getPriorityBadge = (priority?: string) => {
            if (!priority) return null;
            
            switch (priority) {
                case 'High':
                    return <Badge className="bg-red-100 text-red-800">Cao</Badge>;
                case 'Medium':
                    return <Badge className="bg-amber-100 text-amber-800">Trung bình</Badge>;
                case 'Low':
                    return <Badge className="bg-blue-100 text-blue-800">Thấp</Badge>;
                default:
                    return null;
            }
        };

        return (
            <div className="bg-white rounded-lg p-4 border border-slate-200 mb-6">
                <div className="pb-2">
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold">{selectedEvent.title}</h3>
                        <div className="flex gap-2">
                            {selectedEvent.status && getStatusBadge(selectedEvent.status)}
                            {selectedEvent.priority && getPriorityBadge(selectedEvent.priority)}
                        </div>
                    </div>
                </div>
                <div className="py-2">
                    <div className="space-y-4">
                        <div className="flex items-center text-sm text-gray-600">
                            <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                            <span>
                                {format(selectedEvent.start, 'dd/MM/yyyy HH:mm')} - {format(selectedEvent.end, 'HH:mm')}
                            </span>
                        </div>

                        {selectedEvent.description && (
                            <div className="text-sm text-gray-600 mt-2">
                                <p className="mb-1 font-medium">Mô tả:</p>
                                <p>{selectedEvent.description}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8 border-b pb-4">
                    <h1 className="text-2xl font-bold">Lịch làm việc</h1>
                    <p className="text-muted-foreground mt-1">Xem và quản lý lịch công tác</p>
                </header>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                    <div className="flex items-center mb-6 pb-4 border-b">
                        <CalendarIcon className="h-6 w-6 mr-2 text-emerald-600" />
                        <h2 className="text-xl font-semibold">Lịch của bạn</h2>
                    </div>

                    {/* Hiển thị chi tiết sự kiện khi có sự kiện được chọn */}
                    {selectedEvent && renderEventDetails()}

                    {/* Các nút chuyển đổi chế độ xem */}
                    {getViewButtons()}

                    {/* Lịch */}
                    <div className="mt-4 bg-white border rounded-lg overflow-hidden">
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 600 }}
                            view={view as View}
                            onView={(newView: View) => setView(newView)}
                            date={date}
                            onNavigate={(newDate: Date) => setDate(newDate)}
                            onSelectEvent={handleSelectEvent}
                            eventPropGetter={eventStyleGetter}
                            messages={{
                                next: "Tiếp",
                                previous: "Trước",
                                today: "Hôm nay",
                                month: "Tháng",
                                week: "Tuần",
                                day: "Ngày",
                                agenda: "Lịch trình",
                                date: "Ngày",
                                time: "Giờ",
                                event: "Sự kiện",
                                noEventsInRange: "Không có sự kiện trong khoảng thời gian này",
                            }}
                        />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                        <div className="text-xs font-medium text-slate-700 mb-1 w-full">Mức độ ưu tiên:</div>
                        <div className="flex items-center text-xs">
                            <div className="w-3 h-3 mr-1 rounded-full bg-red-400"></div>
                            <span>Cao</span>
                        </div>
                        <div className="flex items-center text-xs">
                            <div className="w-3 h-3 mr-1 rounded-full bg-orange-400"></div>
                            <span>Trung bình</span>
                        </div>
                        <div className="flex items-center text-xs">
                            <div className="w-3 h-3 mr-1 rounded-full bg-blue-400"></div>
                            <span>Thấp</span>
                        </div>
                        
                        <div className="text-xs font-medium text-slate-700 mb-1 mt-2 w-full">Trạng thái:</div>
                        <div className="flex items-center text-xs">
                            <div className="w-3 h-3 mr-1 rounded-full bg-gray-300"></div>
                            <span>Đã hoàn thành</span>
                        </div>
                        <div className="flex items-center text-xs">
                            <div className="w-3 h-3 mr-1 border-2 border-green-500 bg-white rounded-full"></div>
                            <span>Đang thực hiện</span>
                        </div>
                        <div className="flex items-center text-xs">
                            <div className="w-3 h-3 mr-1 rounded-full bg-amber-300 opacity-75"></div>
                            <span>Chờ xử lý</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
