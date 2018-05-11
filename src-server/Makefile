help:
	@echo "clean - remove build artifacts"
	@echo "deploy - deploy the app to appengine"
	@echo "run - run the local development server for testing/debugging purposes"

clean:
	find . -name '*.pyc' -exec rm -f {} +
	find . -name '*.pyo' -exec rm -f {} +
	find . -name '*~' -exec rm -f {} +
	find . -empty -type d -delete
	-rm -f .coverage

setup-gc-sdk:
	sh ~/gae_sdk_download.sh

deploy: setup-gc-sdk clean
	# deploy application to the default environment
	/opt/google-cloud-sdk/bin/gcloud app deploy .                       	\
		--oauth2                                                        	\
		--oauth2_credential_file=/opt/.appengine_storage/deploy_credentials \
		--noauth_local_webserver                                        	\
		-A $(app)                                                       	\
		-V $(version)

run: setup-gc-sdk clean
	# run the appengine development server
	/opt/google-cloud-sdk/bin/dev_appserver.py .  	\
		--host 0.0.0.0                            	\
		--admin_host 0.0.0.0                      	\
		--datastore_consistency_policy consistent 	\
		--require_indexes                         	\
		--storage_path /opt/.appengine_storage/     \
		--skip_sdk_update_check
