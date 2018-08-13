package io.acari.springwebflux.handler

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.mongodb.reactivestreams.client.MongoClient
import io.acari.springwebflux.models.*
import io.acari.springwebflux.repository.EventRepository
import org.reactivestreams.Publisher
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

/**
 * Forged in the flames of battle by alex.
 */

@Service
class PodHandler(private val reactiveMongoClient: MongoClient,
                 private val eventRepository: EventRepository,
                 private val imageHandler: ImageHandler) {

    private val objectMapper = jacksonObjectMapper()

    fun allPodMembers(): Flux<Identifier> =
            eventRepository.findAll()
                    .map { objectMapper.readValue(it, Event::class.java) }
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
            bodyToMono

    fun savePodEvent(bodyToMono: Mono<String>): Publisher<String> =
            bodyToMono.flatMap {
                eventRepository.save(it)
            }
}