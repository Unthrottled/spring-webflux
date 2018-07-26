package io.acari.springwebflux.flux

import com.google.common.base.Preconditions
import io.acari.springwebflux.mono.MonoSinkHelper
import reactor.core.Disposable
import reactor.core.publisher.Flux
import reactor.core.publisher.FluxSink
import reactor.core.publisher.Mono
import reactor.core.publisher.MonoSink
import java.util.*
import java.util.function.Consumer

/**
 * Forged in the flames of battle by alex.
 */

//TODO: Would like this to be lazely evaluated
class NonBlockingIterableFlux<T>
/**
 * Stateful class, which allows for non-blocking
 * sequential access to items in provided flux stream.
 *
 *
 * It is a hot observable that buffers when it has
 * backpressure. It guarantees that all items where delivered
 * to somebody.
 *
 * @param source non-null flux source.
 * @throws NullPointerException when given null source
 */
(source: Flux<T>) : Disposable {
    private val itemBuffer = LinkedList<T>()
    private val callables = LinkedList<MonoSinkHelper<T>>()
    private val subscription: Disposable
    private var complete = false

    init {
        Preconditions.checkNotNull(source)
        val messaged = Flux.create<T> { stringFluxSink ->
            source.subscribe({ sourceItem -> emitNextItem(stringFluxSink, sourceItem) },
                    { this.accept(it) },
                    { this.run() })
        }
        subscription = messaged.subscribe()
    }

    /**
     * Cancel or dispose the underlying task or resource.
     */
    override fun dispose() {
        subscription.dispose()
        callables.forEach { it.success() }
    }

    /**
     * Think of this like a "Take a Number" queue.
     * When you `takeNext()` you are essentially asking
     * to be served when your number is called.
     * The order at which this is called determines what
     * item you get in the flux, ie the first call get the first element
     * and the second call gets the second item in the flux.
     *
     *
     * Some people ahead of you may leave, that's okay,
     * because you will get their item.
     *
     *
     * If you take a number that cannot fufilled
     * (the flux handed out all of it's items),
     * you will be notified by an empty return.
     *
     * @return An item in the flux based off of the current queue of callbacks.
     * or nothing if the flux has run out of items.
     */
    fun takeNext(): Mono<T> {
        return if (complete && itemBuffer.isEmpty()) {
            Mono.empty()
        } else if (itemBuffer.isEmpty()) {
            createCallback()
        } else {
            Mono.just(itemBuffer.poll())
        }
    }

    private fun createCallback(): Mono<T> {
        val stringConsumer = Consumer { tMonoSink: MonoSink<T> ->
            callables.offer(MonoSinkHelper(tMonoSink))
        }
        return Mono.create(stringConsumer)
    }

    private fun emitNextItem(stringFluxSink: FluxSink<T>, a: T) {
        if (callables.isEmpty()) {
            bufferItem(stringFluxSink, a)
        } else {
            emitToNextSubscribedCaller(stringFluxSink, a)
        }
    }

    private fun bufferItem(stringFluxSink: FluxSink<T>, a: T) {
        stringFluxSink.next(a)
        itemBuffer.offer(a)
    }

    private fun emitToNextSubscribedCaller(stringFluxSink: FluxSink<T>, a: T) {
        val nextPersonInLine = callables.poll()
        if (nextPersonInLine.isDisposed) {
            emitNextItem(stringFluxSink, a)
        } else {
            nextPersonInLine.success(a)
        }
    }


    private fun accept(b: Throwable) {
        callables.forEach { callable -> callable.error(b) }
    }

    private fun run() {
        callables.forEach { it.success() }
        complete = true
    }

}
