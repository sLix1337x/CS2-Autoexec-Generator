'use client'

import { useFormContext } from 'react-hook-form'
import type { AutoexecFormValues } from '@/lib/schema'

interface OptionRowProps {
  name: keyof AutoexecFormValues['includeSections']
  label: string
  description?: string
  className?: string
}

export function OptionRow({ name, label, description, className }: OptionRowProps) {
  const { register } = useFormContext<AutoexecFormValues>()
  const baseClasses = "flex flex-col p-3 rounded cursor-pointer transition-colors"
  const defaultBg = "bg-[#2A2F26] hover:bg-[#323830]"
  return (
    <label className={`${baseClasses} ${className ?? defaultBg}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-ui text-sm font-medium text-white">{label}</span>
        <input
          type="checkbox"
          className="h-4 w-4 accent-yellow-400"
          {...register(`includeSections.${name}` as const)}
          aria-describedby={description ? `${name}-description` : undefined}
        />
      </div>
      {description && (
        <p className="text-xs text-gray-300">{description}</p>
      )}
    </label>
  )
}