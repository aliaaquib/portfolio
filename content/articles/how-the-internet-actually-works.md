---
title: How the Internet Actually Works
slug: how-the-internet-actually-works
date: 2026-09-24
excerpt: Packets, IP addresses, DNS, and undersea cables — what really happens between you typing a URL and a page appearing.
category: CS concepts
tags: [internet, networking, explainers]
seoTitle: How Does the Internet Actually Work? Explained Simply
seoDescription: How does the internet work? A CS teacher explains packets, IP addresses, DNS, and routers in plain English — no jargon.
---

Type a URL, hit enter, page appears. Half a second, maybe less. What's actually happening in that half second is one of the most impressive engineering feats in human history. Here's the plain-English version I teach my students.

## Everything travels in packets

The internet doesn't send your data as one continuous stream. It chops everything — your message, this article, a video call — into small chunks called **packets**, each a few thousand bytes.

Every packet gets a label: where it's going, where it came from, and which piece of the whole it is (packet 3 of 40, say). Then they're all thrown onto the network independently. They can take different routes. They can arrive out of order. The receiving computer reassembles them like a jigsaw puzzle.

Why chop things up? So the network stays shared. Your video call's packets interleave with someone else's email packets. Nobody has to wait for a giant file to finish before anything else can move. It's the reason the internet works for billions of people at once.

## IP addresses are postal addresses

Every device on the internet has an **IP address** — a numerical label like `142.250.72.14`. Think of it as a postal address for your computer. Packets need it to know where to go.

But you typed `example.com`, not numbers. That's where **DNS** comes in.

## DNS is the internet's phone book

**DNS (Domain Name System)** translates human-friendly names into IP addresses. When you type a URL, your computer asks a DNS server: "what's the IP for this name?" The server answers with the number, and only then does the real journey begin.

This lookup happens constantly, invisibly, thousands of times a day on your phone alone. When the internet "feels slow," a surprising amount of the time it's DNS being sluggish, not your connection.

## Routers are post offices

Your packets don't fly straight to their destination. They hop through **routers** — specialized computers whose entire job is reading packet labels and forwarding them toward the right direction.

Each router only knows the next best hop, not the full route. It's like a relay of post offices, each one passing the parcel closer. A packet from Bishkek to a server in Frankfurt might hop through a dozen routers across several countries.

And here's the part that always surprises my students: a huge share of those hops travel through **cables on the ocean floor**. The "cloud" is, physically, mostly ships laying fiber-optic cable across seabeds. The internet is not wireless magic. It's glass threads under the sea carrying light.

## The round trip: loading a page

Put it together. You type a URL and hit enter:

1. DNS translates the name into an IP address.
2. Your browser opens a connection to that address and sends an HTTP request ("give me this page"), chopped into packets.
3. Routers forward the packets across networks, countries, and oceans.
4. The server reassembles them, finds the page, and sends the response back as packets.
5. Your browser reassembles the response and renders the page.

All of that — the lookup, the ocean crossings, the reassembly — in under a second. Every time.

## The one-sentence version

Your data is chopped into labeled packets, routed hop-by-hop across the planet (often under the ocean), and reassembled at the other end — billions of times a day, in under a second.
