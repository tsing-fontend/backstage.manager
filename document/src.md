## `src`目录
- 页面也可以  `src/pages` 作为根 `pages` 目录的替代添加。在 `src` 目录中许多应用程序中非常常见,默认情况下, Next.js 支持该目录。

### 注意事项
- `src/pages` 如果 `pages` 根目录中存在,将被忽略。
- 像 `next.config.js` 和这样的配置文件 `tsconfig.json` 应位于根目录中,将其移至 `src` 无法使用。
