@echo off
rem Starts the Play page mock server and opens it. Safe to run twice.
cd /d "%~dp0"
curl -s -o nul http://localhost:4173/play
if %errorlevel%==0 (
  echo Server already running.
) else (
  start "Play mock server (close to stop)" cmd /k node server.js
  timeout /t 2 /nobreak >nul
)
start "" http://localhost:4173/play
