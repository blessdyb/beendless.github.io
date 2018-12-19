---
title: JavaScript 机器学习之分类与聚合算法
date: 2018-12-18 22:11:32
categories: CS
tags: 
    - Machine Learning
    - JavaScript
---

聚类是接触无监督式学习时常见的一个问题。通常在你想将一个大的数据集重新编排组织成小的群组，或者是将其按逻辑相似性分解成小的群组时我们会考虑聚类。例如，你可以尝试将人口普查数据中的家庭收入分成三个群组：低收入，中等收入及高收入。如果你将家庭收的数据集做为指定的一种聚类算法的输入，你将期望得到三个数据聚点 及其对应的前述三个收入分组的平均值做为结果。即使是这种家庭收入数据的一维聚类问题，你也可能很难通过手动解决——难点在于无法快速地确定两个分组之间的边界值。你可能可以参考政府部门所定义的收入分组的标准，但无法确定这类定义的标准是几何均衡的; 这类的标准可能是被政策制定者所发明出来的，因此它可能无法精确地表达数据之间的正真关系。

一个聚类是一组逻辑上存在某种相似性的数据点的集合。 他们可能是具有相同的行为的用户组，具有相似收入水平的居民，具有相似颜色的像素点的组合等等. K-平均聚类算法是一种数值和几何量化算法，因此它所生成的聚类所包含的点在数值上是相近的，在几何上也是彼此相近的。庆幸的是，大多数的数据集都是可以数值化的，因为K-平均聚类算法可适用于多种领域的问题。

K-均值算法是一个对于量化数据集而言快速，强大并广受欢迎的算法。它的名称来源于两部分：K表达了我们想要算法查找的聚类的个数，均值意味着确定这些聚类中心点的方式(你可以使用诸如K-中位数或K-众数等）。例如，我们设计了一个查找到三个代表整个数据集所有数据点的位置均值的聚类中心的算法，在此算法中，K=3 同时我们使用了K-均值分析的方式来确定聚类中心点的位置。

K-均值算法是一个迭代算法，这意味着它将在循环中来持续性地更新算法模型，直到模型处于某种稳定状态后才会退出循环并返回模型做为结果。如果更加形象具体地描述，K-均值算法的具体内容是：将你所要分析的所有的数据点绘制在其所对应的空间中，并选取一个K值。你必须在此能够明确地知道K的值，或者至少能够知道K的一个合理的取值范围(在这一节之后我们会给出如何处理这种情况)。之后随机生成K个数据点（如果K=5，生成五个数据点）并将其绘制在对应的空间内；这些点也被称为"重心聚点"，因为它们实质上代表的是聚类数据集的几何中心 。针对数据集空间的所有点，找到离这些点各自几何距离最新的数据重心聚点并将其连接或分配给这些数据点。一时所有的数据点都链接或分配到了数据重心聚点，此时再依次遍历所有的重心聚点并将其位置更新为与其连接或分配到其的所有数据点的平均位置。重复上述分配-更新的过程理直到所有的重心聚点的位置不在变化;这些重心聚点的最终位置即是聚类算法的输出，同时它们也是整个数据集在聚类操作后的分组聚点。上述的过程比较抽象，如果你感觉到很难理解，不要担心，接下来在我们设计并实现整个算法的过程中，我们会更加深入地对其加以示例进行介绍。

在这一章中，我们将首先讨论均值及距离的概念及及如何将它们应用到K-均值算法之中。之后我们将剖析算法的细节，并完全使用JavaScript来实现K-均值算法。接下来我们将使用多个不同的简单数据集来测试我们所实现的K-均值算法，同时讨论如何处理K未知的问题。我们将创建一个小的工具来自动化地确定K的值。基于以上知识，我们会分析K-均值算法中损失函数的概念，通过设计并实现一个损失函数来帮我们实现优化算法的目标。 以下是几个主要话题:
-   均值与距离
-   实现K-均值算法
-   示例一: 如何使用K-均值算法来处理二维数据
-   示例二: 如何使用K-均值算法来处理三维数据
-   K-均值算法当K未知时如何处理

## 均值和距离

K-均值算法的运行依赖于两个概念：均值和距离。为了计算出某个聚点中心的位置，算法需要计算所有连接到该数聚点中心所有数据点的平均值。这种情况下，我们会使用算术均值，即所有数据点的数值的和除以数据点的个数来得到这个均值。在ES5/标准JavaScript中,  我们可以创建如下函数:

```
/**  
 * @param {Array.<number>} 数值  
 * @return {float}  
 */
 function mean(numbers) {  
    var sum = 0, length = numbers.length;
    if (length === 0) {  
        /** 在数学定义中，一个空的数据集的均值是undefined,所以我们应该尽早地检测 
         *  到这种情况并中断执行。同时我们也应该允许函数试图计算0/0, 在JavaScript
         *  中会返回NaN，但在一些其它语言中会抛出异常。为了不让函数在此能够处理多种
         *  情况，我们在此直接抛出异常，而不是返回一个混合类型的值
         * /
         throw new Error('Cannot calculate mean of empty set');  
    }  
    for (var i = 0; i < length; i++) {  
        sum += numbers[i];  
    }  
    return sum / length;  
}
```
在ES6中，我们可以通过使用箭头函数来得到一个更为简练的表达式
```
const mean = numbers => numbers.reduce((sum, val) => sum + val, 0) / numbers.length;
```
然而上述的代码预设了所有的参数都是已定义好的数值，如果你在调用函数的过程中使用了一个空的数组，它将返回NaN。为了便于理解，我们还可以让上面的代码分解为两个步骤
```
const sum = (numbers) => numbers.reduce((sum, val) => sum + val, 0);  
const mean = (numbers) => sum(numbers) / numbers.length;
```
在此需要注意，我们可以使用任何形式的均值计算方式，包括中位数或众数。实际上，通常我们更倾向于使用K-中位数而不是K-均值。中位数在过滤数据集异常值方面比平均值更能得到更好的结果。因为你在使用过程中要提醒自己哪种均值的计算方式是你所需要的。如果你想要的是一个能够表达所有被消费的资源总数的方法，你可以使用算术平均值。如果你推测到数据集中的异常数据是由于错误的数据收集测量方式导致并且可以忽略的话，K-中数位可能更适合你的计算方式。

我们同时需要一个计算距离的算法。它可以使用任何一种测量距离的方式，但是，对于数值数据而言，我们更多地还是使用典型的欧几里德距离——你在高中时候学过的标准两点距离计算方式——使用ES5的话它的实现如下：
```
/**  
 * 计算二维数据点a和b之间的距离
 * 每个点应该是一个长度为2的数组，数组的每个数据成员都是数值类型
 * @param {Array.number} a  
 * @param {Array.number} b  
 * @return {float}  
 */
 function distance2d(a, b) {  
     var diff_0 = b[0] - a[0];  
     var diff_1 = b[1] - a[1];  
     return Math.sqrt(diff_0*diff_0 + diff_1*diff_1);  
}
```
但实际使用中我们需要支持多维数据，因为可以将上述的实现扩展为
```
/**  
 * @param {Array.number} a  
 * @param {Array.number} b  
 * @return {float}  
 */function distance(a, b) {  
    var length = a.length,  
        sumOfSquares = 0;  
  
    if (length !== b.length) {  
        throw new Error('Points a and b must be the same length');  
    }  
  
    for (var i = 0; i < length; i++) {  
        var diff = b[i] - a[i];  
        sumOfSquares += diff*diff;  
    }  
  
    return Math.sqrt(sumOfSquares);  
}
```
如果使用ES6的话我们可以简化上述的代码为:
```
const distance = (a, b) => Math.sqrt(  
    a.map((aPoint, i) => b[i] - aPoint)  
     .reduce((sumOfSquares, diff) => sumOfSquares + (diff*diff), 0)  
);
```
在装备了以上两个工具函数后，我们可以开始实现K-均值算法。

## 实现K-均值算法
### 配置环境

我们需要首先配置好开发环境。整个开发环境和第一章中提到的基本相同，以下为创建的具体过程。

首先，创建一个目录。比如可以全名为`Ch4-kmeans`。在此目录中创建一个子目录`src`。

其次，在项目根目录添加一个名为`package.json`的文件, 并输入如下内容：
```
{  
  "name": "Ch4-kmeans",  
  "version": "1.0.0",  
  "description": "ML in JS Example for Chapter 4 - kmeans",  
  "main": "src/index.js",  
  "author": "Burak Kanber",  
  "license": "MIT",  
  "scripts": {  
    "build-web": "browserify src/index.js -o dist/index.js -t [ babelify --presets [ env ] ]",  
    "build-cli": "browserify src/index.js --node -o dist/index.js -t [ babelify --presets [ env ] ]",  
    "start": "yarn build-cli && node dist/index.js"  
  },  
  "dependencies": {  
    "babel-core": "^6.26.0",  
    "babel-preset-env": "^1.6.1",  
    "babelify": "^8.0.0",  
    "browserify": "^15.1.0"  
  }  
}
```
在创建完成`package.json`文件为，切换到控制台程序中，在`Ch4-kmeans`项目根目录中执行命令`yarn install`。

接下来，在`Ch4-kmeans/src`目录中添加三个文件:  `index.js`,  `data.js`,  与  `kmeans.js`。我们将在`kmeans.js`中完成整个K-均值算法的实现, 同时会在`data.js`中加载一些测试简单的数据集,  最终将使用`index.js` 做为我们的程序启动入口并运行一系列的测试示例。

现在你可能想停下来并测试一下上述我们的设置是否可以正常运行。在`index.js` 中添加一行简单的代码`console.log("Hello");` 并在控制台程序中执行`yarn start`  。你将会发现源代码被编译与执行，同时在程序退出前在屏幕上输出`Hello` 。如果你得到了一些错误代码或者没有看到`Hello`，你可能需要重新检查你是否按照上述步骤进行了环境的配置。

### 初始化算法

在这一节中，我们将在`kmeans.js`文件中实现算法。首先是将上述的均值及距离计算的函数添加到文件的顶部。因为它们是通用性的静态函数，我们不会将其放入类的定义中。
将以下代码放放文件的顶部
```
/**  
 * 计算给定数组的均值
 * @param {Array.<number>} numbers  
 * @return {number}  
 */
 const mean = numbers => numbers.reduce((sum, val) => sum + val, 0) / numbers.length;  
  
/**  
 * 计算给定的两个数据点的距离
 * @param {Array.<number>} a  
 * @param {Array.<number>} b  
 * @return {number}  
 */
 const distance = (a, b) => Math.sqrt(  
    a.map((aPoint, i) => b[i] - aPoint)  
     .reduce((sumOfSquares, diff) => sumOfSquares + (diff*diff), 0)  
);
```
接下来，创建并导出`KMeans`类. 我们将在本章节接下来的内容中在这个类中加入多个函数。 先将以下代码加入到上述工具函数之下:
```
class KMeans {  
   /**  
   * @param k  
   * @param data  
   */  
    constructor(k, data) {  
        this.k = k;  
        this.data = data;  
        this.reset();  
    }  
  
  /**  
   * Resets the solver state; use this if you wish to run the * same solver instance again with the same data points * but different initial conditions. */  reset() {  
        this.error = null;  
        this.iterations = 0;  
        this.iterationLogs = [];  
        this.centroids = this.initRandomCentroids();  
        this.centroidAssignments = [];  
    }  
      
}  
  
export default KMeans;
```
我们已经创建了一个`KMeans`类并将其做为默认的导出模块。上述代码同时初始化了一些类所需要的实例变量，具体如下：

类的构造函数接受两个参数，`k`与`data`, 它们将在初始化过程中被赋值保存到对应的实例变量中。参数`k`代表了K-均值中的`K`, 或者说算法输出中的聚类的个数。参数`data`代表了算法将要处理的数据集数组。

在构造函数最后，我们调用了`reset()`方法，它是用来初始化(或重置)算法的状态。我们在`reset`方法中初始化的实例变量有：
-  `iterations`, 简单的计数量变量，来记录算法运行的循环次数，从0开始
-  `error`,  记录了当前循环中所有的数据点与其对应的重心聚点距离的均方根误差，即损失函数的值
-   `centroidAssignments`, 由所有数据点索引组成的数据，其值为对应数据点相关联的重心聚点的索引
-   `centroids`, 保存了当前循环中所有的重心聚点信息

注意在`reset`方法中，我们调用了一个未定义的方法`this.initRandomCentroids()`。K-均值算法必须要有初始化的重心聚点才可以执行，所以这个方法的目的就是随机生成指定数目的重心聚点的信息。由于算法初始于一个随机状态，因此多次执行这个算法将会基于其不同的初始状态而得到不同的结果。这是K-均值算法所期望的一个属性，因为它很可能在某一次运行后得到的是一个局部优化解，所以如果基于不同的初始状态来多次运行这个程序，我们更有可能得到的是全局的优化解。

在我们生成随机重心聚点前需要得到一些预设信息。首先，我们要必须获得数据集的维度信息。是二维，三维，十维还是1324维？我们生成的随机重心聚点必须与已知数据集的维度相同。这是一个比较简单的问题，我们假设所有的数据点都拥有相同的维度，这样我们只需要检测数据集中的第一个数据点的信息即可得到维度信息。将下述方法加入到`KMean`类中。
```
/**  
 * Determines the number of dimensions in the dataset. * @return {number}  
 */getDimensionality() {  
    const point = this.data[0];  
    return point.length;  
}
```
在生成随机初始化重心聚点信息时，另外一个需要考虑的地方就是我们的初始化重心聚点的位置应该与数据集中的数据尽可能地接近。例如，如果数据集中所有的数据点都是在(0,0)与(10,10)之间，你将不会想生成一个位置为(1200,740)的随机数据点。相似的，如果所有的数据点都是负值，你也不会想生成数值为正数的随机重心聚点数据。

为什么我们要关注随机重心聚点的初始值点？在这个算法中，数据点将被指定与其最近的重心聚点相关联，同时随着运行逐渐地将重心聚点拉到其所属的聚类的中心。如果所有重心聚点都在数据集的右边，那它们将会按照相似的连接路径与数据集相关联，这就导致所有数据点都被关联到其右侧与它们最近的一个重心聚点上，之后这个重心聚点将会被转化成一个局部的最优解。通过随机初始化重心聚点的操作，我们能够更大程度上避免这类的局部最优解的情况。

我们生成重心聚点初始位置的方法取决于数据集中所有数据点每一个维度的数值范围，在此范围内我们来生成对应维度的随机值。例如，给定数据集包含二维平面(x, y)上的三个数据点：(1,3), (5, 8)与(3, 0)。维度`x`处于1与5之间,维度`y`处于0与8之间。因此，在生成随机重心聚点的初始数据时，我们将在1和5之间随机选取一个数值做为随机重心聚点在维度`x`上的位置, 在0和8之间随机选取一个数值做为随机重心聚点在维度`y`上的位置。

我们可以使用JavaScript的数学函数`Math.min`   与  `Math.max`  来决定每个维度的数据取值范围。请将如下代码添加到`KMeans`类中:
 ```
/**  
 * For a given dimension in the dataset, determine the minimum * and maximum value. This is used during random initialization * to make sure the random centroids are in the same range as * the data. * * @param n  
 * @returns {{min: *, max: *}}  
 */getRangeForDimension(n) {  
    const values = this.data.map(point => point[n]);  
    return {  
        min: Math.min.apply(null, values),  
        max: Math.max.apply(null, values)  
    };  
}
```
这个方法首先从数据点的给定维度中收集了所有的数据值。之后返回了一个包含得到数据值的最小值与最大值的对象。例如对于之前例子中的三个数据点(1, 3), (5, 8)与(3, 0), 在调用`getRangeForDimension(0)`时会返回`{min: 1, max: 5}`, 在调用`getRangeForDimension(1)`时会返回`{min: 0, max: 8}`.

生成并保存一个包含所有维度数据数值范围的对象将会给初始化重心聚点提供极大的方便。请将如下方法加入`KMeans`的类中
```
/**  
 * Get ranges for all dimensions. * @see getRangeForDimension  
 * @returns {Array} Array whose indices are the dimension number and whose members are the output of getRangeForDimension  
 */getAllDimensionRanges() {  
    const dimensionRanges = [];  
    const dimensionality = this.getDimensionality();  
  
    for (let dimension = 0; dimension < dimensionality; dimension++) {  
        dimensionRanges[dimension] = this.getRangeForDimension(dimension);  
    }  
  
    return dimensionRanges;  
  
}
```
上述方法遍历了所有的维度并逐一返回对应维度的最大最小值, 最终构造了一个以维度为索引的对象数组。稍后我们将会使用这个方法。现在，我们终于可以来生成随机化的重心聚点初始值了。这将需要生成K个重心聚点，通过遍历数据点的所有维度，在每个维度中选取一个在其最小最大值数值范围中的随机值。请将如下方法加入`KMean`类中:
```
/**  
 * Initializes random centroids, using the ranges of the data * to set minimum and maximum bounds for the centroids. * You may inspect the output of this method if you need to debug * random initialization, otherwise this is an internal method. * @see getAllDimensionRanges  
 * @see getRangeForDimension  
 * @returns {Array}  
 */initRandomCentroids() {  
  
    const dimensionality = this.getDimensionality();  
    const dimensionRanges = this.getAllDimensionRanges();  
    const centroids = [];  
  
    // We must create 'k' centroids.  
  for (let i = 0; i < this.k; i++) {  
  
        // Since each dimension has its own range, create a placeholder at first  
  let point = [];  
  
        /**  
 * For each dimension in the data find the min/max range of that dimension, * and choose a random value that lies within that range.         */  
  for (let dimension = 0; dimension < dimensionality; dimension++) {  
            const {min, max} = dimensionRanges[dimension];  
            point[dimension] = min + (Math.random()*(max-min));  
        }  
  
        centroids.push(point);  
  
    }  
  
    return centroids;  
  
}
```
上述算法包含了两层循环。外层循环生成了K个重心聚点。由于数据集的数据维度是任意的，每一个维度自身的数据值范围也是任意的，我们必须遍历所有的纬度来生成随机的位置信息。如果你的数据集是三维的，那内层循环将会分别处理维度0,1,2，取得每个维度的最大最小值，之后选取一个随机值，但当得到的这个值指定给当前重心聚点的当前维度做为初始值。