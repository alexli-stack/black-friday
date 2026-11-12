# OneLaser Support 页面设计说明

调研日期：2026-11-12。页面信息依据当日可访问页面；产品配置以官方具体机型资料为准。

## 竞品观察

| 品牌 | 确认的页面结构 | 对 OneLaser 的应用 |
| --- | --- | --- |
| xTool | Support hero 搜索、热门搜索、Popular Services、按产品分类、培训与联系入口 | 强搜索入口、真实机器图、把技术支持作为独立行动入口 |
| WeCreat | 知识库搜索、Laser Engravers / Software、机器与附件分类、Service Portal、联系入口 | 分开机器、软件、配件问题；服务入口与文档分区 |
| OMTech | 旧 Help Center 按 First Time Setup / Safety / Maintenance / Troubleshooting / FAQ / Hot Tips 分类；官网 Support 导航分 Contact & Service、Orders & Warranty、Product Support | 采用按问题分类与独立下载区；新版 help.omtech.com 抓取被拒绝，未声称已视觉核验其新版布局 |
| Thunder Laser USA | 搜索、按机型、按任务、常用文章、培训和工单 | 兼顾“我有什么机型”和“我遇到什么问题”两种路径 |

本轮已读取竞品可访问页面的内容结构，但云环境未提供可调用的共享 Chrome 控制工具，未完成竞品页面截图与视觉逐项比对。版式是依据已确认结构与 OneLaser 官网设计语言自行设计。

来源：
- https://support.xtool.com/
- https://help.wecreat.com/
- https://help.omtechlaser.com/hc/en-us （页面明确提示新版迁至 https://help.omtech.com/ ）
- https://omtech.com/index
- https://www.thunderlaserusa.com/knowledge/

## OneLaser 产品架构

| 系列 | 产品类型与支持重点 | 本版入口 |
| --- | --- | --- |
| X Series（XRF / XT） | 桌面 CO₂ 系列；不同光源配置需对应手册。安装、聚焦、LightBurn、连接与保养 | 系列 Wiki + 官方手册 |
| Cobra 8 / 10 / 14 | 玻璃管 CO₂、落地工作室设备；排烟、冷却、光路、安装支持 | 技术工单 + 联系团队；未核实到专属 Wiki，因此不冒充已有文档 |
| Hydra Gen2（7 / 9 / 13 / 16） | RF / 双光源配置的落地生产系列；按代际和实际光源分流 | 官方 Gen2 手册库 + 技术工单 |
| Hydra Gen1（7 / 9 / 13 / 16） | 旧款 CO₂ / RF 系列资料；设置与维护不可默认跨代复用 | 单独的旧款入口到 Hydra Wiki |
| VertiGO | 立式旋转雕刻，杯体、滚筒和圆柱工件定位 | VertiGO 专属 Wiki 手册 |
| 附件与软件 | 软件连接、LightBurn、气辅与旋转等跨机型需求 | 软件入口与 Parts & technical support |

官网现有产品范围已超出 Wiki 首页：Wiki 主要展示 X、Hydra、VertiGO，官网新增 Cobra 和 Hydra Gen2。新版支持首页必须照顾新款用户，同时保留旧设备资料。

品牌依据：https://www.1laser.com/ 。使用真实官网机器图与 Logo，黑白灰为主、橙红强调色 `#E7310E`，呼应官网常用橙红色。大标题、充足留白、工程感机器图片；避免把支持页做成促销页。

## 信息架构

1. Hero：明确支持定位与资源搜索。
2. 四个快捷入口：手册、软件下载、材料参数、故障排查。
3. 按机型查找：四组在售系列 + 旧款入口；筛选不隐藏旧款入口。
4. 按任务查找：开始使用、软件、材料、排障、保养、配件支持。
5. 常用指南 + 参数与下载并列，提高中段内容效率。
6. FAQ：代际、材料参数、固件、工单准备。
7. 人工支持收尾：真实 Zoho 工单和官方社区。

## 本轮迁移范围

完成 Shopify Support 入口页与可编辑机型卡片。Wiki 内容目前通过真实外链承接，并未完成文章级迁移。这样可先审核布局，再逐步迁内容。

后续文章迁移需要：抓取全量页面清单、指定 Shopify pages / blogs / 外部知识库承载方式、保留旧 URL 与 301 映射、分类与全文搜索、图片和附件转存、技术审核。

## 参数处理

保留 Wiki 原有 38W、55W、80W、100W、130W、150W 独立参数入口，不把 38W 参数套给 Gen2 其他 RF 配置。页面明确让用户匹配光源和功率，未列出的配置联系技术支持。固件不做无条件“下载最新版”按钮，避免用户自行刷错机型。

## 待下一轮补齐

- Cobra 专属安装、冷却、排烟、故障排查页面。
- Hydra Gen2 各配置、各功率专属 Wiki 路径与参数。
- 附件清单、各机型适配关系与专属手册。
- 确认保修政策入口、服务区域与工作时间后再补充承诺。
- 按真实用户问题和工单频次调整常用资源排序；目前“Start here”是编辑推荐，没有虚构浏览量。
- 若需要站内完整检索，接入 Wiki 搜索 API 或维护经审核的完整文档索引。

## 验证说明

页面使用响应式 CSS、图片宽高、首屏高优先级图片、下方图片懒加载；页面主体在 HTML/Liquid 中直接渲染。JavaScript 只处理筛选与资源搜索，FAQ 无 JS 也能使用。无结果状态、键盘焦点和减少动画偏好均有处理。

链接检查：20 个去重外链中，发现模拟导航的 Accessories 旧路径 404，已改为官网现用 `/collections/laser-accessories`。官方 Wiki 引用的论坛地址在本环境代理返回 403，无法核验论坛实际可用性，页面保留官方原始入口。其余已检查链接返回 200。

Shopify CLI `theme check`：0 errors / 0 warnings。技能提供的专用 validator / feedback 脚本在当前云技能接口中无法读取、在本地也不存在，因此以官方 CLI Theme Check 与独立 Liquid 渲染验证替代，未声称已运行技能专用校验。
