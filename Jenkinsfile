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
                sh 'docker run -it --rm --name node-18-${GIT_COMMIT} nexus-ext.lab.pl/node:18.20.2 \
                sh -c \'echo Node version: $(node -v) && echo NPM version: $(npm -v)\''
            }
        }
        stage('Build') {
            steps {
                sh 'echo Version: $version'
            }
        }
    }
 }