package io.acari.springwebflux

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration
import org.springframework.boot.runApplication
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories

@EnableReactiveMongoRepositories
@SpringBootApplication(exclude = arrayOf(MongoAutoConfiguration::class,
                                        MongoDataAutoConfiguration::class))
class SpringWebfluxApplication

fun main(args: Array<String>) {
    runApplication<SpringWebfluxApplication>(*args)
}
