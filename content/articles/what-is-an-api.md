---
title: What Is an API? A Plain-English Explanation
slug: what-is-an-api
date: 2026-09-24
excerpt: APIs run the modern internet, and nobody explains them well. Here's the version I wish someone had given me: a menu, a waiter, and a kitchen.
category: CS concepts
tags: [APIs, programming, explainers]
seoTitle: What Is an API? Explained in Plain English With Examples
seoDescription: What is an API and how does it work? A CS teacher explains APIs in plain English with everyday examples — requests, responses, and API keys.
---

API stands for Application Programming Interface, which is one of those definitions that explains nothing. Here's the version I wish someone had given me when I started: **an API is a menu**.

## The restaurant version

Imagine a restaurant. You sit at the table. You don't walk into the kitchen, grab ingredients, and cook — even though the kitchen has everything. Instead, you look at the **menu**, tell the **waiter** what you want, and the food arrives.

An API works exactly like that:

- The **kitchen** is the service with the data or power — Google Maps, a weather database, a payment system.
- The **menu** is the API documentation: the list of things you're allowed to ask for, and how to ask.
- The **waiter** is the API itself: it carries your request to the kitchen and brings back the response.
- You never see the kitchen. You don't need to know how the food is made. You just need the menu.

That's the whole idea. An API is a controlled way for one piece of software to ask another piece of software for something.

## A real example: the weather app

The weather app on your phone doesn't have thermometers in the sky. When you open it, the app sends a **request** to a weather service's API: essentially, "give me the current weather for Bishkek."

The API checks the request, fetches the data from its "kitchen," and sends back a **response** — a structured chunk of data with temperature, humidity, wind. The app then displays it nicely.

Request goes out, response comes back. That round trip is 99% of what APIs do.

## Why not just share the database?

Students always ask this, and it's a great question. Why the menu-and-waiter dance instead of letting apps grab data directly?

Three reasons:

- **Control.** The kitchen decides what's on the menu. A weather API gives you weather — not its users' passwords, not its internal systems.
- **Stability.** The kitchen can reorganize however it likes. As long as the menu stays the same, your app keeps working.
- **Limits.** The waiter can say "you've ordered too much." APIs use keys and rate limits so one greedy app can't eat the whole kitchen's capacity.

## API keys: your table reservation

Many APIs require a **key** — a long secret string you include with every request. Think of it as identifying your table. It tells the service who's asking, so it can enforce limits, block abuse, and sometimes bill you.

This is also why you never post your API keys publicly. A leaked key is like someone else ordering room service on your tab.

## Where you meet APIs every day

- Logging into an app with your Google account — that's an API handshake.
- Every map, weather widget, and payment button — APIs underneath.
- When two apps "integrate" — that's just their APIs talking to each other.

The modern internet is, to a large extent, APIs all the way down. Every app you love is mostly a nice interface sitting on top of someone else's kitchen.

## The one-sentence version

An API is a menu of things one program is allowed to ask another program for — requests go in, responses come out, and nobody has to see the kitchen.
