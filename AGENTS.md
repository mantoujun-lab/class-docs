# Project Contribution Rules

## Project Overview

This repository is a Chinese static documentation site built with **VitePress 2** and **Vue 3**. Documentation source files are stored in `docs/`, while the site configuration is stored in `docs/.vitepress/`. The project maintains course notes, study guides, practical tools, industry news, and class standards for the 2025 Computer Application Class 1.

## Repository Structure

- `docs/index.md`: site homepage
- `docs/course/`: course notes
- `docs/guide/`: study guides and writing guidance
- `docs/tools/`: practical tools
- `docs/news/`: industry news
- `docs/7s.md`: dormitory 7S management standard
- `docs/funding.md`: sponsorship page
- `docs/public/`: static assets copied to the site root
- `docs/.vitepress/config.mts`: VitePress configuration, navigation, sidebar, and SEO settings

Place new pages in the most relevant content directory. If a page should appear in the site menu, update the navigation or sidebar in `docs/.vitepress/config.mts`. Use lowercase English letters, numbers, and hyphens for page paths; avoid spaces.

## Content Guidelines

- Write documentation in clear, consistent Simplified Chinese unless the task explicitly requires another language.
- Keep heading levels continuous and use descriptive titles.
- Include a short introduction and practical examples where appropriate.
- Specify a language for every fenced code block.
- Write command examples for Windows PowerShell unless another shell is explicitly required.
- Use complete HTTPS URLs for external links.
- Store images in `docs/public/` and reference them with site-root paths such as `/example.png`.
- Preserve the existing terminology, link structure, and page style when editing content.
- Never commit secrets, tokens, personal information, build output, or local environment files.

## Development and Verification

Use pnpm for dependency management. Install dependencies with:

```powershell
pnpm install
```

Available scripts:

```powershell
# Start the local documentation server for manual preview
pnpm docs:dev

# Build the production site; this is required after changes
pnpm docs:build

# Preview the generated production site
pnpm docs:preview
```

After making changes, run `pnpm docs:build`. The build output is generated in `docs/.vitepress/dist/`; inspect `docs/.vitepress/dist/index.html` when homepage verification is needed. Do not run `npm run dev` or `astro dev`; this repository is a VitePress project, not an Astro project.

## Configuration Changes

- Edit `docs/.vitepress/config.mts` when changing navigation, sidebar entries, site metadata, or SEO behavior.
- Preserve the existing `zh-CN` language setting, RSS link, canonical URL logic, and social metadata unless removal is explicitly requested.
- Add page-level SEO metadata through Markdown frontmatter fields such as `title`, `description`, and `keywords`.
- Do not manually place generated files in `docs/`; generated output belongs in `docs/.vitepress/dist/`.

## Git Conventions

The default branch is `main`. Before editing, confirm that unrelated worktree changes are not overwritten or reset.

Commit messages must use English Conventional Commits format:

```text
<type>(optional-scope): <imperative subject>
```

Allowed types include `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, and `chore`. Use a lowercase imperative subject, keep it at 50 characters or fewer, and omit the final period. Do not create branches, commits, or pushes unless explicitly requested.

## Change Checklist

1. Confirm that the requested scope does not conflict with existing worktree changes.
2. Check Markdown headings, links, code blocks, and frontmatter.
3. Run `pnpm docs:build`.
4. Confirm that the build output is generated successfully and inspect `docs/.vitepress/dist/index.html` when needed.
5. Report the changes and verification result in concise English.
