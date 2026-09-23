<script lang="ts" setup>
import type { LabelProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { useFormField } from './useFormField'

// No destructive token in the DS -> brand-700, same color used for the
// error <p> text in FormMessage and in ds-reka's LoginForm.
const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>()

const { error, formItemId } = useFormField()
</script>

<template>
  <Label
    data-slot="form-label"
    :data-error="!!error"
    :class="cn(
      'data-[error=true]:text-brand-700',
      props.class,
    )"
    :for="formItemId"
  >
    <slot />
  </Label>
</template>
