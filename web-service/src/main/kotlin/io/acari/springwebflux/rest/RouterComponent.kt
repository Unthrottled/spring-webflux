package io.acari.springwebflux.rest

import org.springframework.context.annotation.Bean
import org.springframework.core.io.ClassPathResource
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.server.HandlerFunction
import org.springframework.web.reactive.function.server.RequestPredicates.*
import org.springframework.web.reactive.function.server.RouterFunction
import org.springframework.web.reactive.function.server.RouterFunctions.*
import org.springframework.web.reactive.function.server.ServerResponse.ok

/**
 * Forged in the flames of battle by alex.
 */
@Component
class RouterComponent {

    @Bean
    fun apiRouterFunction(): RouterFunction<*> {
        return nest(path("/api"),
                route(GET("/images"), HandlerFunction { ok().build() })
                        .andNest(path("/image"),
                                route(POST("/save"), HandlerFunction { ok().build() })
                                        .andRoute(GET("/get/{id}"), HandlerFunction { ok().build() })
                                        .andRoute(DELETE("/delete/{id}"), HandlerFunction { ok().build() })))
                .andOther(resources("/**", ClassPathResource("static/")))
    }
}