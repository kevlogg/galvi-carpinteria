@echo off
cd /d "%~dp0"
echo Corrigiendo vulnerabilidades (audit fix sin --force)...
call npm audit fix
if errorlevel 1 (
  echo.
  echo Si aun quedan avisos, proba: npm audit fix --force
  echo Revisa que el proyecto siga funcionando: npm run dev
) else (
  echo Listo. Ejecuta npm run dev para probar.
)
pause
