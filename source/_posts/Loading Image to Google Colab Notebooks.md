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