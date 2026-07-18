---
title: Backprop is just the chain rule, applied mechanically
created: 2026-07-11
tags:
  - ml-engineering
---

Backpropagation gets treated as its own algorithm, but it's the multivariable chain rule applied layer by layer, cached so you don't recompute shared sub-derivatives. The "backward" direction isn't conceptually special — it's just the cheapest order to accumulate the products in. Related to [[gradient-descent-intuitions]], which is what you do once you have the gradient.
