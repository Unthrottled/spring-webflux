Introduction
---

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
Both errors and completion terminate the sequence of events created from the publisher.-


Sources
---

http://projectreactor.io/docs/core/release/reference/