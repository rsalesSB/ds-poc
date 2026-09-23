<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginSchema } from '@/components/ui/login-schema'

const emit = defineEmits<{
  submit: [values: { email: string, password: string, rememberMe: boolean }]
}>()

const validationSchema = toTypedSchema(loginSchema)

function onSubmit(values: Record<string, unknown>) {
  emit('submit', values as { email: string, password: string, rememberMe: boolean })
}
</script>

<template>
  <Form
    v-slot="{ handleSubmit }"
    :validation-schema="validationSchema"
    :initial-values="{ rememberMe: false }"
    as=""
  >
    <form novalidate class="flex w-72 flex-col gap-4" @submit="handleSubmit($event, onSubmit)">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" placeholder="you@example.com" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="••••••••" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ value, handleChange }" name="rememberMe">
        <FormItem>
          <label class="flex items-center gap-2 text-base text-neutral-900">
            <Checkbox :model-value="value" @update:model-value="handleChange" />
            Remember me
          </label>
        </FormItem>
      </FormField>

      <Button type="submit" variant="primary" size="md">Sign in</Button>
    </form>
  </Form>
</template>
