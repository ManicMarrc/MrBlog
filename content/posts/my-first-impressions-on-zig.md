+++
title = "My First Impressions on Zig"
date = "2023-05-08T16:50:41+07:00"
author = "ManicMarrc"
tags = ["Zig", "Impressions", "Programming Language"]
keywords = ["Zig", "Impressions", "Programming Language"]
description = "My first time using Zig and whats my first impressions on it"
+++

## Introduction

[Zig](https://ziglang.org/) is a new low-level programming language that is the "modern alternative to C". I like low-level programming languages and I never tried Zig before. So in this post I'll describe what my first impressions on it and what I think of it and we'll answer the question of "Will Zig replace C?".

## What is Zig?

"Zig is a general-purpose programming language and toolchain for maintaining robust, optimal and reusable software." is what it says on the [official website](https://ziglang.org). Zig is a compiled low-level programming language that was made to replace [C](https://en.wikipedia.org/wiki/C_programming_language). Zig was made by Andrew Keller which has his own blog at [https://andrewkelley.me/](https://andrewkelley.me).
Zig is a new language, in fact at the time of writing this post, Zig has still not reached 1.0. What that means is that Zig has barely any tooling (LSPs, Package Managers, etc).

## My first impressions

When I want to learn a new programming language, I always go to writing one thing, which would be a [Brainfuck](https://en.wikipedia.org/wiki/Brainfuck) interpreter because it teaches me about how to read files, how to use arrays, how to use loops, and all that stuff. And I did the same thing to learn Zig.   
If you want to read the source code for this Brainfuck Interpreter in Zig, you can go here: [https://github.com/ManicMarrc/zbfi](https://github.com/ManicMarrc/zbfi).   
Zig has an amazing language reference which can be found here: [https://ziglang.org/documentation/0.10.1](https://ziglang.org/documentation/0.10.1).

Here are my positives and negatives.

### Positives

These would be my favorite features of Zig so far.

#### Operators

Zig has so many quality of life operators.   
My favorite would be the `+%`, `-%`, `+|` and `-|` operators.   

The `+%` and `-%` operator is a wrapping operator that behaves like the original operator, but if the number goes above the maximum value it can hold (e.g. `u8` would be 255) it would go to the minimum value it can hold (e.g. `u8` would be 0) and the opposite if it goes below the minimum. For example:

```zig
var num: u8 = 255;
num +%= 1;
std.debug.print("{}", .{num}); // 0
num -%= 1;
std.debug.print("{}", .{num}); // 255
```

The `+|` and `-|` operator is a saturating operator that behaves like the original operator, but the number cannot go above the maximum and below the minimum and instead just not change. For example:

```zig
var num: u8 = 0;
num -|= 1;
std.debug.print("{}", .{num}); // 0
num = 255;
num +|= 1;
std.debug.print("{}", .{num}); // 255
```

In other programming languages, this would have to be done with an if statement, and so I really like this feature.

#### The `defer` statement

Zig has the `defer` statement which might be my favorite feature in all of programming languages. The `defer` statenent basically will execute an expression at the end of the scope/block even if there is an early return or an exception. This is really useful especially in lower-level languages as it can help with deallocating objects and making sure there aren't any memory leaks.

### Negatives

While Zig is a pretty great programming language, there are still some things that is not that great but mostly because Zig is still a brand new programming language.

#### Lacking good std documentation

The [std documentation](https://ziglang.org/documentation/0.10.1/std) for Zig is still lacking for the most part. Here are problems that I found:

- Sometimes its missing some documentation for some structs even though the struct is public
- Clicking on a struct within a function parameter doesn't redirect to the structs documentation
- The fields on a struct does not redirect to the field types documentation
- Doesn't have any documentation for the builtin types like `u8`.

#### No package managers

Zig currently has no official package manager at the moment. In this day and age, a package manager is almost certainly needed as it can help people use each others code and Zig currently has no official package manager. However, Zig does have a plan to add a package manager on their Github: [https://github.com/ziglang/zig/projects/4](https://github.com/ziglang/zig/projects/4).

### Neutrals

These are features that I don't really like nor do I not like.

#### Allocators

What I first learned about Zig is that it is *really* low-level just like C, meaning we have to allocate and deallocate each object we want to create. Also, in Zig there are so many types of allocator that they even have a documentation for it: [https://ziglang.org/documentation/0.10.1/#Choosing-an-Allocator](https://ziglang.org/documentation/0.10.1/#Choosing-an-Allocator). I don't really have an opinion on this one, as on one side it complicates things and on the other side ~~it makes me feel cool~~ Zig *is* a low-level programming language.

## Ending off

In my opinion, Zig is an awesome language with the only thing holding it back is its age. I will definitely use more of it in the future and make projects with it.   

Now, to answer the question of "Will Zig replace C?": Never. Not because Zig sucks or anything, but because C is just an everlasting programmin language. What Zig *will* do, is be an alternative to C, just like Rust is.

Anyways, that's all that I have to say. Hope you had fun reading this! Goodbye!

