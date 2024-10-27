from sanic import Sanic, response
from sanic.response import json
from sanic_cors import CORS

app = Sanic("NodeInfoAPI")
CORS(app)  # 允许跨域请求
# Define the table data as provided
table_data = [
    {"nodename": "test", "nodeID": "000", "nodestatus": "Ready", "cpu": "2", "memory": "124MiB", "conditions": "Healthy", "description": "这个是测试节点一！！！"},
]

@app.post("/api/get-node-info")
async def get_node_info(request):
    # Return the table data in JSON format
    return json({"code": 200, "data": table_data[0]})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5180)
