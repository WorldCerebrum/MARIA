# [Cerebrum Alpha 1.0](https://cs6440-s18-prj44.apps.hdap.gatech.edu/)
# MARIA - Artificial Intelligence Research Assitant for Medicine

<p align="center">
  <img src="./logo.png" alt="MARIA Logo"/>
</p>

An application that allows physicians/researchers to create machine learning competitions that are facilitated by smart contracts on a private Ethereum blockchain and IPFS for data sharing. The goal is to show that physicians can use crowdsourced machine learning on medical data to make clinical decisions without sacrificing patient data privacy.

[![Demo](https://img.youtube.com/vi/ZFcQmk975SM/0.jpg)](https://www.youtube.com/watch?v=ZFcQmk975SM)

## Technical Requirements

[Docker Community Edition (CE)](https://docs.docker.com/install/)

Or

[Docker Toolbox](https://docs.docker.com/toolbox/overview/)

Docker CE for Windows requires Windows 10 Pro or Windows 10 Enterprise with Hyper-V enabled.
Docker Toolbox uses Oracle VirturalBox instead of Hyper-V resulting in higher overhead of running images.

Please be aware that enabled Hyper-V prevents VirtualBox (or other virtualization plarforms) from running.

```
d:\>docker -v
Docker version 18.03.0-ce, build 0520e24

d:\>docker-compose -v
docker-compose version 1.20.1, build 5d8c71b2
```

### 1. Test that Docker is running by executing the 'docker run hello-world' - if you see *Hello from Docker!* - you are ready to continue:
```
D:\> docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
9bb5a5d4561a: Pull complete
Digest: sha256:bbdaf0ed64b665f3061aeab15b946697dd00845161935d9238ed28e8cfc2581c
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/engine/userguide/

```

### 2. Check git config for line endings
When developing in Windows evnironment line endings can wreak havoc on shell scripts, so please use the following command to prevent autocorrection from Unix LF to Windows CRLF:
```
git config --global core.autocrlf input
```

Check the line ending configuration setting:
```
D:\>git config core.autocrlf
input
```
### 3. Add two entries to your 'host' file:
```
127.0.0.1               mariatestrpc
127.0.0.1               mariaipfs
```

### 4. Build Docker images:
```
D:\maria [master ≡]> docker-compose build
```

### 5. Check built images:
```
D:\maria [master ≡]> docker images

REPOSITORY                 TAG                 IMAGE ID            CREATED             SIZE
maria/mariaiexec           latest              59975193c3b4        8 minutes ago       162MB
maria/mariatruffle         latest              4f78d0afc625        8 minutes ago       498MB
maria/mariaipfs            latest              59a1698fdb1b        22 hours ago        46.8MB
maria/mariatestrpc         latest              6ea311ae7c48        3 days ago          143MB
hello-world                latest              e38bc07ac18e        10 days ago         1.85kB
jenkins/jenkins            2.112-alpine        481b49e06417        4 weeks ago         223MB
node                       6.13.1-alpine       a37ab997e738        5 weeks ago         55.1MB
node                       6.13.1              64f57f44922d        5 weeks ago         659MB
ipfs/go-ipfs               latest              53d471abe10c        4 months ago        46.8MB
docker4w/nsenter-dockerd   latest              cae870735e91        5 months ago        187kB
```
### 6. Start the project containers:
```
D:\maria [master ≡]> docker-compose up

Creating network "maria_dapp-network" with driver "bridge"
Creating maria_ipfs_1    ... done
Creating maria_testrpc_1 ... done
Creating maria_truffle_1 ... done
Attaching to maria_ipfs_1, maria_testrpc_1, maria_truffle_1
ipfs_1     | Changing user to ipfs
...
...
```
### 7. Open project website URL in a browser
```
http://localhost:8081/
```

To interact with iExec container use the following commands:
```
D:\maria [master ≡]> docker run -ti maria/mariaiexec
bash-4.3# iexec account show
✔ iExec account details:

nRLC allowances:
  ropsten:       4 nRLC


bash-4.3# iexec submit
ℹ iexecSubmit({"cmdline":"Rscript ComputeModule.R https://ipfs.io/ipfs/QmPT3M5GxBJjy65TBBojpkCKRWD2nCxEd76DGWaxxBZQ5K ht
tps://ipfs.io/ipfs/QmQpY849HvDhL8cJMWjBgb4nuG7nLhwStzkrVSckVtR6q5 https://ipfs.io/ipfs/QmSYvyZJ2CEAjZ9ZCHPchKzxJDvDk6HBs
TNWNkLSp6P7Ua https://ipfs.io/ipfs/QmQQoPjmLu9SNCSvM7nF9f5k1HWoS2FCs1z6xPtXZQi2QN","dirinuri":"https://raw.githubusercontent.com/WorldCerebrum/MARIA/master/iexec/apps/ComputeModule.R"})

ℹ txHash: 0x4df7c932cccf5e3ff6b59f68914cfac3142f6fff63dd7f1414cae8340fed8372

ℹ View on etherscan: https://ropsten.etherscan.io/tx/0x4df7c932cccf5e3ff6b59f68914cfac3142f6fff63dd7f1414cae8340fed8372

✔ calculation job submitted to iExec workers

bash-4.3# iexec result 0x4df7c932cccf5e3ff6b59f68914cfac3142f6fff63dd7f1414cae8340fed8372
ℹ RUNNING...
bash-4.3# exit
exit
D:\maria [master ≡]>
```

### 8. Stop containers
```ctrl-c``` in the terminal window used to start containers.
```
Gracefully stopping... (press Ctrl+C again to force)
Stopping maria_mariatruffle_1 ... done
Stopping maria_mariaipfs_1    ... done
Stopping maria_mariatestrpc_1 ... done
D:\maria [master ≡]>docker ps
```

Listing of running container should be empty at that point:
```
D:\maria [master ≡]> docker ps

CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS
NAMES
```

Containers are still available and can be safely removed:
```
D:\maria [master ≡]> docker ps -a

CONTAINER ID        IMAGE                COMMAND                  CREATED             STATUS                       PORTS
     NAMES
12a093a9149e        maria/mariatruffle   "/bin/bash -c 'truff…"   15 minutes ago      Exited (137) 3 minutes ago
     maria_mariatruffle_1
c645171247a0        maria/mariaiexec     "/bin/bash"              15 minutes ago      Exited (0) 15 minutes ago
     maria_mariaiexec_1
23ad2511b6ad        maria/mariaipfs      "/sbin/tini -- /usr/…"   15 minutes ago      Exited (0) 3 minutes ago
     maria_mariaipfs_1
021330541a2d        maria/mariatestrpc   "testrpc"                15 minutes ago      Exited (137) 3 minutes ago
     maria_mariatestrpc_1
1bff06d36c67        hello-world          "/hello"                 About an hour ago   Exited (0) About an hour ago
                  festive_lalande     
```

### 9. Remove containers

```
D:\maria [docker ≡]> docker-compose down

Removing maria_mariatruffle_1 ... done
Removing maria_mariaiexec_1   ... done
Removing maria_mariaipfs_1    ... done
Removing maria_mariatestrpc_1 ... done
Removing network maria_dapp-network

D:\maria [docker ≡]> docker ps -a

CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                           PO
RTS               NAMES
1bff06d36c67        hello-world         "/hello"                 About an hour ago   Exited (0) About an hour ago
                  festive_lalande
```

Contributors: Salman Rahim, Gleb Kharko, Charles Tsang, Zachary Dan, Ryan Dymock, Andrew Shannon
