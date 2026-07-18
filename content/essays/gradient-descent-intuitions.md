---
title: Gradient Descent, Intuitively
description: Why gradient descent works, without the calculus-textbook framing.
created: 2026-07-10
modified: 2026-07-15
status: draft
confidence: likely
importance: 6
tags:
  - ml-engineering
---

Most explanations of gradient descent start with a loss surface and a partial derivative, which is correct but not how anyone actually builds intuition for it. A better starting point: you're standing on a hill in fog, you can only feel the slope under your feet, and you take a step downhill. That's it — that's the whole algorithm, repeated. The interesting parts (step size, momentum, why it gets stuck) all fall out of pushing on that picture. See [[on-backprop]] for how the slope itself gets computed in a neural net.
