@echo off
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found. Install Node.js before starting the preview.
  pause
  exit /b 1
)
node "%~dp0preview-server.cjs"
if errorlevel 1 pause
