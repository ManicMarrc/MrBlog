+++
title = "Learning about ECS"
date = "2023-05-26T02:09:50+07:00"
author = "ManicMarrc"
tags = ["Game", "Tutorial"]
keywords = ["Game", "Tutorial"]
description = "Learning what, why, and when about ECS."
+++

## Introduction

[ECS](https://en.wikipedia.org/wiki/Entity_component_system) is a very important part of game developing. In fact, one of the most popular game engines in the world, [Unity](https://unity.com/), actually uses ECS. In this post, we will cover what ECS is, explain it's pros and cons, and compare some of the popular ECS libraries I found for Rust.

## What is ECS?

ECS is a programming pattern where you have three kinds of objects: Entities, Components, and Systems.

Entities are objects that holds components. For example, this can be an enemy, a player, a powerup, and even the ground.

Components are labels for an entity that holds data. For example, a health component that holds how much health the entity has, a damage component that holds how much damage does the entity deal, and a move side to side component that doesn't hold any data but just labels the entity that it moves side to side.

Systems are functions that operate on entities that has the desired components. For example, say we have a move side to side component and a position component, we can create a system that operate on the move side to side component and change the position component.

## Why should I use ECS?

ECS is fast and that is because it is data-oriented which allows for systems to operate on data optimally.   
ECS also allows for multi-threading and parallel-processing as only few systems need to operate on the same components needed by other systems.   
ECS also seperates data from behaviour, this forces [composition over inheritance](https://en.wikipedia.org/wiki/Composition_over_inheritance) which is always a good thing.   
ECS also makes it easier to add a new component to an entity, as for example with [OOP](https://en.wikipedia.org/wiki/Object-oriented_programming), to extend a class you will have to use [inheritance](https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming) which can introduce a lot of problems especially multiple inheritance.   
ECS also makes components really easy to reuse even in other projects as they don't depend on other components.

## Why shouldn't I use ECS?

ECS provide is a lot more complex as instead of making a whole class for an enemy, we will have to make several components like health, damage, position, and others and also make systems for that one object.   
ECS also makes it harder to debug. How do we debug an entity? How do we know the entity we're debugging is actually the entity we want? What is the components on that entity? These are all hard to do with ECS.

## When should I use ECS?

I recommend you to use ECS when you're making a full game as it provides a ton of scalability and not use it if you're just prototyping a game as it provides a ton of complexities. Of course, it is a matter of preference and I recommend you to try ECS and get a feel on it and maybe even try to make a medium sized game on it.

## Ending off

ECS is an interesting, yet untalked part of game development. It is useful and fast yet a little complex and hard to debug efficiently.

Anywho, that's all that I can write for this post, hope you're more interested in the topic of the post, see you and goodbye!

