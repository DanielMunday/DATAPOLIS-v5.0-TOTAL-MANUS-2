#!/bin/bash

# Script para construir y empaquetar DATAPOLIS v4.0

set -e

echo "======================================"
echo "DATAPOLIS v4.0 - Build & Package"
echo "======================================"

# Verificar versión
VERSION=$(cat VERSION | head -1)
echo "Building: $VERSION"

# Crear directorio de build
BUILD_DIR="build"
rm -rf $BUILD_DIR
mkdir -p $BUILD_DIR/DATAPOLIS_v4

# Copiar archivos
echo "Copying files..."
cp -r backend $BUILD_DIR/DATAPOLIS_v4/
cp -r frontend $BUILD_DIR/DATAPOLIS_v4/
cp -r tests $BUILD_DIR/DATAPOLIS_v4/
cp -r docs $BUILD_DIR/DATAPOLIS_v4/
cp -r scripts $BUILD_DIR/DATAPOLIS_v4/
cp -r ci $BUILD_DIR/DATAPOLIS_v4/
cp VERSION $BUILD_DIR/DATAPOLIS_v4/
cp README.md $BUILD_DIR/DATAPOLIS_v4/

# Crear archivo de configuración
cat > $BUILD_DIR/DATAPOLIS_v4/.env.example << EOF
# DATAPOLIS v4.0 Configuration

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/datapolis

# Redis
REDIS_URL=redis://localhost:6379

# API
API_HOST=0.0.0.0
API_PORT=8000

# Frontend
FRONTEND_PORT=3000

# Environment
ENVIRONMENT=development
DEBUG=True

# Security
SECRET_KEY=your-secret-key-here
EOF

# Crear ZIP
echo "Creating ZIP archive..."
cd $BUILD_DIR
zip -r DATAPOLIS_v4_Full.zip DATAPOLIS_v4/
cd ..

# Mover ZIP a raíz
mv $BUILD_DIR/DATAPOLIS_v4_Full.zip ./

# Crear checksum
echo "Creating checksum..."
sha256sum DATAPOLIS_v4_Full.zip > DATAPOLIS_v4_Full.zip.sha256

# Información final
echo ""
echo "======================================"
echo "Build Complete!"
echo "======================================"
echo "Archive: DATAPOLIS_v4_Full.zip"
echo "Size: $(du -h DATAPOLIS_v4_Full.zip | cut -f1)"
echo "SHA256: $(cat DATAPOLIS_v4_Full.zip.sha256)"
echo ""
echo "Next steps:"
echo "1. Extract: unzip DATAPOLIS_v4_Full.zip"
echo "2. Install: cd DATAPOLIS_v4 && pip install -r backend/fastapi/requirements.txt"
echo "3. Run: python -m uvicorn backend.fastapi.app.main:app --reload"
echo "======================================"
