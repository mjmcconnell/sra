IMAGE_NAME = sra
STORAGE_CONTAINER = sra-storage

# Base docker run command with common parameters
RUN_DOCKER = docker run -it --rm --volumes-from $(STORAGE_CONTAINER) -v "$(CURDIR)/src-server:/src-server" -v "$(CURDIR)/src-client:/src-client"

help:
	@echo "sra"
	@echo ""
	@echo "The following commands are available:"
	@echo ""
	@echo "    make deploy:  Deploy the application to the specified appengine instance."
	@echo "                  Accepts args: app, version (see Makefile comments)"
	@echo "    make run:     Run local development server inside container."
	@echo "    make test:    Run application's tests inside  container."


# Builds the docker container that is run by our other targets
build:
	docker build -t="$(IMAGE_NAME)" .

# Used to provide a persistent container in which we can store semi-permanent
# but not critically important data i.e. deploy credentials, local databases,
# shell history etc.
storage: build
	-docker run -it --name $(STORAGE_CONTAINER) -u 0 $(IMAGE_NAME) bootstrap_storage.sh

# Runs the application locally using the Appengine SDK. Your application code
# is mounted inside the docker container and the appropriate ports are bound
# to the host's network interface so it is possible to access the running
# server just as you usually would at http://localhost:8080 and the admin
# server on http://localhost:8000
run: storage
	$(RUN_DOCKER) -p 0.0.0.0:8080:8080 -p 0.0.0.0:8000:8000 $(IMAGE_NAME) make -C /src-server run

# Runs the application's tests using the appropriate test runners for each
# part of the application. All artifacts produced are copied to the host
# filesystem after the test run so they can be accessed outside the container
# e.g. by Jenkins.
test: storage
	$(RUN_DOCKER) $(USE_ROOT) $(IMAGE_NAME) make -C /src-server test

# Build FE/client code inside the container
client-build: storage
	$(RUN_DOCKER) $(USE_ROOT) $(IMAGE_NAME) make -C /src-client build

# watch client src dir for changes and rebuild as required
client-watch: storage
	$(RUN_DOCKER) $(USE_ROOT) $(IMAGE_NAME) make -C /src-client watch
