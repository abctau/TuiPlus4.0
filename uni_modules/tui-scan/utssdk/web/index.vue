<template>
	<view :id="id">

	</view>
</template>
<script lang="uts">
	import { ScanResult } from '../interface.uts'
	import { audio_data } from './index.uts'
	import './libs/zxing.js';
	export default {
		name: "tui-scan",
		emits: ['scanned', 'pause'],
		data() {
			return {
				id: `tui${Date.now().toString()}`,
				video: null as null | HTMLElement,
				stream: null as any,
				timer: 0,
				pause: false
			}
		},
		watch: {
			isPreviewing(e : boolean) {
				this.$nextTick(() => {
					if (e) {
						this.open()
					} else {
						this.close()
					}
				})
			}
		},
		mounted() {
			this.open()
		},
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
			isPreviewing: {
				type: Boolean,
				default: true
			}
		},
		unmounted() {
			this.close()
		},
		methods: {
			open() {
				this._crateCamera();
			},
			_crateCamera() {
				let t = this;
				t.close();
				let parentView = document.getElementById(t.id);
				let video : HTMLVideoElement = document.createElement("video");
				video.style.width = "100%";
				video.style.height = "100%";
				video.style.objectFit = "cover";
				parentView!.appendChild(video);
				t.video = video;
				const constraints = {
					audio: false,
					video: {
						facingMode: "environment",
						frameRate: 100,
						width: { ideal: 1920 },
						height: { ideal: 1080 }
					}
				};
				navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
					t.stream = mediaStream;
					video.srcObject = t.stream;
					video.onloadedmetadata = function (e) {
						video.play();
						t.take();
					};
				}).catch(function (err) {
					console.log(err.name + ": " + err.message);
					t.close();
				});

			},
			take() {
				let t = this;
				if (!t.video || !t.stream) return "";
				const canvas = document.createElement('canvas');
				canvas.width = t.video.videoWidth; // 设置canvas的宽度为视频的宽度
				canvas.height = t.video.videoHeight; // 设置canvas的高度为视频的高度
				const ctx = canvas.getContext('2d');
				ctx.drawImage(t.video, 0, 0, canvas.width, canvas.height);
				canvas.toBlob((blob) => {
					if (blob) {
						const videoBlobUrl = URL.createObjectURL(blob);
						t.scanImageByURI(videoBlobUrl);
					}
				}, 'image/png');
			},
			rescan() {
				if (this.pause) {
					this.video!.play();
					this.take()
					this.pause = false
					this.$emit('pause', false)
				}
			},
			scanImageByURI(urls : string) {
				const img = new Image() as HTMLImageElement
				img.src = urls;
				img.crossOrigin = 'Anonymous';
				img.onload = () => {
					const ZXing = (window as any).ZXing
					const codeReader = new ZXing.BrowserMultiFormatReader()
					codeReader.decodeFromImage(img).then((result) => {
						if (result.resultPoints.length > 2) {
							const center = this.calculateIntersection(result.resultPoints)
							const data = {
								data: [{
									position: {
										centerX: center.x,
										centerY: center.y
									},
									value: result.text
								}],
								img,
								scanMode: "image"
							} as ScanResult;
							this.$emit('scanned', data)
						} else if (result.resultPoints.length == 2) {
							const data = {
								data: [{
									position: {
										centerX: (result.resultPoints[1].x - result.resultPoints[0].x) / 2 + result.resultPoints[0].x,
										centerY: result.resultPoints[1].y
									},
									value: result.text
								}],
								img,
								scanMode: "image"
							} as ScanResult;
							this.$emit('scanned', data)
						}
						const audio = new Audio();
						audio.src = audio_data;
						audio.play();
						this.video!.pause();
						this.pause = true
						this.$emit('pause', true)
					}).catch((err) => {
						clearTimeout(this.timer)
						if (!this.pause) {
							this.timer = setTimeout(() => {
								this.take()
							}, 1000)
						}
					});

				}
			},
			calculateIntersection(pos) {
				function lineEquation(p1, p2) {
					const m = (p2.y - p1.y) / (p2.x - p1.x);
					const b = p1.y - m * p1.x;
					return { slope: m, intercept: b };
				}
				const line1 = lineEquation(pos[0], pos[2]);
				const line2 = lineEquation(pos[1], pos[3]);
				// 计算交点
				const x = (line2.intercept - line1.intercept) / (line1.slope - line2.slope);
				const y = line1.slope * x + line1.intercept;
				return { x, y };
			},
			close() {
				let t = this;
				if (t.video) {
					t.video?.pause()
					t.video = null;
				}
				if (t.stream) {
					t.stream.getTracks().forEach(function (track) {
						track.stop();
					});
					t.stream = null;
				}
			}
		}
	}
</script>