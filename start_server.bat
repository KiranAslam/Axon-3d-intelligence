@echo off
setlocal
cd /d "%~dp0"

set "PORT=%~1"
if "%PORT%"=="" set "PORT=8769"

where py >nul 2>nul
if %errorlevel%==0 goto start_server

where python >nul 2>nul
if %errorlevel%==0 goto start_server

echo Python is not installed or is not available in PATH.
echo Install Python from https://www.python.org/downloads/ and try again.
pause
exit /b 1

:start_server
echo Starting Unity WebGL server at http://localhost:%PORT%
where py >nul 2>nul
if %errorlevel%==0 (
    start "NN Web Model Server" py server.py %PORT%
) else (
    start "NN Web Model Server" python server.py %PORT%
)

timeout /t 1 /nobreak >nul
start "NN Web Model" "http://localhost:%PORT%/index.html?v=llm-live"
pause
