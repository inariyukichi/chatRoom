@echo off
setlocal

set "PROJECT_DIR=%~dp0"

start "chat-room backend" /D "%PROJECT_DIR%" "%ComSpec%" /k "call mvnw.cmd spring-boot:run"
start "chat-room frontend" /D "%PROJECT_DIR%frontend" "%ComSpec%" /k "npm run dev"

endlocal
