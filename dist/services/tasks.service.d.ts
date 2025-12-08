export declare class TaskService {
    static getTasks(): Promise<{
        tasks: {
            id: number;
            name: string;
            description: string;
            price: number;
            createdAt: string;
            updatedAt: string;
        }[];
    }>;
}
//# sourceMappingURL=tasks.service.d.ts.map