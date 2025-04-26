### Commands and Explanation

#### 1. Build and Push the Docker Image
```bash
docker build -t hswg94/ecomm-express-api:latest .
docker push hswg94/ecomm-express-api:latest
```
Builds the Docker image for the application and pushes it to Docker Hub (or your container registry).

#### 2. Apply the ConfigMap and Secret
```bash
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
```
Creates the ConfigMap and Secret required for the application.

#### 3. Apply the Deployment and Expose the Service
```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```
Deploys the application using the `deployment.yaml` file and exposes it using the `service.yaml` file.

#### 4. Verify the Deployment and Service
```bash
kubectl get deployments
kubectl get pods
kubectl get services
```
Checks the status of the deployment, lists the running pods, and retrieves the service details.

#### 5. Access the Application
Retrieve the external IP of the service from the output of:
```bash
kubectl get services
```
Use the external IP to access the application.

#### 6. Clean Up Resources
```bash
kubectl delete -f deployment.yaml
kubectl delete -f service.yaml
kubectl delete -f configmap.yaml
kubectl delete -f secret.yaml
```
Removes the deployment, service, ConfigMap, and Secret from the cluster.