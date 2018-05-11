#!/bin/bash
if [ -f /opt/google-cloud-sdk/install.sh ]; then
    echo "gcloud ready"
else
    echo "installing gcloud"
    curl https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-200.0.0-linux-x86_64.tar.gz --output /opt/gc-sdk.tar.gz
    tar -C /opt -xzf /opt/gc-sdk.tar.gz
    /opt/google-cloud-sdk/install.sh -q
    /opt/google-cloud-sdk/bin/gcloud components install app-engine-python app-engine-python-extras -q
fi
exit;
