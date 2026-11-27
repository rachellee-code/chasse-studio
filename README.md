# Chasse Studio — Video Portfolio

米白背景、Manrope 英文字体与 Noto Sans SC 中文字体、大字号标题、三列视频作品网格。当前展示的六个项目均为占位概念，并非真实客户项目。Logo 与首页细节文字使用「Chasse Studio / CHASSE STUDIO」，介绍重点为海外市场的视频剪辑与创意内容。界面和项目说明采用中英文双语。

## 在线访问

网站已通过 GitHub Pages 发布：

**[访问 Chasse Studio 网站](https://rachellee-code.github.io/chasse-studio/)**

源码仓库：[rachellee-code/chasse-studio](https://github.com/rachellee-code/chasse-studio)。

下面的 `127.0.0.1` 是本机开发地址，只在本地预览服务运行时可用，不能作为对外访问链接。

## 本地预览

使用 Node.js 22.12 或更新版本：

```sh
npm ci
npm run dev -- --port 4173
```

本机运行服务后，在浏览器输入 `http://127.0.0.1:4173/`。生产构建：`npm run build`，输出为 `dist/`；预览构建：`npm run preview`。

## 修改内容

所有项目与个人资料集中在 `src/portfolio.config.js`：

- `brand`、`bio`、`bioZh`、`email`、`wechat`：工作室资料及联系方式。邮箱为邮件客户端链接，微信号可一键复制；两项都留空时显示待配置提示。
- `hero`、`about`、`contact`：首屏文案、关于工作室的标题、创作方向和联系板块文案。
- `categories`、`categoryLabels`：中英筛选分类，当前为全部作品、品牌视频、UGC 视频、AI 视频、Meta 广告·精品、Meta 广告·普货。
- `projects`：`id`、`title`、`category`、`format`、`year`、`role`、`cover`、`preview`、`video`、`description`，以及对应的 `titleZh`、`roleZh`、`descriptionZh`。
- `format` 为 `9:16` 或 `16:9`；网格与播放器按原始比例呈现。
- 本地资源放入 `public/media/`，配置中写 `media/filename.mp4`；也支持 HTTPS MP4/WebM 直链。
- `preview` 可设短小、无声的预览文件；`video` 指向完整版。当前为了减少演示文件体积，两者使用相同的 4 秒占位视频。
- 当前播放器面向直接媒体 URL，不接受 YouTube/Vimeo 网页链接；如需嵌入服务可在后续阶段添加。

桌面三列，平板两列，小屏一列；手机通过点击观看。支持系统减少动态效果设置、键盘操作、Esc 关闭弹窗及焦点返回。

## 加载策略

封面使用 SVG、原生图片懒加载与异步解码。视频初始无 `src`、`preload="none"`，鼠标悬停时才获取预览，同一时刻只预览一个视频；移开、筛选、离屏或页面进入后台时停止并释放资源。触屏设备、节省流量模式及减少动态效果模式不自动预览。完整版只在打开弹窗时加载，关闭后释放。Manrope 英文字体与 Noto Sans SC 中文字体本地托管，无外部字体脚本或统计代码。

正式作品建议另行导出短预览（低码率、无声 MP4），使用 WebP/AVIF 封面，完整版放在支持 Range 请求的视频 CDN。替换视频后需重新检查体积与播放兼容性。

## GitHub / Vercel 部署

网站源码可作为独立 GitHub 仓库使用。当前六个视频仍为占位素材，正式作品可通过配置替换。

### GitHub + Vercel

将本目录作为独立仓库根目录上传 GitHub。在 Vercel 导入该仓库，框架 Vite，构建 `npm run build`，输出目录 `dist`；已有 `vercel.json`，无需环境变量。如果上传整个上级工作区，需将 Vercel Root Directory 设为本目录。

### GitHub Pages

已准备 `.github/workflows/deploy-pages.yml`，仅支持手动触发。将本目录作为仓库根目录上传后，在 Settings → Pages 选择 GitHub Actions，再手动运行 Deploy portfolio to Pages。`base: './'` 支持项目子路径；这是单页锚点导航，不需要 SPA 路由回退。

参考：[Vercel Vite 文档](https://vercel.com/docs/frameworks/frontend/vite)、[GitHub Pages 工作流文档](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

## 来源与协议

参考项目的结构分析与授权核查见 `docs/source-review.md`；第三方字体信息见 `THIRD_PARTY_NOTICES.md`。本实现参考原项目的视觉方向独立编写，未复制原仓库的网站代码、人物资料、视频、图像或分析统计标识。

## 视觉调整

导航、分类筛选容器和视频弹窗使用轻微雾玻璃：半透明米白、背景模糊、细边框和低对比阴影。背景与文字保持原有配色。中英文字体采用本地 WOFF2；中文文件按当前界面字符裁剪，新增字符自动使用系统中文无衬线字体回退。
