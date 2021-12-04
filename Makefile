default: deploy-developer

build-dependencies:
	docker build -f Dockerdep -t job-backend:dependencies .

clear-developer:
	docker rm job-backend-developer --force
	docker image rm job-backend:developer --force

list:
	docker ps | grep job-backend

deploy-developer:
	docker build -t job-backend:developer .
	docker-compose up -d