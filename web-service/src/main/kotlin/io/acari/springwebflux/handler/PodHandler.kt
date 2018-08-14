package io.acari.springwebflux.handler

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.mongodb.util.JSON
import io.acari.springwebflux.models.*
import org.reactivestreams.Publisher
import org.springframework.data.mongodb.core.ReactiveMongoTemplate
import org.springframework.data.mongodb.core.findAll
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.Update
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

/**
 * Forged in the flames of battle by alex.
 */

@Service
class PodHandler(private val reactiveMongoTemplateDefined: ReactiveMongoTemplate,
                 private val imageHandler: ImageHandler) {

    private val objectMapper = jacksonObjectMapper()
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)

    fun allPodMembers(): Flux<Identifier> =
            reactiveMongoTemplateDefined.findAll<String>(collectionName = "podEvents")
                    .map {  objectMapper.readValue(it, Event::class.java) }
                    .map { event -> event.payload }
                    .map { objectMapper.treeToValue(it, BasePodMemberPayload::class.java) }
                    .map { it.identifier }
                    .map { Identifier(it) }

    fun fetchInterests(pathVariable: String): Mono<PersonalInformation> =
            Mono.just(PersonalInformation(listOf(Interest("0987654321", "Just Monika")), "party@parrot.io", "Party", "Parrot", "0987654321"))

    private val list = listOf(
            "5b5a5f8dac546f00013b37a9",
            "5b5a6091ac546f00013b37ab",
            "5b5a6094ac546f00013b37ad",
            "5b5a60b2ac546f00013b37af"
    )
    private var index = -1

    fun fetchAvatar(pathVariable: String): Flux<ByteArray> {
        index = (++index % list.size)
        return imageHandler.fetchImage(list[index])
    }

    fun savePodMemberEvent(pathVariable: String, bodyToMono: Mono<Event>): Publisher<Event> =
            bodyToMono.flatMap {event ->
                reactiveMongoTemplateDefined.upsert(
                        Query.query(Criteria.where("id").`is`(pathVariable)),
                        Update().push("events", JSON.parse(objectMapper.writeValueAsString(event))),//probably should figure out how to do this better.
                        String::class.java, "podMemberEvents")
                        .map { event }
            }

    fun savePodEvent(bodyToMono: Mono<String>): Publisher<String> =
            bodyToMono.flatMap {
                reactiveMongoTemplateDefined.save(it, "podEvents")
            }
}