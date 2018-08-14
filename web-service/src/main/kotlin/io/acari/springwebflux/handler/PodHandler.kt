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
                    .reduce(HashMap<String, Event>()) { distinctMemberEvents, podEvent ->
                        if (podEvent.type == POD_MEMBER_DELETED)
                            distinctMemberEvents.remove(podEvent.payload["identifier"].asText())
                        else if (podEvent.type == POD_MEMBER_CREATED)
                            distinctMemberEvents[podEvent.payload["identifier"].asText()] = podEvent
                        distinctMemberEvents
                    }
                    .flatMapMany { Flux.fromIterable(it.values) }
                    .map { event -> event.payload }
                    .map { objectMapper.treeToValue(it, BasePodMemberPayload::class.java) }
                    .map { it.identifier }
                    .map { Identifier(it) }

    fun fetchInterests(podMemberIdentifier: String): Mono<PersonalInformation> {
        val eventStream = podMemberRepository.fetchPodMemberEventStream(podMemberIdentifier)
                .replay()
                .autoConnect()
        val interest = eventStream
                .filter { it.type == INTEREST_CAPTURED || it.type == INTEREST_REMOVED }
                .reduce(HashMap<String, Event>()) { distinctInterestEvents, interestEvent ->
                    if (interestEvent.type == INTEREST_REMOVED)
                        distinctInterestEvents.remove(interestEvent.payload["id"].asText())
                    else if (interestEvent.type == INTEREST_CAPTURED)
                        distinctInterestEvents[interestEvent.payload["id"].asText()] = interestEvent
                    distinctInterestEvents
                }
                .flatMapMany { Flux.fromIterable(it.values) }
                .map { it.payload }
                .map { objectMapper.treeToValue(it, Interest::class.java) }
                .reduce(LinkedList()) { interests: LinkedList<Interest>, interest ->
                    interests.add(interest)
                    interests
                }
        val contactable = eventStream
                .filter { it.type == PERSONAL_INFO_CAPTURED }
                .map { it.payload }
                .map { objectMapper.treeToValue(it, CapturedInfoPayload::class.java) }
                .reduce(Contact()) { accumContact, capturedInfoPayload ->
                    when (capturedInfoPayload.field) {
                        "firstName" -> accumContact.firstName = capturedInfoPayload.value
                        "lastName" -> accumContact.lastName = capturedInfoPayload.value
                        "email" -> accumContact.email = capturedInfoPayload.value
                        "phoneNumber" -> accumContact.phoneNumber = capturedInfoPayload.value
                    }
                    accumContact
                }

        return contactable.zipWith(interest) { contact, interests ->
            PersonalInformation(interests, contact.email, contact.firstName, contact.lastName, contact.phoneNumber)
        }
    }


    fun fetchAvatar(podMemberIdentifier: String): Flux<ByteArray> =
            podMemberRepository.fetchPodMemberEventStream(podMemberIdentifier)
                    .replay()
                    .autoConnect()
                    .filter { it.type == AVATAR_UPLOADED }
                    .map { it.payload }
                    .map { objectMapper.treeToValue(it, AvatarUploadedPayload::class.java) }
                    .map { it.identifier }
                    .flatMap { imageHandler.fetchImage(it) }

    fun savePodMemberEvent(podMemberIdentifier: String, bodyToMono: Mono<Event>): Publisher<Event> =
            bodyToMono.flatMap { event -> podMemberRepository.saveEvent(podMemberIdentifier, event) }

    fun savePodEvent(bodyToMono: Mono<String>): Publisher<String> =
            bodyToMono.flatMap {
                podRepository.saveEvent(it)
            }
}