+++
title = "Writing Java Bytecode by Hand"
date = "2023-05-19T02:19:52+07:00"
author = "ManicMarrc"
tags = ["Tutorial", "Java", "Programming Language"]
keywords = ["Tutorial", "Java", "Programming Language"]
description = "Writing a Hello World program by writing Java Bytecode manually."
+++

## Introduction

[Java](https://en.wikipedia.org/wiki/Java_%28programming_language%29) is a well-known programming language. Java revolutionized a lot of things, but the one I want to talk about is the way it ran code. Java is both [interpreted](https://en.wikipedia.org/wiki/Interpreter_(computing)) *and* [compiled](https://en.wikipedia.org/wiki/Compiler). That is possible because Java doesn't compile to an executable, instead it compiles to [bytecode](https://en.wikipedia.org/wiki/Bytecode). "What is that?" you may ask, well don't worry! We'll cover it in this post and also write some bytecode by hand!

## What is bytecode?

[Bytecode](https://en.wikipedia.org/wiki/Bytecode) are like [Assembly](https://en.wikipedia.org/wiki/Assembly_language) but instead of being ran by the operating system, it is ran by a program. These programs are called [virtual machines](https://en.wikipedia.org/wiki/Virtual_machine#Process_virtual_machines) but not to be confused with the other [virtual machines](https://en.wikipedia.org/wiki/Virtual_machine#System_virtual_machines) that runs a full operating system.

## Why even bother to compile to bytecode?

You may ask to yourself why even bother to create a bytecode format and create an interpreter for that bytecode format. The answer to that is speed and portability.

Bytecode are much faster than interpreters as they are very similar to the operating system's architecture. Bytecode also allow for more optimization opportunities such as allowing your program to be run [Just in time](https://en.wikipedia.org/wiki/Just-in-time_compilation).   

Bytecode are also more portable than compiling straight to an executable. Since bytecode only needs an virtual machine to run it, bytecode can be compiled once and used everywhere as long as it has the virtual machine for that bytecode format. In fact, this is where Java got it's "Write once, run anywhere" slogan from. Since the [JVM](https://en.wikipedia.org/wiki/Java_virtual_machine) is basically everywhere, anything can run a Java program that is already compiled.

## Then, why don't more programming languages compile to bytecode?

The answer to that is simplicity and speed.

Bytecode while being fast, is a lot more complex to write compared to writing an interpreter. With bytecode, you have to specify a format, document the format to not get lost, and also create the virtual machine for that format.

Bytecode also is still slower than straight up compiling to an executable. Since Assembly is the closest way to interact with the operating system, bytecode is still slower than Assembly.

## What is Java Bytecode?

Java uses it's own kind of bytecode which is stored in a file that ends with a `.class` extension. Java has an amazing specifications for this file which you can read here: [https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html). Java bytecode is ran with the [JVM](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-6.html). Java bytecode is encoded in [Big-endian](https://en.wikipedia.org/wiki/Endianness) unlike other bytecodes.   

To compile Java source code into the class file, we can run the `javac` program. For example:

```bash
$ javac HelloWorld.java
$ ls
HelloWorld.java HelloWorld.class
```

To run the class file, we can run the `java` program. For example:

```bash
$ java HelloWorld
Hello, World!
```

We can also disassemble these class files by using the `javap` program. For example:

```bash
$ javap -verbose HelloWorld.class
...
```

## Writing Java Bytecode by hand

Writing Java bytecode by hand is a really stupid thing to do, but it's kinda fun? maybe? sometimes? I don't know. Anywho, we'll be writing Java bytecode by manually in this post.

I will be writing the class file using Python since I don't really like any hex editors that I know, although you can absolutely use one.
The full project is at my Github: [https://github.com/ManicMarrc/manual-java-bytecode](https://github.com/ManicMarrc/manual-java-bytecode).

### The skeleton

In this part, we'll write the necessary bytecode to make `javap` work on our class file. As noted above, Java's bytecode format is documented here: [https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html). I highly recommend to read it if you get lost.

First off, in any bytecode format, there will almost always be magic bytes to differentiate the bytecode format. For Java, the magic bytes is `CAFEBABE`. So just write that into your class file:

```
0xca, 0xfe, 0xba, 0xbe, // magic
```

After that, the next bytes will be the `minor_version` and `major_version`. These specify what Java version will be used which can be found here: [https://en.wikipedia.org/wiki/Java_version_history](https://en.wikipedia.org/wiki/Java_version_history). I will be using Java 11 which would mean `minor_version`: 0 and `major_version`: 55.

```
...
0x00, 0x00, // minor_version
0x00, 0x37, // major_version
```

Next will be `constant_pool_count` and `constant_pool`. For now set the `constant_pool_count` to 0 and don't write the `constant_pool`.

```
...
0x00, 0x00, // constant_pool_count
```

The next bytes is `access_flags`. The access flags we will use is the `ACC_PUBLIC` (0x0001) and `ACC_SUPER` (0x0020) which when combined will be 0x0021.

```
...
0x00, 0x21, // access_flags
```

After that will be `this_class`. Just set to 0 for now.

```
...
0x00, 0x00, // this_class
```

Next will be `super_class`. Again, just set to 0 for now.

```
...
0x00, 0x00, // super_class
```

The next bytes are `interfaces_count` and `interfaces`. We wont use this so just set `interfaces_count` to 0 and don't write anything for interfaces.

```
...
0x00, 0x00, // interfaces_count
```

Next are `fields_count` and `fields`. Same as above.

```
...
0x00, 0x00, // fields_count
```

After that is `methods_count` and `methods`. Same as above but we will use this one.

```
...
0x00, 0x00, // methods_count
```

And finally, `attributes_count` and `attributes`. Same as above.

```
...
0x00, 0x00, // attributes_count
```

After you wrote all of that, try running `javap` with the `-verbose` flag on your class file and you should get an output similar to this:

```bash
$ javap -verbose HelloWorld.class
Error: invalid index #0
public class ???
  minor version: 0
  major version: 55
  flags: (0x0021) ACC_PUBLIC, ACC_SUPER
  this_class: #0
  super_class: #0
  interfaces: 0, fields: 0, methods: 0, attributes: 0
Constant pool:
{
}
```

### Setting `this_class` and `super_class`

The `this_class` and `super_class` are indices to the constant pool. The constant pool is an array that contains string constants, numbers, and anything else that will be used in the program. The constant pool entries all have a tag which describes their shapes. The constant pool indices actually starts from 1 instead of 0. Also, the constant pool is always the length of `constant_pool_count` - 1. That subtraction of 1 is really important.

The `this_class` and `super_class` takes an index to the constant pool where the value is the type of [`CONSTANT_Class`](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html#jvms-4.4.1). This value contains it's tag (0x07) and a `name_index` which is an index to the constant pool where the value is a [`CONSTANT_Utf8`](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html#jvms-4.4.7).   
This `CONSTANT_Utf8` contains it's tag (0x01), length, and the bytes of the string.

Let's create one for `this_class`.

```
...
0x00, 0x03, // constant_pool_count
// constant_pool
0x07, // CONSTANT_Class
0x00, 0x02, // name_index
0x01, // CONSTANT_Utf8
0x00, 0x0a, // length
0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x57, 0x6f, 0x72, 0x6c, 0x64, // bytes
...
```

Note how the `constant_pool_count` is 3 and not 2. Now set `this_class` to 1.

```
...
0x00, 0x01, // this_class
...
```

Now run `javap` again and you should see the `???` after `public class` turn into the name that you've chosen.

```bash
public class HelloWorld
  minor version: 0
  major version: 55
  flags: (0x0021) ACC_PUBLIC, ACC_SUPER
  this_class: #1                          // HelloWorld
  super_class: #0
  interfaces: 0, fields: 0, methods: 0, attributes: 0
Constant pool:
  #1 = Class              #2              // HelloWorld
  #2 = Utf8               HelloWorld
{
}
```

Now for `super_class` we're gonna set it to `java/lang/Object`. Basically every class in Java has to inherit from `java/lang/Object`. Do the same as above but change the string to `java/lang/Object`. Think of this as an exercise. Don't forget to set `super_class` to the correct index.

### Creating the `main` method

Any Java program needs to have a `main` method and the same goes for Java bytecode. All a method needs is `access_flags`, `name_index`, `descriptor_index`, `attributes_count`, and `attributes`.   
`access_flags` are self-explanatory.  We'll use `ACC_PUBLIC` (0x0001) and `ACC_STATIC` (0x0008) which would be 0x0009.   
`name_index` is an index to the constant pool of type `CONSTANT_Utf8`.   
`descriptor_index` is an index to the constant pool of type `CONSTANT_Utf8` but with the format of [descriptors](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html#jvms-4.3) more specifically [method descriptors](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html#jvms-4.3.3).
`attributes_count` and `attributes` will be ignored for now.

Let's write the necessary constants.

```
...
0x00, 0x07, // constant_pool_count
# constant_pool
...
0x01, // CONSTANT_Utf8
0x00, 0x04, // length
0x6d, 0x61, 0x69, 0x6e, // bytes
0x01, // CONSTANT_Utf8
0x00, 0x16, // length
0x28, 0x5b, 0x4c, 0x6a, 0x61, 0x76, 0x61, 0x2f, 0x6c, 0x61, 0x6e,
0x67, 0x2f, 0x53, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x3b, 0x29, 0x56, // bytes
...
```

The first one is `main` which will be the method name, and the second one is `([Ljava/lang/String;)V`. I won't cover it too much, just know that it means a function that takes in `String[]` and returns `void`.

Now let's create the method.

```
...
0x00, 0x01, // methods_count
// methods
0x00, 0x09, // access_flags
0x00, 0x05, // name_index
0x00, 0x06, // descriptor_index
0x00, 0x00, // attributes_count
...
```

Run `javap` and you should get something similar to this:

```bash
public class HelloWorld
  minor version: 0
  major version: 55
  flags: (0x0021) ACC_PUBLIC, ACC_SUPER
  this_class: #1                          // HelloWorld
  super_class: #3                         // java/lang/Object
  interfaces: 0, fields: 0, methods: 1, attributes: 0
Constant pool:
  #1 = Class              #2              // HelloWorld
  #2 = Utf8               HelloWorld
  #3 = Class              #4              // java/lang/Object
  #4 = Utf8               java/lang/Object
  #5 = Utf8               main
  #6 = Utf8               ([Ljava/lang/String;)V
{
  public static void main(java.lang.String[]);
    descriptor: ([Ljava/lang/String;)V
    flags: (0x0009) ACC_PUBLIC, ACC_STATIC
}
```

### Returning from the method

Before writing the actual program, let's just get it to return from `main`.   
For this, we'll need an [attribute](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html#jvms-4.7). An attribute basically contains some metadata which can be used by the JVM. An attribute needs `attribute_name_index`, `attribute_length`, and the metadata.   
For our needs, we'll need the [`Code` attribute](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html#jvms-4.7.3). What that means, is that we need our `attribute_name_index` to point to an index to the constant pool with the value `Code`.   

```
...
0x00, 0x08, // constant_pool_count
# constant_pool
...
0x01, // CONSTANT_Utf8
0x00, 0x04, // length
0x43, 0x6f, 0x64, 0x65, // bytes
...
```

Now let's create the attribute.   
**Also, make sure to put this inside the `main` method `attributes` and not the class `attributes`**

```
...
0x00, 0x01, // attributes_count
// attributes
0x00, 0x07, // attribute_name_index
0x00, 0x00, 0x00, 0x0d, // attribute_length
0x00, 0x02, // max_stack
0x00, 0x02, // max_locals
0x00, 0x00, 0x00, 0x01, // code_length
// code
0xb1, // return
0x00, 0x00, // exception_table_length
0x00, 0x00, // attributes_count
...
```

`attribute_length` is the length of the attribute excluding the first 6 bytes. `attribute_length` for the `Code` attribute is always gonna be 12 + `code_length`.   
`max_stack` is the maximum length of the stack at runtime.   
`max_locals` is the maximum amount of local variables at runtime.   
`code_length` and `code` are where the code of the method will be.   
`exception_table_length` and `exception_table` are where the information on how to handle exceptions will be.   
`attributes_count` and `attributes` are the attributes that this attribute has.

For the code, we wrote `0xb1` which is the `return` instruction. You can read the instruction set here: [https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-6.html](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-6.html).

Now run `javap` and you should get something like this:

```bash
public class HelloWorld
  minor version: 0
  major version: 55
  flags: (0x0021) ACC_PUBLIC, ACC_SUPER
  this_class: #1                          // HelloWorld
  super_class: #3                         // java/lang/Object
  interfaces: 0, fields: 0, methods: 1, attributes: 0
Constant pool:
  #1 = Class              #2              // HelloWorld
  #2 = Utf8               HelloWorld
  #3 = Class              #4              // java/lang/Object
  #4 = Utf8               java/lang/Object
  #5 = Utf8               main
  #6 = Utf8               ([Ljava/lang/String;)V
  #7 = Utf8               Code
{
  public static void main(java.lang.String[]);
    descriptor: ([Ljava/lang/String;)V
    flags: (0x0009) ACC_PUBLIC, ACC_STATIC
    Code:
      stack=2, locals=2, args_size=1
         0: return
}
```

You should also now be able to run `java HelloWorld` but it doesn't do anything right now.

### Writing the actual program

This is the hard part and most of the reasoning of that is having to write so many constants in the constant pool, which is a hassle. Let's first try to understand what `System.out.println("Hello, World!");` actually does.   

1. Get `out` from `System`.
2. Load `"Hello, World!"` from the constant pool
3. Call `println` from `out`

Notice how we get `out` first rather than load `"Hello, World!"` first. Keep this in mind for later.

#### Getting `out` from `System`

To get `out` from `System`, we will use the [`getstatic`](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-6.html#jvms-6.5.getstatic) instruction. This instruction gets a field from a class. This instruction takes in an index to the constant pool where the value is the type of [`CONSTANT_Fieldref`](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html#jvms-4.4.2).

The constant pool:

```
...
0x00, 0x0e, // constant_pool_count
...
0x09, // CONSTANT_Fieldref
0x00, 0x09, // class_index
0x00, 0x0b, // name_and_type_index
0x07, // CONSTANT_Class
0x00, 0x0a, // name_index
0x01, // CONSTANT_Utf8
0x00, 0x10, // length
0x6a, 0x61, 0x76, 0x61, 0x2f, 0x6c, 0x61, 0x6e,
0x67, 0x2f, 0x53, 0x79, 0x73, 0x74, 0x65, 0x6d, // bytes
0x0c, // CONSTANT_NameAndType
0x00, 0x0c, // name_index
0x00, 0x0d, // descriptor_index
0x01, // CONSTANT_Utf8
0x00, 0x03, // length
0x6f, 0x75, 0x74, // bytes
0x01, // CONSTANT_Utf8
0x00, 0x015, // length
0x4c, 0x6a, 0x61, 0x76, 0x61, 0x2f, 0x69, 0x6f, 0x2f, 0x50,
0x72, 0x69, 0x6e, 0x74, 0x53, 0x74, 0x72, 0x65, 0x61, 0x6d, 0x3b, // bytes
...
```

By now, you should be comfortable reading hex codes. This should be familiar now that you have written most of these constants.   
`CONSTANT_Fieldref` takes in `class_index` which is `CONSTANT_Class` and `name_and_type_index` which is [`CONSTANT_NameAndType`](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html#jvms-4.4.6).   
`CONSTANT_NameAndType` is self-explanatory. It takes in a `name_index` which is a `CONSTANT_Utf8` and a `descriptor_index` which is a `CONSTANT_Utf8` in the descriptor format. For us, it is ("out", "Ljava/io/PrintStream;").

Now the `Code` attribute:

```
...
0x00, 0x00, 0x00, 0x10, // attribute_length
...
0x00, 0x00, 0x00, 0x04, // code_length
// code
0xb2, 0x00, 0x08, // getstatic 8
0xb1, // return
...
```

If you run `javap` now, you should see the `getstatic` instruction.

#### Loading from the constant pool

To load stuff from the constant pool, we can use the [`ldc`](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-6.html#jvms-6.5.ldc) instruction. This instruction takes in an index to the constant pool.   
Since we want to load the string `"Hello, World!"`, we need to create a constant pool of type [`CONSTANT_String`](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html#jvms-4.4.3) and not a `CONSTANT_Utf8`.

For the constant pool:

```
...
0x00, 0x10, // constant_pool_count
...
0x08, // CONSTANT_String
0x00, 0x0f, // string_index
0x01, // CONSTANT_Utf8
0x00, 0x0d, // length
0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x57, 0x6f, 0x72, 0x6c, 0x64, 0x21, // bytes
...
```

At this point, you should be able to understand the whole thing. But just in case: `CONSTANT_String` takes in an index to a `CONSTANT_Utf8`.

And for the `Code` attribute:

```
...
0x00, 0x12, // attribute_length
...
0x00, 0x06, // code_length
...
0x12, 0x0e, // ldc 14
0xb1, // return
...
```

If you run `javap` you should now see the `ldc` instruction in the `main` method.

#### Call `println` from `out`

To call a method from an object in the stack, we can use the [`invokevirtual`](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-6.html#jvms-6.5.invokevirtual) instruction. `invokevirtual` takes in the index to a [`CONSTANT_Methodref`](https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html#jvms-4.4.2). You may noticed that we load our string after we get `out` from `System`, well that's because `invokevirtual` also needs operands from the stack and the order is the class that it's getting the method from going first and then the arguments.

For the constant pool:

```
...
0x00, 0x16, // constant_pool_count
...
0x0a, // CONSTANT_Methodref
0x00, 0x11, // class_index
0x00, 0x13, // name_and_type_index
0x07, // CONSTANT_Class
0x00, 0x12, // name_index
0x01, // CONSTANT_Utf8
0x00, 0x13, // length
0x6a, 0x61, 0x76, 0x61, 0x2f, 0x69, 0x6f, 0x2f, 0x50,
0x72, 0x69, 0x6e, 0x74, 0x53, 0x74, 0x72, 0x65, 0x61, 0x6d, // bytes
0x0c, // CONSTANT_NameAndType
0x00, 0x14, // name_index
0x00, 0x15, // descriptor_index
0x01, // CONSTANT_Utf8
0x00, 0x07, // length
0x70, 0x72, 0x69, 0x6e, 0x74, 0x6c, 0x6e, // bytes
0x01, // CONSTANT_Utf8
0x00, 0x015, // length
0x28, 0x4c, 0x6a, 0x61, 0x76, 0x61, 0x2f, 0x6c, 0x61, 0x6e,
0x67, 0x2f, 0x53, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x3b, 0x29, 0x56, // bytes
...
```

`CONSTANT_Methodref` is the basically the same as `CONSTANT_Fieldref`.

For the `Code` attribute:

```
...
0x00, 0x00, 0x00, 0x15, // attribute_length
...
0x00, 0x00, 0x00, 0x09, // code_length
...
0xb6, 0x00, 0x10, // invokevirtual 16
0xb1, // return
...
```

### Finished

You can now run `java` on your class file and you should get `Hello, World!` printed on your screen! That was fun right?? What do you mean no?? Yeah.. It's not that fun. There are much more better ways to write Java bytecode.

One of them would be using a library, such as [ASM](https://asm.ow2.io/) a Java library which is used by [Kotlin](https://kotlinlang.org/) and [Groovy](http://www.groovy-lang.org/). Another one is [Noak](https://gitlab.com/frozo/noak) a Rust library.   
Of course if your programming language doesn't have a library, you would have to write it by hand. But of course, you can write [abstractions](https://en.wikipedia.org/wiki/Abstraction_(computer_science)) over it to make it easier.

## Ending off

Bytecodes are an interesting part of a programming language. They are fast and portable, but are complex and slower than native executables.   
Also, writing Java bytecode by hand is kind of a hassle. It's repetitive, boring, and error-prone. But it is satisfying writing binary by hand and seeing it do something.   

Anywho, that's all that I have to say. Hope you've had fun! Also, might I recommend you share my posts with other programming nerds? Anyways, goodbye!

