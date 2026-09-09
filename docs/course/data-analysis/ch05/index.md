---
title: 第 5 章 Python 数据可视化
description: 25 级计算机应用 1 班 Python 数据可视化讲义,围绕 Matplotlib、pandas、seaborn、pyecharts 四个常用绘图库,讲解从基础图表到交互式可视化的完整流程,适合课堂学习与复习参考。
keywords: Python 数据可视化,Matplotlib,pandas 绘图,seaborn,pyecharts,echarts,统计图表,数据分析,海南省经济技术学校
---
# 第 5 章 Python 数据可视化

## 栏目简介

本栏目是「数据分析讲义」的第 5 章,主题是 **Python 数据可视化**。数据分析的结果最终要呈现给人看,一张清晰的图表胜过千言万语,本栏目围绕 Python 中最常用的四个可视化库展开:

- **Matplotlib**:Python 最基础、功能最强大的绘图库,几乎所有可视化库都在它之上构建。
- **pandas 绘图**:对 Matplotlib 的二次封装,`Series` 与 `DataFrame` 都自带 `plot()` 方法,几行代码即可出图。
- **seaborn**:在 Matplotlib 之上提供更高级的 API,面向统计探索,作图更轻松、样式更美观。
- **pyecharts**:基于百度开源的 echarts,用 Python 生成可在浏览器中交互的酷炫图表。

学完本章,你将能够根据数据特点选择合适的图表类型,并使用对应的库完成绘图任务。

## 本章节目录

| 序号 | 主题 | 内容说明 |
| --- | --- | --- |
| 5.1 | [Matplotlib 绘图](/course/data-analysis/ch05/01-matplotlib) | 数据可视化概念、常用库对比、Matplotlib 基础与统计图绘制 |
| 5.2 | [pandas 绘图](/course/data-analysis/ch05/02-pandas-plot) | 柱状图、折线图、面积图、直方图、饼图、散点图、堆叠图 |
| 5.3 | [seaborn 绘图](/course/data-analysis/ch05/03-seaborn) | 单变量、双变量、多变量可视化,主题样式与分面 |
| 5.4 | [pyecharts 绘图](/course/data-analysis/ch05/04-pyecharts) | echarts 简介,柱状图、词云图、气泡图、饼状图实战 |

## 学习建议

- 按 **5.1 → 5.2 → 5.3 → 5.4** 的顺序学习,后面的库都建立在前面的基础上。
- Matplotlib 是根基,即使使用 pandas、seaborn,理解 Matplotlib 的坐标系与参数也能帮助你做精细控制。
- pyecharts 偏向「交付物」级别的交互图表,适合最终汇报;而前三个库更适合在分析过程中快速探索。

---
