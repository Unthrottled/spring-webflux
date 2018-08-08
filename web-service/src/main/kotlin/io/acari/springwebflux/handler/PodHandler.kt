package io.acari.springwebflux.handler

import com.mongodb.reactivestreams.client.MongoClient
import io.acari.springwebflux.models.Identifier
import io.acari.springwebflux.models.Interest
import io.acari.springwebflux.models.PersonalInformation
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

/**
 * Forged in the flames of battle by alex.
 */

@Service
class PodHandler(private val reactiveMongoClient: MongoClient,
                 private val imageHandler: ImageHandler){

    fun allPodMembers(): Flux<Identifier> =
            Flux.range(0,10)
                    .map { Identifier(it.toString()) }

    fun fetchInterests(pathVariable: String): Mono<PersonalInformation> =
        Mono.just(PersonalInformation(listOf(Interest("0987654321", "Just Monika")), "party@parrot.io","Party", "Parrot", "0987654321"))

    private val list = listOf(
            "5b5a5f8dac546f00013b37a9",
            "5b5a6091ac546f00013b37ab",
            "5b5a6094ac546f00013b37ad",
            "5b5a60b2ac546f00013b37af"
    )
    private var index=-1

    fun fetchAvatar(pathVariable: String): Flux<ByteArray> {
        index = (++index % list.size)
        return imageHandler.fetchImage(list[index])
    }
//            Flux.from(reactiveMongoClient..find())
//            .map { it.getId() }
//            .map { it.asObjectId() }
//            .map { it.getValue() }
//            .map { it.toHexString() }
//            .map { Identifier(it) }

}