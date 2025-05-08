export interface Task {
    taskEachId: string;
    title: string;
    description: string;
    assignedToId: number;
    assigneeName: string;
    status: "Pending" | "InProgress" | "Completed";
    priority: "Low" | "Medium" | "High";
    startDate: string;
    endDate: string;
};

export enum TaskStatus {
    Pending = "Pending",
    InProgress = "InProgress",
    Completed = "Completed"
}

export enum TaskPriority {
    Low = "Low",
    Medium = "Medium",
    High = "High"
}
