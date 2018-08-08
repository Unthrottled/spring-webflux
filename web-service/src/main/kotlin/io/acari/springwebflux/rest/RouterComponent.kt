package io.acari.springwebflux.rest

import io.acari.springwebflux.handler.ImageHandler
import io.acari.springwebflux.handler.PodHandler
import io.acari.springwebflux.models.Identifier
import io.acari.springwebflux.models.PersonalInformation
import org.springframework.context.annotation.Bean
import org.springframework.core.io.ClassPathResource
import org.springframework.http.MediaType
import org.springframework.http.codec.multipart.Part
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.BodyInserters.fromPublisher
import org.springframework.web.reactive.function.server.HandlerFunction
import org.springframework.web.reactive.function.server.RequestPredicates.*
import org.springframework.web.reactive.function.server.RouterFunction
import org.springframework.web.reactive.function.server.RouterFunctions.*
import org.springframework.web.reactive.function.server.ServerResponse

/**
 * Forged in the flames of battle by alex.
 */
@Component
class RouterComponent(private val imageHandler: ImageHandler,
                      private val podHandler: PodHandler) {

    @Bean
    fun apiRouterFunction(): RouterFunction<*> {
        return nest(path("/api"),
                nest(path("/pod"),
                    route(GET("/members"), allPodMemberHandler())
                        .andNest(path("/member/{id}"),
                            route(POST("/avatar"), saveImageHandler())
                                .andRoute(GET("/avatar"), handlerFunction())
                                .andRoute(GET("/information"), informationHandler())
                                .andRoute(POST("/event"), deleteImageHandler())))
                )
                .andOther(resources("/**", ClassPathResource("static/")))
    }

    private fun allPodMemberHandler() = HandlerFunction {
        ServerResponse.ok()
                .contentType(MediaType.APPLICATION_STREAM_JSON)
                .body(fromPublisher(podHandler.allPodMembers(), Identifier::class.java))
    }

    private fun informationHandler() = HandlerFunction {
        ServerResponse.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(fromPublisher(podHandler.fetchInterests(it.pathVariable("id")), PersonalInformation::class.java))
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