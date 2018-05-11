help:
	@echo "sra"
	@echo ""
	@echo "The following commands are available:"
	@echo ""
	@echo "    make run:     	Run local development server inside container."
	@echo "    make bash:     	Run bash terminal within the backend container."
	@echo "    make fe-build:   Builds the frontend assets."

run:
	docker-compose up

bash:
	docker-compose run --rm backend bash

fe-build:
	docker-compose run --rm frontend make build
