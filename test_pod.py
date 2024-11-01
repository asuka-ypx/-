from sanic import Sanic
from sanic.request import Request
from sanic.response import json
from sanic_cors import CORS
app = Sanic("PodAPI")
CORS(app)  # 允许跨域请求
# POST 请求处理，接收 JSON 数据
@app.post("/pod")
async def add_pod(request: Request):
    try:
        pod_data = request.json  # 获取 JSON 数据
        if not pod_data:
            return json({"status": "error", "message": "No JSON data received"}, status=400)
        
        # 可以在这里对 pod_data 进行处理或存储，示例中只是打印输出
        print("Received Pod Data:", pod_data)

        # 返回成功响应
        return json({"status": "success", "message": "Pod data received successfully"}, status=200)
    
    except Exception as e:
        print("Error:", e)
        return json({"status": "error", "message": "Failed to process data"}, status=500)

# 启动 Sanic 服务器
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
