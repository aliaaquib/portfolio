---
title: Recursion, Explained Simply
slug: recursion-explained-simply
date: 2026-09-24
excerpt: The idea students find scariest in programming, explained the way I teach it in class — with a countdown, not a cliché.
category: CS concepts
tags: [programming, recursion, explainers]
seoTitle: What Is Recursion? A Simple Explanation With Examples
seoDescription: What is recursion in programming? A CS teacher explains recursive functions simply — base case, recursive case, and a factorial walkthrough.
---

Recursion is the concept my students fear most. The name alone sounds like something from a sci-fi film. But every year, most of them get it within a single lesson. Here's how.

## The core idea in one sentence

Recursion is when a function calls itself to solve a smaller version of the same problem.

That's it. That's the whole idea. Everything else is detail.

## The countdown way to see it

Imagine I ask you to count down from 5 out loud. You'd say 5, 4, 3, 2, 1. Easy.

Now imagine you're only allowed to follow one rule: "to count down from N, say N, then count down from N minus 1." And a second rule: "if N is zero, stop."

To count down from 5, you say 5, then count down from 4. To count down from 4, you say 4, then count down from 3. And so on, until you hit zero and stop.

You just did recursion. You solved "count down from 5" by solving the smaller problem "count down from 4" — the same problem, one size smaller.

## The two parts every recursive function needs

Every recursive function has exactly two ingredients:

**The base case** — where it stops. In the countdown, that's "if N is zero, stop." Without a base case, the function calls itself forever. In real programs, that means a stack overflow and a crash. I make my students chant this: no base case, no recursion.

**The recursive case** — where it calls itself on a smaller problem. "Count down from N minus 1." The problem must get smaller every time, so you're guaranteed to eventually reach the base case.

## A real example: factorial

Factorial is the classic. 5! means 5 × 4 × 3 × 2 × 1 = 120. Notice something: 5! is just 5 × 4!. And 4! is 4 × 3!. The problem contains a smaller version of itself.

In code, that looks like this:

```
factorial(n):
    if n == 0: return 1        # base case
    return n * factorial(n-1)  # recursive case
```

Walk through `factorial(3)`: it's 3 × `factorial(2)`, which is 2 × `factorial(1)`, which is 1 × `factorial(0)`, which hits the base case and returns 1. Then it all multiplies back up: 1 × 1 × 2 × 3 = 6.

My students' eyes always go a bit wide at the "multiplies back up" part. The calls stack up like plates, then resolve in reverse. Once you see it, you can't unsee it.

## Where you'll actually meet it

Recursion isn't just a classroom exercise. It shows up everywhere:

- Navigating folders inside folders inside folders on your computer
- Searching through nested comments on a post
- Tree and graph algorithms — the backbone of maps, networks, and game AI
- Sorting algorithms like quicksort and mergesort

Anywhere the data is nested — things inside things — recursion is usually the natural tool.

## The one-sentence version

Solve a smaller version of the same problem, and know exactly when to stop. That stopping point — the base case — is the whole game.
