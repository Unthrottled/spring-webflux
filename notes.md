Introduction
---
Why?
---

Modern applications have the ability to reach huge numbers of concurrent users.
Even though the capabilities of modern hardware have continued to improve,
 performance of modern software is still a key concern.
 
There are at least two general programming paradigms that can improve a program’s performance:

    1. parallelize: use more threads and more hardware resources.
    1. seek more efficiency in how current resources are used.

Java developers have the ability to easily write programs using blocking code. 
This practice is fine until there is a performance bottleneck arises.
A solution would be to introduce even more threads threads, running similar blocking code.
Scaling in resource utilization can quickly introduce thread contention and concurrency problems.

Worse still, all of those new threads are just sitting there blocking and wasting resources. 
If you look closely, as soon as a program involves some latency 
(notably I/O, such as a database request or a network call), resources are wasted because a thread (or many threads) now are sitting idle, waiting for responses.

So the parallelization approach is not a silver bullet. 
However, it is necessary in order to harness the full power of the hardware.


Multi-Threading, how do I get the most bang for the buck?

Large number of performance bottle-necks, as mentioned above are when processes are waiting for input and output I/O. 
Whether it be a network call, reading from disk, or even a database query. 
There is a way to reach the past the point of diminishing returns when introducing concurrency and throwing more threads at a problem.
The CPU can only do so many things at once, and adding more threads exacerbates the problem.

When a thread is blocked, no work is being done by that thread. 
If another thread is added, to work on a similar process, eventually that thread is going to block as well.
The more threads that are spawned to work, the less efficient the tasks become.

The OS scheduler, is going to let a thread get N amount of clock time, and then it is going to context switch (which is a fairly expensive operation).
Which involves moving things out of the memory cache, loading up next context of the thread and then trying to process a threads work.

The more threads that are in need of being processed, the more the context switching needs to happen.
As more and more threads spin up, there is point where **Thrashing** occurs. 
Which means that all work being done for the all of the clock cycles is just setting up thread context, not doing any work (no time), and tearing down for the next thread to be processed.

Which means that the biggest bang for our buck would be having a few active threads that are always doing work.
This can be done by utilizing a **Non-Blocking** programming paradigm. 
A **push-based** does not necessarily need to block work from happening. 
When data is processed in time, then it will be directed to where it needs to go.
Where as **pull-based** call says, `Hey, you cannot continue down the rest of this code until this one thing happens.`.
Which essentially _blocks_ the program's flow until it can continue to be processed.

### Definition (from reactor)

>Reactive programming is an asynchronous programming paradigm concerned with data streams and the propagation of change. This means that it becomes possible to express static (e.g. arrays) or dynamic (e.g. event emitters) data streams with ease via the employed programming language(s).

The reactive programming paradigm is often presented in object-oriented languages as an extension of the Observer design pattern.

One can also compare the main reactive streams pattern with the familiar Iterator design pattern. 
There is a duality to the Iterable-Iterator pair and Reactive Streams. 

One major difference is that, an Iterator is **pull-based**, reactive streams are **push-based**.
Using an iterator is an imperative programming pattern, 
even though the method of accessing values is solely the responsibility of the Iterable.

Indeed, it is up to the developer to choose when to access the `next()` item in the sequence. 
In reactive streams, the equivalent of the above pair is **Publisher-Subscriber**. 
It is the `Publisher` that notifies the `Subscriber` of any newly available values as they come. 
The push aspect of this paradigm is the key to being reactive. 

Also, operations applied to pushed values are expressed declaratively rather than imperatively: 
the programmer expresses the logic of the computation rather than describing its exact control flow.

In addition to pushing values, the error handling and completion aspects are also covered in a well defined manner. 
A Publisher can push new values to its Subscriber, but can also signal an error, or completion. 
Both errors and completion terminate the sequence of events created from the publisher.

### From Imperative to Reactive Programming

Are very, very, very, very, much like Java 8's streams.

- Data as a flow manipulated with a rich vocabulary of operators
- Nothing happens until you subscribe
- Backpressure or the ability for the consumer to signal the producer that the rate of emission is too high (buffering)
- High level but high value abstraction that is concurrency-agnostic

#### Types of Streams 

In the Rx family of reactive libraries,
 one can distinguish two broad categories of reactive sequences: **hot** and **cold**.
This distinction mainly has to do with how the reactive stream reacts to subscribers:

- A Cold sequence starts anew for each Subscriber, including at the source of data. If the source wraps an HTTP call, a new HTTP request is made for each subscription.
- A Hot sequence does not start from scratch for each Subscriber. Rather, late subscribers receive signals emitted after they subscribed. Note, however, that some hot reactive streams can cache or replay the history of emissions totally or partially. From a general perspective, a hot sequence can even emit when no subscriber is listening (an exception to the "nothing happens before you subscribe" rule).

Sources
---

http://projectreactor.io/docs/core/release/reference/