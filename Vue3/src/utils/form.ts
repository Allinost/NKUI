import type { InjectionKey } from 'vue'

export type FormValidatorResult = string | true | false | null | undefined

export interface FormRule {
  required?: boolean
  message?: string
  min?: number
  max?: number
  pattern?: RegExp
  validator?: (value: any, model: Record<string, any>) => FormValidatorResult
}

export type FormRules = Record<string, FormRule | FormRule[]>

export interface NkFormContext {
  model: Record<string, any>
  rules: FormRules
  labelWidth: string
  labelPosition: 'top' | 'left'
  errors: Record<string, string>
  validateField: (prop: string) => Promise<boolean>
}

export const NK_FORM_KEY: InjectionKey<NkFormContext> = Symbol('nk-form')

export function getByPath(obj: Record<string, any>, path: string): any {
  return path.split('.').reduce((o, key) => (o == null ? undefined : o[key]), obj as any)
}

export function setByPath(obj: Record<string, any>, path: string, value: any) {
  const keys = path.split('.')
  let target: Record<string, any> = obj
  keys.slice(0, -1).forEach((key) => {
    if (target[key] == null || typeof target[key] !== 'object') target[key] = {}
    target = target[key]
  })
  target[keys[keys.length - 1]] = value
}

export function isEmptyValue(value: any): boolean {
  if (value === undefined || value === null) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  return false
}

/** 按规则依次校验，返回第一条错误信息；全部通过返回空字符串 */
export function runRules(value: any, rules: FormRule[], model: Record<string, any>): string {
  for (const rule of rules) {
    if (isEmptyValue(value)) {
      if (rule.required) return rule.message || '该字段为必填项'
      continue
    }
    if (typeof value === 'string') {
      if (rule.min !== undefined && value.length < rule.min) {
        return rule.message || `长度不能少于 ${rule.min} 个字符`
      }
      if (rule.max !== undefined && value.length > rule.max) {
        return rule.message || `长度不能超过 ${rule.max} 个字符`
      }
    }
    if (rule.pattern && !rule.pattern.test(String(value))) {
      return rule.message || '格式不正确'
    }
    if (rule.validator) {
      const result = rule.validator(value, model)
      if (typeof result === 'string') return result
      if (result === false) return rule.message || '校验未通过'
    }
  }
  return ''
}
