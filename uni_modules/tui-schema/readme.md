# 官方uts-openSchema以组件的形式的封装，提供了一站式的跳转服务。该组件支持多种跳转场景，包括跳转小程序、WEB端打开小程序、WEB端跳转URL、打开指定APP以及打开地图坐标等。通过简单的配置
```vue
<template>
	<t-page title='链接'>
		<t-card title='超链接 Link' main-class="mtlr-30"
			subTitle="
提供了一站式的跳转服务。该组件支持多种跳转场景，包括跳转小程序、WEB端打开小程序、WEB端跳转URL、打开指定APP以及打开地图坐标等。通过简单的配置"></t-card>
		<!-- #ifdef APP-ANDROID -->
		<introduction title='打开小程序(通过支持宝云函数获取小程序跳转ID)'>
			<t-row>
				<t-text>点击进入</t-text>
				<t-link :url="mpUrl">《服务公社》</t-link>
				<t-text>小程序</t-text>
			</t-row>
		</introduction>
		<introduction title='打开指定APP'>
			<t-row>
				<t-text>点击进入</t-text>
				<t-link url="market://details?id=com.tencent.mm">《应用市场》</t-link>
				<t-text>打开APP</t-text>
			</t-row>
		</introduction>
		<introduction title='打开地图坐标'>
			<t-row>
				<t-text>点击进入</t-text>
				<t-link
					url='androidamap://viewMap?sourceApplication=Hello%20uni-app&poiname=DCloud&lat=39.9631018208&lon=116.3406135236&dev=0'>《地图》</t-link>
				<t-text>APP</t-text>
			</t-row>
		</introduction>
		<!-- #endif -->
		<!-- #ifdef APP-IOS -->
		<introduction title='应用市场'>
			<t-row>
				<t-text>点击进入</t-text>
				<t-link type="p" :hover="true"
					url="itms-apps://search.itunes.apple.com//WebObjects//MZSearch.woa/wa/search?media=software&lterm=">打开
					AppStore 到搜索页</t-link>
				<t-text>搜索</t-text>
			</t-row>
		</introduction>
		<introduction title='打开地图坐标'>
			<t-row>
				<t-text>点击进入</t-text>
				<t-link url='http://maps.apple.com/?q=数字天堂公司&sll=39.9631018208,116.3406135236&z=10&t=s'>《地图》</t-link>
				<t-text>坐标（需要后台配置对应才能跳转）</t-text>
			</t-row>
		</introduction>
		<introduction title='跳转apple协议'>
			<t-row>
				<t-text>点击进入</t-text>
				<t-link
					url='https://developer.apple.com/library/archive/featuredarticles/iPhoneURLScheme_Reference/MapLinks/MapLinks.html '>apple协议</t-link>
			</t-row>
		</introduction>
		<!-- #endif -->
		<!-- #ifdef WEB -->
		<introduction title='WEB端打开小程序'>
			<t-row>
				<t-text>点击进入</t-text>
				<t-link :url="mpUrl">《服务公社》</t-link>
				<t-text>小程序</t-text>
			</t-row>
		</introduction>
		<introduction title='启动 Hello uni-app x 应用(需要真机且安装Hello uni-app x APP)'>
			<t-row>
				<t-text>点击进入</t-text>
				<t-link :url="mpUrl">Hello uni-app x</t-link>
				<t-text>APP</t-text>
			</t-row>
		</introduction>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<introduction title='跳转小程序'>
			<t-row>
				<t-text>点击进入</t-text>
				<t-link :url="mpUrl">《服务公社》</t-link>
				<t-text>小程序</t-text>
			</t-row>
		</introduction>
		<!-- <introduction title='启动 Hello uni-app x 应用(需要真机且安装Hello uni-app x APP)'>
			<t-row>
				<t-text>点击进入</t-text>
				<t-link :url="mpUrl">Hello uni-app x</t-link>
				<t-text>APP</t-text>
			</t-row>
		</introduction> -->
		<!-- #endif -->
	    <!-- #ifndef MP-WEIXIN -->
	    <introduction title='跳转URL'>
	    	<t-link url='https://doc.dcloud.net.cn/uni-app-x/'>https://doc.dcloud.net.cn/uni-app-x/</t-link>
	    </introduction>
	    <!-- #endif -->
	</t-page>
</template>

<script>
	import { TuiApi } from '@/api'
	export default {
		data() {
			return {
				mpUrl: ''
			};
		},
		created() {
			TuiApi('getQueryscheme',{},true).then(res => {
				this.mpUrl = res['data'] as string
			})
		},
		methods: {

		}
	}
</script>
```


# uts-openSchema文档

打开链接，支持：

1. 打开外部 App
2. 使用浏览器打开链接
3. 打开地图到指定地点
4. ...

## 使用

1. 安装此插件
2. 在要使用的地方 `import` 导入
  ```ts
  import { openSchema, canOpenURL } from '@/uni_modules/uts-openSchema'
  ```
3. 直接调用 `openSchema` 方法：
  ```ts
  // #ifdef UNI-APP-X
  // 使用外部浏览器打开指定URL
  openSchema('https://uniapp.dcloud.io/uni-app-x')

  // #ifdef APP-ANDROID
  // Android 使用应用商店打开指定App
  openSchema('market://details?id=com.tencent.mm')

  // Android 打开地图坐标
  // 可以先用canOpenURL判断是否安装了地图软件
  if (canOpenURL('androidamap://')) {
    openSchema('androidamap://viewMap?sourceApplication=Hello%20uni-app&poiname=DCloud&lat=39.9631018208&lon=116.3406135236&dev=0')
  } else {
    console.log('未安装高德地图')
  }
  // #endif -->

  // #ifdef APP-IOS
  // 打开 AppStore 到搜索页
  openSchema('itms-apps://search.itunes.apple.com//WebObjects//MZSearch.woa/wa/search?media=software&lterm=')

  // 打开 iOS 地图坐标
  openSchema('http://maps.apple.com/?q=Mexican+Restaurant&sll=50.894967,4.341626&z=10&t=s')
  // #endif -->

  // #endif -->
  ```

### 参数

- openSchema(url: string) // `url`：要打开的链接 `必填` `不为空字符串`

## 相关开发文档

[UTS 语法](https://uniapp.dcloud.net.cn/tutorial/syntax-uts.html)

[UTS API插件](https://uniapp.dcloud.net.cn/plugin/uts-plugin.html)

[UTS 组件插件](https://uniapp.dcloud.net.cn/plugin/uts-component.html)

[Hello UTS](https://gitcode.net/dcloud/hello-uts)
