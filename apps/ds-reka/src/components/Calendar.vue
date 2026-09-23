<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading,
  CalendarNext,
  CalendarPrev,
  CalendarRoot,
} from 'reka-ui'
import { calendarCellTriggerVariants, calendarNavButtonVariants } from './calendar.variants'

interface Props {
  modelValue?: DateValue
  locale?: string
}

withDefaults(defineProps<Props>(), {
  locale: 'en',
})

const emit = defineEmits<{
  'update:modelValue': [value: DateValue]
}>()
</script>

<template>
  <CalendarRoot
    v-slot="{ grid, weekDays }"
    :model-value="modelValue"
    :locale="locale"
    class="rounded-md border border-neutral-300 bg-neutral-100 p-3"
    @update:model-value="(value) => value && emit('update:modelValue', value)"
  >
    <CalendarHeader class="flex items-center justify-between">
      <CalendarPrev :class="calendarNavButtonVariants()">‹</CalendarPrev>
      <CalendarHeading class="text-base text-neutral-900" />
      <CalendarNext :class="calendarNavButtonVariants()">›</CalendarNext>
    </CalendarHeader>

    <CalendarGrid v-for="month in grid" :key="month.value.toString()" class="mt-4 w-full border-collapse">
      <CalendarGridHead>
        <CalendarGridRow class="flex">
          <CalendarHeadCell
            v-for="day in weekDays"
            :key="day"
            class="flex-1 text-base font-regular text-neutral-900/60"
          >
            {{ day }}
          </CalendarHeadCell>
        </CalendarGridRow>
      </CalendarGridHead>
      <CalendarGridBody>
        <CalendarGridRow v-for="(weekDates, index) in month.rows" :key="`week-${index}`" class="mt-2 flex w-full">
          <CalendarCell
            v-for="weekDate in weekDates"
            :key="weekDate.toString()"
            :date="weekDate"
            class="flex-1 p-0 text-center [&:has([data-selected])]:rounded-md [&:has([data-selected])]:bg-brand-600/10"
          >
            <CalendarCellTrigger :day="weekDate" :month="month.value" :class="calendarCellTriggerVariants()" />
          </CalendarCell>
        </CalendarGridRow>
      </CalendarGridBody>
    </CalendarGrid>
  </CalendarRoot>
</template>
