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
                echo "Stopping old container if running..."
                docker stop devops-dashboard || true
                docker rm devops-dashboard || true

                echo "Checking if port 9090 is already in use..."
                CONTAINER_ID=$(docker ps -q --filter "publish=9090")
                if [ ! -z "$CONTAINER_ID" ]; then
                    echo "Port 9090 is busy. Stopping container $CONTAINER_ID"
                    docker stop $CONTAINER_ID || true
                    docker rm $CONTAINER_ID || true
                fi

                echo "Running new container..."
                docker run -d -p 9090:80 --name devops-dashboard devops-dashboard:latest
                '''
            }
        }
    }

    post {
        success {
            echo "✅ DevOps Dashboard deployed successfully at http://localhost:9090 🎉"
        }
        failure {
            echo "❌ Build or deploy failed"
        }
    }
}

