//pod和容器结构定义
export interface PodData{
    podname: string;
    namespace:string;
    podUID: string;//唯一的标识符（UID）
    nodestatus: string;//Pod 的当前状态，如 Pending、Running、Succeeded、Failed、Unknown 等。
    conditions: string;//Pod 当前条件的详细信息，包括 PodScheduled、Ready、Initialized 等。
    containers: string[];//定义 Pod 中运行的容器列表
    description?: string;
}
export interface containers{
    image: string;
    ports: number;
    Resources:string;//资源请求和限制，包括 CPU 和内存。
}
const podDataExample: PodData[] = [
    {
        podname: "frontend-app",
        namespace: "default",
        podUID: "pod-uid-001",
        nodestatus: "Running",
        conditions: "PodScheduled, Ready, Initialized",
        containers: ["nginx-container", "app-container"],
        description: "Frontend application for user interaction"
    },
    {
        podname: "backend-service",
        namespace: "backend",
        podUID: "pod-uid-002",
        nodestatus: "Pending",
        conditions: "PodScheduled",
        containers: ["api-container", "db-container"],
        description: "Backend API and database service"
    },
    {
        podname: "database-pod",
        namespace: "database",
        podUID: "pod-uid-003",
        nodestatus: "Failed",
        conditions: "Initialized",
        containers: ["postgres-container"],
        description: "Database service handling user data"
    },
    {
        podname: "cache-server",
        namespace: "caching",
        podUID: "pod-uid-004",
        nodestatus: "Succeeded",
        conditions: "PodScheduled, Ready",
        containers: ["redis-container"],
        description: "In-memory cache server for quick data access"
    }
];

const containersExample: containers[] = [
    {
        image: "nginx:latest",
        ports: 80,
        Resources: "CPU: 500m, Memory: 128Mi"
    },
    {
        image: "myapp/backend:v1",
        ports: 8080,
        Resources: "CPU: 1, Memory: 512Mi"
    },
    {
        image: "postgres:13",
        ports: 5432,
        Resources: "CPU: 500m, Memory: 1Gi"
    },
    {
        image: "redis:6",
        ports: 6379,
        Resources: "CPU: 100m, Memory: 64Mi"
    }
];
