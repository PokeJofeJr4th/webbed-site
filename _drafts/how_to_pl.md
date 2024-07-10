---
layout: default
title: "So You Want to Make a Programming Language?"
---

## What Even Is a Programming Language?

I define a programming language as a function from source code to behavior. I like do divide the process a compiler goes through into three to five steps:

<!-- TODO: Find the original book with code stuffs -->

1. Process the source into a string of tokens
2. Process the tokens into a syntax tree
3. Set up any context for execution (optional)
4. Transform the syntax tree into a more machine-readable representation (optional)
5. Generate or execute code

For my more basic projects, like [DreamBerd](/projects/dreamberd-rs), I skip steps three and four. For more advanced projects, such as [Chai](/projects/chai), I include all five steps.

## 1. Token String

This step is largely shaped by the design of your syntax. I highly recommend using a tagged union with a variant for each token. While this makes for a long enum definition, it also leads to more readable code for these first two steps.

The part of the program that transforms the string of source code into the list of tokens is called a lexer. Most tokens are a single character, but others require lookahead.

#### Multi-Character Tokens

Simple, defined multi-character tokens, such as `==`, `++`, `->`, or `<=`, can easily be implemented by looking at the next character and checking it against what is expected for such a token.

#### Identifiers

When your lexer encounters an alphabetic character, you can add it to a buffer, then loop through the source code until you reach a non-alphanumeric character. Then emit the complete identifier as an identifier token.

#### Int Literals

When your lexer encounters a numeric character, you can add it to a buffer, then loop through the source until you reach a non-numeric character. Then parse the value and emit the result as an int token.

#### Float Literals

If the character that ends an int literal is a dot, then you can add all numeric characters after it to a buffer and parse the result as a float once this is completed. Other float formats, like an omitted whole part or an exponent, are outside the scope of this post.

#### String Literals

Strings might be the most complex part of a typical lexer. It seems simple at first to create a buffer when your lexer sees the first quote, then save it as a string token when it sees another one. But what about escape sequences? You need an additional rule to replace `"\n"` with a newline, `"\""` with a quote, and so on.

When including string interpolation, it's important to include a way to escape whatever interpolation syntax you use. You can also relegate it to a specific type of quote or require a prefix, like python's f-strings.

## 2. Syntax Tree

A syntax tree is a type of recursive data structure that represents natural groupings of code, like expressions and statements. In this section, I'll go through some types of nodes that are required in most types of syntax and then how to generate a syntax tree from a token string.

When creating the actual representation of a syntax tree, it may be helpful to include multiple enums for categories like top-level items, statements, and expressions, which might not all be possible in the same place.

### Syntax Nodes

#### Leaves - Literals and Identifiers

Every tree structure needs leaves, and the syntax tree is no exception. For a syntax tree, a leaf generally means something that can be evaluated without referencing any other syntax.

#### Operations

Operations include binary operations like arithmetic, comparison, and boolean algebra; but also unary operations like negation and increments (`++`). Their evaluation will require the evaluation of each of its sub-expressions.

#### Structure Initialization

Structure initialization nodes represent the creation of basic data types like arrays, tuples, and objects. They evaluate all of their sub-expressions and combine them into the final piece of data.

#### Block

#### If

#### Loops

#### Switches

#### Functions

#### Types

## 3. Execution Context

## 4. Intermediate Representation (IR)

An Intermediate Representation can be any number of things, depending on how your language transforms its source code concepts to be either compiled or interpreted. Most often, this will be either a modified version of the syntax tree or instruction sequences similar to assembly.

## 5. Code Generation

## 5. Execution
