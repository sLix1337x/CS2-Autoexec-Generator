'use client'

import { useFormContext } from 'react-hook-form'
import { OptionRow } from '../option-row'
import type { AutoexecFormValues } from '@/lib/schema'
import { useEffect, useRef, useState } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { ChevronDown } from 'lucide-react'

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
    <label className="flex items-center gap-2 text-white text-sm">
      <input
        ref={ref}
        type="checkbox"
        className="h-4 w-4 accent-yellow-400"
        checked={allSelected}
        onChange={onChange}
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

  // Core toggles
  const settingsOn = watch('includeSections.settings')
  const hudOn = watch('includeSections.hud')
  const crosshairOn = watch('includeSections.mouseCrosshair')
  const viewmodelOn = watch('includeSections.viewmodel')
  const audioOn = watch('includeSections.sound')
  const networkOn = watch('includeSections.rate')

  // Panels open state
  const [bindsOpen, setBindsOpen] = useState(true)
  const [aliasesOpen, setAliasesOpen] = useState(true)
  const [settingsOpen, setSettingsOpen] = useState(true)

  // Initialize includeCommands when subcategories are enabled
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

  // Minimal UI while we validate parsing
  return (
    <div className="bg-[#3E4637] p-6 rounded-lg mb-8 md:mb-12 text-white">
      <h2 className="bg-[#111111] text-white px-4 py-2 rounded font-ui text-lg mb-4">Include in Autoexec</h2>

      <div className="mb-4">
        <h3 className="text-white font-semibold mb-2 text-sm font-ui">Console Color</h3>
        <select
          {...register('consoleColor')}
          className="bg-[#1a1a1a] border border-[#889180] text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          style={{ backgroundColor: '#1a1a1a', borderRadius: '0.5rem' }}
        >
          <option value="pink">Pink</option>
          <option value="lightblue">Light Blue</option>
          <option value="orange">Orange</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="red">Red</option>
        </select>
      </div>


      {/* Game Settings */}
      <div className="mb-4">
        <h3 className="text-white font-semibold mb-2 text-sm font-ui">Game Settings</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <SettingRow
            name="r_show_build_info"
            label="Show build info overlay"
            description="Displays build/version info overlay in-game. 0 = Off, 1 = On. Default is 0."
            type="select"
            options={[
              { value: '0', label: 'Off' },
              { value: '1', label: 'On' },
            ]}
            defaultValue="0"
          />
          <SettingRow
            name="cl_allow_animated_avatars"
            label="Allow animated avatars"
            description="Enable/disable animated avatars in UI. 0 = Off, 1 = On. Default is 1."
            type="select"
            options={[
              { value: '0', label: 'Off' },
              { value: '1', label: 'On' },
            ]}
            defaultValue="1"
          />
          <SettingRow
            name="cl_teamcounter_playercount_instead_of_avatars"
            label="Team counter: show player count"
            description="Show player count instead of avatars in team counter. 0 = Avatars, 1 = Player count. Default is 0."
            type="select"
            options={[
              { value: '0', label: 'Avatars' },
              { value: '1', label: 'Player count' },
            ]}
            defaultValue="0"
          />
          <SettingRow
            name="fps_max"
            label="Max FPS (fps_max)"
            description="Maximum FPS limit. 0 = unlimited. Default is 0."
            type="number"
            step={1}
            min={0}
            defaultValue="0"
          />
        </div>
      </div>

      {/* Damage Prediction settings */}
      <div className="mb-4">
        <h3 className="text-white font-semibold mb-2 text-sm font-ui">Damage Prediction</h3>
        <div className="space-y-3">
          <SettingRow
            name="cl_predict_body_shot_fx"
            label="Body shot FX"
            description="Enable/disable predicted body shot effect. 1 = On, 2 = Off. Default is 2."
            type="select"
            options={[
              { value: '1', label: 'On' },
              { value: '2', label: 'Off' },
            ]}
            defaultValue="2"
          />
          <SettingRow
            name="cl_predict_head_shot_fx"
            label="Headshot FX"
            description="Enable/disable predicted headshot effect. 1 = On, 2 = Off. Default is 2."
            type="select"
            options={[
              { value: '1', label: 'On' },
              { value: '2', label: 'Off' },
            ]}
            defaultValue="2"
          />
          <SettingRow
            name="cl_predict_kill_ragdolls"
            label="Kill ragdolls"
            description="Enable/disable predicted kill ragdolls. 1 = On, 2 = Off. Default is 1."
            type="select"
            options={[
              { value: '1', label: 'On' },
              { value: '2', label: 'Off' },
            ]}
            defaultValue="1"
          />
        </div>
      </div>

      <div className="mb-4">
        <Collapsible.Root open={bindsOpen} onOpenChange={setBindsOpen}>
          <Collapsible.Trigger asChild>
            <button type="button" className="collapsible-trigger">
              <span className="text-white font-semibold font-ui text-sm">Key Bindings</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${bindsOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <div className="text-xs text-gray-300 py-2">Panel content will return after parser fix.</div>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>

      <div className="mb-4">
        <Collapsible.Root open={aliasesOpen} onOpenChange={setAliasesOpen}>
          <Collapsible.Trigger asChild>
            <button type="button" className="collapsible-trigger">
              <span className="text-white font-semibold font-ui text-sm">Aliases</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${aliasesOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <div className="text-xs text-gray-300 py-2">Panel content will return after parser fix.</div>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>

      <div className="mb-4">
        <Collapsible.Root open={settingsOpen} onOpenChange={setSettingsOpen}>
          <Collapsible.Trigger asChild>
            <button type="button" className="collapsible-trigger">
              <span className="text-white font-semibold font-ui text-sm">Settings & Subcategories</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${settingsOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <div className="space-y-3 py-2">
              <OptionRow name="settings" label="Enable Settings" description="Include game settings" className="option-card" />
              {settingsOn ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-5 gap-3">
                    <OptionRow name="hud" label="HUD" description="HUD options" className="bg-[#111111] hover:bg-[#111111]" />
                    <OptionRow name="mouseCrosshair" label="CROSSHAIR & SENSITIVITY" description="Crosshair & sensitivity options" className="bg-[#111111] hover:bg-[#111111]" />
                    <OptionRow name="viewmodel" label="VIEWMODEL" description="Viewmodel options" className="bg-[#111111] hover:bg-[#111111]" />
                    <OptionRow name="sound" label="AUDIO" description="Audio options" className="bg-[#111111] hover:bg-[#111111]" />
                    <OptionRow name="rate" label="NETWORK" description="Network options" className="bg-[#111111] hover:bg-[#111111]" />
                  </div>

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

                  {crosshairOn && (
                    <div className="bg-[#2A2F26] border border-[#889180] rounded p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-semibold text-sm font-ui">Crosshair & Sensitivity</h4>
                        <SelectAllCheckbox label="Select all" fieldPaths={CROSSHAIR_KEYS.map((k) => `includeCommands.${k}`)} />
                      </div>
                      <div className="space-y-3">
                        <SettingRow
                          name="cl_crosshairalpha"
                          label="Crosshair alpha"
                          description="Opacity of the crosshair. Range 0–255."
                          type="number"
                          min={0}
                          max={255}
                          step={1}
                          defaultValue="255"
                        />
                        <SettingRow
                          name="cl_crosshair_t"
                          label="T-style crosshair"
                          description="Use T-shaped crosshair (no top line). 0 = Off, 1 = On."
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
                          description="Use weapon-specific gap value for the crosshair. 0 = Off, 1 = On."
                          type="select"
                          options={[
                            { value: '0', label: 'Off' },
                            { value: '1', label: 'On' },
                          ]}
                          defaultValue="0"
                        />
                        <SettingRow
                          name="cl_crosshaircolor_r"
                          label="Crosshair color R"
                          description="Red channel of crosshair color. Range 0–255."
                          type="number"
                          min={0}
                          max={255}
                          step={1}
                          defaultValue="255"
                        />
                        <SettingRow
                          name="cl_crosshaircolor_g"
                          label="Crosshair color G"
                          description="Green channel of crosshair color. Range 0–255."
                          type="number"
                          min={0}
                          max={255}
                          step={1}
                          defaultValue="255"
                        />
                        <SettingRow
                          name="cl_crosshaircolor_b"
                          label="Crosshair color B"
                          description="Blue channel of crosshair color. Range 0–255."
                          type="number"
                          min={0}
                          max={255}
                          step={1}
                          defaultValue="255"
                        />
                        <SettingRow
                          name="sensitivity"
                          label="Mouse sensitivity"
                          description="Base mouse sensitivity. Typical range 0.5–4.0."
                          type="number"
                          min={0.1}
                          max={10}
                          step={0.01}
                          defaultValue="1.00"
                        />
                        <SettingRow
                          name="zoom_sensitivity_ratio_mouse"
                          label="Zoom sensitivity ratio"
                          description="Sensitivity multiplier while scoped. Range 0.2–2.0."
                          type="number"
                          min={0.2}
                          max={2}
                          step={0.01}
                          defaultValue="1.00"
                        />
                      </div>
                    </div>
                  )}

                  {viewmodelOn && (
                    <div className="bg-[#2A2F26] border border-[#889180] rounded p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-semibold text-sm font-ui">Viewmodel</h4>
                        <SelectAllCheckbox label="Select all" fieldPaths={VIEWMODEL_KEYS.map((k) => `includeCommands.${k}`)} />
                      </div>
                      <div className="space-y-3">
                        <SettingRow
                          name="viewmodel_fov"
                          label="Viewmodel FOV"
                          description="Field of view for weapons. Range 54–68."
                          type="number"
                          min={54}
                          max={68}
                          step={1}
                          defaultValue="62"
                        />
                        <SettingRow
                          name="viewmodel_offset_x"
                          label="Viewmodel offset X"
                          description="Horizontal offset. Range −2.5–2.5."
                          type="number"
                          min={-2.5}
                          max={2.5}
                          step={0.1}
                          defaultValue="0"
                        />
                        <SettingRow
                          name="viewmodel_offset_y"
                          label="Viewmodel offset Y"
                          description="Forward/back offset. Range −2.5–2.5."
                          type="number"
                          min={-2.5}
                          max={2.5}
                          step={0.1}
                          defaultValue="0"
                        />
                        <SettingRow
                          name="viewmodel_offset_z"
                          label="Viewmodel offset Z"
                          description="Vertical offset. Range −2.5–2.5."
                          type="number"
                          min={-2.5}
                          max={2.5}
                          step={0.1}
                          defaultValue="0"
                        />
                        <SettingRow
                          name="viewmodel_presetpos"
                          label="Viewmodel preset"
                          description="Preset positions for the viewmodel."
                          type="select"
                          options={[
                            { value: '0', label: 'None/Custom' },
                            { value: '1', label: 'Preset 1' },
                            { value: '2', label: 'Preset 2' },
                            { value: '3', label: 'Preset 3' },
                          ]}
                          defaultValue="0"
                        />
                      </div>
                    </div>
                  )}


                  {audioOn && (
                    <div className="bg-[#2A2F26] border border-[#889180] rounded p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-semibold text-sm font-ui">Audio</h4>
                        <SelectAllCheckbox label="Select all" fieldPaths={AUDIO_KEYS.map((k) => `includeCommands.${k}`)} />
                      </div>
                      <div className="space-y-3">
                        <SettingRow
                          name="volume"
                          label="Master volume"
                          description="Overall game volume. Range 0.0–1.0."
                          type="number"
                          min={0}
                          max={1}
                          step={0.01}
                          defaultValue="0.50"
                        />
                        <SettingRow
                          name="snd_headphone_eq"
                          label="Headphone EQ"
                          description="Headphone equalization preset. 0 = Off, 1 = On."
                          type="select"
                          options={[
                            { value: '0', label: 'Off' },
                            { value: '1', label: 'On' },
                          ]}
                          defaultValue="1"
                        />
                        <SettingRow
                          name="snd_mixahead"
                          label="Audio mixahead"
                          description="Audio buffer size in seconds. Lower = lower latency. Typical 0.05–0.10."
                          type="number"
                          min={0.02}
                          max={0.2}
                          step={0.01}
                          defaultValue="0.05"
                        />
                        <SettingRow
                          name="snd_spatialize_lerp"
                          label="Spatialize lerp"
                          description="Blending amount for spatialization. Range 0.0–1.0."
                          type="number"
                          min={0}
                          max={1}
                          step={0.01}
                          defaultValue="0.50"
                        />
                        <SettingRow
                          name="snd_menumusic_volume"
                          label="Menu music volume"
                          description="Menu music volume. Range 0.0–1.0."
                          type="number"
                          min={0}
                          max={1}
                          step={0.01}
                          defaultValue="0.00"
                        />
                        <SettingRow
                          name="snd_mute_mvp_music_live_players"
                          label="Mute MVP music for living players"
                          description="Mutes MVP music while alive. 0 = Off, 1 = On."
                          type="select"
                          options={[
                            { value: '0', label: 'Off' },
                            { value: '1', label: 'On' },
                          ]}
                          defaultValue="1"
                        />
                        <SettingRow
                          name="snd_autodetect_latency"
                          label="Autodetect audio latency"
                          description="Let the game detect audio latency automatically. 0 = Off, 1 = On."
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

                  {networkOn && (
                    <div className="bg-[#2A2F26] border border-[#889180] rounded p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-semibold text-sm font-ui">Network</h4>
                        <SelectAllCheckbox label="Select all" fieldPaths={NETWORK_KEYS.map((k) => `includeCommands.${k}`)} />
                      </div>
                      <div className="space-y-3">
                        <SettingRow
                          name="cl_invites_only_friends"
                          label="Invites only from friends"
                          description="Only allow invites from friends. 0 = Off, 1 = On."
                          type="select"
                          options={[
                            { value: '0', label: 'Off' },
                            { value: '1', label: 'On' },
                          ]}
                          defaultValue="1"
                        />
                        <SettingRow
                          name="cl_invites_only_mainmenu"
                          label="Only allow invites from main menu"
                          description="Only allow invites when in main menu. 0 = Off, 1 = On."
                          type="select"
                          options={[
                            { value: '0', label: 'Off' },
                            { value: '1', label: 'On' },
                          ]}
                          defaultValue="0"
                        />
                        <SettingRow
                          name="cl_join_advertise"
                          label="Advertise lobbies"
                          description="Advertise your lobbies to friends. 0 = Off, 1 = On."
                          type="select"
                          options={[
                            { value: '0', label: 'Off' },
                            { value: '1', label: 'On' },
                          ]}
                          defaultValue="1"
                        />
                        <SettingRow
                          name="cl_clock_correction"
                          label="Clock correction"
                          description="Network clock correction. 0 = Off, 1 = On."
                          type="select"
                          options={[
                            { value: '0', label: 'Off' },
                            { value: '1', label: 'On' },
                          ]}
                          defaultValue="1"
                        />
                        <SettingRow
                          name="cl_interp_ratio"
                          label="Interp ratio"
                          description="Interpolation ratio. Typical 1–2."
                          type="number"
                          min={1}
                          max={3}
                          step={0.1}
                          defaultValue="2"
                        />
                        <SettingRow
                          name="cl_interp"
                          label="Interp"
                          description="Interpolation amount in seconds. Typical 0.031."
                          type="number"
                          min={0.01}
                          max={0.1}
                          step={0.001}
                          defaultValue="0.031"
                        />
                        <SettingRow
                          name="cl_updaterate"
                          label="Update rate"
                          description="Server update rate (Hz). 64–128."
                          type="number"
                          min={32}
                          max={128}
                          step={1}
                          defaultValue="128"
                        />
                        <SettingRow
                          name="cl_cmdrate"
                          label="Client command rate"
                          description="Client command rate (Hz). 64–128."
                          type="number"
                          min={32}
                          max={128}
                          step={1}
                          defaultValue="128"
                        />
                        <SettingRow
                          name="mm_dedicated_search_maxping"
                          label="Matchmaking max ping"
                          description="Maximum acceptable ping in ms."
                          type="number"
                          min={30}
                          max={300}
                          step={1}
                          defaultValue="80"
                        />
                        <SettingRow
                          name="rate"
                          label="Network rate"
                          description="Max bytes per second. Typical 196608–786432."
                          type="number"
                          min={196608}
                          max={786432}
                          step={1024}
                          defaultValue="786432"
                        />
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                <p className="text-xs text-gray-300 py-2">Enable Settings to configure subcategories.</p>
              )}
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    </div>
  )
}