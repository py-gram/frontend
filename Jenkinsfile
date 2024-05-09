 pipeline {
    agent {
        label 'sl1'
    }

    environment {
        def json = readJSON file: 'package.json'
        def version = "${json.version}"
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
    }
 }