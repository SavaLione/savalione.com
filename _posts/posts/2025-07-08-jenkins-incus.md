---
layout: post
type: posts
title: "Beyond Docker: A Guide to C++ CI/CD with Jenkins and Incus"
date: 2025-07-08 10:03:41
description: "A step-by-step guide to setting up a robust C++ CI/CD pipeline with Jenkins and Incus, offering a powerful alternative to Docker-based workflows."
categories: [devops-infrastructure]
tags: [Incus, Self-hosting, Open Source, Tutorial, C++, CI/CD, Jenkins, Docker alternative, build automation, DevOps, Continuous Integration, Continuous Delivery, Ubuntu, Linux, LLVM, Clang, Jenkinsfile, pipeline as code, GitHub integration]
image:
  path: /assets/img/2025-07-08-jenkins-incus/header.png
  width: 1200
  height: 630
  alt: "Header image for the article 'Beyond Docker: A Guide to C++ CI/CD with Jenkins and Incus'"
---

![Header image for the article 'Beyond Docker: A Guide to C++ CI/CD with Jenkins and Incus'](/assets/img/2025-07-08-jenkins-incus/header.png "Header image for the article 'Beyond Docker: A Guide to C++ CI/CD with Jenkins and Incus'")

The modern software development process can be sophisticated due to the many requirements of how software should be created, delivered, and what features it must have.
Not only do we expect a product with comprehensive documentation, preferably written in multiple languages, but we also often require the application to have full unit test coverage, freshly signed builds, security compliance, ease of maintenance, etc.
Needless to say, everything should be developed and delivered within strict time limits.
Many proprietary companies, open-source teams, and independent developers have proven that it is possible to deliver a high-quality product that meets these standards.

After creating a clear pipeline and separating the project into milestones and steps, many developers come to the conclusion that writing code may not be the most time-consuming part.
A significant amount of time can be spent on steps that often don't change between different builds.
For example, after writing some code, one of the most essential steps, a developer can waste time by manually invoking compiler commands, building documentation, and packaging the software.
Effort is wasted on repetitive steps with unchanged behavior.
To solve this issue, Continuous Integration and Continuous Delivery (CI/CD) systems were created.
Continuous Integration allows for automated building and testing, while Continuous Delivery is responsible for deploying successful builds to production environments.

There are many available CI/CD systems.
They can be as simple as a bash script scheduled by cron, or as sophisticated and deeply integrated as GitHub Actions.
The choice of which system to use depends on many factors and requirements.
If a project is hosted on GitHub, GitHub Actions can be an obvious choice.
The same goes for GitLab CI/CD for projects on a GitLab server.
Google Cloud Build is often used with an existing Google Cloud infrastructure, and so forth.

My favorite CI/CD system is Jenkins.
It's open source, robust, secure, it scales well, and is not tied to any external service.
But my favorite feature is that Jenkins is a general-purpose CI/CD system, and the process of creating a pipeline is very straightforward.
Not only am I able to build distinct C++ projects, but I often use it for tasks unrelated to software development, like building academic papers, merging RAW photos, and automating form-filling.

Even though Jenkins works flawlessly with Docker, I personally don't like this approach.
It can be cumbersome to create a custom Docker container for every project, often leading to a great deal of time spent creating and maintaining a Docker infrastructure.
The approach I prefer involves a Jenkins server that has access via SSH to many agents, each running in a separate Incus container or virtual machine.
This way, I can easily create a fine-tuned working environment for any project I work on.

In this post, I will:
1. Set up an Incus container as a Jenkins agent.
2. Set up a Jenkins server.
3. Create three example Jenkins projects that demonstrate their interoperability between the server and its agents.

Although I'm setting up an Incus container to compile C++ code with LLVM Clang, it should be trivial to repurpose the container and pipeline to compile, build, and deploy projects that use a different technology stack.
For instance, you could set up containers to build a LaTeX project.

The final section provides a step-by-step guide.
Feel free to skip to that section if you are already proficient with Jenkins and Incus or want to see the main steps before reading the full post.

The Jenkinsfile and example code for this post are available in this GitHub repository:
* [GitHub - jenkins-cpp-example - An example Jenkins Pipeline project to compile a C++ project](https://github.com/SavaLione/jenkins-cpp-example)

## Used names and IPs
Throughout this guide, I will use the following names and IP addresses.
You should substitute these with your own values where appropriate.

* `incus-cpp-clang` - the name of the Incus container that will act as a Jenkins agent.
* `192.168.205.16/24` - the static IP address assigned to the Incus container.
* `192.168.205.1` - the gateway for the container's network (this will almost certainly be different in your setup).
* `build.savalione.com` - the example domain name for the Jenkins server.
* `jenkins-agent` - the dedicated user created on the Incus container for Jenkins to connect with.
* `incus-cpp-clang-jenkins-agent` - the name of the agent node as configured within the Jenkins UI.
* `jenkins-cpp-example-freestyle` - the name of our example Freestyle project.
* `jenkins-cpp-example-pipeline` - the name of our example Pipeline project (using an inline Jenkinsfile).
* `github-jenkins-cpp-example` - the name of our example Pipeline project that pulls its configuration from GitHub.

Versions:
* Ubuntu LTS 24.04 - host and agent operating system.
* Incus version 6.0.0.
* Jenkins version 2.492.3.

## The Full Guide with Explanations
This guide consists of three steps.
The final step is optional and demonstrates several ways to create Jenkins projects.
Feel free to skip any step you're already familiar with.
The steps are:
1. Set up an Incus container. This step describes the prerequisites for an Incus container to serve as a Jenkins agent.
2. Set up the Jenkins server. Here, I'll show you how to configure the Jenkins controller to connect to the agent via SSH.
3. Assign jobs to the agent. In this optional step, we will create three example Jenkins projects:
    1. Freestyle project - a simple way to execute scripts on Jenkins agents.
    2. Pipeline (Jenkinsfile) - a more powerful and modern approach for defining build processes as code.
    3. Pipeline (GitHub) - a popular method where the pipeline is pulled directly from a source control repository like GitHub.

### Step 1: Setting up an Incus container
First, a container should have some form of a static name.
It can be a public and private IP address or a domain name.
In this post, I'll use a static private IP address since the Jenkins server and the agent container are on the same local network, which simplifies the setup.

Enter a bash shell in the container:
* `incus exec incus-cpp-clang -- bash`

Set up the network interface by editing `/etc/netplan/10-lxc.yaml` with your preferred editor (e.g., nano):
```yaml
network:
  version: 2
  ethernets:
    eth0:
      dhcp4: false
      dhcp6: false
      addresses:
        - 192.168.205.16/24
      nameservers:
        addresses:
          - 192.168.205.1
      routes:
        - to: default
          via: 192.168.205.1
      dhcp-identifier: mac
```

Where:
* `dhcp4: false` and `dhcp6: false` - disable the DHCP protocol (automatic assignment of IP, subnet, name servers and gateway).
* `192.168.205.16/24` - the IP address and subnet for the Incus container.
* `192.168.205.1` - the gateway for the container's network (this will almost certainly be different in your setup).

Note: when configuring Netplan files, remember that indentation is critical in YAML.

Apply the new Netplan settings:
* `netplan apply`

Note: In this post, an Ubuntu 24.04 LTS container is used.
Ubuntu typically uses Netplan for network configuration.
If you're using a different Linux distribution, your network manager and the way you configure your network interfaces might vary.

Next, OpenSSH server and Java Runtime Environment should be installed.
OpenSSH is used for the connection between the Jenkins server and agent.
JRE is needed due to the Jenkins requirements that are listed here:
* [Jenkins - Java Support Policy](https://www.jenkins.io/doc/book/platform-information/support-policy-java/)

To install the tools execute the following commands in the terminal:
1. `apt install openssh-server`
2. `apt install openjdk-21-jre-headless`

It is not secure nor convenient to use the root user as a way for the Jenkins server to connect to the agent.
Some tools may have the root user check, linux scheduler may behave poorly and it's almost never a good idea to modify the root user's shell and their environment variables.
Therefore a user has to be created.
There are many ways to do so.
If you prefer an interactive setup where the system prompts you with questions, use `adduser`:
* `adduser jenkins-agent`

Or you can just create a user right away:
* `useradd -m -s /bin/bash jenkins-agent`

Where:
* `jenkins-agent` - the dedicated user for Jenkins to connect with.
* `-m` - create the user's home directory if it doesn't exist (required for Jenkins).
* `-s /bin/bash` - use bash as a default shell.

After creating the user, I recommend changing the user's password.
You can set up the password manually:
* `passwd jenkins-agent`

Or you can lock the user's password:
* `passwd -l jenkins-agent`

Locking the user's password disables a password by changing it to a value which matches no possible encrypted value, thus making it impossible to login by using a passphrase.
See more here ([passwd(1) - Linux manual page](https://man7.org/linux/man-pages/man1/passwd.1.html)).

Jenkins server uses SSH protocol to connect to agents.
The connection is established and authenticated by using a SSH key.
Therefore, such key should be created.

Within the incus container login as the created user:
* `su - jenkins-agent`

You can create a SSH key with the passphrase protection:
* `ssh-keygen -f ~/.ssh/jenkins_agent_key`

If you set the passphrase empty (`-N ""`), then there won't be such protection:
* `ssh-keygen -f ~/.ssh/jenkins_agent_key -N ""`

Where:
* `-f ~/.ssh/jenkins_agent_key` - output key file location.
* `-N ""` - the passphrase to set.

Two files will be created:
1. `jenkins_agent_key` - a SSH private key that should be kept secret.
2. `jenkins_agent_key.pub` - a public key.

OpenSSH server should allow connection to the user account using the generated key.
To allow connection:
1. Create the `authorized_keys` file:
    * `touch ~/.ssh/authorized_keys`
2. Add the generated public key the `authorized_keys`:
    * `cat ~/.ssh/jenkins_agent_key.pub >> ~/.ssh/authorized_keys`
3. Set up correct access rights (optional):
    * `chmod 600 ~/.ssh/authorized_keys`
    * `chmod 700 ~/.ssh`

Jenkins agents should have a workspace directory.
A workspace directory is a place where code, git repositories, builds, etc. will be downloaded and stored.
Create the workspace directory:
* `mkdir ~/workspace`

By following this step up to this moment you should have a properly set up user that will be able to act as a Jenkins agent.
For many configurations it should be enough, but if you wish you may set up environment variables so when a step from Jenkins server pipeline is assigned to this agent, the right tools and libraries will be used.
You also may install the compiler or additional tools that are needed.

Here is an example for a LLVM Clang C++ setup.
Edit the shell configuration file with your preferred editor and add the following:
```bash
# Set LLVM/Clang as the default C and C++ compiler
# The -19 suffix is important. It represents current version of the Clang toolchain.
export CC=/usr/bin/clang-19
export CXX=/usr/bin/clang++-19

# For a more complete LLVM toolchain experience (optional).
# Use lld (the LLVM linker). This is much faster than the default GNU ld.
export LDFLAGS="-fuse-ld=lld"

# Use LLVM's archiver and ranlib (optional).
export AR=/usr/bin/llvm-ar-19
export RANLIB=/usr/bin/llvm-ranlib-19

# Add flags for the C++ compiler (optional).
# This tells clang++ to use the libc++ standard library.
export CXXFLAGS="-stdlib=libc++"
```

### Step 2: Setting up the Jenkins server
After setting up a network interface, creating a user, generating a SSH key and setting up environment variables, the agent should be added as a node to the Jenkins server.

Foremost we need to get the private key from the previous step.
The private key should be located here: `~/.ssh/jenkins_agent_key`.
In order to do get the key:
1. `incus exec incus-cpp-clang -- bash` - enter a bash shell in the container.
2. `su - jenkins-agent` - login as the user.
3. `cat ~/.ssh/jenkins_agent_key` - get the private key.
4. `exit` or `CTRL+D` - exit the user, the root user and the container.

Then Jenkins SSH credentials should be created on the server.
Jenkins server provides a great and very convenient web user interface.
Within the Jenkins server UI do the following:
1. Jenkins dashboard -> Manage Jenkins -> Security -> Credentials -> Add Credentials
    * The field `Add Credentials` appears under `Domains (global)`
2. Fill the gaps:
    * Kind: `SSH Username with private key`
    * Scope: `Global (Jenkins, nodes, items, all child items, etc)`
    * ID: `incus-cpp-clang-jenkins-agent`
    * Description: `incus-cpp-clang-jenkins-agent`
    * Username is optional and can be any.
    * Private Key: `Enter directly` -> `Add` -> The key from `~/.ssh/jenkins_agent_key`
    * Passphrase: empty or the passphrase you set in the previous step.
3. Press: `Create`

See [Jenkins - Using credentials](https://www.jenkins.io/doc/book/using/using-credentials/) for more information about different types of credentials, scopes, etc.

Subsequently, you need to create and set up a Jenkins node:
1. Jenkins dashboard -> Manage Jenkins -> System Configuration -> Nodes -> New Node
    1. Node name: `incus-cpp-clang-jenkins-agent`
    2. Type: `Permanent Agent`
    3. Press: `Create`
2. Fill the gaps:
    * Name: `incus-cpp-clang-jenkins-agent`
    * Description: `Ubuntu 24.04 LTS with Clang 19`
    * Number of executors: `1`
    * Remote root directory: `/home/jenkins-agent/workspace`
    * Labels: `linux ubuntu clang clang-19`
    * Usage: `Only build jobs with label expressions matching this node`
    * Launch method: `Launch agents via SSH`
        * Host: `192.168.205.16`
        * Credentials: `jenkins-agent (incus-cpp-clang-jenkins-agent)`
        * Host Key Verification Strategy: `Manually trusted key Verification Strategy`
    * Availability: `Keep this agent online as much as possible`
3. Press: `Save`

Where:
* `Node name` - name that uniquely identifies an agent.
* `Type` - the type of the node. Can be:
    * `Permanent Agent` - a plain, permanent agent without higher level of integration managed outside Jenkins. For example: a physical computer, virtual machine, container, etc.
    * `Copy Existing Node` - a copy of existing node.
* `Description` - human-readable description for this agent.
* `Number of executors` - the maximum number of concurrent builds that Jenkins may perform on this node.
* `Remote root directory` - a workspace directory dedicated to Jenkins, - a place where code, git repositories, builds, etc. will be downloaded and stored.
* `Labels` - tags to group multiple agents into one logical group.
* `Usage` - controls how Jenkins schedules builds on this node. Can be:
    * `Use this node as much as possible` - in this mode, Jenkins uses this node freely. Whenever there is a build that can be done by using this node, Jenkins will use it.
    * `Only build jobs with label expressions matching this node` - in this mode, Jenkins will only build a project on this node when that project is restricted to certain nodes using a label expression.
* `Launch method` - controls how Jenkins starts this agent. Can be:
    * `Launch agent by connecting it to the controller` - allows an agent to be connected to the Jenkins controller whenever it is ready.
    * `Launch agents via SSH` - starts an agent by sending commands over a secure SSH connection.
* `Host` - agent's IP or hostname to connect to.
* `Credentials` - credentials to be used for logging in to the remote host.
* `Host Key Verification Strategy` - controls how Jenkins verifies the SSH key presented by the remote host whilst connecting. See [Host Key Verification Strategy](https://github.com/jenkinsci/ssh-agents-plugin/blob/main/doc/CONFIGURE.md#host-key-verification-strategy) for more information.
* `Availability` - controls when Jenkins starts and stops this agent.

Due to security reasons it is recommended to disable the server's default node:
1. Jenkins dashboard -> Manage Jenkins -> System Configuration -> Nodes -> `Built-In Node` -> Configure
2. Number of executors: `0`
3. Press: `Save`

To connect to a SSH server, OpenSSH should trust the remote server.
Usually when you try to connect to unknown SSH server, OpenSSH asks you in a terminal whether you trust the remote server or not.
The question looks like this:
```sh
savalione@r720 ~ » ssh 192.168.205.16
The authenticity of host '192.168.205.16 (192.168.205.16)' can't be established.
ED25519 key fingerprint is SHA256:th9e9WH7TFvpFv1B3ouPbzA0403mrnqf2B9TCNK0SxI.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```
Jenkins server's SSH connection won't be an exception, but you won't be able to access the terminal during the first connection attempt.
The Jenkins developers have foreseen that happening so they added couple of ways to deal with it.
One of the ways is to set up the host key verification strategy to `Accept first connection` so the first connection will always be a success:
1. Jenkins dashboard -> Manage Jenkins -> Security -> Security -> Git Host Key Verification Configuration
2. Host Key Verification Strategy: `Accept first connection`
3. Press: `Save`

After completing this step the Jenkins server should be able to use the created node.

### Step 3: Assigning jobs to the agent
Even though the type of the Jenkins project and its pipeline mainly depend on your particular needs, here I will show you three common Jenkins configurations.

#### Freestyle project
A Jenkins freestyle project is a basic build job that is used for simple automation tasks and builds.
You can build projects manually and the build steps can be just bash shell commands.

Here I want to execute a simple shell script on the node that was created on the previous steps.
The shell script has to print the name of the node that executes this script.
Also, I want to check the version of Clang.

In order to do so, using Jenkins UI you need to create a project:
1. Jenkins dashboard -> New Item
2. Enter an item name: `jenkins-cpp-example-freestyle`
3. Select an item type: `Freestyle project`
4. Press: `OK`

Then, you need to set up the created project:
* Dashboard -> `jenkins-cpp-example-freestyle` -> Configure

One of the requirements I have set for this project is that it executes only on the node that was created on the previous steps.
You can do it by restricting where this project can be run and setting label expression:
1. Restrict where this project can be run: `checked`
2. Label Expression: `incus-cpp-clang-jenkins-agent` (optional)

Create a simple script:
* Build Steps -> Add build step -> Execute shell -> Command

The script is:
```sh
echo $NODE_NAME
clang-19 --version
```

`$NODE_NAME` - is an environment variable that stores the name of the node that was used in order to execute the script.

After creating the script and restricting the project, save all changes.

Let's test the project.
Build the project:
* Dashboard -> `jenkins-cpp-example-freestyle` -> Build now

You can check the logs here:
* Dashboard -> `jenkins-cpp-example-freestyle` -> Status -> Last build -> Console Output

Logs usually contain the following:
* The name of the user that started the build.
* The name of the Jenkins project.
* The name of the node.
* Tags assigned to the node.
* The workspace directory.
* Script output.
* Architecture and target of the node.
* Script execution status.

#### Pipeline (Jenkinsfile)
Jenkins pipeline projects are a bit more sophisticated than freestyle projects.
Instead of creating steps manually via Jenkins user interface, we can just describe all steps using Groovy language.
This approach is convenient, because not only does it allow us to track all changes in the pipeline script using git, but also it is easier to describe complicated pipelines than using freestyle project approach.

Here I want to create a pipeline with two stages.
The first stage should check the installed Clang compiler version while the second should check CMake and Ninja build system versions.
The script should run on a node that has LLVM Clang version 19 compiler.

In order to do so, using Jenkins UI you need to create a project:
1. Navigate: Jenkins dashboard -> New Item
2. Enter an item name: `jenkins-cpp-example-pipeline`
3. Select an item type: `Pipeline`
4. Press: `OK`

Then, you need to set up the created project:
* Dashboard -> `jenkins-cpp-example-pipeline` -> Configure

Create a pipeline script:
* General -> Pipeline -> Definition -> Pipeline script

The script is:
```groovy
pipeline
{
    agent
    {
        label 'clang-19'
    }
    stages
    {
        stage('Check clang version')
        {
            steps
            {
                sh 'clang-19 --version'
            }
        }

        stage('Check CMake and ninja version')
        {
            steps
            {
                sh 'cmake --version'
                sh 'ninja --version'
            }
        }
    }
}
```

Where:
* `pipeline` - describes that this is a declarative pipeline.
* `agent` - describes where the pipeline will run.
* `label 'clang-19'` - tells Jenkins to find any available agent that has the clang-19 label.
* `stages` - describes all stages.
* `stage('Check clang version')`, `stage('Check CMake and ninja version')` - the stages.
* `steps` - describes the actual commands and actions to be executed during that stage.
* `sh` - execute a shell command.

After creating the pipeline script, save all changes.

Let's test the project.
Build the project:
* Dashboard -> `jenkins-cpp-example-pipeline` -> Build now

You can check the logs here:
* Dashboard -> `jenkins-cpp-example-pipeline` -> Status -> Last build -> Console Output

#### Pipeline (GitHub)
Basically, we use Pipeline (Jenkinsfile) approach from the previous example and go a step further by integrating it with GitHub.
When a commit is pushed to the repository, GitHub triggers a webhook, and Jenkins automatically starts a new build using the Jenkinsfile from the repository.

In this example, the visibility of a GitHub project doesn't matter, because we will use a deploy-specific SSH key for authentication.

It's important to mention, that a SSH key will be generated and added to the GitHub repository.
Even though it is possible to add the SSH key to the GitHub account so all private repositories will be accessed via this key, it is strongly inadvisable to do so.
With a single read-only SSH key that is associated only with a single repository, consequences of data breach will be less devastating.

To create a Jenkins pipeline project and integrate it with GitHub a key should be generated.
More about generating and adding keys to GitHub is written in official documentation:
* [GitHub - Generating a new SSH key and adding it to the ssh-agent](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

Create a SSH ed25519 key for authentication:
* `ssh-keygen -t ed25519 -C "savelii.pototskii@gmail.com" -f ./github-jenkins-cpp-example -N ""`

Where:
* `-t ed25519` - type of the key. Legacy systems were using rsa for authentication, but now it is recommended to use ed25519.
* `-C "savelii.pototskii@gmail.com"` - your email address.
* `-f ./github-jenkins-cpp-example` - output key file location.
* `-N ""` - the passphrase to set. Can be empty.

After creating a SSH ed25519 key, two files will be created:
* `./github-jenkins-cpp-example` - private key, that should be kept secret. It will be added to Jenkins server credentials.
* `./github-jenkins-cpp-example.pub` - public key. It will be added to GitHub repository.

Next, create Jenkins SSH credentials:
1. Jenkins dashboard -> Manage Jenkins -> Security -> Credentials -> Add Credentials
2. Fill the gaps:
    * Kind: `SSH Username with private key`
    * Scope: `Global (Jenkins, nodes, items, all child items, etc)`
    * ID: `github-jenkins-cpp-example`
    * Description: `github-jenkins-cpp-example`
    * Username is optional and can be any.
    * Private Key: `Enter directly` -> `Add` -> The key from `github-jenkins-cpp-example`
    * Passphrase: empty or the passphrase you set in the previous step.
3. Press: `Create`

ID, Description and Username can be any.
Sometimes it is convenient to set Username to something meaningful (like `github`), because Jenkins names credentials using the following notation: `username (id)`.
Passphrase is required if you have set passphrase during key generation process.
It can be very useful if your container was exposed, so bad actors wouldn't be able to use the private key.

Add the created SSH ed25519 key to the GitHub repository:
1. The GitHub repository -> Settings -> Security -> Deploy keys -> Add deploy key
2. Fill the gaps:
    1. Title: `github-jenkins-cpp-example`
    2. Key: Content of `github-jenkins-cpp-example.pub`
    3. Allow write access: `unchecked`
4. Press: `Add key`

It's better to allow read-only access so:
1. You won't have cyclic push-build loops.
2. You won't accidentally push something to the repository.

Jenkins needs to know when to pull and build changes from the git repository.
Though, it is possible to set up a schedule, it is better to let GitHub announce all changes to the Jenkins server.

Create a webhook for the GitHub repository:
1. The GitHub repository -> Settings -> Webhooks -> Add webhook
2. Fill the gaps:
    1. Payload URL: `https://build.savalione.com/github-webhook/`
    2. Content type: `application/json`
    3. SSL verification: `Enable SSL verification`
    4. Which events would you like to trigger this webhook?: `Just the push event.`
    5. Active: `checked`
3. Press: `Add webhook`

`build.savalione.com` - is the domain name where Jenkins server is located.
You just need to use your domain name and add `/github-webhook/` to it.

With Let's Encrypt and Certbot it is trivial to get a SSL (https) certificate for a domain.
Just get a SSL certificate and enable SSL verification in GitHub webhook settings.
It is recommended to not disable SSL verification.

In this example Jenkins is triggered to react on push actions, but you can set up which events you would like to trigger via webhook.
It is possible to send all changes to Jenkins can be used to automate pull requests, issues, etc.

After setting up the GitHub repository, Jenkins has to be set up.
Create a new Jenkins Pipeline project:
1. Jenkins dashboard -> New Item
2. Enter an item name: `jenkins-cpp-example-github`
3. Select an item type: `Pipeline`
4. Press: `OK`

Set up the created project:
1. Dashboard -> `jenkins-cpp-example-github` -> Configure
2. General -> GitHub project -> Project url -> `https://github.com/SavaLione/jenkins-cpp-example/` (optional)
3. Triggers -> GitHub hook trigger for GITScm polling -> `checked`
4. Pipeline:
    * Definition: `Pipeline script from SCM`
    * SCM: `Git`
    * Repository URL: `git@github.com:SavaLione/jenkins-cpp-example.git`
    * Credentials: `jenkins (github-jenkins-cpp-example)`
    * Branch Specifier (blank for 'any'): `**`
    * Script Path: `Jenkinsfile`
    * Lightweight checkout: `unchecked`
5. Press: `Save`

Where:
* `jenkins-cpp-example-github` - the name of the Jenkins project.
* `https://github.com/SavaLione/jenkins-cpp-example/` - link to the GitHub repository. It's optional but may be convenient.
* `git@github.com:SavaLione/jenkins-cpp-example.git` - SSH link to the repository.
* `jenkins (github-jenkins-cpp-example)` - credentials. Here I used `jenkins` as a username and `github-jenkins-cpp-example` as an ID.
* `Jenkinsfile` - the file that stores Jenkins pipeline description. The file itself can have any name and be stored anywhere within the repository. It may be beneficial to create a `.cicd/jenkins` file so the whole repository will be organized better.
* `Lightweight checkout` - if selected, Jenkins will try to obtain the Pipeline script contents directly from the git without performing a full checkout.

Now Jenkins server should pull all changes from the GitHub repository on every push commit.
But Jenkins pipeline hasn't been created yet so Jenkins server will fail trying to build the project.

Before creating Jenkins pipeline script, it is important to understand what it has to do.
There is a simple C++ project ([GitHub - jenkins-cpp-example](https://github.com/SavaLione/jenkins-cpp-example)).
It uses CMake to configure project, LLVM Clang as a main compiler and Doxygen as a documentation system.
Even though the project doesn't support GoogleTest, the C++ application itself provides 2 exit statuses: successful and unsuccessful exit.
So it is possible to use the application exit status as some sort of testing.
If application was compiled and works great, the documentation should be built and archived.
Therefore, I have the next pipeline in mind:
* Configure project using CMake -> Build the project -> Run the compiled application -> Build the documentation -> Archive the documentation -> Cleanup everything

Also, the Jenkins server has to use node that was created in the previous steps (`incus-cpp-clang-jenkins-agent`).

Let's implement the pipeline.
Create `Jenkinsfile` in the root directory of the git repository and add the following:
```groovy
pipeline
{
    agent
    {
        label 'incus-cpp-clang-jenkins-agent'
    }

    // Defines environment variables accessible throughout the pipeline.
    // These are used for common paths, names, and archive filenames.
    environment
    {
        BUILD_DIR         = 'build'
        EXECUTABLE_NAME   = 'jenkins-cpp-example'
        DOC_OUTPUT_DIR    = 'docs'
        DOC_ARCHIVE_NAME  = 'documentation.tar.gz'
    }

    stages
    {
        stage('Configure')
        {
            steps
            {
                // Create the build directory if it doesn't exist.
                sh "mkdir -p ${env.BUILD_DIR}"

                // Configure the project using CMake.
                sh "cmake -S . -B ${env.BUILD_DIR} -DCMAKE_BUILD_TYPE=Release"
            }
        }

        stage('Build')
        {
            steps
            {
                // Build the project via CMake.
                sh "cmake --build ${env.BUILD_DIR} --parallel \$(nproc)"
            }
        }

        stage('Run Application')
        {
            steps
            {
                script
                {
                    // The full path to the executable.
                    def executable_path = "${env.BUILD_DIR}/${env.EXECUTABLE_NAME}"

                    // Make the binary file executable. (optional)
                    sh "chmod +x ${executable_path}"

                    echo "Attempting to run: ${executable_path} --version"

                    sh "${executable_path} --version"

                    echo "Attempting to run: ${executable_path} --exit-success"

                    sh "${executable_path} --exit-success"
                }
            }
        }

        stage('Build Documentation')
        {
            steps
            {
                // Build documentation using Doxygen.
                sh 'doxygen doxyfile'

                // Check if the Doxygen output directory was actually created.
                sh "if [ ! -d '${env.DOC_OUTPUT_DIR}' ]; then echo 'Doxygen output directory ${env.DOC_OUTPUT_DIR} not found!'; exit 1; fi"

                // Check if the Doxygen output directory is empty.
                sh "if [ -z \"\$(ls -A '${env.DOC_OUTPUT_DIR}')\" ]; then echo 'Doxygen output directory ${env.DOC_OUTPUT_DIR} is empty!'; exit 1; fi"
            }
        }

        stage('Archive Artifacts')
        {
            steps
            {
                // Create a gzipped tar archive of the documentation.
                sh "tar -czvf ${env.DOC_ARCHIVE_NAME} -C ${env.DOC_OUTPUT_DIR} ."

                // Create artifacts with the executable and the documentation.
                archiveArtifacts artifacts: "${env.BUILD_DIR}/${env.EXECUTABLE_NAME}, ${env.DOC_ARCHIVE_NAME}", fingerprint: true
            }
        }
    }

    post
    {
        success
        {
            echo "Pipeline succeeded!"
        }

        failure
        {
            echo "Pipeline failed!"
        }

        always
        {
            echo "Pipeline finished."
            echo "Cleaning up build directory artifacts from workspace."

            // Jenkins step to clean the workspace.
            cleanWs()
        }
    }
}
```

The pipeline describes 5 steps:
1. `Configure` - configure the C++ project using CMake.
2. `Build` - build the project.
3. `Run Application` - run the compiled application twice: with `--version` and `--exit-success` flags.
4. `Build Documentation` - build documentation using Doxygen.
5. `Archive Artifacts` - archive the results compiled by Doxygen.

After any build, post scripts will be invoked.

You can check the logs by navigating:
* Dashboard -> `jenkins-cpp-example-github` -> Status -> Last build -> Console Output

For example, here is a part of the logs that shows how the application was run using `--version` flag:
```
Attempting to run: build/jenkins-cpp-example --version
[Pipeline] sh
+ build/jenkins-cpp-example --version
1.0.0
```

I hope, that after reading this post you are able to understand Jenkins a little bit better.
Now you should be able to connect a GitHub repository to Jenkins and gain all advantages of CI/CD.

Thanks for reading!

## Note: GitHub keys scope
If you need to connect Jenkins to the GitHub it is almost never a good idea to associate the SSH key account-wide.
Using an account-wide SSH key, Jenkins will have a full access to any repository that is attached to the GitHub account.
If there is a key compromise, then all repositories will be compromised.

Also, a repository-wide SSH key may be restricted to read-only operations, so it won't be possible to damage the content of the GitHub repository.

## Note: SSH key passphrase
In this post I was generating SSH keys without a passphrase, but it is recommended to use a passphrase.
The main advantage of a passphrase is that if the Jenkins node was compromised, then nobody will be able to connect to the GitHub repository without knowing the passphrase.

## Note: GitHub webhook SSL verification
In the modern world, it is pretty easy to get a free and secure SSL certificate,
Most of the time I use Let's Encrypt in order to do so.
To automate the whole process of getting SSL certificates you can use Certbot.

## Note: multiple Jenkins nodes on a single container or virtual machine
Throughout this post I was using just one node with a single user account, but if you wish you may create more accounts and nodes out of a sole Incus container or virtual machine.
The main benefit of doing so that you can change environment variables according to your needs so you won't waste disk space by creating multiple containers and virtual machines.

## Note: Jenkins node - number of executors
In this post a node with a single executor was created.
I allowed the node to execute only one project at a time, because all my compiling scripts were using all available system cores (`$(nproc)`).
So, in this scenario if I try to build simultaneously multiple projects there may be the at least next issues:
* A poor linux scheduler performance.
* A slow compiling speed du to the cache being filled with different content all the time.
* The system may just stuck because there are no available system resources.

If you want to do parallel builds, or you want to compile multiple projects at a time on a single node, increase the amount of executors and don't use all available cores to compile a project.

Also, you can limit Incus instance resources so the whole system won't stuck.
See the official Incus documentation for more information:
* [Incus - Resource limits](https://linuxcontainers.org/incus/docs/main/reference/instance_options/#resource-limits)

## Step by step guide
A simple step-by-step guide, in case you just need a quick reference:

1. Setup an Incus container:
    1. Enter the container: `incus exec incus-cpp-clang -- bash`
    2. Set up the network interface:
        1. Edit the `/etc/netplan/10-lxc.yaml` with your preferred editor (e.g., nano):
            ```yaml
            network:
              version: 2
              ethernets:
                eth0:
                  dhcp4: false
                  dhcp6: false
                  addresses:
                    - 192.168.205.16/24
                  nameservers:
                    addresses:
                      - 192.168.205.1
                  routes:
                    - to: default
                      via: 192.168.205.1
                  dhcp-identifier: mac
            ```
        2. Apply the settings: `netplan apply`
    3. Install required packages:
        1. `apt install openssh-server`
        2. `apt install openjdk-21-jre-headless`
    4. Create and setup a Jenkins user:
        1. Create a user:
            * `adduser jenkins-agent`
            * or
            * `useradd -m -s /bin/bash jenkins-agent`
        2. Set the default user password (optional):
            * Set up the password manually: `passwd jenkins-agent`
            * or
            * Lock the user's password (prevent the user from logging in): `passwd -l jenkins-agent`
    5. Set up the created user:
        1. Login as the user: `su - jenkins-agent`
        2. Create a SSH key
            * `ssh-keygen -f ~/.ssh/jenkins_agent_key -N ""`
            * or
            * `ssh-keygen -f ~/.ssh/jenkins_agent_key`
        3. Set up the SSH server:
            1. `touch ~/.ssh/authorized_keys`
            2. `cat ~/.ssh/jenkins_agent_key.pub >> ~/.ssh/authorized_keys`
            3. `chmod 600 ~/.ssh/authorized_keys`
            4. `chmod 700 ~/.ssh` (optional)
        4. Create the workspace directory: `mkdir ~/workspace`
        5. Set up environment variables (optional). Edit the shell configuration file (`~/.bashrc`, `~/.zshrc`, etc.) with your preferred editor (e.g., nano). Here is an example for a LLVM Clang C++ setup:
            ```bash
            # Set LLVM/Clang as the default C and C++ compiler
            # The -19 suffix is important. It represents current version of the Clang toolchain.
            export CC=/usr/bin/clang-19
            export CXX=/usr/bin/clang++-19

            # For a more complete LLVM toolchain experience (optional).
            # Use lld (the LLVM linker). This is much faster than the default GNU ld.
            export LDFLAGS="-fuse-ld=lld"

            # Use LLVM's archiver and ranlib (optional).
            export AR=/usr/bin/llvm-ar-19
            export RANLIB=/usr/bin/llvm-ranlib-19

            # Add flags for the C++ compiler (optional).
            # This tells clang++ to use the libc++ standard library.
            export CXXFLAGS="-stdlib=libc++"
            ```
        6. Install required packages, libraries; build a test project; etc. (optional)
        7. Exit the jenkins agent user, root user and the container: `exit` or `CTRL+D`.
2. Set up the Jenkins server:
    1. Get the Incus container's SSH private key for the created user:
        1. Enter the container: `incus exec incus-cpp-clang -- bash`
        2. `cat /home/jenkins-agent/.ssh/jenkins_agent_key`
    2. Create Jenkins SSH credentials:
        1. Jenkins dashboard -> Manage Jenkins -> Security -> Credentials -> Add Credentials
            * The field `Add Credentials` appears under `Domains (global)`
        2. Fill the gaps:
            * Kind: `SSH Username with private key`
            * Scope: `Global (Jenkins, nodes, items, all child items, etc)`
            * ID: `incus-cpp-clang-jenkins-agent`
            * Description: `incus-cpp-clang-jenkins-agent`
            * Username is optional and can be any.
            * Private Key: `Enter directly` -> `Add` -> The key from `~/.ssh/jenkins_agent_key`
        3. Create
    3. Create and set up a node:
        1. Jenkins dashboard -> Manage Jenkins -> System Configuration -> Nodes -> New Node
            1. Node name: `incus-cpp-clang-jenkins-agent`
            2. Type: `Permanent Agent`
            3. Create
        2. Fill the gaps:
            * Name: `incus-cpp-clang-jenkins-agent`
            * Description: `Ubuntu 24.04 LTS with Clang 19`
            * Number of executors: `1`
            * Remote root directory: `/home/jenkins-agent/workspace`
            * Labels: `linux ubuntu clang clang-19`
            * Usage: `Only build jobs with label expressions matching this node`
            * Launch method: `Launch agents via SSH`
                * Host: `192.168.205.16`
                * Credentials: `jenkins-agent (incus-cpp-clang-jenkins-agent)`
                * Host Key Verification Strategy: `Manually trusted key Verification Strategy`
            * Availability: `Keep this agent online as much as possible`
        3. Save
    4. Disable the default node (optional):
        1. Jenkins dashboard -> Manage Jenkins -> System Configuration -> Nodes -> `Built-In Node` -> Configure
        2. Number of executors: `0`
        3. Save
    5. Set up the host key verification strategy (optional):
        1. Jenkins dashboard -> Manage Jenkins -> Security -> Security -> Git Host Key Verification Configuration
        2. Host Key Verification Strategy: `Accept first connection`
        3. Save
3. Assign jobs to the agent:
    * Freestyle project
        1. Create a project:
            1. Jenkins dashboard -> New Item
            2. Enter an item name: `jenkins-cpp-example-freestyle`
            3. Select an item type: `Freestyle project`
            4. OK
        2. Set up the created project:
            1. Dashboard -> `jenkins-cpp-example-freestyle` -> Configure
            2. Restrict where this project can be run: `checked`
            3. Label Expression: `incus-cpp-clang-jenkins-agent` (optional)
            4. Build Steps -> Add build step -> Execute shell -> Command
                ```sh
                echo $NODE_NAME
                clang-19 --version
                ```
            5. Save
        3. Test the project (optional):
            1. Dashboard -> `jenkins-cpp-example-freestyle` -> Build now
            2. Check the logs: Dashboard -> `jenkins-cpp-example-freestyle` -> Status -> Last build -> Console Output
    * Pipeline (Jenkinsfile)
        1. Create a project:
            1. Jenkins dashboard -> New Item
            2. Enter an item name: `jenkins-cpp-example-pipeline`
            3. Select an item type: `Pipeline`
            4. OK
        2. Set up the created project:
            1. Dashboard -> `jenkins-cpp-example-pipeline` -> Configure
            2. General -> Pipeline -> Definition -> Pipeline script
                ```groovy
                pipeline
                {
                    agent
                    {
                        label 'clang-19'
                    }
                    stages
                    {
                        stage('Check clang version')
                        {
                            steps
                            {
                                sh 'clang-19 --version'
                            }
                        }

                        stage('Check CMake and ninja version')
                        {
                            steps
                            {
                                sh 'cmake --version'
                                sh 'ninja --version'
                            }
                        }
                    }
                }
                ```
            3. Save
        3. Test the project (optional):
            1. Dashboard -> `jenkins-cpp-example-pipeline` -> Build now
            2. Check the logs: Dashboard -> `jenkins-cpp-example-pipeline` -> Status -> Last build -> Console Output
    * Pipeline (GitHub)
        1. Create a SSH ed25519 key for GitHub authentication:
            * `ssh-keygen -t ed25519 -C "savelii.pototskii@gmail.com" -f ./github-jenkins-cpp-example -N ""`
        2. Create Jenkins SSH credentials:
            1. Jenkins dashboard -> Manage Jenkins -> Security -> Credentials -> Add Credentials
            2. Fill the gaps:
                * Kind: `SSH Username with private key`
                * Scope: `Global (Jenkins, nodes, items, all child items, etc)`
                * ID: `github-jenkins-cpp-example`
                * Description: `github-jenkins-cpp-example`
                * Username is optional and can be any.
                * Private Key: `Enter directly` -> `Add` -> The key from `github-jenkins-cpp-example`
            3. Create
        3. Add the created SSH ed25519 key to the GitHub repository:
            1. The GitHub repository -> Settings -> Security -> Deploy keys -> Add deploy key
            2. Fill the gaps:
                1. Title: `github-jenkins-cpp-example`
                2. Key: Content of `github-jenkins-cpp-example.pub`
                3. Allow write access: `unchecked`
            3. Add key
        4. Create a webhook for the GitHub repository:
            1. The GitHub repository -> Settings -> Webhooks -> Add webhook
            2. Fill the gaps:
                1. Payload URL: `https://build.savalione.com/github-webhook/`
                2. Content type: `application/json`
                3. SSL verification: `Enable SSL verification`
                4. Which events would you like to trigger this webhook?: `Just the push event.`
                5. Active: `checked`
            3. Add webhook
        5. Create a new Jenkins Pipeline project:
            1. Jenkins dashboard -> New Item
            2. Enter an item name: `jenkins-cpp-example-github`
            3. Select an item type: `Pipeline`
            4. OK
        6. Set up the created project:
            1. Dashboard -> `jenkins-cpp-example-github` -> Configure
            2. General -> GitHub project -> Project url -> `https://github.com/SavaLione/jenkins-cpp-example/` (optional)
            3. Triggers -> GitHub hook trigger for GITScm polling -> `checked`
            4. Pipeline:
                * Definition: `Pipeline script from SCM`
                * SCM: `Git`
                * Repository URL: `git@github.com:SavaLione/jenkins-cpp-example.git`
                * Credentials: `jenkins (github-jenkins-cpp-example)`
                * Branch Specifier (blank for 'any'): `**`
                * Script Path: `Jenkinsfile`
                * Lightweight checkout: `unchecked`
            5. Save
        7. Create the `Jenkinsfile` in your project's root directory.
            * The full script is detailed in the main guide above. You can also get the latest version directly from the example repository: [GitHub - jenkins-cpp-example - Jenkinsfile](https://github.com/SavaLione/jenkins-cpp-example/blob/main/Jenkinsfile)
        8. Test the project (optional):
            1. Trigger Jenkins build manually or push changes to the git repository.
            2. Check the logs: Dashboard -> `jenkins-cpp-example-github` -> Status -> Last build -> Console Output

## Additional links
* [Jenkins - Using Jenkins agents](https://www.jenkins.io/doc/book/using/using-agents/)
* [Jenkins - Java Support Policy](https://www.jenkins.io/doc/book/platform-information/support-policy-java/)
* [GitHub - jenkins-cpp-example](https://github.com/SavaLione/jenkins-cpp-example)
* [useradd(8) - Linux manual page](https://www.man7.org/linux/man-pages/man8/useradd.8.html)
* [passwd(1) - Linux manual page](https://man7.org/linux/man-pages/man1/passwd.1.html)
* [ssh-keygen - OpenSSH authentication key utility](https://man.openbsd.org/ssh-keygen)
* [Jenkins - Using credentials](https://www.jenkins.io/doc/book/using/using-credentials/)
* [SSH Build Agents - Configuring the SSH Build Agents plugin](https://github.com/jenkinsci/ssh-agents-plugin/blob/main/doc/CONFIGURE.md)
* [GitHub - Generating a new SSH key and adding it to the ssh-agent](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
* [Incus - Resource limits](https://linuxcontainers.org/incus/docs/main/reference/instance_options/#resource-limits)
