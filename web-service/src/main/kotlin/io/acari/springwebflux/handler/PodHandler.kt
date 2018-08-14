package io.acari.springwebflux.handler

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import io.acari.springwebflux.models.*
import io.acari.springwebflux.repository.PodMemberRepository
import io.acari.springwebflux.repository.PodRepository
import org.reactivestreams.Publisher
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import java.util.*

/**
 * Forged in the flames of battle by alex.
 */

@Service
class PodHandler(
        private val podRepository: PodRepository,
        private val podMemberRepository: PodMemberRepository,
        private val imageHandler: ImageHandler) {

    private val objectMapper = jacksonObjectMapper()
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)

    fun allPodMembers(): Flux<Identifier> =
            podRepository.allPodEvents()
                    .reduce(HashMap<String, Event>()) { t, u ->
                        if (u.type == "POD_MEMBER_DELETED")
                            t.remove(u.payload["identifier"].asText())
                        else if (u.type == "POD_MEMBER_CREATED")
                            t[u.payload["identifier"].asText()] = u
                        t
                    }
                    .flatMapMany { Flux.fromIterable(it.values) }
                    .map { event -> event.payload }
                    .map { objectMapper.treeToValue(it, BasePodMemberPayload::class.java) }
                    .map { it.identifier }
                    .map { Identifier(it) }

    fun fetchInterests(pathVariable: String): Mono<PersonalInformation> {
        val eventStream = podMemberRepository.fetchPodMemberEventStream(pathVariable)
                .replay()
                .autoConnect()
        val interest = eventStream
                .filter { it.type == "INTEREST_CAPTURED" || it.type == "INTEREST_REMOVED" }
                .reduce(HashMap<String, Event>()) { t, u ->
                    if (u.type == "INTEREST_REMOVED")
                        t.remove(u.payload["id"].asText())
                    else if (u.type == "INTEREST_CAPTURED")
                        t[u.payload["id"].asText()] = u
                    t
                }
                .flatMapMany { Flux.fromIterable(it.values) }
                .map { it.payload }
                .map { objectMapper.treeToValue(it, Interest::class.java) }
                .reduce(LinkedList()) { t: LinkedList<Interest>, u ->
                    t.add(u)
                    t
                }
        val contactable = eventStream
                .filter { it.type == "PERSONAL_INFO_CAPTURED" }
                .map { it.payload }
                .map { objectMapper.treeToValue(it, CapturedInfoPayload::class.java) }
                .reduce(Contact()) { t, u ->
                    when (u.field) {
                        "firstName" -> t.firstName = u.value
                        "lastName" -> t.lastName = u.value
                        "email" -> t.email = u.value
                        "phoneNumber" -> t.phoneNumber = u.value
                    }
                    t
                }


        return contactable.zipWith(interest) { t, u -> PersonalInformation(u, t.email, t.firstName, t.lastName, t.phoneNumber) }
    }


    fun fetchAvatar(pathVariable: String): Flux<ByteArray> =
            podMemberRepository.fetchPodMemberEventStream(pathVariable)
                    .replay()
                    .autoConnect()
                    .filter { it.type == "AVATAR_UPLOADED" }
                    .map { it.payload }
                    .map { objectMapper.treeToValue(it, AvatarUploadedPayload::class.java) }
                    .map { it.identifier }
                    .flatMap { imageHandler.fetchImage(it) }

    fun savePodMemberEvent(pathVariable: String, bodyToMono: Mono<Event>): Publisher<Event> =
            bodyToMono.flatMap { event -> podMemberRepository.saveEvent(pathVariable, event) }

    fun savePodEvent(bodyToMono: Mono<String>): Publisher<String> =
            bodyToMono.flatMap {
                podRepository.saveEvent(it)
            }
}