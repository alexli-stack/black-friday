# OneLaser Support

OneLaser Support 页面设计初稿，2026-11-12。

## 文件

- `dist/index.html`：可独立部署的英文预览，包含模拟官网导航和页脚。
- `dist/assets/`：本地品牌图片、CSS、无依赖 JavaScript。
- `sections/onelaser-support.liquid`：Shopify OS 2.0 section，使用店铺已有导航和页脚。
- `templates/page.support.json`：Support 页面模板，预置四个产品系列。
- `assets/ol-support-*`：Shopify section 使用的机器图片。
- `locales/en.default.json`：需要合并到主题语言文件的 `onelaser_support` 字段。
- `docs/design-rationale.md`：竞品参考、产品分类、迁移范围与待补内容。

## Shopify 安装

1. 在未发布主题副本中新增 section 和 template；将 `assets/ol-support-*` 复制到主题 assets。
2. 将本项目 `locales/en.default.json` 的 `onelaser_support` 对象**合并**到主题对应文件，不能覆盖整个文件。
3. 在 Shopify 后台新建 Support 页面，选择 `support` 模板。
4. 用主题编辑器修改标题、描述、品牌色、工单 URL，以及产品卡片图片、分类、机型、资源链接。
5. 在未发布主题预览中检查真实导航、字体和现有 CSS 的兼容性后再发布。

这是可迁移的主题组件，不是完整 Shopify 主题。独立预览使用与组件一致的内容、视觉和交互；真实主题导航和页脚由目标店铺提供。

## 功能边界

- 关键词搜索只索引页面收录的资源；支持多关键词、无结果提示和完整 Wiki 入口，不代表已接入 Wiki 全文搜索。
- 机型筛选：Desktop / Cabinet / Vertical rotary；FAQ 原生 details，可键盘操作。
- 无前端框架、外部 JS、追踪脚本或虚假在线客服。
- 资源保留 Wiki / Zoho / 官网真实入口；没有伪造产品专属文档、服务时效或保修承诺。
- 未将 Wiki 的全部文章迁入 Shopify；本轮完成统一入口与页面模板。完整内容迁移还需文章清单、URL 映射、301、搜索索引和逐篇技术审核。

## 开发

直接编辑 `dist/index.html` 和 `dist/assets/support.css` / `support.js` 可修改预览。Shopify section 内 CSS/JS 使用 `{% stylesheet %}` / `{% javascript %}`，修改后应同步检查两种版本。

`onelaser-support` 命名空间隔离组件样式；模板使用 locale 翻译和可编辑机器 blocks。主题编辑器重载会重新初始化交互。组件最多添加一次。
