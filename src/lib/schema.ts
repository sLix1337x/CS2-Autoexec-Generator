'use strict'
import * as z from "zod";

export const customBindSchema = z.object({
  key: z.string().min(1, "Key is required"),
  command: z.string().min(1, "Command is required")
});

export const autoexecFormSchema = z.object({
  // Rate Settings
  rate: z.string().default("786432"),
  // Deprecated aliases kept for compatibility (not used by generator/UI)
  cmdrate: z.string().optional(),
  updaterate: z.string().optional(),
  // Preferred CS2 cvars
  cl_cmdrate: z.string().default("128"),
  cl_updaterate: z.string().default("128"),
  cl_interp: z.string().default("0.015625"),
  cl_interp_ratio: z.string().default("1"),
  // Lobby & Invite settings
  cl_invites_only_friends: z.string().default("0"),
  cl_invites_only_mainmenu: z.string().default("0"),
  cl_join_advertise: z.string().default("2"),
  cl_clock_correction: z.string().default("0"),
  
  // Sound Settings
  volume: z.string().default("1.0"),
  // UI/generator audio keys
  snd_menumusic_volume: z.string().default("0"),
  snd_headphone_eq: z.string().default("1"),
  snd_spatialize_lerp: z.string().default("0.8"),
  snd_mute_mvp_music_live_players: z.string().default("1"),
  snd_autodetect_latency: z.string().default("1"),
  // Legacy/optional keys (kept for compatibility)
  snd_roundstart_volume: z.string().optional(),
  snd_roundend_volume: z.string().optional(),
  snd_tensecondwarning_volume: z.string().optional(),
  snd_mvp_volume: z.string().optional(),
  voice_modenable: z.string().optional(),
  
  // Mouse & Crosshair Settings
  sensitivity: z.string().default("2.5"),
  zoom_sensitivity_ratio_mouse: z.string().optional(),
  m_pitch: z.string().optional(),
  cl_crosshairstyle: z.string().default("4"),
  cl_crosshairsize: z.string().default("4"),
  cl_crosshairthickness: z.string().default("1"),
  cl_crosshairgap: z.string().default("0"),
  cl_crosshairalpha: z.string().default("255"),
  cl_crosshaircolor: z.string().default("5"),
  cl_crosshaircolor_r: z.string().default("50"),
  cl_crosshaircolor_g: z.string().default("250"),
  cl_crosshaircolor_b: z.string().default("50"),
  cl_crosshairdot: z.string().optional(),
  cl_crosshair_t: z.string().optional(),
  cl_crosshair_drawoutline: z.string().optional(),
  cl_crosshair_outlinethickness: z.string().optional(),
  
  // HUD Settings
  cl_hud_color: z.string().default("0"),
  cl_hud_background_alpha: z.string().optional(),
  cl_hud_healthammo_style: z.string().optional(),
  cl_hud_playercount_pos: z.string().optional(),
  cl_hud_playercount_showcount: z.string().optional(),
  cl_hud_radar_scale: z.string().optional(),
  cl_radar_scale: z.string().default("0.7"),
  cl_radar_always_centered: z.string().optional(),
  cl_radar_rotate: z.string().optional(),
  cl_radar_square_with_scoreboard: z.string().optional(),
  cl_teamid_overhead_always: z.string().optional(),
  cl_teamid_overhead_name_alpha: z.string().optional(),
  cl_autowepswitch: z.string().optional(),
  hud_scaling: z.string().default("0.85"),
  
  // Video Performance Settings
  fps_max: z.string().default("0"),
  r_dynamic: z.string().optional(),
  mat_queue_mode: z.string().optional(),
  r_drawparticles: z.string().optional(),
  r_drawtracers_firstperson: z.string().default("1"),
  cl_disablefreezecam: z.string().optional(),

  // Game Settings
  r_show_build_info: z.string().default("0"),
  cl_allow_animated_avatars: z.string().default("1"),
  cl_teamcounter_playercount_instead_of_avatars: z.string().default("0"),
  
  // Team & Equipment Settings
  cl_show_team_equipment: z.string().default("1"),
  
  // Audio Settings
  snd_mixahead: z.string().default("0.001"),
  snd_headphone_pan_exponent: z.string().default("2.0"),
  snd_headphone_pan_radial_weight: z.string().default("2.0"),
  
  // Network Settings
  mm_dedicated_search_maxping: z.string().default("100"),
  
  // HUD & UI Advanced Settings
  con_enable: z.string().default("1"),
  developer: z.string().default("0"),
  con_filter_enable: z.string().optional(),
  con_filter_text: z.string().optional(),
  con_filter_text_out: z.string().optional(),
  net_graph: z.string().optional(),
  net_graphproportionalfont: z.string().optional(),
  // Added missing HUD fields for react-hook-form compatibility
  gameinstructor_enable: z.string().default("0"),
  cl_showfps: z.string().default("0"),
  cl_radar_player_names: z.string().default("1"),
  cl_radar_full_map: z.string().default("0"),
  hud_deathnotice_time: z.string().default("6"),
  cl_hideservernotifications: z.string().optional(),
  cl_teammate_colors_show: z.string().optional(),
  cl_use_weapon_rarity_as_selection_color: z.string().optional(),
  cl_radar_icon_scale_min: z.string().optional(),
  cl_radar_background_opacity: z.string().optional(),
  cl_teamid_overhead_mode: z.string().optional(),
  cl_teamid_overhead_colors_show: z.string().optional(),
  cl_show_equipment_value: z.string().optional(),
  cl_teamid_overhead_show_avatars: z.string().optional(),
  cl_teammate_avatar_animated: z.string().optional(),
  viewmodel_presetpos: z.string().optional(),
  viewmodel_fov: z.string().optional(),
  viewmodel_offset_x: z.string().optional(),
  viewmodel_offset_y: z.string().optional(),
  viewmodel_offset_z: z.string().optional(),
  
  // Console Color
  consoleColor: z.enum(["pink", "lightblue", "orange", "yellow", "green", "red"]).default("lightblue"),
  
  // Prediction Effects
  cl_predict_body_shot_fx: z.string().default("2"),
  cl_predict_head_shot_fx: z.string().default("2"),
  cl_predict_kill_ragdolls: z.string().default("1"),
  
  // Additional Commands
  additionalCommands: z.string().optional(),
  
  // Binds
  binds: z.record(z.string(), z.string()).optional(),
  customBinds: z.array(customBindSchema).optional(),
  
  // Communication Binds
  voice_bind: z.string().default("T"),
  radio_bind: z.string().optional(),
  teammenu_bind: z.string().default("M"),
  allchat_bind: z.string().default("Y"),
  teamchat_bind: z.string().default("U"),
  
  // Utility Binds
  scoreboard_bind: z.string().default("TAB"),
  drop_bind: z.string().default("G"),
  use_bind: z.string().default("E"),
  reload_bind: z.string().default("R"),
  
  // Movement Binds
  forward_bind: z.string().default("W"),
  moveleft_bind: z.string().default("A"),
  back_bind: z.string().default("S"),
  moveright_bind: z.string().default("D"),
  jump_bind: z.string().default("SPACE"),
  duck_bind: z.string().default("LEFT CTRL"),
  walk_bind: z.string().default("LEFT SHIFT"),
  
  // Weapon & Equipment Binds
  slot1_bind: z.string().default("1"),
  slot2_bind: z.string().default("2"),
  slot2_bind_alt: z.string().default("Q"),
  slot3_bind: z.string().optional(),
  slot4_bind: z.string().default("4"),
  slot5_bind: z.string().default("5"),
  slot6_bind: z.string().optional(),
  slot7_bind: z.string().optional(),
  slot8_bind: z.string().optional(),
  slot9_bind: z.string().optional(),
  slot10_bind: z.string().optional(),
  buymenu_bind: z.string().optional(),
  
  // Quick Actions
  toggleconsole_bind: z.string().default("F9"),
  cleardecals_bind: z.string().optional(),
  inspect_bind: z.string().optional(),
  
  // Alias Binds
  dropbomb_bind: z.string().default("^"),
  crosshair_toggle_bind: z.string().default("LEFTARROW"),
  
  // Include options (checkboxes)
  includeSections: z.object({
    binds: z.boolean().default(false),
    // New per-binds section toggles
    movementBinds: z.boolean().default(false),
    weaponsActionBinds: z.boolean().default(false),
    uiCommBinds: z.boolean().default(false),
    customBinds: z.boolean().default(false),
    aliases: z.boolean().default(false),
    settings: z.boolean().default(false),
    hud: z.boolean().default(false),
    hudAdvanced: z.boolean().default(false),
    mouseCrosshair: z.boolean().default(false),
    viewmodel: z.boolean().default(false),
    video: z.boolean().default(false),
    sound: z.boolean().default(false),
    rate: z.boolean().default(false),
    additional: z.boolean().default(false),
    // Add new Game Settings tab toggle
    gameSettings: z.boolean().default(false),
    // Performance Settings
    fpsMax: z.boolean().default(false),
    teamEquipment: z.boolean().default(false),
    audioBuffer: z.boolean().default(false),
    headphoneAudio: z.boolean().default(false),
    maxPing: z.boolean().default(false),
    firstPersonTracers: z.boolean().default(false),
  }).default({}),

  // Per-command inclusion flags
  includeCommands: z.record(z.string(), z.boolean()).default({}),
});

export type AutoexecFormValues = z.infer<typeof autoexecFormSchema>;
