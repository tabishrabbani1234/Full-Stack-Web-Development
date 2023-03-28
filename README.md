# Full-Stack-Web-Development
Use 
```
$ mvn spring-boot:run
```
to run the program using maven.
Add this to pom.xml file before running the command -
```
<build>
        <plugins>
             <plugin>
                 <groupId>org.springframework.boot</groupId>
                 <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
</build>
```
and add this under dependencies
```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```
