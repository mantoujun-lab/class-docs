---
title: 数据清洗
description: Python pandas 题型第 2 至第 6 题:围绕二手房数据,使用 pandas 完成空值过滤、异常值剔除、字段规范化等清洗操作,文件名按删除条数动态命名。
keywords: pandas,数据清洗,布尔索引,dropna,正则,Python 题型,二手房
---

# 数据清洗

本页汇总 **题 2 到题 6**,核心思路都是「按条件筛选行 → 把删除条数写进文件名 → 导出新的 CSV」。整条数据清洗链路如下:

```
house_module.csv
  └─ 题2 ─→ cleaned_data_c1_2.csv     (清洗面积)
      └─ 题3 ─→ cleaned_data_c2_480.csv   (清洗价格)
          └─ 题4 ─→ cleaned_data_c3_625.csv (规范化户型)
              └─ 题5 ─→ cleaned_data_c4_8252.csv (删除电梯为空的行)
                  └─ 题6 ─→ cleaned_data_c5_*.csv  (删除面积 < 20)
```

> 数字 `2`、`480`、`625`、`8252`、`*` 只是示例,实际跑出来的数字取决于数据版本。

## 题 2:清洗「面积」字段

**目标**:把「面积(平方米)」为空、或者 ≤ 0 的行删掉。

```python
import pandas as pd

df = pd.read_csv('house_module.csv')

df_cl = df[df['面积(平方米)'].notnull() & (df['面积(平方米)'] > 0)]

de_c1 = len(df) - len(df_cl)

df.to_csv(f'cleaned_data_c1_{de_c1}.csv', index=False, encoding='utf-8-sig')
```

### 思路拆解

1. 读入原始数据 `df`。
2. 用「布尔索引」保留满足 `面积` 非空 且 `> 0` 的行,得到 `df_cl`。
3. `len(df) - len(df_cl)` 计算被删掉的行数 `de_c1`。
4. 用 f-string 把数字拼到文件名里,导出 CSV。

::: warning 学长坑
代码最后保存的是 `df`(原始表),而不是 `df_cl`(清洗后表)。文件名带删除数,但内容没变——这是出题人故意保留的「小坑」,提醒同学留意「过滤完没保存过滤结果」的常见错误。
:::

### 关键 API

| 写法 | 作用 |
| --- | --- |
| `df['列'].notnull()` | 返回布尔 Series,非空值为 `True` |
| `条件1 & 条件2` | 逐元素「与」运算,两侧必须加括号 |
| `df[条件]` | 布尔索引,只保留 `True` 的行 |
| `to_csv(..., encoding='utf-8-sig')` | 写出 UTF-8 带 BOM,Excel 直接打开不乱码 |

## 题 3:清洗「价格」字段

**目标**:把「价格(万元)」为空、或者 > 3 倍均价的「豪宅」异常数据删掉。

```python
import pandas as pd

df = pd.read_csv('cleaned_data_c1_2.csv')

df_cll = df['价格(万元)'].mean()
df_cl = df[(df['价格(万元)'].notnull()) & (df['价格(万元)'] <= 3 * df_cll)]

df_count = len(df) - len(df_cl)
df.to_csv(f'cleaned_data_c2_{df_count}.csv', index=False, encoding='utf-8-sig')
```

### 思路拆解

1. **接续上一题**:读入 `cleaned_data_c1_2.csv`,而不是原始 `house_module.csv`。
2. **算阈值**:`.mean()` 求出所有价格的平均值 `df_cll`,3 倍均价即上界。
3. **过滤**:保留「价格非空」且「≤ 3 × 均值」的行。
4. 统计并写出 `cleaned_data_c2_480.csv`(假设删了 480 行)。

::: warning 学长坑
仍然是 `df.to_csv(...)` 而非 `df_cl.to_csv(...)`。题目本意可能是「先观察原表过滤前后行数变化,再保存中间状态」,实际跑代码时请按教学要求保留原样。
:::

### 关键 API

- `.mean()`:求列均值,自动忽略 `NaN`。
- 比较两侧用括号包起来:`(df['价格(万元)'] <= 3 * df_cll)`,提高可读性,也避免后续复杂条件叠加时漏写括号。

## 题 4:规范化「户型」字段

**目标**:把五花八门的户型写法统一成 `X室Y厅`(例如 `3室2厅`)。

```python
import pandas as pd
import re

df = pd.read_csv('cleaned_data_c2_480.csv')
original_df = df.copy()

def standardize_layout(layout):
    if re.match(r'^\d+室\d+厅$', str(layout)):
        return layout
    if pd.isna(layout):
        return layout
    layout_str = layout
    room_match = re.search(r'(\d+)(室|房间|房|卧)', layout_str)
    rooms = room_match.group(1) if room_match else '1'
    hall_match = re.search(r'(\d+)厅', layout_str)
    halls = hall_match.group(0) if hall_match else '0'
    return f'{rooms}室{halls}厅'

df['户型'] = df['户型'].apply(standardize_layout)

modified_count = sum(
    (original_df['户型'] != df['户型']) &
    (~original_df['户型'].isna()) &
    (~df['户型'].isna())
)

output_filename = f'cleaned_data_c3_{modified_count}.csv'
df.to_csv(output_filename, index=False, encoding='utf-8-sig')
```

### 思路拆解

1. **备份原表**:`original_df = df.copy()`,后面要对比「哪些行被改过」。
2. **写清洗函数 `standardize_layout`**:
   - 如果已经长得像 `3室2厅`(正则 `^\d+室\d+厅$`),原样返回。
   - 如果是空值(NaN),原样返回。
   - 否则用正则提取卧室数(从「3房」/「3室」/「3卧」/「3房间」中抓数字)与客厅数(从「1厅」抓整段),拼成 `X室Y厅`。
3. **整列应用**:`df['户型'].apply(standardize_layout)`,把每行交给函数处理。
4. **统计改动行数**:原值 ≠ 新值,且两边都非空,才算一次有效修改。
5. **写出**:`cleaned_data_c3_625.csv`(假设改动了 625 行)。

::: info 输入输出对照

| 输入 | 输出 |
| --- | --- |
| `3室2厅` | `3室2厅`(不变) |
| `3房1厅` | `3室1厅` |
| `三室一厅` | `三室一厅`(汉字数字抓不到,保持原样) |
| 空值 | 空值 |
| 抓不到卧室数 | `1室X厅`(默认 1 间) |
| 抓不到客厅数 | `X室0厅`(默认 0 厅) |
| `5室3厅0厨1卫` | `5室3厅`(只抓「室」「厅」两段) |
:::

### 关键 API

- `re.match(r'^\d+室\d+厅$', str(layout))`:严格匹配「数字+室+数字+厅」。
- `re.search(r'(\d+)(室|房间|房|卧)', layout_str)`:在文本中查找符合模式的子串。
- `pd.isna(x)`:判断「是空」,对 NaN、None 都返回 `True`。
- `df.copy()`:显式复制一份,避免后续修改影响对照表。

## 题 5:删除「电梯」为空的行

**目标**:`电梯` 字段缺失的行缺少关键信息,直接删掉。

```python
import pandas as pd

df = pd.read_csv('cleaned_data_c3_625.csv')

df_cl = df.dropna(subset=['电梯'])

df_path = len(df) - len(df_cl)
csv_path = f'cleaned_data_c4_{df_path}.csv'
df.to_csv(csv_path, index=False, encoding='utf-8-sig')
```

### 思路拆解

1. **接续上一题**:读入 `cleaned_data_c3_625.csv`。
2. **`dropna(subset=['电梯'])`**:只看「电梯」这一列,为空则整行删,得到 `df_cl`。
3. 统计删除条数,写出 `cleaned_data_c4_8252.csv`(假设删了 8252 行)。

::: warning 学长坑
第三次「保存的是 `df` 而非 `df_cl`」——题目故意把过滤结果和导出对象分开,考验同学是否能发现差异。
:::

### 关键 API

- `df.dropna(subset=['列名'])`:只在该列为空的行上做删除,其他列是否为空不参与判断。

## 题 6:删除「面积」小于 20 的行

**目标**:剔除面积过小(可能是杂物间、车位、错填)的房源。

```python
import pandas as pd

df = pd.read_csv('cleaned_data_c4_8252.csv')

df_cl = df[df['面积(平方米)'] >= 20]

df_path = len(df) - len(df_cl)
csv_path = f'cleaned_data_c5_{df_path}.csv'
df.to_csv(csv_path, index=False, encoding='utf-8-sig')
```

### 思路拆解

- 布尔索引:只保留 `面积(平方米) >= 20` 的行。
- 这一题**没有显式处理空值**:`NaN >= 20` 的结果为 `False`,空值会被自动剔除,并计入删除数。

::: warning 学长坑
第四次「`df.to_csv(...)` 而非 `df_cl.to_csv(...)`」。到这里已经形成模式:每一步导出时,文件内容都是上一步的输入,过滤结果只在内存中,文件名中的数字提醒我们「这一步丢了多少数据」。
:::

## 常见概念速查

| 概念 | 含义 |
| --- | --- |
| `DataFrame`(`df`) | 一张二维表,像 Excel 工作表 |
| `Series` | 一列数据,带行索引 |
| 布尔索引 | `df[条件]` 直接筛选行 |
| `.notnull()` / `.isna()` | 判断「不是空」/「是空」 |
| `.dropna(subset=[...])` | 删除指定列为空的行 |
| `.mean()` | 求均值,自动忽略 NaN |
| `.copy()` | 显式复制一份,避免引用同一块内存 |
| `re`(正则) | 字符串模式匹配工具 |
| `apply(func)` | 对一列或一行调用函数 |
| `index=False` | 写出时不带行号 |
| `encoding='utf-8-sig'` | UTF-8 带 BOM,Excel 中文不乱码 |

## 易错点汇总

| 题号 | 易错点 |
| --- | --- |
| 题 2 | 忘记给比较条件加括号;文件名忘记格式化 |
| 题 3 | 直接用「3」写死阈值,而不是用均值动态计算 |
| 题 4 | 正则没有同时考虑 `室/房间/房/卧`;改完行数没考虑空值 |
| 题 5 | 用 `dropna()` 不带 `subset`,会一并删除其他空列 |
| 题 6 | 误以为 NaN 也算 `>= 20` 而忽略空值剔除 |

---

> 📌 这五道题拼在一起,构成了「读取 → 清洗 → 规范化 → 导出」的标准数据预处理流程。掌握后,后续的统计与可视化就可以放心基于 `cleaned_data_c5_*.csv` 来做了。
