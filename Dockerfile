FROM maven:3.8.7-eclipse-temurin-19 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY backend ./backend
RUN mvn package

RUN apt-get update && apt-get install -y postgresql-client

FROM openjdk:19

WORKDIR /app
COPY --from=build /app/target/LabSDI-0.0.1-SNAPSHOT.jar .
CMD ["java", "-jar", "LabSDI-0.0.1-SNAPSHOT.jar"]