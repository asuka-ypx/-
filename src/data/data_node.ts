// data.ts

// 定义表格数据的类型
export interface NodeData {
    nodename: string;
    nodeID: string;
    nodestatus: string;
    cpu: string;
    memory: string;
    conditions: string;
    description?: string;
}

// 定义表格数据数组
export const tableData: NodeData[] = [
    { nodename: 'node1', nodeID: '001', nodestatus: 'Ready', cpu: '2', memory: '124MiB', conditions: 'Healthy', description: '这个是测试节点一！！！' },
    { nodename: 'node2', nodeID: '002', nodestatus: 'NotReady', cpu: '4', memory: '512MiB', conditions: 'Degraded' },
    { nodename: 'node3', nodeID: '003', nodestatus: 'Ready', cpu: '8', memory: '1GiB', conditions: 'Healthy' },
    { nodename: 'node4', nodeID: '004', nodestatus: 'Ready', cpu: '4', memory: '256MiB', conditions: 'Healthy' },
    { nodename: 'node5', nodeID: '005', nodestatus: 'NotReady', cpu: '16', memory: '2GiB', conditions: 'Critical' },
    { nodename: 'node6', nodeID: '006', nodestatus: 'Ready', cpu: '2', memory: '512MiB', conditions: 'Healthy' },
    { nodename: 'node7', nodeID: '007', nodestatus: 'NotReady', cpu: '8', memory: '1GiB', conditions: 'Degraded' },
    { nodename: 'node8', nodeID: '008', nodestatus: 'Ready', cpu: '16', memory: '4GiB', conditions: 'Healthy' },
];
