package io.acari.springwebflux.models

/**
 * Forged in the flames of battle by alex.
 */
data class Identifier(val _id: String)

data class PersonalInformation(
        val interests: List<Interest>,
        val email: String,
        val firstName: String,
        val lastName: String,
        val phoneNumber: String
)

data class Interest(val id: String, val value: String)