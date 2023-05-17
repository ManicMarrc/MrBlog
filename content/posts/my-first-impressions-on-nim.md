+++
title = "My First Impressions on Nim"
date = "2023-05-17T16:07:56+07:00"
author = "ManicMarrc"
tags = ["Nim", "Impressions", "Programming Language"]
keywords = ["Nim", "Impressions", "Programming Language"]
description = "Using Nim for the first time."
+++

## Introduction

[Nim](https://nim-lang.org/) is a statically typed compiled systems programming language. It is a high-level programming language in the likes of [Python](https://www.python.org/). It can compile to [C](https://en.wikipedia.org/wiki/C_(programming_language)), [C++](https://en.wikipedia.org/wiki/C%2B%2B), and even [JavaScript](https://en.wikipedia.org/wiki/JavaScript).   
In this post, we'll be covering what's my opinion on it and what differentiates it from other programming languages.

***Note: This is a first impression. Take it with a grain of salt.***

## My first impressions

Just like [my first impressions on Zig](https://manicmarrc.github.io/MrBlog/posts/my-first-impressions-on-zig/), I created a Brainfuck interpreter in Nim (which you can check out here: [https://github.com/ManicMarrc/Mindfreak/tree/main/nim](https://github.com/ManicMarrc/Mindfreak/tree/main/nim)).

What I first noticed about Nim was that it was fast while still maintaining simplicity. Most often, a programming language chooses between speed and simplicity. Python chooses simplicity, while C chooses speed. Nim stays in the middle, not being faster than C and not being simpler than Python.

Nim also has an interesting and quite simple macro system. While I didn't use it for the Brainfuck interpreter, just reading the docs it seems simpler than other programming languages while still being flexible.

Nim also contains builtin packages for interacting with the web! Someone even wrote snake using just Nim: [https://github.com/dom96/snake](https://github.com/dom96/snake)! In most programming languages, it's a hassle to even compile them to be able to be used on the web.

Nim also has a package manager called [Nimble](https://github.com/nim-lang/nimble) which is always a win in my book.

The only negative I can think of on the top of my head, would be that it's lsp is sometimes kinda wack. But apart from that I can't think of anything else.

## Comparisons with popular programming languages

Although Nim has their own comparisons from [C](https://github.com/nim-lang/Nim/wiki/Nim-for-C-programmers), [Python](https://github.com/nim-lang/Nim/wiki/Nim-for-Python-Programmers), [JavaScript/TypeScript](https://github.com/nim-lang/Nim/wiki/Nim-for-TypeScript-Programmers) written in their [wiki](https://github.com/nim-lang/Nim/wiki), I will be covering interesting stuff I found while using Nim.

- Fast, just like C
- Compiled, just like C
- Manual memory management, just like C
- Indentation Based, just like Python
- Garbage Collected, just like Python
- Statically typed, just like C and TypeScript
- Exceptions, unlike C
- Operator/Function Overloading, unlike C and JavaScript/TypeScript

## Ending off

Nim is a very powerful programming language, with the simplicity of Python and the speed of C. Nim has the capability of taking over Python, but I don't think it'll do that for a while. Nim is still quite young with it's 1.0 released only 4 years ago. Nim is perfect for scripting that needs to be fast.

Of course, you should be trying it out for yourself to get your own opinion on Nim. Nim can easily be downloaded using [choosenim](https://github.com/dom96/choosenim) and there are probably some extensions for your editor.

Again, take my word with a grain of salt. I'm only someone that loves programming, and not some kind of god of programming languages. I ***highly*** recommend you to try Nim out for yourself.

That's all that I had to say. Hope you've had fun reading this and see you later!

