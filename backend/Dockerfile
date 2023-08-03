FROM openjdk:11-jdk

COPY usr/spring/resources ./resources

COPY build/libs/*.jar application.jar

EXPOSE 8081

ENTRYPOINT ["java","-Duser.timezone=Asia/Seoul","-jar","-Dspring.config.location=resources/application.yml,resources/application-db.yml", "application.jar"]