---
title: Python pandas 题型总结
description: 25 级计算机应用 1 班 Python pandas 编程题型总结,围绕二手房房源数据,使用 pandas 完成数据预览、数据清洗、数据打标签等常见操作,适合作为课堂复习与练习参考。
keywords: Python 题型总结,pandas,二手房数据,数据清洗,数据标注,房源分析,海南省经济技术学校
---

# Python pandas 题型总结

本栏目收录课堂上出现过的 **Python pandas 编程题**,全部围绕「二手房房源数据」展开,从最基础的读取与预览,到字段清洗、文本规范化,再到按区域打标签,逐步覆盖数据分析中最常用的几类操作。题目由学长收集,这里重新整理思路并补充易错点,方便快速复习。

## 前置知识

在开始本栏目之前,建议已经掌握以下基础,否则部分代码可能看不懂:

- Python 基本语法:变量、函数、`import` 语句、`for` / `if` 条件分支。
- 列表、字典、字符串等基本数据结构。
- 正则表达式入门:知道 `^`、`$`、`\d`、`+`、`()` 的含义即可,够看懂[数据清洗](/course/python-pandas/cleaning)中的 `re.search`。
- `pip` 或 `conda` 安装第三方库的方法,需要先 `pip install pandas` 才能跑代码。
- 推荐使用 VS Code + Python 扩展,或 Jupyter Notebook,方便分块运行代码。

::: tip 学习环境小提示
在 PowerShell 中安装 pandas:

```powershell
pip install pandas
```

如果命令不存在,请先安装 Python 3.9 及以上,并将 `python.exe` 所在目录加入 PATH。
:::

## 学习路径

本栏目按 **「数据预览 → 数据清洗 → 数据打标签」** 三个阶段递进,每一阶段都建立在前一阶段的基础上,建议按顺序学习:

```text
┌──────────┐    ┌──────────┐    ┌──────────┐
│ 数据预览 │ ─→ │ 数据清洗 │ ─→ │ 数据打标签 │
│  (题 1)  │    │ (题 2-6) │    │ (题 7-8+标注) │
└──────────┘    └──────────┘    └──────────┘
     │               │               │
   读 CSV         过滤/规范化       分组聚合
   head(10)       字段清洗          apply/map
```

| 阶段 | 对应页面 | 题目编号 | 你将掌握 |
| --- | --- | --- | --- |
| 数据预览 | [数据预览](/course/python-pandas/preview) | 题 1 | `read_csv` / `head` / `shape` / `info` / `describe` |
| 数据清洗 | [数据清洗](/course/python-pandas/cleaning) | 题 2 至题 6 | 布尔索引、`notnull`、`dropna`、正则 `re`、字段规范化 |
| 数据打标签 | [数据打标签](/course/python-pandas/labeling) | 题 7、题 8 与两组标注任务 | `groupby`、`apply(axis=1)`、`value_counts`、`map` |

## 题目速览

下面这张表汇总了每道题的关键操作与输入输出,适合在写代码前先扫一眼:

| 题号 | 主题 | 关键操作 | 输入文件 | 输出文件 |
| --- | --- | --- | --- | --- |
| 题 1 | 数据预览 | `read_csv` + `head(10)` | `house_module.csv` | 控制台输出 |
| 题 2 | 清洗「面积」 | 过滤空值与 ≤ 0 的行 | `house_module.csv` | `cleaned_data_c1_*.csv` |
| 题 3 | 清洗「价格」 | 过滤 > 3 倍均价的异常值 | `cleaned_data_c1_*.csv` | `cleaned_data_c2_*.csv` |
| 题 4 | 规范化「户型」 | 正则提取卧室/客厅数 | `cleaned_data_c2_*.csv` | `cleaned_data_c3_*.csv` |
| 题 5 | 删除「电梯」为空 | `dropna(subset=...)` | `cleaned_data_c3_*.csv` | `cleaned_data_c4_*.csv` |
| 题 6 | 删除面积 < 20 | 布尔索引 | `cleaned_data_c4_*.csv` | `cleaned_data_c5_*.csv` |
| 题 7 | 价格区间标签 | 按区均价分组 + 自定义函数 | `house_module2.csv` | `price_range_mark.csv` |
| 题 8 | 区域热门度标签 | 按区计数 + 字典映射 | `house_module2.csv` | `area_popularity_mark.csv` |
| 标注 1 | 重复题 7 思路 | `groupby().mean()` + `apply` | `house_module2.csv` | `house_module2_marked_task1.csv` |
| 标注 2 | 重复题 8 思路 | `value_counts()` + `map` | `house_module2.csv` | `house_module2_marked_task2.csv` |

::: tip 文件命名约定
`cleaned_data_c1_2.csv` 表示「经过第 1 步清洗、删除了 2 行」,数字由代码中的 `len(df) - len(df_cl)` 计算得到,方便对照每一步丢失了多少数据。
:::

::: warning 两份数据要分清
题 1 至题 6 操作的是 `house_module.csv`,题 7、题 8 与标注任务则重新切回 `house_module2.csv`(字段相同,但数据集独立)。两份 CSV 不要混用,文件名对不上时,后续 `read_csv` 会直接报错。
:::

## 本栏目内容

| 页面 | 内容说明 |
| --- | --- |
| [数据预览](/course/python-pandas/preview) | 读取 CSV 并打印前 10 行,熟悉 `head()` |
| [数据清洗](/course/python-pandas/cleaning) | 题 2 至题 6:过滤空值/异常值/范围,规范化户型字段 |
| [数据打标签](/course/python-pandas/labeling) | 题 7、题 8 与两组标注任务:按区均价/数量打标签 |

## 待补充

以下方向尚未成文,欢迎认领并提交:

- 题目原文、参考答案与评分标准的对照表
- 每个题目的常见错误与对应的提示信息
- 与 `numpy` / `matplotlib` 结合的可视化拓展题

## 如何补充新题

1. 在 `docs/course/python-pandas/` 下新建 Markdown 文件,例如 `docs/course/python-pandas/new-topic.md`
2. 按 [Markdown 写作](/guide/writing) 的规范编写,代码块务必声明语言
3. 在 `docs/.vitepress/config.mts` 的 `/course/` 侧边栏中登记新页面
4. 按 [参与共建](/guide/contributing) 的流程提交 Pull Request

---

> 📌 本栏目题目均由班级同学共同收集与整理,代码示例可直接复制运行,但建议先理解思路再敲代码,避免照搬带来的「学长坑」(见各页「易错点」小节)。
