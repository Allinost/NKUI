export interface NkTableColumn {
  key: string
  title: string
  width?: number | string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  formatter?: (row: any) => string | number | null | undefined
}

export type NkTableSortOrder = 'asc' | 'desc'
