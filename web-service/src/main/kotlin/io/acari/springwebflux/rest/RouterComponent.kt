package io.acari.springwebflux.rest

import io.acari.springwebflux.handler.ImageHandler
import io.acari.springwebflux.handler.PodHandler
import io.acari.springwebflux.models.Event
import io.acari.springwebflux.models.Identifier
import io.acari.springwebflux.models.PersonalInformation
import org.springframework.context.annotation.Bean
import org.springframework.core.io.ClassPathResource
import org.springframework.http.MediaType
import org.springframework.web.reactive.function.BodyExtractors
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
    fun staticRouterFunction(): RouterFunction<*> =
            resources("/**", ClassPathResource("static/"))
    @Bean
    fun apiRouterFunction(): RouterFunction<ServerResponse> =
            nest(path("/api"),
                nest(path("/pod"),
                    route(GET("/members"), allPodMemberHandler())
                        .andRoute(POST("/event"), podEventHandler())
                        .andRoute(GET("/members/avatar"), allAvatarIdsHandler())
                        .andNest(path("/member/{id}"),
                            route(POST("/avatar"), saveImageHandler())
                                .andRoute(GET("/avatar"), podMemberAvatarHandler())
                                .andRoute(GET("/information"), podMemberInformationHandler())
                                .andRoute(POST("/event"), podMemberEventHandler())))
            )

    private fun allPodMemberHandler() = HandlerFunction {
        ServerResponse.ok().build()
    }

    private fun allAvatarIdsHandler() = HandlerFunction {
        ServerResponse.ok().build()
    }

    private fun podMemberInformationHandler() = HandlerFunction {
        ServerResponse.ok().build()
    }

    private fun saveImageHandler() = HandlerFunction {
        ServerResponse.ok().build()
    }

    private fun podMemberEventHandler() = HandlerFunction {
        ServerResponse.ok().build()
    }
    private fun podEventHandler() = HandlerFunction {
        ServerResponse.ok().build()
    }

    private fun podMemberAvatarHandler() = HandlerFunction {
        ServerResponse.ok().build()
    }
}