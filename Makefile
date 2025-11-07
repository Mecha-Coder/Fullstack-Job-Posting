# Build the run 
all:
	docker-compose build --no-cache
	docker-compose up

# Stop the containers running
down:
	docker-compose down

# Restart the container
up:
	docker-compose up

# Remove container and related images
clean:
	docker-compose down --rmi all

# Remove and re-build everything
re: clean all

