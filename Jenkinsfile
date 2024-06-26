 pipeline {
    agent {
        label 'sl1'
    }

    environment {
        def json = readJSON file: 'package.json'
        def version = "${json.version}"
        def name = "${json.name}"
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '14'))
    }

    stages {
        stage('Prepare') {
            steps {
                sh 'podman run --tls-verify=false -it --rm --name node-${GIT_COMMIT} nexus-ext.lab.pl/node:lts-alpine3.19 \
                sh -c \'echo Node version: $(node -v) && echo NPM version: $(npm -v)\''
            }
        }
        stage('Build') {
            steps {
                sh 'echo Version: $version'
                sh 'podman run -it --rm --name node-${GIT_COMMIT} -v "$(pwd)":/usr/src/app -w /usr/src/app nexus-ext.lab.pl/node:lts-alpine3.19 \
                sh -c \'npm install && npm run build\'' 
            }
        }
        stage('Build image') {
            steps {
                sh 'podman build --tls-verify=false -t pythongram-$name:$version -f ./Dockerfile'
            }
        }
        stage('Push image to registry') {
            steps {
                sh 'podman login --tls-verify=false nexus-int.lab.pl -u podman -p podman123'
                sh 'podman push --tls-verify=false localhost/pythongram-$name:$version nexus-int.lab.pl/pythongram-$name:$version'
                sh 'podman logout nexus-int.lab.pl'
            }
        }
        stage('Workspace clean') {
            steps {
                sh 'podman rmi localhost/pythongram-$name:$version'
            }
        }
    }
 }