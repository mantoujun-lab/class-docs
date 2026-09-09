---
title: 租房数据分析示例
description: 本节以链家租房数据集为案例,综合运用 read_csv、loc、iloc、布尔索引、groupby、sort_values 等 pandas 操作,完成数据加载、字段筛选、条件查询与统计汇总,串联前面章节的知识点。
keywords: pandas,租房数据,数据分析,read_csv,loc,iloc,布尔索引,实战
---

## 学习目标

- 能够完成租房数据分析的案例

## 1. 链家租房数据分析示例

### 1.1 数据加载和查看

1）加载 `LJdata.csv` 数据集

```python
house_data = pd.read_csv('./data/LJdata.csv')
house_data.head()
```

![chapter02-98](/data-analysis/chapter02-98.webp)

2）查看 `house_data` 数据的列标签

```python
# 查看 house_data 数据的列标签
house_data.columns
```

![chapter02-99](/data-analysis/chapter02-99.webp)

3）重新设置  `house_data` 数据的列标签

```python
house_data.columns = ['district', 'address', 'title', 'house_type', 'area', 
                      'price', 'floor', 'build_time', 'direction', 'update_time', 
                      'view_num', 'extra_info', 'link']
house_data.head()
```

![chapter02-100](/data-analysis/chapter02-100.webp)

4）查看 `house_data` 数据的行列数量

```python
house_data.shape
```

![chapter02-102](/data-analysis/chapter02-102.webp)

5）查看数据集基本信息：每个字段值的数量、是否非空值，以及该字段的数据类型

```python
house_data.info()
```

![chapter02-101](/data-analysis/chapter02-101.webp)

6）查看数据集中，所有数值型字段的基本统计信息

```python
house_data.describe()
```

![chapter02-103](/data-analysis/chapter02-103.webp)

7）查看数据集中，所有非数值型字段的基本统计信息

```python
import numpy as np
house_data.describe(include=[np.object_, pd.Categorical])
```

![chapter02-104](/data-analysis/chapter02-104.webp)

```python
# 将 DataFrame 进行转置操作(行列互换)
house_data.describe(include=[np.object_, pd.Categorical]).T
```

![chapter02-105](/data-analysis/chapter02-105.webp)

### 1.2 租房数据简单分析

**分析需求**：

```bash
示例1：查看房屋租金的最高价格、最低价格、平均值和中位数
示例2：找到租金最低和最高的房子的全部信息
示例3：统计看房人数最多的前 20 的区域
示例4：查看看房人数最多的房屋朝向
示例5：查看出租房屋的户型分布情况
示例6：查看热门小区(即：看房人数 TOP5 的小区)
示例7：查看出租房源最多的小区
示例8：查看望京租房价格在2000以下的房屋信息
示例9：查看租房价格在2000以下的房屋信息，并按照价格从低到高排序
```

1）示例1：查看房屋租金的最高价格、最低价格、平均值和中位数

```bash
house_data['price'].max()
house_data['price'].min()
house_data['price'].mean()
house_data['price'].median() # 中位数
```

![chapter02-106](/data-analysis/chapter02-106.webp)

2）示例2：找到租金最低和最高的房子的全部信息

```python
# 获取租金最低的房子信息
house_data.sort_values('price').head(1)
或
# house_data[house_data['price']==house_data['price'].min()]
house_data[house_data.price==house_data.price.min()]
或
house_data.nsmallest(1, 'price')
```

![chapter02-107](/data-analysis/chapter02-107.webp)

```python
# 获取租金最高的房子信息
house_data.sort_values('price').tail(1)
或
# house_data[house_data['price']==house_data['price'].max()]
house_data[house_data.price==house_data.price.max()]
或
house_data.nlargest(1, 'price')
```

![chapter02-108](/data-analysis/chapter02-108.webp)

3）示例3：统计看房人数最多的前 20 的区域

```python
result = house_data.groupby('district')['view_num'].sum().sort_values(ascending=False).head(20)
result
```

![chapter02-109](/data-analysis/chapter02-109.webp)

```python
%matplotlib inline
import matplotlib.pyplot as plt
# Mac 设置显示中文
plt.rcParams['font.sans-serif'] = 'Arial Unicode MS'
# Windows 设置显示中文
# plt.rcParams['font.sans-serif'] = 'SimHei'

result.plot.bar(figsize=(20, 8))
```

![chapter02-110](/data-analysis/chapter02-110.webp)

4）示例4：查看看房人数最多的房屋朝向

```python
house_data.groupby('direction')['view_num'].sum().sort_values(ascending=False).head(1)
或
house_data.groupby('direction')['view_num'].sum().nlargest(1)
```

![chapter02-111](/data-analysis/chapter02-111.webp)

5）示例5：查看出租房屋的户型分布情况

```python
result = house_data.groupby('house_type')['title'].count().sort_values(ascending=False)
result.plot.bar(figsize=(20, 8))
```

![chapter02-112](/data-analysis/chapter02-112.webp)

6）示例6：查看热门小区(即：看房人数 TOP5 的小区)

```python
result = house_data.groupby('address')['view_num'].sum().sort_values(ascending=False).head()
result.plot.bar()
```

![chapter02-113](/data-analysis/chapter02-113.webp)

7）示例7：查看出租房源最多的小区

```python
house_data.groupby('address')['title'].count().nlargest(n=1)
```

![chapter02-115](/data-analysis/chapter02-115.webp)

8）示例8：查看望京租房价格在2000以下的房屋信息

```python
house_data.query('district=="望京租房" & price<=2000')
或
house_data[(house_data['district']=='望京租房') & (house_data['price'] <= 2000)]
```

![chapter02-114](/data-analysis/chapter02-114.webp)

9）示例9：查看租房价格在2000以下的房屋信息，并按照价格从低到高排序

```python
house_data.query('price <= 2000').sort_values('price')
或
house_data[house_data['price'] <= 2000].sort_values('price')
```

![chapter02-116](/data-analysis/chapter02-116.webp)

## 总结

- 能够完成租房数据分析的案例
