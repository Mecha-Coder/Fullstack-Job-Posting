all:
	docker-compose build --no-cache
	docker-compose up

up:
	docker-compose up

down:
	docker-compose down

clean:
	docker-compose down --rmi all

re: clean all

