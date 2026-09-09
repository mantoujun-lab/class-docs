---
title: 数据打标签
description: Python pandas 题型第 7、8 题与两组标注任务:基于二手房数据,按区均价和房源数量分别为每套房和每个市区打上标签,使用 groupby、apply、map 等核心操作。
keywords: pandas,groupby,apply,map,数据标注,价格区间,区域热门度,Python 题型
prev:
  text: 数据清洗
  link: /course/python-pandas/cleaning
---

# 数据打标签

本页汇总 **题 7、题 8 以及两组标注任务**,核心思路是「按某个字段分组 → 聚合 → 给每一行贴上新标签」。注意:从题 7 开始,读取的数据重新切回 **原始数据 `house_module2.csv`**,而不是前几题的清洗结果。

## 前置知识

- 已完成 [数据预览](/course/python-pandas/preview) 与 [数据清洗](/course/python-pandas/cleaning),熟悉 `read_csv`、布尔索引与字段规范化。
- 对 `groupby` 有基本认识:`groupby('列')['列'].聚合函数()` 会得到按「列」分组的聚合结果。
- 理解 `apply(func, axis=1)` 中 `axis=1` 的含义——表示「逐行调用函数」。

## 整体流程一览

```
house_module2.csv
  ├─ 题7 ──→ price_range_mark.csv          (价格区间)
  ├─ 题8 ──→ area_popularity_mark.csv      (区域热门度)
  ├─ 标注1 ─→ house_module2_marked_task1.csv
  └─ 标注2 ─→ house_module2_marked_task2.csv
```

::: warning 两份数据要分清
题 1 至题 6 操作的是 `house_module.csv`(并产生 `cleaned_data_c1_*.csv` 至 `cleaned_data_c5_*.csv` 的中间文件);题 7、题 8 与标注任务读取的是另一份原始数据 `house_module2.csv`,**不要用 `cleaned_data_c5_*.csv` 来跑后面的题目**。
:::

> 标注 1、标注 2 的核心思路与题 7、题 8 完全一致,只是输出文件与变量命名略有差异;详细对照见后文「标注任务」一节。

## 题 7:价格区间标签

**目标**:基于「同区均价」,把每套房标注为 **经济型 / 中档型 / 高端型**。

```python
import pandas as pd

df = pd.read_csv('house_module2.csv')

district_avg_price = df.groupby('市区')['价格(万元)'].mean()

def label_price_range(row):
    avg_price = district_avg_price[row['市区']]
    price = row['价格(万元)']
    if price < avg_price * 0.7:
        return '经济型'
    elif price <= avg_price * 1.3:
        return '中档型'
    return '高端型'

df['价格区间'] = df.apply(label_price_range, axis=1)
df.to_csv('price_range_mark.csv', index=False, encoding='utf-8-sig')
```

### 思路拆解

1. **读 `house_module2.csv`**:与题 1-6 的 `house_module.csv` 是两份数据。
2. **按「市区」分组求均价**:`groupby('市区')['价格(万元)'].mean()` 得到一个 `Series`,索引是各区名,值是该区的平均价格。
3. **定义打标签函数 `label_price_range`**:
   - 取出该行所在区的均价 `avg_price` 和当前房的价格 `price`;
   - 与 0.7 / 1.3 倍均值比较,落入不同区间。
4. **逐行应用**:`df.apply(..., axis=1)`,对每一行调用函数,返回新列。
5. **保存**:新增一列「价格区间」,导出 `price_range_mark.csv`。

### 阈值与标签

| 条件 | 标签 |
| --- | --- |
| `价格 < 区均价 × 0.7` | 经济型 |
| `区均价 × 0.7 ≤ 价格 ≤ 区均价 × 1.3` | 中档型 |
| `价格 > 区均价 × 1.3` | 高端型 |

### 关键 API

- `df.groupby('列')['列'].mean()`:先分组再聚合,得到每组的均值。
- `df.apply(func, axis=1)`:对每一行调用 `func`,`axis=1` 表示「按行」;`axis=0` 表示「按列」。
- 函数内访问其他列:`row['列名']`,等价于 `df.loc[index, '列名']`。

::: warning 潜在风险
- 某行「市区」在 `district_avg_price` 里查不到(拼写差异、新增区域),会抛 `KeyError`。
- 「价格(万元)」为 `NaN` 时,`<` 与 `>` 比较会报 `TypeError`,可用 `pd.isna(price)` 先判断。
:::

## 题 8:区域热门度标签

**目标**:基于「各区房源数量」,把每个市区标成 **高热门 / 中热门 / 低热门**。

```python
import pandas as pd

df = pd.read_csv('house_module2.csv')

district_counts = df['市区'].value_counts()

avg_count = district_counts.mean()

def classify_hot_level(count):
    if count > avg_count * 1.2:
        return '高热门'
    elif count < avg_count * 0.8:
        return '中热门'
    return '低热门'

hot_level_map = district_counts.apply(classify_hot_level).to_dict()
df['区域热门度'] = df['市区'].map(hot_level_map)
df.to_csv('area_popularity_mark.csv', index=False, encoding='utf-8-sig')
```

### 思路拆解

1. **读 `house_module2.csv`**。
2. **`value_counts()`**:统计每个市区出现的次数(房源数),结果是按降序排列的 `Series`。
3. **求平均房源数**:`.mean()`。
4. **打标签函数 `classify_hot_level`**:与题 7 类似,只是比较对象变成「房源数」。
5. **映射回原表**:把 `区 → 标签` 做成字典,再用 `df['市区'].map(字典)` 给每行的「市区」查表,得到「区域热门度」一列。
6. 保存为 `area_popularity_mark.csv`。

### 阈值与标签

| 条件 | 标签 |
| --- | --- |
| `房源数 > 平均数 × 1.2` | 高热门 |
| `房源数 < 平均数 × 0.8` | 中热门 |
| `平均数 × 0.8 ≤ 房源数 ≤ 平均数 × 1.2` | 低热门 |

::: warning 命名疑似笔误
- 房源**少**的反而叫「**中**热门」;
- 房源**中等**的反而叫「**低**热门」。

从直觉上看,「房源数低于平均」应归为「**低**热门」,「房源数接近平均」应归为「**中**热门」。当前代码的标签名与含义相反,可能是出题时的笔误,实际作答时建议按需求文档的语义为准,或自行交换「中热门」与「低热门」两个标签。
:::

### 关键 API

- `df['列'].value_counts()`:统计每个值的出现次数,自动按频率降序排列。
- `Series.to_dict()`:把「键 → 值」转成 Python 字典,常配合 `.map()` 使用。
- `df['列'].map(字典)`:用字典查表,得到新的一列;查不到时返回 `NaN`。

## 标注任务 1 与标注任务 2

> 标注 1 与题 7、标注 2 与题 8 思路完全一致,只是输出文件名与变量命名略有差别。把代码原样重复贴一遍会显得冗长,因此这里只列出 **与原题的关键差异**,完整代码请参考对应题目后,按差异处修改即可。

### 标注任务 1:重复题 7 的思路

**目标**:在 `house_module2.csv` 上重新做一遍「价格区间」打标签,输出 `house_module2_marked_task1.csv`。

**与题 7 的差异**:

| 差异点 | 题 7 | 标注任务 1 |
| --- | --- | --- |
| 输出文件名 | `price_range_mark.csv` | `house_module2_marked_task1.csv` |
| `if` 分支写法 | 末尾直接 `return '高端型'` | 显式写 `else: return '高端型'`,语义更清晰 |

实现思路与题 7 一致:**`groupby('市区')['价格(万元)'].mean()` 求各区均价 → 自定义函数 `label_price_range` 逐行判断 → `df.apply(..., axis=1)` 生成新列 → 写出 CSV**。

### 标注任务 2:重复题 8 的思路

**目标**:在 `house_module2.csv` 上重新做一遍「区域热门度」打标签,输出 `house_module2_marked_task2.csv`。

**与题 8 的差异**:

| 差异点 | 题 8 | 标注任务 2 |
| --- | --- | --- |
| 输出文件名 | `area_popularity_mark.csv` | `house_module2_marked_task2.csv` |
| `if` 分支写法 | 末尾直接 `return '低热门'` | 显式写 `else: return '低热门'`,逻辑等价但更易读 |

实现思路与题 8 一致:**`value_counts()` 统计各区房源数 → 自定义函数 `classify_hot_level` 打标签 → `Series.to_dict()` 转字典 → `df['市区'].map(字典)` 给每行查表 → 写出 CSV**。

::: tip 动手练一练
学到这里,建议打开编辑器,把题 7 的代码复制一份,按「标注任务 1 与题 7 的差异」表改两处,独立运行一遍并核对输出。这样比直接看答案印象更深,也更容易发现「`else` 漏写」「文件名前缀打错」之类的细节错误。
:::

## 题 7 vs 题 8 对照

| 维度 | 题 7(价格区间) | 题 8(区域热门度) |
| --- | --- | --- |
| 比较对象 | 单套房的价格 | 市区的房源数量 |
| 分组依据 | 各区均价 | 各区房源数 |
| 输出列 | `价格区间` | `区域热门度` |
| 阈值 | 0.7 / 1.3 倍均值 | 0.8 / 1.2 倍均值 |
| 标签 | 经济型 / 中档型 / 高端型 | 高热门 / 中热门 / 低热门 |
| 输出文件 | `price_range_mark.csv` | `area_popularity_mark.csv` |

## 易错点

| 题号 | 易错点 |
| --- | --- |
| 题 7 | 忘记 `axis=1`,导致函数被错误地按列调用;`groupby` 后忘记用 `['价格(万元)']` 选出列 |
| 题 8 | 直接把 `df['市区'].apply(...)` 喂给自定义函数,导致函数拿到的是「整行」而不是「计数」 |
| 题 8 | 没注意阈值方向,把 `>` 与 `<` 写反 |
| 标注 1/2 | 复制题 7/8 时漏掉 `else`,逻辑分支退化 |

## 学完本页之后

- 已掌握「按字段分组 → 聚合 → 打标签」的完整套路,可以套用到用户分群、商品分级、活动打分等场景。
- 想继续延伸,可结合 `numpy`、`matplotlib` 对标注结果做柱状图、饼图等可视化。
- 也欢迎回 [栏目概览](/course/python-pandas/) 查看其他待补充方向。

---

> 📌 题 7、题 8 是「数据打标签」最经典的两种写法:`apply(..., axis=1)` 处理行级复杂逻辑,`Series.map(字典)` 处理键值映射。掌握后,后续做用户分群、商品分级、活动打分都可以直接套用。
