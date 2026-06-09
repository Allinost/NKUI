import type { App } from 'vue'
import NkButton from './Button.vue'
import NkInput from './Input.vue'
import NkIcon from './Icon.vue'
import { addIcon } from '../utils/icon-registry'

const icons: Record<string, string> = {
  close: '<svg viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>',
  check: '<svg viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg>',
  info: '<svg viewBox="0 0 16 16"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM7.5 6h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5zM8 4.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>',
  warning: '<svg viewBox="0 0 16 16"><path d="M7.938 2.016a.13.13 0 0 1 .124 0l6.857 11.857c.077.133-.019.287-.14.287H1.22c-.12 0-.216-.154-.14-.287L7.938 2.016zM8 5.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0V6a.5.5 0 0 0-.5-.5zM8 10.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg>',
  error: '<svg viewBox="0 0 16 16"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM5.854 5.146a.5.5 0 1 1 .708-.708L8 6.293l1.646-1.647a.5.5 0 1 1 .708.708L8.707 7l1.647 1.646a.5.5 0 1 1-.708.708L8 7.707l-1.646 1.647a.5.5 0 1 1-.708-.708L7.293 7 5.854 5.854z"/></svg>',
  success: '<svg viewBox="0 0 16 16"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm3.646 4.646-4 4a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 8.293l3.646-3.647a.5.5 0 0 1 .708.708z"/></svg>',
  'arrow-left': '<svg viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>',
  'arrow-right': '<svg viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>',
}

Object.entries(icons).forEach(([name, svg]) => addIcon(name, svg))

const components = [NkButton, NkInput, NkIcon]

export function install(app: App) {
  components.forEach(c => app.component(c.name ?? c.__name, c))
}

export { NkButton, NkInput, NkIcon, addIcon }
