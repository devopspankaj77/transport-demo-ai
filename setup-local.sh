#!/bin/bash

echo "🚀 Starting Minikube setup for Transport Booking System..."

# Check if minikube is installed
if ! command -v minikube &> /dev/null
then
    echo "❌ minikube could not be found. Please install it first."
    exit 1
fi

# Start minikube if not running
minikube status | grep -q "Running"
if [ $? -ne 0 ]; then
    echo "🔄 Starting Minikube..."
    minikube start
fi

# Point shell to minikube docker-env
echo "📦 Setting up Docker environment..."
eval $(minikube docker-env)

# Build the application image
echo "🏗️ Building the transport-api image..."
docker build -t transport-api:latest .

# Apply Kubernetes manifests
echo "☸️ Applying Kubernetes manifests (Dev Overlay)..."
kubectl apply -k k8s/overlays/dev

echo "⏳ Waiting for pods to be ready..."
kubectl wait --for=condition=ready pod -l app=transport-api --timeout=60s

echo "✅ Setup complete!"
echo "🔗 Access the API health check:"
echo "minikube service dev-transport-api --url"
