

# Scan 扫码
该组件可以集成到应用中，提供实时的扫码功能，适用于多种扫码场景。

```vue
<template>
	<t-page main-class="p-30">
		<t-card main-class="mb-30" title="tui-scan扫码" sub-title="支持自定义插槽自定义扫码布局,使用插槽记得设置:mask='false'">
		</t-card>
		<t-scan v-if="show" ref="scancodeEle" :isPreviewing="isPreviewing" main-class="h-600 mb-30 tdr"
			@scanned="scanned" :mode="mode" :mask="mask" type='p'>
			<!-- <t-col main-class="da-twh-100%-ba-fc">
				<t-text>插槽测试-使用插槽记得设置:mask='false'</t-text>
			</t-col> -->
		</t-scan>
		<t-button main-class="mb-30" @click="switchs">{{mode=='qr'?'扫条形码':'扫二维码'}}</t-button>
		<t-button main-class="mb-30" @click="closeMask">{{mask?'关闭':'打开'}}遮罩层</t-button>
		<t-button main-class="mb-30" @click="open">开启扫描</t-button>
		<t-button main-class="mb-30" @click="isPreviewing=!isPreviewing">{{isPreviewing?'关闭相机预览':'打开相机预览'}}</t-button>
		<t-button main-class="mb-30" @click="photo">图片识别</t-button>
	</t-page>
</template>
<script setup>
	import { ScanResult } from '@/uni_modules/tui-scan'
	const scancodeEle = ref<TScanComponentPublicInstance | null>(null)
	const isPreviewing = ref(true)
	const show = ref(true)
	const mode = ref('bar')
	const mask = ref(true)
	function closeMask() {
		mask.value = !mask.value
		show.value = false
		nextTick(() => {
			show.value = true
		})
	}
	function switchs() {
		show.value = false
		nextTick(() => {
			if (mode.value == 'bar') {
				mode.value = 'qr'
			} else {
				mode.value = 'bar'
			}
			show.value = true
		})
	}
	function photo() {
		let el = scancodeEle.value as TScanComponentPublicInstance
		el.scanImage()
	}
	function open() {
		let el = scancodeEle.value as TScanComponentPublicInstance
		el.rescan()
	}
	function scanned(e : ScanResult) : void {
		uni.showModal({
			title: e.data[0].value,
			success: (_) => {

			}
		})
	}
</script>
```


## 事件

| 事件名     | 说明                                     | 回调参数                     |
| :--------- | :--------------------------------------- | :--------------------------- |
| `scanned`  | 当成功扫描到条码或二维码时触发           | `e`：扫描结果对象 (`ScanResult`) |
| `pause`    | 当扫描暂停或恢复时触发                   | `e`：布尔值，表示是否暂停     |

## 属性 (Props)

| 属性名       | 类型    | 默认值  | 说明                                                                                                                               |
| :----------- | :------ | :------ | :--------------------------------------------------------------------------------------------------------------------------------- |
| `type`       | String  | `'p'`   | 组件类型，影响样式主题。可选值：`'info'`, `'primary'`, `'error'`, `'warning'`, `'success'`。                                       |
| `mode`       | String  | `'qr'`  | 扫描模式。可选值：`'qr'`（二维码），`'bar'`（条形码）。                                                                             |
| `rectColor`  | String  | `''`    | 矩形框颜色。默认为空，使用 `type` 对应的颜色。                                                                                     |
| `lineColor`  | String  | `''`    | 线条颜色。默认为空，使用 `type` 对应的颜色。                                                                                       |
| `lineHeight` | Number  | `2`     | 扫描线的高度（单位：像素）。                                                                                                       |
| `mask`       | Boolean | `true`  | 是否显示遮罩层。默认显示，可以增强扫描区域聚焦效果。                                                                               |
| `welcome`    | String  | `欢迎使用Tui` | 欢迎文本，在扫描暂停时显示。                                                                                                     |
| `isPreviewing` | Boolean | `true`  | 是否开启预览模式。默认开启，显示扫描框和动画；关闭后仅显示摄像头画面。                                                               |

> **注意**: 组件本身继承自 `TuiMixin`，因此也具备 `TuiMixin` 提供的通用属性，如 `size`, `disabled`, `stop`, `hover`, `path`, `mainClass`, `nativeClass`, `effect` 等。请参考 TUI 文档了解这些通用属性的具体用法。

## 方法

| 方法名       | 说明                                     | 参数 | 返回值 |
| :----------- | :--------------------------------------- | :--- | :----- |
| `rescan`     | 手动触发重新扫描。                       | 无   | 无     |
| `scanImage`  | 手动触发从本地选择图片进行扫描。         | 无   | 无     |

## 插槽

| 插槽名     | 说明                                                         |
| :--------- | :----------------------------------------------------------- |
| `default`  | 默认插槽，可用于自定义扫描界面的布局和内容。如果使用插槽，建议设置 `mask="false"` 和 `isPreviewing="false"` 以避免冲突。 |

## 注意事项

1.  **插槽使用**: 如果通过插槽自定义了扫描布局，请确保将 `mask` 属性设置为 `false`，并将 `isPreviewing` 设置为 `false`，以避免默认的扫描框和遮罩层与自定义内容冲突。
2.  **图片扫描**: `scanImage` 方法在不同平台实现不同。在微信小程序中直接调用特定方法，在其他平台则通过 `uni.chooseImage` 选择图片后传递路径。
3.  **动画控制**: 组件内部使用了 `TuiRequestAnimationFrame` 和 `TuiCancelAnimationFrame` 来控制扫描线的动画，确保在组件销毁时正确取消动画任务（已在 `mounted` 钩子中处理）。
4.  **依赖**: 此组件依赖于 `@uni_modules/tui-plugins` 和 `@uni_modules/tui-plus-v3` 中的特定模块，请确保项目中已正确安装和引入这些依赖。

## 相关链接

*   **TUI 扫码组件文档**: [https://life.yundie.xyz/tui3.0/docs/component/t-scan.html](https://life.yundie.xyz/tui3.0/docs/component/t-scan.html)
*   **示例页面**: /pagesA/native/scan/scan
