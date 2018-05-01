#!/usr/bin/env groovy
pipeline{
    agent any

    //Define stages for the build process
    stages{
        //Define the deploy stage
        stage('Deploy'){
            steps{
                //The Jenkins Declarative Pipeline does not provide functionality to deploy to a private
                //Docker registry. In order to deploy to the HDAP Docker registry we must write a custom Groovy
                //script using the Jenkins Scripting Pipeline. This is done by placing Groovy code with in a "script"
                //element. The script below registers the HDAP Docker registry with the Docker instance used by
                //the Jenkins Pipeline, builds a Docker image using the project Dockerfile, and pushes it to the registry
                //as the latest version.
                script{
                    docker.withRegistry('https://build.hdap.gatech.edu'){
                        def mariaTestrpcImage = docker.build("mariatestrpc:1.0", "-f ./docker/testrpc/jenkins.dockerfile .")
                        mariaTestrpcImage.push('latest')
                        def mariaIpfsImage = docker.build("mariaipfs:1.0", "-f ./docker/ipfs/jenkins.dockerfile ./docker/ipfs")
                        mariaIpfsImage.push('latest')
                        def mariaIexecImage = docker.build("mariaiexec:1.0", "-f ./docker/iexec/jenkins.dockerfile .")
                        mariaIexecImage.push('latest')
                        def mariaTruffleImage = docker.build("mariatruffle:1.0", "-f ./docker/truffle/jenkins.dockerfile .")
                        mariaTruffleImage.push('latest')
                    }
                }
            }
        }

        //Define stage to notify rancher
        stage('Notify'){
            steps{
                //Write a script that notifies the Rancher API that the Docker Image for the application has been updated.
                script{
                    rancher confirm: true, credentialId: 'rancher-server', endpoint: 'http://rancher.hdap.gatech.edu:8080/v2-beta', environmentId: '1a7', environments: '', image: 'build.hdap.gatech.edu/mariatestrpc:latest', ports: '', service: 'ArtificialIntelMARIA/mariatestrpc', timeout: 50
                    rancher confirm: true, credentialId: 'rancher-server', endpoint: 'http://rancher.hdap.gatech.edu:8080/v2-beta', environmentId: '1a7', environments: '', image: 'build.hdap.gatech.edu/mariaipfs:latest', ports: '', service: 'ArtificialIntelMARIA/mariaipfs', timeout: 50
                    rancher confirm: true, credentialId: 'rancher-server', endpoint: 'http://rancher.hdap.gatech.edu:8080/v2-beta', environmentId: '1a7', environments: '', image: 'build.hdap.gatech.edu/mariaiexec:latest', ports: '', service: 'ArtificialIntelMARIA/mariaiexec', timeout: 50
                    rancher confirm: true, credentialId: 'rancher-server', endpoint: 'http://rancher.hdap.gatech.edu:8080/v2-beta', environmentId: '1a7', environments: '', image: 'build.hdap.gatech.edu/mariatruffle:latest', ports: '', service: 'ArtificialIntelMARIA/mariatruffle', timeout: 50
                }
            }
        }
    }
}
