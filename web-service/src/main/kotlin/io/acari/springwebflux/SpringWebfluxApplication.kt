package io.acari.springwebflux

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.data.mongo.MongoReactiveDataAutoConfiguration
import org.springframework.boot.autoconfigure.mongo.MongoReactiveAutoConfiguration
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.reactive.function.BodyInserters
import org.springframework.web.reactive.function.server.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import reactor.core.publisher.toMono
import reactor.core.scheduler.Schedulers
import java.time.Duration

@EnableReactiveMongoRepositories
@SpringBootApplication(exclude = [
    MongoReactiveDataAutoConfiguration::class,
    MongoReactiveAutoConfiguration::class])
class SpringWebfluxApplication

fun main(args: Array<String>) {
    runApplication<SpringWebfluxApplication>(*args)
}

@RestController
class HelloController {

    @GetMapping("/annotated/hello")
    fun helloWorld(): Mono<String> {
        return """
          Hello world!

        """.trimIndent().toMono()
    }
}

@Configuration
class HelloContoller {

    @Bean
    fun helloController() =
            RouterFunctions.route(RequestPredicates.GET("/hello"), HandlerFunction<ServerResponse> {
                serverRequest ->
                val listOf = listOf("Ding!", "Fries are done!", "I gotta run")
                val messagePublisher = Flux.create<String> { subscriber ->
                    Flux.interval(Duration.ofSeconds(2))
                            .take(3)
                            .map { longIndex -> longIndex.toInt() }
                            .map { intIndex -> listOf[intIndex as Int] }
                            .subscribe({ stringMessage ->
                                subscriber.next(stringMessage)
                            }, {
                                System.err.println("Aww snap an error happend $it")
                                subscriber.complete()
                            }, {
                                subscriber.complete()
                            }
                            )
                }
                        .map { messageString -> Message(messageString) }

                val body = ServerResponse.ok()
                        .contentType(MediaType.APPLICATION_STREAM_JSON)
                        .body(BodyInserters.fromPublisher(messagePublisher, Message::class.java))
                body
            })

}

data class Message(val message: String)
