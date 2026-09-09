---
title: Matplotlib 绘图
description: 25 级计算机应用 1 班 Python 数据可视化讲义第 5 章第 1 节,介绍数据可视化概念、Python 常用绘图库对比,以及使用 Matplotlib 进行状态接口与面向对象绘图、单变量与多变量统计图绘制的方法。
keywords: Matplotlib,Python 绘图,数据可视化,Anscombe 数据集,tips 数据集,直方图,散点图,子图,坐标系,海南省经济技术学校
---
# Matplotlib 绘图

## 学习目标

- 知道数据可视化的相关概念
- 知道 Python 数据可视化常用库和各自特点
- 能够使用 Matplotlib 进行简单数据可视化

## 1. 数据可视化简介

### 1.1 数据可视化概念

> 数据可视化是指直观展现数据,它是数据处理过程的一部分。

把数值绘制出来更方便比较。借助数据可视化,能更直观地理解数据,这是直接查看数据表做不到的。

数据可视化有助于揭示数据中隐藏的模式,数据分析时可以利用这些模式选择模型。

### 1.2 数据可视化常用库

1）**Matplotlib（功能强大,代码相对复杂）**

- Matplotlib是Python编程语言的开源绘图库。它是Python可视化软件包中最突出的,使用最广泛的绘图工具。
- Matplotlib在执行各种任务方面非常高效。可以将可视化文件导出为所有常见格式（PDF,SVG,JPG,PNG,BMP和GIF）。
- Matplotlib可以创建流行的可视化类型-折线图,散点图,直方图,条形图,误差图,饼图,箱形图以及更多其他类型的图,还支持3D绘图。
- 许多Python库都是基于Matplotlib构建的,Pandas和Seaborn是在Matplotlib上构建的
- Matplotlib项目由John Hunter于2002年启动。Matplotlib最初是在神经生物学的博士后研究期间开始可视化癫痫患者的脑电图（ECoG）数据。

2）**Pandas （使用简单,功能稍弱）**

- Pandas的绘图功能基于Matplotlib,是对Matplotlib的二次封装
- Matplotlib绘图时,代码相对复杂,使用Pandas绘制基本图表相对比较简单,更加方便
- Pandas中常用的数据结构 series 和 dataframe 都有plot()方法,用于绘图

3）**Seaborn （推荐使用）**

- Seaborn是基于Matplotlib的图形可视化python开源库
- Seaborn是在Matplotlib的基础上进行了更高级的API封装,从而使得作图更加容易
- Seaborn的API设计偏向探索和理解数据

4）**echarts 和 pyecharts （追求可视化效果,推荐使用）**

- ECharts,是百度开源,使用 JavaScript 实现的开源可视化库,可以流畅的运行在 PC 和移动设备上,兼容当前绝大部分浏览器（IE8/9/10/11,Chrome,Firefox,Safari等）,底层依赖矢量图形库 [ZRender](https://github.com/ecomfe/zrender),提供直观,交互丰富,可高度个性化定制的数据可视化图表
- pyecharts 是一个用Python生成 Echarts 图表的类库。

## 2. Matplotlib 绘图

### 2.1 Matplotlib绘图入门

> 使用 Matplotlib 绘图,首先需要导入 pyplot 模块,该模块包含一系列绘图函数的相关函数

```python
from matplotlib import pyplot as plt
```

Matplotlib提供了两种方法来作图：状态接口和面向对象

1）状态接口

```python
# 准备数据
x = [-3, 5, 7]
y = [10, 2, 5]

# 创建画布
plt.figure(figsize=(15, 3))
# plot绘图
plt.plot(x, y)
# 设置x轴和y轴的取值范围
plt.ylim(0, 10)
plt.xlim(-3, 8)
# 设置x轴和y轴的标签
plt.xlabel('X Axis', size=20)
plt.ylabel('Y Axis')
# 设置标题
plt.title('Line Plot', size=30)

plt.show()
```

![chapter05-01](/data-analysis/chapter05-01.webp)

2）面向对象

```python
# 准备数据
x = [-3, 5, 7]
y = [10, 2, 5]

# 创建坐标轴对象
fig, ax = plt.subplots(figsize=(15, 3))
# 进行绘图
ax.plot(x, y)
# 设置x轴和y轴的范围
ax.set_xlim(-3, 8)
ax.set_ylim(0, 10)
ax.set_xlabel('X Axis', size=12)
ax.set_ylabel('Y Axis', size=12)
ax.set_title('Line Plot', size=20)
plt.show()
```

![chapter05-01](/data-analysis/chapter05-01.webp)

### 2.2 matplotlib 数据可视化案例

本案例通过 seaborn 模块中的 Anscombe 数据集说明数据可视化的重要性

- Anscombe 数据集由英国统计学家Frank Anscombe创建,数据集包含4组数据,每组数据包含两个连续变量
- 每组数据的平均值、方差、相关性都相同,但是当它们可视化后,就会发现每组数据的模式明显不同

1）加载`seaborn` 模块中提供的 `anscombe` 数据集

```python
import seaborn as sns
anscombe = sns.load_dataset('anscombe')
anscombe
```

![chapter05-03](/data-analysis/chapter05-03.webp)

2）数据中的 dataset 列,用来区分整个数据集中的子数据集

```python
dataset_1 = anscombe[anscombe['dataset']=='I']
dataset_2 = anscombe[anscombe['dataset']=='II']
dataset_3 = anscombe[anscombe['dataset']=='III']
dataset_4 = anscombe[anscombe['dataset']=='IV']
```

3）查看数据的统计分布情况

```python
dataset_1.describe()
```

![chapter05-04](/data-analysis/chapter05-04.webp)

```python
dataset_2.describe()
```

![chapter05-05](/data-analysis/chapter05-05.webp)

```python
dataset_3.describe()
```

![chapter05-06](/data-analysis/chapter05-06.webp)

```python
dataset_4.describe()
```

![chapter05-07](/data-analysis/chapter05-07.webp)

> 从数据的统计量看,变量X,Y,4个子数据集的平均值和标准差基本相同,但是平均值和标准差相同,几个数据集就完全相同么？下面绘制图形来查看一下这 4 个子数据集。

1）创建画布并且添加 4 个坐标系

```python
# 创建画布
fig = plt.figure(figsize=(16, 8))
# 向画布添加子图
# 子图有两行两列,位置是1
axes1 = fig.add_subplot(2, 2, 1)
# 子图有两行两列,位置是2
axes2 = fig.add_subplot(2, 2, 2)
# 子图有两行两列,位置是3
axes3 = fig.add_subplot(2, 2, 3)
# 子图有两行两列,位置是4
axes4 = fig.add_subplot(2, 2, 4)
```

2）在创建的各个坐标轴中绘制图表

```python
axes1.plot(dataset_1['x'], dataset_1['y'], 'o')
axes2.plot(dataset_2['x'], dataset_2['y'], 'o')
axes3.plot(dataset_3['x'], dataset_3['y'], 'o')
axes4.plot(dataset_4['x'], dataset_4['y'], 'o')
fig
```

![chapter05-08](/data-analysis/chapter05-08.webp)

3）为每个子图添加标题

```python
axes1.set_title('dataset_1')
axes2.set_title('dataset_2')
axes3.set_title('dataset_3')
axes4.set_title('dataset_4')
fig
```

![chapter05-09](/data-analysis/chapter05-09.webp)

4）为大图添加标题

```python
fig.suptitle('Anscombe Data')
fig
```

![chapter05-10](/data-analysis/chapter05-10.webp)

### 2.3 使用 Matplotlib 绘制统计图

> 本小节使用 seaborn 库的 tips 数据集,其中包含了某餐厅服务员收集的顾客付小费的相关数据

1）加载 `tips` 数据集类

```python
tips = sns.load_dataset('tips')
tips.head()
```

![chapter05-11](/data-analysis/chapter05-11.webp)

### 2.3.1 单变量绘图

> 在统计学属于中,`单变量`（univariate）指单个变量

**直方图**

- 直方图是观察单个变量最常用的方法。这些值是经过"装箱"（bin）处理的
- 直方图会将数据分组后绘制成图来显示变量的分布情况

```python
fig = plt.figure()
axes1 = fig.add_subplot(1, 1, 1)
# 绘制直方图
axes1.hist(tips['total_bill'], bins=10)

# 设置 x轴标题、y轴标题、坐标系的标题
axes1.set_xlabel('Total Bill')
axes1.set_ylabel('Frequency')
axes1.set_title('Histogram of Total Bill')
```

![chapter05-12](/data-analysis/chapter05-12.webp)

### 2.3.2 双变量绘图

> 双变量（bivariate)指两个变量

**散点图**

- 散点图用于表示一个连续变量随另一个连续变量的变化所呈现的大致趋势

```python
scatter_plot = plt.figure()
axes1 = scatter_plot.add_subplot(1, 1, 1)
# 绘制散点图
axes1.scatter(tips['total_bill'], tips['tip'])

# 设置 x轴标题、y轴标题、坐标系的标题
axes1.set_xlabel('Total Bill')
axes1.set_ylabel('Tip')
axes1.set_title('Scatterplot of Total Bill vs Tip')
```

![chapter05-13](/data-analysis/chapter05-13.webp)

### 2.3.3 多变量绘图

> 1）二维平面可以用来展示两个变量的数据,如果是多变量,比如添加一个性别变量,可以通过不同的颜色来表示
>
> 2）还可以通过圆点的大小来区分变量的不同,但如果变量的大小区别不大,可能通过圆点大小来区分效果不是很好

```python
def recode_sex(sex):
    if sex == 'Female':
        return 0
    else:
        return 1

tips['sex_color'] = tips['sex'].apply(recode_sex)
tips
```

![chapter05-14](/data-analysis/chapter05-14.webp)

```python
scatter_plot = plt.figure()
axes1 = scatter_plot.add_subplot(1, 1, 1)
# 绘制散点图
scatter = axes1.scatter(x=tips['total_bill'], y=tips['tip'],
              s=tips['size']*10, c=tips['sex_color'], alpha=0.5)

# 设置 x轴标题、y轴标题、坐标系的标题
axes1.set_xlabel('Total Bill')
axes1.set_ylabel('Tip')
axes1.set_title('Total Bill vs Tip Colored by Sex and Sized by Size')

# 添加图例
legend = axes1.legend(*scatter.legend_elements(), title="gender")
axes1.add_artist(legend)
```

![chapter05-15](/data-analysis/chapter05-15.webp)

## 总结

- Python常用绘图库
  - Matplotlib、pandas,seaborn,pyecharts等
- Matplotlib 绘图步骤
  - 导入Matplotlib.pyplot
  - 准备数据
  - 创建图表,坐标系
  - 绘制图表
  - 设置x、y轴标题、坐标系标题等
