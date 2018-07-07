run:
	docker-compose up

run-be:
	docker-compose run --rm --service-ports gcloud

run-fe:
	docker-compose run --rm --service-ports frontend

be-bash:
	docker-compose run --rm --service-ports gcloud bash

fe-bash:
	docker-compose run --rm --service-ports frontend bash
