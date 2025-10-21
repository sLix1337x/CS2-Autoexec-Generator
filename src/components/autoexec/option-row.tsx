'use client'

import { Check } from 'lucide-react'
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

  return (
    <label className={`option-card group block cursor-pointer select-none ${className ?? ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <span className="font-ui text-sm font-medium text-white">{label}</span>
          {description && (
            <p id={`${name}-description`} className="mt-1 text-xs text-gray-300">{description}</p>
          )}
        </div>
        {/* Hidden native checkbox for accessibility; styled indicator responds via peer classes */}
        <input
          type="checkbox"
          className="peer sr-only"
          {...register(`includeSections.${name}` as const)}
          aria-describedby={description ? `${name}-description` : undefined}
        />
        <div
          aria-hidden="true"
          className="h-5 w-5 rounded-md border border-[#3a3a3a] bg-[#111111] shadow-inner flex items-center justify-center transition-colors peer-checked:border-yellow-500 peer-checked:bg-yellow-500"
        >
          <Check className="h-3 w-3 text-black opacity-0 peer-checked:opacity-100 transition-opacity" />
        </div>
      </div>
    </label>
  )
}