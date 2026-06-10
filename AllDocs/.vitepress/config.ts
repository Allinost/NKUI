import { defineConfig } from 'vitepress'
import { resolve } from 'path'

export default defineConfig({
  title: 'NKUI',
  description: 'Cross-platform UI Framework with Unified Design System',
  lang: 'zh-CN',
  base: '/',
  srcExclude: [],
  vite: {
    resolve: {
      alias: {
        '@': resolve(__dirname, '../../Vue3/src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
      silenceDeprecations: ['legacy-js-api'],
      additionalData: `@use "sass:map";\n@use "sass:color";\n@use "sass:list";\n@use "@/styles/tokens" as *;\n`,
        },
      },
    },
  },
  themeConfig: {
    logo: '/nkui-logo.svg',
    siteTitle: 'NKUI',
    nav: [
      { text: '指南', link: '/guide/getting-started', activeMatch: '/guide/' },
      { text: '组件', link: '/components/button', activeMatch: '/components/' },
      { text: '平台', link: '/platform/vue3', activeMatch: '/platform/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '设计语言', link: '/guide/design-tokens' },
          ],
        },
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Icon 图标', link: '/components/icon' },
            { text: 'Tag 标签', link: '/components/tag' },
            { text: 'Badge 徽标', link: '/components/badge' },
            { text: 'Loading 加载', link: '/components/loading' },
          ],
        },
        {
          text: '表单组件',
          items: [
            { text: 'Input 输入框', link: '/components/input' },
            { text: 'Switch 开关', link: '/components/switch' },
            { text: 'Checkbox 复选框', link: '/components/checkbox' },
            { text: 'Radio 单选框', link: '/components/radio' },
            { text: 'Select 选择器', link: '/components/select' },
          ],
        },
        {
          text: '展示组件',
          items: [
            { text: 'Avatar 头像', link: '/components/avatar' },
            { text: 'Card 卡片', link: '/components/card' },
            { text: 'Divider 分割线', link: '/components/divider' },
            { text: 'Space 间距', link: '/components/space' },
            { text: 'Grid 栅格', link: '/components/grid' },
            { text: 'Progress 进度条', link: '/components/progress' },
            { text: 'Skeleton 骨架屏', link: '/components/skeleton' },
            { text: 'Empty 空状态', link: '/components/empty' },
          ],
        },
        {
          text: '导航组件',
          items: [
            { text: 'Tabs 标签页', link: '/components/tabs' },
            { text: 'Breadcrumb 面包屑', link: '/components/breadcrumb' },
            { text: 'Pagination 分页', link: '/components/pagination' },
          ],
        },
        {
          text: '业务组件',
          items: [
            { text: 'ProfileCard 名片卡', link: '/components/profile-card' },
            { text: 'TopNav 顶部导航', link: '/components/top-nav' },
            { text: 'BottomTab 底部Tab', link: '/components/bottom-tab' },
            { text: 'Calendar 日历', link: '/components/calendar' },
          ],
        },
        {
          text: '上传组件',
          items: [
            { text: 'FileUpload 文件上传', link: '/components/file-upload' },
            { text: 'ImageUpload 图片上传', link: '/components/image-upload' },
          ],
        },
        {
          text: '媒体组件',
          items: [
            { text: 'VideoPlayer 视频播放', link: '/components/video-player' },
            { text: 'ImageGallery 图片画廊', link: '/components/image-gallery' },
          { text: 'Weather 天气', link: '/components/weather' },
          { text: 'ImageCarousel 图片轮播', link: '/components/image-carousel' },
          { text: 'MusicPlayer 音乐播放', link: '/components/music-player' },
        ],
      },
      {
        text: '文档组件',
        items: [
          { text: 'PdfViewer PDF阅读', link: '/components/pdf-viewer' },
          { text: 'MarkdownViewer Markdown阅读', link: '/components/markdown-viewer' },
        ],
      },
        {
          text: '反馈组件',
          items: [
            { text: 'Dialog 对话框', link: '/components/dialog' },
            { text: 'Drawer 抽屉', link: '/components/drawer' },
            { text: 'Toast 消息提示', link: '/components/toast' },
            { text: 'Tooltip 文字提示', link: '/components/tooltip' },
            { text: 'Popover 弹出框', link: '/components/popover' },
          ],
        },
      ],
      '/platform/': [
        {
          text: '平台接入',
          items: [
            { text: 'Vue3', link: '/platform/vue3' },
            { text: '微信小程序', link: '/platform/miniprogram' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Allinost/NKUI' },
    ],
    footer: {
      message: 'Apache-2.0 License',
      copyright: 'Copyright 2026 NKUI',
    },
  },
})
