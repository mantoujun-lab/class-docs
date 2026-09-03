# Markdown 扩展示例

本页演示了 VitePress 提供的一些内置 markdown 扩展。

## 语法高亮

VitePress 提供由 [Shiki](https://github.com/shikijs/shiki) 支持的语法高亮功能,并提供额外的功能,例如行高亮:

**输入**

````md
```js{4}
export default {
  data () {
    return {
      msg: '已高亮!'
    }
  }
}
```
````

**输出**

```js{4}
export default {
  data () {
    return {
      msg: '已高亮!'
    }
  }
}
```

## 自定义容器

**输入**

```md
::: info
这是一个信息框。
:::

::: tip
这是一个提示。
:::

::: warning
这是一个警告。
:::

::: danger
这是一个危险的警告。
:::

::: details
这是一个详情块。
:::
```

**输出**

::: info
这是一个信息框。
:::

::: tip
这是一个提示。
:::

::: warning
这是一个警告。
:::

::: danger
这是一个危险的警告。
:::

::: details
这是一个详情块。
:::

## 更多

查看文档以了解 [markdown 扩展的完整列表](https://vitepress.dev/guide/markdown)。
