# PowerShell script to build and prepare the MacroMetal application for production

# Display banner
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "    MacroMetal Industries - Production Build Tool    " -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "This script will create a production-ready build"
Write-Host "of the MacroMetal Industries analysis application."
Write-Host ""

# Navigate to project directory
Set-Location $PSScriptRoot

# Build the React application
Write-Host "🔨 Building production version..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build completed successfully!" -ForegroundColor Green
    Write-Host "The production files are in the ./build directory."
    Write-Host ""
    Write-Host "To deploy these files to a web server:"
    Write-Host "1. Copy all contents of the build folder to your web server's root"
    Write-Host "2. Ensure your web server is configured for single-page applications"
    Write-Host ""
    Write-Host "For local testing of the production build, you can run:"
    Write-Host "npx serve -s build" -ForegroundColor Yellow
}
else {
    Write-Host "❌ Build failed. Please check the errors above." -ForegroundColor Red
    exit 1
}

# Create a zip file for easy distribution
Write-Host "📦 Creating distribution package..." -ForegroundColor Yellow
Compress-Archive -Path ".\build\*" -DestinationPath ".\macrometal-production-build.zip" -Force

Write-Host "✅ Package created: macrometal-production-build.zip" -ForegroundColor Green
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "Build process completed!" -ForegroundColor Green
Write-Host "=====================================================" -ForegroundColor Cyan
