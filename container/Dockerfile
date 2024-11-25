
FROM alpine:latest

# Copy everything from your project directory to
# a folder called app. Basically copies Main.java to /app in linux
COPY . /app

# Move into that directory
WORKDIR /app

# Install Java 17
RUN apk update && apk add openjdk17

# Compile app
RUN javac Main.java

# Run java Main
CMD ["java", "Main"]