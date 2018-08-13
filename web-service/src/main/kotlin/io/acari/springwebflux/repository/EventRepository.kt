package io.acari.springwebflux.repository

import io.acari.springwebflux.models.Event
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository

/**
 * Forged in the flames of battle by alex.
 */

@Repository
interface EventRepository: ReactiveCrudRepository<String, String>