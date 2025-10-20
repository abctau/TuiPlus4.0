<template>
	<camera style="width100%;height:100%;" v-if="isPreviewing" mode="scanCode" device-positio="back" flash="auto"
		@scancode="scancodeEvt">
	</camera>
</template>
<script>
	import { ScanResult, audio_data } from './index.uts'
	export default {
		data() {
			return {
				uid: "tui" + Date.now(),
				uid2: "tui" + Date.now(),
				pause: false
			}
		},
		name: "tui-scan",
		emits: ['scanned', 'pause'],
		props: {
			isPreviewing: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			scancodeEvt(evt) {
				if (!this.pause) {
					const audioContext = wx.createInnerAudioContext();
					audioContext.src = audio_data;
					const qrdata = evt.detail.result;
					const data = {
						data: [{
							position: {
								centerX: 0,
								centerY: 0
							},
							value: qrdata
						}],
						img: '',
						scanMode: "image"
					}
					this.$emit('scanned', data)
					audioContext.play()
					this.$emit('pause', true)
					this.pause = true
				}
			},
			rescan() {
				this.pause = false
				this.$emit('pause', false)
			},
			scanImageByURI() {
				const audioContext = wx.createInnerAudioContext();
				audioContext.src = audio_data;
				wx.scanCode({
					onlyFromCamera: false,
					success: (res) => {
						if (res?.result) {
							const data = {
								data: [{
									position: {
										centerX: 0,
										centerY: 0
									},
									value: res?.result
								}],
								img: '',
								scanMode: "image"
							}
							this.$emit('scanned', data)
							audioContext.play()
							this.$emit('pause', true)
							this.pause = true
						}
					},
					fail(er) {
						console.error(er)
					}
				})
			}
		}
	}
</script>