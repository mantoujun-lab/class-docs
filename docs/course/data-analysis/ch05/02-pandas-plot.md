---
title: pandas 绘图
description: 25 级计算机应用 1 班 Python 数据可视化讲义第 5 章第 2 节,介绍 pandas 单变量与双变量可视化,涵盖柱状图、折线图、面积图、直方图、饼图、散点图、蜂窝图与堆叠图,以葡萄酒评论数据集为案例。
keywords: pandas 绘图,柱状图,折线图,面积图,直方图,饼图,散点图,hexplot,蜂窝图,堆叠图,数据倾斜,葡萄酒数据,海南省经济技术学校
---
# pandas 绘图

::: tip 本节示例数据
本节示例数据请通过下方链接下载,保存到与 Notebook 同目录的 `data/` 文件夹下:

- [winemag-data_first150k.csv](/data/winemag-data_first150k.csv)
:::

## 学习目标

- 熟练掌握Pandas数据可视化常用功能

## 1. pandas 数据可视化简介

> pandas库是Python数据分析的核心库

1）它不仅可以加载和转换数据,还可以做更多的事情：它还可以可视化

2）pandas 绘图 API 简单易用,是 pandas 流行的重要原因之一

## 2. pandas 单变量可视化

> 单变量可视化： 包括条形图、折线图、直方图、饼图等

### 2.1 数据集简介

数据使用葡萄酒评论数据集, 来自葡萄酒爱好者杂志([wineEnthusiast](https://winemag.com))：包含10个字段、150929行、每一行代表一款葡萄酒

| 字段名 | 字段描述 |
| --- | --- |
| country | 葡萄酒产地(国家) |
| description | 对酒的评语(气味\味道\外观\感觉等) |
| designation | 用于酿酒的葡萄产自哪个葡萄园 |
| points | WineEnthusiast(葡萄酒爱好者杂志)对葡萄酒的评分(1~100) |
| price | 价格 |
| province | 葡萄酒产地(省/州) |
| region_1 | 葡萄种植区_1 |
| region_2 | 葡萄种植区_2(有可能为空) |
| variety | 用于酿酒的葡萄种类 |
| winery | 酿酒厂名 |

```python
# 加载数据
reviews = pd.read_csv('./data/winemag-data_first150k.csv', index_col=0)
reviews.head()
```

![chapter05-16](/data-analysis/chapter05-16.webp)

### 2.2 柱状图和分类数据

> 柱状图是最简单最常用的可视化图表
>
> **条形图(柱状图)非常灵活**：
>
> - 高度可以代表任何东西,只要它是数字即可
> - 每个条形可以代表任何东西,只要它是一个类别即可。

在下面的案例中,将所有的葡萄酒品牌按照产区分类,看看哪个产区的葡萄酒品最多.

1）示例：统计生产葡萄酒最多的 10 个产区

```python
# 准备绘图参数
text_kwargs = dict(figsize=(16, 8),
                   fontsize=16,
                   color= ['b','orange','g','r','purple','brown','pink','gray','cyan','y'])
# 获取葡萄酒产量最多的10个产区,并绘制柱状图
reviews['province'].value_counts().head(10).plot.bar(**text_kwargs)
```

![chapter05-17](/data-analysis/chapter05-17.webp)

> 上面的图表说明加利福尼亚生产的葡萄酒比其他省都多

也可以折算成比例, 计算加利福尼亚葡萄酒占总数的百分比：

```python
(reviews['province'].value_counts().head(10) / len(reviews)).plot.bar(**text_kwargs)
```

![chapter05-18](/data-analysis/chapter05-18.webp)

> 在《葡萄酒杂志》（Wine Magazine）评述的葡萄酒中,加利福尼亚生产了近三分之一！

也可以用来展示《葡萄酒杂志》（Wine Magazine）给出的评分数量的分布情况：

```python
reviews['points'].value_counts().sort_index().plot.bar(**text_kwargs)
```

![chapter05-19](/data-analysis/chapter05-19.webp)

### 2.2 折线图

> 如果要绘制的数据不是类别值,而是连续值比较适合使用折线图

```python
# reviews['points'].value_counts().sort_index().plot()
reviews['points'].value_counts().sort_index().plot.line()
```

![chapter05-20](/data-analysis/chapter05-20.webp)

**柱状图和折线图区别**：

1）柱状图：简单直观,很容易根据柱子的长短看出值的大小,易于比较各组数据之间的差异

2）折线图：

- 易于比较各组数据之间的差异
- 能比较多组数据在同一个维度上的趋势
- 每张图上不适合展示太多折线

**小练习：柱状图或折线图**

- 5种不同口味冰淇淋,不同口味冰淇淋的销售数量。
- 国产轿车不同品牌的月销售数量。
- 学生的考试分数：范围为0-100

### 2.3 面积图

> 面积图就是在折线图的基础上,把折线下面的面积填充颜色

```python
reviews['points'].value_counts().sort_index().plot.area()
```

![chapter05-21](/data-analysis/chapter05-21.webp)

### 2.4 直方图

> 直方图看起来很像条形图。 直方图是一种特殊的条形图,它可以将数据分成均匀的间隔,并用条形图显示每个间隔中有多少行。
>
>  直方图柱子的宽度代表了分组的间距,柱状图柱子宽度没有意义
>
> 直方图缺点：将数据分成均匀的间隔区间,所以它们对歪斜的数据的处理不是很好

```python
reviews[reviews['price'] < 200]['price'].plot.hist()
```

![chapter05-22](/data-analysis/chapter05-22.webp)

```python
reviews['price'].plot.hist()
```

![chapter05-23](/data-analysis/chapter05-23.webp)

**结果说明**：

- 在第一个直方图中,将价格>200的葡萄酒排除了
- 在第二个直方图中,没有对价格做任何处理,由于有个别品种的酒价格极高,导致直方图的价格分布发生变化

```python
# 查看葡萄酒价格高于 1500 情况
reviews[reviews['price'] > 1500]
```

![chapter05-24](/data-analysis/chapter05-24.webp)

```python
# 查看葡萄酒价格高于 500 情况
reviews[reviews['price'] > 500].shape
```

![chapter05-25](/data-analysis/chapter05-25.webp)

**数据倾斜**：

- 当数据在某个维度上分布不均匀,称为数据倾斜
- 一共15万条数据,价格高于1500的只有三条
- 价格高于500的只有73条数据,说明在价格这个维度上,数据的分布是不均匀的
- 直方图适合用来展示没有数据倾斜的数据分布情况,不适合展示数据倾斜的数据

对葡萄就的评分不存在数据倾斜的情况,评分数据的分布情况比较适合用直方图展示：

```python
reviews['points'].plot.hist()
```

![chapter05-26](/data-analysis/chapter05-26.webp)

**小练习：柱状图,折线图/面积图 还是直方图**

- 不同苹果种类（花牛, 富士, 国光等）在果园采摘的苹果量。
- 一个赛季在所有篮球比赛中的得分

### 2.5 饼图

> 饼图也是一种常见的可视化形式

```python
reviews['province'].value_counts().head(10).plot.pie(figsize=(20, 8))
```

![chapter05-27](/data-analysis/chapter05-27.webp)

**饼图的缺陷：饼图只适合展示少量分类在整体的占比**

- 如果分类比较多,必然每个分类的面积会比较小,这个时候很难比较两个类别
- 如果两个类别在饼图中彼此不相邻,很难进行比较
- 可以使用柱状图图来替换饼图

## 3. pandas 双变量可视化

在上一小节中,介绍了使用Pandas绘图,理解单个变量在数据中的相互关系,本小节会考察两个变量如何进行可视化

> 数据分析时,我们需要找到变量之间的相互关系,比如一个变量的增加是否与另一个变量有关,数据可视化是找到两个变量的关系的最佳方法

### 3.1 散点图

> 简单的两个变量可视化图形是散点图,散点图中的一个点,可以表示两个变量

```python
reviews[reviews['price'] < 100].sample(100).plot.scatter(x='price',
                                                         y='points')
```

![chapter05-28](/data-analysis/chapter05-28.webp)

调整图形大小,字体大小,由于pandas的绘图功能是对Matplotlib绘图功能的封装,所以很多参数pandas 和 matplotlib都一样：

```python
reviews[reviews['price'] < 100].sample(100).plot.scatter(x='price',
                                                         y='points',
                                                         figsize=(20, 8),
                                                         fontsize=16)
```

![chapter05-29](/data-analysis/chapter05-29.webp)

修改x轴、y轴标签字体：

```python
import matplotlib.pyplot as plt
fig, axes = plt.subplots(ncols=1, figsize=(20, 10))
reviews[reviews['price'] < 100].sample(100).plot.scatter(x='price',
                                                         y='points',
                                                         figsize=(20, 8),
                                                         fontsize=16,
                                                         ax=axes)
axes.set_xlabel('price', fontdict={'fontsize': 16})
axes.set_ylabel('points', fontdict={'fontsize': 16})
```

![chapter05-30](/data-analysis/chapter05-30.webp)

结果说明：上图显示了价格和评分之间有一定的相关性：也就是说,价格较高的葡萄酒通常得分更高

请注意,我们必须对数据进行采样,从所有数据中抽取100条数据,如果将全部数据（15万条）都绘制到散点图上,会有很多点重叠在一起,不便于观察：

```python
reviews[reviews['price'] < 100].plot.scatter(x='price',
                                             y='points',
                                             figsize=(20, 8),
                                             fontsize=16)
```

![chapter05-31](/data-analysis/chapter05-31.webp)

> 由于散点图的缺点,因此散点图最适合使用相对较小的数据集以及具有大量唯一值的变量。
>
> 有几种方法可以处理过度绘图：
>
> 1）对数据进行采样
>
> 2）hexplot(蜂窝图)

### 3.2 hexplot

> hexplot 将数据点聚合为六边形,然后根据其内的值为这些六边形上色

```python
reviews[reviews['price'] < 100].plot.hexbin(x='price', y='points',
                                            figsize=(16, 8), gridsize=15)
```

![chapter05-32](/data-analysis/chapter05-32.webp)

上图 x 轴坐标缺失,属于bug,可以通过调用 matplotlib 的 api 添加 x 坐标：

```python
fig, axes = plt.subplots(ncols=1, figsize=(16, 8))
reviews[reviews['price'] < 100].plot.hexbin(x='price', y='points',
                                            figsize=(16, 8), gridsize=15, ax=axes)
```

![chapter05-33](/data-analysis/chapter05-33.webp)

**结果说明**：

- 该图中的数据可以和散点图中的数据进行比较,但是 hexplot 能展示的信息更多
- 从 hexplot 中,可以看到《葡萄酒杂志》（Wine Magazine）评论的葡萄酒瓶大多数是87.5分,价格20美元
- hexplot 和散点图可以应用于区间变量和/或有序分类变量的组合

### 3.3 堆叠图（Stacked plots）

> 展示两个变量,除了使用散点图,也可以使用堆叠图
>
> 堆叠图是将一个变量绘制在另一个变量顶部的图表

接下来通过堆叠图来展示最常见的五种葡萄酒：

1）查看数量最多的 5 种葡萄酒

```python
reviews.groupby('variety')['country'].count().sort_values(ascending=False)
```

![chapter05-34](/data-analysis/chapter05-34.webp)

**结果说明**：

从结果中看出,最受欢迎的葡萄酒是：Chardonnay（霞多丽白葡萄酒）、Pinot Noir（黑皮诺）、Cabernet Sauvignon（赤霞珠）、Red Blend（混酿红葡萄酒） 、Bordeaux-style Red Blend （波尔多风格混合红酒）

2）从数据中取出最常见的 5 种葡萄酒

```python
# 取出最常见的 5 种酒
top_5_wine = reviews[reviews.variety.isin(['Chardonnay',
                                           'Pinot Noir',
                                           'Cabernet Sauvignon',
                                           'Red Blend',
                                           'Bordeaux-style Red Blend'])]
top_5_wine
```

![chapter05-35](/data-analysis/chapter05-35.webp)

3）通过透视表找到每种葡萄酒中,不同评分的数量

```python
wine_counts = top_5_wine.pivot_table(values='country',
                                     index='points',
                                     columns='variety',
                                     aggfunc='count')
wine_counts
```

![chapter05-36](/data-analysis/chapter05-36.webp)

**结果说明**：

从上面的数据中看出,行列分别表示一个类别变量（评分,葡萄酒类别）,行列交叉点表示计数,这类数据很适合用堆叠图展示

4）利用上面的数据展示堆叠图

```python
wine_counts.plot.bar(figsize=(16, 8), stacked=True)
```

![chapter05-37](/data-analysis/chapter05-37.webp)

> 图为堆积柱状图,适合展示少量类别的分类数据

```python
# 面积堆积图
wine_counts.plot.area(figsize=(16, 8))
```

![chapter05-38](/data-analysis/chapter05-38.webp)

**面积堆积图的使用限制**：

- 种类较多的数据不适合用堆积图,图中显示的数据有五个种类,比较适合,一般不要超过8个种类
- 堆积图的可解释性（读图）较差

5）利用上面的数据展示折线图

```python
wine_counts.plot.line()
```

![chapter05-39](/data-analysis/chapter05-39.webp)

**结果说明**：

- 从上图看出,折线图的读图更容易,更容易对不同类别做对比
- 例如：在87分的酒中,哪个类别更多？从图中很容易看出,绿色的霞多丽比红色的黑皮诺略多

## 总结

- pandas 绘图是对 Matplotlib 的封装
- Series 和 DataFrame 都有 plot 属性,根据不同的图形类型,调用对应的函数
- 可以通过 Matplotlib 控制图片的方法来控制 pandas 绘图的效果
