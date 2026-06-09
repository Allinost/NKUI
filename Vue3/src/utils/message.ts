import { createApp } from 'vue'
import ToastComp from '../components/Toast.vue'

type MessageType = 'info' | 'success' | 'warning' | 'error' | 'loading' | 'text'

interface MessageOptions {
  content: string
  type?: MessageType
  duration?: number
  closable?: boolean
  onClose?: () => void
}

type MessageFn = (options: string | MessageOptions) => () => void

interface ToastEntry {
  id: number
  close: () => void
}

let activeToasts: ToastEntry[] = []
let nextId = 0
const TOAST_GAP = 12
const TOAST_HEIGHT = 48

function removeToast(id: number) {
  activeToasts = activeToasts.filter(t => t.id !== id)
}

function createMessage(type: MessageType): MessageFn {
  return (options: string | MessageOptions) => {
    const opts = typeof options === 'string' ? { content: options, type } : { ...options, type: options.type || type }
    return showMessage(opts)
  }
}

function showMessage(options: MessageOptions): () => void {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const id = ++nextId
  const idx = activeToasts.length
  const topOffset = 32 + idx * (TOAST_HEIGHT + TOAST_GAP)

  const app = createApp(ToastComp, {
    message: options.content,
    type: options.type || 'info',
    duration: options.duration ?? 3000,
    position: 'top' as const,
    top: topOffset,
    onClose: () => {
      options.onClose?.()
      removeToast(id)
      setTimeout(() => {
        app.unmount()
        document.body.removeChild(container)
      }, 300)
    },
  })

  app.mount(container)

  const entry: ToastEntry = { id, close: () => { removeToast(id); app.unmount(); document.body.removeChild(container) } }
  activeToasts.push(entry)

  return () => entry.close()
}

export const NKMessage = {
  info: createMessage('info'),
  success: createMessage('success'),
  warning: createMessage('warning'),
  error: createMessage('error'),
  loading: createMessage('loading'),
}

export function showToast(options: string | MessageOptions) {
  const opts = typeof options === 'string' ? { content: options, type: 'info' as MessageType } : options
  return showMessage(opts)
}
