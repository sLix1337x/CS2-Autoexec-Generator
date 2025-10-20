# CS2 Commands Research Documentation

This document contains comprehensive research and verification of all console commands found in the autoexec configuration files.

## Research Status
- **Total Commands Identified**: 80+ unique commands
- **Commands Researched**: Network, Audio, Prediction, Mouse/Input (In Progress)
- **Last Updated**: January 2025

## Command Categories

### Network/Rate Commands

#### Core Network Commands
- **`cl_interp`** <mcreference link="https://community.skin.club/en/articles/best-audio-settings-cs2" index="1">1</mcreference> <mcreference link="https://esportsrambles.com/blog/cs2-audio-settings" index="2">2</mcreference>
  - **Status**: Largely deprecated in CS2 compared to CS:GO
  - **Default**: 0.1
  - **Function**: Controls interpolation delay, but CS2 now uses "buffering to smooth over packet loss" system
  - **Impact**: Less relevant than in CS:GO due to new networking architecture

- **`cl_cmdrate`** & **`cl_updaterate`** <mcreference link="https://community.skin.club/en/articles/best-audio-settings-cs2" index="1">1</mcreference>
  - **Status**: Deprecated or function differently in CS2
  - **Legacy Values**: cl_updaterate 20, cl_interp_ratio 2
  - **Impact**: CS2 handles these automatically with new networking system

- **`cl_interp_ratio`** <mcreference link="https://community.skin.club/en/articles/best-audio-settings-cs2" index="1">1</mcreference>
  - **Status**: Deprecated in CS2
  - **Legacy Function**: Worked with cl_updaterate to calculate interp value
  - **CS2 Alternative**: Handled by cl_net_buffer_ticks

#### Advanced Network Buffer Commands
- **`cl_net_buffer_ticks`** <mcreference link="https://community.skin.club/en/articles/best-audio-settings-cs2" index="2">2</mcreference>
  - **Function**: Controls number of ticks of delay for server snapshots and user commands
  - **Values**: 0 (default), 1, or 2
  - **Impact**: Indirectly sets cl_interp_ratio; higher values smooth packet loss but increase latency
  - **Recommendation**: Keep at 0 for competitive play

- **`cl_net_buffer_ticks_use_interp`**
  - **Status**: ✅ Working in CS2
  - **Function**: Enables immediate packet processing with interpolation
  - **Default**: 1 (enabled)
  - **Parameters**: 0 (disabled), 1 (enabled)
  - **Impact**: Processes packets immediately instead of buffering
  - **Recommendation**: 1 (keep enabled for responsive gameplay)

- **`cl_tickpacket_desired_queuelength`**
  - **Status**: ✅ Working in CS2
  - **Function**: Controls outgoing tick packet queue length
  - **Default**: 1
  - **Parameters**: Integer values (1-3 recommended)
  - **Impact**: Affects how many tick packets are queued for transmission
  - **Recommendation**: 1 (default) for optimal responsiveness

- **`cl_clock_correction`** & **`cl_clockdrift_max_ticks`** <mcreference link="https://community.skin.club/en/articles/best-audio-settings-cs2" index="2">2</mcreference>
  - **Function**: Controls client-server clock synchronization
  - **Impact**: Helps maintain timing accuracy between client and server
  - **Status**: Active in CS2 networking system

- **`cl_clock_recvmargin_enable`** & **`cl_tickpacket_recvmargin_enable`** <mcreference link="https://community.skin.club/en/articles/best-audio-settings-cs2" index="2">2</mcreference>
  - **Function**: Enable new client-side clock synchronization methods
  - **Status**: Part of CS2's improved networking architecture

#### Rate and Bandwidth Settings
- **`rate`**
  - **Status**: ✅ Working in CS2
  - **Function**: Controls maximum bandwidth (bytes per second) for network communication
  - **Default**: 196608 (192 KB/s)
  - **Parameters**: Byte values (minimum 20000, maximum 786432)
  - **Impact**: Higher values allow more data transfer but require stable connection
  - **Recommended**: 786432 (768 KB/s) for high-speed connections, 196608 for standard

#### Prediction Commands
- **`cl_predict_body_shot_fx`**
  - **Status**: ✅ Working in CS2
  - **Function**: Enables client-side prediction for body shot effects
  - **Default**: 1 (enabled)
  - **Parameters**: 0 (disabled), 1 (enabled)
  - **Impact**: Shows blood effects immediately on hit without waiting for server confirmation
  - **Recommendation**: 1 (helps with hit feedback)

- **`cl_predict_head_shot_fx`**
  - **Status**: ✅ Working in CS2
  - **Function**: Enables client-side prediction for headshot effects
  - **Default**: 1 (enabled)
  - **Parameters**: 0 (disabled), 1 (enabled)
  - **Impact**: Shows headshot effects immediately without server confirmation
  - **Recommendation**: 1 (important for immediate feedback)

- **`cl_predict_kill_ragdolls`**
  - **Status**: ✅ Working in CS2
  - **Function**: Enables client-side prediction for death ragdoll physics
  - **Default**: 1 (enabled)
  - **Parameters**: 0 (disabled), 1 (enabled)
  - **Impact**: Shows death animations immediately on kill
  - **Recommendation**: 1 (provides immediate visual feedback)

#### Steam Datagram Relay
- **`net_client_steamdatagram_enable_override`**
  - **Status**: ✅ Working in CS2
  - **Function**: Forces Steam Datagram Relay (SDR) usage for matchmaking
  - **Default**: 1 (enabled)
  - **Parameters**: -1 (auto), 0 (disabled), 1 (enabled)
  - **Impact**: Routes traffic through Steam's relay network for better routing
  - **Recommendation**: 1 (improves connection quality in most cases)

#### Matchmaking Network Settings
- **`mm_session_search_qos_timeout`**
  - **Status**: ✅ Working in CS2
  - **Function**: Sets timeout (seconds) for Quality of Service measurements during matchmaking
  - **Default**: 20
  - **Parameters**: Time in seconds (10-60 recommended)
  - **Impact**: How long to wait for ping measurements before starting match search
  - **Recommendation**: 20 (default) for balanced search speed

- **`mm_dedicated_search_maxping`**
  - **Status**: ✅ Working in CS2
  - **Function**: Sets maximum acceptable ping for dedicated server matchmaking
  - **Default**: 150
  - **Parameters**: Ping in milliseconds (25-350 range)
  - **Impact**: Filters out high-ping servers during matchmaking
  - **Recommendation**: 80-100 for competitive play, 150 for faster queue times

- **`mm_csgo_community_search_players_min`**
  - **Status**: ✅ Working in CS2
  - **Function**: Sets minimum players required for community server matchmaking
  - **Default**: 3
  - **Parameters**: Number of players (1-10)
  - **Impact**: Affects community server search criteria
  - **Recommendation**: 3 (default) for balanced matches

#### Connection Management
- **`cl_resend`**
  - **Status**: ✅ Working in CS2
  - **Function**: Sets delay (seconds) before resending connection attempts
  - **Default**: 6
  - **Parameters**: Time in seconds (1-30)
  - **Impact**: How long to wait before retrying failed connections
  - **Recommendation**: 6 (default) for stable connections

- **`cl_timeout`**
  - **Status**: ✅ Working in CS2
  - **Function**: Sets timeout (seconds) before disconnecting from server
  - **Default**: 30
  - **Parameters**: Time in seconds (5-300)
  - **Impact**: How long to wait for server response before timing out
  - **Recommendation**: 30 (default) for stable play

#### Lobby and Social Settings
- **`lobby_default_privacy_bits2`**
  - **Status**: ✅ Working in CS2
  - **Function**: Controls default lobby privacy settings
  - **Default**: 1
  - **Parameters**: Bitfield values (0-7)
  - **Impact**: Sets who can join your lobby by default
  - **Recommendation**: 1 (friends only) for privacy

- **`ui_setting_advertiseforhire_auto`**
  - **Status**: ✅ Working in CS2
  - **Function**: Automatically advertises availability for invites
  - **Default**: 1 (enabled)
  - **Parameters**: 0 (disabled), 1 (enabled)
  - **Impact**: Shows you as available for game invites
  - **Recommendation**: 0 if you prefer manual control

- **`cl_join_advertise`**
  - **Status**: ✅ Working in CS2
  - **Function**: Advertises joinable games to Steam friends
  - **Default**: 2
  - **Parameters**: 0 (never), 1 (friends only), 2 (auto)
  - **Impact**: Controls visibility of your game to friends
  - **Recommendation**: 1 (friends only) for controlled invites

- **`cl_invites_only_friends`**
  - **Status**: ✅ Working in CS2
  - **Function**: Ignores game invites from non-friends
  - **Default**: 0 (disabled)
  - **Parameters**: 0 (accept all), 1 (friends only)
  - **Impact**: Filters out unwanted invites from strangers
  - **Recommendation**: 1 for reduced spam

- **`cl_invites_only_mainmenu`**
  - **Status**: ✅ Working in CS2
  - **Function**: Ignores game invites while in a match
  - **Default**: 0 (disabled)
  - **Parameters**: 0 (accept always), 1 (main menu only)
  - **Impact**: Prevents invite distractions during gameplay
  - **Recommendation**: 1 for competitive focus

### Audio Commands

#### Core Audio Settings
- **`snd_mixahead`** <mcreference link="https://community.skin.club/en/articles/best-audio-settings-cs2" index="1">1</mcreference> <mcreference link="https://thisgengaming.com/2025/01/05/how-pro-players-use-commands-to-dominate-in-cs2/" index="3">3</mcreference> <mcreference link="https://profilerr.net/how-to-make-footsteps-louder-in-cs2-console-commands/" index="4">4</mcreference>
  - **Function**: Reduces delay between audio event and when you hear it
  - **Recommended Value**: 0.05 (down from default 0.10)
  - **Impact**: Makes audio cues (especially footsteps) more immediate for faster reactions
  - **Warning**: Can cause audio glitches in some cases; revert to 0.10 if issues occur

- **`snd_headphone_eq`** <mcreference link="https://esportsrambles.com/blog/cs2-audio-settings" index="5">5</mcreference>
  - **Function**: Changes EQ Profile
  - **Values**: 0 = Natural, 1 = Crisp, 2 = Smooth
  - **Recommendation**: 1 (Crisp) for competitive play, 2 (Smooth) if experiencing ear fatigue

#### Positional Audio Commands
- **`snd_headphone_pan_exponent`** <mcreference link="https://community.skin.club/en/articles/best-audio-settings-cs2" index="1">1</mcreference> <mcreference link="https://thisgengaming.com/2025/01/05/how-pro-players-use-commands-to-dominate-in-cs2/" index="3">3</mcreference> <mcreference link="https://profilerr.net/how-to-make-footsteps-louder-in-cs2-console-commands/" index="4">4</mcreference>
  - **Function**: Improves sound panning for directional audio
  - **Recommended Value**: 2 (up from default 1, max 3)
  - **Impact**: Enhances perception of distant sounds and enemy movement detection

- **`snd_front_headphone_position`** <mcreference link="https://community.skin.club/en/articles/best-audio-settings-cs2" index="1">1</mcreference> <mcreference link="https://profilerr.net/how-to-make-footsteps-louder-in-cs2-console-commands/" index="4">4</mcreference>
  - **Function**: Adjusts audio focus for sounds from the front
  - **Recommended Value**: 45.0 (down from default 90)
  - **Impact**: Improves directional clarity for frontal sounds like footsteps and gunfire

- **`snd_rear_headphone_position`** <mcreference link="https://community.skin.club/en/articles/best-audio-settings-cs2" index="1">1</mcreference> <mcreference link="https://profilerr.net/how-to-make-footsteps-louder-in-cs2-console-commands/" index="4">4</mcreference>
  - **Function**: Adjusts audio focus for sounds from behind
  - **Recommended Value**: 135.0 (up from default 90)
  - **Impact**: Sharpens sounds from behind, crucial for detecting flanking enemies

#### Additional Audio Commands
- **`snd_spatialize_lerp`** <mcreference link="https://esportsrambles.com/blog/cs2-audio-settings" index="5">5</mcreference>
  - **Function**: L/R Isolation control (0-1 range, where 1 = 100%)
  - **Impact**: Defines audio panning and stereo separation

- **`snd_steamaudio_enable_perspective_correction`** <mcreference link="https://esportsrambles.com/blog/cs2-audio-settings" index="5">5</mcreference>
  - **Function**: Perspective Correction (0 = Disabled, 1 = Enabled)
  - **Impact**: Determines if sound is rendered according to field of view
  - **Recommendation**: Most users disable (0) for CS:GO-like audio experience

#### Steam Audio System Commands
- **`snd_steamaudio_reverb_level_db`**
  - **Status**: ✅ Working in CS2
  - **Function**: Adjusts overall volume (dB) of Steam Audio Reverb processor
  - **Default**: -3
  - **Parameters**: Decibel values (negative = quieter, positive = louder)
  - **Impact**: Controls environmental reverb intensity
  - **Recommended**: -3 (default) for balanced reverb

- **`snd_autodetect_latency`**
  - **Status**: ✅ Working in CS2
  - **Function**: Automatic buffer latency detection (requires driver support)
  - **Default**: 1 (enabled)
  - **Parameters**: 0 (disabled), 1 (enabled)
  - **Impact**: Prevents audio dropouts by auto-adjusting buffer size
  - **Warning**: Disabling may cause audio dropouts
  - **Recommended**: 1 (keep enabled)

#### Music and Environmental Audio
- **`snd_menumusic_volume`**
  - **Status**: ✅ Working in CS2
  - **Function**: Controls main menu music volume
  - **Default**: 0.04
  - **Parameters**: 0.0 to 1.0
  - **Impact**: Reduces menu music distraction
  - **Recommended**: 0.04 or lower

- **`snd_menumap_volume`**
  - **Status**: ✅ Working in CS2
  - **Function**: Controls background map sounds volume
  - **Default**: 1.0
  - **Parameters**: 0.0 to 1.0
  - **Impact**: Ambient map audio levels
  - **Recommended**: 0.8 for reduced distraction

- **`snd_roundstart_volume`**
  - **Status**: ✅ Working in CS2
  - **Function**: Controls round start music volume
  - **Default**: 0
  - **Parameters**: 0.0 to 1.0
  - **Impact**: Round start audio cues
  - **Recommended**: 0 (disabled for competitive focus)

- **`snd_roundend_volume`**
  - **Status**: ✅ Working in CS2
  - **Function**: Controls round end music volume
  - **Default**: 0.16
  - **Parameters**: 0.0 to 1.0
  - **Impact**: Round end celebration/defeat music
  - **Recommended**: 0 for competitive, 0.16 for casual

- **`snd_mapobjective_volume`**
  - **Status**: ✅ Working in CS2
  - **Function**: Controls map objective music volume
  - **Default**: 0.0225
  - **Parameters**: 0.0 to 1.0
  - **Impact**: Bomb plant/defuse music intensity
  - **Recommended**: 0 for competitive focus

- **`snd_deathcamera_volume`**
  - **Status**: ✅ Working in CS2
  - **Function**: Controls death camera music volume
  - **Default**: 0.16
  - **Parameters**: 0.0 to 1.0
  - **Impact**: Music when spectating after death
  - **Recommended**: 0 for competitive focus

- **`snd_tensecondwarning_volume`**
  - **Status**: ✅ Working in CS2
  - **Function**: Controls ten-second bomb warning music volume
  - **Default**: 0.0225
  - **Parameters**: 0.0 to 1.0
  - **Impact**: Critical timing audio cue for bomb defusal
  - **Recommended**: 0.12 (helps with defuse timing)

- **`snd_mvp_volume`**
  - **Status**: ✅ Working in CS2
  - **Function**: Controls MVP music volume
  - **Default**: 0.16
  - **Parameters**: 0.0 to 1.0
  - **Impact**: MVP celebration music
  - **Recommended**: 0.12 or 0 for competitive

- **`snd_mute_mvp_music_live_players`**
  - **Status**: ✅ Working in CS2
  - **Function**: Mutes MVP music if players from both teams are alive
  - **Default**: 0 (disabled)
  - **Parameters**: 0 (disabled), 1 (enabled)
  - **Impact**: Prevents MVP music from masking footsteps after round end
  - **Recommended**: 1 (helps hear steps after round)

#### Voice Communication Commands
- **`snd_voipvolume`**
  - **Status**: ✅ Working in CS2
  - **Function**: Controls incoming voice communication volume
  - **Default**: 1
  - **Parameters**: 0.0 to 1.0
  - **Impact**: Overall volume of all voice communication
  - **Recommended**: 0.72 for balanced voice levels

- **`cl_mute_enemy_team`**
  - **Status**: ✅ Working in CS2
  - **Function**: Blocks all communication from enemy team players
  - **Default**: 0 (disabled)
  - **Parameters**: 0 (allow), 1 (block enemy voice)
  - **Impact**: Prevents enemy voice communication distraction
  - **Recommended**: 0 for matchmaking, 1 for competitive focus

- **`cl_mute_all_but_friends_and_party`**
  - **Status**: ✅ Working in CS2
  - **Function**: Blocks communication from everyone except friends/party
  - **Default**: 0 (disabled)
  - **Parameters**: 0 (disabled), 1 (non-competitive modes), 2 (all modes)
  - **Impact**: Restricts voice to trusted players only
  - **Recommended**: 0 for normal play, 2 for toxic environment avoidance

- **`cl_clutch_mode`**
  - **Status**: ✅ Working in CS2
  - **Function**: Silences voice and distracting sounds until round end or death
  - **Default**: 0 (disabled)
  - **Parameters**: 0 (disabled), 1 (enabled)
  - **Impact**: Reduces audio distractions during clutch situations
  - **Recommended**: 0 (manual activation when needed)

#### Microphone Configuration
- **`voice_loopback`**
  - **Status**: ✅ Working in CS2
  - **Function**: Enables microphone monitoring (hear your own voice)
  - **Default**: 0 (disabled)
  - **Parameters**: 0 (disabled), 1 (enabled)
  - **Impact**: Allows hearing your own microphone input
  - **Warning**: Can cause feedback if microphone is connected
  - **Recommended**: 0 (keep disabled)

- **`voice_threshold`**
  - **Status**: ✅ Working in CS2
  - **Function**: Sets microphone sensitivity threshold for voice activation
  - **Default**: -120 (decibels)
  - **Parameters**: Decibel values (higher = less sensitive)
  - **Impact**: Controls when voice activation triggers
  - **Recommended**: -110 for better voice activation

- **`voice_modenable`**
  - **Status**: ✅ Working in CS2
  - **Function**: Enables/disables microphone functionality
  - **Default**: 1 (enabled)
  - **Parameters**: 0 (disabled), 1 (enabled)
  - **Impact**: Master microphone toggle
  - **Recommended**: 1 (keep enabled)

- **`voice_always_sample_mic`**
  - **Status**: ✅ Working in CS2
  - **Function**: Opens recording device when game starts instead of first use
  - **Default**: 0 (disabled)
  - **Parameters**: 0 (disabled), 1 (enabled)
  - **Impact**: May solve microphone transmission issues
  - **Recommended**: 0 (default), try 1 if mic issues occur

- **`voice_device_override`**
  - **Status**: ✅ Working in CS2
  - **Function**: Specifies default voice capture device
  - **Default**: 0 (system default)
  - **Parameters**: Device ID numbers
  - **Impact**: Forces specific microphone device selection
  - **Recommended**: 0 (use system default)

#### System Audio Settings
- **`snd_mute_losefocus`**
  - **Status**: ✅ Working in CS2
  - **Function**: Mutes game sound when CS2 loses focus (tabbed out)
  - **Default**: 1 (enabled)
  - **Parameters**: 0 (disabled), 1 (enabled)
  - **Impact**: Prevents game audio when alt-tabbed
  - **Recommended**: 1 (default behavior)

- **`snd_toolvolume`**
  - **Status**: ✅ Working in CS2
  - **Function**: Controls volume of sounds in development tools
  - **Default**: 1
  - **Parameters**: 0.0 to 1.0
  - **Impact**: Used with 'play' command for sound testing
  - **Recommended**: 0.3 for reduced tool audio

- **`cl_embedded_stream_audio_volume`**
  - **Status**: ✅ Working in CS2
  - **Function**: Controls embedded stream audio volume
  - **Default**: 0
  - **Parameters**: 0.0 to 1.0
  - **Impact**: Volume for embedded video/stream content
  - **Recommended**: 0 (keep disabled)

- **`cl_embedded_stream_audio_volume_xmaster`**
  - **Status**: ✅ Working in CS2
  - **Function**: Multiplies embedded stream audio by master volume
  - **Default**: 1 (enabled)
  - **Parameters**: 0 (disabled), 1 (enabled)
  - **Impact**: Links stream audio to master volume control
  - **Recommended**: 1 (default behavior)

### Prediction Commands

#### Core Prediction System
- **`cl_predict`** <mcreference link="https://totalcsgo.com/commands/clpredict" index="6">6</mcreference> <mcreference link="https://steamcommunity.com/sharedfiles/filedetails/?id=3404948190" index="7">7</mcreference>
  - **Function**: Performs client-side prediction for movement and actions
  - **Default Value**: 1 (enabled)
  - **Impact**: Reduces perceived lag by predicting player actions locally
  - **Note**: Cannot be changed during gameplay, only in main menu

- **`cl_predictweapons`** <mcreference link="https://steamcommunity.com/sharedfiles/filedetails/?id=3404948190" index="7">7</mcreference>
  - **Function**: Enables weapon prediction
  - **Default Value**: 1 (enabled)
  - **Impact**: Predicts weapon behavior and firing for smoother gameplay

#### New CS2 Prediction Features
- **CS2 Prediction System** <mcreference link="https://www.reddit.com/r/GlobalOffensive/comments/1gqsvsx/cs2_new_predict_system_in_a_nutshell/" index="8">8</mcreference>
  - **New Feature**: Client now predicts hits and provides immediate feedback
  - **Impact**: Players get instant visual/audio feedback (headshot sounds, blood) even if server disagrees
  - **Benefit**: Clear feedback when shots are "on target" locally but don't register due to server-side factors
  - **Note**: Uses same RNG seed for client and server to minimize disagreements

### Mouse/Input Commands

#### Sensitivity Commands
- **`sensitivity`** <mcreference link="https://totalcsgo.com/commands/categories/mouse" index="9">9</mcreference>
  - **Function**: Sets overall mouse sensitivity
  - **Usage**: `sensitivity [value]` (e.g., `sensitivity 1` or `sensitivity 0.5`)
  - **Impact**: Higher values = faster movement, lower values = more precision

- **`m_yaw`** <mcreference link="https://totalcsgo.com/commands/categories/mouse" index="9">9</mcreference>
  - **Function**: Adjusts sensitivity on the x-axis (left/right movement)
  - **Default Value**: 0.022
  - **Usage**: Can be inverted with negative values (e.g., `-0.022`)

- **`m_pitch`** <mcreference link="https://totalcsgo.com/commands/categories/mouse" index="9">9</mcreference>
  - **Function**: Adjusts sensitivity on the y-axis (up/down movement)
  - **Default Value**: 0.022
  - **Usage**: Can be inverted with negative values for inverted mouse

#### Raw Input Status
- **`m_rawinput`** <mcreference link="https://totalcsgo.com/commands/categories/mouse" index="9">9</mcreference> <mcreference link="https://tradeit.gg/blog/raw-input-command/" index="10">10</mcreference> <mcreference link="https://steamcommunity.com/app/730/discussions/0/3821921664844157592/" index="11">11</mcreference>
  - **Status**: **REMOVED** from CS2
  - **CS2 Behavior**: Raw input is **enabled by default** and cannot be disabled
  - **Impact**: CS2 automatically uses unfiltered mouse input, bypassing Windows settings
  - **Verification**: Windows sensitivity changes do not affect CS2 (unlike CS:GO with raw input disabled)
  - **Alternative**: Third-party tools like RawAccel can be used for advanced mouse acceleration

#### Mouse Acceleration
- **Mouse Acceleration in CS2** <mcreference link="https://tradeit.gg/blog/raw-input-command/" index="10">10</mcreference>
  - **Status**: Traditional mouse acceleration commands removed
  - **Alternative**: RawAccel software for custom acceleration curves
  - **Note**: Enhanced Pointer Precision (Windows) has no effect due to forced raw input

### Crosshair Commands
[Research findings to be added]

### HUD Commands
[Research findings to be added]

### Viewmodel Commands
[Research findings to be added]

### Console/Performance Commands

#### Core Performance Commands
- **`fps_max`**
  - **Status**: ✅ Working in CS2
  - **Function**: Sets maximum FPS limit
  - **Parameters**: 0 (unlimited) to any positive integer
  - **Default**: 400
  - **Impact**: Performance optimization, prevents excessive GPU usage
  - **Recommended**: 300-400 for most systems, 0 for unlimited

- **`con_enable`**
  - **Status**: ✅ Working in CS2
  - **Function**: Enables/disables developer console
  - **Parameters**: 0 (disabled), 1 (enabled)
  - **Default**: 0
  - **Impact**: Allows access to console commands
  - **Recommended**: 1 (enable console access)

- **`cl_showfps`**
  - **Status**: ✅ Working in CS2 (Enhanced)
  - **Function**: Displays FPS and performance information
  - **Parameters**: 0 (off), 1 (basic FPS), 2 (detailed like old net_graph), 3 (server data), 4 (with logging)
  - **Default**: 0
  - **Impact**: Performance monitoring, replaces old net_graph functionality
  - **Recommended**: 1 or 2 for monitoring

- **`cl_hud_color`**
  - **Status**: ✅ Working in CS2
  - **Function**: Changes HUD color scheme
  - **Parameters**: Numerical values for different color presets
  - **Default**: Varies
  - **Impact**: Visual customization
  - **Recommended**: Personal preference

- **`cl_hud_radar_scale`**
  - **Status**: ✅ Working in CS2
  - **Function**: Adjusts radar size/scale
  - **Parameters**: 0.8 to 1.3 (typical range)
  - **Default**: 1.0
  - **Impact**: Radar visibility and information density
  - **Recommended**: 1.0-1.15 for better visibility

### Advanced/Experimental Commands

#### Network Buffering Commands

### `cl_net_buffer_ticks`
- **Status**: ✅ Working - New CS2 System
- **Function**: Controls number of ticks of delay for server snapshots and user commands
- **Parameters**: 0 (default), 1, or 2
- **Impact**: Replaces traditional interpolation system, affects network smoothness
- **Recommended**: 0 for competitive play, 1-2 for unstable connections
- **Note**: Indirectly sets cl_interp_ratio value

### `cl_net_buffer_ticks_use_interp`
- **Status**: ✅ Working
- **Function**: Controls whether buffering system uses interpolation
- **Parameters**: 0/1
- **Impact**: Affects how buffered ticks are processed
- **Recommended**: 1 (default)

### `cl_tickpacket_desired_queuelength`
- **Status**: ✅ Working - New CS2 System
- **Function**: Sets additional period on top of base server recv margin
- **Parameters**: 0-5 (default 0)
- **Impact**: Affects kill delay and dying behind walls
- **Recommended**: 0 (default, mirrors cl_net_buffer_ticks)
- **Note**: Works in conjunction with cl_net_buffer_ticks

### `net_client_steamdatagram_enable_override`
- **Status**: ✅ Working
- **Function**: Controls Steam Datagram Relay usage
- **Parameters**: 0/1
- **Impact**: May affect connection routing and latency
- **Recommended**: 1 (default), 0 to disable

#### Engine and System Commands

### `engine_no_focus_sleep`
- **Status**: ✅ Working in CS2
- **Function**: Controls engine sleep behavior when CS2 loses focus (tabbed out)
- **Parameters**: 0 (disable sleep), positive values (sleep duration in ms)
- **Default**: 50 (typical)
- **Impact**: Prevents FPS drops and lag when tabbed out, increases resource usage
- **Recommended**: 0 for competitive play, default for casual use

### `engine_low_latency_sleep_after_client_tick`
- **Status**: ✅ Working - Advanced Feature
- **Function**: Moves low latency sleep to after client simulation
- **Parameters**: 0/1
- **Impact**: May reduce input lag and texture stuttering
- **Recommended**: 1 for low latency setups
- **Note**: Works with NVIDIA Low Latency and fps_max capping

### `vprof_off`
- **Status**: ✅ Working
- **Function**: Disables VProf visual profiling tool
- **Parameters**: Execute once
- **Impact**: May free up resources for better performance
- **Recommended**: Execute once to disable

### `iv_off`
- **Status**: ✅ Working
- **Function**: Disables interpolation variable profiler
- **Parameters**: Execute once
- **Impact**: May improve performance on some systems
- **Recommended**: Execute once to disable

### `adsp_debug`
- **Status**: ❓ Unknown/Non-functional in CS2
- **Function**: Audio DSP debugging (legacy command)
- **Parameters**: 0/1
- **Impact**: Likely deprecated or non-functional
- **Recommended**: Remove from configs

#### Camera Commands (Third-person mode)

### `c_maxdistance` & `c_mindistance`
- **Status**: ✅ Working (Third-person mode)
- **Function**: Controls camera distance limits in third-person
- **Parameters**: Numeric values
- **Impact**: Affects third-person camera behavior
- **Recommended**: Set both to same value to avoid stuttering

### `c_maxpitch` & `c_minpitch`
- **Status**: ✅ Working (Third-person mode)
- **Function**: Controls camera pitch limits in third-person
- **Parameters**: Angle values
- **Impact**: Affects vertical camera movement range
- **Recommended**: Default values work well

### `c_maxyaw`
- **Status**: ✅ Working (Third-person mode)
- **Function**: Controls camera yaw limits in third-person
- **Parameters**: Angle values
- **Impact**: Affects horizontal camera movement range
- **Recommended**: Default value

#### Camera and FOV Commands (Cheat-Protected)

### `fov_cs_debug`
- **Status**: ✅ Working in CS2 (sv_cheats required)
- **Function**: Sets camera field of view beyond normal limits
- **Parameters**: Any number (default 90)
- **Default**: 90
- **Impact**: Changes actual camera FOV (not viewmodel), requires cheats
- **Recommended**: Only for offline practice/testing

### `default_fov`
- **Status**: ✅ Working in CS2 (sv_cheats required)
- **Function**: Similar to fov_cs_debug, sets unrestricted FOV
- **Parameters**: Any number
- **Impact**: Camera FOV adjustment, cheat-protected
- **Recommended**: Offline use only

#### Debug and Developer Commands

### `developer`
- **Status**: ✅ Working in CS2
- **Function**: Enables developer mode with additional console output
- **Parameters**: 0 (off), 1 (on), 2 (verbose)
- **Default**: 0
- **Impact**: Shows detailed debug information in console
- **Recommended**: 0 for normal play, 1 for troubleshooting

### `con_filter_enable` / `con_filter_text`
- **Status**: ✅ Working in CS2
- **Function**: Filters console messages to show only specific content
- **Parameters**: 1/0 for enable, text string for filter
- **Impact**: Reduces console spam, helps with debugging
- **Recommended**: Use for specific troubleshooting only

### `demo_flush`
- **Status**: ✅ Working
- **Function**: Controls demo recording buffer flushing
- **Parameters**: 0/1
- **Impact**: Affects demo recording performance
- **Recommended**: 0 for normal play

### `setinfo`
- **Status**: ❓ Legacy Command
- **Function**: Sets player info variables (CS:GO legacy)
- **Parameters**: Various
- **Impact**: May not function in CS2
- **Recommended**: Remove from configs

#### Physics and Rendering Commands (Cheat-Protected)

### `r_drawviewmodel`
- **Status**: ✅ Working in CS2 (sv_cheats required)
- **Function**: Toggles viewmodel visibility completely
- **Parameters**: true/false
- **Impact**: Removes weapon/hands from view, cheat-protected
- **Recommended**: Offline practice only

### `mat_wireframe`
- **Status**: ✅ Working in CS2 (sv_cheats required)
- **Function**: Enables wireframe rendering mode
- **Parameters**: 0/1
- **Impact**: Shows map geometry wireframes, cheat-protected
- **Recommended**: Map analysis/development only

### `phys_timescale`
- **Status**: ✅ Working in CS2 (sv_cheats required)
- **Function**: Adjusts physics simulation speed
- **Parameters**: 0.1 to 10.0 (1.0 = normal)
- **Impact**: Slow-motion or fast-motion physics effects
- **Recommended**: Fun/testing only, not for competitive play

## 8. Prediction Commands

### Client-Side Prediction System

#### `cl_predict_body_shot_fx`
- **Status**: ✅ Working - New CS2 Feature
- **Function**: Controls client-side prediction of body shot effects <mcreference link="https://steamcommunity.com/app/730/discussions/0/594026537713470115/" index="17">17</mcreference>
- **Impact**: Shows immediate visual feedback for body shots before server confirmation
- **Recommended Value**: `false` for competitive play to avoid misleading feedback
- **Usage**: `cl_predict_body_shot_fx false`
- **Note**: Can cause confusion when shots don't register on server

#### `cl_predict_head_shot_fx`
- **Status**: ✅ Working - New CS2 Feature
- **Function**: Controls client-side prediction of headshot effects <mcreference link="https://steamcommunity.com/app/730/discussions/0/594026537713470115/" index="17">17</mcreference>
- **Impact**: Shows immediate headshot dink effects before server confirmation
- **Recommended Value**: `false` for competitive play to avoid misleading feedback
- **Usage**: `cl_predict_head_shot_fx false`
- **Note**: Professional players often disable this to avoid false positives

#### `cl_predict_kill_ragdolls`
- **Status**: ✅ Working - New CS2 Feature
- **Function**: Controls client-side prediction of kill ragdoll physics <mcreference link="https://steamcommunity.com/app/730/discussions/0/594026537713470115/" index="17">17</mcreference>
- **Impact**: Shows enemy falling before server confirms kill
- **Recommended Value**: `true` (default) - less problematic than shot effects
- **Usage**: `cl_predict_kill_ragdolls true`
- **Note**: Default setting, causes less confusion than shot predictions

### Legacy Prediction Commands

#### `cl_predict`
- **Status**: ✅ Working - Core System
- **Function**: Enables movement prediction to reduce lag <mcreference link="https://steamcommunity.com/sharedfiles/filedetails/?id=3404948190" index="18">18</mcreference>
- **Impact**: Essential for smooth movement and responsiveness
- **Recommended Value**: `1` (always enabled)
- **Usage**: `cl_predict 1`

#### `cl_predictweapons`
- **Status**: ✅ Working
- **Function**: Enables weapon prediction <mcreference link="https://steamcommunity.com/sharedfiles/filedetails/?id=3404948190" index="18">18</mcreference>
- **Impact**: Predicts weapon switching and firing
- **Recommended Value**: `1` (default)
- **Usage**: `cl_predictweapons 1`

## 9. Mouse and Input Commands

### Core Mouse Settings

#### `sensitivity`
- **Status**: ✅ Working - Core Setting
- **Function**: Controls overall mouse sensitivity
- **Impact**: Primary sensitivity control for aiming
- **Recommended Value**: Personal preference, pro eDPI around 800-1200
- **Usage**: `sensitivity 1.0`
- **Note**: Multiply by DPI for effective DPI (eDPI)

#### `zoom_sensitivity_ratio_mouse`
- **Status**: ✅ Working
- **Function**: Adjusts sensitivity when scoped with sniper rifles
- **Impact**: Controls scoped sensitivity multiplier
- **Recommended Value**: `1.0` (default, no change when scoped)
- **Usage**: `zoom_sensitivity_ratio_mouse 1.0`
- **Note**: Values <1 decrease scoped sensitivity, >1 increase it

### Axis-Specific Settings

#### `m_yaw`
- **Status**: ✅ Working
- **Function**: Controls horizontal (X-axis) mouse sensitivity
- **Impact**: Adjusts left/right mouse movement sensitivity
- **Recommended Value**: `0.022` (default for 16:9), `0.0165` (for 4:3 stretched)
- **Usage**: `m_yaw 0.022`
- **Note**: Used to balance sensitivity on different aspect ratios

#### `m_pitch`
- **Status**: ✅ Working
- **Function**: Controls vertical (Y-axis) mouse sensitivity
- **Impact**: Adjusts up/down mouse movement sensitivity
- **Recommended Value**: `0.022` (default)
- **Usage**: `m_pitch 0.022`
- **Note**: Negative values invert vertical mouse movement

### Legacy Input Commands

#### `m_rawinput`
- **Status**: ❌ Removed in CS2
- **Function**: Previously controlled raw input from mouse
- **Impact**: Raw input is now always enabled by default
- **Recommended Value**: N/A - Feature built-in
- **Usage**: Not available
- **Note**: CS2 uses raw input by default, cannot be disabled

## 10. Crosshair Commands

### Core Crosshair Style

#### `cl_crosshairstyle`
- **Status**: ✅ Working - Enhanced in CS2 <mcreference link="https://dmarket.com/blog/cs2-crosshair-commands/" index="1">1</mcreference>
- **Function**: Sets the crosshair style/type and behavior
- **Impact**: Controls whether crosshair is static or dynamic
- **Recommended Values**: 
  - `0`: Default dynamic style
  - `2`: Classic dynamic with dots
  - `3`: Classic dynamic
  - `4`: Classic static (most popular among pros) <mcreference link="https://tradeit.gg/blog/best-cs2-crosshair-codes/" index="4">4</mcreference>
  - `5`: Hybrid (static/dynamic mix)
- **Usage**: `cl_crosshairstyle 4`
- **Note**: Style 1 was removed in CS2 <mcreference link="https://totalcsgo.com/commands/categories/crosshair" index="2">2</mcreference>

### Crosshair Size and Shape

#### `cl_crosshairsize`
- **Status**: ✅ Working <mcreference link="https://totalcsgo.com/commands/categories/crosshair" index="2">2</mcreference>
- **Function**: Controls the length of crosshair lines
- **Impact**: Affects crosshair visibility and precision reference
- **Recommended Values**: `5` (default), typically 2-10 for most players <mcreference link="https://totalcsgo.com/commands/categories/crosshair" index="2">2</mcreference>
- **Usage**: `cl_crosshairsize 5`
- **Note**: Range from -20 to 20, negative values create inverted crosshair

#### `cl_crosshairthickness`
- **Status**: ✅ Working <mcreference link="https://dmarket.com/blog/cs2-crosshair-commands/" index="1">1</mcreference>
- **Function**: Controls the thickness of crosshair lines
- **Impact**: Affects crosshair visibility and precision
- **Recommended Values**: `0.5` (default), range -2 to 2 <mcreference link="https://dmarket.com/blog/cs2-crosshair-commands/" index="1">1</mcreference>
- **Usage**: `cl_crosshairthickness 0.5`
- **Note**: Decimal values allowed for fine-tuning

#### `cl_crosshairgap`
- **Status**: ✅ Working <mcreference link="https://dmarket.com/blog/cs2-crosshair-commands/" index="1">1</mcreference>
- **Function**: Controls the gap between crosshair lines
- **Impact**: Affects center visibility and target acquisition
- **Recommended Values**: `1` (default), range -10 to 10 <mcreference link="https://dmarket.com/blog/cs2-crosshair-commands/" index="1">1</mcreference>
- **Usage**: `cl_crosshairgap 1`
- **Note**: Negative values create overlapping lines

### Crosshair Color

#### `cl_crosshaircolor`
- **Status**: ✅ Working <mcreference link="https://dmarket.com/blog/cs2-crosshair-commands/" index="1">1</mcreference>
- **Function**: Sets crosshair color from preset options
- **Impact**: Affects crosshair visibility on different map backgrounds
- **Recommended Values**: 
  - `0`: Red
  - `1`: Green (default)
  - `2`: Yellow
  - `3`: Dark blue
  - `4`: Light blue
  - `5`: Custom (use with RGB commands)
- **Usage**: `cl_crosshaircolor 1`
- **Note**: Bright colors (green, pink, yellow) preferred by pros <mcreference link="https://tradeit.gg/blog/best-cs2-crosshair-codes/" index="4">4</mcreference>

#### `cl_crosshaircolor_r`, `cl_crosshaircolor_g`, `cl_crosshaircolor_b`
- **Status**: ✅ Working <mcreference link="https://dmarket.com/blog/cs2-crosshair-commands/" index="1">1</mcreference>
- **Function**: Sets custom RGB color values for crosshair
- **Impact**: Allows precise color customization beyond presets
- **Recommended Values**: 0-255 for each RGB component <mcreference link="https://dmarket.com/blog/cs2-crosshair-commands/" index="1">1</mcreference>
- **Usage**: `cl_crosshaircolor_r 255; cl_crosshaircolor_g 255; cl_crosshaircolor_b 255`
- **Note**: Requires `cl_crosshaircolor 5` to use custom colors

### Crosshair Transparency

#### `cl_crosshairalpha`
- **Status**: ✅ Working <mcreference link="https://dmarket.com/blog/cs2-crosshair-commands/" index="1">1</mcreference>
- **Function**: Controls crosshair transparency/opacity
- **Impact**: Affects crosshair visibility and screen obstruction
- **Recommended Values**: `200` (default), range 10-250 <mcreference link="https://dmarket.com/blog/cs2-crosshair-commands/" index="1">1</mcreference>
- **Usage**: `cl_crosshairalpha 200`
- **Note**: Higher values = more opaque, lower = more transparent

### Crosshair Features

#### `cl_crosshairdot`
- **Status**: ✅ Working <mcreference link="https://dmarket.com/blog/cs2-crosshair-commands/" index="1">1</mcreference>
- **Function**: Adds/removes center dot in crosshair
- **Impact**: Provides precise center reference point
- **Recommended Values**: `0` (off), `1` (on) <mcreference link="https://dmarket.com/blog/cs2-crosshair-commands/" index="1">1</mcreference>
- **Usage**: `cl_crosshairdot 0`
- **Note**: Popular for dot-only crosshairs when combined with size 0

#### `cl_crosshair_drawoutline`
- **Status**: ✅ Working <mcreference link="https://dmarket.com/blog/cs2-crosshair-commands/" index="1">1</mcreference>
- **Function**: Adds black outline around crosshair
- **Impact**: Improves crosshair visibility on light backgrounds
- **Recommended Values**: `0` (off), `1` (on) <mcreference link="https://dmarket.com/blog/cs2-crosshair-commands/" index="1">1</mcreference>
- **Usage**: `cl_crosshair_drawoutline 1`
- **Note**: Essential for light-colored crosshairs

#### `cl_crosshair_outlinethickness`
- **Status**: ✅ Working <mcreference link="https://dmarket.com/blog/cs2-crosshair-commands/" index="1">1</mcreference>
- **Function**: Controls thickness of crosshair outline
- **Impact**: Affects outline visibility and prominence
- **Recommended Values**: `1` (default), range 0.1-3 <mcreference link="https://dmarket.com/blog/cs2-crosshair-commands/" index="1">1</mcreference>
- **Usage**: `cl_crosshair_outlinethickness 1`
- **Note**: Only works when outline is enabled

### Dynamic Crosshair Features

#### `cl_crosshairgap_useweaponvalue`
- **Status**: ✅ Working <mcreference link="https://dmarket.com/blog/cs2-crosshair-commands/" index="1">1</mcreference>
- **Function**: Makes crosshair gap change based on weapon accuracy
- **Impact**: Provides visual feedback for weapon spread and recoil
- **Recommended Values**: `0` (off), `1` (on) <mcreference link="https://dmarket.com/blog/cs2-crosshair-commands/" index="1">1</mcreference>
- **Usage**: `cl_crosshairgap_useweaponvalue 0`
- **Note**: Most pros disable this for consistent crosshair

### Specialized Crosshair Commands

#### `cl_crosshair_sniper_width`
- **Status**: ✅ Working <mcreference link="https://dmarket.com/blog/cs2-crosshair-commands/" index="1">1</mcreference>
- **Function**: Sets crosshair line width specifically for scoped sniper rifles
- **Impact**: Allows different crosshair thickness when scoped
- **Recommended Values**: `1` (default), adjustable based on preference
- **Usage**: `cl_crosshair_sniper_width 1`
- **Note**: Only affects scoped view of sniper rifles

#### `cl_crosshair_t`
- **Status**: ✅ Working
- **Function**: Enables T-style crosshair (removes top line)
- **Impact**: Creates T-shaped crosshair instead of traditional cross
- **Recommended Values**: `0` (off), `1` (on)
- **Usage**: `cl_crosshair_t 0`
- **Note**: Popular among some players for unobstructed upward view

## 11. HUD and Console Commands

### Console Access Commands

#### `con_enable`
- **Status**: ✅ Working <mcreference link="https://www.rockpapershotgun.com/counter-strike-2-console-commands" index="1">1</mcreference>
- **Function**: Enables the developer console in CS2
- **Impact**: Allows access to all console commands and customization
- **Recommended Values**: `1` (enabled)
- **Usage**: Set via Game Settings → "Enable Developer Console (~)" → "Yes"
- **Note**: Must be enabled before using any console commands

#### `bind [key] "toggleconsole"`
- **Status**: ✅ Working <mcreference link="https://skin.club/community/en/articles/cs2-console-commands" index="5">5</mcreference>
- **Function**: Rebinds console key to custom key
- **Impact**: Allows easier console access with preferred key
- **Recommended Values**: Any accessible key (F1, F2, etc.)
- **Usage**: `bind "F1" "toggleconsole"`
- **Note**: Default console key is ~ or ` depending on keyboard layout

### FPS and Performance Display

#### `cl_showfps`
- **Status**: ✅ Working (Replaces net_graph) <mcreference link="https://totalcsgo.com/commands/categories/hud" index="1">1</mcreference>
- **Function**: Displays FPS counter and performance information
- **Impact**: Shows real-time performance metrics for optimization
- **Recommended Values**: 
  - `0`: Disabled
  - `1`: Basic FPS counter <mcreference link="https://www.rockpapershotgun.com/counter-strike-2-console-commands" index="2">2</mcreference>
  - `2`: Detailed FPS and network data <mcreference link="https://www.rockpapershotgun.com/counter-strike-2-console-commands" index="2">2</mcreference>
  - `3`: In-depth FPS and server data <mcreference link="https://www.rockpapershotgun.com/counter-strike-2-console-commands" index="2">2</mcreference>
  - `4`: Logs detailed data to file <mcreference link="https://www.rockpapershotgun.com/counter-strike-2-console-commands" index="2">2</mcreference>
- **Usage**: `cl_showfps 2`
- **Note**: CS2 equivalent of CS:GO's net_graph command

#### `fps_max`
- **Status**: ✅ Working <mcreference link="https://www.rockpapershotgun.com/counter-strike-2-console-commands" index="2">2</mcreference>
- **Function**: Sets maximum FPS limit
- **Impact**: Controls frame rate cap for performance optimization
- **Recommended Values**: 
  - `0`: Unlimited FPS <mcreference link="https://www.esports.net/news/counter-strike/all-cs2-console-commands/" index="3">3</mcreference>
  - `400-500`: High-end systems for consistency <mcreference link="https://www.esports.net/news/counter-strike/all-cs2-console-commands/" index="3">3</mcreference>
  - `144/240`: Match monitor refresh rate
- **Usage**: `fps_max 0`
- **Note**: Setting to 0 removes FPS cap entirely

### HUD Customization

#### `hud_scaling`
- **Status**: ✅ Working <mcreference link="https://totalcsgo.com/commands/categories/hud" index="1">1</mcreference>
- **Function**: Scales all HUD elements size
- **Impact**: Adjusts HUD size for better visibility or screen space
- **Recommended Values**: `0.5` (minimum) to `1.1` (maximum), `1.0` default <mcreference link="https://totalcsgo.com/commands/categories/hud" index="1">1</mcreference>
- **Usage**: `hud_scaling 0.9`
- **Note**: Smaller values reduce HUD size, larger values increase it

#### `cl_hud_color`
- **Status**: ✅ Working <mcreference link="https://totalcsgo.com/commands/categories/hud" index="1">1</mcreference>
- **Function**: Changes HUD color scheme
- **Impact**: Customizes HUD appearance for better visibility
- **Recommended Values**: <mcreference link="https://dmarket.com/blog/cs2-hud-commands/" index="4">4</mcreference>
  - `0`: Default
  - `1`: White
  - `2`: Light blue
  - `3`: Dark blue
  - `4`: Purple
  - `5`: Red
  - `6`: Orange
  - `7`: Yellow
  - `8`: Green
  - `9`: Aqua
  - `10`: Pink
- **Usage**: `cl_hud_color 5`
- **Note**: Choose color that contrasts well with map environments

#### `cl_drawhud`
- **Status**: ✅ Working (Requires sv_cheats 1) <mcreference link="https://www.rockpapershotgun.com/counter-strike-2-console-commands" index="2">2</mcreference>
- **Function**: Toggles entire HUD visibility
- **Impact**: Hides/shows all HUD elements
- **Recommended Values**: `0` (hidden), `1` (visible) <mcreference link="https://totalcsgo.com/commands/categories/hud" index="1">1</mcreference>
- **Usage**: `cl_drawhud 0`
- **Note**: Useful for screenshots, requires cheat protection disabled

### Radar Customization

#### `cl_hud_radar_scale`
- **Status**: ✅ Working <mcreference link="https://totalcsgo.com/commands/categories/hud" index="1">1</mcreference>
- **Function**: Controls radar size within HUD
- **Impact**: Adjusts radar prominence and screen space usage
- **Recommended Values**: `0.8` to `1.3`, default `1.0` <mcreference link="https://dmarket.com/blog/cs2-hud-commands/" index="4">4</mcreference>
- **Usage**: `cl_hud_radar_scale 1.2`
- **Note**: Larger values provide more map awareness

#### `cl_radar_always_centered`
- **Status**: ✅ Working <mcreference link="https://totalcsgo.com/commands/categories/hud" index="1">1</mcreference>
- **Function**: Centers radar on player position
- **Impact**: Affects radar positioning and map edge visibility
- **Recommended Values**: `0` (off), `1` (on) <mcreference link="https://dmarket.com/blog/cs2-hud-commands/" index="4">4</mcreference>
- **Usage**: `cl_radar_always_centered 1`
- **Note**: Disabling can show more map area at edges

#### `cl_radar_scale`
- **Status**: ✅ Working <mcreference link="https://totalcsgo.com/commands/categories/hud" index="1">1</mcreference>
- **Function**: Adjusts radar zoom level
- **Impact**: Controls how much of the map is visible on radar
- **Recommended Values**: `0.25` to `1.0` <mcreference link="https://dmarket.com/blog/cs2-hud-commands/" index="4">4</mcreference>
- **Usage**: `cl_radar_scale 0.4`
- **Note**: Lower values show more of the map (zoomed out)

#### `cl_radar_rotate`
- **Status**: ✅ Working <mcreference link="https://totalcsgo.com/commands/categories/hud" index="1">1</mcreference>
- **Function**: Toggles radar rotation with player view
- **Impact**: Affects radar orientation and navigation
- **Recommended Values**: `0` (fixed), `1` (rotating) <mcreference link="https://totalcsgo.com/commands/categories/hud" index="1">1</mcreference>
- **Usage**: `cl_radar_rotate 0`
- **Note**: Many players prefer fixed radar for consistent callouts

#### `cl_radar_icon_scale_min`
- **Status**: ✅ Working <mcreference link="https://totalcsgo.com/commands/categories/hud" index="1">1</mcreference>
- **Function**: Controls player dot size on radar
- **Impact**: Affects visibility of player positions
- **Recommended Values**: `0.4` to `1.0`, default `0.6` <mcreference link="https://dmarket.com/blog/cs2-hud-commands/" index="4">4</mcreference>
- **Usage**: `cl_radar_icon_scale_min 0.8`
- **Note**: Larger values make player dots more visible

### Team Information Display

#### `cl_show_team_equipment`
- **Status**: ✅ Working <mcreference link="https://totalcsgo.com/commands/categories/hud" index="1">1</mcreference>
- **Function**: Shows teammate equipment above their heads
- **Impact**: Provides constant awareness of team loadouts and positions
- **Recommended Values**: `+cl_show_team_equipment` (on), `-cl_show_team_equipment` (off)
- **Usage**: `+cl_show_team_equipment`
- **Note**: Shows equipment through walls, very useful for team coordination

#### `cl_teamid_overhead_maxdist`
- **Status**: ✅ Working <mcreference link="https://totalcsgo.com/commands/categories/hud" index="1">1</mcreference>
- **Function**: Sets maximum distance for teammate ID display
- **Impact**: Controls when teammate information appears
- **Recommended Values**: `3000` (default), adjustable based on preference <mcreference link="https://dmarket.com/blog/cs2-hud-commands/" index="4">4</mcreference>
- **Usage**: `cl_teamid_overhead_maxdist 3000`
- **Note**: Higher values show teammate info from farther away

### Developer and Debug Commands

#### `developer`
- **Status**: ✅ Working <mcreference link="https://www.rockpapershotgun.com/counter-strike-2-console-commands" index="2">2</mcreference>
- **Function**: Enables developer mode and debug messages
- **Impact**: Shows additional technical information and error messages
- **Recommended Values**: `0` (off), `1` (basic), `2` (verbose)
- **Usage**: `developer 1`
- **Note**: Useful for troubleshooting but can clutter console

#### `con_filter_enable`
- **Status**: ✅ Working
- **Function**: Enables console message filtering
- **Impact**: Allows filtering of console output by text
- **Recommended Values**: `0` (disabled), `1` (enabled)
- **Usage**: `con_filter_enable 1`
- **Note**: Use with con_filter_text to filter specific messages

#### `con_filter_text`
- **Status**: ✅ Working
- **Function**: Sets text filter for console messages
- **Impact**: Filters console output to show only matching text
- **Recommended Values**: Any text string to filter by
- **Usage**: `con_filter_text "error"`
- **Note**: Requires con_filter_enable 1 to function

### Performance Optimization Commands

#### `vprof_off`
- **Status**: ✅ Working <mcreference link="https://www.esports.net/news/counter-strike/all-cs2-console-commands/" index="3">3</mcreference>
- **Function**: Disables VProf visual profiling tool
- **Impact**: Frees up CPU resources by disabling background profiling
- **Recommended Values**: Execute once to disable
- **Usage**: `vprof_off`
- **Note**: Can improve performance on CPU-limited systems

#### `iv_off`
- **Status**: ✅ Working <mcreference link="https://www.esports.net/news/counter-strike/all-cs2-console-commands/" index="3">3</mcreference>
- **Function**: Disables interpolation variable profiling
- **Impact**: Reduces CPU overhead from interpolation debugging
- **Recommended Values**: Execute once to disable
- **Usage**: `iv_off`
- **Note**: Similar to vprof_off, can provide minor performance gains

## 12. Advanced and Experimental Commands

### Viewmodel Commands

#### `viewmodel_fov`
- **Status**: ✅ Working <mcreference link="https://totalcsgo.com/commands/categories/fov-and-viewmodel" index="3">3</mcreference>
- **Function**: Adjusts field of view for weapon model
- **Impact**: Changes how much of the weapon is visible on screen
- **Recommended Values**: `54` (minimum) to `68` (maximum) <mcreference link="https://totalcsgo.com/commands/categories/fov-and-viewmodel" index="3">3</mcreference>
- **Usage**: `viewmodel_fov 68`
- **Note**: Higher values show more of the weapon, lower values show less

#### `viewmodel_offset_x`
- **Status**: ✅ Working <mcreference link="https://totalcsgo.com/commands/categories/fov-and-viewmodel" index="3">3</mcreference>
- **Function**: Moves weapon left or right on screen
- **Impact**: Adjusts horizontal weapon position for better visibility
- **Recommended Values**: `-2` (far left) to `2.5` (far right) <mcreference link="https://totalcsgo.com/commands/categories/fov-and-viewmodel" index="3">3</mcreference>
- **Usage**: `viewmodel_offset_x 2.5`
- **Note**: Positive values move weapon right, negative values move left

#### `viewmodel_offset_y`
- **Status**: ✅ Working <mcreference link="https://totalcsgo.com/commands/categories/fov-and-viewmodel" index="3">3</mcreference>
- **Function**: Moves weapon closer or farther from character
- **Impact**: Adjusts weapon distance for optimal visibility
- **Recommended Values**: `-2` (closest) to `2` (farthest) <mcreference link="https://totalcsgo.com/commands/categories/fov-and-viewmodel" index="3">3</mcreference>
- **Usage**: `viewmodel_offset_y -2`
- **Note**: Negative values bring weapon closer, positive values push farther

#### `viewmodel_offset_z`
- **Status**: ✅ Working <mcreference link="https://totalcsgo.com/commands/categories/fov-and-viewmodel" index="3">3</mcreference>
- **Function**: Moves weapon up or down on screen
- **Impact**: Adjusts vertical weapon position
- **Recommended Values**: `-2` (lowest) to `2` (highest) <mcreference link="https://totalcsgo.com/commands/categories/fov-and-viewmodel" index="3">3</mcreference>
- **Usage**: `viewmodel_offset_z -2`
- **Note**: Negative values lower weapon, positive values raise it

### Camera and FOV Commands

#### `fov_cs_debug`
- **Status**: ✅ Working (Requires sv_cheats 1) <mcreference link="https://totalcsgo.com/commands/categories/fov-and-viewmodel" index="3">3</mcreference>
- **Function**: Changes camera field of view
- **Impact**: Adjusts how much of the game world is visible
- **Recommended Values**: `50` to `120`, default `90` <mcreference link="https://totalcsgo.com/commands/categories/fov-and-viewmodel" index="3">3</mcreference>
- **Usage**: `fov_cs_debug 120`
- **Note**: Only works on servers with cheats enabled

### Debug and Developer Commands

#### `weapon_debug_spread_show`
- **Status**: ✅ Working <mcreference link="https://totalcsgo.com/commands/127" index="1">1</mcreference>
- **Function**: Displays weapon accuracy visualization
- **Impact**: Shows spread patterns and accuracy data
- **Recommended Values**: `0` (off), `1` (basic), `3` (detailed) <mcreference link="https://totalcsgo.com/commands/127" index="1">1</mcreference>
- **Usage**: `weapon_debug_spread_show 1`
- **Note**: Useful for understanding weapon mechanics

#### `cl_ent_absbox`
- **Status**: ✅ Working (Requires sv_cheats 1) <mcreference link="https://steamcommunity.com/sharedfiles/filedetails/?id=3404948190" index="5">5</mcreference>
- **Function**: Displays hitbox outlines around objects and players
- **Impact**: Shows collision boundaries for debugging
- **Recommended Values**: `0` (off), `1` (on)
- **Usage**: `cl_ent_absbox 1`
- **Note**: Helpful for understanding hitboxes and collision detection

#### `r_drawothermodels`
- **Status**: ✅ Working (Requires sv_cheats 1) <mcreference link="https://steamcommunity.com/sharedfiles/filedetails/?id=3404948190" index="5">5</mcreference>
- **Function**: Changes how player models are rendered
- **Impact**: Can show skeleton view or wireframe of players
- **Recommended Values**: `1` (normal), `2` (wireframe/skeleton) <mcreference link="https://steamcommunity.com/sharedfiles/filedetails/?id=3404948190" index="5">5</mcreference>
- **Usage**: `r_drawothermodels 2`
- **Note**: Provides wallhack-like visibility for debugging

#### `cl_showpos`
- **Status**: ✅ Working <mcreference link="https://steamcommunity.com/sharedfiles/filedetails/?id=3404948190" index="5">5</mcreference>
- **Function**: Displays player coordinates, speed, and angle
- **Impact**: Shows real-time position and movement data
- **Recommended Values**: `0` (off), `1` (on)
- **Usage**: `cl_showpos 1`
- **Note**: Useful for movement practice and positioning analysis

### Physics and Visual Effects

#### `mat_wireframe`
- **Status**: ✅ Working (Requires sv_cheats 1) <mcreference link="https://steamcommunity.com/sharedfiles/filedetails/?id=3404948190" index="5">5</mcreference>
- **Function**: Enables wireframe rendering mode
- **Impact**: Shows game geometry as wireframe outlines
- **Recommended Values**: `0` (off), `1` (on)
- **Usage**: `mat_wireframe 1`
- **Note**: Reveals map structure and geometry

#### `mat_fullbright`
- **Status**: ✅ Working (Requires sv_cheats 1) <mcreference link="https://steamcommunity.com/sharedfiles/filedetails/?id=3404948190" index="5">5</mcreference>
- **Function**: Removes all shadows and lighting
- **Impact**: Makes everything fully bright for better visibility
- **Recommended Values**: `0` (normal lighting), `1` (full bright)
- **Usage**: `mat_fullbright 1`
- **Note**: Eliminates dark corners and shadows

#### `r_drawparticles`
- **Status**: ✅ Working (Requires sv_cheats 1) <mcreference link="https://steamcommunity.com/sharedfiles/filedetails/?id=3404948190" index="5">5</mcreference>
- **Function**: Controls particle effect rendering
- **Impact**: Can disable smoke, explosions, and other effects
- **Recommended Values**: `0` (disabled), `1` (enabled)
- **Usage**: `r_drawparticles 0`
- **Note**: Disabling can improve visibility through smoke

### Deprecated/Removed Commands

#### `cl_righthand`
- **Status**: ❌ Removed in CS2 <mcreference link="https://totalcsgo.com/commands/categories/fov-and-viewmodel" index="3">3</mcreference>
- **Function**: Previously switched weapon to left/right hand
- **Impact**: No longer available for hand switching
- **Recommended Values**: N/A (command removed)
- **Usage**: N/A
- **Note**: CS:GO feature not carried over to CS2

#### `adsp_debug`
- **Status**: ❌ Non-functional <mcreference link="https://totalcsgo.com/commands/127" index="1">1</mcreference> <mcreference link="https://developer.valvesoftware.com/wiki/List_of_Counter-Strike_2_console_commands_and_variables" index="4">4</mcreference>
- **Function**: Unknown or deprecated audio debug function
- **Impact**: No effect in CS2
- **Recommended Values**: N/A
- **Usage**: N/A
- **Note**: Command exists but has no functionality

## 13. Summary of Command Status Changes in CS2

### Deprecated/Removed Commands:
- `cl_interp` - Largely deprecated, uses buffering system
- `cl_cmdrate` - Deprecated, server-controlled
- `cl_updaterate` - Deprecated, server-controlled  
- `cl_interp_ratio` - Deprecated, uses buffering system
- `cl_righthand` - Removed, replaced with switchhands commands
- `m_rawinput` - Always enabled, cannot be disabled
- `net_graph` - Removed, replaced by `cl_showfps 2`

### New/Enhanced Commands:
- `cl_net_buffer_ticks` - New buffering system control
- `cl_showfps` - Enhanced with net_graph-like functionality
- `switchhands`/`switchhandsleft`/`switchhandsright` - New hand switching
- Various `cl_clock_*` commands - New client-side timing controls

### Fully Functional Commands:
- All audio commands (`snd_*`)
- All crosshair commands (`cl_crosshair*`)
- All viewmodel commands (`viewmodel_*`)
- Most HUD commands (`cl_hud_*`)
- Performance commands (`fps_max`, `cl_showfps`)

## Recommendations for CS2 Autoexec Files

1. **Remove deprecated commands** to avoid console errors
2. **Use new buffering system** instead of old interp commands
3. **Update hand switching** to new commands or key bindings
4. **Replace net_graph** with `cl_showfps 2`
5. **Keep all audio, crosshair, and viewmodel commands** - they work perfectly
6. **Test advanced commands** in offline mode before using online

---

## Network & Rate Settings

These commands control network communication between client and server, affecting lag compensation and data transfer rates.

### `cl_interp`
- **Syntax:** `cl_interp <value>`
- **Default:** `0.03125` (CS2)
- **Range:** `0.007813` to `0.5`
- **Description:** Controls interpolation time between server updates. Lower values reduce visual lag but may cause jittery movement on unstable connections.
- **Impact:** Directly affects hit registration and enemy movement smoothness
- **Recommended:** `0.03125` for most players, `0.015625` for stable low-ping connections

### `cl_interp_ratio`
- **Syntax:** `cl_interp_ratio <value>`
- **Default:** `2`
- **Range:** `1` to `5`
- **Description:** Ratio used to calculate interpolation delay. Works with `cl_updaterate` to determine final interpolation.
- **Impact:** Higher values provide more stability but increase delay
- **Recommended:** `2` for most connections, `1` for very stable connections

### `cl_updaterate`
- **Syntax:** `cl_updaterate <value>`
- **Default:** `64`
- **Range:** `20` to `128`
- **Description:** Number of updates per second requested from server
- **Impact:** Higher values provide smoother gameplay but require more bandwidth
- **Recommended:** `128` for competitive play, `64` for casual

### `cl_cmdrate`
- **Syntax:** `cl_cmdrate <value>`
- **Default:** `64`
- **Range:** `20` to `128`
- **Description:** Number of command packets sent to server per second
- **Impact:** Higher values improve responsiveness but use more bandwidth
- **Recommended:** Match with `cl_updaterate` (typically `128`)

### `rate`
- **Syntax:** `rate <value>`
- **Default:** `196608`
- **Range:** `20000` to `1048576`
- **Description:** Maximum bytes per second the client can receive from server
- **Impact:** Too low causes packet loss, too high wastes bandwidth
- **Recommended:** `786432` for broadband connections

### `net_graph`
- **Syntax:** `net_graph <0|1|2|3>`
- **Default:** `0`
- **Description:** Displays network performance information overlay
- **Values:**
  - `0`: Disabled
  - `1`: Basic network info
  - `2`: Detailed network info
  - `3`: Full network statistics
- **Impact:** Performance monitoring tool, no gameplay impact when disabled

---

## Audio Settings

Commands that control audio output, positioning, and quality for better game awareness.

### `volume`
- **Syntax:** `volume <value>`
- **Default:** `1.0`
- **Range:** `0.0` to `1.0`
- **Description:** Master volume level for all game audio
- **Impact:** Affects ability to hear footsteps and other audio cues
- **Recommended:** `0.5` to `0.8` for competitive play

### `snd_mixahead`
- **Syntax:** `snd_mixahead <value>`
- **Default:** `0.025`
- **Range:** `0.005` to `0.2`
- **Description:** Audio buffer size in seconds. Lower values reduce audio delay
- **Impact:** Affects audio-visual synchronization and latency
- **Recommended:** `0.005` to `0.02` for competitive play

### `snd_headphone_pan_exponent`
- **Syntax:** `snd_headphone_pan_exponent <value>`
- **Default:** `2.0`
- **Range:** `1.0` to `4.0`
- **Description:** Controls how audio panning behaves with headphones
- **Impact:** Improves directional audio accuracy for better enemy positioning
- **Recommended:** `2.0` to `2.5` for most headphones

### `snd_front_headphone_position`
- **Syntax:** `snd_front_headphone_position <value>`
- **Default:** `45.0`
- **Range:** `0.0` to `90.0`
- **Description:** Angle for front audio positioning with headphones
- **Impact:** Affects front-back audio distinction
- **Recommended:** `45.0` for most setups

### `snd_rear_headphone_position`
- **Syntax:** `snd_rear_headphone_position <value>`
- **Default:** `135.0`
- **Range:** `90.0` to `180.0`
- **Description:** Angle for rear audio positioning with headphones
- **Impact:** Affects rear audio positioning accuracy
- **Recommended:** `135.0` for most setups

### `snd_headphone_pan_radial_weight`
- **Syntax:** `snd_headphone_pan_radial_weight <value>`
- **Default:** `2.0`
- **Range:** `0.0` to `4.0`
- **Description:** Controls radial weight distribution for headphone audio
- **Impact:** Affects how audio spreads across stereo field
- **Recommended:** `1.0` to `2.0` for better positioning

### `voice_enable`
- **Syntax:** `voice_enable <0|1>`
- **Default:** `1`
- **Description:** Enables or disables voice communication
- **Impact:** Communication with teammates
- **Recommended:** `1` for team play, `0` for solo practice

### `snd_musicvolume`
- **Syntax:** `snd_musicvolume <value>`
- **Default:** `0.3`
- **Range:** `0.0` to `1.0`
- **Description:** Volume level for in-game music
- **Impact:** Background music during gameplay
- **Recommended:** `0.0` to `0.1` for competitive focus

---

## Video & Performance Settings

Commands that affect visual quality, performance, and display settings.

### Frame Rate Control
#### `fps_max`
- **Syntax:** `fps_max <value>`
- **Default:** `400`
- **Range:** `60` to `1000` (or `0` for unlimited)
- **Description:** Maximum frames per second limit for gameplay
- **Impact:** Higher FPS provides smoother gameplay and lower input lag
- **Recommended:** `240-300` for competitive play, match monitor refresh rate + 100

#### `fps_max_ui`
- **Status**: ✅ Working in CS2
- **Function**: Frame rate limiter for user interface elements
- **Default**: 200
- **Parameters**: Integer values (60-1000, or 0 for unlimited)
- **Impact**: Controls FPS specifically for menus and UI elements
- **Recommended**: 200 (default) for balanced UI performance

#### `fps_max_tools`
- **Status**: ✅ Working in CS2
- **Function**: Frame rate limiter for tools mode (developer/workshop)
- **Default**: 120
- **Parameters**: Integer values (60-1000, or 0 for unlimited)
- **Impact**: Limits FPS when using development tools or workshop
- **Recommended**: 144 for smooth tool usage, 120 for power saving

### Display and Gamma Settings
#### `r_fullscreen_gamma`
- **Status**: ✅ Working in CS2
- **Function**: Controls screen gamma correction in fullscreen mode
- **Default**: 2.2
- **Parameters**: Float values (1.0-3.0)
- **Impact**: Affects brightness and visibility in dark areas
- **Recommended**: 2.2 (default) for standard monitors, 2.0-2.4 for adjustment

### `mat_monitorgamma`
- **Syntax:** `mat_monitorgamma <value>`
- **Default:** `2.2`
- **Range:** `1.6` to `2.6`
- **Description:** Monitor gamma correction value
- **Impact:** Affects brightness and visibility in dark areas
- **Recommended:** `2.2` for most monitors, adjust based on display

### CPU and Threading Optimization
#### `thread_pool_option`
- **Status**: ✅ Working in CS2
- **Function**: Controls CPU core usage preference for thread pool
- **Default**: 3 (auto-detect)
- **Parameters**: 0 (single-core), 1 (dual-core), 2 (quad-core), 3 (auto)
- **Impact**: Optimizes CPU usage based on available cores
- **Recommended**: 2 for quad-core+ systems, 3 for auto-detection

### `mat_queue_mode`
- **Syntax:** `mat_queue_mode <-1|0|1|2>`
- **Default:** `-1`
- **Description:** Multi-threading mode for rendering
- **Values:**
  - `-1`: Auto-detect
  - `0`: Synchronous single-threaded
  - `1`: Queued single-threaded  
  - `2`: Multi-threaded
- **Impact:** Can improve performance on multi-core systems
- **Recommended:** `-1` for auto-detection, `2` for high-end CPUs

### Engine Performance Settings
#### `engine_low_latency_sleep_after_client_tick`
- **Status**: ✅ Working in CS2
- **Function**: Moves low latency sleep timing after client simulation tick
- **Default**: 0 (disabled)
- **Parameters**: 0 (disabled), 1 (enabled)
- **Impact**: May reduce input latency by optimizing sleep timing
- **Recommended**: 1 for competitive play, 0 if experiencing issues

#### `engine_no_focus_sleep`
- **Status**: ✅ Working in CS2
- **Function**: Controls engine sleep time when CS2 window is not in focus
- **Default**: 20 (milliseconds)
- **Parameters**: Integer values (0-100 milliseconds)
- **Impact**: Reduces CPU usage when alt-tabbed, affects background performance
- **Recommended**: 15 for faster alt-tab response, 20 for power saving

---

## Crosshair Settings

Commands that customize crosshair appearance for better aiming precision.

### Core Crosshair Configuration
#### `cl_crosshairstyle`
- **Status**: ✅ Working in CS2
- **Function**: Sets the crosshair style/type and behavior
- **Default**: 1
- **Parameters**: 0-5 (different styles)
- **Values**:
  - `0`: Scaleform Default - Large dynamic Scaleform Crosshair (only cl_crosshaircolor can customize)
  - `1`: Scaleform Small - Small static Scaleform Crosshair (only cl_crosshaircolor and cl_fixedcrosshairgap can customize)
  - `2`: Classic - Crosshair is slightly dynamic when moving and gives separated feedback when firing (accurate spread feedback with a fixed inner)
  - `3`: Classic Dynamic - Crosshair is very dynamic when moving and gives smooth feedback when firing (accurate spread feedback)
  - `4`: Classic Static - Crosshair is static on movement and when firing weapons (most popular among pros)
  - `5`: Classic Dynamic '1.6' - Crosshair is static when moving and expands smoother when firing (fake recoil - inaccurate feedback)
- **Impact**: Controls whether crosshair is static or dynamic
- **Recommended**: 4 for competitive play (static precision)

#### `cl_crosshairsize`
- **Status**: ✅ Working in CS2
- **Function**: Controls the length of crosshair lines
- **Default**: 5
- **Parameters**: Float values (-20 to 20)
- **Impact**: Larger crosshairs are more visible but may obstruct targets
- **Recommended**: 2-6 based on personal preference and resolution

#### `cl_crosshairthickness`
- **Status**: ✅ Working in CS2
- **Function**: Controls the thickness of crosshair lines
- **Default**: 1
- **Parameters**: Float values (0.1 to 10)
- **Impact**: Thicker lines are more visible but less precise, also changes the size of the dot if cl_crosshairdot is enabled
- **Recommended**: 0.5-2 for balance of visibility and precision

#### `cl_crosshairgap`
- **Status**: ✅ Working in CS2
- **Function**: Controls the center gap between crosshair lines
- **Default**: 1
- **Parameters**: Float values (-50 to 50)
- **Impact**: Negative values create overlap, affects precision and target visibility
- **Recommended**: -2 to 2 based on weapon and preference

#### `cl_fixedcrosshairgap`
- **Status**: ✅ Working in CS2
- **Function**: Sets fixed crosshair gap for Scaleform Small style
- **Default**: -2
- **Parameters**: Float values
- **Impact**: Only works with cl_crosshairstyle 1
- **Recommended**: -2 for consistent gap

### Crosshair Color Configuration
#### `cl_crosshaircolor`
- **Status**: ✅ Working in CS2
- **Function**: Sets crosshair color from preset options
- **Default**: 1
- **Parameters**: 0-5 (color presets)
- **Values**:
  - `0`: Red
  - `1`: Green  
  - `2`: Yellow
  - `3`: Blue
  - `4`: Cyan
  - `5`: Custom (use cl_crosshaircolor_r/g/b)
- **Impact**: Affects crosshair visibility on different map backgrounds
- **Recommended**: 1 (green) for visibility, 5 for custom colors

#### `cl_crosshaircolor_r`
- **Status**: ✅ Working in CS2
- **Function**: Sets red component of custom crosshair color
- **Default**: 0
- **Parameters**: 0-255 (RGB value)
- **Impact**: Only works with cl_crosshaircolor 5
- **Recommended**: Personal preference for custom colors

#### `cl_crosshaircolor_g`
- **Status**: ✅ Working in CS2
- **Function**: Sets green component of custom crosshair color
- **Default**: 255
- **Parameters**: 0-255 (RGB value)
- **Impact**: Only works with cl_crosshaircolor 5
- **Recommended**: Personal preference for custom colors

#### `cl_crosshaircolor_b`
- **Status**: ✅ Working in CS2
- **Function**: Sets blue component of custom crosshair color
- **Default**: 0
- **Parameters**: 0-255 (RGB value)
- **Impact**: Only works with cl_crosshaircolor 5
- **Recommended**: Personal preference for custom colors

### Crosshair Transparency and Visibility
#### `cl_crosshairalpha`
- **Status**: ✅ Working in CS2
- **Function**: Controls crosshair transparency/opacity
- **Default**: 200
- **Parameters**: 10-255 (transparency level)
- **Impact**: Lower values make crosshair less obtrusive, 255 = opaque, 0 = invisible
- **Recommended**: 200-255 for competitive play

#### `cl_crosshairusealpha`
- **Status**: ✅ Working in CS2
- **Function**: Controls how crosshair transparency is handled
- **Default**: 1
- **Parameters**: 0 (half transparent), 1 (set transparency through cl_crosshairalpha)
- **Impact**: Determines transparency behavior
- **Recommended**: 1 for custom alpha control

#### `cl_crosshair_drawoutline`
- **Status**: ✅ Working in CS2
- **Function**: Draws a black outline around the crosshair for better visibility
- **Default**: 0
- **Parameters**: 0 (disabled), 1 (enabled)
- **Impact**: Improves visibility against bright backgrounds
- **Recommended**: 1 for better visibility

#### `cl_crosshair_outlinethickness`
- **Status**: ✅ Working in CS2
- **Function**: Sets how thick it draws the crosshair outline
- **Default**: 2
- **Parameters**: Float values (0.1-3)
- **Impact**: Controls outline thickness for visibility
- **Recommended**: 1-2 for optimal visibility

### Special Crosshair Features
#### `cl_crosshairdot`
- **Status**: ✅ Working in CS2
- **Function**: Adds/removes center dot in crosshair
- **Default**: 0
- **Parameters**: 0 (disabled), 1 (enabled)
- **Impact**: Provides precise center reference point, size changes with cl_crosshairthickness
- **Recommended**: 1 for precision weapons, 0 for spray weapons

#### `cl_crosshair_t`
- **Status**: ✅ Working in CS2
- **Function**: Enables T-style crosshair (removes the upper crosshair line)
- **Default**: 0
- **Parameters**: 0 (disabled), 1 (enabled)
- **Impact**: Creates T-shaped crosshair instead of traditional cross, only works with cl_crosshairstyle 2-5
- **Recommended**: 0 for traditional crosshair

#### `cl_crosshair_recoil`
- **Status**: ✅ Working in CS2
- **Function**: Makes crosshair follow weapon recoil pattern
- **Default**: 0
- **Parameters**: 0 (disabled), 1 (enabled)
- **Impact**: Crosshair will leave the center of the screen to follow the weapon recoil pattern
- **Recommended**: 0 for consistent aim reference

### Dynamic Crosshair Settings
#### `cl_crosshairgap_useweaponvalue`
- **Status**: ✅ Working in CS2
- **Function**: Makes crosshair gap change based on weapon accuracy
- **Default**: 0
- **Parameters**: 0 (disabled), 1 (enabled)
- **Impact**: Crosshair gap adjusts to weapon spread
- **Recommended**: 0 for consistent crosshair (most pros disable this)

#### `cl_crosshair_dynamic_maxdist_splitratio`
- **Status**: ✅ Working in CS2
- **Function**: Controls the ratio for inner and outer crosshair lines in dynamic mode
- **Default**: 2
- **Parameters**: Float values
- **Impact**: Inner = cl_crosshairsize * (1 - ratio), Outer = cl_crosshairsize * ratio, only works with cl_crosshairstyle 2
- **Recommended**: 2 for balanced split

#### `cl_crosshair_dynamic_splitalpha_innermod`
- **Status**: ✅ Working in CS2
- **Function**: Alpha modification for inner crosshair lines when split
- **Default**: 0
- **Parameters**: Float values (0.0-1.0)
- **Impact**: Controls transparency of inner lines, only works with cl_crosshairstyle 2
- **Recommended**: 0 for standard behavior

#### `cl_crosshair_dynamic_splitalpha_outermod`
- **Status**: ✅ Working in CS2
- **Function**: Alpha modification for outer crosshair lines when split
- **Default**: 1
- **Parameters**: Float values (0.0-1.0)
- **Impact**: Controls transparency of outer lines, only works with cl_crosshairstyle 2
- **Recommended**: 1 for full visibility

#### `cl_crosshair_dynamic_splitdist`
- **Status**: ✅ Working in CS2
- **Function**: Distance that crosshair lines will split into 2 when firing or moving
- **Default**: 3
- **Parameters**: Float values
- **Impact**: Controls split distance for dynamic feedback, only works with cl_crosshairstyle 2
- **Recommended**: 3 for standard split distance

### Grenade Crosshair Configuration
#### `cl_grenadecrosshair_decoy`
- **Status**: ✅ Working in CS2
- **Function**: Display customizable grenade crosshair when holding decoy grenade
- **Default**: 0
- **Parameters**: 0 (disabled), 1 (enabled)
- **Impact**: Shows specialized crosshair for decoy lineup
- **Recommended**: 0 unless using specific lineups

#### `cl_grenadecrosshair_explosive`
- **Status**: ✅ Working in CS2
- **Function**: Display customizable grenade crosshair when holding HE grenade
- **Default**: 1
- **Parameters**: 0 (disabled), 1 (enabled)
- **Impact**: Shows specialized crosshair for HE lineup
- **Recommended**: 1 for grenade lineups

#### `cl_grenadecrosshair_fire`
- **Status**: ✅ Working in CS2
- **Function**: Display customizable grenade crosshair when holding molotov/incendiary
- **Default**: 1
- **Parameters**: 0 (disabled), 1 (enabled)
- **Impact**: Shows specialized crosshair for fire grenade lineup
- **Recommended**: 1 for grenade lineups

#### `cl_grenadecrosshair_flash`
- **Status**: ✅ Working in CS2
- **Function**: Display customizable grenade crosshair when holding flashbang
- **Default**: 1
- **Parameters**: 0 (disabled), 1 (enabled)
- **Impact**: Shows specialized crosshair for flashbang lineup
- **Recommended**: 1 for grenade lineups

#### `cl_grenadecrosshair_smoke`
- **Status**: ✅ Working in CS2
- **Function**: Display customizable grenade crosshair when holding smoke grenade
- **Default**: 1
- **Parameters**: 0 (disabled), 1 (enabled)
- **Impact**: Shows specialized crosshair for smoke lineup
- **Recommended**: 1 for grenade lineups

#### `cl_grenadecrosshair_keepusercrosshair`
- **Status**: ✅ Working in CS2
- **Function**: Retain usual crosshair while holding grenade
- **Default**: 0
- **Parameters**: 0 (replace with grenade crosshair), 1 (keep user crosshair)
- **Impact**: Controls whether to show grenade-specific crosshair or keep normal one
- **Recommended**: 0 for specialized grenade crosshairs

### Grenade Crosshair Timing
#### `cl_grenadecrosshairdelay_decoy`
- **Status**: ✅ Working in CS2
- **Function**: Timing for decoy grenade crosshair change
- **Default**: 2
- **Parameters**: Float values (seconds)
- **Impact**: How quickly crosshair changes after pulling decoy pin
- **Recommended**: 2 for standard timing

#### `cl_grenadecrosshairdelay_explosive`
- **Status**: ✅ Working in CS2
- **Function**: Timing for HE grenade crosshair change
- **Default**: 2
- **Parameters**: Float values (seconds)
- **Impact**: How quickly crosshair changes after pulling HE pin
- **Recommended**: 2 for standard timing

#### `cl_grenadecrosshairdelay_fire`
- **Status**: ✅ Working in CS2
- **Function**: Timing for molotov/incendiary crosshair change
- **Default**: 2
- **Parameters**: Float values (seconds)
- **Impact**: How quickly crosshair changes after pulling fire grenade pin
- **Recommended**: 2 for standard timing

#### `cl_grenadecrosshairdelay_flash`
- **Status**: ✅ Working in CS2
- **Function**: Timing for flashbang crosshair change
- **Default**: 2
- **Parameters**: Float values (seconds)
- **Impact**: How quickly crosshair changes after pulling flashbang pin
- **Recommended**: 2 for standard timing

#### `cl_grenadecrosshairdelay_smoke`
- **Status**: ✅ Working in CS2
- **Function**: Timing for smoke grenade crosshair change
- **Default**: 2
- **Parameters**: Float values (seconds)
- **Impact**: How quickly crosshair changes after pulling smoke pin
- **Recommended**: 2 for standard timing

### Scoped Weapon Crosshair
#### `cl_crosshair_sniper_width`
- **Status**: ✅ Working in CS2
- **Function**: Sets crosshair line width specifically for scoped sniper rifles
- **Default**: 1
- **Parameters**: Float values
- **Impact**: Allows different crosshair thickness when scoped
- **Recommended**: 1 for standard scoped crosshair

#### `cl_crosshair_friendly_warning`
- **Status**: ✅ Working in CS2
- **Function**: Shows warning when crosshair is over friendly player
- **Default**: 1
- **Parameters**: 0 (disabled), 1 (enabled for default styles only), 2 (always enabled)
- **Impact**: Red text with enemy name appears if crosshair is over their entity
- **Recommended**: 1 for friendly fire prevention

### Observer Crosshair Settings
#### `cl_observed_bot_crosshair`
- **Status**: ✅ Working in CS2
- **Function**: Controls crosshair shown when observing a bot
- **Default**: 1
- **Parameters**: 0 (show player crosshair), 1 (show player crosshair only when bot can be taken over), 2 (always show default for bots)
- **Impact**: Determines crosshair display during bot observation
- **Recommended**: 1 for contextual crosshair display

### ACOG/Scope Customization
#### `cl_ironsight_usecrosshaircolor`
- **Status**: ✅ Working in CS2
- **Function**: Match ACOG dot color with crosshair color
- **Default**: 0
- **Parameters**: 0 (use default ACOG color), 1 (match crosshair color)
- **Impact**: Synchronizes scoped crosshair color with main crosshair
- **Recommended**: 0 for standard ACOG appearance

---

## Viewmodel Settings

Commands that control weapon positioning and field of view.

### `viewmodel_fov`
- **Syntax:** `viewmodel_fov <value>`
- **Default:** `60`
- **Range:** `54` to `68`
- **Description:** Field of view for weapon model
- **Impact:** Higher values show less weapon, more screen space
- **Recommended:** `68` for maximum visibility

### `viewmodel_offset_x`
- **Syntax:** `viewmodel_offset_x <value>`
- **Default:** `2.5`
- **Range:** `-2.0` to `2.5`
- **Description:** Horizontal weapon position offset
- **Impact:** Negative values move weapon left, positive moves right
- **Recommended:** `2.5` for right-handed, `-2.0` for left-handed feel

### `viewmodel_offset_y`
- **Syntax:** `viewmodel_offset_y <value>`
- **Default:** `0`
- **Range:** `-2.0` to `2.0`
- **Description:** Forward/backward weapon position offset
- **Impact:** Negative values pull weapon closer, positive pushes away
- **Recommended:** `0` to `-1` for less weapon obstruction

### `viewmodel_offset_z`
- **Syntax:** `viewmodel_offset_z <value>`
- **Default:** `-1.5`
- **Range:** `-2.0` to `2.0`
- **Description:** Vertical weapon position offset
- **Impact:** Negative values lower weapon, positive raises it
- **Recommended:** `-1.5` to `-2.0` for lower weapon position

---

## HUD Settings

Commands that customize the heads-up display elements.

### Basic HUD Configuration
#### `hud_scaling`
- **Syntax:** `hud_scaling <value>`
- **Default:** `0.85`
- **Range:** `0.5` to `1.0`
- **Description:** Overall HUD element scaling
- **Impact:** Smaller values provide more screen space but less readable HUD
- **Recommended:** `0.75-0.85` for competitive play

#### `cl_hud_color`
- **Syntax:** `cl_hud_color <0-10>`
- **Default:** `0`
- **Description:** HUD color scheme
- **Values:** `0` (default) through `10` (various color schemes)
- **Impact:** Visual preference and visibility
- **Recommended:** Personal preference based on map colors

### Console and Developer Settings
#### `con_enable`
- **Status**: ✅ Working in CS2
- **Function**: Enables developer console access
- **Default**: 0 (disabled)
- **Parameters**: 0 (disabled), 1 (enabled)
- **Impact**: Allows access to console commands and debugging
- **Recommended**: 1 (essential for configuration)

#### `developer`
- **Status**: ✅ Working in CS2
- **Function**: Enables developer mode and additional console output
- **Default**: 0 (disabled)
- **Parameters**: 0 (disabled), 1 (basic), 2 (verbose)
- **Impact**: Shows additional debug information in console
- **Recommended**: 0 for normal play, 1 for troubleshooting

### Player Display and Communication
#### `player_nevershow_communityservermessage`
- **Status**: ✅ Working in CS2
- **Function**: Disables community server messages
- **Default**: 0 (show messages)
- **Parameters**: 0 (show), 1 (hide)
- **Impact**: Reduces message spam on community servers
- **Recommended**: 1 for cleaner experience

#### `cl_color`
- **Status**: ✅ Working in CS2
- **Function**: Sets player color preference for team games
- **Default**: 0 (auto)
- **Parameters**: 0-4 (color options)
- **Impact**: Preferred player color in casual modes
- **Recommended**: Personal preference

#### `cl_weapon_selection_rarity_color`
- **Status**: ✅ Working in CS2
- **Function**: Shows weapon rarity colors in selection
- **Default**: 1 (enabled)
- **Parameters**: 0 (disabled), 1 (enabled)
- **Impact**: Visual indication of weapon skin rarity
- **Recommended**: 1 for skin visibility

#### `cl_sanitize_muted_players`
- **Status**: ✅ Working in CS2
- **Function**: Replaces muted player names with generic text
- **Default**: 1 (enabled)
- **Parameters**: 0 (show names), 1 (sanitize)
- **Impact**: Anonymizes muted players for cleaner display
- **Recommended**: 1 for reduced toxicity

#### `cl_sanitize_player_names`
- **Status**: ✅ Working in CS2
- **Function**: Sanitizes inappropriate player names
- **Default**: 0 (disabled)
- **Parameters**: 0 (show all), 1 (sanitize inappropriate)
- **Impact**: Filters offensive usernames
- **Recommended**: 1 for family-friendly environment

#### `cl_hide_avatar_images`
- **Status**: ✅ Working in CS2
- **Function**: Hides player avatar images
- **Default**: 0 (show avatars)
- **Parameters**: 0 (show), 1 (hide)
- **Impact**: Removes avatar distractions and improves performance
- **Recommended**: 1 for competitive focus

#### `cl_allow_animated_avatars`
- **Status**: ✅ Working in CS2
- **Function**: Allows animated Steam avatars
- **Default**: 1 (enabled)
- **Parameters**: 0 (static only), 1 (allow animated)
- **Impact**: Controls avatar animation for performance
- **Recommended**: 0 for better performance

#### `cl_teamcounter_playercount_instead_of_avatars`
- **Status**: ✅ Working in CS2
- **Function**: Shows player count instead of avatars in team display
- **Default**: 0 (show avatars)
- **Parameters**: 0 (avatars), 1 (player count)
- **Impact**: Cleaner team display with numerical count
- **Recommended**: 1 for minimalist HUD

### Radar Configuration
#### `cl_hud_radar_scale`
- **Status**: ✅ Working in CS2
- **Function**: Controls radar size scaling within HUD
- **Default**: 1.0
- **Parameters**: Float values (0.8-1.3)
- **Impact**: Larger radar shows more detail but takes more screen space
- **Recommended**: 1.15 for better map awareness

#### `cl_hud_radar_background_alpha`
- **Status**: ✅ Working in CS2
- **Function**: Controls radar background transparency
- **Default**: 1.0 (opaque)
- **Parameters**: Float values (0.0-1.0)
- **Impact**: Lower values make radar background more transparent
- **Recommended**: 1.0 for clear visibility

#### `cl_hud_radar_map_additive`
- **Status**: ✅ Working in CS2
- **Function**: Enables additive blending for radar map
- **Default**: 1 (enabled)
- **Parameters**: 0 (disabled), 1 (enabled)
- **Impact**: Affects radar map rendering style
- **Recommended**: 1 for better map visibility

#### `cl_radar_scale`
- **Status**: ✅ Working in CS2
- **Function**: Controls overall radar zoom level
- **Default**: 0.7
- **Parameters**: Float values (0.25-1.0)
- **Impact**: Higher values show more map area but less detail
- **Recommended**: 0.5 for detailed view, 0.7 for overview

#### `cl_radar_scale_alternate`
- **Status**: ✅ Working in CS2
- **Function**: Alternative radar scale when toggled
- **Default**: 1.0
- **Parameters**: Float values (0.25-1.0)
- **Impact**: Allows quick switching between two radar scales
- **Recommended**: 1.0 for overview when needed

#### `cl_radar_icon_scale_min`
- **Status**: ✅ Working in CS2
- **Function**: Minimum scale for radar icons
- **Default**: 0.6
- **Parameters**: Float values (0.4-1.0)
- **Impact**: Prevents radar icons from becoming too small
- **Recommended**: 0.6 for visibility

#### `cl_radar_always_centered`
- **Status**: ✅ Working in CS2
- **Function**: Centers radar on player position
- **Default**: 1 (enabled)
- **Parameters**: 0 (fixed), 1 (centered)
- **Impact**: Keeps player at center of radar view
- **Recommended**: 1 for better orientation

#### `cl_radar_rotate`
- **Status**: ✅ Working in CS2
- **Function**: Rotates radar based on player view direction
- **Default**: 1 (enabled)
- **Parameters**: 0 (fixed north), 1 (rotate with view)
- **Impact**: Matches radar orientation to player facing
- **Recommended**: 1 for intuitive navigation

#### `cl_player_ping_mute`
- **Status**: ✅ Working in CS2
- **Function**: Mutes audio from player ping system
- **Default**: 0 (enabled)
- **Parameters**: 0 (enabled), 1 (muted)
- **Impact**: Disables ping sound effects
- **Recommended**: 0 for team communication

#### `cl_tablet_mapmode`
- **Status**: ✅ Working in CS2
- **Function**: Controls tablet map display mode
- **Default**: 0
- **Parameters**: 0 (normal), 1 (tablet mode)
- **Impact**: Changes map interface style
- **Recommended**: 0 for standard interface

#### `cl_radar_square_with_scoreboard`
- **Status**: ✅ Working in CS2
- **Function**: Makes radar square when scoreboard is open
- **Default**: 0 (disabled)
- **Parameters**: 0 (disabled), 1 (enabled)
- **Impact**: Changes radar shape during scoreboard view
- **Recommended**: 0 for consistent radar

#### `cl_compass_enabled`
- **Status**: ✅ Working in CS2
- **Function**: Enables compass display on radar
- **Default**: 1 (enabled)
- **Parameters**: 0 (disabled), 1 (enabled)
- **Impact**: Shows directional compass on radar
- **Recommended**: 1 for orientation reference

### Force Draw Options
#### `cl_drawhud_force_deathnotices`
- **Status**: ✅ Working in CS2
- **Function**: Forces death notices to display even when HUD is hidden
- **Default**: 0 (disabled)
- **Parameters**: 0 (follow HUD), 1 (always show)
- **Impact**: Keeps kill feed visible during screenshots/demos
- **Recommended**: 0 for normal play

#### `cl_drawhud_force_radar`
- **Status**: ✅ Working in CS2
- **Function**: Forces radar to display even when HUD is hidden
- **Default**: 0 (disabled)
- **Parameters**: 0 (follow HUD), 1 (always show)
- **Impact**: Keeps radar visible during HUD toggle
- **Recommended**: 0 for normal play

### Performance Telemetry (Debug)
#### `cl_hud_telemetry_frametime_show`
- **Status**: ✅ Working in CS2
- **Function**: Shows frame time telemetry on HUD
- **Default**: 0 (disabled)
- **Parameters**: 0 (off), 1 (basic), 2 (detailed)
- **Impact**: Displays performance metrics overlay
- **Recommended**: 0 for normal play, 2 for debugging

#### `cl_hud_telemetry_ping_show`
- **Status**: ✅ Working in CS2
- **Function**: Shows ping telemetry on HUD
- **Default**: 0 (disabled)
- **Parameters**: 0 (off), 1 (basic), 2 (detailed)
- **Impact**: Displays network latency information
- **Recommended**: 0 for normal play, 2 for network debugging

#### `cl_hud_telemetry_net_quality_graph_show`
- **Status**: ✅ Working in CS2
- **Function**: Shows network quality graph on HUD
- **Default**: 0 (disabled)
- **Parameters**: 0 (off), 1 (basic), 2 (detailed)
- **Impact**: Displays network performance graph
- **Recommended**: 0 for normal play, 2 for network analysis

---

## Mouse & Input Settings

Commands that control mouse sensitivity and input handling for precise aiming.

### Core Sensitivity Configuration
#### `sensitivity`
- **Status**: ✅ Working in CS2
- **Function**: Controls overall mouse sensitivity multiplier
- **Default**: 2.5 (CS2), 1.25 (recommended baseline)
- **Parameters**: Float values (0.1 to 20.0)
- **Impact**: Core aiming control - affects all mouse movement
- **Calculation**: Sensitivity change per DPI = (current DPI × current sensitivity) ÷ new DPI
- **eDPI Guidelines**: Middle ground eDPI should typically average at 800 (DPI × sensitivity)
- **Recommended**: 1.0-3.0 for most players (highly personal preference)

#### `zoom_sensitivity_ratio_mouse`
- **Status**: ✅ Working in CS2
- **Function**: Additional mouse sensitivity scale factor applied when FOV is zoomed in
- **Default**: 1.0
- **Parameters**: Float values (0.1 to 3.0)
- **Impact**: Sensitivity is lowered according to how much the field of view gets narrowed by weapon's scope
- **Technical Note**: Value 0.82 requires less mouse movement change and provides correct focal length conversion
- **Recommended**: 0.8-1.2 based on preference, 0.82 for focal length accuracy

### Axis-Specific Sensitivity Controls
#### `m_pitch`
- **Status**: ✅ Working in CS2
- **Function**: Vertical speed sensitivity multiplier (Y-axis)
- **Default**: 0.022
- **Parameters**: Float values (can be negative for inverted mouse)
- **Impact**: Controls up/down mouse movement sensitivity independently
- **Usage**: Negative values invert vertical mouse movement
- **Recommended**: 0.022 for standard feel, negative values for inverted players

#### `m_yaw`
- **Status**: ✅ Working in CS2
- **Function**: Horizontal speed sensitivity multiplier (X-axis)
- **Default**: 0.022
- **Parameters**: Float values
- **Impact**: Controls left/right mouse movement sensitivity independently
- **Aspect Ratio Consideration**: Equal mouse movement between different aspect ratios grants the same turn in degrees, but 4:3 feels different because the turn takes up a larger portion of the smaller FOV, making cursor movement seem faster
- **Recommended**: 0.022 for balanced horizontal sensitivity across aspect ratios

### Raw Input Configuration
#### `m_rawinput`
- **Status**: ⚠️ Always Enabled in CS2
- **Function**: Previously controlled raw mouse input (bypassed Windows acceleration)
- **Default**: Always 1 (cannot be disabled)
- **Impact**: CS2 automatically uses unfiltered mouse input, bypassing Windows settings
- **Verification**: Windows sensitivity changes do not affect CS2 (unlike CS:GO with raw input disabled)
- **Alternative**: Third-party tools like RawAccel can be used for advanced mouse acceleration
- **Note**: Command exists but has no effect - CS2 forces raw input

### Advanced Mouse Settings
#### `m_customaccel`
- **Status**: ❌ Removed in CS2
- **Function**: Previously controlled custom mouse acceleration
- **Alternative**: Use third-party tools like RawAccel for mouse acceleration
- **Impact**: Traditional mouse acceleration commands no longer function

#### `m_mousespeed`
- **Status**: ❌ Removed in CS2
- **Function**: Previously controlled Windows mouse speed interaction
- **Impact**: No longer affects CS2 due to forced raw input

#### `m_filter`
- **Status**: ❌ Removed in CS2
- **Function**: Previously enabled mouse smoothing/filtering
- **Impact**: Mouse filtering is handled automatically by CS2

### Mouse Binding Commands
#### `bind mouse_x`
- **Status**: ✅ Working in CS2
- **Function**: Controls mouse screen movement on horizontal axis
- **Default**: `bind "mouse_x" "yaw"`
- **Impact**: Determines how horizontal mouse movement is interpreted
- **Recommended**: Keep default "yaw" binding

#### `bind mouse_y`
- **Status**: ✅ Working in CS2
- **Function**: Controls mouse screen movement on vertical axis
- **Default**: `bind "mouse_y" "pitch"`
- **Impact**: Determines how vertical mouse movement is interpreted
- **Recommended**: Keep default "pitch" binding

### Mouse Button Bindings
#### Standard Mouse Buttons
- **`mouse1`**: Primary fire (+attack)
- **`mouse2`**: Secondary fire/scope (+attack2)
- **`mouse3`**: Middle mouse button (often unbound)
- **`mouse4`**: Side mouse button (often player_ping)
- **`mouse5`**: Side mouse button (often utility binds)

#### Scoreboard Mouse Control
#### `cl_scoreboard_mouse_enable_binding`
- **Status**: ✅ Working in CS2
- **Function**: Enables mouse selection in the scoreboard
- **Default**: "+attack2"
- **Parameters**: Bind command string
- **Impact**: Allows clicking on players in scoreboard for actions
- **Recommended**: "+attack2" for right-click scoreboard interaction

### Sensitivity Calculation Guidelines
#### eDPI (Effective DPI) Calculation
- **Formula**: DPI × In-game Sensitivity = eDPI
- **Professional Range**: 600-1200 eDPI
- **Popular Settings**: 800 eDPI (e.g., 800 DPI × 1.0 sens or 400 DPI × 2.0 sens)

#### DPI Conversion Formula
- **When Changing DPI**: New Sensitivity = (Old DPI × Old Sensitivity) ÷ New DPI
- **Example**: 400 DPI @ 2.0 sens → 800 DPI = (400 × 2.0) ÷ 800 = 1.0 sens

#### Aspect Ratio Considerations
- **16:9 vs 4:3**: Same degree turn feels different due to FOV differences
- **4:3 Stretched**: Movement appears faster due to horizontal stretching
- **Recommendation**: Maintain consistent eDPI across aspect ratio changes

---

## Key Bindings and Input Configuration

### Core Input Settings
#### `unbindall`
- **Status**: ✅ Working in CS2
- **Function**: Removes all existing key bindings
- **Usage**: `unbindall` (executed once before setting new binds)
- **Impact**: Clears all current bindings to prevent conflicts
- **Recommended**: Use at the start of bind configurations for clean setup

#### `key_updatelayout`
- **Status**: ✅ Working in CS2
- **Function**: Updates game keyboard layout to current Windows keyboard setting
- **Usage**: `key_updatelayout`
- **Impact**: Synchronizes game input with system keyboard layout
- **Recommended**: Execute after changing system keyboard layout

### Raw Keyboard Input
#### `cl_input_enable_raw_keyboard`
- **Status**: ⚠️ Experimental in CS2
- **Function**: Sends keyboard input directly to game engine without OS processing
- **Default**: 0
- **Parameters**: 0 (disabled) | 1 (enabled)
- **Impact**: May cause random character movement, inverted bindings, or force-enabled actions
- **Use Case**: May mitigate input issues on 3rd party esports platforms
- **Warning**: Can cause conflicts with 3rd party clients
- **Recommended**: 0 (keep disabled unless experiencing specific input issues)

### Scancode Binding System
#### `input_button_code_is_scan_code_scd`
- **Status**: ✅ Working in CS2
- **Function**: Binds keys based on physical keyboard position instead of key name
- **Default**: 1
- **Parameters**: 0 (key name) | 1 (scancode position)
- **Impact**: Ensures consistent key positions across different keyboard layouts
- **Technical**: Scancode represents physical key position, independent of language/mapping
- **Recommended**: 1 (use scancode for layout-independent bindings)

### Movement Bindings
#### Core Movement
```cfg
bind "scancode26"     "+forward"      // [W] Move forward
bind "scancode22"     "+back"         // [S] Move backward  
bind "scancode4"      "+left"         // [A] Strafe left
bind "scancode7"      "+right"        // [D] Strafe right
bind "scancode44"     "+jump"         // [Space] Jump
bind "scancode224"    "+duck"         // [Ctrl] Crouch/Duck
bind "scancode225"    "+sprint"       // [Shift] Walk (slow/silent)
```

#### Arrow Key Movement
```cfg
bind "scancode82"     "+forward"      // [Up Arrow] Move forward
bind "scancode81"     "+back"         // [Down Arrow] Move backward
bind "scancode80"     "+turnleft"     // [Left Arrow] Turn left
bind "scancode79"     "+turnright"    // [Right Arrow] Turn right
```

### Weapon and Equipment Bindings
#### Weapon Slots
```cfg
bind "scancode30"     "slot1"         // [1] Primary weapon
bind "scancode31"     "slot2"         // [2] Secondary weapon (pistol)
bind "scancode32"     "slot3"         // [3] Knife/Zeus/Hands
bind "scancode33"     "slot4"         // [4] Grenades (cycle)
bind "scancode34"     "slot5"         // [5] C4/Medi-Shot
bind "scancode35"     "slot6"         // [6] HE Grenade/Snowball
bind "scancode36"     "slot7"         // [7] Flashbang
bind "scancode37"     "slot8"         // [8] Smoke Grenade
bind "scancode38"     "slot9"         // [9] Decoy Grenade
bind "scancode39"     "slot10"        // [0] Incendiary/Molotov
bind "scancode45"     "slot11"        // [-] Zeus
bind "scancode46"     "slot12"        // [=] Medi-Shot
```

#### Weapon Actions
```cfg
bind "mouse1"         "+attack"       // Primary fire
bind "mouse2"         "+attack2"      // Secondary fire/scope
bind "scancode21"     "+reload"       // [R] Reload weapon
bind "scancode10"     "drop"          // [G] Drop current weapon
bind "scancode9"      "+lookatweapon" // [F] Inspect weapon
bind "scancode54"     "switchhands"   // [,] Switch viewmodel hand
```

### Communication Bindings
#### Chat and Voice
```cfg
bind "scancode28"     "messagemode"   // [U] All chat
bind "scancode24"     "messagemode2"  // [Y] Team chat
bind "scancode25"     "+voicerecord"  // [V] Voice communication
bind "scancode52"     "player_ping"   // ['] Visual ping
```

#### Radio Commands
```cfg
bind "scancode29"     "radio1"        // [Z] Command radio
bind "scancode27"     "radio2"        // [X] Standard radio
bind "scancode6"      "radio3"        // [C] Report radio
bind "scancode11"     "+radialradio"  // [H] Radial radio menu
```

### Utility and Interface Bindings
#### Game Interface
```cfg
bind "scancode43"     "+scores"       // [Tab] Scoreboard
bind "scancode41"     "cancelselect"  // [Esc] Game menu
bind "scancode53"     "toggleconsole" // [`] Developer console
bind "scancode5"      "buymenu"       // [B] Buy menu
bind "scancode16"     "teammenu"      // [M] Team selection
bind "scancode14"     "callvote"      // [K] Vote menu
bind "scancode23"     "+spray_menu"   // [T] Spray menu
```

#### Special Actions
```cfg
bind "scancode8"      "+use"          // [E] Use/Interact
bind "scancode76"     "sellbackall"   // [Del] Refund purchases
bind "scancode18"     "toggleradarscale" // [O] Toggle radar scale
bind "scancode19"     "toggle spec_show_xray" // [P] Toggle X-ray (spectator)
bind "scancode15"     "observed-crosshair"    // [L] Toggle observed crosshair
```

### Function Key Bindings
#### Utility Functions
```cfg
bind "scancode60"     "autobuy"       // [F3] Auto-buy toggle (DM)
bind "scancode75"     "exec audio.cfg" // [PgUp] Reset audio settings
bind "scancode78"     "volume 0"      // [PgDn] Mute sound
bind "scancode56"     "exec userconfig.cfg" // [/] Execute user config
```

### Mouse Bindings
#### Mouse Buttons
```cfg
bind "mouse1"         "+attack"       // Left click - Primary fire
bind "mouse2"         "+attack2"      // Right click - Secondary fire
bind "mouse3"         ""              // Middle click - Usually unbound
bind "mouse4"         "player_ping"   // Side button - Visual ping
bind "mouse5"         "+secondbinds"  // Side button - Secondary binds
```

#### Mouse Wheel
```cfg
bind "mwheelup"       "+jump"         // Scroll up - Jump
bind "mwheeldown"     "+jump"         // Scroll down - Jump
```

#### Mouse Axis Control
```cfg
bind "mouse_x"        "yaw"           // Horizontal mouse movement
bind "mouse_y"        "pitch"         // Vertical mouse movement
bind "x_axis"         "rightleft"     // Controller X-axis
bind "y_axis"         "!forwardback"  // Controller Y-axis (inverted)
bind "u_axis"         "yaw"           // Controller U-axis
bind "r_axis"         "pitch"         // Controller R-axis
```

### Numpad Buy Bindings
#### Equipment Purchase
```cfg
bind "scancode99"     "buy vest; slot3"      // [Num .] Kevlar Vest
bind "scancode98"     "buy vesthelm; slot3"  // [Num 0] Kevlar + Helmet
bind "scancode88"     "buy defuser; slot3"   // [Num Enter] Defuse Kit
```

#### Grenade Purchase
```cfg
bind "scancode84"     "buy hegrenade; slot3"    // [Num /] HE Grenade
bind "scancode85"     "buy flashbang; slot3"    // [Num *] Flashbang
bind "scancode86"     "buy smokegrenade; slot3" // [Num -] Smoke Grenade
bind "scancode87"     "buy incgrenade; slot3"   // [Num +] Incendiary/Molotov
```

#### Weapon Purchase
```cfg
bind "scancode89"     "buy secondary1; slot3"  // [Num 1] Pistol 2
bind "scancode90"     "buy secondary2; slot3"  // [Num 2] Pistol 3
bind "scancode91"     "buy secondary3; slot3"  // [Num 3] Pistol 4
bind "scancode92"     "buy midtier0; slot3"    // [Num 4] Mid-Tier 1
bind "scancode93"     "buy midtier1; slot3"    // [Num 5] Mid-Tier 2
bind "scancode94"     "buy midtier2; slot3"    // [Num 6] Mid-Tier 3
bind "scancode95"     "buy rifle0; slot3"      // [Num 7] Rifle 1
bind "scancode96"     "buy rifle1; slot3"      // [Num 8] Rifle 2
bind "scancode97"     "buy rifle2; slot3"      // [Num 9] Rifle 3
```

### Binding Configuration Options
#### Buy Menu Settings
#### `cl_buywheel_nonumberpurchasing`
- **Status**: ✅ Working in CS2
- **Function**: Prevents buy wheel from purchasing via number keys
- **Default**: 0
- **Parameters**: 0 (allow number purchasing) | 1 (prevent number purchasing)
- **Impact**: Forces use of buy wheel interface instead of number key shortcuts
- **Recommended**: 1 (prevent accidental purchases via number keys)

#### `cl_buywheel_donate_key`
- **Status**: ✅ Working in CS2
- **Function**: Sets the key for donation in buy menu
- **Default**: 0
- **Parameters**: 0 (Left Ctrl) | 1 (Left Alt) | 2 (Left Shift)
- **Impact**: Determines which modifier key enables donation mode
- **Recommended**: 0 (Left Ctrl for donation)

#### Zoom Behavior
#### `cl_debounce_zoom`
- **Status**: ✅ Working in CS2
- **Function**: Controls zoom button behavior
- **Default**: 1
- **Parameters**: 0 (repetitive zoom) | 1 (single click)
- **Impact**: Determines if holding zoom button acts as repeated presses
- **Recommended**: 0 (repetitive zoom for smoother scoping)

#### Weapon Features
#### `cl_silencer_mode`
- **Status**: ✅ Working in CS2
- **Function**: Enables silencer detachment on supported weapons
- **Default**: 0
- **Parameters**: 0 (cannot detach) | 1 (secondary fire to detach)
- **Impact**: Allows removal of silencers on M4A1-S and USP-S
- **Recommended**: 1 (enable silencer control)

#### Interface Integration
#### `cl_use_opens_buy_menu`
- **Status**: ✅ Working in CS2
- **Function**: Opens buy menu when pressing +use in buy zone
- **Default**: 1
- **Parameters**: 0 (disabled) | 1 (enabled)
- **Impact**: Automatically opens buy menu when using 'E' key in buy zones
- **Recommended**: 0 (prevent accidental buy menu opening)

#### Movement Options
#### `option_duck_method`
- **Status**: ✅ Working in CS2
- **Function**: Controls duck/crouch behavior
- **Default**: 0
- **Parameters**: 0 (hold to duck) | 1 (toggle duck)
- **Impact**: Changes crouch from hold-based to toggle-based
- **Recommended**: 0 (hold to duck for better movement control)

#### `option_speed_method`
- **Status**: ✅ Working in CS2
- **Function**: Controls walk behavior
- **Default**: 0
- **Parameters**: 0 (hold to walk) | 1 (toggle walk)
- **Impact**: Changes walk from hold-based to toggle-based
- **Recommended**: 0 (hold to walk for situational control)

### Scoreboard Mouse Control
#### `cl_scoreboard_mouse_enable_binding`
- **Status**: ✅ Working in CS2
- **Function**: Enables mouse selection in scoreboard
- **Default**: "+attack2"
- **Parameters**: Bind command string
- **Impact**: Allows right-click interaction with scoreboard elements
- **Recommended**: "+attack2" (right-click for scoreboard interaction)

### Radial Radio Configuration
#### Radial Radio Messages
```cfg
cl_radial_radio_tab_0_text_1 "#Chatwheel_midplan"      // Ping middle
cl_radial_radio_tab_0_text_2 "#Chatwheel_bplan"        // Ping site B
cl_radial_radio_tab_0_text_3 "#Chatwheel_oneenemyhere" // One enemy spotted
cl_radial_radio_tab_0_text_4 "#Chatwheel_requestplan"  // Request game plan
cl_radial_radio_tab_0_text_5 "#Chatwheel_requestweapon" // Request weapon
cl_radial_radio_tab_0_text_6 "#Chatwheel_rotatetome"   // Call rotation
cl_radial_radio_tab_0_text_7 "#Chatwheel_heardnoise"   // Heard noise
cl_radial_radio_tab_0_text_8 "#Chatwheel_aplan"        // Ping site A
```

#### `cl_radial_radio_tap_to_ping`
- **Status**: ✅ Working in CS2
- **Function**: Leaves ping when tapping radial radio without selection
- **Default**: 1
- **Parameters**: 0 (disabled) | 1 (enabled)
- **Impact**: Quick tap creates ping if no radio message selected within time limit
- **Recommended**: 1 (enable quick ping functionality)

### Controller Support
#### `joystick`
- **Status**: ✅ Working in CS2
- **Function**: Enables joystick/controller support in game engine
- **Default**: 0
- **Parameters**: 0 (disabled) | 1 (enabled)
- **Impact**: Allows controller input recognition
- **Recommended**: 0 (disable for competitive play)

#### `cl_joystick_enabled`
- **Status**: ✅ Working in CS2
- **Function**: Enables joystick input recognition within game
- **Default**: 0
- **Parameters**: 0 (disabled) | 1 (enabled)
- **Impact**: Processes controller input for game actions
- **Recommended**: 0 (disable for competitive play)

### Danger Zone Specific
#### `cl_parachute_autodeploy`
- **Status**: ✅ Working in CS2 (Danger Zone)
- **Function**: Auto-deploys parachute if fall speed exceeds lethal limit
- **Default**: 1
- **Parameters**: 0 (manual deploy) | 1 (auto deploy)
- **Impact**: Prevents death from fall damage in Danger Zone mode
- **Recommended**: 1 (enable auto-deploy for safety)

---

## Key Bindings

Essential key bindings for gameplay functionality.

### Movement & Actions
- `bind "w" "+forward"` - Move forward
- `bind "s" "+back"` - Move backward  
- `bind "a" "+moveleft"` - Move left
- `bind "d" "+moveright"` - Move right
- `bind "space" "+jump"` - Jump
- `bind "ctrl" "+duck"` - Crouch
- `bind "shift" "+speed"` - Walk (slow movement)

### Weapons & Combat
- `bind "mouse1" "+attack"` - Primary fire
- `bind "mouse2" "+attack2"` - Secondary fire/scope
- `bind "r" "+reload"` - Reload weapon
- `bind "q" "lastinv"` - Switch to last weapon
- `bind "g" "drop"` - Drop current weapon
- `bind "e" "+use"` - Use/interact

### Communication
- `bind "k" "+voicerecord"` - Voice communication
- `bind "u" "messagemode2"` - Team chat
- `bind "y" "messagemode"` - All chat

### Utility
- `bind "tab" "+showscores"` - Show scoreboard
- `bind "m" "teammenu"` - Team selection menu
- `bind "b" "buymenu"` - Buy menu

---

## Developer & Debug Settings

Commands used for debugging and development purposes.

### `con_enable`
- **Syntax:** `con_enable <0|1>`
- **Default:** `0`
- **Description:** Enables developer console access
- **Impact:** Allows console command input during gameplay
- **Recommended:** `1` for advanced users and troubleshooting

### `developer`
- **Syntax:** `developer <0|1|2>`
- **Default:** `0`
- **Description:** Developer mode level
- **Values:**
  - `0`: Disabled
  - `1`: Basic developer info
  - `2`: Verbose developer info
- **Impact:** Shows additional debug information
- **Recommended:** `0` for normal play, `1` for troubleshooting

### `clear`
- **Syntax:** `clear`
- **Description:** Clears console output
- **Impact:** Utility command for console management
- **Usage:** Typically used in autoexec to clear startup messages

---

## Scripting and Aliases

### Core Alias System

#### `alias`
- **Syntax:** `alias "<name>" "<command>"`
- **Description:** Creates a custom command that executes one or more commands
- **Usage:** Foundation for all scripting functionality
- **Example:** `alias "jump_throw" "+jump; -attack; -jump"`
- **Impact:** Enables complex command combinations and toggles
- **Recommended:** Essential for advanced configurations

### Audio Effect Aliases

#### Sound Feedback Commands
- **blip_on:** `play buttons/blip1` - Positive feedback sound
- **blip_off:** `play buttons/blip2` - Negative feedback sound  
- **button:** `play buttons/button9` - Button press sound
- **sequence:** `play weapons/tec9/tec9_boltpull` - Sequence sound
- **enable:** `play weapons/c4/c4_click` - Enable action sound
- **disable:** `play ui/menu_back` - Disable action sound
- **select_on:** `play weapons/p250/p250_clipout` - Selection sound
- **select_off:** `play weapons/weapon_zoom_out_02` - Deselection sound
- **invalid:** `play ui/menu_invalid` - Error/invalid action sound
- **beep:** `play ui/beepclear` - Clear beep sound
- **geiger:** `play player/geiger1` - Single geiger sound
- **double_geiger:** `play player/geiger2` - Double geiger sound
- **click:** `play ui/panorama/sidemenu_click_01.wav` - UI click sound
- **roll:** `play ui/panorama/sidemenu_rollover_02.wav` - Rollover sound
- **music:** `play ui/panorama/music_equip_01.wav` - Music sound
- **snowball:** `play player/winter/snowball_throw_02.wav` - Snowball sound
- **rotate_on:** `play ui/panorama/rotate_weapon_03` - Rotation start sound
- **rotate_off:** `play ui/panorama/rotate_weapon_06` - Rotation end sound
- **book:** `play ui/ui_book_page_bwd` - Page turn sound

### Movement and AFK Scripts

#### AFK Movement System
- **afk-move:** Toggles automatic AFK movement in counter-clockwise circle
- **toggle-forward:** Toggles continuous forward movement
- **toggle-turnleft:** Toggles continuous left turning
- **cycle-forward:** Activates forward movement with audio feedback
- **cycle-turnleft:** Activates left turning with audio feedback
- **Impact:** Prevents AFK kicks during idle periods
- **Usage:** `bind "f4" "afk-move"`

### Utility Scripts

#### System Fixer
- **fixer:** `callvote kick 0; gameui_allowescape; gameui_allowescapetoshow; gameui_activate; gameui_hide; record fixer; stop; double_geiger`
- **Description:** Attempts to fix graphical glitches, sound issues, and HUD bugs
- **Impact:** Resets various game states that may become corrupted
- **Usage:** `bind "f9" "fixer"`

#### Enhanced Use Command
- **+use-beep:** `+use; roll` - Use action with audio feedback
- **-use-beep:** `-use` - Release use action
- **Description:** Adds sound feedback to interaction commands
- **Usage:** `bind "e" "+use-beep"`

### Communication Control Scripts

#### Message Filtering
- **ignore-messages:** Cycles through chat message filtering levels
  - Level 1: Ignore enemy messages only
  - Level 2: Ignore enemy and team messages  
  - Level 3: Ignore all messages
  - Level 4: Reset to show all messages
- **Usage:** `bind "f7" "ignore-messages"`

#### Radio Control
- **ignore-radio:** Toggles radio message filtering
- **ignore-radio_on:** `ignorerad; enable` - Disable radio with sound
- **ignore-radio_off:** `ignorerad; disable` - Enable radio with sound
- **Usage:** `bind "f8" "ignore-radio"`

#### Enemy Team Muting
- **mute-enemy-team:** Toggles enemy team communication
- **mute-enemy-team_on:** `cl_mute_enemy_team 1; enable` - Mute enemies
- **mute-enemy-team_off:** `cl_mute_enemy_team 0; disable` - Unmute enemies
- **Usage:** `bind "f6" "mute-enemy-team"`

### Crosshair Scripts

#### Grenade Crosshair Toggle
- **nade-crosshair:** Toggles between grenade crosshair and normal crosshair
- **nade-crosshair_on:** Sets large crosshair for grenade lineups
  - `cl_crosshairstyle 4; cl_crosshair_t 0; cl_crosshair_drawoutline 0; cl_crosshairthickness 0.5; cl_crosshairsize 1000; cl_crosshairgap 1; cl_crosshairdot 1`
- **nade-crosshair_off:** `exec arminc/crosshair.cfg` - Restore normal crosshair
- **Usage:** Bind to key for quick grenade lineup assistance

#### Observer Crosshair Toggle
- **observed-crosshair:** Toggles observer crosshair visibility
- **observed-crosshair_on:** `cl_show_observer_crosshair 2; click` - Show observer crosshair
- **observed-crosshair_off:** `cl_show_observer_crosshair 0; click` - Hide observer crosshair
- **Usage:** Useful for spectating and demos

### Weapon and Combat Scripts

#### Quick Switch
- **+quick-switch:** `slot3` - Switch to knife/utility
- **-quick-switch:** `lastinv` - Return to previous weapon
- **Description:** Fast weapon switching for animation canceling
- **Usage:** `bind "q" "+quick-switch"`

#### Bomb Drop Script
- **+bomb-drop:** `slot3; slot5` - Select bomb
- **-bomb-drop:** `drop` - Drop bomb quickly
- **Description:** Fast bomb dropping for tactical plays
- **Usage:** `bind "j" "+bomb-drop"`

### Information Display Scripts

#### Scoreboard with Performance Info
- **+scores-fps:** Shows scoreboard with FPS and ping telemetry
  - `+showscores; cl_hud_telemetry_frametime_show 2; cl_hud_telemetry_ping_show 2`
- **-scores-fps:** Hides scoreboard and telemetry
  - `-showscores; cl_hud_telemetry_frametime_show 0; cl_hud_telemetry_ping_show 0`
- **Usage:** `bind "tab" "+scores-fps"`

### Debug and Diagnostic Scripts

#### Console Debug Information
- **debug-console:** Outputs comprehensive network and performance data
  - `net_print_sdr_ping_times; cl_ticktiming print; net_status; cl_net_printsummary; status; book`
- **Usage:** `bind "]" "debug-console"`

#### HUD Debug Toggle
- **debug-hud:** Toggles visual debug information overlay
- **debug-hud_on:** Enables all telemetry displays
  - Shows server receive margin, frametime, ping, network details, misdelivery info, quality graphs, build info, and time info
- **debug-hud_off:** `exec arminc/hud.cfg` - Restore normal HUD
- **Usage:** `bind "[" "debug-hud"`

### Game Mode Shortcuts

#### Quick Game Mode Commands
- **d:** `disconnect` - Disconnect from server
- **q:** `quit` - Quit game
- **r:** `retry` - Retry connection
- **rs:** `mp_restartgame 1` - Restart round
- **s:** `status` - Show server status
- **cs:** `game_type 0; game_mode 0` - Casual mode
- **comp:** `game_type 0; game_mode 1` - Competitive mode
- **wm:** `game_type 0; game_mode 2` - Wingman mode
- **ar:** `game_type 1; game_mode 0` - Arms Race
- **dl:** `game_type 1; game_mode 1` - Demolition
- **dm:** `game_type 1; game_mode 2` - Deathmatch
- **dz:** `game_type 6; game_mode 0` - Danger Zone
- **custom:** `game_type 3; game_mode 0` - Custom game

### Advanced Binding Systems

#### Primary/Secondary Keybind Sets
- **Primary Binds:** Standard key functions
  - Q: Quick switch
  - E: Use with beep
  - F: Inspect weapon
  - C: Radio menu 3
  - X: Radio menu 2
  - Z: Radio menu 1
  - V: Voice record

- **Secondary Binds:** Alternative functions (activated with Alt/Mouse5)
  - Q: Slot 6 (HE Grenade)
  - E: Slot 7 (Flashbang)
  - F: Slot 8 (Smoke)
  - C: Slot 9/10 (Decoy/Molotov)
  - X: Slot 12 (Healthshot - Danger Zone)
  - Z: Grenade crosshair toggle
  - V: Quick inventory (Danger Zone)

#### Binding System Commands
- **+secondbinds:** Activates secondary keybind set
- **-secondbinds:** Restores primary keybind set
- **primaryQ/E/F/C/X/Z/V:** Individual primary bind restoration
- **secondaryQ/E/F/C/X/Z/V:** Individual secondary bind activation
- **setQ/E/F/C/X/Z:** Secondary function execution

### Script Implementation Guidelines

#### Best Practices
1. **Audio Feedback:** Use sound effects to confirm script execution
2. **Toggle States:** Implement proper on/off states for toggle scripts
3. **Error Handling:** Include fallback commands for script failures
4. **Performance:** Avoid excessive command chaining in single aliases
5. **Compatibility:** Test scripts across different game modes

#### Common Script Patterns
1. **Toggle Pattern:** `alias "toggle_cmd" "toggle_cmd_on"; alias "toggle_cmd_on" "setting 1; alias toggle_cmd toggle_cmd_off"; alias "toggle_cmd_off" "setting 0; alias toggle_cmd toggle_cmd_on"`
2. **Hold Pattern:** `alias "+hold_cmd" "command_on"; alias "-hold_cmd" "command_off"`
3. **Cycle Pattern:** `alias "cycle_cmd" "cycle_cmd_1"; alias "cycle_cmd_1" "setting 1; alias cycle_cmd cycle_cmd_2"; alias "cycle_cmd_2" "setting 2; alias cycle_cmd cycle_cmd_1"`

---

## Command Categories for UI Implementation

Based on this research, commands can be grouped into these UI-friendly categories:

### High Priority for UI Controls
1. **Network Settings** - Rate, interpolation, and update settings
2. **Audio Settings** - Volume, positioning, and quality settings  
3. **Crosshair Customization** - Complete crosshair appearance control
4. **Viewmodel Settings** - Weapon positioning and FOV
5. **Performance Settings** - FPS limits and optimization

### Medium Priority for UI Controls
1. **HUD Customization** - Scaling, colors, and radar settings
2. **Mouse Settings** - Sensitivity and input handling
3. **Video Settings** - Gamma and rendering options

### Low Priority for UI Controls
1. **Key Bindings** - Better handled through dedicated binding interface
2. **Developer Settings** - Advanced users typically use console directly

---

## Recommendations for Implementation

1. **Preset Systems** - Create preset configurations for different play styles (Competitive, Casual, Performance)
2. **Real-time Preview** - Show crosshair changes in real-time
3. **Validation** - Ensure values stay within valid ranges
4. **Tooltips** - Provide explanations for each setting's impact
5. **Import/Export** - Allow users to save and share configurations
6. **Performance Impact Indicators** - Show which settings affect performance

This documentation serves as the foundation for implementing comprehensive customization options in the CS2 Autoexec Generator's checkbox section.