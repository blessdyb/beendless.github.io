---
title: Computer Vision Tasks Summary
date: 2020-09-03 13:06:56
categories: CS
tags:
    - Machine Learning
    - CNN
    - Deep Learning with TensorFlow 2 and Keras
---

I'm start reading this book <Deep Learning with TensorFlow 2 and Keras> those days, and will keep posting what I learnt from the book here.

There are several regular computer vision tasks when everyone start learning CNN. Such as `MINST`, `ImageNet` etc. But when you start applying what you learned to real projects, you may find more complex categories of computer vision use cases.

* Classification and localization
    
    Q: In this task, you have to report not only the class of object found in the image, but also the coordinates of the bounding box where the object appears in the image. The prerequisite for this type of problem is there's only one target object in the image.
    
    A: This can be solved by using the architecture of one input with two output DNN. Basically we just need to have one more regression output beside the classical CNN classification output. Once we have the feature map from the CNN, we can feed it into a fully connected network which produces a vector of class probabilities (CNN Classification). Meahwhile, we can also feed the feature map to a fully connected network which will produce a vector (x, y, w, h) representing the top left x and y coordinates, width and height of the bounding box.  The loss function of the whole network can be determined by the combination of the classification loss (such as categorical cross entropy) with the regression loss (such as MAE).

* Sematic segmentation

    Q: The target is to classify every ssingle pixel on the image as belonging to a single class.

    A: In practice, it's expensive to build a feature map for each pixel and send that feature map through a fully connected network to predict the class of the pixel. The classical implementation will be a CNN encoder-decoder network. The encoder decreases the width and height of the image but increases its depth (number of features), while the decoder uses transposed convolution operations to increase its size and decrease depth. The input of this network is the image and the output is the segmentation map. A popular implementation of this encoder-decoder architecture is the [U-Net](https://github.com/jakeret/tf_unet).

* Object detection

    Q: It's a more complicated version of classification and localization. The difference is now there are multiple objects in the image and for each one we need to find the class and bounding box coordinates. In addition, neither the number of objects nor their size is known in advance. 

    A: In practice, we would use a tool like `Selective Search` to preprocess the images and find areas in the image that might contain objects. Those regions are called `Region Proposals`, and the network to detect them was called `Region Proposal Network` (`R-CNN`). There's a better improved version called [Faster R-CNN](https://github.com/tensorpack/tensorpack/tree/master/examples/FasterRCNN) which use a trainable network `Region Proposal Network (RPN)` to get the regions. The entire image is fed through the CNN and the region proposals are projected onto the resulting feature map. Each region of interest is fed through and `Region of Interest (ROI)` pooling layer and then to a fully connected network, which produces a feature vector for the ROI. ROI pooling is a widely used operation in object detection tasks using CNN. The ROI pooling layer uses max pooling to convert the features inside any valid region of interest into a small feature map with a fixed spatial extent of H × W (where H and W are two hyperparameters). The feature vector is then fed into two fully connected networks, one to predict the class of the ROI and the other to correct the bounding box coordinates for the proposal.

* Instance segmentation

    Q: It needs to distinguish between different instances of the same class in an image. It is not required to label every single pixel in the image, but we need to find a binary mask that covers each object.

    A: Google's [Mask R-CNN](https://colab.research.google.com/github/tensorflow/tpu/blob/master/models/official/mask_rcnn/mask_rcnn_demo.ipynb) and [DeepLab](https://colab.research.google.com/github/tensorflow/models/blob/master/research/deeplab/deeplab_demo.ipynb#scrollTo=edGukUHXyymr)

* Video processing

    3D Convnets are pretty expensive to train. So in practice, there are three ways to train video related datasets:

    1. Use pretrained CNNs to extract all features, then pass the feature maps into an RNN, which will learn sequences across multiple frames and emit the final classification.

    2. Similar like #1 but the final layer is an MLP instead off an RNN.

    3. Use a 3D CNN to extracts spatial and visual features. Then pass the extracted features inot either an RNN or MLP.

* Textual documents

    For some special NLP problems like sentiment analysis, which the words spatial information is not important, we can use CNN to preprocess the text.

* Audio & Music

    Each digital sound we hear is based on 16,000 samples per second (sometimes 48,000 or more) and building a predictive model where we learn to reproduce a sample based on all the previous ones is a very difficult challenge.

    [WaveNet](https://deepmind.com/blog/wavenet-generative-model-raw-audio/) released by DeepMind improved the Text-to-Speech(TTS) system significantly.

    * Concatenative  TTS is where single speech voice fragments are first memorized and then recombined when the voice has to be reproduced. However, this approach does not scale because it is possible to reproduce only the memorized voice fragments, and it is not possible to reproduce new speakers or different types of audio without memorizing the fragments from the beginning.

    * Parametric TTS is where a model is created for storing all the characteristic features of the audio to be synthesized. Before WaveNet, the audio generated with parametric TTS was less natural than concatenative TTS. WaveNet enabled significant improvement by modeling directly the production of audio sounds, instead of using intermediate signal processing algorithms as in the past.

    There are two famous implementations of the WaveNet. https://github.com/ibab/tensorflow-wavenet and https://magenta.tensorflow.org/nsynth (https://colab.research.google.com/notebooks/magenta/nsynth/nsynth.ipynb)

    [MuseNet](https://openai.com/blog/musenet/) released by OpenAI is another audio generation tool.

* Capsule networks
    
    The pooling layer in CNN introduces a significant problem because if forces to loss all the positional data (spatial relationships between pixels).











