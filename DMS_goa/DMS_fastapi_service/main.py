from fastapi import FastAPI, WebSocket, WebSocket, WebSocketDisconnect, Depends
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import socketio
from pydantic import BaseModel
from fastapi import FastAPI, BackgroundTasks
import requests
import json
import time
import asyncio
from kafka import KafkaProducer
from kafka import KafkaConsumer
import threading
import subprocess
import time
import pygetwindow as gw
import pyautogui
import os
from screeninfo import get_monitors
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder  # Import jsonable_encoder
import logging
import uiautomation as auto
import asyncio
from sqlalchemy import text
from typing import List
from websocket_router import router as websocket_router



#==================================Send Data to Kafka===(Mayank)========================================#

sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins='*',
    logger=True,
    engineio_logger=True
)

# Create FastAPI app
app = FastAPI()

# Create the ASGI application by mounting the Socket.IO app and the FastAPI app
socket_app = socketio.ASGIApp(
    socketio_server=sio,
    other_asgi_app=app,
    socketio_path='socket.io'
)

# CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



producer = KafkaProducer(
    bootstrap_servers='192.168.1.133:9092',
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

API_KEY = '959e8b3d77615bcdb1659ff5bd74e791'
CITY = 'Goa'
URL = f'https://api.openweathermap.org/data/2.5/weather?q={CITY}&appid={API_KEY}&units=metric'

async def fetch_and_send():
    while True:
        try:
            response = requests.get(URL)
            data = response.json()
            temp = data['main']['temp']

            if temp > 20.0:
                print(f"[✔] Temp is {temp}°C > 20°C — sending to Kafka")
                producer.send('weather_alerts_test', data)
            else:
                print(f"[ ] Temp is {temp}°C ≤ 20°C — not sending")

        except Exception as e:
            print("Error:", e)
        await asyncio.sleep(120)  # 2 minutes

@app.on_event("startup")
async def start_background_task():
    asyncio.create_task(fetch_and_send())
    
    
#============================ MAYANK(multiple Screen) =========================================================================#

@app.get("/launch-dashboards")
def launch_dashboards():
    try:
        subprocess.Popen(["cmd", "/c", "start chrome --new-window http://localhost:3000/service-request"])
        subprocess.Popen(["cmd", "/c", "start chrome --new-window http://localhost:3000/addservice"])
        subprocess.Popen(["cmd", "/c", "start chrome --new-window http://localhost:3000/enquiries"])

        # subprocess.Popen(["cmd", "/c", "start chrome --new-window http://localhost:5173/dashboard1"])
        # subprocess.Popen(["cmd", "/c", "start chrome --new-window http://localhost:5173/dashboard2"])
        # subprocess.Popen(["cmd", "/c", "start chrome --new-window http://localhost:5173/dashboard3"])


        time.sleep(5)

        # Get and sort monitors left to right
        monitors = sorted(get_monitors(), key=lambda m: m.x)
        if len(monitors) < 3:
            return JSONResponse(content={"error": "Less than 3 monitors detected"}, status_code=400)

        # Map dashboards to correct monitor index
        dashboard_monitor_map = {
            'service-request': 0,  # This will go to monitor 1
            'addservice': 1,       # This will go to monitor 2
            'enquiries': 2         # This will go to monitor 3
        }

        # Get Chrome windows
        chrome_windows = [w for w in gw.getWindowsWithTitle('Chrome') if w is not None and w.title.strip() != '']
        if len(chrome_windows) < 3:
            return JSONResponse(content={"error": "Not enough Chrome windows found"}, status_code=500)

        for dashboard, monitor_index in dashboard_monitor_map.items():
            for window in chrome_windows:
                if dashboard in window.title.lower():
                    monitor = monitors[monitor_index]
                    window.moveTo(monitor.x, monitor.y)
                    window.resizeTo(monitor.width, monitor.height)
                    break

        for window in chrome_windows:
            if "login" in window.title.lower():  # make sure your login window has "Login" in title
                window.close()
                break

        return {"message": "Dashboards correctly placed on respective monitors"}

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

"""" Note:- *This command should always remain at the end. Any new code must be added above it.* """

""" Run the FastAPI Project
1. Navigate to the project directory:
cd Spero-DMS\DMS_goa\DMS_fastapi_service

2. Run the FastAPI server:
uvicorn main:app --host 0.0.0.0 --port 8000 --reload """



# ------------------------------------------------------------------------------------------------------------#


app.include_router(websocket_router)