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
            Flux.empty()

    fun allPodMemberEvents(podMemberIdentifier: String): Flux<Event> =
            podMemberRepository.fetchPodMemberEventStream(podMemberIdentifier)

    fun allPodEvents(): Flux<Event> =
            podRepository.allPodEvents()

    fun fetchInterests(podMemberIdentifier: String): Mono<PersonalInformation> {
        return Mono.empty()
    }


    fun fetchAvatar(podMemberIdentifier: String): Flux<ByteArray> =
            Flux.empty()

    fun savePodMemberEvent(podMemberIdentifier: String, bodyToMono: Mono<Event>): Publisher<Event> =
            Flux.empty()

    fun savePodEvent(bodyToMono: Mono<String>): Publisher<String> =
            Flux.empty()}