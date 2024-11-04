from sanic import Sanic, response
from sanic.request import Request
from sanic.response import json
from sanic_cors import CORS
import asyncio

app = Sanic("CombinedAPI")
CORS(app)  # 允许跨域请求

# 模拟任务的存储
tasks = {}

# 定义初始节点数据
table_data = [
    {
        "nodename": "test",
        "nodeID": "000",
        "nodestatus": "Ready",
        "cpu": "2",
        "memory": "124MiB",
        "gpu": "4",
        "conditions": "Healthy",
        "description": "这个是测试节点一！！！",
    },
]


@app.post("/api/get-node-info")
async def get_node_info(request):
    # 返回节点信息的第一个数据
    return json({"code": 200, "data": table_data[0]})


# POST 请求处理，接收 JSON 数据
@app.post("/pod")
async def add_pod(request: Request):
    try:
        pod_data = request.json  # 获取 JSON 数据
        if not pod_data:
            return json(
                {"status": "error", "message": "No JSON data received"}, status=400
            )

        # 这里可以对 pod_data 进行处理或存储，示例中只是打印输出
        print("Received Pod Data:", pod_data)

        # 返回成功响应
        return json(
            {"status": "success", "message": "Pod data received successfully"},
            status=200,
        )

    except Exception as e:
        print("Error:", e)
        return json(
            {"status": "error", "message": "Failed to process data"}, status=500
        )


@app.post("/api/schedule")
async def schedule_request(request):
    pod = request.json.get("pod")
    function = request.json.get("function")

    print("/api/schedule",pod,function)
    
    if not pod or not function:
        return json({"message": "缺少必要的参数"}, status=400)

    # 创建一个调度任务并存储任务信息
    task_id = tuple(pod) if isinstance(pod, list) else pod  # 修改 task_id 为可哈希类型
    tasks[task_id] = {"status": "received", "progress": "0%", "result": None}

    # 模拟异步调度任务
    asyncio.create_task(execute_task(task_id))

    return json({"message": "服务器已接收到调度请求"})


@app.get("/api/schedule/progress")
async def schedule_progress(request):
    pod = request.args.getlist("pod[]")
    
    print("/api/schedule/progress",pod)
    
    if not pod:
        return json({"progress": "任务未找到"}, status=404)

    task_id = tuple(pod) if len(pod) > 1 else pod[0]
    if task_id not in tasks:
        return json({"progress": "任务未找到"}, status=404)

    progress = tasks[task_id]["progress"]
    return json({"progress": progress})


@app.get("/api/schedule/result")
async def schedule_result(request):
    pod = request.args.getlist("pod[]")
    
    print("/api/schedule/result",pod)
    
    if not pod:
        return json({"result": "任务未找到"}, status=404)

    task_id = tuple(pod) if len(pod) > 1 else pod[0]
    if task_id not in tasks:
        return json({"result": "任务未找到"}, status=404)

    result = tasks[task_id]["result"] or "调度尚未完成"
    return json({"result": pod,"nodename":"test"})





async def execute_task(task_id):
    # 模拟任务进行中的状态
    tasks[task_id]["status"] = "in_progress"
    for i in range(1, 11):
        await asyncio.sleep(1)  # 模拟任务执行时间
        tasks[task_id]["progress"] = f"{i * 10}%"

    # 任务完成
    tasks[task_id]["status"] = "completed"
    tasks[task_id]["progress"] = "100%"
    tasks[task_id]["result"] = "调度成功"


# 启动 Sanic 服务器
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
