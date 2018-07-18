run:
	docker-compose up

be-run:
	docker-compose run --rm --service-ports gcloud

be-bash:
	docker-compose run --rm --service-ports gcloud bash

fe-run:
	docker-compose run --rm --service-ports frontend

fe-bash:
	docker-compose run --rm --service-ports frontend bash
