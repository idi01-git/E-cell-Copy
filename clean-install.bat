@echo off
echo Cleaning up deprecated packages and reinstalling...

echo Removing node_modules and package-lock.json...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

echo Clearing npm cache...
npm cache clean --force

echo Installing dependencies with latest versions...
npm install

echo Installation complete!
echo Running build test...
npm run build

echo All done! Deprecated warnings should be resolved.
pause
