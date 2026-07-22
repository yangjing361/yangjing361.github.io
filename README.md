# 阿靖形象计划

只服务阿靖个人的面部、穿搭、训练与体态改善应用。网页端和 Android 独立版共用同一套功能，记录和照片只保存在当前设备，不会自动上传到仓库。

## 在线地址

<https://yangjing361.github.io/>

## Android APK

- 最新版本：<https://github.com/yangjing361/yangjing361.github.io/releases/latest>
- v1.0.1 独立版直接下载：<https://github.com/yangjing361/yangjing361.github.io/releases/download/v1.0.1/ajing-image-plan-standalone-v1.0.1.apk>
- v1.0.0 是旧 TWA 网页外壳版，已停止使用。

Android 独立版基于 Capacitor，页面、样式和程序资源均打包在 APK 内。它会作为正常应用独立打开，不依赖 Chrome，也能离线使用主要功能。

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

- 个人档案与计划勾选：当前网页或应用环境的 localStorage
- 周记录与照片：当前网页或应用环境的 IndexedDB
- 从 v1.0.0 网页外壳版升级到 v1.0.1 独立版前，先在旧版“档案”页导出 JSON，覆盖安装后再导入。
- 换手机、卸载应用或清除应用数据前，也必须先导出备份。

## APK 更新原则

独立版的内容和程序都在 APK 内，后续修改面部、穿搭、训练或页面功能后，需要重新构建并安装新版 APK。每次更新必须保持应用 ID `com.ajing.imageplan` 和签名密钥不变，同时提高 `versionCode`，手机上直接覆盖安装。
