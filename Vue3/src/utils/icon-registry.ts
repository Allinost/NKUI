const iconRegistry = new Map<string, string>()

export function addIcon(name: string, svg: string) {
  iconRegistry.set(name, svg)
}

export function getIcon(name: string): string | undefined {
  return iconRegistry.get(name)
}
