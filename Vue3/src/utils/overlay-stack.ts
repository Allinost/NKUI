// 全局浮层栈：保证多层 Dialog/Drawer 叠加时，只有最上层响应 Esc 与 Tab，
// 并且页面滚动锁定在所有浮层关闭后才解除。
const stack: symbol[] = []
let previousOverflow = ''

export function pushOverlay(id: symbol) {
  stack.push(id)
  if (stack.length === 1 && typeof document !== 'undefined') {
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
}

export function popOverlay(id: symbol) {
  const index = stack.lastIndexOf(id)
  if (index >= 0) stack.splice(index, 1)
  if (stack.length === 0 && typeof document !== 'undefined') {
    document.body.style.overflow = previousOverflow
  }
}

export function isTopOverlay(id: symbol) {
  return stack.length > 0 && stack[stack.length - 1] === id
}
