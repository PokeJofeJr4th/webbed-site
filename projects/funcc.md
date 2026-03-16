---
layout: project
github: https://github.com/PokeJofeJr4th/FunctionalC
title: Functional C
description: A functional programming language designed to look like C, which also happens to compile to C
---

Functional C is a strictly functional programming language with features inspired by haskell and syntax inspired by C.

## Basic Use

Everything in Functional C is an expression. The basic types are `int`, `float`, and `string`.

```rs
let x = 4.2;
let y = 21;
let z = "hello";
...
```

A function type is represented like so: `(int, int) -> bool`. Here's one example of a function.

```rs
let add = (x: int, y: int) => x + y;
...
```

An IO monad, discussed later, is represented like so: `IO<void>` or `IO<int>`. You most likely won't deal with many values of this type at first.

A let binding is a type of expression that substitutes another expression for a variable in later evaluation. The following is a single Functional C expression that evaluates to `4`.

```rs
let x = 2;
x + x
```

If statements are also expressions.

```rs
if x == 2 {
    "it's two"
} else {
    "it's not two"
}
```

## The IO Monad

A full explanation of the concept of a monad is far beyond the scope of this article. Haskell has some excellent resources for learning how monads work. For the purposes of Functional C, you can think of a monad as an object that encapsulates a procedure that your computer can execute. A Functional C program is an expression that evaluates to an IO monad.

Here's a simple "Hello, World" program in Functional C. The built-in `writeLine` function has the type `string -> IO<void>`, which means when the function returns, we only have an object representing the procedure of printing text. Helpfully, the Functional C compiler will execute this monad for us, giving us the output we expect.

```rs
writeLine("Hello, World!")
```

Multiple monads can be combined with a semicolon. This looks like multiple lines of code are being executed, but really a new monad is being created which, when invoked, calls both of the original monads. Again, the compiler gives us what we expect.

```rs
writeLine("Hello, World!");
writeLine("I'm a monad.")
```

Accessing the return value of a monad requires a new form of `let` binding using the `:=` symbol. This tells the compiler that we want to access the return value of the monad we provide (`readLine` in this case), and it will create a monad for us that runs the rest of our code.

```rs
writeLine("What's your name?");
let yourName := readLine;
writeLine("Hello,");
writeLine(yourName)
```

Notice that we don't need to call the `readLine` function, just include it as a constant. In short, this is because the computer already has all of the information it needs from us to read a line of input. In contrast, the `writeLine` function needs the additional information of the text we're creating in order to tell the computer exactly what to print.
