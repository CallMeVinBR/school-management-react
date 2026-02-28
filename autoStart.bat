@echo off
echo ====================================================
echo Installing dependencies and starting Vite project
echo ====================================================
echo.
call npm install
call npm audit
echo.
call npm run dev
pause