---
title: Several Important Concepts of CNN
date: 2019-01-01 16:49:25
categories: CS
tags:
    - Deep Learning
---

A trained convolutional layer is made up of many feature detectors, called filters, which slide over an input image tensor as a moving window. This is a very powerful technique and it possesses several advantages over the `flatten` and `classify` method or deep learning.

Below are some notes coming from `Deep Learning Quick Reference`.

### Convolutional Layer
During the computation between the input and each filter, we take the elementwise product across all axes. So in the end, we will still leave with a two-dimensional output.

In a convolution layer, each unit is a filter, combined with a nonlinearity.

*Technically, this is not a convolution, but a cross-correlation. We call it a convolution by convention and the difference for our purposes is really quite small.*

### Benefits of Convolutional Layers

Obviously, a convolutional layer requires much fewer parameters.

* Parameter sharing

    Because the filter is used across the entire image, filters learn to detect the features regardless of their position within the image. This turns out to be really useful as it gives us [translation invariance](https://www.quora.com/How-is-a-convolutional-neural-network-able-to-learn-invariant-features?from=timeline&isappinstalled=0), which means we can detect something important regardless of its orientation in the overall image.

* Local connectivity
    Because of the fixed size, filters focus on connectivity between adjacent pixels. It means that they will most strongly learn local features. The stacking of localized features is really desirable and a key reason why convolutional layers are so great.

### Pooling Layers

Pooling layers are used to reduce the dimensionality of convolutional network as layers of convolutions are added, which reduces overfitting. They have the added benefit of making the feature detectors somewhat more robust. In other words, it helps us to focus on the stronger signal or the major signal instead of the details.

### Batch Normalization

Batch normalization helps our networks perform better overall and learn faster. It is also fairly easy to understand in an application. When using batch normalization, for each minibatch, we can normalize that batch to have a mean of 0 and unit variance, after (or before) each nonlinearity. This allows each layer to have a normalized input to learn from, which makes that layer more efficient at learning.

### Data Augmentation

The more data you have, the better your deep learning model could be success. But what if you can't have enough data to feed to your model? Data augmentation can help you to improve your model to a certain extent.

* Adding Noise

    When adding noise, make sure you don't introduce extra bias to the dataset. Also you need to ensure the noise is independent.

* Transformation

    When doing transformation (flip/shift/rotate), make sure you don't introduce bias to the feature => label mappings. For example, you can verticle flip the MNIST dataset.