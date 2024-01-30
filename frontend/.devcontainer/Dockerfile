FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bullseye

# install chrome (required to run angular unit tests using karma)
RUN sudo apt update
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN sudo apt install ./google-chrome-stable_current_amd64.deb -y
