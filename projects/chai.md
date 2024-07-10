---
layout: project
github: https://github.com/PokeJofeJr4th/Chai
title: Chai
description: A programming language for the JVM
---

The Chai language is a work-in-progress. Once completed, it is meant to feel like a mix between rust and java. It's built on the Java Virtual Machine, giving it a certain level of type safety by default. It extends this with a tuple type that compiles to an array.

The following is an example chai program that runs the classic fizzbuzz algorithm up to the number provided as a command line argument. This illustrates some of chai's syntax.

```java
import chai.{print, range};
import java.lang.{Integer, String};

fn fizzbuzz(int num) {
    for int i in range(0, num) {
        if i % 15 == 0 {
            print("FizzBuzz");
        } else if i % 5 == 0 {
            print("Fizz");
        } else if i % 3 == 0 {
            print("Buzz");
        } else {
            print(i);
        }
    }
}

fn main(String[] args) {
    fizzbuzz(Integer.parseInt(args[0]));
}
```

Here's another short example, which gives the result of division along with the remainder, showing how tuples can be used.

```java
fn div(int a, int b) -> (int, int) {
    (a / b, a % b)
}
```
