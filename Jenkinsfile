pipeline {
	agent any

	tools {nodejs "node"}

	stages{
		stage('Install backend dependencies') {
			steps {
				dir('Backend') {
					sh 'npm install'
				}			
			}
		}
		stage('Run backend tests') {
			steps {
				dir('Backend') {
					sh 'npm test'
				}
			}
		}
	}
}