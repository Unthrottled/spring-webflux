Introduction to Reactive Programming
---
What does _reactive_ mean?
---

Means many things to many people.

Project reactor defines it as:

>Reactive programming is an asynchronous programming paradigm concerned with data streams and the propagation of change. This means that it becomes possible to express static (e.g. arrays) or dynamic (e.g. event emitters) data streams with ease via the employed programming language(s).


The folks over at spring say:

>The term "reactive" refers to programming models that are built around reacting to change — network component reacting to I/O events, UI controller reacting to mouse events, etc. 

>In that sense non-blocking is reactive because instead of being blocked we are now in the mode of reacting to notifications as operations complete or data becomes available.

There is even a **Reactive Manifesto** which defines *Reactive Systems* as the following:

Systems that are Responsive, Resilient, Elastic and Message Driven.

Reactive Systems are:

##### Responsive
 Responsiveness means request are almost always handled in a timely manner if at all possible. 
 
 This is the cornerstone of usability and utility. Even more than that, responsiveness means that problems may be detected quickly and dealt with effectively. 
 
 Systems that are responsive focus on providing rapid and consistent response times.
 While establishing reliable upper bounds, so they deliver a consistent quality of service. 
 
 This consistent behaviour in turn simplifies error handling, builds end-user confidence, and encourages further interaction.
  
###### Resilient
   The system stays responsive in the face of failure. 
   This applies not only to highly-available, mission-critical systems — any system that is not resilient will be unresponsive after a failure. 
   Resilience is achieved by replication, containment, isolation and delegation. 
   Failures are contained within each component, isolating components from each other and thereby ensuring that parts of the system can fail and recover without compromising the system as a whole. 
   Recovery of each component is delegated to another (external) component and high-availability is ensured by replication where necessary. The client of a component is not burdened with handling its failures.

###### Elastic
 
 The system stays responsive under varying workload. 
 Reactive Systems can react to changes in the input rate by increasing or decreasing the resources allocated to service these inputs. 
 This implies designs that have no contention points or central bottlenecks, resulting in the ability to shard or replicate components and distribute inputs among them. 
 Reactive Systems support predictive, as well as Reactive, scaling algorithms by providing relevant live performance measures. 
 They achieve elasticity in a cost-effective way on commodity hardware and software platforms.
 
###### Message Driven: 

Reactive Systems rely on asynchronous message-passing to establish a boundary between components that ensures loose coupling, 
isolation and location transparency. 

This boundary also provides the means to delegate failures as messages. 
Employing explicit message-passing enables load management, elasticity, and flow control by shaping and monitoring the message queues in the system and applying back-pressure when necessary. 
Location transparent messaging as a means of communication makes it possible for the management of failure to work with the same constructs and semantics across a cluster or within a single host. 
Non-blocking communication allows recipients to only consume resources while active, leading to less system overhead.

#### Reactive Streams.org

Handling streams of data—especially “live” data whose volume is not predetermined—requires special care in an asynchronous system. The most prominent issue is that resource consumption needs to be controlled such that a fast data source does not overwhelm the stream destination. Asynchrony is needed in order to enable the parallel use of computing resources, on collaborating network hosts or multiple CPU cores within a single machine.

The main goal of Reactive Streams is to govern the exchange of stream data across an asynchronous boundary—think passing elements on to another thread or thread-pool—while ensuring that the receiving side is not forced to buffer arbitrary amounts of data.

Who?
---

(May not be as important)

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

Multi-Threading, is this how I get the most bang for the buck?

Large number of performance bottle-necks, as mentioned above are when processes are waiting for input and output I/O. 
Whether it be a network call, reading from disk, or even a database query. 
There is a way to reach the past the point of diminishing returns when introducing concurrency and throwing more threads at a problem.
The CPU can only do so many things at once, and adding more threads exacerbates the problem.

When a thread is blocked, no work is being done by that thread. 
If another thread is added, to work on a similar process, eventually that thread is going to block as well.
The more threads that are spawned to work, the less efficient the tasks become.

The OS scheduler, is going to let a thread get N amount of clock time, and then it is going to context switch (which can amount to  be a fairly expensive operation).
Which involves moving things out of the memory cache, loading up next context of the thread and then trying to process a threads work.

The more threads that are in need of being processed, the more the context switching needs to happen.
As more and more threads spin up, there is point where **thrashing** occurs. 
Which means that all work being done for the all of the clock cycles is just setting up thread context, not doing any work (no time), and tearing down for the next thread to be processed.

Which means that the biggest bang for our buck would be having a few active threads that are always doing work.
This can be done by utilizing a **Non-Blocking** programming paradigm. 
A **push-based** does not necessarily need to block work from happening. 
When data is processed in time, then it will be directed to where it needs to go.
Where as **pull-based** call says, `Hey, you cannot continue down the rest of this code until this one thing happens.`.
Which essentially _blocks_ the program's flow until it can continue to be processed.

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

#### Spring

Why was Spring WebFlux created?

Part of the answer is the need for a non-blocking web stack to handle concurrency with a small number of threads and scale with less hardware resources. Servlet 3.1 did provide an API for non-blocking I/O. However, using it leads away from the rest of the Servlet API where contracts are synchronous (Filter, Servlet) or blocking (getParameter, getPart). This was the motivation for a new common API to serve as a foundation across any non-blocking runtime. That is important because of servers such as Netty that are well established in the async, non-blocking space.

The other part of the answer is functional programming. Much like the addition of annotations in Java 5 created opportunities — e.g. annotated REST controllers or unit tests, the addition of lambda expressions in Java 8 created opportunities for functional APIs in Java. This is a boon for non-blocking applications and continuation style APIs — as popularized by CompletableFuture and ReactiveX, that allow declarative composition of asynchronous logic. At the programming model level Java 8 enabled Spring WebFlux to offer functional web endpoints alongside with annotated controllers.

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

- A Cold sequence starts anew for each Subscriber, including at the source of data.
 If the source wraps an HTTP call, a new HTTP request is made for each subscription.
- A Hot sequence does not start from scratch for each Subscriber.
 Rather, late subscribers receive signals emitted after they subscribed. 
 Note, however, that some hot reactive streams can cache or replay the history of emissions totally or partially. 
 From a general perspective, a hot sequence can even emit when no subscriber is listening
  (an exception to the "nothing happens before you subscribe" rule).

How?
---

#### Wikipedia
In computer science, the event loop, message dispatcher, message loop, message pump, or run loop is a programming construct that waits for and dispatches events or messages in a program. It works by making a request to some internal or external "event provider" (that generally blocks the request until an event has arrived), and then it calls the relevant event handler ("dispatches the event")

The reactor design pattern is an event handling pattern for handling service requests delivered concurrently to a service handler by one or more inputs. The service handler then demultiplexes the incoming requests and dispatches them synchronously to the associated request handlers.[1]
![demultiplexes](https://en.wikipedia.org/wiki/Multiplexing#/media/File:Multiplexing_diagram.svg)

An actor is a computational entity that, in response to a message it receives, can concurrently:

- send a finite number of messages to other actors;
- create a finite number of new actors;
- designate the behavior to be used for the next message it receives.



### THINGS TO COVER
- Reactor multi subscribe
- Parallelization
- Schedulers
- Repeat, retry, replay
- Reduction
- errors
- Merging
- Debugging
- Testing
- Netty
- Event Loop/Reactor/Actors
- Tuples in reactor
- Annotations/Functional routers
- Streaming multiparts?

###spring 

There is also another important mechanism that we on the Spring team associate with "reactive" and that is non-blocking back pressure. In synchronous, imperative code, blocking calls serve as a natural form of back pressure that forces the caller to wait. In non-blocking code it becomes important to control the rate of events so that a fast producer does not overwhelm its destination.

Reactive Streams is a small spec, also adopted in Java 9, that defines the interaction between asynchronous components with back pressure. For example a data repository — acting as Publisher, can produce data that an HTTP server — acting as Subscriber, can then write to the response. The main purpose of Reactive Streams is to allow the subscriber to control how fast or how slow the publisher will produce data.

- Annotated Controllers — consistent with Spring MVC, and based on the same annotations from the spring-web module. Both Spring MVC and WebFlux controllers support reactive (Reactor, RxJava) return types and as a result it is not easy to tell them apart. One notable difference is that WebFlux also supports reactive @RequestBody arguments.

- Functional Endpoints — lambda-based, lightweight, functional programming model. Think of this as a small library or a set of utilities that an application can use to route and handle requests. The big difference with annotated controllers is that the application is in charge of request handling from start to finish vs declaring intent through annotations and being called back.


Below are some specific points to consider:

- If you have a Spring MVC application that works fine, there is no need to change. Imperative programming is the easiest way to write, understand, and debug code. You have maximum choice of libraries since historically most are blocking.
- If you are already shopping for a non-blocking web stack, Spring WebFlux offers the same execution model benefits as others in this space and also provides a choice of servers — Netty, Tomcat, Jetty, Undertow, Servlet 3.1+ containers, a choice of programming models — annotated controllers and functional web endpoints, and a choice of reactive libraries — Reactor, RxJava, or other.
- If you are interested in a lightweight, functional web framework for use with Java 8 lambdas or Kotlin then use the Spring WebFlux functional web endpoints. That can also be a good choice for smaller applications or microservices with less complex requirements that can benefit from greater transparency and control.
- In a microservice architecture you can have a mix of applications with either Spring MVC or Spring WebFlux controllers, or with Spring WebFlux functional endpoints. Having support for the same annotation-based programming model in both frameworks makes it easier to re-use knowledge while also selecting the right tool for the right job.
- A simple way to evaluate an application is to check its dependencies. If you have blocking persistence APIs (JPA, JDBC), or networking APIs to use, then Spring MVC is the best choice for common architectures at least. It is technically feasible with both Reactor and RxJava to perform blocking calls on a separate thread but you wouldn’t be making the most of a non-blocking web stack.
- If you have a Spring MVC application with calls to remote services, try the reactive WebClient. You can return reactive types (Reactor, RxJava, or other) directly from Spring MVC controller methods. The greater the latency per call, or the interdependency among calls, the more dramatic the benefits. Spring MVC controllers can call other reactive components too.
- If you have a large team, keep in mind the steep learning curve in the shift to non-blocking, functional, and declarative programming. A practical way to start without a full switch is to use the reactive WebClient. Beyond that start small and measure the benefits. We expect that for a wide range of applications the shift is unnecessary. If you are unsure what benefits to look for, start by learning about how non-blocking I/O works (e.g. concurrency on single-threaded Node.js) and its effects.

Spring WebFlux is supported on Tomcat, Jetty, Servlet 3.1+ containers, as well as on non-Servlet runtimes such as Netty and Undertow. All servers are adapted to a low-level, common API so that higher level programming models can be supported across servers.

Reactive and non-blocking generally do not make applications run faster.
The key expected benefit of reactive and non-blocking is the ability to scale with a small, fixed number of threads and less memory. That makes applications more resilient under load because they scale in a more predictable way. In order to observe those benefits however you need to have some latency including a mix of slow and unpredictable network I/O. That’s where the reactive stack begins to show its strengths and the differences can be dramatic.

In Spring WebFlux, and non-blocking servers in general, it is assumed that applications will not block, and therefore non-blocking servers use a small, fixed-size thread pool (event loop workers) to handle request

###### Invoking a Blocking API

What if you do need to use a blocking library? Both Reactor and RxJava provide the publishOn operator to continue processing on a different thread. That means there is an easy escape latch. Keep in mind however that blocking APIs are not a good fit for this concurrency model.


###### Threading Model

What threads should you expect to see on a server running with Spring WebFlux?

- On a "vanilla" Spring WebFlux server (e.g. no data access, nor other optional dependencies), you can expect one thread for the server, and several others for request processing (typically as many as the number of CPU cores). Servlet containers, however, may start with more threads (e.g. 10 on Tomcat), in support of both servlet, blocking I/O and servlet 3.1, non-blocking I/O usage.
- The reactive WebClient operates in event loop style. So you’ll see a small, fixed number of processing threads related to that, e.g. "reactor-http-nio-" with the Reactor Netty connector. However if Reactor Netty is used for both client and server, the two will share event loop resources by default.
- Reactor and RxJava provide thread pool abstractions, called Schedulers, to use with the publishOn operator that is used to switch processing to a different thread pool. The schedulers have names that suggest a specific concurrency strategy, e.g. "parallel" for CPU-bound work with a limited number of threads, or "elastic" for I/O-bound work with a large number of threads. If you see such threads it means some code is using a specific thread pool Scheduler strategy.
- Data access libraries and other 3rd party dependencies may also create and use threads of their own.

##### Jackson

The decoder relies on Jackson’s non-blocking, byte array parser to parse a stream of byte chunks into a TokenBuffer stream, which can then be turned into Objects with Jackson’s ObjectMapper. JSON and Smile (binary JSON) data formats are currently supported.

- The encoder processes a Publisher<?> as follows:
- if the Publisher is a Mono (i.e. single value), the value is encoded when available.
- if media type is application/stream+json for JSON or application/stream+x-jackson-smile for Smile, each value produced by the Publisher is encoded individually (and followed by a new line in JSON).

otherwise all items from the Publisher are gathered in with Flux#collectToList() and the resulting collection is encoded as an array.
As a special case to the above rules the ServerSentEventHttpMessageWriter feeds items emitted from its input Publisher individually into the Jackson2JsonEncoder as a Mono<?>.
Note that both the Jackson JSON encoder and decoder explicitly back out of rendering elements of type String. Instead String's are treated as low level content, (i.e. serialized JSON) and are rendered as-is by the CharSequenceEncoder. If you want a Flux<String> rendered as a JSON array, you’ll have to use Flux#collectToList() and provide a Mono<List<String>> instead.

##### HTTP Streaming
      
Same in Spring MVC

When a multi-value, reactive type such as Flux is used for response rendering, it may be collected to a List and rendered as a whole (e.g. JSON array), or it may be treated as an infinite stream with each item flushed immediately. The determination for which is which is made based on content negotiation and the selected media type which may imply a streaming format (e.g. "text/event-stream", "application/stream+json"), or not (e.g. "application/json").

When streaming to the HTTP response, regardless of the media type (e.g. text/event-stream, application/stream+json), it is important to send data periodically, since the write would fail if the client has disconnected. The send could take the form of an empty (comment-only) SSE event, or any other data that the other side would have to interpret as a heartbeat and ignore.

Spring WebFlux does not support suffix pattern matching — unlike Spring MVC, where a mapping such as /person also matches to /person.*

Some annotated controller method arguments that represent String-based request input — e.g. @RequestParam, @RequestHeader, @PathVariable, @MatrixVariable, and @CookieValue, may require type conversion if the argument is declared as something other than String.


Spring WebFlux, unlike Spring MVC, supports reactive types in the model, e.g. Mono<Account> or io.reactivex.Single<Account>. An @ModelAttribute argument can be declared with or without a reactive type wrapper, and it will be resolved accordingly, to the actual value if necessary. Note however that in order to use a BindingResult argument, you must declare the @ModelAttribute argument before it without a reactive type wrapper, as shown earlier. Alternatively, you can handle any errors through the reactive type:

##### Functional endpoints

Spring WebFlux includes a lightweight, functional programming model in which functions are used to route and handle requests and contracts are designed for immutability.

>For example, given a Publisher that is not a Mono, the Jackson JSON message writer expects multiple values. If the media type implies an infinite stream — e.g. "application/json+stream", values are written and flushed individually; otherwise values are buffered into a list and rendered as a JSON array.



Project Reactor
---

[Threading stuffs](http://projectreactor.io/docs/core/release/reference/#schedulers)

[Error Stuffs](http://projectreactor.io/docs/core/release/reference/#error.handling)

[How to make a hot stream](http://projectreactor.io/docs/core/release/reference/#_safely_produce_from_multiple_threads_by_using_the_code_sink_code_facade)

[Tasty Kotlin Extensions](http://projectreactor.io/docs/core/release/reference/#kotlin-extensions)

[Connectable flux](http://projectreactor.io/docs/core/release/reference/#advanced-broadcast-multiple-subscribers-connectableflux)


Sources
---

- http://projectreactor.io/docs/core/release/reference/
- https://vertx.io/docs/guide-for-java-devs/guide-for-java-devs.pdf
- http://netty.io/wiki/user-guide-for-4.x.html
- https://en.wikipedia.org/wiki/Event_loop
- https://en.wikipedia.org/wiki/Actor_model
- https://en.wikipedia.org/wiki/Reactor_pattern
- https://docs.spring.io/spring/docs/current/spring-framework-reference/web-reactive.html
- https://github.com/reactor/reactor
- https://github.com/reactive-streams/reactive-streams-jvm/blob/v1.0.2/README.md