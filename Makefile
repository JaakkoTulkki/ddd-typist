docker-build:
	docker build -t typist-1 .
docker-run:
	docker run -it -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 8080:8080 --rm typist-1
build-and-run: docker-build docker-run