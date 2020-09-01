---
title: Loading Image to Google Colab Notebooks
date: 2020-08-31 23:24:48
tags:
    - Machine Learning
    - Google Colab
keywords:
    - Machine Learning
    - Google Colab
---

Google Colab is one of the best place to start your Machine Learning. Sometime you may want to upload images to the notebooks from your local. Fortunately you can easily make it done throught the built-in API.

```python
from google.colab import files
from io import BytesIO
import matplotlib.pyplot as plt

uploaded_files = files.upload()

images =  {fname: plt.imread(BytesIO(fbinary)) for fname, fbinary in uploaded_files.items()}
```

If you are using Keras, you can also read the uploaded file and convert it to a Numpy array with built-in helper functions.
```python
from tensorflow.keras.preprocessing.image import load_img, img_to_array
TARGET_SIZE = 256
images = {fname: img_to_array(load_img(fname, target_size=(TARGET_SIZE, TARGET_SIZE))）for fname in uploaded_files.keys()}
```
