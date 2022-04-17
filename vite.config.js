import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path/posix'
import { visualizer } from 'rollup-plugin-visualizer'
import { viteMockServe } from 'vite-plugin-mock'
import viteCompression from 'vite-plugin-compression'
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig(({ command, mode }) => {
  const {
    VITE_APP_BASE_API,
    VITE_APP_PORT,
    VITE_APP_PROXY_DOMAIN,
    VITE_APP_PROXY_DOMAIN_REAL,
    VITE_APP_LEGACY
  } = loadEnv(mode, process.cwd())
  // const prodMock = true
  const lifecycle = process.env.npm_lifecycle_event

  return {
    base: VITE_APP_BASE_API,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@images': path.resolve(__dirname, 'src/assets/images'),
        path: 'path-browserify'
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      /**
       * Svg configuration
       * SVG配置
       */
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/icon/svg')],
        symbolId: 'icon-[dir]-[name]'
      }),
      /* Element plus reference on demand
       * 按需加载 Element plus
       * Note: Using these two plugins to load the home page of the development environment will take a long time!
       * 注意：使用这两个插件加载开发环境首页时间会比较长！
       */
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass'
          })
        ]
      }),
      /**
       * mock configuration
       * mock 配置
       */
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve',
        // prodEnabled: command !== 'serve' && prodMock,
        logger: true
        /**
         * Note: The mock data is packaged into the production environment for demonstration,
         * and should be used with caution in the formal environment
         * 注意: mock数据打包进生产环境用来演示, 正式环境中慎用
         */
        // injectCode: `
        //    import { createMoack } from '../mock/create_mock'
        //    createMoack()
        //  `
      }),
      /**
       * Gzip configuration
       * Gzip 配置
       */
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 1024 * 50,
        deleteOriginFile: false,
        algorithm: 'gzip',
        ext: '.gz'
      }),
      /**
       * Image Compression
       * 图片压缩
       */
      viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false
        },
        optipng: {
          optimizationLevel: 7
        },
        mozjpeg: {
          quality: 20
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4
        }
      }),
      /**
       * Legacy browser compatibility support for packaged files
       * 为打包后的文件提供传统浏览器兼容性支持
       */
      VITE_APP_LEGACY
        ? legacy({
            targets: ['ie >= 11'],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime']
          })
        : null,
      /**
       * Packaging Analysis
       * 打包分析 值为report的时候 会生成一个report.html的分析页面
       * 比如你输入 npm run build 那lifecycle值为 build
       */
      lifecycle === 'report'
        ? visualizer({ open: true, brotliSize: true, filename: 'report.html' })
        : null
    ],
    /**
     * Handling vite css charset warnings
     * https://github.com/vitejs/vite/issues/5833
     * 处理 vite css 字符集警告
     */
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              }
            }
          }
        ]
      }
    },
    /**
     * Precompiled
     * 预编译
     */
    optimizeDeps: {
      include: ['pinia', 'vue-i18n', 'element-plus']
    },
    build: {
      outDir: 'build',
      assetsDir: 'static',
      minify: 'terser',
      terserOptions: {
        compress: {
          /**
           * Remove console.log from production environment
           * 从生产环境中删除 console.log
           */
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash][extname]'
        }
      }
    },
    server: {
      port: VITE_APP_PORT,
      host: '0.0.0.0',
      open: false,
      cors: true,
      /**
       * Configure according to the actual situation
       * 根据实际情况进行配置
       */
      proxy: VITE_APP_PROXY_DOMAIN_REAL
        ? {
            [VITE_APP_PROXY_DOMAIN]: {
              target: VITE_APP_PROXY_DOMAIN_REAL,
              changeOrigin: true,
              /**
               * configure can customize some options, such as setting custom headers.
               * Note: The custom headers are not visible in the front-end request,
               * but the back-end can receive them.
               * configure可以自定义一些选项, 比如设置自定义headers. 注意: 前端请求里面看不见自定义设置的headers, 但是后端能接收到.
               *
               */
              configure: (proxy) => {
                proxy.on('proxyReq', (proxyReq) => {
                  proxyReq.setHeader('m-test', 'test')
                })
                proxy.on('proxyRes', () => {})
              },
              rewrite: (path) =>
                path.replace(
                  new RegExp(VITE_APP_PROXY_DOMAIN, 'g'),
                  VITE_APP_PROXY_DOMAIN
                )
            }
          }
        : null
    },
    define: {
      /**
       * Enable/disable intlify-devtools and vue-devtools support in production
       * 在生产中启用/禁用intlify-devtools和vue-devtools支持
       */
      __INTLIFY_PROD_DEVTOOLS__: false,
      'process.env': {
        APP_DOMAIN: VITE_APP_PROXY_DOMAIN_REAL
      }
    }
  }
})
