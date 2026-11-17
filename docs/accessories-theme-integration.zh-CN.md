# 配件页公共导航接入

## Shopify 正式页面

`templates/page.accessories.json` 不指定替代 layout，也不渲染独立 header/footer，因此使用当前主题默认的 `layout/theme.liquid`，沿用其中已有的 header-group 和 footer-group。主题里的菜单、联系方式、促销条和底部链接更新后，该页面与其他页面一同更新。这里没有修改或复制现有公共导航。

将以下文件加入现有主题的未发布副本：

- `templates/page.accessories.json`
- `sections/ac-collection.liquid`
- `snippets/ac-collection-body.liquid`
- `assets/ac-theme.css`、`assets/ac-theme.js`、`assets/ac-theme-data.js`
- `assets/archivo-400.woff2`、`assets/archivo-700.woff2`

在 Shopify 中将目标页面的主题模板设为 `accessories`。当前提交没有上传、发布或切换线上主题。当前配件商品数据仍是快照，不能作为实时库存实现；本次只处理公共导航接入，不改变此前的商品数据边界。

配件样式放在 `.ac-page` 的 CSS `@scope` 中，脚本查询和交互也限制在该内容根节点，避免全局 body、header、footer、表单和按钮样式污染官网公共导航。这里要求支持 CSS @scope 的现代浏览器。机型和商品图在主题版中使用原官网 CDN 地址；不依赖 GitHub 目录路径或 iframe。

正文或设计更新后运行 `python scripts/build-accessories-theme.py`，重新生成主题文件，保持与静态预览一致。

## GitHub 静态预览

官网响应没有允许第三方域读取 HTML 的 CORS 头，因此 GitHub 静态页面不能在浏览器中实时读取官网导航。预览使用从官网公开 HTML 同步的 header/footer section group 快照，分别位于 `preview/site-header.html` 和 `preview/site-footer.html`。

这些快照保留官网当前导航 DOM、菜单链接、样式和必要交互，CSS、字体、图片和必要主题脚本下载到 `assets/site-shell/`，避免预览受远程资源加载失败影响。使用两个隔离容器展示公共导航，避免官网样式与配件页面样式互相覆盖。导航链接跳转官网顶层页面；搜索和表单提交也进入官网，不在预览中模拟账户或购物车。

刷新当前快照：

```sh
python -m pip install beautifulsoup4
python scripts/sync-site-shell.py
```

刷新后提交生成文件即可更新 GitHub 预览。没有配置定时刷新，因此静态预览不会自动跟随未来官网修改；同步时间和来源保存在 `docs/site-shell-source.json`。正式 Shopify 页面则直接继承当前主题公共导航，无需此快照脚本。

页脚快照同步官网底部链接、联系方式、社交与政策区；配件正文已存在专家帮助模块，因此没有重复附加官网 newsletter / Talk to a Rep 区块。

## 验证范围

已验证桌面导航、官网 Logo 加载、页脚链接、手机菜单展开和可见内容，以及原配件页的四个屏宽与购买交互回归。加购测试拦截真实提交，没有写入购物车。

主题版已检查 section/template JSON、JavaScript 语法，并在模拟主题全局样式下确认正文交互和外部 header 样式不受污染。当前环境没有 Shopify AI Toolkit 的本地校验脚本，也没有完整线上主题，未运行其 Liquid 专用验证或真实主题端到端测试；正式启用前需在未发布主题中执行 Theme Check 和商店预览。
