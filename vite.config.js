import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
export default defineConfig({
	plugins: [
		uni(),
	],
	server: {
		port: 5178,
		proxy: {
			// 上海开发服务器
			"/sh-dashb-test-api": {
				target: 'http://xx:9080', // 目标服务  
				changeOrigin: true,
				rewrite: path => path.replace(/^\/sh-dashb-test-api/, ''),
			},
			// 默认代理正式服务器
			"/prod-api": {
				"target": "http://10.160.3.51:30002",
				"changeOrigin": true,
				"secure": true,
				rewrite: path => path.replace(/^\/prod-api/, ''),
			},

		}
	}
})