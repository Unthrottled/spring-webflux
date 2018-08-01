package io.acari.springwebflux.rest

import io.acari.springwebflux.ImageHandler
import io.acari.springwebflux.models.Identifier
import org.springframework.context.annotation.Bean
import org.springframework.core.io.ClassPathResource
import org.springframework.http.MediaType
import org.springframework.http.codec.multipart.Part
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.BodyInserters
import org.springframework.web.reactive.function.BodyInserters.fromPublisher
import org.springframework.web.reactive.function.server.HandlerFunction
import org.springframework.web.reactive.function.server.RequestPredicates.*
import org.springframework.web.reactive.function.server.RouterFunction
import org.springframework.web.reactive.function.server.RouterFunctions.*
import org.springframework.web.reactive.function.server.ServerResponse
import org.springframework.web.reactive.function.server.ServerResponse.ok

/**
 * Forged in the flames of battle by alex.
 */
@Component
class RouterComponent(private val imageHandler: ImageHandler) {

    //todo: router not working
    @Bean
    fun apiRouterFunction(): RouterFunction<*> {
        return nest(path("/api"),
                route(path("/hello"), HandlerFunction{ok().body(BodyInserters.fromObject("hello world"))})
                        .andRoute(GET("/images"), allImagesHandler())
                        .andNest(path("/image"),
                                route(POST("/save"), saveImageHandler())
                                        .andRoute(GET("/get/{id}"), handlerFunction())
                                        .andRoute(DELETE("/delete/{id}"), deleteImageHandler())))
                .andOther(resources("/**", ClassPathResource("static/")))
    }

    private fun allImagesHandler() = HandlerFunction {
        ServerResponse.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(fromPublisher(imageHandler.findAllNames(), Identifier::class.java))
    }

    private fun saveImageHandler() = HandlerFunction {
        ServerResponse.ok()
                .body(imageHandler.saveImage(it.bodyToFlux(Part::class.java)), String::class.java)
    }

    private fun deleteImageHandler() = HandlerFunction {
        ServerResponse.ok()
                .body(imageHandler.removeImage(it.pathVariable("id")), Boolean::class.java)
    }

    private fun handlerFunction() = HandlerFunction {
        ServerResponse.ok()
                .body(imageHandler.fetchImage(it.pathVariable("id")), ByteArray::class.java)
    }
}