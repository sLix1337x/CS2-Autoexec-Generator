'use client'

import { useFormContext } from 'react-hook-form'
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
      <div className="flex items-center gap-2 text-white text-sm">
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

// Simple text input row for bind fields
function BindRow({ name, label, placeholder, description }: { name: keyof AutoexecFormValues; label: string; placeholder?: string; description?: string }) {
  const { register } = useFormContext<AutoexecFormValues>()
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-white text-sm">
        <span className="w-44 whitespace-nowrap">{label}</span>
        <input
          type="text"
          placeholder={placeholder}
          {...register(name as any)}
          className="flex-1 bg-[#282E22] border border-[#889180] text-white rounded px-2 py-1 text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      {description && <p className="text-xs text-gray-300">{description}</p>}
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

// Lightweight inline section switch for includeSections toggles
function SectionSwitch({ name, ariaLabel }: { name: keyof AutoexecFormValues['includeSections']; ariaLabel?: string }) {
  const { register } = useFormContext<AutoexecFormValues>()
  return (
    <label className="inline-flex items-center gap-2 text-white text-xs">
      <span className="sr-only">{ariaLabel ?? String(name)}</span>
      <input
        type="checkbox"
        className="h-4 w-4 accent-yellow-400"
        {...register(`includeSections.${name}` as const)}
        aria-label={ariaLabel ?? String(name)}
      />
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
// Add Game Settings keys (including Damage Prediction)
const GAME_KEYS = [
  'r_show_build_info',
  'cl_allow_animated_avatars',
  'cl_teamcounter_playercount_instead_of_avatars',
  // Removed 'fps_max' from Game Settings keys to make it independent
  'cl_predict_body_shot_fx',
  'cl_predict_head_shot_fx',
  'cl_predict_kill_ragdolls',
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
  const gameSettingsOn = watch('includeSections.gameSettings')
  const bindsOn = watch('includeSections.binds')
  const aliasesOn = watch('includeSections.aliases')
  // New per-binds section toggles
  const movementBindsOn = watch('includeSections.movementBinds')
  const weaponsActionBindsOn = watch('includeSections.weaponsActionBinds')
  const uiCommBindsOn = watch('includeSections.uiCommBinds')
  // Alias checkboxes (includeCommands)
  const aliasDropbombOn = watch('includeCommands.alias_dropbomb')
  const aliasCrosshairToggleOn = watch('includeCommands.alias_crosshair_toggle')

  // Derive parent toggles implicitly from sub-sections
  useEffect(() => {
    const derivedBindsOn = Boolean(movementBindsOn || weaponsActionBindsOn || uiCommBindsOn || aliasDropbombOn || aliasCrosshairToggleOn)
    setValue('includeSections.binds', derivedBindsOn)
  }, [movementBindsOn, weaponsActionBindsOn, uiCommBindsOn, aliasDropbombOn, aliasCrosshairToggleOn])

  // Ensure alias bind displays real key (not scancode) in UI
  useEffect(() => {
    const v = watch('dropbomb_bind' as any) as string | undefined
    if (typeof v === 'string' && v.toLowerCase().startsWith('scancode')) {
      setValue('dropbomb_bind' as any, '^')
    }
  }, [aliasDropbombOn, aliasCrosshairToggleOn])

  useEffect(() => {
    const derivedSettingsOn = Boolean(
      hudOn || crosshairOn || viewmodelOn || audioOn || networkOn || gameSettingsOn
    )
    setValue('includeSections.settings', derivedSettingsOn)
  }, [hudOn, crosshairOn, viewmodelOn, audioOn, networkOn, gameSettingsOn])

  useEffect(() => {
    const derivedAliasesOn = Boolean(aliasDropbombOn || aliasCrosshairToggleOn)
    setValue('includeSections.aliases', derivedAliasesOn)
  }, [aliasDropbombOn, aliasCrosshairToggleOn])

  // Panels open state
  const [bindsOpen, setBindsOpen] = useState(false)
  const [aliasesOpen, setAliasesOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  // Ensure FPS limit command is always included in output
  useEffect(() => {
    const v = watch('includeCommands.fps_max' as any)
    if (v === undefined) setValue('includeCommands.fps_max' as any, true)
  }, [])

  // Initialize includeCommands when subcategories are enabled
  useEffect(() => {
    const setKeys = (keys: string[], value: boolean) => {
      keys.forEach((k) => setValue(`includeCommands.${k}` as any, value))
    }

    if (!settingsOn) {
      setKeys([
        ...HUD_KEYS,
        ...CROSSHAIR_KEYS,
        ...VIEWMODEL_KEYS,
        ...AUDIO_KEYS,
        ...NETWORK_KEYS,
        ...GAME_KEYS,
      ], false)
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
    if (gameSettingsOn) {
      GAME_KEYS.forEach((k) => {
        const v = watch(`includeCommands.${k}` as any)
        if (v === undefined) setValue(`includeCommands.${k}` as any, true)
      })
    } else {
      setKeys(GAME_KEYS, false)
    }
  }, [settingsOn, hudOn, crosshairOn, viewmodelOn, audioOn, networkOn, gameSettingsOn])

  // Minimal UI while we validate parsing
  return (
    <div className="bg-[#3E4637] p-6 rounded-lg mb-8 md:mb-12 text-white">
      <div className="text-white px-4 py-2 mb-4">Choose which settings to include in your autoexec. Your final autoexec file will only include the options you check below.</div>

      {/* Console Color (always visible) */}
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

      {/* FPS Limit (always visible, above all panels) */}
      <div className="mb-4">
        <div className="bg-[#2A2F26] border border-[#889180] rounded p-3 space-y-3">
          <h4 className="text-white font-semibold text-sm font-ui">FPS Limit</h4>
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

      {/* Console Enable (always visible, below FPS Limit) */}
      <div className="mb-4">
        <div className="bg-[#2A2F26] border border-[#889180] rounded p-3 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-white font-semibold text-sm font-ui">Console</h4>
            <SettingCheckbox name="con_enable" label="" />
          </div>
          <p className="text-xs text-gray-300">Enable the developer console. Allows access to advanced commands and debugging.</p>
        </div>
      </div>

      {/* Presets */}
      <div className="mb-4">
        <h4 className="text-white font-semibold text-sm font-ui mb-2">PRESETS</h4>
        <div className="flex gap-2 mb-1">
          <button
            type="button"
            onClick={() => {
              // Check if everything is already selected by checking a few key sections
              const allSelected = watch('includeSections.binds') && 
                                watch('includeSections.settings') && 
                                watch('includeSections.aliases') &&
                                watch('includeCommands.fps_max');
              
              const newValue = !allSelected;
              
              // Toggle all includeSections
              setValue('includeSections.binds', newValue);
              setValue('includeSections.movementBinds', newValue);
              setValue('includeSections.weaponsActionBinds', newValue);
              setValue('includeSections.uiCommBinds', newValue);
              setValue('includeSections.customBinds', newValue);
              setValue('includeSections.aliases', newValue);
              setValue('includeSections.settings', newValue);
              setValue('includeSections.hud', newValue);
              setValue('includeSections.hudAdvanced', newValue);
              setValue('includeSections.mouseCrosshair', newValue);
              setValue('includeSections.viewmodel', newValue);
              setValue('includeSections.video', newValue);
              setValue('includeSections.sound', newValue);
              setValue('includeSections.rate', newValue);
              setValue('includeSections.additional', newValue);
              setValue('includeSections.gameSettings', newValue);
              setValue('includeSections.fpsMax', newValue);
              setValue('includeSections.teamEquipment', newValue);
              setValue('includeSections.audioBuffer', newValue);
              setValue('includeSections.headphoneAudio', newValue);
              setValue('includeSections.maxPing', newValue);
              setValue('includeSections.firstPersonTracers', newValue);
              
              // Toggle all includeCommands - aliases
              setValue('includeCommands.fps_max', newValue);
              setValue('includeCommands.alias_dropbomb', newValue);
              setValue('includeCommands.alias_crosshair_toggle', newValue);
              
              // Toggle all HUD commands
              HUD_KEYS.forEach((key) => setValue(`includeCommands.${key}`, newValue));
              
              // Toggle all CROSSHAIR commands
              CROSSHAIR_KEYS.forEach((key) => setValue(`includeCommands.${key}`, newValue));
              
              // Toggle all VIEWMODEL commands
              VIEWMODEL_KEYS.forEach((key) => setValue(`includeCommands.${key}`, newValue));
              
              // Toggle all AUDIO commands
              AUDIO_KEYS.forEach((key) => setValue(`includeCommands.${key}`, newValue));
              
              // Toggle all NETWORK commands
              NETWORK_KEYS.forEach((key) => setValue(`includeCommands.${key}`, newValue));
              
              // Toggle all GAME commands
              GAME_KEYS.forEach((key) => setValue(`includeCommands.${key}`, newValue));
            }}
            className="px-2 py-1 bg-[#6369D1] hover:bg-[#5B63C4] rounded text-white text-xs font-medium transition-colors"
          >
            SELECT ALL
          </button>
          <button
            type="button"
            onClick={() => {
              // Check if settings are already selected by checking key settings sections
              const settingsSelected = watch('includeSections.settings') && 
                                      watch('includeSections.hud') && 
                                      watch('includeSections.mouseCrosshair') &&
                                      watch('includeCommands.fps_max');
              
              const newValue = !settingsSelected;
              
              // Disable binds and aliases (always false when toggling settings)
              setValue('includeSections.binds', false);
              setValue('includeSections.movementBinds', false);
              setValue('includeSections.weaponsActionBinds', false);
              setValue('includeSections.uiCommBinds', false);
              setValue('includeSections.customBinds', false);
              setValue('includeSections.aliases', false);
              
              // Toggle only settings-related sections
              setValue('includeSections.settings', newValue);
              setValue('includeSections.hud', newValue);
              setValue('includeSections.hudAdvanced', newValue);
              setValue('includeSections.mouseCrosshair', newValue);
              setValue('includeSections.viewmodel', newValue);
              setValue('includeSections.video', newValue);
              setValue('includeSections.sound', newValue);
              setValue('includeSections.rate', newValue);
              setValue('includeSections.additional', newValue);
              setValue('includeSections.gameSettings', newValue);
              setValue('includeSections.fpsMax', newValue);
              setValue('includeSections.teamEquipment', newValue);
              setValue('includeSections.audioBuffer', newValue);
              setValue('includeSections.headphoneAudio', newValue);
              setValue('includeSections.maxPing', newValue);
              setValue('includeSections.firstPersonTracers', newValue);
              
              // Toggle settings-related commands, disable alias commands
              setValue('includeCommands.fps_max', newValue);
              setValue('includeCommands.alias_dropbomb', false);
              setValue('includeCommands.alias_crosshair_toggle', false);
              
              // Toggle all HUD commands
              HUD_KEYS.forEach((key) => setValue(`includeCommands.${key}`, newValue));
              
              // Toggle all CROSSHAIR commands
              CROSSHAIR_KEYS.forEach((key) => setValue(`includeCommands.${key}`, newValue));
              
              // Toggle all VIEWMODEL commands
              VIEWMODEL_KEYS.forEach((key) => setValue(`includeCommands.${key}`, newValue));
              
              // Toggle all AUDIO commands
              AUDIO_KEYS.forEach((key) => setValue(`includeCommands.${key}`, newValue));
              
              // Toggle all NETWORK commands
              NETWORK_KEYS.forEach((key) => setValue(`includeCommands.${key}`, newValue));
              
              // Toggle all GAME commands
              GAME_KEYS.forEach((key) => setValue(`includeCommands.${key}`, newValue));
            }}
            className="px-2 py-1 bg-[#6369D1] hover:bg-[#5B63C4] rounded text-white text-xs font-medium transition-colors"
          >
            ONLY SETTINGS
          </button>
        </div>
        <p className="text-xs text-gray-400">Quick selection presets for fast configuration.</p>
      </div>

      {/* Key Bindings Panel */}
      <div className="mb-4">
        <Collapsible.Root open={bindsOpen} onOpenChange={setBindsOpen}>
          <Collapsible.Trigger asChild>
            <button type="button" className="collapsible-trigger">
              <span className="text-white font-semibold font-ui text-sm">KEY BINDINGS - Custom Key Bindings</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${bindsOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
          </Collapsible.Trigger>
          <div className="text-gray-300 text-xs mt-1 px-2">Assign any in-game action to any key you want.</div>
          <Collapsible.Content>
            <div className="space-y-3 py-2">
              {/* Movement Binds */}
              <div className="bg-[#2A2F26] border border-[#889180] rounded p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-semibold text-sm font-ui">Movement Binds</h4>
                  <SectionSwitch name="movementBinds" ariaLabel="Enable Movement binds" />
                </div>
                {movementBindsOn && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <BindRow name="forward_bind" label="Forward (+forward)" placeholder="W" description="Key to move forward" />
                    <BindRow name="moveleft_bind" label="Strafe Left (+moveleft)" placeholder="A" description="Key to strafe left" />
                    <BindRow name="back_bind" label="Backward (+back)" placeholder="S" description="Key to move backward" />
                    <BindRow name="moveright_bind" label="Strafe Right (+moveright)" placeholder="D" description="Key to strafe right" />
                    <BindRow name="jump_bind" label="Jump (+jump)" placeholder="SPACE" description="Key to jump" />
                    <BindRow name="duck_bind" label="Crouch (+duck)" placeholder="LEFT CTRL" description="Key to crouch" />
                    <BindRow name="walk_bind" label="Walk (+walk)" placeholder="LEFT SHIFT" description="Key to walk (hold for +walk)" />
                  </div>
                )}
              </div>

              {/* Weapons & Actions Binds */}
              <div className="bg-[#2A2F26] border border-[#889180] rounded p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-semibold text-sm font-ui">Weapons & Actions</h4>
                  <SectionSwitch name="weaponsActionBinds" ariaLabel="Enable Weapons & Actions binds" />
                </div>
                {weaponsActionBindsOn && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <BindRow name="slot1_bind" label="Primary (slot1)" placeholder="1" description="Select primary weapon" />
                    <BindRow name="slot2_bind" label="Secondary (slot2)" placeholder="2" description="Select secondary weapon" />
                    <BindRow name="slot2_bind_alt" label="Quick Switch (slot2 alt)" placeholder="Q" description="Alternative quick switch to secondary" />
                    <BindRow name="slot4_bind" label="Grenades (slot4)" placeholder="4" description="Grenades" />
                    <BindRow name="slot5_bind" label="Bomb (slot5)" placeholder="5" description="Bomb" />
                    <BindRow name="use_bind" label="Use (+use)" placeholder="E" description="Use/defuse" />
                    <BindRow name="reload_bind" label="Reload (+reload)" placeholder="R" description="Reload weapon" />
                    <BindRow name="drop_bind" label="Drop (drop)" placeholder="G" description="Drop weapon" />
                  </div>
                )}
              </div>

              {/* UI & Communication Binds */}
              <div className="bg-[#2A2F26] border border-[#889180] rounded p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-semibold text-sm font-ui">UI & Communication</h4>
                  <SectionSwitch name="uiCommBinds" ariaLabel="Enable UI & Communication binds" />
                </div>
                {uiCommBindsOn && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <BindRow name="scoreboard_bind" label="Scoreboard (+showscores)" placeholder="TAB" description="Open scoreboard" />
                    <BindRow name="teammenu_bind" label="Team Menu (teammenu)" placeholder="M" description="Open team menu" />
                    <BindRow name="voice_bind" label="Voice (+voicerecord)" placeholder="T" description="Push-to-talk" />
                    <BindRow name="allchat_bind" label="All Chat (messagemode)" placeholder="Y" description="Open all chat" />
                    <BindRow name="teamchat_bind" label="Team Chat (messagemode2)" placeholder="U" description="Open team chat" />
                    <BindRow name="toggleconsole_bind" label="Toggle Console" placeholder="F9" description="Toggle developer console" />
                  </div>
                )}
              </div>

              {/* Alias Binds — shown only if alias enabled */}
              {aliasDropbombOn && (
                <div className="bg-[#2A2F26] border border-[#889180] rounded p-3 space-y-3">
                  <h4 className="text-white font-semibold text-sm font-ui">Alias Binds</h4>
                  <div className="space-y-2">
                    <BindRow name="dropbomb_bind" label="Fast Bomb Drop key" placeholder="^" description="Key used to trigger +dropbomb alias" />
                    <p className="text-xs text-gray-300">Enable the alias under the Aliases panel to include its commands in output.</p>
                  </div>
                </div>
              )}

              {aliasCrosshairToggleOn && (
                <div className="bg-[#2A2F26] border border-[#889180] rounded p-3 space-y-3">
                  <h4 className="text-white font-semibold text-sm font-ui">Crosshair Toggle Bind</h4>
                  <div className="space-y-2">
                    <BindRow name="crosshair_toggle_bind" label="Toggle Crosshair Color key" placeholder="LEFTARROW" description="Key used to trigger toggle_crosshair_color alias" />
                    <p className="text-xs text-gray-300">Enable the alias under the Aliases panel to include its commands in output.</p>
                  </div>
                </div>
              )}
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>

      {/* Aliases Panel */}
      <div className="mb-4">
        <Collapsible.Root open={aliasesOpen} onOpenChange={setAliasesOpen}>
          <Collapsible.Trigger asChild>
            <button type="button" className="collapsible-trigger">
              <span className="text-white font-semibold font-ui text-sm">ALIASES - Smart Command Shortcuts</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${aliasesOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
          </Collapsible.Trigger>
          <div className="text-gray-300 text-xs mt-1 px-2">Choose powerful multi-command shortcuts that execute several actions with a single keypress.</div>
          <Collapsible.Content>
            <div className="space-y-3 py-2">
              <div className="bg-[#2A2F26] border border-[#889180] rounded p-3 space-y-3">
                <h4 className="text-white font-semibold text-sm font-ui">Fast Bomb Drop</h4>
                <div className="space-y-2">
                  <SettingCheckbox name="alias_dropbomb" label="Fast Bomb Drop" />
                  <p className="text-xs text-gray-300">
                    Press: slot3; slot5;. Release: drop; slot1;. Configure its key under Bind Settings → Alias Binds.
                  </p>
                </div>
              </div>
              <div className="bg-[#2A2F26] border border-[#889180] rounded p-3 space-y-3">
                <h4 className="text-white font-semibold text-sm font-ui">Crosshair Toggle</h4>
                <div className="space-y-2">
                  <SettingCheckbox name="alias_crosshair_toggle" label="Toggle Crosshair Color" />
                  <p className="text-xs text-gray-300">
                    Toggle between yellow and white crosshair colors. Configure its key under Bind Settings → Alias Binds.
                  </p>
                </div>
              </div>
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>

      {/* Settings Panel */}
      <div className="mb-4">
        <Collapsible.Root open={settingsOpen} onOpenChange={setSettingsOpen}>
          <Collapsible.Trigger asChild>
            <button type="button" className="collapsible-trigger">
              <span className="text-white font-semibold font-ui text-sm">SETTINGS - Game Settings & Optimizations</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${settingsOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
          </Collapsible.Trigger>
          <div className="text-gray-300 text-xs mt-1 px-2">Fine-tune every aspect of your CS2 experience. Adjust everything from crosshair appearance and HUD elements to network settings and graphics settings.</div>
          <Collapsible.Content>
            <div className="space-y-3 py-2">
              {/* HUD */}
              <div className="bg-[#2A2F26] border border-[#889180] rounded p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-semibold text-sm font-ui">HUD</h4>
                  <SectionSwitch name="hud" ariaLabel="Enable HUD settings" />
                </div>
                {hudOn && (
                  <div className="space-y-3">
                    <SettingRow
                      name="cl_use_weapon_rarity_as_selection_color"
                      label="Use weapon rarity as selection color"
                      description="Use weapon rarity highlighting for selection color. 0 = Off, 1 = On. Default is 0."
                      type="select"
                      options={[
                        { value: '0', label: 'Off' },
                        { value: '1', label: 'On' },
                      ]}
                      defaultValue="0"
                    />
                    <SettingRow
                      name="cl_hud_color"
                      label="HUD color (index)"
                      description="Change HUD color via index. 0 = Default. Other values depend on game palette."
                      type="select"
                      options={[
                        { value: '0', label: 'Default' },
                        { value: '1', label: '1' },
                        { value: '2', label: '2' },
                        { value: '3', label: '3' },
                        { value: '4', label: '4' },
                        { value: '5', label: '5' },
                        { value: '6', label: '6' },
                        { value: '7', label: '7' },
                        { value: '8', label: '8' },
                        { value: '9', label: '9' },
                        { value: '10', label: '10' },
                      ]}
                      defaultValue="0"
                    />
                    <SettingRow
                      name="cl_radar_rotate"
                      label="Rotate radar"
                      description="Rotate radar to match player orientation. 0 = Off, 1 = On. Default is 1."
                      type="select"
                      options={[
                        { value: '0', label: 'Off' },
                        { value: '1', label: 'On' },
                      ]}
                      defaultValue="1"
                    />
                    <SettingRow
                      name="cl_hud_radar_scale"
                      label="Radar scale"
                      description="Controls size of the radar HUD element. Typical range 0.8–1.3. Default is 1.0."
                      type="number"
                      step={0.05}
                      min={0.5}
                      max={2}
                      defaultValue="1.0"
                    />
                    <SettingRow
                      name="hud_scaling"
                      label="HUD scaling"
                      description="Overall HUD scale. Typical range 0.5–1.3. Default is 1.0."
                      type="number"
                      step={0.05}
                      min={0.5}
                      max={2}
                      defaultValue="1.0"
                    />
                    <SettingRow
                      name="cl_show_team_equipment"
                      label="Show team equipment"
                      description="Show teammates’ equipment on HUD. 0 = Off, 1 = On. Default is 1."
                      type="select"
                      options={[
                        { value: '0', label: 'Off' },
                        { value: '1', label: 'On' },
                      ]}
                      defaultValue="1"
                    />
                    <SettingRow
                      name="r_drawtracers_firstperson"
                      label="First-person tracers"
                      description="Render bullet tracers in first-person. 0 = Off, 1 = On. Default is 1."
                      type="select"
                      options={[
                        { value: '0', label: 'Off' },
                        { value: '1', label: 'On' },
                      ]}
                      defaultValue="1"
                    />
                  </div>
                )}
              </div>

              {/* Mouse & Crosshair */}
              <div className="bg-[#2A2F26] border border-[#889180] rounded p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-semibold text-sm font-ui">Mouse & Crosshair</h4>
                  <SectionSwitch name="mouseCrosshair" ariaLabel="Enable Mouse & Crosshair settings" />
                </div>
                {crosshairOn && (
                  <div className="space-y-3">
                    <SettingRow
                      name="cl_crosshairalpha"
                      label="Crosshair transparency (alpha)"
                      description="0–255. Default is 255."
                      type="number"
                      step={1}
                      min={0}
                      max={255}
                      defaultValue="255"
                    />
                    <SettingRow
                      name="cl_crosshaircolor_r"
                      label="Crosshair color — Red (R)"
                      description="0–255. Default is 255."
                      type="number"
                      step={1}
                      min={0}
                      max={255}
                      defaultValue="255"
                    />
                    <SettingRow
                      name="cl_crosshaircolor_g"
                      label="Crosshair color — Green (G)"
                      description="0–255. Default is 255."
                      type="number"
                      step={1}
                      min={0}
                      max={255}
                      defaultValue="255"
                    />
                    <SettingRow
                      name="cl_crosshaircolor_b"
                      label="Crosshair color — Blue (B)"
                      description="0–255. Default is 255."
                      type="number"
                      step={1}
                      min={0}
                      max={255}
                      defaultValue="255"
                    />
                    <SettingRow
                      name="cl_crosshair_t"
                      label="T-crosshair"
                      description="Enable T-shaped crosshair. 0 = Off, 1 = On. Default is 0."
                      type="select"
                      options={[
                        { value: '0', label: 'Off' },
                        { value: '1', label: 'On' },
                      ]}
                      defaultValue="0"
                    />
                    <SettingRow
                      name="cl_crosshairgap_useweaponvalue"
                      label="Use weapon gap value"
                      description="Use weapon-defined crosshair gap. 0 = Off, 1 = On. Default is 0."
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
                      description="General mouse sensitivity. Default varies (e.g., 2.5)."
                      type="number"
                      step={0.01}
                      min={0}
                      defaultValue="2.5"
                    />
                    <SettingRow
                      name="zoom_sensitivity_ratio_mouse"
                      label="Zoom sensitivity ratio (ADS)"
                      description="Sensitivity multiplier when zoomed/ADS. Typical 1.0. Default 1.0."
                      type="number"
                      step={0.01}
                      min={0}
                      defaultValue="1.0"
                    />
                  </div>
                )}
              </div>

              {/* Viewmodel */}
              <div className="bg-[#2A2F26] border border-[#889180] rounded p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-semibold text-sm font-ui">Viewmodel</h4>
                  <SectionSwitch name="viewmodel" ariaLabel="Enable Viewmodel settings" />
                </div>
                {viewmodelOn && (
                  <div className="space-y-3">
                    <SettingRow
                      name="viewmodel_fov"
                      label="Viewmodel FOV"
                      description="Field of view for weapon model. Range ~54–68. Default 60–68."
                      type="number"
                      step={1}
                      min={54}
                      max={68}
                      defaultValue="68"
                    />
                    <SettingRow
                      name="viewmodel_offset_x"
                      label="Viewmodel offset X"
                      description="Horizontal offset of viewmodel. Range ~-2 to 2."
                      type="number"
                      step={0.05}
                      min={-2}
                      max={2}
                      defaultValue="0"
                    />
                    <SettingRow
                      name="viewmodel_offset_y"
                      label="Viewmodel offset Y"
                      description="Vertical offset of viewmodel. Range ~-2 to 2."
                      type="number"
                      step={0.05}
                      min={-2}
                      max={2}
                      defaultValue="0"
                    />
                    <SettingRow
                      name="viewmodel_offset_z"
                      label="Viewmodel offset Z"
                      description="Depth offset of viewmodel. Range ~-2 to 2."
                      type="number"
                      step={0.05}
                      min={-2}
                      max={2}
                      defaultValue="0"
                    />
                    <SettingRow
                      name="viewmodel_presetpos"
                      label="Viewmodel preset"
                      description="Preset position for viewmodel. Use 0–3; 3 enables custom offsets."
                      type="select"
                      options={[
                        { value: '0', label: '0' },
                        { value: '1', label: '1' },
                        { value: '2', label: '2' },
                        { value: '3', label: '3' },
                      ]}
                      defaultValue="3"
                    />
                  </div>
                )}
              </div>

              {/* Audio */}
              <div className="bg-[#2A2F26] border border-[#889180] rounded p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-semibold text-sm font-ui">Audio</h4>
                  <SectionSwitch name="sound" ariaLabel="Enable Audio settings" />
                </div>
                {audioOn && (
                  <div className="space-y-3">
                    <SettingRow
                      name="volume"
                      label="Master volume"
                      description="0.00–1.00. Default ~0.8."
                      type="number"
                      step={0.01}
                      min={0}
                      max={1}
                      defaultValue="0.8"
                    />
                    <SettingRow
                      name="snd_headphone_eq"
                      label="Headphone EQ"
                      description="Enable headphone EQ profile. 0 = Off, 1 = On. Default 1."
                      type="select"
                      options={[
                        { value: '0', label: 'Off' },
                        { value: '1', label: 'On' },
                      ]}
                      defaultValue="1"
                    />
                    <SettingRow
                      name="snd_mixahead"
                      label="Audio mix-ahead"
                      description="Audio buffer size. Lower values reduce latency. Typical 0.05–0.10."
                      type="number"
                      step={0.01}
                      min={0}
                      max={1}
                      defaultValue="0.05"
                    />
                    <SettingRow
                      name="snd_spatialize_lerp"
                      label="Spatialize lerp"
                      description="Controls spatialization smoothing. 0.0–1.0. Default 0.5."
                      type="number"
                      step={0.01}
                      min={0}
                      max={1}
                      defaultValue="0.5"
                    />
                    <SettingRow
                      name="snd_menumusic_volume"
                      label="Menu music volume"
                      description="0.00–1.00. Default 0.00."
                      type="number"
                      step={0.01}
                      min={0}
                      max={1}
                      defaultValue="0.00"
                    />
                    <SettingRow
                      name="snd_mute_mvp_music_live_players"
                      label="Mute MVP music for live players"
                      description="Mute MVP music when players are still alive. 0 = Off, 1 = On. Default 1."
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
                      description="Automatically detect audio latency. 0 = Off, 1 = On. Default 1."
                      type="select"
                      options={[
                        { value: '0', label: 'Off' },
                        { value: '1', label: 'On' },
                      ]}
                      defaultValue="1"
                    />
                  </div>
                )}
              </div>

              {/* Network Rate */}
              <div className="bg-[#2A2F26] border border-[#889180] rounded p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-semibold text-sm font-ui">Network Rate</h4>
                  <SectionSwitch name="rate" ariaLabel="Enable Network settings" />
                </div>
                {networkOn && (
                  <div className="space-y-3">
                    <SettingRow
                      name="cl_invites_only_friends"
                      label="Invites: friends only"
                      description="Restrict invites to friends only. 0 = Off, 1 = On. Default 1."
                      type="select"
                      options={[
                        { value: '0', label: 'Off' },
                        { value: '1', label: 'On' },
                      ]}
                      defaultValue="1"
                    />
                    <SettingRow
                      name="cl_invites_only_mainmenu"
                      label="Invites: main menu only"
                      description="Only allow invites from main menu. 0 = Off, 1 = On. Default 0."
                      type="select"
                      options={[
                        { value: '0', label: 'Off' },
                        { value: '1', label: 'On' },
                      ]}
                      defaultValue="0"
                    />
                    <SettingRow
                      name="cl_join_advertise"
                      label="Advertise lobby"
                      description="Advertise your lobby to friends. 0 = Off, 1 = On. Default 0."
                      type="select"
                      options={[
                        { value: '0', label: 'Off' },
                        { value: '1', label: 'On' },
                      ]}
                      defaultValue="0"
                    />
                    <SettingRow
                      name="cl_clock_correction"
                      label="Clock correction"
                      description="Enable client clock correction. 0 = Off, 1 = On."
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
                      description="Interpolation ratio (1 or 2 recommended)."
                      type="select"
                      options={[
                        { value: '1', label: '1' },
                        { value: '2', label: '2' },
                      ]}
                      defaultValue="2"
                    />
                    <SettingRow
                      name="cl_interp"
                      label="Interpolation (seconds)"
                      description="Interpolation time. Typical values around 0.031 for 64 tick; 0 for auto."
                      type="number"
                      step={0.001}
                      min={0}
                      defaultValue="0.031"
                    />
                    <SettingRow
                      name="cl_updaterate"
                      label="Updaterate (tick rate)"
                      description="Updates per second. 64 or 128."
                      type="select"
                      options={[
                        { value: '64', label: '64' },
                        { value: '128', label: '128' },
                      ]}
                      defaultValue="128"
                    />
                    <SettingRow
                      name="cl_cmdrate"
                      label="Cmdrate (send rate)"
                      description="Commands per second. 64 or 128."
                      type="select"
                      options={[
                        { value: '64', label: '64' },
                        { value: '128', label: '128' },
                      ]}
                      defaultValue="128"
                    />
                    <SettingRow
                      name="mm_dedicated_search_maxping"
                      label="Max matchmaking ping"
                      description="Maximum ping allowed for matchmaking servers (ms)."
                      type="number"
                      step={1}
                      min={10}
                      max={300}
                      defaultValue="60"
                    />
                    <SettingRow
                      name="rate"
                      label="Rate (bytes/sec)"
                      description="Max data rate (bytes/sec). Common values: 786432 (768 KB/s) or 1048576 (1 MB/s)."
                      type="number"
                      step={1024}
                      min={65536}
                      max={1048576}
                      defaultValue="1048576"
                    />
                  </div>
                )}
              </div>

              {/* Game Settings + Damage Prediction */}
              <div className="bg-[#2A2F26] border border-[#889180] rounded p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-semibold text-sm font-ui">Game Settings</h4>
                  <SectionSwitch name="gameSettings" ariaLabel="Enable Game Settings" />
                </div>
                {gameSettingsOn && (
                  <div className="space-y-3">
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
                    </div>

                    <div className="space-y-3">
                      <h5 className="text-white font-semibold text-xs font-ui">Damage Prediction</h5>
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
                  </div>
                )}
              </div>
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>

      </div>
  )
}