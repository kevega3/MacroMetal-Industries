#!/bin/bash
# Script to build and prepare the MacroMetal application for production

# Display banner
echo "====================================================="
echo "    MacroMetal Industries - Production Build Tool    "
echo "====================================================="
echo "This script will create a production-ready build"
echo "of the MacroMetal Industries analysis application."
echo

# Navigate to project directory
cd "$(dirname "$0")"

# Build the React application
echo "🔨 Building production version..."
npm run build

if [ $? -eq 0 ]; then
  echo "✅ Build completed successfully!"
  echo "The production files are in the ./build directory."
  echo
  echo "To deploy these files to a web server:"
  echo "1. Copy all contents of the build folder to your web server's root"
  echo "2. Ensure your web server is configured for single-page applications"
  echo
  echo "For local testing of the production build, you can run:"
  echo "npx serve -s build"
else
  echo "❌ Build failed. Please check the errors above."
  exit 1
fi

# Create a zip file for easy distribution
echo "📦 Creating distribution package..."
cd build
zip -r ../macrometal-production-build.zip ./*
cd ..

echo "✅ Package created: macrometal-production-build.zip"
echo "====================================================="
echo "Build process completed!"
echo "====================================================="
