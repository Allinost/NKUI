<template>
  <div class="nk-calendar" :class="`nk-calendar--${size}`">
    <div class="nk-calendar__header">
      <button class="nk-calendar__arrow" @click="prevMonth"><Icon name="arrow-left" size="xs" /></button>
      <span class="nk-calendar__title">{{ year }}年{{ month + 1 }}月</span>
      <button class="nk-calendar__arrow" @click="nextMonth"><Icon name="arrow-right" size="xs" /></button>
    </div>
    <div class="nk-calendar__weekdays">
      <div v-for="d in weekDays" :key="d" class="nk-calendar__weekday">{{ d }}</div>
    </div>
    <div class="nk-calendar__grid">
      <div
        v-for="(day, idx) in days"
        :key="idx"
        class="nk-calendar__cell"
        :class="{
          'nk-calendar__cell--empty': !day,
          'nk-calendar__cell--today': day && isToday(day),
          'nk-calendar__cell--selected': day && isSelected(day),
          'nk-calendar__cell--disabled': day && isDisabled(day),
        }"
        @click="day && !isDisabled(day) && select(day)"
      >
        <span v-if="day" class="nk-calendar__day">{{ day.getDate() }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Icon from './Icon.vue'

defineOptions({ name: 'NkCalendar' })

const props = withDefaults(defineProps<{
  modelValue?: Date | string | null
  minDate?: Date | string | null
  maxDate?: Date | string | null
  firstDayOfWeek?: 0 | 1
  size?: 'sm' | 'md' | 'lg'
}>(), {
  modelValue: null,
  minDate: null,
  maxDate: null,
  firstDayOfWeek: 1,
  size: 'md',
})

const emit = defineEmits<{ 'update:modelValue': [value: Date | null]; change: [value: Date]; 'month-change': [value: { year: number; month: number }] }>()

const now = new Date()
const year = ref(now.getFullYear())
const month = ref(now.getMonth())

const weekDays = computed(() => {
  const days = ['日', '一', '二', '三', '四', '五', '六']
  if (props.firstDayOfWeek === 1) {
    const sun = days.shift()!
    days.push(sun)
  }
  return days
})

const days = computed(() => {
  const first = new Date(year.value, month.value, 1)
  const last = new Date(year.value, month.value + 1, 0)
  const startDay = first.getDay()
  const offset = props.firstDayOfWeek === 1 ? (startDay === 0 ? 6 : startDay - 1) : startDay

  const result: (Date | null)[] = []
  for (let i = 0; i < offset; i++) result.push(null)
  for (let d = 1; d <= last.getDate(); d++) result.push(new Date(year.value, month.value, d))
  while (result.length % 7 !== 0) result.push(null)
  return result
})

function isToday(d: Date) {
  const t = new Date()
  return d.getFullYear() === t.getFullYear() && d.getMonth() === t.getMonth() && d.getDate() === t.getDate()
}

function isSelected(d: Date) {
  if (!props.modelValue) return false
  const val = props.modelValue instanceof Date ? props.modelValue : new Date(props.modelValue)
  return d.getFullYear() === val.getFullYear() && d.getMonth() === val.getMonth() && d.getDate() === val.getDate()
}

function isDisabled(d: Date) {
  if (props.minDate && d < new Date(props.minDate)) return true
  if (props.maxDate && d > new Date(props.maxDate)) return true
  return false
}

function select(d: Date) {
  emit('update:modelValue', d)
  emit('change', d)
}

function prevMonth() {
  if (month.value === 0) { year.value--; month.value = 11 }
  else month.value--
  emit('month-change', { year: year.value, month: month.value })
}

function nextMonth() {
  if (month.value === 11) { year.value++; month.value = 0 }
  else month.value++
  emit('month-change', { year: year.value, month: month.value })
}

watch(() => props.modelValue, (val) => {
  if (val) {
    const d = val instanceof Date ? val : new Date(val)
    year.value = d.getFullYear()
    month.value = d.getMonth()
  }
})
</script>

<style lang="scss" scoped>
$sizes: (
  'sm': (cell: 28px, fs: $nk-font-size-xs, title: $nk-font-size-sm),
  'md': (cell: 36px, fs: $nk-font-size-sm, title: $nk-font-size-base),
  'lg': (cell: 44px, fs: $nk-font-size-base, title: $nk-font-size-lg),
);

.nk-calendar {
  display: inline-block;
  user-select: none;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $nk-spacing-md;
  }

  &__title {
    font-weight: $nk-font-weight-semibold;
    color: $nk-color-neutral-900;
  }

  &__arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid $nk-color-neutral-200;
    background: $nk-color-neutral-0;
    border-radius: $nk-radius-sm;
    cursor: pointer;
    transition: all $nk-duration-fast;
    color: $nk-color-neutral-600;

    &:hover { color: $nk-color-primary-500; border-color: $nk-color-primary-500; }
  }

  &--sm &__arrow { width: 24px; height: 24px; }
  &--md &__arrow { width: 28px; height: 28px; }
  &--lg &__arrow { width: 32px; height: 32px; }

  &__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 4px;
  }

  &__weekday {
    text-align: center;
    color: $nk-color-neutral-500;
    font-weight: $nk-font-weight-medium;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }

  &__cell {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: $nk-radius-sm;
    cursor: pointer;
    transition: all $nk-duration-fast;
    color: $nk-color-neutral-800;

    &:hover:not(&--empty):not(&--disabled):not(&--selected) {
      background: $nk-color-neutral-100;
    }

    &--empty { cursor: default; }

    &--today &__day {
      font-weight: $nk-font-weight-bold;
      color: $nk-color-primary-500;
    }

    &--selected {
      background: $nk-color-primary-500;
      color: #fff;
    }

    &--selected &__day { color: #fff; }

    &--disabled {
      opacity: $nk-opacity-disabled;
      cursor: not-allowed;
    }

    &--empty &__day { display: none; }
  }

  @each $size, $map in $sizes {
    &--#{$size} &__cell { width: map.get($map, cell); height: map.get($map, cell); font-size: map.get($map, fs); }
    &--#{$size} &__title { font-size: map.get($map, title); }
    &--#{$size} &__weekday { font-size: map.get($map, fs); padding: 4px 0; }
  }
}
</style>
