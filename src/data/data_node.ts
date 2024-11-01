// data.ts

// 定义表格数据的类型
export interface NodeData {
    nodename: string;
    nodeID: string;
    nodestatus: string;
    cpu: string;
    memory: string;
    gpu: string;
    io: string;
    net:string;
    conditions: string;
    pods?:string[];
    description?: string;
}

// 定义表格数据数组
export const tableData: NodeData[] = [
    { nodename: 'node1', nodeID: '001', nodestatus: 'Ready', cpu: '2', memory: '124MiB', conditions: 'Healthy', description: '这个是测试节点一！！！' ,pods:['frontend-app','backend-service']},
    { nodename: 'node2', nodeID: '002', nodestatus: 'NotReady', cpu: '4', memory: '512MiB', conditions: 'Degraded',pods:['database-pod','cache-server'] },
    { nodename: 'node3', nodeID: '003', nodestatus: 'Ready', cpu: '8', memory: '1GiB', conditions: 'Healthy' },
    { nodename: 'node4', nodeID: '004', nodestatus: 'Ready', cpu: '4', memory: '256MiB', conditions: 'Healthy' },
    { nodename: 'node5', nodeID: '005', nodestatus: 'NotReady', cpu: '16', memory: '2GiB', conditions: 'Critical' },
    { nodename: 'node6', nodeID: '006', nodestatus: 'Ready', cpu: '2', memory: '512MiB', conditions: 'Healthy' },
    { nodename: 'node7', nodeID: '007', nodestatus: 'NotReady', cpu: '8', memory: '1GiB', conditions: 'Degraded' },
    { nodename: 'node8', nodeID: '008', nodestatus: 'Ready', cpu: '16', memory: '4GiB', conditions: 'Healthy' },
];
//pod和容器结构定义
export interface PodData{
    podname: string;
    namespace:string;
    podUID: string;//唯一的标识符（UID）
    podstatus: string;//Pod 的当前状态，如 Pending、Running、Succeeded、Failed、Unknown 等。
    conditions: string;//Pod 当前条件的详细信息，包括 PodScheduled、Ready、Initialized 等。
    containers: string[];//定义 Pod 中运行的容器列表
    description?: string;
}
export interface containers{
    image: string;
    ports: number;
    Resources:string;//资源请求和限制，包括 CPU 和内存。
}
export const podDataExample: PodData[] = [
    {
        podname: "frontend-app",
        namespace: "default",
        podUID: "pod-uid-001",
        podstatus: "Running",
        conditions: "PodScheduled, Ready, Initialized",
        containers: ["nginx-container", "app-container"],
        description: "Frontend application for user interaction"
    },
    {
        podname: "backend-service",
        namespace: "backend",
        podUID: "pod-uid-002",
        podstatus: "Pending",
        conditions: "PodScheduled",
        containers: ["api-container", "db-container"],
        description: "Backend API and database service"
    },
    {
        podname: "database-pod",
        namespace: "database",
        podUID: "pod-uid-003",
        podstatus: "Failed",
        conditions: "Initialized",
        containers: ["postgres-container"],
        description: "Database service handling user data"
    },
    {
        podname: "cache-server",
        namespace: "caching",
        podUID: "pod-uid-004",
        podstatus: "Succeeded",
        conditions: "PodScheduled, Ready",
        containers: ["redis-container"],
        description: "In-memory cache server for quick data access"
    }
];

export const containersExample: containers[] = [
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
// apiVersion: v1
// kind: Pod
// metadata:
//   name: nginx-pod
// spec:
//   containers:
//   - name: nginx
//     image: nginx:latest
//     ports:
//     - containerPort: 80