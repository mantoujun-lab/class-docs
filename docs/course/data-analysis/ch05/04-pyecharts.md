---
title: pyecharts 绘图
description: 25 级计算机应用 1 班 Python 数据可视化讲义第 5 章第 4 节,介绍 echarts 与 pyecharts 简介,以招聘网站数据分析岗位数据为案例,讲解柱状图、词云图、气泡图、饼状图等交互式图表的绘制方法。
keywords: pyecharts,echarts,交互式图表,柱状图,词云图,气泡图,饼状图,数据清洗,招聘数据分析,海南省经济技术学校
---

## 学习目标

- 能够使用 pyecharts 进行基本绘图操作

## 1. echarts 和 Pyecharts 简介

**echarts 简介**:

- echarts 是一个使用 JavaScript 实现的开源可视化库,涵盖各行业图表,满足各种需求
- echarts 遵循 Apache-2.0 开源协议,免费商用
- echarts 兼容当前绝大部分浏览器（IE8/9/10/11、Chrome、Firefox、Safari等）及兼容多种设备,可随时随地任性展示

**pyecharts 简介**：

- pyecharts 是一个用于生成 echarts 图表的 Python 开源类库
- 使用 echarts 的绘图效果比 matplotlib 更加炫酷

## 2. Pyecharts 绘图案例

由于前面的内容基本已经介绍了常用可视化图表和各自的特点,下面通过一个案例来介绍 Pyecharts 的使用：

> 案例中使用的 pyecharts 版本是 1.6.0,pyecharts 0.X版本和 1.X版本 API 变化较大,不能向下兼容,网上查资料的时候需要注意

### 2.1 案例数据说明

> 案例使用从招聘网站（拉勾、智联、前程无忧、猎聘）上爬取的一周之内数据分析在招聘岗位数据
>
> **分析指标**：
>
> 哪些公司在招聘数据分析,哪些城市数据分析的需求大,不同城市数据分析的薪资情况,数据分析对工作年限的要求,数据分析对学历的要求

1）加载数据

```python
job = pd.read_csv('./data/data_analysis_job.csv')
job.head()
```

![chapter05-69](/data-analysis/chapter05-69.webp)

```python
# 查看数据形状
job.shape
```

![chapter05-70](/data-analysis/chapter05-70.webp)

```python
# 查看数据字段
job.info()
```

![chapter05-71](/data-analysis/chapter05-71.webp)

### 2.2 哪些城市数据分析岗位多

1）示例：获取招聘数据分析岗位最多的 TOP20 城市

```python
city_job_list = job.groupby('city')['url'].count().sort_values(ascending=False)
city_job_top20 = city_job_list.head(20)
city_job_top20
```

![chapter05-72](/data-analysis/chapter05-72.webp)

2）使用 pyechart 绘制柱状图

```python
from pyecharts import options as opts
from pyecharts.charts import Bar
c = (
    Bar() # 创建柱状图
    .add_xaxis(city_job_top20.index.tolist()) # 添加x轴数据
    .add_yaxis('数据分析就业岗位数量', city_job_top20.values.tolist())# 添加y轴数据
    .set_global_opts( # 设置全局参数
        title_opts=opts.TitleOpts(title='一周内Python就业岗位数量'), # 设置标题
        datazoom_opts=opts.DataZoomOpts() # 添加缩放条
    )
)
# 在juypter notebook中显示
c.render_notebook()
```

![chapter05-73](/data-analysis/chapter05-73.webp)

> 结果说明：从结果中可以看出,北京上海广州深圳等一线城市,对数据分析的需求最为旺盛

### 2.3 哪些公司在招聘数据分析

1）示例：获取招聘数据分析岗位最多的 TOP100 公司

```python
company_list = job.groupby('company_name')['url'].count().sort_values(ascending=False)
company_list_top100 = company_list.head(100)
company_list
```

![chapter05-74](/data-analysis/chapter05-74.webp)

2）使用 pyecharts 绘制词云图

```python
from pyecharts.charts import WordCloud
wc = (
    WordCloud()# 创建词云图对象
    .add(series_name='哪些公司在招聘数据分析程序员', # 添加标题
         data_pair=list(zip(company_list.index.tolist(),company_list.values.tolist())),
         word_size_range=[6, 40]) # 指定文字大小,注意如果字体太大可能显示不全
    .set_global_opts( # 设置全局参数：标题\字号
        title_opts=opts.TitleOpts(title='哪些公司在招聘数据分析程序员',
                                  title_textstyle_opts=opts.TextStyleOpts(font_size=23))
    )
)
wc.render_notebook()
```

![chapter05-75](/data-analysis/chapter05-75.webp)

### 2.4 岗位数量与平均起薪分布

#### 2.4.1 数据清洗

**提取起薪**：

原始数据中大多数薪资都以`6000-18000`形式显示,需要对数据进行处理,提取出起薪,可以使用正则表达式,配合 `apply` 自定义函数,将工作起薪提取出来

1）定义提取工作起薪的函数

```python
# 数据清洗,提取起薪
import re
def get_salary_down(x):
    if ('面议' in x) or ('小时' in x) or ('以' in x):
        return 0
    elif '元' in x:
        return int(re.search(pattern="([0-9]+)-([0-9]+)元/月", string=x).group(1))
    elif '-' in x:
        return int(re.search(pattern="([0-9]+)-([0-9]+)", string=x).group(1))
    else:
        return int(x)
```

2）提取起薪数据之前,首先处理缺失值,将缺失数据去掉并提取起薪

```python
# 删除 salary 有缺失值的行
job.dropna(subset=['salary'], inplace=True)
# 提取起薪,添加 salary_down 列
job['salary_down'] = job.salary.apply(get_salary_down)
job.head(3)
```

![chapter05-76](/data-analysis/chapter05-76.webp)

**数据异常值处理**：

```python
# 查看起薪结构
job['salary_down'].value_counts().sort_index()
```

![chapter05-77](/data-analysis/chapter05-77.webp)

从处理的起薪中发现,有一些异常数据：

- 特别低的：小于3000
- 特别高的：大于80000

> 异常值处理：直接删除

```python
job_salary = job.query('salary_down > 3000 & salary_down < 80000')
```

#### 2.4.2 数据处理

1）将所有城市的薪资和就业岗位数合并到一起：

```python
# 统计所有城市的数据分析岗位数据和起薪的平均值
city_salary = job_salary.groupby('city').agg({'url': 'count', 'salary_down': 'mean'})
city_salary.head()
```

![chapter05-78](/data-analysis/chapter05-78.webp)

```python
# 修改列标签
city_salary.columns = ['job_count', 'salary_down']
city_salary.head()
```

![chapter05-79](/data-analysis/chapter05-79.webp)

```python
# 按照工作岗位数量和起薪降序排列
city_salary = city_salary.sort_values(by=['job_count', 'salary_down'], ascending=[False, False])
city_salary = city_salary.reset_index()
city_salary.head()
```

![chapter05-80](/data-analysis/chapter05-80.webp)

### 2.4.3 绘制气泡图

```python
from pyecharts.charts import Scatter
from pyecharts.commons.utils import JsCode

sc = Scatter().add_xaxis( # 添加x轴
    city_salary.salary_down.astype(int)
).add_yaxis( # 添加y轴
    series_name='数据分析岗位数量', # y轴数据说明
    y_axis=[list(z) for z in zip(city_salary.job_count, city_salary.city)], # y轴数据：岗位,城市
    label_opts=opts.LabelOpts( # Js代码控制气泡显示提示文字
        formatter=JsCode('function(params){return params.value[2]}')
    )
).set_global_opts( # 全局设置
    title_opts=opts.TitleOpts(title='数据分析就业岗位数量与平均起薪'), # 设置标题
    tooltip_opts=opts.TooltipOpts( # Js代码控制气泡弹窗提示文字
        formatter=JsCode("function (params) {return params.value[2]+ '平均薪资：'+params.value[0]}")
    ),
    visualmap_opts=opts.VisualMapOpts( # 控制
        type_="size", max_=1500, min_=200, dimension=1
    ),
    xaxis_opts=opts.AxisOpts(min_=6000, name='平均起薪'), # 设置 x 轴起始值以及 x 轴名字
    yaxis_opts=opts.AxisOpts(min_=300, max_=1550, name='岗位数量') # 设置 y 轴起始值以及 y 轴名字
)

sc.render_notebook()
```

![chapter05-81](/data-analysis/chapter05-81.webp)

### 2.5 工作经验需求分析

#### 2.5.1 数据清洗

**提取要求工作经验**：

![chapter05-82](/data-analysis/chapter05-82.webp)

1）提取要求工作经验数据之前,首先处理缺失值

```python
job.experience.fillna('未知', inplace=True)
job['experience'].value_counts()
```

![chapter05-83](/data-analysis/chapter05-83.webp)

2）定义提取要求工作经验的函数

```python
def process_experience(x):
    if x in ['1-3年', '2年经验', '经验1-3年']:
        return '1-3年'
    elif x in ['3-5年', '经验3-5年', '3-4年经验']:
        return '3-5年'
    elif x in ['1年经验', '1年以下', '经验1年以下', '一年以下', '经验应届毕业生', '不限', '经验不限', '无需经验', '无经验']:
        return '一年以下/应届生/经验不限'
    elif x in ['5-10年', '经验5-10年', '5-7年经验', '8-9年经验', '10年以上经验', '10年以上', '经验10年以上']:
        return '5年以上'
    else:
        return x
```

3）提取要求工作经验

```python
job['exp'] = job.experience.apply(process_experience)
job_experience = job['exp'].value_counts()
job_experience
```

![chapter05-84](/data-analysis/chapter05-84.webp)

#### 2.5.2 绘制饼状图

```python
from pyecharts.charts import Pie
pie = Pie().add(
    series_name='经验要求',
    data_pair=[
        list(z) for z in zip(job_experience.index.to_list(), job_experience.values.tolist())
    ],
    radius=['50%', '70%'], # 圆环图：大环小环的半径大小
    label_opts=opts.LabelOpts(is_show=False, position='center')
).set_global_opts(
    title_opts=opts.TitleOpts(title='数据分析工作经验要求'),
    legend_opts=opts.LegendOpts(pos_left='right', orient='vertical')
).set_series_opts(
    tooltip_opts=opts.TooltipOpts( # 鼠标滑过之后弹出文字格式
        trigger='item',
        formatter="{a}<br/>{b}:{c} ({d}%)"
    )
)

pie.render_notebook()
```

![chapter05-85](/data-analysis/chapter05-85.webp)

## 总结

- echarts 是基于 js 的开源可视化库,pyecharts 是 echarts 的 python 封装,利用 pyecharts 可以绘制具备交互性的炫酷图形
- pyecharts 1.*版本的绘图 api 还是具有一定规律的
  - Bar()、Pie() .... 创建绘图对象
  - .add()、.add_xaxis()、.add_yaxis()添加数据
  - .set_global_opts() 设置全局参数
  - .render_notebook()：在notebook中绘制
  - .render()：生成文件
- 更加详细的 API 可以参考 pyecharts 的[官方文档](https://pyecharts.org/#/zh-cn/intro)和[案例](https://gallery.pyecharts.org/#/README)
