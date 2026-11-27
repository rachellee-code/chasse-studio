# 原项目结构与授权核查

核查日期：2026-11-27（Asia/Shanghai）。

来源：https://github.com/MigVarona/VideoEditor-Portfolio-wBlog

已克隆到同工作区的 `github/video-portfolio`，保留原代码不做修改；分析的 HEAD 为 `768e8f56c489cf0bf08f443d55525f161a108b5e`。

## README 与 AGENTS 检查

先尝试读取仓库根目录的 README.md、AGENTS.md，GitHub 返回 404。随后检查完整 Git 树和本地克隆：不存在其他大小写、其他目录的 README 或 AGENTS.md，因此没有可遵循的项目维护说明。

## 现有代码结构

| 位置 | 用途与观察 |
| --- | --- |
| `index.html` | 首页，个人姓名大字、背景视频、分类滚动文字、Demo reel 弹窗、合作品牌及联系入口。包含原人物资料和 Google Analytics 标识。 |
| `about.html` / `contact.html` | 独立介绍与联系页。 |
| `advertising.html` / `education.html` / `entertaiment.html` | 分类作品页面。 |
| `style.css` | 约 168 KB 的 Webflow 风格样式；黑底浅色文字，Inter Tight，600 字重，88px h1 / 63px h2，首页标题 108px；多个响应式断点。 |
| `main.js` | 约 1.2 MB 的 Webflow 前端运行库和动效配置，依赖 jQuery。文件头有该运行库的 MIT 注释。 |
| `modal.js` | 打开/关闭 iframe 弹窗，关闭时重新赋值 iframe URL 停止播放。 |
| `assets/` | 约 125 MB，含原人物的视频、图片及标志；没有发现素材的统一授权声明。 |
| `src/input.css` / `src/output.css` / `tailwind.config.js` | Tailwind 样式输入与产物。 |
| 根 `package.json` | Tailwind 与 Express/Mongoose/bcrypt 等依赖，没有开发或构建 scripts，也没有 license 字段。 |
| `app/` | 独立 Express/MongoDB 博客后台，含登录、文章、上传、邮件接口；依赖数据库和邮件环境变量。`app/package.json` 有 `license: ISC` 声明。 |
| `app/public/posts/` | 博客文章及重复前端资源。 |
| `vercel.json` | 只有 `cleanUrls: true`，没有为博客服务器完成通用 Vercel 部署配置。 |

## 协议结论

仓库没有顶层 LICENSE、COPYING、NOTICE 或 README 授权说明，GitHub 仓库元数据中的 license 为 null。

补充发现：`app/package.json` 的 ISC 字段仅出现在后台子项目；`main.js` 的 MIT 注释对应 Webflow 运行库。它们不足以确认整个网站的自定义代码、设计和媒体素材都获得同一授权。不能将该仓库整体描述为“已经核实为 MIT/ISC 的开源模板”。

GitHub 对无许可证仓库的说明：https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository

当前预览在独立目录重写页面和交互，使用原创 SVG 图形及由这些图形生成的静音短视频，不复制原项目的实现或媒体。Inter Tight 从 Google Fonts 单独获取，保留其 OFL 许可证。若后续要直接沿用原项目的网站源码、视频、图像或更精确复刻设计，应先获得权利人的明确授权范围。本报告是仓库文件核查记录。

## 本地实现选择

保留视觉方向：大字号、清晰层级、充分留白、标题入场、作品滚动显现、连续滚动文字、联系入口及弹窗观看。经本地视觉调整，界面字体已改为 Manrope + Noto Sans SC，并增加中英双语及轻微雾玻璃效果。

改为 Vite + 原生模块，静态托管即可，无需原博客服务、数据库和登录。作品来自独立配置文件。使用原生 dialog、IntersectionObserver、CSS 动效与原生 video；不依赖 Webflow/jQuery 运行库。
