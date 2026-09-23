<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { getLocalTimeZone } from '@internationalized/date'
import { useDateFormatter } from 'reka-ui'
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

// No `date-picker` shadcn-vue registry item exists (confirmed by inspecting
// https://shadcn-vue.com/r/index.json — 66 entries, no date-picker), so
// there is no `npx shadcn-vue add date-picker` and no raw-CLI commit for
// this component. Composed here from already-added Popover + Calendar +
// Button, following the community "date picker" recipe documented across
// the shadcn ecosystem — a Button showing the formatted date as its label,
// not a segmented text field like ds-reka's DateField-based version. That
// divergence is real, not an oversight: it's what the recipe actually is.

interface Props {
  modelValue?: DateValue
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Pick a date',
})

const emit = defineEmits<{
  'update:modelValue': [value: DateValue]
}>()

const formatter = useDateFormatter('en')

const label = computed(() =>
  props.modelValue ? formatter.custom(props.modelValue.toDate(getLocalTimeZone()), { dateStyle: 'long' }) : props.placeholder,
)
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="secondary" size="md" class="w-56 justify-start font-regular">
        {{ label }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar :model-value="modelValue" @update:model-value="(value) => value && emit('update:modelValue', value)" />
    </PopoverContent>
  </Popover>
</template>
