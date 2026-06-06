#!/bin/bash
cd /opt/Daynote

PORT=5050

# 检查是否已有进程在运行
PID=$(lsof -ti:$PORT 2>/dev/null)
if [ -n "$PID" ]; then
  echo "⟳ 端口 $PORT 已有进程 (PID: $PID)，正在重启..."
  kill $PID 2>/dev/null
  sleep 1
  # 如果还没退出，强制杀
  kill -9 $PID 2>/dev/null 2>&1
  sleep 0.5
fi

# 激活虚拟环境
. .venv/bin/activate

# 后台启动 Flask
PORT=$PORT nohup python3 app.py > app.log 2>&1 &

echo "✅ 日迹Daynote 已启动，端口 $PORT (PID: $!)"
