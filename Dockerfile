FROM maven:3.8.7-eclipse-temurin-19 AS build
WORKDIR /app
COPY backend ./backend
RUN apt-get update && apt-get install -y postgresql-client gcc
RUN gcc -o ./backend/dataGeneration/generateScripts.out generateScripts.c
COPY pom.xml .
RUN mvn dependency:go-offline
RUN mvn package

FROM openjdk:19
WORKDIR /app
COPY --from=build /app/target/LabSDI-0.0.1-SNAPSHOT.jar .
CMD ["java", "-jar", "LabSDI-0.0.1-SNAPSHOT.jar"]