# OneLaser Giveaway → Pipedrive

为 Shopify 草稿主题 `BFCM 2026-Codex Draft5`（ID `193291812898`）准备的独立接口与主题补丁。当前代码不代表已经上线。Klaviyo 原来的 subscription / event 逻辑保留；填入接口地址后，按钮会同时提交给 Klaviyo 与本接口。

## Render 部署

1. 将此分支推送至 GitHub。在 Render 新建 **Blueprint**，选择仓库和该分支，配置文件选仓库根目录的 `render.yaml`。
2. 此配置使用一个 Starter Web Service 和 1 GB 持久磁盘，**会产生 Render 费用**。在 Render 查看价格后再确认创建。不要选择没有持久磁盘的临时文件系统；不要横向扩容或启动第二个实例。
3. 在 Render 的私密环境变量中填写 `PIPEDRIVE_DOMAIN`（例如 `yourcompany.pipedrive.com`，不含协议或路径）及 `PIPEDRIVE_API_TOKEN`。Token 可在 Pipedrive 的个人偏好设置 / API 页面获取，取决于账户权限。不要提交到 GitHub、Liquid、前端 JavaScript 或聊天。
4. Blueprint 自动生成 `DEDUPE_SECRET`，保持其值和持久磁盘不变；丢失或更换会破坏本次活动的去重记录。`ALLOWED_ORIGINS` 默认只接受 `https://www.1laser.com` 和 `https://1laser.com`。若草稿预览实际使用其他域名，验证后加入其精确 origin。
5. 部署完成后记录 HTTPS 服务地址，检查 `GET /healthz` 返回 `{"ok":true}`。健康检查只证明服务可用，不证明 Pipedrive 授权有效。
6. 将 `theme/assets/bfcm2026.js` 和 `theme/sections/bfcm26-m06.liquid` 上传到指定草稿主题。它们以当时读取的 Draft5 为基线；上传前重新读取远端、确认无并行修改。有改动时合并补丁，不能覆盖后续编辑。
7. 在主题编辑器的“07 材料包抽奖”设置中，将 **Giveaway CRM endpoint** 填为 `https://服务域名/api/giveaway`。留空时仍只有 Klaviyo 提交。不要发布主题，先在草稿预览中联调。
8. 用专门的测试邮箱和合法美国电话号码提交一次；确认 Klaviyo 列表与活动事件均收到，并在 Pipedrive Leads Inbox 找到标题以 `BFCM 2026 Giveaway` 开头的 Lead。再次提交同一邮箱，确认没有第二条 Lead。若没有创建，查看 Render 日志和下方队列状态。

## 数据行为

- 固定活动为 `BFCM 2026 Giveaway`；接收邮箱和美国电话号码，不接受客户端指定 person_id、负责人或活动名。
- 先按邮箱精确匹配联系人；不存在时创建 Person，姓名暂用邮箱（表单没有姓名字段）。新联系人保存标准化 `+1` 电话。
- 已有联系人直接复用，不覆盖原有资料。本次提交的邮箱与电话也放在 Lead 标题中，确保能找到本次报名号码。Lead 归 API Token 所属用户，使用其默认可见性。
- 每个邮箱在本次活动只创建一条 Lead；重复报名以首次提交为准。去重记录持久保存在 SQLite，重复报名不会更新号码。更换活动时必须调整服务端 campaign 与主题配置。
- API 返回 `202 {accepted:true}` 表示已写入持久队列，CRM 稍后处理；通常数秒，故障重试可能更久。网页仅在 Klaviyo 与接口均接受后显示原有成功提示；部分失败时保留输入，当前页面重试只提交尚未成功的服务。
- Klaviyo 与 Pipedrive 是独立服务，不支持跨系统事务；关闭页面后再次尝试可能再次产生 Klaviyo 事件，但 CRM 去重仍有效。客户端请求发出前就关闭页面可能导致提交不完整。

## 故障与运维

在 Render Shell 执行 `node ops.mjs`，查看 `pending/done/review/failed` 计数及需要处理的任务 ID。日志与该命令不输出邮箱、电话或 Token。

- GET 网络故障、限流等明确可安全重试的故障最多尝试 8 次，指数退避，最长间隔一小时。
- 创建操作超时、5xx、响应不明确，或服务在处理中重启：任务进入 `review`，停止自动重试，避免重复创建 Person / Lead。先在 Pipedrive 按邮箱和活动标题核查，再由维护人员修复队列；不能盲目重置重试。
- 权限错误或重试耗尽：进入 `failed`。修复凭据 / 权限后，由维护人员核实远端状态再恢复任务。新请求不会把失败任务伪装成已成功。
- 同步完成后清除队列中的邮箱与电话载荷，保留不可逆 HMAC 去重键和 CRM ID。未完成任务仍包含邮箱与电话，故持久磁盘与备份须限制访问；完成故障处理后清除其载荷。HMAC key 不能用于获取原邮箱。
- 设置 Render 日志告警，关注 `giveaway_delivery_error`，定期运行 `ops.mjs`。服务健康并不代表没有待处理任务。
- 端点是公开报名入口：精确 CORS allowlist、JSON 请求、4 KB 上限、输入校验、单实例持久化 IP 限流（每 10 分钟 20 次）、全局限流（每 10 分钟 500 次）减少滥用。CORS 不能阻止非浏览器伪造来源。如有机器人攻击，可在边缘添加挑战验证。
- `TRUST_PROXY=true` 仅用于请求必经可信代理的托管部署，使用代理追加的最后一个 `X-Forwarded-For` 地址；自行部署且直接暴露 Node 时设为 false，并确认代理的头部规则。
- 如需回退，清空草稿的 endpoint 设置即可恢复原来的 Klaviyo 行为；同时记录队列中尚未处理的报名。

## 本地验证

要求 Node.js 24，无第三方运行时依赖。

```sh
cd integrations/giveaway
npm test
```

本地运行需复制 `.env.example` 并填入私密配置，生成至少 32 字符随机 `DEDUPE_SECRET`，用 `node --env-file=.env server.mjs` 启动。不要在 ChatGPT 临时运行环境中承载正式报名服务。

测试使用模拟 Pipedrive，不会创建真实联系人或 Lead。实际授权、Render 代理配置、草稿浏览器提交和真实 CRM 入库仍需部署后联调。

API 文档依据：[Persons](https://developers.pipedrive.com/docs/api/v1/Persons)（v2）、[Leads](https://developers.pipedrive.com/docs/api/v1/Leads)（v1）。
