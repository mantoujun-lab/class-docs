---
title: datetime 数据类型
description: 介绍 pandas 中 datetime 时间类型的处理方法,包括 datetime 对象创建、日期提取、Timedelta 运算、date_range 日期范围与重采样 resample,并通过银行数据、股票数据和丹佛报警记录案例演示时间序列分析流程。
keywords: pandas,datetime,Timedelta,DatetimeIndex,date_range,resample,时间序列,parse_dates,Timestamp,重采样
---
# datetime 数据类型

::: tip 本节示例数据
本节示例数据请通过下方链接下载,保存到与 Notebook 同目录的 `data/` 文件夹下:

- [country_timeseries.csv](/data/country_timeseries.csv)
- [banklist.csv](/data/banklist.csv)
- [TSLA.csv](/data/TSLA.csv)
- [crime.csv](/data/crime.csv)
:::

## 学习目标

- 能够使用 pandas 来处理日期时间类型数据

## 1. Python 的 datetime 对象

Python 内置了 datetime 对象,可以在 datetime 库中找到。

```python
from datetime import datetime
# 获取当前时间
t1 = datetime.now()
t1
```

![img](/data-analysis/chapter04-122.webp)

还可以手动创建 datetime：

```python
t2 = datetime(2020, 1, 1)
t2
```

![img](/data-analysis/chapter04-123.webp)

两个 datetime 数据可以相减：

```python
diff = t1 - t2
print(diff)
```

![img](/data-analysis/chapter04-124.webp)

```python
# 查看两个日期相间的结果类型
print(type(diff))
```

![img](/data-analysis/chapter04-125.webp)

## 2. pandas 中的数据转换成 datetime

pandas 可以使用 `to_datetime` 函数把数据转换成 `datetime` 类型。

1）加载 `country_timeseries.csv` 数据,并查看前 5 行的前 5 列数据

```python
ebola = pd.read_csv('./data/country_timeseries.csv')
ebola.iloc[:5, :5]
```

![img](/data-analysis/chapter04-126.webp)

> 注：从数据中看出 Date 列是日期,但通过 info 查看加载后数据为 object 类型

```python
ebola.info()
```

![img](/data-analysis/chapter04-127.webp)

3）可以通过 pandas 的 `to_datetime` 方法把 `Date` 列转换为 datetime,然后创建新列

```python
ebola['Date_Dt'] = pd.to_datetime(ebola['Date'])
ebola.info()
```

![img](/data-analysis/chapter04-128.webp)

4）如果数据中包含日期时间数据,可以在加载的时候,通过 `parse_dates` 参数指定自动转换为 datetime

```python
ebola = pd.read_csv('./data/country_timeseries.csv', parse_dates=[0])
ebola.info()
```

![img](/data-analysis/chapter04-129.webp)

## 3. 提取 datetime 的各个部分

1）获取了一个 datetime 对象,就可以提取日期的各个部分了

```python
dt = pd.to_datetime('2021-06-01')
dt
```

![img](/data-analysis/chapter04-130.webp)

> 可以看到得到的数据是 Timestamp 类型,通过 Timestamp 可以获取年、月、日等部分

```python
dt.year
dt.month
dt.day
```

![img](/data-analysis/chapter04-131.webp)

2）通过 `ebola` 数据集的 `Date` 列,创建新列 `year`、`month`、`day`

```python
ebola['year'] = ebola['Date'].dt.year
ebola['year']
```

![img](/data-analysis/chapter04-132.webp)

```python
ebola['month'] = ebola['Date'].dt.month
ebola['day'] = ebola['Date'].dt.day
ebola[['Date','year','month','day']].head()
```

![img](/data-analysis/chapter04-133.webp)

```python
ebola.info()
```

![img](/data-analysis/chapter04-134.webp)

## 4. 日期运算和 Timedelta

> Ebola 数据集中的 Day 列表示一个国家爆发 Ebola 疫情的天数。这一列数据可以通过日期运算重建该列

1）获取疫情爆发的第一天

```python
# 获取疫情爆发的第一天
ebola['Date'].min()
```

![img](/data-analysis/chapter04-135.webp)

结果说明：疫情爆发的第一天（数据集中最早的一天）是 2014-03-22。

2）计算疫情爆发的天数时,只需要用每个日期减去这个日期即可

```python
ebola['outbreak_day'] = ebola['Date'] - ebola['Date'].min()
ebola[['Date', 'Day', 'outbreak_day']]
```

![img](/data-analysis/chapter04-136.webp)

```python
ebola[['Date', 'Day', 'outbreak_day']].tail()
```

![img](/data-analysis/chapter04-137.webp)

3）执行这种日期运算,会得到一个 `timedelta` 对象

```python
ebola.info()
```

![img](/data-analysis/chapter04-138.webp)

## 5. 案例：银行数据分析

1）加载 `banklist.csv` 数据,并查看数据信息

```python
banks = pd.read_csv('./data/banklist.csv')
banks.head()
```

![img](/data-analysis/chapter04-139.webp)

```python
banks.info()
```

![img](/data-analysis/chapter04-140.webp)

2）重新加载 `banklist.csv` 数据,并指定把 `Closing Date` 和 `Updated Date` 转换为 datetime 类型

```python
banks = pd.read_csv('./data/banklist.csv', parse_dates=['Closing Date', 'Updated Date'])
banks.info()
```

![img](/data-analysis/chapter04-141.webp)

3）添加两列,分别表示银行破产的季度和年份

```python
banks['Closing Quarter'], banks['Closing Year'] = banks['Closing Date'].dt.quarter, banks['Closing Date'].dt.year
banks.head()
```

![img](/data-analysis/chapter04-142.webp)

4）可以根据新添加的两列,计算每年破产银行数量以及计算每年每季度破产银行数量

```python
closing_year = banks.groupby('Closing Year').size()
closing_year
```

![img](/data-analysis/chapter04-143.webp)

```python
# pandas 绘图
closing_year.plot(figsize=(16, 8))
```

![img](/data-analysis/chapter04-144.webp)

```python
closing_year_quater = banks.groupby(['Closing Year', 'Closing Quarter']).size()
closing_year_quater.plot(figsize=(16, 8))
```

![img](/data-analysis/chapter04-145.webp)

## 6. 案例：处理股票数据

> 股票价格是包含日期的典型数据

### 6.1 加载股票数据集

1）加载 `TSLA.csv` 股票数据

```python
tesla = pd.read_csv('./data/TSLA.csv')
tesla.head()
```

![img](/data-analysis/chapter04-146.webp)

> 可以看出,tesla 股票数据中第一列为日期,在加载数据的时候,可以直接解析日期数据

```python
tesla = pd.read_csv('./data/TSLA.csv', parse_dates=[0])
tesla.info()
```

![img](/data-analysis/chapter04-147.webp)

### 6.2 基于日期数据获取数据子集

1）获取 2015 年 8 月的股票数据

```python
tesla.loc[(tesla['Date'].dt.year==2018) & (tesla['Date'].dt.month==8)]
```

![img](/data-analysis/chapter04-148.webp)

#### DatetimeIndex 对象

在处理包含 datetime 的数据时,经常需要把 datetime 对象设置成 DataFrame 的行标签索引。

1）首先把 `tesla` 数据集的 `Date` 列指定为行标签索引

```python
tesla.set_index('Date', inplace=True)
tesla.index
```

![img](/data-analysis/chapter04-149.webp)

```python
tesla
```

![img](/data-analysis/chapter04-150.webp)

> 把索引设置为日期对象后,可以直接使用日期来获取某些数据

2）示例：获取 `2016` 年的股票数据

```python
tesla['2016']
```

![img](/data-analysis/chapter04-151.webp)

3）示例：获取 `2018-08` 的股票数据

```python
tesla['2018-08']
```

![img](/data-analysis/chapter04-152.webp)

#### TimedeltaIndex 对象

1）首先创建一个 `timedelta` 列 `Ref Date`

```python
tesla['Ref Date'] = tesla['Date'] - tesla['Date'].min()
tesla['Ref Date']
```

![img](/data-analysis/chapter04-153.webp)

2）把 `Ref Date` 列设置为行标签索引

```python
tesla.index = tesla['Ref Date']
tesla
```

![img](/data-analysis/chapter04-154.webp)

```python
tesla.info()
```

![img](/data-analysis/chapter04-155.webp)

3）可以基于 Ref_Date 来选择数据

```python
tesla['0 days': '5 days']
```

![img](/data-analysis/chapter04-156.webp)

## 7. 日期范围

> 包含日期的数据集中,并非每一个都包含固定频率。比如在 ebola 数据集中,日期并没有规律

```python
ebola_head = ebola.iloc[:5, :5]
ebola_head
```

![img](/data-analysis/chapter04-160.webp)

> 从上面的数据中可以看到,缺少 2015 年 1 月 1 日,如果想让日期连续,可以创建一个日期范围来为数据集重建索引。

1）可以使用 `date_range` 函数来创建连续的日期范围

```python
head_range = pd.date_range(start='2014-12-31', end='2015-01-05')
head_range
```

![img](/data-analysis/chapter04-161.webp)

2）对于 `ebola_head` 数据首先设置日期索引,然后为数据重建连续索引

```python
ebola_head.index = ebola_head['Date']
ebola_head
```

![img](/data-analysis/chapter04-162.webp)

```python
ebola_head.reindex(head_range)
```

![img](/data-analysis/chapter04-163.webp)

> 使用 date_range 函数创建日期序列时,可以传入一个参数 freq,默认情况下 freq 取值为 D,表示日期范围内的值是逐日递增的

```python
# 产生 2020-01-01 到 2020-01-07 的工作日
pd.date_range('2020-01-01', '2020-01-07', freq='B')
```

![img](/data-analysis/chapter04-164.webp)

结果说明：从结果中看到生成的日期中缺少 1 月 4 日,1 月 5 日,为休息日。

**freq 参数的可能取值**：

| Alias | Description |
| :--- | :--- |
| B | 工作日 |
| C | 自定义工作日 |
| D | 日历日 |
| W | 每周 |
| M | 月末 |
| SM | 月中和月末（每月第 15 天和月末） |
| BM | 月末工作日 |
| CBM | 自定义月末工作日 |
| MS | 月初 |
| SMS | 月初和月中（每月第 1 天和第 15 天） |
| BMS | 月初工作日 |
| CBMS | 自定义月初工作日 |
| Q | 季度末 |
| BQ | 季度末工作日 |
| QS | 季度初 |
| BQS | 季度初工作日 |
| A, Y | 年末 |
| BA, BY | 年末工作日 |
| AS, YS | 年初 |
| BAS, BYS | 年初工作日 |
| BH | 工作时间 |
| H | 小时 |
| T, min | 分钟 |
| S | 秒 |
| L, ms | 毫秒 |
| U, us | microseconds |
| N | 纳秒 |

3）在 freq 传入参数的基础上,可以做一些调整

```python
# 隔一个工作日取一个工作日
pd.date_range('2020-01-01', '2020-01-07', freq='2B')
```

![img](/data-analysis/chapter04-165.webp)

4）freq 传入的参数可以传入多个

```python
# 示例：2020年每个月的第一个星期四
pd.date_range('2020-01-01','2020-12-31',freq='WOM-1THU')
```

![img](/data-analysis/chapter04-166.webp)

```python
# 示例：2020年每个月的第三个星期五
pd.date_range('2020-01-01','2020-12-31',freq='WOM-3FRI')
```

![img](/data-analysis/chapter04-167.webp)

## 8. 案例：丹佛报警记录数据分析

1）加载丹佛市报警记录数据集 `crime.csv`

```python
crime = pd.read_csv('./data/crime.csv', parse_dates=['REPORTED_DATE'])
crime
```

![img](/data-analysis/chapter04-168.webp)

```python
crime.info()
```

![img](/data-analysis/chapter04-169.webp)

2）设置报警时间为行标签索引

```python
crime = crime.set_index('REPORTED_DATE')
crime
```

![img](/data-analysis/chapter04-170.webp)

3）示例：获取 `2016-05-02` 的报警记录数据

```python
crime.loc['2016-05-02']
```

![img](/data-analysis/chapter04-171.webp)

4）示例：获取 `2015-03-01` 到 `2015-06-01` 之间的报警记录数据

```python
crime.loc['2015-03-01': '2015-06-01'].sort_index()
```

![img](/data-analysis/chapter04-173.webp)

5）时间段可以包括小时分钟

```python
crime.loc['2015-03-01 22': '2015-06-01 20:35:00'].sort_index()
```

![img](/data-analysis/chapter04-174.webp)

6）示例：查询凌晨两点到五点的报警记录

```python
crime.between_time('2:00', '5:00')
```

![img](/data-analysis/chapter04-175.webp)

7）示例：查询在 `5:47` 分的报警记录

```python
crime.at_time('5:47')
```

![img](/data-analysis/chapter04-176.webp)

> 在按时间段选取数据时,可以将时间索引排序,排序之后再选取效率更高

```python
%timeit crime.loc['2015-03-04': '2016-06-01']
```

![img](/data-analysis/chapter04-177.webp)

```python
crime_sort = crime.sort_index()
%timeit crime_sort.loc['2015-03-04': '2016-06-01']
```

![img](/data-analysis/chapter04-178.webp)

8）示例：计算每周的报警数量

> 为了统计每周的报警数量,需要按周分组。
>
> resample 重采样,可以按照指定时间周期分组

```python
weekly_crimes = crime_sort.resample('W').size()
weekly_crimes
```

![img](/data-analysis/chapter04-179.webp)

```python
# 也可以把周四作为每周的结束
crime_sort.resample('W-THU').size()
```

![img](/data-analysis/chapter04-180.webp)

```python
# pandas 绘图
import matplotlib.pyplot as plt
plt.rcParams['font.sans-serif'] = 'Arial Unicode MS'
weekly_crimes.plot(figsize=(16, 8), title='丹佛报警记录情况')
```

![img](/data-analysis/chapter04-181.webp)

9）示例：分析每季度的犯罪和交通事故数据

```python
# Q表示季度
crime_quarterly = crime_sort.resample('Q')['IS_CRIME', 'IS_TRAFFIC'].sum()
crime_quarterly
```

![img](/data-analysis/chapter04-182.webp)

所有日期都是该季度的最后一天,使用 `QS` 生成每季度的第一天。

```python
crime_quarterly = crime_sort.resample('QS')['IS_CRIME', 'IS_TRAFFIC'].sum()
crime_quarterly
```

![img](/data-analysis/chapter04-183.webp)

```python
# pandas 绘图
crime_quarterly.plot(figsize=(16, 8))
plt.title('丹佛犯罪和交通事故数据')
```

![img](/data-analysis/chapter04-184.webp)

10）示例：分析每周每一天的报警记录情况：可以通过 Timestamp 的 dt 属性得到周几,然后统计

```python
crime = pd.read_csv('./data/crime.csv', parse_dates=['REPORTED_DATE'])
wd_counts = crime['REPORTED_DATE'].dt.weekday.value_counts()
wd_counts
```

![img](/data-analysis/chapter04-185.webp)

```python
# pandas 绘图
wd_counts.plot(kind='barh', title='丹佛犯罪和交通事故按周分析')
```

![img](/data-analysis/chapter04-186.webp)

11）示例：在上一步的基础上,进一步分析每周每天的犯罪记录和交通事故记录

```python
# 筛选出交通事故记录
left = crime[crime['IS_TRAFFIC'] == 1]['REPORTED_DATE'].dt.weekday.value_counts()
left
```

![img](/data-analysis/chapter04-187.webp)

```python
# 筛选出犯罪记录
right = crime[crime['IS_CRIME'] == 1]['REPORTED_DATE'].dt.weekday.value_counts()
right
```

![img](/data-analysis/chapter04-188.webp)

```python
# 合并交通事故记录和犯罪记录
result = pd.concat([left, right], axis=1)
result.columns = ['IS_TRAFFIC', 'IS_CRIME']
result
```

![img](/data-analysis/chapter04-189.webp)

```python
# pandas 绘图
result.plot(kind='barh', figsize=(16, 8))
```

![img](/data-analysis/chapter04-190.webp)

## 总结

- pandas 中,datetime64 用来表示时间序列类型
- 时间序列类型的数据可以作为行索引,对应的数据类型是 DatetimeIndex 类型
- datetime64 类型可以做差,返回的是 timedelta 类型
- 转换成时间序列类型后,可以按照时间的特点对数据进行处理
  - 提取日期的各个部分（月,日,星期...）
  - 进行日期运算
  - 按照日期范围取值
