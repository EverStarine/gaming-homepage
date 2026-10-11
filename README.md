# EverStarine · 游戏档案

个人游戏主页的独立公开源码备份，以《明日方舟：终末地》四号谷地重工业景观为视觉灵感。

- GitHub Pages：<https://everstarine.github.io/gaming-homepage/>
- OpenAI Sites：<https://everstarine-valley-game.pretty-grass-6439.chatgpt.site/>

## 页面与内容

据点总览、游戏账号、成就展示、影像档案、留言墙和关于本站。内容均保留为空框架。留言支持当前浏览器的本地草稿和预览，尚未接入公共留言服务。

网站采用静态 HTML/CSS/JavaScript。无需构建，图片和图标均随源码保留。主视觉是为本站生成的原创工业山谷插画。

## 修改与预览

编辑 dist/content.js 填入真实账号、成就、影像或静态留言；profile.bio 为个人介绍。relatedSite 保持 disabled，学术站互链暂未启用。

运行 node preview.mjs 后访问 http://127.0.0.1:4184/ 。

main 分支保存 dist/ 源码与资源；gh-pages 将相同网页文件放在根目录，附 .nojekyll，供 GitHub Pages 发布。更新网页时需要同步两分支。

本仓库属于独立游戏站，学术主页拥有自己的仓库、地址和资源。本仓库不保存学术 PDF、Sites 的 .openai 配置、认证信息或本地工作记录。Sites 后续发布应在原始本地游戏工程中操作。
