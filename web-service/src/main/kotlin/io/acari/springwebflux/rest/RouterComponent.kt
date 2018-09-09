package io.acari.springwebflux.rest

import io.acari.springwebflux.handler.ImageHandler
import io.acari.springwebflux.handler.PodHandler
import io.acari.springwebflux.handler.PreBuiltPodHandler
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
  fun apiRouterFunction(): RouterFunction<ServerResponse> =
      nest(path("/api"),
          nest(path("/pod"),
              route(GET("/members"), allPodMemberProjectionHandler())
                  .andRoute(POST("/event"), podEventHandler())
                  .andNest(path("/member/{id}"),
                      route(POST("/avatar"), savePodMemberAvatarHandler())
                          .andRoute(GET("/avatar"), fetchPodMemberAvatarHandler())
                          .andRoute(GET("/information"), podMemberInformationProjectionHandler())
                          .andRoute(POST("/event"), podMemberEventHandler())
                  ))
      )

  private fun allPodMemberProjectionHandler() = HandlerFunction {
    ServerResponse.ok()
        .contentType(MediaType.APPLICATION_STREAM_JSON)
        .body(fromPublisher(podHandler.projectAllPodMembers(), Identifier::class.java))
  }

  private fun podMemberInformationProjectionHandler() = HandlerFunction {
    ServerResponse.ok()
        .contentType(MediaType.APPLICATION_JSON)
        .body(fromPublisher(podHandler.projectPersonalInformation(it.pathVariable("id")), PersonalInformation::class.java))
  }

  private fun savePodMemberAvatarHandler() = HandlerFunction {
    ServerResponse.ok()
        .body(imageHandler.saveImage(it.body(BodyExtractors.toParts())), String::class.java)
  }

  private fun podMemberEventHandler() = HandlerFunction {
    ServerResponse.ok()
        .body(podHandler.savePodMemberEvent(it.pathVariable("id"), it.bodyToMono(Event::class.java)), Event::class.java)
  }

  private fun podEventHandler() = HandlerFunction {
    ServerResponse.ok()
        .body(podHandler.savePodEvent(it.bodyToMono(String::class.java)), String::class.java)
  }

  private fun fetchPodMemberAvatarHandler() = HandlerFunction {
    ServerResponse.ok()
        .body(podHandler.fetchAvatar(it.pathVariable("id")), ByteArray::class.java)
  }
}