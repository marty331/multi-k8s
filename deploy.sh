docker build -t marty331moz/multi-client:latest -t marty331moz/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t marty331moz/multi-server:latest -t marty331moz/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t marty331moz/multi-worker:latest -t marty331moz/multi-worker:$SHA -f ./worker/Dockerfile ./worker
docker push marty331moz/multi-client:latest
docker push marty331moz/multi-server:latest
docker push marty331moz/multi-worker:latest
docker push marty331moz/multi-client:$SHA
docker push marty331moz/multi-server:$SHA
docker push marty331moz/multi-worker:$SHA
kubectl apply -f k8s
kubectl set image deployments/server-deployment server=marty331moz/multi-server:$SHA
kubectl set image deployments/client-deployment client=marty331moz/multi-client:$SHA
kubectl set image deployments/worker-deployment worker=marty331moz/multi-worker:$SHA