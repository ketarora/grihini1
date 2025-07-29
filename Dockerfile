FROM maven:3.8.8-eclipse-temurin-21 AS build
WORKDIR /app
COPY . /app
RUN mvn clean package

# -------- Runtime Stage --------
FROM openjdk:23-slim
WORKDIR /app

COPY --from=build /app/target/Gruhani-0.0.1-SNAPSHOT.jar app.jar

CMD ["java", "-jar", "app.jar","--server.address=0.0.0.0"]