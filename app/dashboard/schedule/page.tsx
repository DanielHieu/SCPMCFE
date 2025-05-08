"use client";

import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addDays, addMonths } from "date-fns";
import { vi } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calendar as CalendarIcon, MapPin } from "lucide-react";
import { toast } from "sonner";

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
    location?: string;
    description?: string;
    type: 'work' | 'meeting' | 'training' | 'leave';
    isAllDay?: boolean;
}

export default function SchedulePage() {
    const [events, setEvents] = useState<ScheduleEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
    const [view, setView] = useState("month");
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        fetchSchedule();
    }, []);

    const fetchSchedule = async () => {
        setLoading(true);
        try {
            // API call sẽ được thay thế bằng API thực tế
            // const response = await fetchApi("/Schedule/Staff", {
            //   method: "POST",
            //   body: JSON.stringify({
            //     staffId: session?.user?.id,
            //     startDate: format(startOfMonth(date), 'yyyy-MM-dd'),
            //     endDate: format(endOfMonth(date), 'yyyy-MM-dd')
            //   })
            // });
            // setEvents(response.data);

            // Demo data
            const demoEvents = generateDemoEvents();
            setEvents(demoEvents);

        } catch (error) {
            console.error("Error fetching schedule:", error);
            toast.error("Không thể tải lịch công tác");
        } finally {
            setLoading(false);
        }
    };

    // Tạo dữ liệu demo cho lịch
    const generateDemoEvents = (): ScheduleEvent[] => {
        const startDate = new Date();
        const demoEvents: ScheduleEvent[] = [];

        // Thêm lịch trực hàng ngày
        for (let i = 0; i < 10; i++) {
            const start = addDays(startDate, i * 2);
            start.setHours(8, 0, 0);
            const end = new Date(start);
            end.setHours(17, 0, 0);

            demoEvents.push({
                id: `work-${i}`,
                title: 'Trực quản lý bãi đỗ',
                start,
                end,
                type: 'work',
                location: 'Bãi đỗ A - Tầng B1',
                description: 'Quản lý và hỗ trợ khách hàng tại bãi đỗ xe'
            });
        }

        // Thêm các cuộc họp
        const meetingDates = [3, 7, 15, 22];
        meetingDates.forEach((day, i) => {
            const start = addDays(startDate, day);
            start.setHours(14, 0, 0);
            const end = new Date(start);
            end.setHours(15, 30, 0);

            demoEvents.push({
                id: `meeting-${i}`,
                title: `Họp nhóm ${i + 1}`,
                start,
                end,
                type: 'meeting',
                location: 'Phòng họp A',
                description: 'Họp tổng kết công việc tuần và phân công nhiệm vụ mới'
            });
        });

        // Thêm khóa đào tạo
        const trainingStart = addMonths(startDate, 0);
        trainingStart.setDate(10);
        trainingStart.setHours(9, 0, 0);
        const trainingEnd = new Date(trainingStart);
        trainingEnd.setHours(16, 0, 0);

        demoEvents.push({
            id: 'training-1',
            title: 'Đào tạo kỹ năng CSKH',
            start: trainingStart,
            end: trainingEnd,
            type: 'training',
            location: 'Phòng đào tạo',
            description: 'Khóa đào tạo kỹ năng chăm sóc khách hàng và xử lý tình huống'
        });

        // Thêm ngày nghỉ
        const leaveStart = addDays(startDate, 18);
        leaveStart.setHours(0, 0, 0);
        const leaveEnd = addDays(leaveStart, 2);
        leaveEnd.setHours(23, 59, 59);

        demoEvents.push({
            id: 'leave-1',
            title: 'Nghỉ phép',
            start: leaveStart,
            end: leaveEnd,
            type: 'leave',
            isAllDay: true,
            description: 'Nghỉ phép có lương'
        });

        return demoEvents;
    };

    // Xử lý khi click vào event
    const handleSelectEvent = (event: ScheduleEvent) => {
        setSelectedEvent(event);
    };

    // Style cho từng loại event
    const eventStyleGetter = (event: ScheduleEvent) => {
        const style = {
            borderRadius: '4px',
            opacity: 0.9,
            color: 'white',
            border: '0',
            display: 'block',
            padding: '2px 5px'
        };

        console.log(event);

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

        const getTypeLabel = (type: string) => {
            switch (type) {
                case 'work': return { label: 'Trực bãi', color: 'bg-emerald-100 text-emerald-800' };
                case 'meeting': return { label: 'Cuộc họp', color: 'bg-blue-100 text-blue-800' };
                case 'training': return { label: 'Đào tạo', color: 'bg-violet-100 text-violet-800' };
                case 'leave': return { label: 'Nghỉ phép', color: 'bg-red-100 text-red-800' };
                default: return { label: 'Khác', color: 'bg-gray-100 text-gray-800' };
            }
        };

        const type = getTypeLabel(selectedEvent.type);

        return (
            <div className="bg-white rounded-lg p-4 border border-slate-200 mb-6">
                <div className="pb-2">
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold">{selectedEvent.title}</h3>
                        <Badge className={type.color}>{type.label}</Badge>
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

                        {selectedEvent.location && (
                            <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                <span>{selectedEvent.location}</span>
                            </div>
                        )}

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

                    <div className="mt-4 flex flex-wrap gap-2">
                        <div className="flex items-center text-xs">
                            <div className="w-3 h-3 mr-1 rounded-full bg-blue-500"></div>
                            <span>Cuộc họp</span>
                        </div>
                        <div className="flex items-center text-xs">
                            <div className="w-3 h-3 mr-1 rounded-full bg-green-500"></div>
                            <span>Trực bãi</span>
                        </div>
                        <div className="flex items-center text-xs">
                            <div className="w-3 h-3 mr-1 rounded-full bg-purple-500"></div>
                            <span>Đào tạo</span>
                        </div>
                        <div className="flex items-center text-xs">
                            <div className="w-3 h-3 mr-1 rounded-full bg-red-500"></div>
                            <span>Nghỉ phép</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
