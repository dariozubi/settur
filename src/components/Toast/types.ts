import { ComponentPropsWithoutRef, ReactElement } from 'react'
import Toast from './Toast'
import { ToastAction } from './ToastAction'

export type ToastProps = ComponentPropsWithoutRef<typeof Toast>

export type ToastActionElement = ReactElement<typeof ToastAction>
