---
title: Appstore 数据分析
description: 25 级计算机应用 1 班 pandas 综合案例讲义第 6 章第 1 节,以 App Store 应用商店数据为例,讲解描述性数据分析的完整流程,涵盖数据概况、数据清洗、单变量分析、业务数据可视化与业务解读。
keywords: pandas 综合案例,Appstore 数据分析,数据清洗,单变量分析,seaborn 可视化,业务解读,海南省经济技术学校
---

## 学习目标

- 掌握描述性数据分析流程
- 能够使用pandas、seaborn进行数据分析和可视化

## 1. 案例介绍

**案例背景**：

- 对 App 下载和评分数据分析，帮助 App 开发者获取和留存用户
- 通过对应用商店的数据分析为开发人员提供可操作的意见

**分析需求**：

- 免费和收费的 App 都集中在哪些类别
- 收费 App 的价格是如何分布的，不同类别的价格分布怎样
- App文件的大小和价格以及用户评分之间是否有关

**分析流程**：

1）数据概况分析

- 数据行/列数量
- 缺失值分布

2）单变量分析

- 数字型变量的描述指标（平均值，最小值，最大值，标准差等）
- 类别型变量（多少个分类，各自占比）

3）多变量分析

- 按类别交叉对比
- 变量之间的相关性分析

4）可视化分析

- 分布趋势（直方图）
- 不同组差异（柱状图）
- 相关性（散点图/热力图）

**数据集说明**：

本案例使用 `applestore.csv` 数据集，其数据字段如下：

| 字段 | 说明 |
| --- | --- |
| `id` | App ID：每个 App 唯一标识 |
| `track_name` | App 的名称 |
| `size_bytes` | 以 bytes 为单位的 App 大小 |
| `price` | 定价（美元） |
| `rating_count_tot` | App 所有版本的用户评分数量 |
| `rating_count_ver` | App 当前版本的用户评分数量 |
| `prime_genre` | App 的类别 |
| `user_rating` | App 所有版本的用户评分 |
| `sup_devices.num` | 支持的 iOS 设备数量 |
| `ipadSc_urls.num` | App 提供的截屏展示数量 |
| `lang.num` | 支持的语言数量 |

## 2. 数据清洗

1）加载 `applestore.csv` 数据，查看数据基本信息

```python
app = pd.read_csv('./data/applestore.csv', index_col=0)
app
```

![chapter06-01](/data-analysis/chapter06-01.webp)

```python
# 查看数据集的字段信息
app.info()
```

![chapter06-02](/data-analysis/chapter06-02.webp)

```python
# 查看数据集的各字段统计值
app.describe()
```

![chapter06-03](/data-analysis/chapter06-03.webp)

2）考虑将 sizebytes 变成 mb，新增数据 `size_mb`列

```python
app['size_mb'] = app['size_bytes']/(1024 * 1024)
app
```

![chapter06-04](/data-analysis/chapter06-04.webp)

```python
# 查看 size_mb 列的统计值
app.size_mb.describe()
```

![chapter06-05](/data-analysis/chapter06-05.webp)

3）根据价格新增是否免费 `paid` 列

```python
app['paid'] = app['price'].apply(lambda x: 1 if x > 0 else 0)
app
```

![chapter06-06](/data-analysis/chapter06-06.webp)

```python
# 查看 paid 列的统计信息
app['paid'].value_counts()
```

![chapter06-07](/data-analysis/chapter06-07.webp)

> 小结：
>
> - 处理了给分析造成难度的值(size-bytes)
> - 添加了方便分析的特征（免费/收费)

## 3. 单变量分析

1）查看 App 的结果是如何分布的

```python
# 查看 App 的价格是如何分布的
app.price.value_counts()
```

![chapter06-08](/data-analysis/chapter06-08.webp)

> 从数据中可以看出，价格>50的比较少，可以按照价格将 App 数据进行分组

2）按照价格将 App 数据进行分组

```python
bins = [0, 2, 10, 30]
labels = ['<2', '<10', '<30']
app['price_new'] = pd.cut(app.price, bins, right=False, labels=labels)
app.head()
```

![chapter06-09](/data-analysis/chapter06-09.webp)

```python
# 分组后查看数据分布情况
app.groupby('price_new')['price'].describe()
```

![chapter06-10](/data-analysis/chapter06-10.webp)

3）查看不同类别 App 价格是如何分布的

```python
# 不同类别 App 价格是如何分布的
app.groupby('prime_genre')['price'].describe()
```

![chapter06-11](/data-analysis/chapter06-11.webp)

4）删除价格大于 49.99 的 App 数据

```python
app = app[app['price'] <= 49.99]
app.head()
```

![chapter06-12](/data-analysis/chapter06-12.webp)

5）利用 App 所有版本的评分数量对数据进行分组

```python
# 查看 App 所有版本的评分数量的统计信息
app.rating_count_tot.describe()
```

![chapter06-13](/data-analysis/chapter06-13.webp)

```python
bins = [0, 1000, 5000, 100000, 5000000]
app['rating_new'] = pd.cut(app['rating_count_tot'], bins, right=False)
app.head()
```

![chapter06-14](/data-analysis/chapter06-14.webp)

```python
# 分组后查看数据分布情况
app.groupby('rating_new')['price'].describe()
```

![chapter06-15](/data-analysis/chapter06-15.webp)

## 4. 业务数据可视化

1）查看 App 的类别和用户评分之间的关系，绘制折线图

```python
import matplotlib.pyplot as plt
import seaborn as sns
%matplotlib inline

# app 评分关系
# height：关键字来控制图片高度 
# aspect：控制宽高比例
sns.relplot(x='prime_genre', y='user_rating', kind='line', data=app, height=5, aspect=3)
# 将 x 轴文字旋转45度
plt.xticks(
    rotation=45,
    horizontalalignment='right',
    fontweight='light',
    fontsize='x-large'  
)
```

![chapter06-16](/data-analysis/chapter06-16.webp)

> 结果说明：从上图中可以看出，大部分评分集中在 2 分和 4 分之间

2）查看价格小于等于 9.99 元的 App 价格分布

```python
plt.figure(figsize=(20, 8))
# 筛选出 price<=9.99 的 App 数据
app_result = app[app['price']<=9.99]
sns.distplot(app_result['price'])
```

![chapter06-17](/data-analysis/chapter06-17.webp)

> 结果说明：从上面的结果中看出，大部分应用都是免费的，极少数APP的收费>5元

3）查看不同类别的收费 App 的价格分布

```python
plt.figure(figsize=(20, 8))
sns.boxplot(x='price', y='prime_genre', data=app[app['paid']==1])
plt.yticks(fontweight='light', fontsize='x-large')
```

![chapter06-18](/data-analysis/chapter06-18.webp)

> 结果说明：价格绝大部分都集中在 9.99 美元以内，个别类别（如医疗）等因专业性总体价格会高于其他类别

4）查看数量最多的前 5 个类别收费 App 的价格分布

```python
# 筛选出数量最多的前 5 类 App 的数据
top5 = app.groupby('prime_genre')['price'].count().sort_values(ascending=False).head()
app5 = app[app.prime_genre.isin(top5.index)]
# 绘制箱线图
plt.figure(figsize=(20, 8))
sns.boxplot(x='price', y='prime_genre', data=app5[app5['paid']==1])
```

![chapter06-19](/data-analysis/chapter06-19.webp)

> 结果说明：从上图可以看出，Games的价格分布更广，最大值也较高，异常值也较多

**箱线图补充**：

![chapter06-20](/data-analysis/chapter06-20.webp)

- 箱子的中间有一条线，代表了数据的中位数
- 箱子的上下底，分别是数据的上四分位数（Q3）和下四分位数（Q1）
- 箱体包含了50%的数据。因此，**箱子的高度在一定程度上反映了数据的波动程度**
- 上下边缘则代表了该组数据的最大值和最小值
- 有时候箱子外部会有一些点，可以理解为数据中的**"异常值"**

5）查看 App 数据中价格和用户评分的关系，绘制散点图

```python
plt.figure(figsize=(20, 8))
sns.scatterplot(x='price', y='user_rating', data=app)
```

![chapter06-21](/data-analysis/chapter06-21.webp)

> 结果说明：从散点图可以看出，价格和评价关联不强，高价的应用评价两级分化，但数据相对较少

```python
# 同一类别，将免费和付费的评分进行对比
plt.figure(figsize=(20, 8))
sns.barplot(x='prime_genre', y='user_rating', data=app5, hue='paid')
```

![chapter06-22](/data-analysis/chapter06-22.webp)

## 5. 业务解读

### 5.1 业务问题1：免费或收费 App 集中在哪些类别？

**分析思路**：

- 第一步：将数据统计出每个类别有多少个app
- 第二步：从高到低进行排列
- 第三步：将数据进行可视化

```python
plt.figure(figsize=(20, 8))
# 参数 order 指定数据显示的顺序
sns.countplot(y='prime_genre', data=app,
              order=app['prime_genre'].value_counts().index, hue='paid')
```

![chapter06-23](/data-analysis/chapter06-23.webp)

> 业务解答：免费或收费都是高度集中在游戏类别

### 5.2 业务问题2：免费与收费的 App 在不同评分区间的分布？

1）将评分进行分箱，查看落入不同箱中应用的数量

```python
bins=[0,0.5,2.5,4.5,5.1]
app['rating_level'] = pd.cut(app.user_rating, bins, right=False)
app.groupby('rating_level')['user_rating'].describe()
```

![chapter06-24](/data-analysis/chapter06-24.webp)

2）数据可视化

```python
plt.figure(figsize=(20, 8))
sns.countplot(x='paid', data=app, hue='rating_level')
```

![chapter06-25](/data-analysis/chapter06-25.webp)

### 5.3 业务问题3：APP的价格、大小和用户评分之间有关系吗？

1）通过 `corr` 计算 App 的价格、大小和用户评分之间的关系

```python
app[['user_rating', 'price', 'size_mb']].corr()
```

![chapter06-26](/data-analysis/chapter06-26.webp)

2）通过热力图来查看变量之间两两相关系数

```python
plt.figure(figsize=(20, 8))
sns.heatmap(app[['user_rating', 'price', 'size_mb']].corr())
```

![chapter06-27](/data-analysis/chapter06-27.webp)

> 业务解答：应用的大小、价格与评分没有很明显的关联，但是价格和大小之间有正相关关系

## 总结

- 常规的探索性数据分析套路：查看概况->单变量分析->多变量分析->可视化分析
- seaborn在绘制柱状图的时候，可以使用`hue`参数 传入类别型变量，方便进行对比
