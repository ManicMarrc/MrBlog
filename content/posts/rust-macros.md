+++
title = "Rust Macros"
date = "2023-05-04T14:49:53+07:00"
author = "ManicMarrc"
tags = ["Rust", "Tutorial"]
keywords = ["Rust", "Tutorial"]
description = "Learning about macros in Rust"
+++

## Introduction

Rust, just like other C, has macros. Although they are very different.   
C macros are like functions but instead, in the compiling stage every occurence of them gets replaced by the block of code they has inside them.   
Rust macros work like C macros in the sense that they get replaced while compiling, but Rust macros has 3 ways to call them:

1. Function-likes
2. Attributes
3. Derivables

Rust macros also has 2 ways of writing them:

1. Declarative
2. Procedural

In this post, we'll explain each and every one of them.

## Why macros?

You might ask yourself, "Why not just use regular functions?", well the answer to that is, macros can take a variable amount of arguments, macros can work on a token level which means they can change the source code, while compiling. Bet your functions can't do that 😎.

## Calling macros

As mentioned earlier, there are 3 kinds of macros.

### Function-like macros

Function-like macros are called like functions but right before the left parentheses `(`, it has an exclamation mark `!`. Examples of function-like macros are `println!` and `vec!`.

```rust
println!("Hello, World!")
```

The pros of using this kind of macros instead of the other, would be that it's the simplest to write.

### Attributes

Attribute macros are macros that can be added into any Rust [items](https://doc.rust-lang.org/reference/items.html). These are pretty rare from what I've seen with the only one I've seen are from [`tokio`](https://crates.io/crates/tokio) and [`macroquad`](https://crates.io/crates/macroquad) crates. Examples of attribute macros are `tokio::main`.

```rust
#[tokio::main]
async fn main() {}
```

The pros of using this kind of macro instead of using a derivable macro, is that attribute macros can be used on any kind of items. Whether it be a struct, an enum, a function, or even an extern crate declarations!

### Derivables

Derivable macros may be the most popular kind of macros. Derivable macros are called using the `derive` attribute. What differentiates these macros from attribute macros, is that it can only be used on structs and enums and is usually used to implement a trait. Examples of these kind of macros would be `Debug`, `Clone`, `Copy` and all that stuff.

```rust
#[derive(Debug, Clone)]
struct StringWrapper {
    value: String
}
```

The pros of using these kind of macros is that it's specialized for implementing a trait for a given struct/enum.

## Creating a macro

As mentioned earlier, to create a macro, we can use either a declarative approach or a procedural approach.

### Declarative

Declarative macros are macros that takes in a set of patterns and code to match and replace itself with. When called, it will try to find a match with a pattern that fits and replace itself with the code it was given. To create a declarative macro, you can use the `macro_rules!` keyword. Declarative macros are the simplest way to write macros, however it can only make function-like macros.   

```rust
macro_rules! add_exp {
    ($a:expr, $b:expr) => {
        ($a + $b) * ($a + $b)
    };
}
```

#### Patterns

Declarative macros takes in patterns (`($a:expr, $b:expr) => { ... }` would be the pattern in the example above) to match with. A single macro may also have multiple patterns.

```rust
macro_rules! add_exp {
    ($a:expr, $b:expr, 1) => {
        ($a + $b)
    };
    ($a:expr, $b:expr, 2) => {
        ($a + $b) * ($a + $b)
    };
    ($a:expr, $b:expr, 3) => {
        ($a + $b) * ($a + $b) * ($a + $b)
    };
}
```

#### Metavariables

Metavariables are in the shape of `${name}:{specifier}`.   
The specifier can be any of:

- `item`: an [item](https://doc.rust-lang.org/reference/items.html) (`struct Foo {}`, `fn Bar {}`)
- `block`: a block of code (`{ "block"; }`)
- `stmt`: a statement (`let foo = "bar";`)
- `pat_param`: a [pattern](https://doc.rust-lang.org/reference/patterns.html) without or patterns (`0..100`)
- `pat`: a [pattern](https://doc.rust-lang.org/reference/patterns.html) (`"foo" | "bar"`)
- `expr`: an expression (`foo()`, `123`)
- `ty`: a type (`bool`, `f64`)
- `ident`: an identifier (`bob`)
- `path`: a [TypePath](https://doc.rust-lang.org/reference/paths.html#paths-in-types) (`foo::bar::baz`)
- `tt`: a single token (`.`, `foo`, `123`)
- `meta`: an attribute param (`foo = "bar"`, `foo(bar)`)
- `lifetime`: a lifetime (`'static`, `'a`)
- `vis`: a visibility specifier (`pub`, `pub(crate)`)
- `literal`: an expression literal (`"String"`, `123`)

A metavariable may also be repeated with the syntax of `$(${name}:{specifier}){seperator}{operator}`.   
The seperator can be any token except a delimiter (`(`, `)`, `{`, `}`, `[`, `]`) and a repetition operator.
The operator can be any of:

- `*`: Can be repeated 0 or more times
- `+`: Can be repeated 1 or more times
- `?`: Can be omitted

To use the metavariable that is repeated, it has to be wrapped in parentheses that can also be seperated with a seperator.

```rust
macro_rules! println_all {
    ($($x:expr),+) => {
       $(println!("{}", $x);)+
    };
}
```

*Note: To learn more about declarative macros, I highly recommend taking a look at [Macros by Example](https://doc.rust-lang.org/reference/macros-by-example.html)*

### Procedural

Procedural macros are macros that works on raw Rust token. This means that procedural macros takes in raw Rust code and returns raw Rust code. Procedural macros are way more flexible than declarative macros, although with the cost of being more complex to write. To even write procedural macros, we need to create a seperate crate for it with `proc-macro` enabled in the `Cargo.toml` file.

```toml
[lib]
proc-macro = true
```

While you're in the `Cargo.toml` file, you should also add the recommended crates for creating and parsing Rust tokens which would be:

- [`syn`](https://crates.io/crates/syn): a crate for parsing Rust tokens
- [`quote`](https://crates.io/crates/quote): a crate for creating Rust tokens

Procedural macros can write all kinds of macros (function-like, attribute, derivable). Even though they are similar to write, they are still different, so we have to explain how to write each of them. Procedural macros are written by using an attribute on a function with parameters that match the attribute.   
For now, we'll explain the attributes for the kind of macros and their inputs and outputs as well as examples.   
At the end, we'll explain how to use the inputs and how to create the outputs.   

If you don't understand any of these yet, don't worry too much as you'll rarely find the need to write a procedural macro.

#### Function-likes

To write a function-like macro, we can use the `#[proc_macro]` attribute on a function which takes in a [`TokenStream`](https://doc.rust-lang.org/proc_macro/struct.TokenStream.html) and returns a [`TokenStream`](https://doc.rust-lang.org/proc_macro/struct.TokenStream.html).

Here's an example of a function-like macro that creates a struct called `MacroStruct`.

```rust
use proc_macro::TokenStream;
use quote::quote;

#[proc_macro]
pub fn macro_struct(_input: TokenStream) -> TokenStream {
    TokenStream::from(quote! {
        #[derive(Debug)]
        struct MacroStruct;
    })
}
```

And to use it:

```rust
use macro_lib::hello_macros;

macro_struct!();

fn main() {
    println!("{:?}", MacroStruct);
}
```

#### Attributes

To write an attribute macro, you can use the `#[proc_macro_attribute]` attribute on a function which takes in 2 [`TokenStream`](https://doc.rust-lang.org/proc_macro/struct.TokenStream.html) and returns another [`TokenStream`](https://doc.rust-lang.org/proc_macro/struct.TokenStream.html). The first of the [`TokenStream`](https://doc.rust-lang.org/proc_macro/struct.TokenStream.html) would be the input to the attribute, and the second one would be the item the attribute was placed on. The output of the function will replace the item that the original attribute was placed on.

Here's an example of an attribute macro that replaces whatever item it was placed on with a function called `hello_fn`:

```rust
use proc_macro::TokenStream;
use quote::quote;

#[proc_macro_attribute]
pub fn replace_hello_fn(_input: TokenStream, _item: TokenStream) -> TokenStream {
  TokenStream::from(quote! { fn hello_fn() { println!("Hello, World!"); } })
}
```

And to use it:

```rust
use macro_lib::hello_function;

#[replace_hello_fn]
struct HelloStruct;

fn main() {
    hello_fn();
}
```

#### Derivables

Derivable macros can be written by using the `#[proc_macro_derive(DeriveName)]` attribute on a function that takes in a [`TokenStream`](https://doc.rust-lang.org/proc_macro/struct.TokenStream.html) and returns a [`TokenStream`](https://doc.rust-lang.org/proc_macro/struct.TokenStream.html) which would be appended to the Rust code.

Here's an example of a derivable macro called `HelloFn` that creates a function called `hello_fn`.:

```rust
use proc_macro::TokenStream;
use quote::quote;

#[proc_macro_derive(HelloFn)]
pub fn hello_fn_derive(_item: TokenStream) -> TokenStream {
  TokenStream::from(quote! { fn hello_fn() { println!("Hello, World!"); } })
}
```

To use it:

```rust
use macro_lib::HelloFn;

#[derive(HelloFn)]
struct HelloStruct;

fn main() { hello_fn(); }
```

You also can create helper attributes:

```rust
use proc_macro::TokenStream;
use quote::quote;

#[proc_macro_derive(HelloFn, attributes(hi, hey))]
pub fn hello_fn_derive(_item: TokenStream) -> TokenStream {
  TokenStream::from(quote! { fn hello_fn() { println!("Hello, World!"); } })
}
```

And to use it:

```rust
use macro_lib::HelloFn;

#[derive(HelloFn)]
struct HelloStruct {
  #[hi]
  name: String,
  #[hey]
  hey: String,
}

fn main() { hello_fn(); }
```

#### How to work with Rust tokens

When creating a procedural macro you will need to work on raw Rust code. These block of codes are given in the form of tokens. To properly use these macros, we can parse them. I **really** recommend taking a look at `syn` example code at [https://github.com/dtolnay/syn/blob/master/examples](https://github.com/dtolnay/syn/blob/master/examples).

Here's an example of a function-like which takes in an identifier and creates a struct with that name:

```rust
struct CreateStructParams {
  name: Ident,
}

impl Parse for CreateStructParams {
  fn parse(input: ParseStream) -> syn::Result<CreateStructParams> {
    let name: Ident = input.parse()?;
    Ok(CreateStructParams { name })
  }
}

#[proc_macro]
pub fn create_struct(input: TokenStream) -> TokenStream {
  let CreateStructParams { name } = parse_macro_input!(input as CreateStructParams);
  TokenStream::from(quote! {
      #[derive(Debug)]
      struct #name {}
  })
}
```

And as you can see, it is way more complicated than writing a declarative macro. However this complication gives us way more flexibility.   
For example, we can write a derivable macro that gives a struct the ability to say its name:

```rust
#[proc_macro_derive(Name)]
pub fn name_derive(item: TokenStream) -> TokenStream {
  // For derivables, we don't need to create a whole parser for the inputs. The
  // input is simply the item that this macro is derived
  // We should also created a trait for this, but it is what it is
  let item = parse_macro_input!(item as DeriveInput);
  let name = item.ident;
  TokenStream::from(quote! {
      impl #name {
          fn name() -> String {
              stringify!(#name).to_string()
          }
      }
  })
}
```

If you're really observant, you know that we can interpolate parsed token when using `quote` by prefixing them with a hashtag `#`.

I, again, **really** reccommend you to read [https://github.com/dtolnay/syn/blob/master/examples](https://github.com/dtolnay/syn/blob/master/examples) if you want to learn more about these kind of stuff.

## Ending off

If you want to learn more about macros, there are a lot of online resources on them. Ones I used were:

- [Macros in Rust](https://blog.logrocket.com/macros-in-rust-a-tutorial-with-examples)
- [Rusts macros reference](https://doc.rust-lang.org/reference/macros.html)
- [The Little Book of Rust Macros](https://veykril.github.io/tlborm/introduction.html)
- [Rust Book Chapter 19 Part 5](https://doc.rust-lang.org/book/ch19-06-macros.html)

I hope you liked this post, and if you don't ***please*** give some criticism in the comments, as I am still learning about writing blog posts 😊.

