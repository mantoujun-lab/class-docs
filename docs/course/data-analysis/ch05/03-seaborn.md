---
title: seaborn 绘图
description: 25 级计算机应用 1 班 Python 数据可视化讲义第 5 章第 3 节,介绍 seaborn 单变量、双变量与多变量数据可视化,涵盖直方图、密度图、散点图、蜂窝图、箱线图、小提琴图、成对关系、分面与主题样式。
keywords: seaborn,数据可视化,直方图,核密度估计,频数图,计数图,散点图,蜂窝图,箱线图,小提琴图,成对关系,分面,主题样式,海南省经济技术学校
---
# seaborn 绘图

## 学习目标

- 掌握seaborn的可视化绘图方法

## 1. seaborn 简介

> seaborn 是基于 matplotlib 的图形可视化 python 包。它提供了一种高度交互式界面,便于用户能够做出各种有吸引力的统计图表。
>
> 1）seaborn 是在 matplotlib 的基础上进行了更高级的 API 封装,从而使得作图更加容易,在大多数情况下使用seaborn 能做出很具有吸引力的图,而使用 matplotlib 就能制作具有更多特色的图
>
> 2）seaborn和 pandas 的 API 配合的很好,使用 DataFrame/Series 的数据就可以绘图

1）加载 `fifa.csv` 数据

```python
import pandas as pd
# index_col指定行标签索引列, parse_dates=True：解析日期数据为datetime类型
fifa_data = pd.read_csv('./data/fifa.csv', index_col='Date', parse_dates=True)
fifa_data.head()
```

![chapter05-40](/data-analysis/chapter05-40.webp)

2）使用 `seanborn` 绘制折线图

```python
import seaborn as sns
import matplotlib.pyplot as plt
plt.figure(figsize=(16, 8))
sns.lineplot(data=fifa_data)
```

![chapter05-41](/data-analysis/chapter05-41.webp)

## 2. seaborn 单变量数据可视化

### 2.1 直方图

1）使用 `sns.distplot` 创建直方图,如下所示：

```python
# 加载 seaborn 的自带数据
tips = sns.load_dataset('tips')
# 使用 seaborn 的 distplot 函数绘图
ax = sns.distplot(tips['total_bill'])
ax.set_title('Total Bill Histogram with Density Plot')
```

![chapter05-42](/data-analysis/chapter05-42.webp)

> distplot 默认会同时绘制直方图和密度图(核密度估计 kde)。
>
> 核密度估计：就是采用平滑的峰值函数("核")来拟合观察到的数据点,从而对真实的概率分布曲线进行拟合。

如果只想绘制直方图,可以把 kde 参数设置为 False

```python
ax = sns.distplot(tips['total_bill'], kde=False)
ax.set_xlabel('Total Bill')
ax.set_ylabel('Frequency')
ax.set_title('Total Bill Histogram')
```

![chapter05-43](/data-analysis/chapter05-43.webp)

### 2.2 密度图（核密度估计）

> 密度图是展示单变量分布的另一种方法,本质上是通过绘制每个数据点为中心的正态分布,然后消除重叠的图,使曲线下的面积为1来创建的

```python
ax = sns.distplot(tips['total_bill'], hist=False)
ax.set_xlabel('Total Bill')
ax.set_ylabel('Density')
ax.set_title('Total Bill Histogram')
```

![chapter05-44](/data-analysis/chapter05-44.webp)

> 如果只绘制密度图,还可以使用sns.kdeplot函数

### 2.3 频数图

> 频数图是变量分布的一维表示,常与其他图一起使用,以增强可视化效果。

1）下图展示的是带密度图和频数图的直方图

```python
ax = sns.distplot(tips['total_bill'], rug=True)
ax.set_title('Total Bill Histogram with Density and Rug Plot')
ax.set_xlabel('Total Bill')
```

![chapter05-45](/data-analysis/chapter05-45.webp)

### 2.4 计数图（条形图）

> 计数图和直方图很像,直方图通过对数据分组来描述分布。计数图（条形图）是对离散变量（分类变量）计数

```python
ax = sns.countplot(x='day', data=tips)
ax.set_title('Count of days')
ax.set_xlabel('Day of the Week')
ax.set_ylabel('Frequency')
```

![chapter05-46](/data-analysis/chapter05-46.webp)

## 3. seaborn 双变量数据可视化

### 3.1 散点图

在 seaborn 中,创建散点图的方法有很多,但是并没有名为 scatter 的函数。

创建散点图可以使用 `regplot` 函数。`regplot` 不仅可以绘制散点图,还会拟合回归线,把 `fit_reg` 设置为`False`,将只显示散点图

```python
ax = sns.regplot(x='total_bill',y='tip',data=tips)
ax.set_title('Scatterplot of Total Bill and Tip')
ax.set_xlabel('Total Bill')
ax.set_ylabel('Tip')
```

![chapter05-47](/data-analysis/chapter05-47.webp)

`lmplot`函数和`regplot`函数类似,也可以用于创建散点图：

> lmplot函数内部会调用regplot,两者的主要区别是regplot创建坐标轴,而lmplot创建图

```python
fig = sns.lmplot(x='total_bill', y='tip', data=tips)
```

![chapter05-48](/data-analysis/chapter05-48.webp)

还可以使用`jointplot`在每个轴上创建包含单个变量直方图的散点图：

```python
joint = sns.jointplot(x='total_bill', y='tip', data=tips)
joint.set_axis_labels(xlabel='Total Bill', ylabel='Tip')
# 添加标题,设置字号
# 移动轴域上方的文字
joint.fig.suptitle('Joint Plot of Total Bill and Tip', fontsize=10, y=1.03)
```

![chapter05-49](/data-analysis/chapter05-49.webp)

### 3.2 蜂窝图

使用 seaborn 的`jointplot`绘制蜂窝图,和使用 Matplotlib 的 `hexbin` 函数进行绘制的效果类似

```python
joint = sns.jointplot(x='total_bill', y='tip', data=tips, kind='hex')
joint.set_axis_labels(xlabel='Total Bill', ylabel='Tip')
joint.fig.suptitle('Hexbin Joint Plot of Total Bill and Tip', fontsize=10, y=1.03)
```

![chapter05-50](/data-analysis/chapter05-50.webp)

### 3.3 2D 密度图

> 2D 核密度图和`distplot`类似,但2D核密度图可展示两个变量

```python
# shade：是否填充轮廓,默认为False
ax = sns.kdeplot(data=tips['total_bill'], data2=tips['tip'], shade=True)
ax.set_title('Kernel Density Plot of Total Bill and Tip')
ax.set_xlabel('Total Bill')
ax.set_ylabel('Tip')
```

![chapter05-51](/data-analysis/chapter05-51.webp)

```python
ax = sns.kdeplot(data=tips['total_bill'], data2=tips['tip'])
ax.set_title('Kernel Density Plot of Total Bill and Tip')
ax.set_xlabel('Total Bill')
ax.set_ylabel('Tip')
```

![chapter05-52](/data-analysis/chapter05-52.webp)

```python
kde_joint = sns.jointplot(x='total_bill', y='tip', data=tips, shade=True, kind='kde')
```

![chapter05-53](/data-analysis/chapter05-53.webp)

### 3.4 条形图

> 条形图也可以用于展现多个变量,`barplot` 默认会计算平均值

```python
ax = sns.barplot(x='time', y='total_bill', data=tips)
ax.set_title('Bar plot of average total bill for time of day')
ax.set_xlabel('Time of day')
ax.set_ylabel('Average total bill')
```

![chapter05-54](/data-analysis/chapter05-54.webp)

### 3.5 箱线图

> 箱线图用于显示多种统计信息：最小值、1/4分位、中位数、3/4分位、最大值,以及离群值（如果有）

```python
ax = sns.boxplot(x='time', y='total_bill', data=tips)
ax.set_title('Boxplot of total bill by time of day')
ax.set_xlabel('Time of day')
ax.set_ylabel('Total Bill')
```

![chapter05-55](/data-analysis/chapter05-55.webp)

### 3.6 小提琴图

> 箱线图是经典的可视化方法,但可能会掩盖数据的分布,小提琴图能显示与箱线图相同的值
>
> 小提琴图把"箱线"绘成核密度估计,有助于保留数据的更多可视化信息

```python
ax = sns.violinplot(x='time', y='total_bill', data=tips)
ax.set_title('Violin plot of total bill by time of day')
ax.set_xlabel('Time of day')
ax.set_ylabel('Total Bill')
```

![chapter05-56](/data-analysis/chapter05-56.webp)

### 3.7 成对关系

> 当大部分数据是数值时,可以使用`pairplot`函数把所有成对关系绘制出来

`pairplot` 函数会为单变量绘制直方图,双变量绘制散点图：

```python
fig = sns.pairplot(tips)
```

![chapter05-57](/data-analysis/chapter05-57.webp)

> `pairplot` 的缺点是存在冗余信息,图的上半部分和下半部分相同

可以使用`pairgrid`手动指定图的上半部分和下半部分：

```python
pair_grid = sns.PairGrid(tips)
pair_grid.map_upper(sns.regplot)
pair_grid.map_lower(sns.kdeplot, shade=True)
pair_grid.map_diag(sns.histplot, kde=True)
pair_grid.map_diag(sns.rugplot)
```

![chapter05-58](/data-analysis/chapter05-58.webp)

## 4. seaborn 多变量数据可视化

> 绘制多变量数据没有标准的套路,如果想在图中包含更多信息,可以使用颜色、大小和形状来区分它们

### 4.1 通过颜色区分

> 使用`violinplot`函数时,可以通过`hue`参数按性别（sex）给图着色

可以为"小提琴"的左右两半着不同颜色,用于区分性别：

```python
ax = sns.violinplot(x='time', y='total_bill', hue='sex', data=tips, split=True)
ax.set_title('Violin plot of total bill by time of day')
ax.set_xlabel('Time of day')
ax.set_ylabel('Total Bill')
```

![chapter05-59](/data-analysis/chapter05-59.webp)

其它绘图函数中也存在`hue`参数：

```python
scatter = sns.lmplot(x='total_bill', y='tip',
                     data=tips, hue='sex', fit_reg=False)
```

![chapter05-60](/data-analysis/chapter05-60.webp)

通过向`hue`参数传入一个类别变量,可以让`pairplot`变得更有意义：

```python
fig = sns.pairplot(tips, hue='sex')
```

![chapter05-61](/data-analysis/chapter05-61.webp)

### 4.2 通过大小和形状区分

> 可以通过点的大小表示更多信息,但通过大小区分应谨慎使用,当大小差别不大时很难区分

在 seaborn 中的`lmplot`,可以通过`scatter_kws`参数来控制散点图点的大小：

```python
scatter = sns.lmplot(x='total_bill', y='tip', data=tips,
                     fit_reg=False, hue='sex', markers=['o','x'])
```

![chapter05-62](/data-analysis/chapter05-62.webp)

### 4.3 分面

> 同一张二维图形中能展示的信息有限,如果想展示更多变量,可以使用分面（facet）来满足这些需求

1）使用 seaborn 的 `lmplot`函数重新绘制 `anscombe` 数据

```python
anscombe = sns.load_dataset('anscombe')
# col：用于指定分面变量 这里指定 'dataset' 列中,每个取值创建一张散点图
# col_wrap：用于指定绘制的图形有几列
anscombe_plot = sns.lmplot(x = 'x', y='y', data=anscombe,
                           fit_reg=False, col='dataset', col_wrap=2)
```

![chapter05-63](/data-analysis/chapter05-63.webp)

::: tip 注意
`lmplot`函数返回的是figure(图),但`regplot`函数返回的是 axes(坐标系),只有返回 figure 的函数,才有 col 和 col_wrap 参数
:::

如果是返回 axes 的函数,必须先创建 FacetGrid,通过 FacetGrid 创建分面：

```python
facet = sns.FacetGrid(tips, col='time', size=5)
facet.map(sns.distplot, 'total_bill', rug=True)
```

![chapter05-64](/data-analysis/chapter05-64.webp)

FacetGrid 中绘图可以直接调用 Matplotlib 中的绘图方法：

```python
facet = sns.FacetGrid(data=tips, col='day', hue='sex', height=5, col_wrap=2)
facet.map(plt.scatter, 'total_bill', 'tip')
facet.add_legend()
```

![chapter05-65](/data-analysis/chapter05-65.webp)

相同的效果也可以使用 seaborn 的 `lmplot` 实现：

```python
fig = sns.lmplot(x='total_bill', y='tip', data=tips,
                 fit_reg=False, hue='sex', col='day', col_wrap=2)
```

![chapter05-66](/data-analysis/chapter05-66.webp)

## 5. seaborn 主题和样式

上面的 seaborn 图都采用了默认样式,可以使用 `sns.set_style` 函数更改样式。

该函数只要运行一次,后续绘图的样式都会发生变化。

`seaborn` 有 5 种样式：

- darkgrid 黑色网格（默认）
- whitegrid 白色网格
- dark 黑色背景
- white 白色背景
- ticks

```python
ax = sns.violinplot(x='time', y='total_bill', hue='sex',
                    data = tips, split=True)
```

![chapter05-67](/data-analysis/chapter05-67.webp)

```python
sns.set_style('whitegrid')
ax = sns.violinplot(x='time', y='total_bill', hue='sex',
                    data = tips, split=True)
```

![chapter05-68](/data-analysis/chapter05-68.webp)

## 总结

- seaborn 是对 Matplotlib 以及 pandas 的封装,与Series、DataFrame的 API 配合很好
- seaborn的 API 非常简单
- 推荐使用 seaborn 或 pandas 进行绘图,如果需要对图形控制比较精细,可以使用Matplotlib
