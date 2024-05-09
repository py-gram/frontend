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
                sh 'docker run --tls-verify=false -it --rm --name node-${GIT_COMMIT} nexus-ext.lab.pl/node:18.20.2 \
                sh -c \'echo Node version: $(node -v) && echo NPM version: $(npm -v)\''
            }
        }
        stage('Build') {
            steps {
                sh 'echo Version: $version'
                sh 'docker run -it --rm --name node-${GIT_COMMIT} -v "$(pwd)":/usr/src/app -w /usr/src/app nexus-ext.lab.pl/node:18.20.2 \
                sh -c \'npm ci && npm run build\'' 
            }
        }
        stage('Build image') {
            steps {
                sh 'docker build -t pythongram-$name:$version .'
            }
        }
        stage('Push image to registry') {
            steps {
                sh 'docker login -u podman -p podman123'
                sh 'docker push localhost/pythongram-$name:$version nexus-int.lab.pl/pythongram-$name:$version'
                sh 'docker logout'
            }
        }
        stage('Workspace clean') {
            steps {
                sh 'docker rmi localhost/pythongram-$name:$version'
            }
        }
    }
 }