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
  DatePickerAnchor,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerField,
  DatePickerInput,
  DatePickerRoot,
  DatePickerTrigger,
} from 'reka-ui'
// Note: unlike Popover/Dialog/Tooltip, reka-ui has no DatePickerPortal —
// DatePickerContent renders without a separate portal wrapper (confirmed by
// checking reka-ui's actual runtime exports: DatePickerPortal is undefined
// there, even though every other DatePicker* name is a real component).
import { calendarCellTriggerVariants, calendarNavButtonVariants } from './calendar.variants'

interface Props {
  modelValue?: DateValue
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: DateValue]
}>()
</script>

<template>
  <DatePickerRoot
    :model-value="modelValue"
    @update:model-value="(value) => value && emit('update:modelValue', value)"
  >
    <DatePickerAnchor
      class="flex h-10 w-fit items-center gap-1 rounded-md border border-neutral-300 bg-neutral-100 px-3 text-base text-neutral-900 focus-within:ring-2 focus-within:ring-brand-600"
    >
      <DatePickerField v-slot="{ segments }">
        <template v-for="segment in segments" :key="segment.part">
          <div
            v-if="segment.part === 'literal'"
            class="text-neutral-900/50"
          >
            {{ segment.value }}
          </div>
          <DatePickerInput
            v-else
            :part="segment.part"
            class="rounded-sm px-0.5 tabular-nums focus:bg-brand-600 focus:text-neutral-100 focus:outline-none data-[placeholder]:text-neutral-900/50"
          >
            {{ segment.value }}
          </DatePickerInput>
        </template>
      </DatePickerField>
      <DatePickerTrigger class="ml-1 text-neutral-900/60 hover:text-neutral-900" aria-label="Open calendar">
        <svg viewBox="0 0 16 16" fill="none" class="size-4" aria-hidden="true">
          <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.3" />
          <path d="M2 6.5H14M5 1.5V3.5M11 1.5V3.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
        </svg>
      </DatePickerTrigger>
    </DatePickerAnchor>

      <DatePickerContent :side-offset="4" class="z-50 rounded-md border border-neutral-300 bg-neutral-100 p-3 shadow-md">
        <DatePickerCalendar v-slot="{ grid, weekDays }">
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
        </DatePickerCalendar>
      </DatePickerContent>
  </DatePickerRoot>
</template>
