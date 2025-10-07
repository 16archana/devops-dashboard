pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo "Cloning repository..."
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image..."
                sh 'docker build -t devops-dashboard:latest .'
            }
        }

        stage('Deploy Container') {
            steps {
                echo "Deploying container..."
                sh '''
                # Stop old container if running
                docker stop devops-dashboard || true
                docker rm devops-dashboard || true

                # Run new container
                docker run -d -p 9090:80 --name devops-dashboard devops-dashboard:latest
                '''
            }
        }
    }

    post {
        success {
            echo "DevOps Dashboard deployed successfully! 🎉"
        }
        failure {
            echo "Build or deploy failed ❌"
        }
    }
}
