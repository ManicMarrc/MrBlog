+++
title = "ECS in Rust"
date = "2023-05-26T12:34:51+07:00"
author = "ManicMarrc"
tags = ["Rust", "Game", "Tutorial"]
keywords = ["Rust", "Game", "Tutorial"]
description = "Benchmarking ECS libraries for Rust."
+++

## Introduction

Since I've already described [ECS](https://en.wikipedia.org/wiki/Entity_component_system) before on my previous post, I won't be explaining it here. If you want to learn more about that, you can do so here: [Learning about ECS](https://manicmarrc.github.io/MrBlog/posts/learning-about-ecs/). Basically it is a way to structure your code by using entities, components, and systems.

ECS is used a lot more in [Rust](https://www.rust-lang.org/) game development rather than anywhere else and the cause of that may be because Rust really likes the [composition over inheritance](https://en.wikipedia.org/wiki/Composition_over_inheritance) principle, like for example, using traits rather than inheritance.   
There is a lot of ECS libraries for Rust and in this post, we will be benchmarking a couple of ECS libraries that I found interesting.

## Libraries we will be covering

Libraries we will be covering for this post are:

- [Bevy ECS](https://crates.io/crates/bevy_ecs)
- [Edict](https://crates.io/crates/edict)
- [Hecs](https://crates.io/crates/hecs)
- [Shipyard](https://crates.io/crates/shipyard)

There are still a lot more ECS libraries for Rust, but these are the ones that I found interesting for some kind of reason.

**Note: Bevy ECS is actually a part of another library called [Bevy](https://bevyengine.org/) which is a full game framework**

## Benchmarks

The benchmarks for the libraries are gonna be:

- `unbatched_spawn`: Spawn `n` amount of entities by spawning them one by one.
- `batched_spawn`: Spawn `n` amount of entities batched
- `add_remove`: Add a component to `n` amount of entities and then remove the component
- `iter`: Iterate over `n` amount of entities
- `multiple_iter`: Iterate over `n` amount of entities with different components parallelly
- `multiple_iter_same`: Iterate over `n` amount of entities with the same components parallelly
- `iter_mut`: Iterate mutably over `n` amount of entities
- `multiple_iter_mut`: Iterate mutably over `n` amount of entities with different components parallelly
- `multiple_iter_mut_same`: Iterate mutably over `n` amount of entities with the same components parallelly

In the project page, `n` is three values: 1,000, 100,000, and 1,000,000. For this post, we're gonna cover only the last part. Be sure to check out the full project.

## Results

The full project is at [https://github.com/ManicMarrc/ecs_benchmark/tree/main](https://github.com/ManicMarrc/ecs_benchmark/tree/main).

### `unbatched_spawn`

![Violin Graph](https://raw.githubusercontent.com/ManicMarrc/ecs_benchmark/3c0d371b3af2cd1e2a5d1a170a06786e6660065b/target/criterion/unbatched_spawn/1000000/report/violin.svg)

As you can see from the graph, edict is the slowest of them and hecs being the fastest one. This is the only one time where Edict is slow as you'll see for the next few benchmarks.

### `batched_spawn`

![Violin Graph](https://raw.githubusercontent.com/ManicMarrc/ecs_benchmark/3c0d371b3af2cd1e2a5d1a170a06786e6660065b/target/criterion/batched_spawn/1000000/report/violin.svg)

You may have noticed that Edict isn't anywhere in this graph. That's because it is way faster than the others, so fast in fact, it's not even visible on the graph as the others are too slow!

### `add_remove`

![Violin Graph](https://raw.githubusercontent.com/ManicMarrc/ecs_benchmark/3c0d371b3af2cd1e2a5d1a170a06786e6660065b/target/criterion/add_remove/1000000/report/violin.svg)

Again in this graph, Edict is not visible at all. Bevy ECS being the slowest one out of all of them and Shipyard being the second fastest.

### `iter`

![Violin Graph](https://raw.githubusercontent.com/ManicMarrc/ecs_benchmark/3c0d371b3af2cd1e2a5d1a170a06786e6660065b/target/criterion/iter/1000000/report/violin.svg)

Are you seeing a pattern here? Cause I am. Basically the same as the `add_remove` benchmark with Bevy ECS being the slowest one.

### `multiple_iter`

![Violin Graph](https://raw.githubusercontent.com/ManicMarrc/ecs_benchmark/3c0d371b3af2cd1e2a5d1a170a06786e6660065b/target/criterion/multiple_iter/1000000/report/violin.svg)

Edict is actually visible on this graph being only one pixel. Again, the same pattern as the aforementioned benchmarks.

### `multiple_iter_same`

![Violin Graph](https://raw.githubusercontent.com/ManicMarrc/ecs_benchmark/3c0d371b3af2cd1e2a5d1a170a06786e6660065b/target/criterion/multiple_iter_same/1000000/report/violin.svg)

The pattern still repeats for this one.

### `iter_mut`

![Violin Graph](https://raw.githubusercontent.com/ManicMarrc/ecs_benchmark/3c0d371b3af2cd1e2a5d1a170a06786e6660065b/target/criterion/iter_mut/1000000/report/violin.svg)

This one is actually interesting. While Edict and Bevy ECS stays the same in their position, Shipyard and Hecs are fighting to be in the second position. Shipyard averagely performs better than Hecs, but sometimes, Hecs performs better than Shipyard.

### `multiple_iter_mut`

![Violin Graph](https://raw.githubusercontent.com/ManicMarrc/ecs_benchmark/3c0d371b3af2cd1e2a5d1a170a06786e6660065b/target/criterion/multiple_iter_mut/1000000/report/violin.svg)

This one follows the original pattern, nothing interesting.

### `multiple_iter_mut_same`

![Violin Graph](https://raw.githubusercontent.com/ManicMarrc/ecs_benchmark/3c0d371b3af2cd1e2a5d1a170a06786e6660065b/target/criterion/multiple_iter_mut_same/1000000/report/violin.svg)

For this one, Hecs gets kinda close to Shipyard but is still a little bit slower than it.

### Summary

Although Edict was the slowest one by far for the `unbatched_spawn` benchmark, it passed every other libraries in the other benchmarks.
Bevy ECS was by far the slowest one of them all, being last in every single benchmark except for the `unbatched_spawn` benchmark.
Hecs and Shipyard have close speed, with Shipyard being faster in most cases.

## Ending Off

Note that these benchmarks are ran on my super old computer which may affect the benchmark results. You can benchmark them yourself easily by just cloning the Github page and running `cargo bench` and wait a while.

That's all for this post, see you and goodbye!

