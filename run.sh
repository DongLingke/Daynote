#!/bin/bash
cd /opt/Daynote

# 激活虚拟环境
. .venv/bin/activate

# 后台启动 Flask
PORT=5050 nohup python3 app.py > app.log 2>&1 &

echo "✅ 日迹Daynote 已启动，端口 5050"
