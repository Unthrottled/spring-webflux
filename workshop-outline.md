# Event Sourced Webflux Workshop!

## Introduction

We are tasked with developing an application that allows us to keep track of all of the members in **Pod Supreme**.

### Requirements!!

- Pod Supreme cares a lot about how the pod has grown overtime. 
    - Which means they like to look back overtime and see how things have changed. 

- In addition they also like not having to save their progress. 
  - Every action they take is deliberate, so be sure to capture information as it is put in!

- Pod Supreme asks that they be able to visualise all of the current members in there pod.

- Pod Supreme needs to be able to add new members and remove fellow friends that leave leave from the pod. 

- Pod Supreme members also want to be able to personalize their profile by being able to use an avatar of any image type (including animated gifs).

- Pod Supreme members want others to know how they can be contacted in an event of a question, whether it be by phone or email.

- Pod Supreme members want others to also know what they are currently interested in an the moment. 
The want the ability to add and remove interests as time progresses and they change.

## Current Application State

The frontend was built out to satisfy the functional portions of the requirements listed above.

All data that is added to the application is done through by using events in the form of a **Flux Standard Action** or **FSA**  for short
Which will be stored in as an event stream at the level of **Pod Supreme** and at the level of the **Pod Member**

A FSA maintains this type declaration. 

```javascript 1.8
{
  "type": string,
  "payload": any,
  "error": boolean,
  "meta": any
}
```

Basically the list of pod members in Pod Supreme can be projected by a distinct 
event stream and the details of each Pod Member can be projected using unique event 
stream for each pod member created.

However, only the frontend has built, all data persistence and projections have not been built yet.

Thankfully, they built all of it out it to a REST Contract!  

### REST Contract details

```javascript 1.8

```
