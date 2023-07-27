FROM openjdk:11-jdk

#COPY usr/spring/resources ./resources

COPY build/libs/*.jar application.jar

EXPOSE 8081

ENTRYPOINT ["java","-jar", "application.jar"]