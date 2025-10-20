<template>
	<view>
	</view>
</template>

<script lang="uts">
	/**
	 * @name tui-scan
	 * @tutorial https://Tui.pages.dev/components/tui-scan
	 * @description  Scan Provider 扫码核心
	 * 
	 * 本组件是 Tui 扫码插件的核心部分，负责摄像头预览、扫码解析等基础工作，并向外部提供接口。
	 * 
	 * Tui 框架内置的 `tui-scan` 组件依赖此组件，故 HBuilderX 安装 Tui 插件时会自动安装此组件
	 * 
	 * 如果你不满意内置的 `tui-scan` 的界面，可以参考 `tui-scan` 组件，对本组件进行再封装
	 * @property {String} scanType=[qrCode|barCode|all]    String | 扫码类型
	 * @value qrCode 二维码 
	 * @value barCode 条形码
	 * @value all 二维码和条形码
	 * @property {Boolean} enableDing    Boolean | 是否开启声音提示
	 * @property {Boolean} enableZoom    Boolean | 是否允许缩放
	 * @property {Number} initZoomScale    Number | 初始缩放比例
	 * @property {String} cameraPermTip    String | 相机权限请求提示
	 * @event {Function} scanned   (res:ScanResult)=>void | 扫码成功时触发。`res`的结构及说明见[文档](https://Tui.pages.dev/components/tui-scan#%E7%B1%BB%E5%9E%8B)
	 */
	import { UTSAndroid } from "io.dcloud.uts";
	import Executors from "java.util.concurrent.Executors";
	import Color from "android.graphics.Color";
	import MediaPlayer from "android.media.MediaPlayer";
	import Uri from "android.net.Uri";
	import Build from "android.os.Build";
	import TextUtils from 'android.text.TextUtils';
	import GestureDetector from "android.view.GestureDetector";
	import ScaleGestureDetector from "android.view.ScaleGestureDetector";
	import MotionEvent from "android.view.MotionEvent";
	import WindowManager from "android.view.WindowManager";
	import Size from "android.util.Size";
	import PreviewView from 'androidx.camera.view.PreviewView';
	import ProcessCameraProvider from "androidx.camera.lifecycle.ProcessCameraProvider";
	import { Preview, Camera, CameraControl, CameraSelector, ImageAnalysis, ImageProxy } from 'androidx.camera.core';
	import FocusMeteringAction from "androidx.camera.core.FocusMeteringAction";
	import ContextCompat from "androidx.core.content.ContextCompat";
	import SurfaceOrientedMeteringPointFactory from "androidx.camera.core.SurfaceOrientedMeteringPointFactory";
	import LifecycleOwner from "androidx.lifecycle.LifecycleOwner";
	import ListenableFuture from "com.google.common.util.concurrent.ListenableFuture";
	import Barcode from "com.google.mlkit.vision.barcode.common.Barcode";
	import InputImage from "com.google.mlkit.vision.common.InputImage";
	import BarcodeScannerOptions from "com.google.mlkit.vision.barcode.BarcodeScannerOptions";
	import BarcodeScanning from "com.google.mlkit.vision.barcode.BarcodeScanning";
	import BarcodeScanner from "com.google.mlkit.vision.barcode.BarcodeScanner";
	import { ScanDataPosition, ScanData, ScanResult } from '../interface.uts'


	var camera = null as Camera | null
	var cameraProviderFuture = null as ListenableFuture<ProcessCameraProvider> | null
	var scaleGestureDetector = null as ScaleGestureDetector | null
	var gestureDetector = null as GestureDetector | null
	var scanned = false
	var options = null as BarcodeScannerOptions | null
	var viewId : Int = 0
	function randomId() : Int {
		let characters : string = '123456789';
		let charArray : string[] = characters.split('');
		let result = '';
		for (let i = 0; i < 10; i++) {
			let randomIndex = Math.floor(Math.random() * charArray.length);
			result += charArray[randomIndex];
		}
		return parseInt(result).toInt();
	}
	export default {
		name: "tui-scan",
		emits: ['scanned'],
		props: {
			scanType: {
				type: String,
				default: "all"
			},
			enableDing: {
				type: Boolean,
				default: true
			},
			enableZoom: {
				type: Boolean,
				default: true
			},
			initZoomScale: {
				type: Number,
				default: 0
			},
			cameraPermTip: {
				type: String,
				default: '\u3000 本应用正在请求您的相机权限，仅用于条码、二维码识别，且不会将任何数据上传至云端。如不提供此权限，则无法正常使用扫码功能。'
			}
		},
		watch: {
			"scanType": {
				handler(newValue : string, oldValue : string) {
					if (!TextUtils.isEmpty(newValue) && newValue != oldValue) {
						this.initScanType()
					}
				},
				immediate: false
			},
		},
		expose: ['setTorchStatus', 'scanImageByURI', 'rescan', 'setZoomRatio', 'getZoomRatio'],
		methods: {
			init() {
				let context = UTSAndroid.getAppContext()!
				cameraProviderFuture = ProcessCameraProvider.getInstance(context)
				let activity = UTSAndroid.getUniActivity()!

				let windowInfo = uni.getWindowInfo()
				let window = activity.getWindow()
				if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
					window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
				}

				cameraProviderFuture?.addListener(() => {
					let cameraProvider = cameraProviderFuture?.get()
					this.bindScan(cameraProvider!, windowInfo.windowWidth.toInt(), windowInfo.windowHeight.toInt(), 0)
				}, ContextCompat.getMainExecutor(activity))
			},
			setTorchStatus(status : boolean) {
				camera?.cameraControl?.enableTorch(status)
			},
			bindScan(cameraProvider : ProcessCameraProvider, width : Int, height : Int, delay : Number = 0) : void {
				cameraProvider.unbindAll()
				let activity = $androidContext!
				let preview : Preview = Preview.Builder().build()
				let previewView = UTSAndroid.getUniActivity()!.window.decorView.findViewById<PreviewView>(viewId)
				if (previewView != null) {
					preview.setSurfaceProvider(previewView.surfaceProvider)
					let cameraSelector : CameraSelector = CameraSelector.Builder().requireLensFacing(CameraSelector.LENS_FACING_BACK).build()
					//配置图片扫描
					let imageAnalysis = ImageAnalysis.Builder()
						.setTargetResolution(new Size(width, height))
						.setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
						.build()
					//将相机绑定到当前控件的生命周期
					camera = cameraProvider.bindToLifecycle(activity as LifecycleOwner, cameraSelector, imageAnalysis, preview)

					// 相机控制器
					let cameraControl = camera!.cameraControl

					//设置初始相机焦距
					let zoomRatio = (this.initZoomScale > 1 ? 1 : this.initZoomScale).toFloat()
					cameraControl.setLinearZoom(zoomRatio)

					imageAnalysis.setAnalyzer(Executors.newSingleThreadExecutor(), new SnScanAnalyser((barcodes : MutableList<Barcode>, imageWidth : Int, imageHeight : Int) => {
						let res = [] as ScanData[]
						for (let i = 0; i < barcodes.size; i++) {
							let code = barcodes[i as Int]
							let rawValue = code.rawValue
							let box = code.boundingBox!
							let windowHeight = uni.getWindowInfo().windowHeight
							let windowWidth = uni.getWindowInfo().windowWidth
							res.push({
								value: rawValue != null ? rawValue as string : '',
								position: {
									centerX: (box.centerX() as number) / (imageHeight as number) * windowWidth,
									centerY: (box.centerY() as number) / (imageWidth as number) * windowHeight
								} as ScanDataPosition,
							} as ScanData)
						}
						cameraProvider.unbindAll()
						this.$emit('scanned', { data: res, scanMode: 'camera' } as ScanResult)
						this.makeSound()
					}, () => { console.log('failed') }, () => { console.log('completed') }))
					setExposureCompensationIndex(camera!.cameraControl)
					if (this.enableZoom) {
						scaleGestureDetector = new ScaleGestureDetector(activity, new SnScanSimpleOnScaleGestureListener(cameraControl))
						gestureDetector = new GestureDetector(activity, new SnScanSimpleOnGestureListener(cameraControl))
					}
					previewView.setOnTouchListener((_ : any, event : MotionEvent) : boolean => {
						scaleGestureDetector?.onTouchEvent(event)
						gestureDetector?.onTouchEvent(event)
						return true
					})
				}

			},
			scanImageByURI(uri : string) {
				scanned = false

				let context = UTSAndroid.getAppContext()!
				try {
					let image = InputImage.fromFilePath(context, Uri.parse(uri))
					let detector = BarcodeScanning.getClient(options!)
					detector.process(image).addOnSuccessListener((barCodes : MutableList<Barcode>) => {
						if (barCodes.size > 0) {
							scanned = true
							detector.close()
							let res = [] as ScanData[]
							for (let i = 0; i < barCodes.size; i++) {
								let code = barCodes[i as Int]
								let rawValue = code.rawValue
								let box = code.boundingBox!
								let windowHeight = uni.getWindowInfo().windowHeight
								let windowWidth = uni.getWindowInfo().windowWidth
								let imageHeight = image.height
								let imageWidth = image.width
								res.push({
									value: rawValue != null ? rawValue as string : '',
									position: {
										centerX: (box.centerX() as number) / (imageWidth as number) * windowWidth,
										centerY: (box.centerY() as number) / (imageHeight as number) * windowHeight
									} as ScanDataPosition,
								} as ScanData)
							}
							let cameraProvider = cameraProviderFuture?.get()
							cameraProvider?.unbindAll()
							this.$emit('scanned', { data: res, scanMode: 'image' } as ScanResult)
							this.makeSound()
						} else {
							// this.$emit('scanned', { data: [] as ScanData[], scanMode: 'image' } as ScanResult)
						}
					}).addOnFailureListener((e : Exception) => {
						throw e
					})
				} catch (e : Error) {
					throw e
				}
			},
			makeSound() {
				if (this.enableDing) {
					let assetManager = UTSAndroid.getAppContext()!.getAssets();
					let afd = assetManager.openFd("ticking.mp3");
					let mediaPlayer = new MediaPlayer();
					mediaPlayer.setDataSource(afd.getFileDescriptor(), afd.getStartOffset(), afd.getLength());
					mediaPlayer.prepare();
					mediaPlayer.start();
				}
			},
			rescan() {
				let windowInfo = uni.getWindowInfo()
				scanned = false
				// 重新绑定相机
				cameraProviderFuture?.addListener(() => {
					let cameraProvider = cameraProviderFuture?.get()
					cameraProvider!.unbindAll()
					this.bindScan(cameraProvider!, windowInfo.windowWidth.toInt(), windowInfo.windowHeight.toInt(), 3000)
				}, ContextCompat.getMainExecutor(UTSAndroid.getUniActivity()!))
			},
			initScanType() {
				switch (this.scanType) {
					case 'qrcode':
						options = BarcodeScannerOptions.Builder().setBarcodeFormats(
							Barcode.FORMAT_QR_CODE
						).build()
						break
					case 'barcode':
						options = BarcodeScannerOptions.Builder().setBarcodeFormats(
							Barcode.FORMAT_AZTEC,
							Barcode.FORMAT_PDF417,
							Barcode.FORMAT_CODABAR,
							Barcode.FORMAT_CODE_39,
							Barcode.FORMAT_CODE_93,
							Barcode.FORMAT_CODE_128,
							Barcode.FORMAT_DATA_MATRIX,
							Barcode.FORMAT_EAN_8,
							Barcode.FORMAT_EAN_13,
							Barcode.FORMAT_ITF,
							Barcode.FORMAT_UPC_A,
							Barcode.FORMAT_UPC_E
						).build()
						break
					default:
						options = BarcodeScannerOptions.Builder().setBarcodeFormats(
							Barcode.FORMAT_QR_CODE,
							Barcode.FORMAT_AZTEC,
							Barcode.FORMAT_PDF417,
							Barcode.FORMAT_CODABAR,
							Barcode.FORMAT_CODE_39,
							Barcode.FORMAT_CODE_93,
							Barcode.FORMAT_CODE_128,
							Barcode.FORMAT_DATA_MATRIX,
							Barcode.FORMAT_EAN_8,
							Barcode.FORMAT_EAN_13,
							Barcode.FORMAT_ITF,
							Barcode.FORMAT_UPC_A,
							Barcode.FORMAT_UPC_E,
							Barcode.FORMAT_UNKNOWN,
							Barcode.FORMAT_ALL_FORMATS
						).build()
						break
				}
			},
			setZoomRatio(zoomRatio : number) {
				camera!.cameraControl.setZoomRatio(zoomRatio.toFloat())
			},
			getZoomRatio() : number | null {
				return camera!.cameraInfo.zoomState.value?.zoomRatio
			}
		},
		/**
		 * [可选实现] 对应平台的view载体即将被创建，对应前端beforeMount
		 */
		NVBeforeLoad() {
			cameraProviderFuture = null
			scanned = false
			viewId = randomId() as Int
		},
		/**
		 * [必须实现] 创建原生View，必须定义返回值类型
		 * 开发者需要重点实现这个函数，声明原生组件被创建出来的过程，以及最终生成的原生组件类型
		 * （Android需要明确知道View类型，需特殊校验）
		 */
		NVLoad() : PreviewView {
			let preview = new PreviewView($androidContext!);
			preview.setId(viewId);
			return preview;
		},
		/**
		 * [可选实现] 原生View已创建
		 */
		NVLoaded() {

		},
		/**
		 * [可选实现] 原生View布局完成
		 */
		NVLayouted() {
			this.initScanType()
			let permissions = ['android.permission.CAMERA']
			let granted = UTSAndroid.checkSystemPermissionGranted(UTSAndroid.getUniActivity()!, permissions)
			if (!granted) {
				uni.showModal({
					title: '提示',
					content: this.cameraPermTip,
					confirmText: '去授权',
					cancelText: '返回',
					success: (res) => {
						if (res.confirm) {
							UTSAndroid.requestSystemPermission(UTSAndroid.getUniActivity()!, permissions, function (_ : boolean, _ : string[]) {
								this.init()
							}, function (_ : boolean, _ : string[]) {
								uni.navigateBack({
									animationType: 'none',
									animationDuration: 0
								})
								UTSAndroid.gotoSystemPermissionActivity(UTSAndroid.getUniActivity()!, permissions)
							})
						} else {
							uni.navigateBack()
						}
					}
				})
			} else {
				this.init()
			}
		},
		/**
		 * [可选实现] 自定组件布局尺寸，用于告诉排版系统，组件自身需要的宽高
		 * 一般情况下，组件的宽高应该是由终端系统的排版引擎决定，组件开发者不需要实现此函数
		 * 但是部分场景下，组件开发者需要自己维护宽高，则需要开发者重写此函数
		 */
		NVMeasure(size : UTSSize) : UTSSize {
			return size;
		},
		unmounted() {
			cameraProviderFuture?.addListener(() => {
				let cameraProvider = cameraProviderFuture?.get()
				cameraProvider!.unbindAll()
			}, ContextCompat.getMainExecutor(UTSAndroid.getUniActivity()!))
		},
	}

	function setExposureCompensationIndex(cameraControl : CameraControl) {
		cameraControl.setExposureCompensationIndex(-1)
	}

	class SnScanSimpleOnScaleGestureListener extends ScaleGestureDetector.SimpleOnScaleGestureListener {
		public cameraControl : CameraControl;

		constructor(cameraControl : CameraControl) {
			super()
			this.cameraControl = cameraControl
		}

		override onScale(detector : ScaleGestureDetector) : Boolean {
			// 根据用户的手势调整焦距
			let zr = camera!.cameraInfo.zoomState.value?.zoomRatio
			let currentZoom = zr != null ? zr : 1.0.toFloat()
			let deltaZoom = detector.getScaleFactor()
			let newZoom = currentZoom * deltaZoom
			this.cameraControl.setZoomRatio(newZoom)
			return true
		}
	}

	class SnScanSimpleOnGestureListener extends GestureDetector.SimpleOnGestureListener {

		private cameraControl : CameraControl;

		constructor(cameraControl : CameraControl) {
			super()
			this.cameraControl = cameraControl
		}

		override onDoubleTap(e : MotionEvent) : Boolean {
			let previewView = UTSAndroid.getUniActivity()!.window.decorView.findViewById<PreviewView>(viewId)
			let factory = SurfaceOrientedMeteringPointFactory(
				previewView.width.toFloat(),
				previewView.height.toFloat()
			)
			let point = factory.createPoint(e.x, e.y)
			let action = FocusMeteringAction.Builder(point).build()
			this.cameraControl.startFocusAndMetering(action)
			// 获取当前焦距
			let zr = camera!.cameraInfo.zoomState.value?.zoomRatio
			let currentZoom = zr != null ? zr : 1.0.toFloat()
			// 如果焦距不为 1，则将焦距设置为 1
			if (currentZoom != 1.0.toFloat()) {
				cameraControl.setZoomRatio(1.0.toFloat())
			}
			return true
		}
	}

	class SnScanAnalyser extends ImageAnalysis.Analyzer {
		private success : (barcodes : MutableList<Barcode>, imageWidth : Int, imageHeight : Int) => void;
		private failure : () => void;
		private complete : () => void;
		private detector : BarcodeScanner

		constructor(success : (barcodes : MutableList<Barcode>, imageWidth : Int, imageHeight : Int) => void, failure : () => void, complete : () => void) {
			super()
			//配置当前扫码格式
			this.success = success
			this.failure = failure
			this.complete = complete
			this.detector = BarcodeScanning.getClient(options!)
		}

		override analyze(imageProxy : ImageProxy) {
			if (!scanned) {
				let mediaImage = imageProxy.image
				if (mediaImage == null) {
					imageProxy.close()
					return
				}

				let image = InputImage.fromMediaImage(mediaImage, imageProxy.imageInfo.rotationDegrees)

				this.detector.process(image).addOnSuccessListener((barCodes : MutableList<Barcode>) => {
					if (barCodes.size > 0) {
						this.success(barCodes, imageProxy.width, imageProxy.height)
						scanned = true
						this.detector.close()
					}
					imageProxy.close()
				}).addOnFailureListener((_ : Exception) => {
					this.failure()
					imageProxy.close()
				})

			}
		}
	}
</script>

<style>

</style>