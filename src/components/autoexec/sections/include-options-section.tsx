'use client'

import { useFormContext } from 'react-hook-form'
import { OptionRow } from '../option-row'
import type { AutoexecFormValues } from '@/lib/schema'
import { useEffect, useRef } from 'react'

// Simple checkbox for individual settings
function SettingCheckbox({ name, label }: { name: string; label: string }) {
  const { register } = useFormContext<AutoexecFormValues>()
  return (
    <label className="flex items-center gap-2 text-white text-sm">
      <input
        type="checkbox"
        className="h-4 w-4 accent-yellow-400"
        {...register(`includeCommands.${name}` as const)}
      />
      <span>{label}</span>
    </label>
  )
}

// Compact setting row with inline value and description
function SettingRow({
  name,
  label,
  description,
  type,
  options,
  min,
  max,
  step,
  defaultValue,
}: {
  name: string
  label: string
  description: string
  type: 'select' | 'number'
  options?: { value: string; label: string }[]
  min?: number
  max?: number
  step?: number
  defaultValue?: string
}) {
  const { register, watch } = useFormContext<AutoexecFormValues>()
  const included = watch(`includeCommands.${name}` as any)
  const rawValue = watch(name as any) as string | undefined
  const currentValue = (rawValue ?? defaultValue ?? '').toString()

  const displayValueSuffix = options
    ? options.find((o) => o.value === currentValue)?.label
    : undefined
  const displayValue = displayValueSuffix
    ? `${currentValue} - ${displayValueSuffix}`
    : currentValue

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-white text-sm flex-nowrap">
        <input
          type="checkbox"
          className="h-4 w-4 accent-yellow-400"
          {...register(`includeCommands.${name}` as const)}
        />
        <span className="flex-1 whitespace-nowrap">
          {included ? '✓ ' : ''}
          {label}
          {included && currentValue ? `: ${displayValue}` : ''}
        </span>
        {type === 'select' && (
          <select
            {...register(name as any)}
            disabled={!included}
            className="w-36 bg-[#282E22] border border-[#889180] text-white rounded px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {options?.map((o) => (
              <option key={o.value} value={o.value}>
                {o.value} — {o.label}
              </option>
            ))}
          </select>
        )}
        {type === 'number' && (
          <input
            type="number"
            step={step}
            min={min}
            max={max}
            {...register(name as any)}
            disabled={!included}
            className="w-24 bg-[#282E22] border border-[#889180] text-white rounded px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        )}
      </div>
      <p className="text-xs text-gray-300">{description}</p>
    </div>
  )
}

// Add a generic "Select All" checkbox that can control multiple form fields
function SelectAllCheckbox({ label, fieldPaths }: { label: string; fieldPaths: string[] }) {
  const { watch, setValue } = useFormContext<AutoexecFormValues>()
  const allSelected = fieldPaths.every((fp) => !!watch(fp as any))
  const anySelected = fieldPaths.some((fp) => !!watch(fp as any))
  const ref = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = anySelected && !allSelected
    }
  }, [anySelected, allSelected])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    fieldPaths.forEach((fp) => setValue(fp as any, checked))
  }

  return (
    <label className="flex items-center gap-2 text-white text-xs md:text-sm">
      <input
        type="checkbox"
        ref={ref}
        checked={allSelected}
        onChange={onChange}
        className="h-4 w-4 accent-yellow-400"
        aria-checked={anySelected && !allSelected ? 'mixed' : allSelected ? 'true' : 'false'}
      />
      <span>{label}</span>
    </label>
  )
}

// Keys per Settings subcategory used by the generator
const HUD_KEYS = [
  'cl_use_weapon_rarity_as_selection_color',
  'cl_hud_color',
  'cl_radar_rotate',
  'cl_hud_radar_scale',
  'hud_scaling',
  'cl_show_team_equipment',
  'r_drawtracers_firstperson',
]
const CROSSHAIR_KEYS = [
  'cl_crosshairalpha',
  'cl_crosshaircolor_r',
  'cl_crosshaircolor_g',
  'cl_crosshaircolor_b',
  'cl_crosshair_t',
  'cl_crosshairgap_useweaponvalue',
  'sensitivity',
  'zoom_sensitivity_ratio_mouse',
]
const VIEWMODEL_KEYS = [
  'viewmodel_fov',
  'viewmodel_offset_x',
  'viewmodel_offset_y',
  'viewmodel_offset_z',
  'viewmodel_presetpos',
]
const AUDIO_KEYS = [
  'volume',
  'snd_headphone_eq',
  'snd_mixahead',
  'snd_spatialize_lerp',
  'snd_menumusic_volume',
  'snd_mute_mvp_music_live_players',
  'snd_autodetect_latency',
]
const NETWORK_KEYS = [
  'cl_invites_only_friends',
  'cl_invites_only_mainmenu',
  'cl_join_advertise',
  'cl_clock_correction',
  'cl_interp_ratio',
  'cl_interp',
  'cl_updaterate',
  'cl_cmdrate',
  'mm_dedicated_search_maxping',
  'rate',
]

export function IncludeOptionsSection() {
  const { watch, register, setValue } = useFormContext<AutoexecFormValues>()
  // Auto-init includeCommands when subcategories toggle on; clear when off
  const settingsOn = watch('includeSections.settings')
  const hudOn = watch('includeSections.hud')
  const crosshairOn = watch('includeSections.mouseCrosshair')
  const viewmodelOn = watch('includeSections.viewmodel')
  const audioOn = watch('includeSections.sound')
  const networkOn = watch('includeSections.rate')

  useEffect(() => {
    const setKeys = (keys: string[], value: boolean) => {
      keys.forEach((k) => setValue(`includeCommands.${k}` as any, value))
    }
    if (!settingsOn) {
      setKeys([...HUD_KEYS, ...CROSSHAIR_KEYS, ...VIEWMODEL_KEYS, ...AUDIO_KEYS, ...NETWORK_KEYS], false)
      return
    }
    if (hudOn) {
      HUD_KEYS.forEach((k) => {
        const v = watch(`includeCommands.${k}` as any)
        if (v === undefined) setValue(`includeCommands.${k}` as any, true)
      })
    } else {
      setKeys(HUD_KEYS, false)
    }
    if (crosshairOn) {
      CROSSHAIR_KEYS.forEach((k) => {
        const v = watch(`includeCommands.${k}` as any)
        if (v === undefined) setValue(`includeCommands.${k}` as any, true)
      })
    } else {
      setKeys(CROSSHAIR_KEYS, false)
    }
    if (viewmodelOn) {
      VIEWMODEL_KEYS.forEach((k) => {
        const v = watch(`includeCommands.${k}` as any)
        if (v === undefined) setValue(`includeCommands.${k}` as any, true)
      })
    } else {
      setKeys(VIEWMODEL_KEYS, false)
    }
    if (audioOn) {
      AUDIO_KEYS.forEach((k) => {
        const v = watch(`includeCommands.${k}` as any)
        if (v === undefined) setValue(`includeCommands.${k}` as any, true)
      })
    } else {
      setKeys(AUDIO_KEYS, false)
    }
    if (networkOn) {
      NETWORK_KEYS.forEach((k) => {
        const v = watch(`includeCommands.${k}` as any)
        if (v === undefined) setValue(`includeCommands.${k}` as any, true)
      })
    } else {
      setKeys(NETWORK_KEYS, false)
    }
  }, [settingsOn, hudOn, crosshairOn, viewmodelOn, audioOn, networkOn])

  return (
   <fieldset 
     id="CheckmarkSettingsSection"
     className="bg-[#3E4637] p-6 rounded-lg mb-8 md:mb-12"
     aria-labelledby="CheckmarkSectionHeader"
   >
     <legend 
       id="CheckmarkSectionHeader"
       className="bg-[#111111] text-white px-4 py-2 rounded font-ui text-lg mb-4"
     >
       Include in Autoexec
     </legend>
     
     <div className="mb-6">
       <p className="text-white text-sm leading-relaxed">
         Customize your autoexec. Check the boxes below for the settings you want to include in your final autoexec file.
       </p>
     </div>
     
     {/* Console Color Selection */}
     <div className="mb-4">
       <h3 className="text-white font-semibold mb-2 text-sm font-ui">Console Color</h3>
       <div className="flex items-center gap-3">
         <select
           {...register('consoleColor')}
           className="flex-1 bg-[#282E22] border border-[#889180] text-white rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
         >
           <option value="pink">🌸 Pink</option>
           <option value="lightblue">💙 Light Blue</option>
           <option value="orange">🧡 Orange</option>
           <option value="yellow">💛 Yellow</option>
           <option value="green">💚 Green</option>
           <option value="red">❤️ Red</option>
         </select>
         <div className="w-6 h-6 rounded border-2 border-gray-600 flex-shrink-0" 
              style={{
                backgroundColor: 
                  watch('consoleColor') === 'pink' ? '#FF69B4' :
                  watch('consoleColor') === 'lightblue' ? '#87CEEB' :
                  watch('consoleColor') === 'orange' ? '#FFA500' :
                  watch('consoleColor') === 'yellow' ? '#FFFF00' :
                  watch('consoleColor') === 'green' ? '#00FF00' :
                  watch('consoleColor') === 'red' ? '#FF0000' : '#FF69B4'
              }}>
         </div>
       </div>
     </div>
     
     {/* Prediction Effects */}
     <div className="mb-4">
       <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-semibold text-sm font-ui">Damage Prediction</h3>
        <SelectAllCheckbox label="Enable all" fieldPaths={[
          'predictBodyShotFx',
          'predictHeadShotFx',
          'predictKillRagdolls',
        ]} />
      </div>
       <div className="space-y-2">
         <div className="grid grid-cols-[1fr,2.5rem] items-center gap-3">
           <span className="text-white text-sm whitespace-nowrap">Predict Body Shots Effects</span>
           <button
             type="button"
             role="switch"
             aria-checked={watch('predictBodyShotFx')}
             aria-label="Predict Body Shots Effects"
             onClick={() => setValue('predictBodyShotFx', !watch('predictBodyShotFx'))}
             className={`relative inline-flex h-6 w-10 items-center rounded-full border border-[#889180] transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
               watch('predictBodyShotFx') ? 'bg-yellow-500' : 'bg-[#4A5140]'
             }`}
           >
             <span
               className={`absolute left-1 top-1 h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                 watch('predictBodyShotFx') ? 'translate-x-4' : 'translate-x-0'
               }`}
             />
           </button>
         </div>
         <div className="grid grid-cols-[1fr,2.5rem] items-center gap-3">
           <span className="text-white text-sm whitespace-nowrap">Predict Head Shots Effects</span>
           <button
             type="button"
             role="switch"
             aria-checked={watch('predictHeadShotFx')}
             aria-label="Predict Head Shots Effects"
             onClick={() => setValue('predictHeadShotFx', !watch('predictHeadShotFx'))}
             className={`relative inline-flex h-6 w-10 items-center rounded-full border border-[#889180] transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
               watch('predictHeadShotFx') ? 'bg-yellow-500' : 'bg-[#4A5140]'
             }`}
           >
             <span
               className={`absolute left-1 top-1 h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                 watch('predictHeadShotFx') ? 'translate-x-4' : 'translate-x-0'
               }`}
             />
           </button>
         </div>
         <div className="grid grid-cols-[1fr,2.5rem] items-center gap-3">
           <span className="text-white text-sm whitespace-nowrap">Predict Kill Ragdolls</span>
           <button
             type="button"
             role="switch"
             aria-checked={watch('predictKillRagdolls')}
             aria-label="Predict Kill Ragdolls"
             onClick={() => setValue('predictKillRagdolls', !watch('predictKillRagdolls'))}
             className={`relative inline-flex h-6 w-10 items-center rounded-full border border-[#889180] transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
               watch('predictKillRagdolls') ? 'bg-yellow-500' : 'bg-[#4A5140]'
             }`}
           >
             <span
               className={`absolute left-1 top-1 h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                 watch('predictKillRagdolls') ? 'translate-x-4' : 'translate-x-0'
               }`}
             />
           </button>
         </div>
       </div>
     </div>
     
     <div className="mb-4">
       <h3 className="text-white font-semibold mb-3 font-ui">Include Sections</h3>
     </div>

     {/* Top-level categories */}
     <div className="grid grid-cols-3 gap-4 mb-4">
       <OptionRow
         name="binds"
         label="Key Bindings"
         description="Include key bindings and controls"
         className="bg-[#111111] hover:bg-[#111111]"
       />
       <OptionRow
         name="aliases"
         label="Aliases"
         description="Include command aliases"
         className="bg-[#111111] hover:bg-[#111111]"
       />
       <OptionRow
         name="settings"
         label="Settings"
         description="Include game settings"
         className="bg-[#111111] hover:bg-[#111111]"
       />
     </div>

     {/* Settings subcategories (shown only if Settings is ON) */}
     {settingsOn && (
       <div className="space-y-4">
         <div className="grid grid-cols-5 gap-3">
           <OptionRow name="hud" label="HUD" description="HUD options" className="bg-[#111111] hover:bg-[#111111]" />
           <OptionRow name="mouseCrosshair" label="CROSSHAIR & SENSITIVITY" description="Crosshair & sensitivity options" className="bg-[#111111] hover:bg-[#111111]" />
           <OptionRow name="viewmodel" label="VIEWMODEL" description="Viewmodel options" className="bg-[#111111] hover:bg-[#111111]" />
           <OptionRow name="sound" label="AUDIO" description="Audio options" className="bg-[#111111] hover:bg-[#111111]" />
           <OptionRow name="rate" label="NETWORK" description="Network options" className="bg-[#111111] hover:bg-[#111111]" />
         </div>

         {/* HUD items */}
          {hudOn && (
            <div className="bg-[#2A2F26] border border-[#889180] rounded p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm font-ui">HUD</h4>
                <SelectAllCheckbox label="Select all" fieldPaths={HUD_KEYS.map((k) => `includeCommands.${k}`)} />
              </div>
              <div className="space-y-3">
                <SettingRow
                  name="cl_use_weapon_rarity_as_selection_color"
                  label="Use weapon rarity colors"
                  description="Colors selection UI based on weapon rarity. 0 = Off, 1 = On. Default is 1."
                  type="select"
                  options={[
                    { value: '0', label: 'Off' },
                    { value: '1', label: 'On' },
                  ]}
                  defaultValue="1"
                />
                <SettingRow
                  name="cl_hud_color"
                  label="HUD Color"
                  description="Changes HUD color scheme. Default is 0 (Default). Allowed values: 0–10."
                  type="select"
                  options={[
                    { value: '0', label: 'Default' },
                    { value: '1', label: 'White' },
                    { value: '2', label: 'Light blue' },
                    { value: '3', label: 'Dark blue' },
                    { value: '4', label: 'Purple' },
                    { value: '5', label: 'Red' },
                    { value: '6', label: 'Orange' },
                    { value: '7', label: 'Yellow' },
                    { value: '8', label: 'Green' },
                    { value: '9', label: 'Aqua' },
                    { value: '10', label: 'Pink' },
                  ]}
                  defaultValue="0"
                />
                <SettingRow
                  name="cl_radar_rotate"
                  label="Rotate radar with player"
                  description="Rotates the radar based on player view direction. 0 = Fixed north, 1 = Rotate with view. Default is 1."
                  type="select"
                  options={[
                    { value: '0', label: 'Off' },
                    { value: '1', label: 'On' },
                  ]}
                  defaultValue="1"
                />
                <SettingRow
                  name="cl_hud_radar_scale"
                  label="HUD radar scale"
                  description="Controls radar size within the HUD. Range 0.8–1.3. Default is 1.0."
                  type="number"
                  min={0.8}
                  max={1.3}
                  step={0.01}
                  defaultValue="1.0"
                />
                <SettingRow
                  name="hud_scaling"
                  label="HUD scaling"
                  description="Scale the size of the HUD. Range 0.5–0.95. Default is 0.85."
                  type="number"
                  min={0.5}
                  max={0.95}
                  step={0.01}
                  defaultValue="0.85"
                />
                <SettingRow
                  name="cl_show_team_equipment"
                  label="Show teammate equipment"
                  description="Shows teammate equipment above their heads (through walls). 0 = Off, 1 = On. Default is 1."
                  type="select"
                  options={[
                    { value: '0', label: 'Off' },
                    { value: '1', label: 'On' },
                  ]}
                  defaultValue="1"
                />
                <SettingRow
                  name="r_drawtracers_firstperson"
                  label="First-person bullet tracers"
                  description="Shows bullet tracers in first-person view. 0 = Off, 1 = On. Default is 1."
                  type="select"
                  options={[
                    { value: '0', label: 'Off' },
                    { value: '1', label: 'On' },
                  ]}
                  defaultValue="1"
                />
              </div>
            </div>
          )}

         {/* Crosshair & Sensitivity */}
         {crosshairOn && (
           <div className="bg-[#2A2F26] border border-[#889180] rounded p-3">
             <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-semibold text-sm font-ui">CROSSHAIR & SENSITIVITY</h4>
              <SelectAllCheckbox label="Select all" fieldPaths={CROSSHAIR_KEYS.map((k) => `includeCommands.${k}`)} />
             </div>
             <div className="space-y-3">
               <SettingRow
                 name="cl_crosshairalpha"
                 label="Crosshair transparency"
                 description="Controls crosshair opacity. Range 0–255. Default is 255."
                 type="number"
                 min={0}
                 max={255}
                 step={1}
                 defaultValue="255"
               />
               <SettingRow
                 name="cl_crosshaircolor_r"
                 label="Crosshair color R"
                 description="Red component for custom crosshair color. Range 0–255. Default is 50."
                 type="number"
                 min={0}
                 max={255}
                 step={1}
                 defaultValue="50"
               />
               <SettingRow
                 name="cl_crosshaircolor_g"
                 label="Crosshair color G"
                 description="Green component for custom crosshair color. Range 0–255. Default is 250."
                 type="number"
                 min={0}
                 max={255}
                 step={1}
                 defaultValue="250"
               />
               <SettingRow
                 name="cl_crosshaircolor_b"
                 label="Crosshair color B"
                 description="Blue component for custom crosshair color. Range 0–255. Default is 50."
                 type="number"
                 min={0}
                 max={255}
                 step={1}
                 defaultValue="50"
               />
               <SettingRow
                 name="cl_crosshair_t"
                 label="T-style crosshair"
                 description="Removes the top line of the crosshair. 0 = Off, 1 = On. Default is 0."
                 type="select"
                 options={[
                   { value: '0', label: 'Off' },
                   { value: '1', label: 'On' },
                 ]}
                 defaultValue="0"
               />
               <SettingRow
                 name="cl_crosshairgap_useweaponvalue"
                 label="Use weapon-specific gap"
                 description="Use crosshair gap based on current weapon. 0 = Off, 1 = On. Default is 0."
                 type="select"
                 options={[
                   { value: '0', label: 'Off' },
                   { value: '1', label: 'On' },
                 ]}
                 defaultValue="0"
               />
               <SettingRow
                 name="sensitivity"
                 label="Mouse sensitivity"
                 description="Mouse sensitivity multiplier. Typical range 0.1–10. Default is 2.5."
                 type="number"
                 min={0.1}
                 max={10}
                 step={0.01}
                 defaultValue="2.5"
               />
               <SettingRow
                 name="zoom_sensitivity_ratio_mouse"
                 label="Zoom sensitivity multiplier"
                 description="Sensitivity multiplier when scoped/zoomed. Range 0.5–2.0. Default is 1.0."
                 type="number"
                 min={0.5}
                 max={2.0}
                 step={0.01}
                 defaultValue="1.0"
               />
             </div>
           </div>
         )}

         {/* Viewmodel */}
         {viewmodelOn && (
           <div className="bg-[#2A2F26] border border-[#889180] rounded p-3">
             <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-semibold text-sm font-ui">VIEWMODEL</h4>
              <SelectAllCheckbox label="Select all" fieldPaths={VIEWMODEL_KEYS.map((k) => `includeCommands.${k}`)} />
             </div>
             <div className="space-y-3">
               <SettingRow
                 name="viewmodel_presetpos"
                 label="Preset position"
                 description="Predefined viewmodel presets. 0 = Custom (use offsets), 1 = Desktop, 2 = Couch, 3 = Classic."
                 type="select"
                 options={[
                   { value: '0', label: 'Custom (use offsets)' },
                   { value: '1', label: 'Desktop' },
                   { value: '2', label: 'Couch' },
                   { value: '3', label: 'Classic' },
                 ]}
                 defaultValue="1"
               />
               <SettingRow
                 name="viewmodel_fov"
                 label="Viewmodel FOV"
                 description="Field of view for weapon model. Range 54–68. Default is 60."
                 type="number"
                 min={54}
                 max={68}
                 step={1}
                 defaultValue="60"
               />
               <SettingRow
                 name="viewmodel_offset_x"
                 label="Viewmodel offset X"
                 description="Horizontal weapon position. Range −2.0–2.5. Negative = left, positive = right. Default is 0."
                 type="number"
                 min={-2.0}
                 max={2.5}
                 step={0.1}
                 defaultValue="0"
               />
               <SettingRow
                 name="viewmodel_offset_y"
                 label="Viewmodel offset Y"
                 description="Forward/backward weapon position. Range −2.0–2.0. Negative = closer, positive = farther. Default is 0."
                 type="number"
                 min={-2.0}
                 max={2.0}
                 step={0.1}
                 defaultValue="0"
               />
               <SettingRow
                 name="viewmodel_offset_z"
                 label="Viewmodel offset Z"
                 description="Vertical weapon position. Range −2.0–2.0. Negative = lower, positive = higher. Default is −1.5."
                 type="number"
                 min={-2.0}
                 max={2.0}
                 step={0.1}
                 defaultValue="-1.5"
               />
             </div>
           </div>
         )}

         {/* Audio */}
         {audioOn && (
           <div className="bg-[#2A2F26] border border-[#889180] rounded p-3">
             <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-semibold text-sm font-ui">AUDIO</h4>
              <SelectAllCheckbox label="Select all" fieldPaths={AUDIO_KEYS.map((k) => `includeCommands.${k}`)} />
             </div>
             <div className="space-y-3">
               <SettingRow
                 name="volume"
                 label="Master volume"
                 description="Overall game audio volume. Range 0.0–1.0. Default is 1.0."
                 type="number"
                 min={0}
                 max={1}
                 step={0.01}
                 defaultValue="1.0"
               />
               <SettingRow
                 name="snd_headphone_eq"
                 label="Headphone EQ"
                 description="Enable headphone equalization profile. 0 = Off, 1 = On. Default is 1."
                 type="select"
                 options={[
                   { value: '0', label: 'Off' },
                   { value: '1', label: 'On' },
                 ]}
                 defaultValue="1"
               />
               <SettingRow
                 name="snd_mixahead"
                 label="Audio buffer size (mixahead)"
                 description="Audio mix-ahead buffer. Lower values reduce latency but risk stutter. Range 0.001–0.1. Default is 0.001."
                 type="number"
                 min={0.001}
                 max={0.1}
                 step={0.001}
                 defaultValue="0.001"
               />
               <SettingRow
                 name="snd_spatialize_lerp"
                 label="Spatialize lerp"
                 description="Interpolation for 3D audio spatialization. Range 0.0–1.0. Default is 0.8."
                 type="number"
                 min={0}
                 max={1}
                 step={0.01}
                 defaultValue="0.8"
               />
               <SettingRow
                 name="snd_menumusic_volume"
                 label="Menu music volume"
                 description="Volume of menu music. Range 0.0–1.0. Default is 0.0."
                 type="number"
                 min={0}
                 max={1}
                 step={0.01}
                 defaultValue="0"
               />
               <SettingRow
                 name="snd_mute_mvp_music_live_players"
                 label="Mute MVP music when alive"
                 description="Mute MVP celebration music while you are alive. 0 = Off, 1 = On. Default is 1."
                 type="select"
                 options={[
                   { value: '0', label: 'Off' },
                   { value: '1', label: 'On' },
                 ]}
                 defaultValue="1"
               />
               <SettingRow
                 name="snd_autodetect_latency"
                 label="Auto-detect audio latency"
                 description="Automatically detect audio latency. 0 = Off, 1 = On. Default is 1."
                 type="select"
                 options={[
                   { value: '0', label: 'Off' },
                   { value: '1', label: 'On' },
                 ]}
                 defaultValue="1"
               />
             </div>
           </div>
         )}

         {/* Network */}
         {networkOn && (
           <div className="bg-[#2A2F26] border border-[#889180] rounded p-3">
             <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-semibold text-sm font-ui">NETWORK</h4>
              <SelectAllCheckbox label="Select all" fieldPaths={NETWORK_KEYS.map((k) => `includeCommands.${k}`)} />
             </div>
             <div className="space-y-3">
               <SettingRow
                 name="cl_invites_only_friends"
                 label="Ignore invites from non-friends"
                 description="Ignore in-game invites from recent teammates or other non-friends. 0 = Off, 1 = On. Default is 0."
                 type="select"
                 options={[
                   { value: '0', label: 'Off' },
                   { value: '1', label: 'On' },
                 ]}
                 defaultValue="0"
               />
               <SettingRow
                 name="cl_invites_only_mainmenu"
                 label="Ignore invites while in match"
                 description="Ignore all invites when you are playing a match (only accept in main menu). 0 = Off, 1 = On. Default is 0."
                 type="select"
                 options={[
                   { value: '0', label: 'Off' },
                   { value: '1', label: 'On' },
                 ]}
                 defaultValue="0"
               />
               <SettingRow
                 name="cl_join_advertise"
                 label="Advertise joinable game"
                 description="Let Steam friends join your game without an invite. 0 = None, 1 = Official servers, 2 = All servers. Default (game) is 1. Recommended: 2."
                 type="select"
                 options={[
                   { value: '0', label: 'None' },
                   { value: '1', label: 'Official servers' },
                   { value: '2', label: 'All servers' },
                 ]}
                 defaultValue="2"
               />
               <SettingRow
                 name="cl_clock_correction"
                 label="Clock correction"
                 description="Adjust client clock to smooth network jitter. 0 = Off, 1 = On. Default is 0."
                 type="select"
                 options={[
                   { value: '0', label: 'Off' },
                   { value: '1', label: 'On' },
                 ]}
                 defaultValue="0"
               />
               <SettingRow
                 name="cl_interp_ratio"
                 label="Interpolation ratio"
                 description="Ratio used to calculate interpolation delay. Typically 1 at 128 tick or 2 at 64 tick. Range 1–2. Default is 1."
                 type="number"
                 min={1}
                 max={2}
                 step={1}
                 defaultValue="1"
               />
               <SettingRow
                 name="cl_interp"
                 label="Interpolation delay (interp)"
                 description="Interpolation delay in seconds. Lower values reduce latency but require stable connection. Typically derived from cl_interp_ratio and cl_updaterate; direct overrides can cause unintended behavior. Range 0.0–0.1. Default is 0.015625."
                 type="number"
                 min={0}
                 max={0.1}
                 step={0.000125}
                 defaultValue="0.015625"
               />
               <SettingRow
                 name="cl_updaterate"
                 label="Update rate (server → client)"
                 description="Updates per second received from server. Server may override. Range 32–128. Default is 128."
                 type="number"
                 min={32}
                 max={128}
                 step={1}
                 defaultValue="128"
               />
               <SettingRow
                 name="cl_cmdrate"
                 label="Command rate (client → server)"
                 description="Commands per second sent to server. Server may override. Range 32–128. Default is 128."
                 type="number"
                 min={32}
                 max={128}
                 step={1}
                 defaultValue="128"
               />
               <SettingRow
                 name="mm_dedicated_search_maxping"
                 label="Matchmaking max ping"
                 description="Max allowable ping (ms) for official matchmaking. Default (game) is 150. Recommended 80–100 for competitive; lower values may increase queue times. Range 25–350."
                 type="number"
                 min={25}
                 max={350}
                 step={5}
                 defaultValue="100"
               />
               <SettingRow
                 name="rate"
                 label="Bandwidth rate"
                 description="Networking bandwidth limit in bytes per second. Range 64000–1000000. Default is 786432. Note: 1000000 is valid despite in-game showing 'Extremely restricted'. Examples: 1.0 Mbps → 131072; 6.0 Mbps → 786432; 7.6 Mbps → 1000000."
                 type="number"
                 min={64000}
                 max={1000000}
                 step={1024}
                 defaultValue="786432"
               />
             </div>
           </div>
         )}
       </div>
     )}
   </fieldset>
  )
}