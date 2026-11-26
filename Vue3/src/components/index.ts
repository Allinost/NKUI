import NkButton from './Button.vue'
import NkInput from './Input.vue'
import NkTextarea from './Textarea.vue'
import NkIcon from './Icon.vue'
import NkTag from './Tag.vue'
import NkBadge from './Badge.vue'
import NkLoading from './Loading.vue'
import NkSwitch from './Switch.vue'
import NkCheckbox from './Checkbox.vue'
import NkRadio from './Radio.vue'
import NkDivider from './Divider.vue'
import NkSpace from './Space.vue'
import NkAvatar from './Avatar.vue'
import NkCard from './Card.vue'
import NkEmpty from './Empty.vue'
import NkSkeleton from './Skeleton.vue'
import NkDialog from './Dialog.vue'
import NkDrawer from './Drawer.vue'
import NkSelect from './Select.vue'
import NkTooltip from './Tooltip.vue'
import NkPopover from './Popover.vue'
import NkTabs from './Tabs.vue'
import NkBreadcrumb from './Breadcrumb.vue'
import NkPagination from './Pagination.vue'
import NkRow from './Row.vue'
import NkCol from './Col.vue'
import NkProgress from './Progress.vue'
import NkProfileCard from './ProfileCard.vue'
import NkLogin from './Login.vue'
import NkRegister from './Register.vue'
import NkProfile from './Profile.vue'
import NkList from './List.vue'
import NkListItem from './ListItem.vue'
import NkProductCard from './ProductCard.vue'
import NkProductList from './ProductList.vue'
import NkTodoTask from './TodoTask.vue'
import NkTodoTaskList from './TodoTaskList.vue'
import NkTopNav from './TopNav.vue'
import NkBottomTab from './BottomTab.vue'
import NkCalendar from './Calendar.vue'
import NkFileUpload from './FileUpload.vue'
import NkImageUpload from './ImageUpload.vue'
import NkVideoPlayer from './VideoPlayer.vue'
import NkImageGallery from './ImageGallery.vue'
import NkWeather from './Weather.vue'
import NkImageCarousel from './ImageCarousel.vue'
import NkPdfViewer from './PdfViewer.vue'
import NkMarkdownViewer from './MarkdownViewer.vue'
import NkMusicPlayer from './MusicPlayer.vue'
import { addIcon } from '../utils/icon-registry'
import { NKMessage, showToast } from '../utils/message'

const icons: Record<string, string> = {
  star: '<svg viewBox="0 0 16 16"><path d="M8 1.5l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.3l-3.8 2 .7-4.3-3.1-3 4.3-.6L8 1.5z"/></svg>',
  layers: '<svg viewBox="0 0 16 16"><path d="M8 1l7 4-7 4-7-4 7-4zm0 1.7L3.4 5 8 7.3 12.6 5 8 2.7zM1 8l7 4 7-4 .9 1.5-7.9 4.5-7.9-4.5L1 8zm0 3l7 4 7-4 .9 1.5-7.9 4.5-7.9-4.5L1 11z"/></svg>',
  server: '<svg viewBox="0 0 16 16"><path d="M2 2h12v5H2V2zm1.5 1.5v2h2v-2h-2zM2 9h12v5H2V9zm1.5 1.5v2h2v-2h-2zM12 3.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm0 7a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5z"/></svg>',
  code: '<svg viewBox="0 0 16 16"><path d="M5.5 3L1 8l4.5 5 1.1-1-3.5-4 3.5-4L5.5 3zm5 0L9.4 4l3.5 4-3.5 4 1.1 1L15 8l-4.5-5z"/></svg>',
  database: '<svg viewBox="0 0 16 16"><path d="M8 1c3.3 0 6 .9 6 2v10c0 1.1-2.7 2-6 2s-6-.9-6-2V3c0-1.1 2.7-2 6-2zm0 1.5C5.2 2.5 3.5 3 3.5 3s1.7.5 4.5.5S12.5 3 12.5 3 10.8 2.5 8 2.5zM3.5 5v2.2c.8.3 2.4.8 4.5.8s3.7-.5 4.5-.8V5c-1 .4-2.6.7-4.5.7S4.5 5.4 3.5 5zm0 4v2.2c.8.3 2.4.8 4.5.8s3.7-.5 4.5-.8V9c-1 .4-2.6.7-4.5.7S4.5 9.4 3.5 9z"/></svg>',
  tools: '<svg viewBox="0 0 16 16"><path d="M10.5 1a4.5 4.5 0 0 0-4.3 5.8L1.2 11.8a1.5 1.5 0 0 0 0 2.1l.9.9a1.5 1.5 0 0 0 2.1 0l5-5A4.5 4.5 0 1 0 10.5 1zm0 1.5a3 3 0 0 1 1.9 5.3l-.5.4.2.6a3 3 0 0 1-4.1 3.5l-.6-.2-.4.4-5 5a.5.5 0 0 1-.7 0l-.9-.9a.5.5 0 0 1 0-.7l5-5 .4-.4-.2-.6A3 3 0 0 1 10.5 2.5z"/></svg>',
  grid: '<svg viewBox="0 0 16 16"><path d="M2 2h5v5H2V2zm1.5 1.5v2h2v-2h-2zM9 2h5v5H9V2zm1.5 1.5v2h2v-2h-2zM2 9h5v5H2V9zm1.5 1.5v2h2v-2h-2zM9 9h5v5H9V9zm1.5 1.5v2h2v-2h-2z"/></svg>',
  settings: '<svg viewBox="0 0 16 16"><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM8 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/><path d="M6.8 1h2.4l.4 1.6 1.2.7 1.6-.5 1.2 2.1-1.2 1.2v1.4l1.2 1.2-1.2 2.1-1.6-.5-1.2.7-.4 1.6H6.8l-.4-1.6-1.2-.7-1.6.5-1.2-2.1 1.2-1.2V5.3L2.4 4.1 3.6 2l1.6.5 1.2-.7L6.8 1z"/></svg>',
  bell: '<svg viewBox="0 0 16 16"><path d="M8 1a5 5 0 0 0-5 5v3l-1 2h12l-1-2V6a5 5 0 0 0-5-5zM6.5 13a1.5 1.5 0 0 0 3 0h-3z"/></svg>',
  chart: '<svg viewBox="0 0 16 16"><path d="M2 10h2v4H2v-4zm3.3-3h2v7h-2V7zm3.4-4h2v11h-2V3zM12 6h2v8h-2V6z"/></svg>',
  link: '<svg viewBox="0 0 16 16"><path d="M6.5 3A3.5 3.5 0 0 0 3 6.5c0 .6.2 1.2.4 1.7l1.1-1.1a2 2 0 0 1-.5-1.3A2.5 2.5 0 0 1 6.5 4H8V3H6.5zm3 0H8v1h1.5A2.5 2.5 0 0 1 12 6.5c0 .5-.2 1-.5 1.3l1.1 1.1c.3-.5.4-1.1.4-1.7A3.5 3.5 0 0 0 9.5 3zM5 7l-1 1 2 2 1-1-2-2zm4 0-2 2 1 1 2-2-1-1zm-3 3-1 1 1 1 1-1-1-1z"/></svg>',
  clock: '<svg viewBox="0 0 16 16"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 1.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zM7.5 4v4.5l3 1.5.7-1.3-2.2-1.1V4h-1.5z"/></svg>',
  shield: '<svg viewBox="0 0 16 16"><path d="M8 1l6 2v5c0 3.5-2.5 6-6 7-3.5-1-6-3.5-6-7V3l6-2zm0 1.6L3.5 4v4c0 2.5 1.7 4.5 4.5 5.4 2.8-.9 4.5-2.9 4.5-5.4V4L8 2.6z"/></svg>',
  box: '<svg viewBox="0 0 16 16"><path d="M8 1l6 3v8l-6 3-6-3V4l6-3zm0 1.7L3.7 4.6 8 6.5l4.3-1.9L8 2.7zM3 5.6v5.6l4 2V7.6l-4-2zm10 0-4 2v5.6l4-2V5.6z"/></svg>',
  cloud: '<svg viewBox="0 0 16 16"><path d="M4.5 13a3.5 3.5 0 0 1-.4-7A4.5 4.5 0 0 1 12.8 7 3 3 0 0 1 12 13H4.5zm0-1.5H12a1.5 1.5 0 0 0 .1-3l-.8-.1.1-.8a3 3 0 0 0-5.8-.8l-.2.7-.7.1A2 2 0 0 0 4.5 11.5z"/></svg>',
  folder: '<svg viewBox="0 0 16 16"><path d="M2 3h4l1.5 2H14v8H2V3zm1.5 3v5h9V6.5h-3.8L7.2 4.5H3.5z"/></svg>',
  image: '<svg viewBox="0 0 16 16"><path d="M2 3h12v10H2V3zm1.5 1.5v7h9v-7h-9zm1.5 1h2v2H5V5.5zm3 3.5l1.5-2 1.5 2 1.5-1 1 1.5H5l2.5-2.5z"/></svg>',
  camera: '<svg viewBox="0 0 16 16"><path d="M5 3l1-1h4l1 1h2.5A1.5 1.5 0 0 1 15 4.5v8A1.5 1.5 0 0 1 13.5 14h-11A1.5 1.5 0 0 1 1 12.5v-8A1.5 1.5 0 0 1 2.5 3H5zm3 2.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm0 1.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/></svg>',
  tag: '<svg viewBox="0 0 16 16"><path d="M2 2h6l6 6-6 6-6-6V2zm2 2v3l4 4 4-4-4-4H4zm1.5 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>',
  refresh: '<svg viewBox="0 0 16 16"><path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9l1.1-1.1V7H9l1.5-1.5A4 4 0 1 0 12 8h1.5z"/></svg>',
  menu: '<svg viewBox="0 0 16 16"><path d="M2 3.5h12v1.5H2zM2 7.25h12v1.5H2zM2 11h12v1.5H2z"/></svg>',
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

const components = [
  NkButton, NkInput, NkTextarea, NkIcon, NkTag, NkBadge, NkLoading,
  NkSwitch, NkCheckbox, NkRadio,
  NkDivider, NkSpace, NkAvatar, NkCard, NkEmpty, NkSkeleton,
  NkDialog, NkDrawer, NkSelect, NkTooltip, NkPopover,
  NkTabs, NkBreadcrumb, NkPagination,
  NkRow, NkCol, NkProgress,
  NkProfileCard, NkLogin, NkRegister, NkProfile, NkList, NkListItem,
  NkTopNav, NkBottomTab, NkCalendar, NkFileUpload, NkImageUpload,
  NkVideoPlayer, NkImageGallery, NkWeather,
  NkImageCarousel,   NkPdfViewer, NkMarkdownViewer, NkMusicPlayer,
  NkProductCard, NkProductList,
  NkTodoTask, NkTodoTaskList,
]

type AppLike = {
  component: (name: string, component: any) => any
}

export function install(app: AppLike) {
  components.forEach(c => {
    const name = c.name ?? c.__name
    if (name) app.component(name, c)
  })
}

export {
  NkButton, NkInput, NkTextarea, NkIcon, NkTag, NkBadge, NkLoading,
  NkSwitch, NkCheckbox, NkRadio,
  NkDivider, NkSpace, NkAvatar, NkCard, NkEmpty, NkSkeleton,
  NkDialog, NkDrawer, NkSelect, NkTooltip, NkPopover,
  NkTabs, NkBreadcrumb, NkPagination,
  NkRow, NkCol, NkProgress,
  NkProfileCard, NkLogin, NkRegister, NkProfile, NkList, NkListItem,
  NkTopNav, NkBottomTab, NkCalendar, NkFileUpload, NkImageUpload,
  NkVideoPlayer, NkImageGallery, NkWeather,
  NkImageCarousel, NkPdfViewer, NkMarkdownViewer, NkMusicPlayer,
  NkProductCard, NkProductList,
  NkTodoTask, NkTodoTaskList,
  addIcon, NKMessage, showToast,
}
