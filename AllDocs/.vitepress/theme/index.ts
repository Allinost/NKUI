import DefaultTheme from 'vitepress/theme'
import type { App } from 'vue'

// Sync VitePress `.dark` class with NKUI's `data-theme` attribute
if (typeof window !== 'undefined') {
  const html = document.documentElement
  function syncTheme() {
    html.setAttribute('data-theme', html.classList.contains('dark') ? 'dark' : 'light')
  }
  syncTheme()
  new MutationObserver(syncTheme).observe(html, { attributes: true, attributeFilter: ['class'] })
}

import NkButton from '../../../Vue3/src/components/Button.vue'
import NkInput from '../../../Vue3/src/components/Input.vue'
import NkIcon from '../../../Vue3/src/components/Icon.vue'
import NkTag from '../../../Vue3/src/components/Tag.vue'
import NkBadge from '../../../Vue3/src/components/Badge.vue'
import NkLoading from '../../../Vue3/src/components/Loading.vue'
import NkSwitch from '../../../Vue3/src/components/Switch.vue'
import NkCheckbox from '../../../Vue3/src/components/Checkbox.vue'
import NkRadio from '../../../Vue3/src/components/Radio.vue'
import NkDivider from '../../../Vue3/src/components/Divider.vue'
import NkSpace from '../../../Vue3/src/components/Space.vue'
import NkAvatar from '../../../Vue3/src/components/Avatar.vue'
import NkCard from '../../../Vue3/src/components/Card.vue'
import NkEmpty from '../../../Vue3/src/components/Empty.vue'
import NkSkeleton from '../../../Vue3/src/components/Skeleton.vue'
import NkDialog from '../../../Vue3/src/components/Dialog.vue'
import NkDrawer from '../../../Vue3/src/components/Drawer.vue'
import NkSelect from '../../../Vue3/src/components/Select.vue'
import NkTooltip from '../../../Vue3/src/components/Tooltip.vue'
import NkPopover from '../../../Vue3/src/components/Popover.vue'
import NkTabs from '../../../Vue3/src/components/Tabs.vue'
import NkBreadcrumb from '../../../Vue3/src/components/Breadcrumb.vue'
import NkPagination from '../../../Vue3/src/components/Pagination.vue'
import NkRow from '../../../Vue3/src/components/Row.vue'
import NkCol from '../../../Vue3/src/components/Col.vue'
import NkProgress from '../../../Vue3/src/components/Progress.vue'
import NkProfileCard from '../../../Vue3/src/components/ProfileCard.vue'
import NkTopNav from '../../../Vue3/src/components/TopNav.vue'
import NkBottomTab from '../../../Vue3/src/components/BottomTab.vue'
import NkCalendar from '../../../Vue3/src/components/Calendar.vue'
import NkFileUpload from '../../../Vue3/src/components/FileUpload.vue'
import NkImageUpload from '../../../Vue3/src/components/ImageUpload.vue'
import { addIcon } from '../../../Vue3/src/utils/icon-registry'
import { NKMessage, showToast } from '../../../Vue3/src/utils/message'
import '../../../Vue3/src/styles/_theme.css'
import DemoBlock from './components/DemoBlock.vue'

const icons: Record<string, string> = {
  close: '<svg viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>',
  check: '<svg viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg>',
  info: '<svg viewBox="0 0 16 16"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM7.5 6h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5zM8 4.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>',
  warning: '<svg viewBox="0 0 16 16"><path d="M7.938 2.016a.13.13 0 0 1 .124 0l6.857 11.857c.077.133-.019.287-.14.287H1.22c-.12 0-.216-.154-.14-.287L7.938 2.016zM8 5.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0V6a.5.5 0 0 0-.5-.5zM8 10.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg>',
  error: '<svg viewBox="0 0 16 16"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM5.854 5.146a.5.5 0 1 1 .708-.708L8 6.293l1.646-1.647a.5.5 0 1 1 .708.708L8.707 7l1.647 1.646a.5.5 0 1 1-.708.708L8 7.707l-1.646 1.647a.5.5 0 1 1-.708-.708L7.293 7 5.854 5.854z"/></svg>',
  success: '<svg viewBox="0 0 16 16"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm3.646 4.646-4 4a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 8.293l3.646-3.647a.5.5 0 0 1 .708.708z"/></svg>',
  'arrow-left': '<svg viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>',
  'arrow-right': '<svg viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>',
  sun: '<svg viewBox="0 0 16 16"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/></svg>',
  moon: '<svg viewBox="0 0 16 16"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/></svg>',
  upload: '<svg viewBox="0 0 16 16"><path d="M8 1a1 1 0 0 1 1 1v6h3a1 1 0 0 1 .7 1.7l-4 4a1 1 0 0 1-1.4 0l-4-4A1 1 0 0 1 4 8h3V2a1 1 0 0 1 1-1z"/></svg>',
  file: '<svg viewBox="0 0 16 16"><path d="M4 1h5.5L13 4.5V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm6.5 4H10V2.5L10.5 5z"/></svg>',
  plus: '<svg viewBox="0 0 16 16"><path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2z"/></svg>',
  home: '<svg viewBox="0 0 16 16"><path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146z"/></svg>',
  search: '<svg viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>',
  user: '<svg viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/></svg>',
}
Object.entries(icons).forEach(([name, svg]) => addIcon(name, svg))

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    const componentMap: [any, string][] = [
      [NkButton, 'Button'], [NkInput, 'Input'], [NkIcon, 'Icon'],
      [NkTag, 'Tag'], [NkBadge, 'Badge'], [NkLoading, 'Loading'],
      [NkSwitch, 'Switch'], [NkCheckbox, 'Checkbox'], [NkRadio, 'Radio'],
      [NkDivider, 'Divider'], [NkSpace, 'Space'],
      [NkAvatar, 'Avatar'], [NkCard, 'Card'],
      [NkEmpty, 'Empty'], [NkSkeleton, 'Skeleton'],
      [NkDialog, 'Dialog'], [NkDrawer, 'Drawer'],
      [NkSelect, 'Select'], [NkTooltip, 'Tooltip'], [NkPopover, 'Popover'],
      [NkTabs, 'Tabs'], [NkBreadcrumb, 'Breadcrumb'], [NkPagination, 'Pagination'],
      [NkRow, 'Row'], [NkCol, 'Col'], [NkProgress, 'Progress'],
      [NkProfileCard, 'ProfileCard'], [NkTopNav, 'TopNav'], [NkBottomTab, 'BottomTab'],
      [NkCalendar, 'Calendar'], [NkFileUpload, 'FileUpload'], [NkImageUpload, 'ImageUpload'],
    ]
    componentMap.forEach(([comp, name]) => app.component(name, comp))
    app.component('Demo', DemoBlock)
    app.config.globalProperties.$NKMessage = NKMessage
    app.config.globalProperties.$showToast = showToast
  },
}
