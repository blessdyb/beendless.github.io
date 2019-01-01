---
title: Tips for Hyperparameter Optimization
date: 2019-01-01 00:29:29
categories: CS
tags:
    - Deep Learning
---

One of the biggest headache of using deep neural networks is that they have tons of hyperparameters that should be optimized so that the network performs optimally.  Below are some notes coming from <Deep Learning Quick Reference>.

* Try to Find some similar solved problem.

* Keep adding layers / nodes until the network gets overfitting.

    ```
    The bad thing becomes a good thing to help us confirm that the network can fit the training sets perfectly at least.
    ```

## Hyperparameters

* Optimizer

    Usually you can start with `Adam`, but an `RMSProp` or a fine-tuned `SGD` may do a better job. You will need to tune the learning rate, momentunm, decay and so on.
* Network Weight Initialization

    You can start with `he_normal` or `he_uniform`.

* Neuron Activation

    In most cases, `relu` is the first one you need to use. But you should try `leaky-relu` or `tanh` if needed.

* Regularization

    * Dropout probability
    * L2 regularization

* Batch size


All of the combinations of the methods above you may need to try to get an optimized result, below are the common strategies:

* Grid search
* Random search
* Bayesian optimization
* Genetic algorithms
* Hyperband

