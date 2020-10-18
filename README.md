# roonr.com

## Overview 
This is my personal website, written in Hugo, and deployed on kubernetes.

If you have any questions for me, or if you'd like to know more about the project, please, do not hesitiate to email me at: zacfpearson@gmail.com.

## Dev
There is a development docker file located at `docker/Dockerfile.dev` that you can use to build and test the hugo static site by running:
'''
docker run --mount type=bind,source="$(pwd)",target=/site-src -p 1313:1313 -it --rm roonr:dev /bin/ash
'''

## Prod
The production image is used to package the finalized site into an nginx container and can be built be running:
'''
docker build --no-cache roonr -f docker/Dockerfile.prod -t roonr:prod
'''

