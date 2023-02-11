pipeline {
	agent any

	tools {nodejs "node"}

	stages{

		stage('Change directory to backend') {
			steps {
				
			}
		}
		stage('Install backend dependency') {
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