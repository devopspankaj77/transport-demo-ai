# Transport Booking System

A production-ready ticket booking application designed for Kubernetes (Minikube & AKS).

## Project Structure
- `src/`: Node.js Express API.
- `k8s/`: Kubernetes manifests (Base + Dev/Prod overlays).
- `.github/workflows/`: CI/CD pipelines with **Trivy** and **Checkov**.
- `setup-local.sh`: Automated script for local Minikube deployment.

## Local Deployment (Minikube)
1. Ensure you have `minikube`, `kubectl`, and `docker` installed.
2. Run the setup script:
   ```bash
   ./setup-local.sh
   ```
3. Get the service URL:
   ```bash
   minikube service dev-transport-api --url
   ```

## CI/CD Pipelines
- **Dev Pipeline:** Triggered on PRs to `develop`. Runs Checkov (manifest scan) and Trivy (image scan).
- **Prod Pipeline:** Triggered on merge to `main`. Prepares deployment for AKS.

## Security Scanning
- **Trivy:** Scans the Docker image for vulnerabilities.
- **Checkov:** Scans Kubernetes manifests for security misconfigurations.
