<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import Button from './Button.vue'
import Checkbox from './Checkbox.vue'
import Input from './Input.vue'
import { loginSchema } from './login-schema'

const emit = defineEmits<{
  submit: [values: { email: string, password: string, rememberMe: boolean }]
}>()

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: toTypedSchema(loginSchema),
  initialValues: { rememberMe: false },
})

const [email] = defineField('email')
const [password] = defineField('password')
const [rememberMe] = defineField('rememberMe')

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})
</script>

<template>
  <form novalidate class="flex w-72 flex-col gap-4" @submit="onSubmit">
    <div class="flex flex-col gap-1.5">
      <label for="login-email" class="text-base text-neutral-900">Email</label>
      <Input id="login-email" v-model="email" type="email" placeholder="you@example.com" />
      <p v-if="errors.email" class="text-base text-brand-700">{{ errors.email }}</p>
    </div>

    <div class="flex flex-col gap-1.5">
      <label for="login-password" class="text-base text-neutral-900">Password</label>
      <Input id="login-password" v-model="password" type="password" placeholder="••••••••" />
      <p v-if="errors.password" class="text-base text-brand-700">{{ errors.password }}</p>
    </div>

    <label class="flex items-center gap-2 text-base text-neutral-900">
      <Checkbox v-model="rememberMe" />
      Remember me
    </label>

    <Button type="submit" variant="primary" size="md">Sign in</Button>
  </form>
</template>
