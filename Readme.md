Deploy steps:

    make be-bash
    gcloud auth login
    gcloud app deploy app.yaml --project sharon-regan-art --version v3 --no-promote
