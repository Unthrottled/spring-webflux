package io.acari.springwebflux.models

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.node.MissingNode

/**
 * Forged in the flames of battle by alex.
 */
data class Identifier(val _id: String)

data class PersonalInformation(val interests: List<Interest>, override var email: String, override var firstName: String, override var lastName: String, override var phoneNumber: String): Contactable

data class Contact(override var email: String = "", override var firstName: String = "", override var lastName: String = "", override var phoneNumber: String= ""): Contactable

interface Contactable {
    var email: String
    var firstName: String
    var lastName: String
    var phoneNumber: String
}

data class Interest(val id: String, val value: String)

data class CapturedInfoPayload(val value: String, val field: String)

interface HasPodMember {
    val identifier: String
}

data class BasePodMemberPayload(override val identifier: String): HasPodMember

data class Event(val type: String ="",
                 val payload: JsonNode = MissingNode.getInstance(),
                 val error: Boolean = false,
                 val meta: JsonNode = MissingNode.getInstance())