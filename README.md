# Simple test websocket server

Followed the instructions here:

https://aws.amazon.com/blogs/opensource/network-load-balancer-nginx-ingress-controller-eks/

And used the script from here to set up the pre-requisites

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-0.32.0/deploy/static/provider/aws/deploy.yaml
```

Created a test cluster using:

```
eksctl create cluster --name dev-cluster --version 1.17 --region eu-west-1 --nodegroup-name standard-workers --node-type t3.micro --nodes 3 --nodes-min 1 --nodes-max 4 --managed
```

```
$ kubectl get svc
NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.100.0.1   <none>        443/TCP   8m36s
```

Clean up with:

```
eksctl delete cluster --name prod --profile cmgresearch
```

Push image to ecr

```
-- create the ecr repo aws ecr create-repository --repository-name test-app --profile cmgresearch
-- login aws ecr get-login-password --region eu-west-1 --profile cmgresearch | docker login --username AWS --password-stdin 140049730323.dkr.ecr.eu-west-1.amazonaws.com

docker build .
docker tag <<IMAGE>> 140049730323.dkr.ecr.eu-west-1.amazonaws.com/test-app:vXXX
docker push 140049730323.dkr.ecr.eu-west-1.amazonaws.com/test-app:vXXX
```

Update the `node-server.yml` to use the new image tag

Deploy

```
kubectl apply -f node-server.yml
kubectl apply -f ingress.yml
```

You should now be able to go to:

```
http://test.cmgresearch.com/test/test.html
```
