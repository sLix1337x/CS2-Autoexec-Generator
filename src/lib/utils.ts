import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// CS2 Autoexec Generator Utilities

// Generate autoexec content from form data
export function generateAutoexecContent(formData: any, options?: { includeTimestamp?: boolean }): string[] {
  const content: string[] = [];
  
  // Helper function for consistent alignment
  const formatCommand = (command: string, value: string, description?: string): string => {
    const commandPart = command;
    const valuePart = `"${value}";`;
    
    // Align values at column 60, comments at column 90
    const valueSpacing = ' '.repeat(Math.max(1, 60 - commandPart.length));
    const commentSpacing = ' '.repeat(Math.max(1, 90 - (commandPart.length + valueSpacing.length + valuePart.length)));
    
    return description !== undefined
      ? `${commandPart}${valueSpacing}${valuePart}${commentSpacing}// ${description}`
      : `${commandPart}${valueSpacing}${valuePart}`;
  };

  // Console color command (always first)
  const colorMap: Record<string, string> = {
    pink: 'FF25FFFF',
    lightblue: '6495EDFF',
    orange: 'FF7F50FF',
    yellow: 'FFD700FF',
    green: '008000FF',
    red: 'AF0000FF'
  };
  const selectedColor = formData.consoleColor || 'pink';
  const colorCode = colorMap[selectedColor] || colorMap.pink;
  content.push(formatCommand('log_color "Console"', colorCode, 'Console text color'));
  content.push('');

  // Initialization header messages
  content.push('echo |                                     [AUTOEXEC] Initializing configuration... [AUTOEXEC]');
  content.push('echo |                                     [AUTOEXEC] Initializing configuration... [AUTOEXEC]');
  content.push('echo |                                     [AUTOEXEC] Initializing configuration... [AUTOEXEC]');
  content.push('');

  // Utility to check if a per-setting checkbox is enabled
  const shouldInclude = (key: string) => Boolean(formData?.includeCommands?.[key]);

  // Basic commands (always included)
  content.push(formatCommand('m_yaw', '.022', 'Mouse yaw sensitivity multiplier'));
  content.push(formatCommand('bind mouse_x', 'yaw', 'Bind horizontal mouse movement to yaw'));
  content.push(formatCommand('bind mouse_y', 'pitch', 'Bind vertical mouse movement to pitch'));
  content.push('');

  // BINDS section header
  if (formData.includeSections?.binds) {
    content.push('//====================//');
    content.push('//       BINDS        //');
    content.push('//====================//');
    content.push('');
    // Build binds from individual form fields if a consolidated 'binds' record is not provided
    const fieldToCommand: Record<string, string> = {
      voice_bind: '+voicerecord',
      radio_bind: 'radio',
      scoreboard_bind: '+showscores',
      drop_bind: 'drop',
      use_bind: '+use',
      reload_bind: '+reload',
      jump_bind: '+jump',
      duck_bind: '+duck',
      walk_bind: '+speed',
      slot1_bind: 'slot1',
      slot2_bind: 'slot2',
      slot3_bind: 'slot3',
      slot4_bind: 'slot4',
      slot5_bind: 'slot5',
      slot6_bind: 'slot6',
      slot7_bind: 'slot7',
      slot8_bind: 'slot8',
      slot9_bind: 'slot9',
      slot10_bind: 'slot10',
      buymenu_bind: 'buymenu',
      toggleconsole_bind: 'toggleconsole',
      cleardecals_bind: 'r_cleardecals',
      inspect_bind: '+lookatweapon',
    };
    const inferredBinds: Record<string, string> = {};
    Object.entries(fieldToCommand).forEach(([field, command]) => {
      const key = (formData as any)[field];
      if (key && key !== 'none' && key !== '') {
        inferredBinds[command] = key;
      }
    });
    const bindsSource = (formData as any).binds ?? inferredBinds;
    if (bindsSource && Object.keys(bindsSource).length > 0) {
      content.push('    // MOVEMENT //');
      Object.entries(bindsSource).forEach(([command, key]) => {
        if (key && command) {
          content.push(formatCommand(`bind "${key}"`, command));
        }
      });
    } else {
      // Add example bind from template if no binds are configured
      content.push('    // MOVEMENT //');
      content.push(formatCommand('bind "key"', 'command', 'Example bind command'));
    }
    content.push('');

    // Custom binds (only if explicitly enabled)
    if (formData.includeSections?.customBinds) {
      content.push('    // CROSSHAIR //');
      content.push(formatCommand('bind "LEFTARROW"', 'toggle_crosshair_color', 'Change crosshair color with left arrow key'));
      if (formData.customBinds && formData.customBinds.length > 0) {
        formData.customBinds.forEach((bind: {key: string, command: string}) => {
          if (bind.key && bind.command) {
            content.push(formatCommand(`bind "${bind.key}"`, bind.command));
          }
        });
      }
      content.push('');
    }
  }

  // ALIASES section
  if (formData.includeSections?.aliases) {
    content.push('//====================//');
    content.push('//      ALIASES       //');
    content.push('//====================//');
    content.push('');
    content.push('    // CROSSHAIR //');
    content.push(formatCommand('alias "toggle_crosshair_color"', 'toggle cl_crosshaircolor_b 0 255', 'Toggle crosshair color between blue and green'));
    content.push('');
  }

  // SETTINGS section (conditional with per-setting checkboxes)
  if (formData.includeSections?.settings) {
    content.push('//====================//');
    content.push('//       SETTINGS     //');
    content.push('//====================//');
    content.push('');

    // FPS Settings (optional)
    if (formData.includeSections?.fpsMax) {
      content.push(formatCommand('fps_max', formData.fps_max || '0', 'Maximum FPS limit (0 = unlimited)'));
      content.push('');
    }

    // HUD SETTINGS
    const hudLines: string[] = [];
    if (shouldInclude('cl_use_weapon_rarity_as_selection_color')) hudLines.push(formatCommand('cl_use_weapon_rarity_as_selection_color', formData.cl_use_weapon_rarity_as_selection_color || '1', 'Use weapon rarity colors'));
    if (shouldInclude('cl_hud_color')) hudLines.push(formatCommand('cl_hud_color', formData.cl_hud_color || '3', 'Light Blue'));
    if (shouldInclude('cl_radar_rotate')) hudLines.push(formatCommand('cl_radar_rotate', formData.cl_radar_rotate || '0', 'Rotate radar with player'));
    if (shouldInclude('cl_hud_radar_scale')) hudLines.push(formatCommand('cl_hud_radar_scale', formData.cl_hud_radar_scale || '1.30', 'HUD radar scale'));
    if (shouldInclude('hud_scaling')) hudLines.push(formatCommand('hud_scaling', formData.hud_scaling || '0.85', 'HUD scaling factor'));
    if (shouldInclude('cl_show_team_equipment')) hudLines.push(formatCommand('cl_show_team_equipment', formData.cl_show_team_equipment || '1', 'Show teammate equipment'));
    if (shouldInclude('r_drawtracers_firstperson')) hudLines.push(formatCommand('r_drawtracers_firstperson', formData.r_drawtracers_firstperson || '1', 'Show bullet tracers in first person view'));
    if (hudLines.length) {
      content.push('    // HUD //');
      hudLines.forEach((l) => content.push(l));
      content.push('');
    }

    // CROSSHAIR & SENSITIVITY
    const crossLines: string[] = [];
    if (shouldInclude('cl_crosshairalpha')) crossLines.push(formatCommand('cl_crosshairalpha', formData.cl_crosshairalpha || '255', 'Crosshair transparency (0-255)'));
    if (shouldInclude('cl_crosshaircolor_r')) crossLines.push(formatCommand('cl_crosshaircolor_r', formData.cl_crosshaircolor_r || '255', 'Custom crosshair red value (0-255)'));
    if (shouldInclude('cl_crosshaircolor_g')) crossLines.push(formatCommand('cl_crosshaircolor_g', formData.cl_crosshaircolor_g || '255', 'Custom crosshair green value (0-255)'));
    if (shouldInclude('cl_crosshaircolor_b')) crossLines.push(formatCommand('cl_crosshaircolor_b', formData.cl_crosshaircolor_b || '0', 'Custom crosshair blue value (0-255)'));
    if (shouldInclude('cl_crosshair_t')) crossLines.push(formatCommand('cl_crosshair_t', formData.cl_crosshair_t || '0', 'T-style crosshair (0=off, 1=on)'));
    if (shouldInclude('cl_crosshairgap_useweaponvalue')) crossLines.push(formatCommand('cl_crosshairgap_useweaponvalue', formData.cl_crosshairgap_useweaponvalue || '0', 'Use weapon-specific crosshair gap'));
    if (shouldInclude('sensitivity')) crossLines.push(formatCommand('sensitivity', formData.sensitivity || '2.5', 'Mouse sensitivity'));
    if (shouldInclude('zoom_sensitivity_ratio_mouse')) crossLines.push(formatCommand('zoom_sensitivity_ratio_mouse', formData.zoom_sensitivity_ratio_mouse || '1.0', 'Zoom sensitivity multiplier'));
    if (crossLines.length) {
      content.push('    // CROSSHAIR & SENSITIVITY //');
      crossLines.forEach((l) => content.push(l));
      content.push('');
    }

    // VIEWMODEL SETTINGS
    const viewLines: string[] = [];
    if (shouldInclude('viewmodel_fov')) {
      viewLines.push(
        formatCommand(
          'viewmodel_fov',
          formData.viewmodel_fov || '60',
          'Viewmodel field of view (54–68)'
        )
      )
    }
    if (shouldInclude('viewmodel_offset_x')) {
      viewLines.push(
        formatCommand(
          'viewmodel_offset_x',
          formData.viewmodel_offset_x || '0',
          'Viewmodel horizontal offset (−2.0–2.5)'
        )
      )
    }
    if (shouldInclude('viewmodel_offset_y')) {
      viewLines.push(
        formatCommand(
          'viewmodel_offset_y',
          formData.viewmodel_offset_y || '0',
          'Viewmodel forward/back offset (−2.0–2.0)'
        )
      )
    }
    if (shouldInclude('viewmodel_offset_z')) {
      viewLines.push(
        formatCommand(
          'viewmodel_offset_z',
          formData.viewmodel_offset_z || '-1.5',
          'Viewmodel vertical offset (−2.0–2.0)'
        )
      )
    }
    if (shouldInclude('viewmodel_presetpos')) {
      viewLines.push(
        formatCommand(
          'viewmodel_presetpos',
          formData.viewmodel_presetpos || '1',
          'Viewmodel preset position (0=Custom, 1=Desktop, 2=Couch, 3=Classic)'
        )
      )
    }

    if (viewLines.length) {
      content.push('    // VIEWMODEL //');
      viewLines.forEach((l) => content.push(l));
      content.push('');
    }

    // AUDIO SETTINGS
    const audioLines: string[] = [];
    if (shouldInclude('volume')) audioLines.push(formatCommand('volume', formData.volume || '1.0', 'Master game volume'));
    if (shouldInclude('snd_headphone_eq')) audioLines.push(formatCommand('snd_headphone_eq', formData.snd_headphone_eq || '1', 'Headphone equalization mode'));
    if (shouldInclude('snd_mixahead')) audioLines.push(formatCommand('snd_mixahead', formData.snd_mixahead || '0.001', 'Audio buffer size for reduced latency'));
    if (shouldInclude('snd_spatialize_lerp')) audioLines.push(formatCommand('snd_spatialize_lerp', formData.snd_spatialize_lerp || '0.8', 'Audio spatialization interpolation'));
    if (shouldInclude('snd_menumusic_volume')) audioLines.push(formatCommand('snd_menumusic_volume', formData.snd_menumusic_volume || '0', 'Menu music volume'));
    if (shouldInclude('snd_mute_mvp_music_live_players')) audioLines.push(formatCommand('snd_mute_mvp_music_live_players', formData.snd_mute_mvp_music_live_players || '1', 'Mute MVP music when players alive'));
    if (shouldInclude('snd_autodetect_latency')) audioLines.push(formatCommand('snd_autodetect_latency', formData.snd_autodetect_latency || '1', 'Auto-detect audio latency'));
    if (audioLines.length) {
      content.push('    // AUDIO //');
      audioLines.forEach((l) => content.push(l));
      content.push('');
    }

    // NETWORK SETTINGS
    const netLines: string[] = [];
    if (shouldInclude('cl_invites_only_friends')) netLines.push(formatCommand('cl_invites_only_friends', formData.cl_invites_only_friends ?? defaultAutoexecValues.cl_invites_only_friends, 'restrict invites'))
    if (shouldInclude('cl_invites_only_mainmenu')) netLines.push(formatCommand('cl_invites_only_mainmenu', formData.cl_invites_only_mainmenu ?? defaultAutoexecValues.cl_invites_only_mainmenu, 'invites only in main menu'))
    if (shouldInclude('cl_join_advertise')) netLines.push(formatCommand('cl_join_advertise', formData.cl_join_advertise ?? defaultAutoexecValues.cl_join_advertise, 'allow friends to join'))
    if (shouldInclude('cl_clock_correction')) netLines.push(formatCommand('cl_clock_correction', formData.cl_clock_correction ?? defaultAutoexecValues.cl_clock_correction, 'clock correction'))
    if (shouldInclude('cl_interp_ratio')) netLines.push(formatCommand('cl_interp_ratio', formData.cl_interp_ratio ?? defaultAutoexecValues.cl_interp_ratio, 'interp ratio'))
    if (shouldInclude('cl_interp')) netLines.push(formatCommand('cl_interp', formData.cl_interp ?? defaultAutoexecValues.cl_interp, 'interp delay'))
    if (shouldInclude('cl_updaterate')) netLines.push(formatCommand('cl_updaterate', formData.cl_updaterate ?? defaultAutoexecValues.cl_updaterate, 'update rate'))
    if (shouldInclude('cl_cmdrate')) netLines.push(formatCommand('cl_cmdrate', formData.cl_cmdrate ?? defaultAutoexecValues.cl_cmdrate, 'command rate'))
    if (shouldInclude('mm_dedicated_search_maxping')) netLines.push(formatCommand('mm_dedicated_search_maxping', formData.mm_dedicated_search_maxping ?? defaultAutoexecValues.mm_dedicated_search_maxping, 'matchmaking max ping (ms)'))
    if (shouldInclude('rate')) netLines.push(formatCommand('rate', formData.rate ?? defaultAutoexecValues.rate, 'bandwidth rate'))
    if (netLines.length) {
      content.push('    // NETWORK //');
      netLines.forEach((l) => content.push(l));
      content.push('');
    }
  }

  // Additional Commands
  if (formData.additionalCommands && formData.includeSections?.additional) {
    content.push('// --- ADDITIONAL COMMANDS ---');
    formData.additionalCommands.split('\n').forEach((cmd: string) => {
      if (cmd.trim()) content.push(cmd.trim());
    });
    content.push('');
  }

  // Network Troubleshooting Settings (only if explicitly enabled)
  if (formData.includeNetworkTroubleshooting) {
    content.push('// --- NETWORK TROUBLESHOOTING ---');
    content.push('net_graphpos                                                    "1";');
    content.push('net_graphproportionalfont                                       "0";');
    content.push('net_graphheight                                                 "64";');
    content.push('');
  }

  // Final Config Save (only if explicitly enabled)
  if (formData.includeConfigSave) {
    content.push('// --- CONFIG SAVE ---');
    content.push('host_writeconfig;');
    content.push('echo                                                            "CS2 autoexec.cfg loaded successfully.";');
    content.push('');
  }

  // Finish Message with ASCII Art
  // Removed 'FINISH MESSAGE' marker from preview output per request
  content.push('echo |                                                                              .-Y');
  content.push('echo |                                     [AUTOEXEC] Initializing configuration..."');
  content.push('echo |                                  -x"');
  content.push('echo |      SCRIPT INITIALIZED - SYSTEM SETTINGS CALIBRATED - AUTOEXEC SUCCESSFULLY LOADED | CREATED BY CS2GUARD');
  content.push('echo |      SCRIPT INITIALIZED - SYSTEM SETTINGS CALIBRATED - AUTOEXEC SUCCESSFULLY LOADED | CREATED BY CS2GUARD');
  content.push('echo |      SCRIPT INITIALIZED - SYSTEM SETTINGS CALIBRATED - AUTOEXEC SUCCESSFULLY LOADED | CREATED BY CS2GUARD');
  content.push('echo |      SCRIPT INITIALIZED - SYSTEM SETTINGS CALIBRATED - AUTOEXEC SUCCESSFULLY LOADED | CREATED BY CS2GUARD');
  content.push('echo |      SCRIPT INITIALIZED - SYSTEM SETTINGS CALIBRATED - AUTOEXEC SUCCESSFULLY LOADED | CREATED BY CS2GUARD');
  content.push('echo |      SCRIPT INITIALIZED - SYSTEM SETTINGS CALIBRATED - AUTOEXEC SUCCESSFULLY LOADED | CREATED BY CS2GUARD');
  content.push('echo |      SCRIPT INITIALIZED - SYSTEM SETTINGS CALIBRATED - AUTOEXEC SUCCESSFULLY LOADED | CREATED BY CS2GUARD');
  content.push('echo |      SCRIPT INITIALIZED - SYSTEM SETTINGS CALIBRATED - AUTOEXEC SUCCESSFULLY LOADED | CREATED BY CS2GUARD');
  content.push('echo |      SCRIPT INITIALIZED - SYSTEM SETTINGS CALIBRATED - AUTOEXEC SUCCESSFULLY LOADED | CREATED BY CS2GUARD');
  content.push('echo |      SCRIPT INITIALIZED - SYSTEM SETTINGS CALIBRATED - AUTOEXEC SUCCESSFULLY LOADED | CREATED BY CS2GUARD');
  content.push('echo |      SCRIPT INITIALIZED - SYSTEM SETTINGS CALIBRATED - AUTOEXEC SUCCESSFULLY LOADED | CREATED BY CS2GUARD');
  content.push('echo |');
  content.push('echo |                                             [ SYSTEM OPTIMIZED ]');
  content.push('echo |                                           [ ALL SYSTEMS LAUNCHED ]');

  return content;
}

// Schema validation for the autoexec form data
export const defaultAutoexecValues = {
  // Rate & Network settings
  rate: "786432",
  cl_cmdrate: "128",
  cl_updaterate: "128",
  cl_interp: "0.015625",
  cl_interp_ratio: "1",
  cl_lagcompensation: "1",
  mm_dedicated_search_maxping: "100",
  cl_invites_only_friends: "0",
  cl_invites_only_mainmenu: "0",
  cl_join_advertise: "2",
  cl_clock_correction: "0",
  
  // Sound settings
  volume: "1.0",
  snd_musicvolume: "0.5",
  snd_tensecondwarning_volume: "0.5",
  snd_deathcamera_volume: "0.3",
  snd_mvp_volume: "0.5",
  voice_scale: "1.0",
  voice_positional: "0",
  voice_threshold: "4000",
  snd_hwcompat: "0",
  windows_speaker_config: "1",
  snd_mute_losefocus: "1",

  // Mouse & Crosshair settings
  sensitivity: "2.5",
  m_rawinput: "1",
  m_customaccel: "0",
  m_mouseaccel1: "0",
  zoom_sensitivity_ratio_mouse: "1.0",
  
  // Crosshair
  cl_crosshairstyle: "4",
  cl_crosshairsize: "4",
  cl_crosshairthickness: "1",
  cl_crosshairgap: "0",
  cl_crosshairdot: "0",
  cl_crosshair_t: "0",
  cl_crosshair_outlinethickness: "1",
  cl_crosshairalpha: "255",
  cl_crosshaircolor: "5",
  cl_crosshaircolor_r: "50",
  cl_crosshaircolor_g: "250",
  cl_crosshaircolor_b: "50",
  cl_crosshair_dynamic_maxdist_splitratio: "0.35",
  
  // HUD & UI
  cl_hud_color: "9",
  cl_hud_background_alpha: "0.5",
  gameinstructor_enable: "0",
  cl_showfps: "0",
  cl_teamid_overhead_always: "0",
  cl_radar_player_names: "1",
  cl_radar_full_map: "0",
  hud_deathnotice_time: "6",
  
  con_enable: "1",
  developer: "0",
  cl_hideservernotifications: "0",
  net_graph: "0",
  hud_scaling: "0.85",
  cl_teammate_colors_show: "1",
  cl_use_weapon_rarity_as_selection_color: "0",
  cl_hud_radar_scale: "1",
  cl_radar_scale: "0.7",
  cl_radar_background_opacity: "1",
  cl_radar_icon_scale_min: "0.6",
  cl_radar_always_centered: "1",
  cl_radar_rotate: "1",
  cl_radar_square_with_scoreboard: "1",
  cl_teamid_overhead_mode: "2",
  cl_teamid_overhead_colors_show: "1",
  cl_show_equipment_value: "0",
  cl_teamid_overhead_show_avatars: "1",
  cl_teammate_avatar_animated: "1",
  viewmodel_presetpos: "1",
  viewmodel_fov: "60",
  viewmodel_offset_x: "0",
  viewmodel_offset_y: "0",
  viewmodel_offset_z: "-1.5",
  r_drawtracers_firstperson: "1",
  
  // Video
  fps_max: "0",
  fps_max_menu: "120",
  mat_queue_mode: "2",
  r_drawparticles: "1",
  r_shadows: "1",
  cl_csm_enabled: "1",
  r_lod: "-1",
  r_texture_stream: "1",
  r_texture_stream_max_remote_mb: "512",
  r_player_visibility_mode: "1",
  mat_vsync: "0",
  mat_fullscreen: "1",
  mat_antialias: "8",
  mat_motion_blur_enabled: "0",
  
  // Binds defaults
  voice_bind: "",
  radio_bind: "",
  scoreboard_bind: "",
  drop_bind: "",
  use_bind: "",
  reload_bind: "",
  jump_bind: "",
  duck_bind: "",
  walk_bind: "",
  slot1_bind: "",
  slot2_bind: "",
  slot3_bind: "",
  slot4_bind: "",
  slot5_bind: "",
  slot6_bind: "",
  slot7_bind: "",
  slot8_bind: "",
  slot9_bind: "",
  slot10_bind: "",
  buymenu_bind: "",
  toggleconsole_bind: "",
  cleardecals_bind: "",
  inspect_bind: "",
  
  additionalCommands: "",
  customBinds: [],
  
  consoleColor: "pink",
  predictBodyShotFx: false,
  predictHeadShotFx: false,
  predictKillRagdolls: false
};
