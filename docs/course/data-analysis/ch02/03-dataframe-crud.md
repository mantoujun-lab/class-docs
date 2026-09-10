---
title: DataFrame 增删改
description: 本页对应「DataFrame增删改」章节的内容,围绕 pandas 数据分析展开,涵盖核心概念、代码示例与注意事项。
keywords: pandas,DataFrame,增加,删除,修改,drop,concat,loc,行,列
---
# DataFrame 增删改

::: tip 本节示例数据
本节示例数据请通过下方链接下载,保存到与 Notebook 同目录的 `data/` 文件夹下:

- [scientists.csv](/data/scientists.csv)
:::

## 学习目标

- 能够进行 DataFrame 的行操作(添加行/修改行/删除行)
- 能够进行 DataFrame 的列操作(添加列/修改列/删除列)
- 能够进行 DataFrame 的数据导出操作(pickle、csv、excel)

## 1. DataFrame 行操作

### 1.1 添加行

::: tip
注意：添加行时,会返回新的 DataFrame。
:::

**基本格式**：

| 方法 | 说明 |
| --- | --- |
| pd.concat([df, other], ignore_index=True) | 将 other 拼接到 DataFrame 末尾,返回新的 DataFrame |

1）加载 `scientists.csv` 数据集

```python
scientists = pd.read_csv('./data/scientists.csv')
scientists
```

![chapter02-72](/data-analysis/chapter02-72.webp)

2）示例：在 `scientists` 数据末尾添加一行新数据

```python
# 准备新行数据
new_series = pd.Series(['LuoGeng Hua', '1910-11-12', '1985-06-12', 75, 'Mathematician'],
                       index=['Name', 'Born', 'Died', 'Age', 'Occupation'])
# 添加行并返回新的 DataFrame（scientists 本身不变）
pd.concat([scientists, new_series.to_frame().T], ignore_index=True)
```

![chapter02-73](/data-analysis/chapter02-73.webp)

### 1.2 修改行

::: tip
注意：修改行时,是直接对原始 DataFrame 进行修改。
:::

**基本格式**：

| 方式 | 说明 |
| --- | --- |
| df.loc[['行标签', ...],['列标签', ...]] | 修改行标签对应行的对应列的数据 |
| df.iloc[['行位置', ...],['列位置', ...]] | 修改行位置对应行的对应列的数据 |

1）示例：修改行标签为 4 的行的所有数据

修改之前：

![chapter02-74](/data-analysis/chapter02-74.webp)

修改之后：

```python
scientists.loc[4] = ['Rachel Carson', '1907-5-27', '1964-4-14', 56, 'Biologist']
scientists
```

![chapter02-75](/data-analysis/chapter02-75.webp)

2）示例：修改行标签为 4 的行的 Born 和 Age 列的数据

```python
scientists.loc[4, ['Born', 'Age']] = ['1906-5-27', 58]
scientists
```

![chapter02-83](/data-analysis/chapter02-83.webp)

3）示例：修改行标签为 6 的行的 Born 列的数据为 `1912-06-23`

```python
scientists.loc[6, 'Born'] = '1912-06-23'
scientists
```

![chapter02-78](/data-analysis/chapter02-78.webp)

### 1.3 删除行

::: tip
注意：删除行时,会返回新的 DataFrame。
:::

**基本格式**：

| 方式 | 说明 |
| --- | --- |
| df.drop(['行标签', ...]) | 删除行标签对应行的数据,返回新的 DataFrame |

1）示例：删除行标签为 1 和 3 的行

```python
scientists.drop([1, 3])
```

![chapter02-79](/data-analysis/chapter02-79.webp)

## 2. DataFrame 列操作

### 2.1 新增列/修改列

::: tip
注意：添加列/修改列时,是直接对原始 DataFrame 进行修改。
:::

**基本格式**：

| 方式 | 说明 |
| --- | --- |
| df['列标签']=新列 | 1）如果 DataFrame 中不存在对应的列,则在 DataFrame 最右侧增加新列 2）如果 DataFrame 中存在对应的列,则修改 DataFrame 中该列的数据 |
| df.loc[:, 列标签]=新列 | 1）如果 DataFrame 中不存在对应的列,则在 DataFrame 最右侧增加新列 2）如果 DataFrame 中存在对应的列,则修改 DataFrame 中该列的数据 |

1）示例：给 `scientists` 数据增加一个 `Country` 列

```python
scientists['Country'] = ['England', 'England', 'England', 'French',
                         'America', 'England', 'England', 'Germany']
或
scientists.loc[:, 'Country'] = ['England', 'England', 'England', 'French',
                                'America', 'England', 'England', 'Germany']
scientists
```

![chapter02-80](/data-analysis/chapter02-80.webp)

3）示例：修改 `scientists` 数据中 `Country` 列的数据

```python
scientists['Country'] = ['england', 'england', 'england', 'french',
                         'america', 'england', 'england', 'germany']

或
scientists.loc[:, 'Country'] = ['england', 'england', 'england', 'french',
                                'america', 'england', 'england', 'germany']
scientists
```

![chapter02-81](/data-analysis/chapter02-81.webp)

### 2.2 删除列

::: tip
注意：删除列时,会返回新的 DataFrame。
:::

**基本格式**：

| 方式 | 说明 |
| --- | --- |
| df.drop(['列标签', ...], axis=1) | 删除列标签对应的列数据,返回新的 DataFrame |

1）示例：删除 `scientists` 数据中 `Country` 列的数据

```python
scientists.drop(['Country'], axis=1)
```

![chapter02-82](/data-analysis/chapter02-82.webp)

## 3. DataFrame 数据导出和导入

### 3.1 Pickle 文件

**导出到pickle文件**：

- 调用to_pickle方法将以二进制格式保存数据
- 如要保存的对象是计算的中间结果,或者保存的对象以后会在Python中复用,可把对象保存为.pickle文件
- 如果保存成pickle文件,只能在python中使用
- 文件的扩展名可以是.p、.pkl、.pickle

```python
scientists = pd.read_csv('data/scientists.csv')
scientists.to_pickle('./data/scientists_df.pickle')
```

**读取pickle文件**：

可以使用pd.read_pickle函数读取.pickle文件中的数据

```python
scientists_df = pd.read_pickle('./data/scientists_df.pickle')
scientists_df
```

### 3.2 CSV 文件

我们用`pd.read_csv()`函数读取csv文件,使用`df.to_csv()`将数据保存为csv文件

- 在 CSV 文件中,每一行是一条记录,记录内的各列之间用逗号分隔,不同的记录之间用换行符（`\n`）分隔。
- 除了逗号,还可以使用其他类型的分隔符,比如TSV文件,使用制表符作为分隔符
- CSV是数据协作和共享的首选格式,因为可以使用excel打开

```python
# TSV文件，设置分隔符必须为\t
scientists.to_csv('./data/scientists_df.tsv', sep='\t')
# 不在csv文件中存入行标签
scientists.to_csv('./data/scientists_df_noindex.csv', index=False)
```

### 3.3 Excel文件

::: tip
注意：根据anaconda的版本不同,pandas读写excel有时需要额外安装`xlwt`、`xlrd`、`openpyxl`三个包

```shell
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple xlwt
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple openpyxl
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple xlrd
```
:::

**导出成Excel文件**：

```python
scientists.to_excel('./data/scientists_df.xlsx', sheet_name='scientists', index=False)
```

**读取Excel文件**：

使用`pd.read_excel()` 读取Excel文件

```python
pd.read_excel('./data/scientists_df.xlsx')
```

### 3.4 【了解】feather格式文件

> - feather是一种文件格式,用于存储二进制对象
> - feather对象也可以加载到R语言中使用
> - feather格式的主要优点是在Python和R语言之间的读写速度要比CSV文件快
> - feather数据格式通常只用中间数据格式,用于Python和R之间传递数据
> - 一般不用做保存最终数据

### 3.5 【了解】数据导出的其他方法

其他导出方法清单：

| 导出方法 | 说明 |
| --- | --- |
| to_clipboard | 把数据保存到系统剪贴板,方便粘贴 |
| to_dict | 把数据转换成Python字典 |
| to_hdf | 把数据保存为HDF格式 |
| to_html | 把数据转换成HTML |
| to_json | 把数据转换成JSON字符串 |
| to_sql | 把数据保存到SQL数据库 |

## 总结

- 能够进行 DataFrame 的行操作(添加行/修改行/删除行)
- 能够进行 DataFrame 的列操作(添加列/修改列/删除列)
- 能够进行 DataFrame 的数据导出操作(pickle、csv、excel)
  - to_pickle、read_pickle
  - to_csv、read_csv
  - to_excel、read_excel
