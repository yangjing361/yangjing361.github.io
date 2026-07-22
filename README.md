# 阿靖形象计划

只服务阿靖个人的面部、穿搭、训练与体态改善 PWA。记录和照片保存在使用者当前设备的浏览器中，不会自动上传到仓库。

## 在线地址

<https://yangjing361.github.io/>

## Android APK

- 最新版本：<https://github.com/yangjing361/yangjing361.github.io/releases/latest>
- v1.0.0 直接下载：<https://github.com/yangjing361/yangjing361.github.io/releases/download/v1.0.0/ajing-image-plan-v1.0.0.apk>

## 本地启动

在 Windows PowerShell 中运行：

```powershell
./start.ps1
```

然后访问 <http://localhost:8765/>。

## 六个模块

- 今日：30 天计划，每天只做一个动作
- 面部：拍摄失真、发型、镜框、基础维护和企业 IP 固定机位
- 穿搭：三套固定制服、购买闸门和六件优先补充单品
- 训练：按星期切换的 30/45/60 分钟计划、计时和完成记录
- 进度：面部/穿搭评分、体重趋势和同条件照片对比
- 档案：个人身体数据、备份、恢复和重新开始计划

## 数据

- 个人档案与计划勾选：浏览器 localStorage
- 周记录与照片：浏览器 IndexedDB
- 换设备或大版本更新前：在“档案”页导出 JSON，再在新环境导入

## APK 更新原则

网页内容更新后由 PWA 自动获取。Android 原生外壳变更时，必须保持应用 ID 和签名密钥不变，并提高 versionCode 后重新构建 APK。
