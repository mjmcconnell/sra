run:
	docker-compose up

run-be:
	docker-compose run --rm --service-ports gcloud dev_appserver.py --host 0.0.0.0 --admin_host 0.0.0.0 /usr/src/app.yaml

be-bash:
	docker-compose run --rm --service-ports gcloud bash

fe-bash:
	docker-compose run --rm --service-ports frontend bash
