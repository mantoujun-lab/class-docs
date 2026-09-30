import { execFileSync } from 'node:child_process'
import { readFileSync, statSync } from 'node:fs'
import { basename, dirname, relative } from 'node:path'
import { defineLoader } from 'vitepress'

// glob 返回的绝对路径统一使用正斜杠,Windows 下需要按两种分隔符切分
const toSegments = (p: string) => p.split(/[\\/]/)

// 首页"站点速览"与"最近更新"使用的数据结构
export interface UpdateItem {
  url: string
  title: string
  date: string
  timestamp: number
}

export interface HomeData {
  stats: {
    pageCount: number
    sectionCount: number
    lastUpdated: string
  }
  updates: UpdateItem[]
}

declare const data: HomeData
export { data }

// 最近更新列表展示的条数
const RECENT_COUNT = 5

// 固定按东八区输出日期,避免构建机时区不同(本地 UTC+8、CI 为 UTC)导致日期相差一天
const DATE_FORMAT = new Intl.DateTimeFormat('zh-CN', {
  timeZone: 'Asia/Shanghai',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
})

function formatDate(ts: number): string {
  const parts = DATE_FORMAT.formatToParts(new Date(ts))
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  return `${get('year')}-${get('month')}-${get('day')}`
}

// 依次取 frontmatter 的 title、Markdown 一级标题,都没有则退化为文件名
function extractTitle(file: string): string {
  const src = readFileSync(file, 'utf8')
  const fm = src.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  const fmTitle = fm?.[1].match(/^title:\s*(.+?)\s*$/m)?.[1]
  if (fmTitle) return fmTitle.replace(/^['"]|['"]$/g, '')
  const heading = src.match(/^#\s+(.+?)\s*$/m)?.[1]
  return heading || basename(file, '.md')
}

// 优先取 git 最后一次提交时间;文件未提交过或 git 不可用时退化为文件修改时间
function lastModified(file: string, repoRoot: string): number {
  try {
    const out = execFileSync(
      'git',
      ['log', '-1', '--format=%ct', '--', toSegments(relative(repoRoot, file)).join('/')],
      { cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
    ).trim()
    const ts = Number(out)
    if (ts > 0) return ts * 1000
  } catch {
    // git 不可用时直接使用文件修改时间
  }
  return statSync(file).mtimeMs
}

// 与 config.mts 的 cleanUrls 保持一致:foo/index.md -> /foo/,foo.md -> /foo
function toUrl(file: string, srcDir: string): string {
  const slug = toSegments(relative(srcDir, file)).join('/').replace(/\.md$/, '')
  if (slug === 'index') return '/'
  return '/' + (slug.endsWith('/index') ? slug.slice(0, -'index'.length) : slug)
}

export default defineLoader({
  // watch 相对本文件所在目录解析,这里匹配 docs/ 下全部 Markdown 文件
  watch: ['../../**/*.md'],
  load(watchedFiles): HomeData {
    const files = watchedFiles.filter(
      (f) => f.endsWith('.md') && !/[\\/]\.vitepress[\\/]/.test(f)
    )

    // watchedFiles 是绝对路径;最浅层的 index.md 所在目录就是 srcDir(即 docs/)
    const homeFile = files
      .filter((f) => /[\\/]index\.md$/.test(f))
      .sort((a, b) => a.length - b.length)[0]
    if (!homeFile) {
      return {
        stats: { pageCount: 0, sectionCount: 0, lastUpdated: '-' },
        updates: []
      }
    }
    const srcDir = dirname(homeFile)
    const repoRoot = dirname(srcDir)

    const items: UpdateItem[] = files.map((file) => {
      const timestamp = lastModified(file, repoRoot)
      return {
        url: toUrl(file, srcDir),
        title: extractTitle(file),
        date: formatDate(timestamp),
        timestamp
      }
    })

    const sections = new Set(
      files
        .map((f) => toSegments(relative(srcDir, f))[0])
        .filter((seg) => !seg.endsWith('.md'))
    )

    items.sort((a, b) => b.timestamp - a.timestamp)

    // 首页不计入"最近更新":列表与统计都只看内容页,口径保持一致
    const contentItems = items.filter((item) => item.url !== '/')

    return {
      stats: {
        pageCount: files.length,
        sectionCount: sections.size,
        lastUpdated: contentItems.length ? contentItems[0].date : '-'
      },
      updates: contentItems.slice(0, RECENT_COUNT)
    }
  }
})
