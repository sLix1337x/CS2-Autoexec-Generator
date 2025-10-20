# Missing Commands Analysis for CS2 Autoexec Generator

## Overview
This document analyzes commands found in the existing autoexec files that may be deprecated, non-functional, or require updates for Counter-Strike 2 compatibility.

## Commands Requiring Attention

### 1. Deprecated Network Commands

#### `cl_interp`
- **Status**: ⚠️ Largely Deprecated
- **Issue**: CS2 uses a new buffering system instead of traditional interpolation <mcreference link="https://www.reddit.com/r/GlobalOffensive/comments/16wq6qb/cs2_network_settings_guide/" index="1">1</mcreference>
- **Current Behavior**: Still accepts values but has minimal impact
- **Recommendation**: Replace with `cl_net_buffer_ticks` or remove
- **Migration**: `cl_net_buffer_ticks 0` for minimal buffering

#### `cl_cmdrate` & `cl_updaterate`
- **Status**: ❌ Deprecated
- **Issue**: Server-controlled in CS2, client settings ignored <mcreference link="https://www.reddit.com/r/GlobalOffensive/comments/16wq6qb/cs2_network_settings_guide/" index="1">1</mcreference>
- **Current Behavior**: Commands exist but have no effect
- **Recommendation**: Remove from autoexec files
- **Note**: Servers automatically set optimal rates

#### `cl_interp_ratio`
- **Status**: ⚠️ Largely Deprecated  
- **Issue**: Replaced by buffering system <mcreference link="https://www.reddit.com/r/GlobalOffensive/comments/16wq6qb/cs2_network_settings_guide/" index="1">1</mcreference>
- **Current Behavior**: Limited functionality
- **Recommendation**: Remove or replace with `cl_net_buffer_ticks`

### 2. Removed Input Commands

#### `cl_righthand`
- **Status**: ❌ Completely Removed
- **Issue**: Command no longer exists in CS2 <mcreference link="https://totalcsgo.com/commands/categories/fov-and-viewmodel" index="2">2</mcreference>
- **Replacement**: Use `switchhands`, `switchhandsleft`, or `switchhandsright` <mcreference link="https://www.hotspawn.com/counter-strike/guide/cs2-viewmodel-commands" index="3">3</mcreference>
- **Alternative**: Bind H key (default) or use in-game settings
- **Migration Example**: 
  ```
  // Old CS:GO
  cl_righthand 0
  
  // New CS2
  bind "h" "switchhands"
  ```

#### `m_rawinput`
- **Status**: ❌ Always Enabled
- **Issue**: Cannot be disabled in CS2 <mcreference link="https://www.reddit.com/r/GlobalOffensive/comments/16wq6qb/cs2_network_settings_guide/" index="4">4</mcreference>
- **Current Behavior**: Always set to 1, cannot be changed
- **Recommendation**: Remove from configs
- **Note**: Raw input is permanently enabled for consistency

### 3. Replaced Display Commands

#### `net_graph`
- **Status**: ❌ Removed
- **Issue**: Command completely removed from CS2 <mcreference link="https://www.rockpapershotgun.com/counter-strike-2-console-commands" index="5">5</mcreference>
- **Replacement**: `cl_showfps 2` provides similar functionality
- **Migration**: 
  ```
  // Old CS:GO
  net_graph 1
  
  // New CS2
  cl_showfps 2
  ```

### 4. Audio Commands Status

#### All `snd_*` Commands
- **Status**: ✅ Fully Functional
- **Commands**: `snd_headphone_eq`, `snd_mixahead`, `snd_spatialize_lerp`, etc. <mcreference link="https://www.reddit.com/r/GlobalOffensive/comments/16wq6qb/cs2_network_settings_guide/" index="6">6</mcreference>
- **Recommendation**: Keep all audio commands - they work perfectly in CS2

### 5. Crosshair Commands Status

#### All `cl_crosshair*` Commands  
- **Status**: ✅ Fully Functional
- **Note**: Some settings now available in game menu <mcreference link="https://www.reddit.com/r/GlobalOffensive/comments/16wq6qb/cs2_network_settings_guide/" index="7">7</mcreference>
- **Recommendation**: Keep all crosshair commands
- **Exception**: `cl_crosshairstyle 1` was removed

### 6. Viewmodel Commands Status

#### Most `viewmodel_*` Commands
- **Status**: ✅ Fully Functional
- **Working Commands**: `viewmodel_fov`, `viewmodel_offset_x/y/z`, `viewmodel_presetpos` <mcreference link="https://totalcsgo.com/commands/categories/fov-and-viewmodel" index="2">2</mcreference>
- **Recommendation**: Keep all viewmodel commands

### 7. Experimental/Debug Commands

#### `adsp_debug`
- **Status**: ❓ Unknown/Non-functional
- **Recommendation**: Remove from production configs <mcreference link="https://developer.valvesoftware.com/wiki/List_of_Counter-Strike_2_console_commands_and_variables" index="8">8</mcreference>
- **Note**: Likely legacy audio debugging command

#### `engine_no_focus_sleep`
- **Status**: ✅ Working
- **Function**: Controls engine behavior when tabbed out <mcreference link="https://totalcsgo.com/commands/71" index="9">9</mcreference>
- **Recommendation**: Keep if used for competitive play (set to 0)

## Implementation Recommendations

### High Priority Updates

1. **Remove Deprecated Network Commands**
   ```
   // Remove these lines:
   cl_cmdrate 128
   cl_updaterate 128
   cl_interp_ratio 1
   ```

2. **Replace net_graph**
   ```
   // Replace:
   net_graph 1
   // With:
   cl_showfps 2
   ```

3. **Update Hand Switching**
   ```
   // Replace:
   cl_righthand 0
   // With:
   bind "h" "switchhands"
   ```

### Medium Priority Updates

1. **Review cl_interp Usage**
   - Consider removing or replacing with `cl_net_buffer_ticks`
   - Test impact on gameplay feel

2. **Clean Up m_rawinput References**
   - Remove `m_rawinput 1` lines (redundant)

### Low Priority Updates

1. **Remove Unknown Commands**
   - Remove `adsp_debug` and other non-functional commands
   - Clean up console output

## Testing Recommendations

### Before Deployment
1. Test all commands in offline mode first
2. Verify no console errors appear
3. Check that gameplay feel remains consistent
4. Test network performance with new buffering system

### After Deployment
1. Monitor for any performance changes
2. Gather user feedback on gameplay feel
3. Check for any new console errors
4. Validate that all intended functionality works

## Backward Compatibility Notes

- Most CS:GO configs will work in CS2 with warnings
- Deprecated commands won't break the game but may spam console
- Some commands may have different default values
- New commands provide better functionality than old ones

## Future Considerations

- Monitor Valve updates for command changes
- Keep track of new CS2-specific commands
- Consider adding new buffering and timing commands
- Stay updated on community best practices

---

*Last Updated: Based on CS2 research conducted January 2025*
*Research Sources: Official Valve documentation, community testing, professional player configs*

## Missing Commands by Priority

### HIGH PRIORITY (Easy to implement, high user value)

#### Advanced Audio Settings
- `snd_headphone_eq` - Headphone EQ (0/1 toggle)
- `snd_mixahead` - Audio mix-ahead latency (0.001-0.1 range)
- `snd_mute_mvp_music_live_players` - Mute MVP music for live players (true/false)
- `snd_autodetect_latency` - Auto-detect audio latency (0/1)
- `snd_spatialize_lerp` - Audio spatialization (0.0-1.0)

#### Advanced Network Settings
- `cl_clock_correction` - Clock correction (0/1)
- `net_client_steamdatagram_enable_override` - Steam datagram override (0/1)

#### Advanced Prediction Settings
- `cl_predict_weapon_drop` - Predict weapon drops (0/1)
- `cl_predict_bomb_defusal` - Predict bomb defusal (0/1)

#### Mouse Precision
- `m_yaw` - Mouse yaw sensitivity (default: 0.022)

#### Crosshair Advanced
- `cl_crosshairgap_useweaponvalue` - Use weapon-specific gap (0/1)

### MEDIUM PRIORITY (More complex but valuable)

#### Advanced Network Buffer Settings
- `cl_net_buffer_ticks` - Network buffer ticks (0-8)
- `cl_net_buffer_ticks_use_interp` - Use interpolation for buffer (0/1)
- `cl_tickpacket_desired_queuelength` - Desired queue length (0-8)

#### Performance/Engine Settings
- `engine_no_focus_sleep` - Sleep when not focused (0-50ms)
- `engine_low_latency_sleep_after_client_tick` - Low latency sleep (0/1)

#### HUD Advanced
- `cl_invites_only_friends` - Only friends can invite (0/1)
- `cl_invites_only_mainmenu` - Only allow invites in main menu (0/1)

### LOW PRIORITY (Advanced/Debug)

#### Debug/Developer Settings
- `demo_flush` - Demo flush (0/1)
- `vprof_off` - Disable profiling
- `iv_off` - Disable interpolation visualization
- `adsp_debug` - Audio DSP debug (0/1)

#### Camera Settings (Advanced)
- `c_maxdistance` - Max camera distance (default: 200)
- `c_maxpitch` - Max camera pitch (default: 90)
- `c_maxyaw` - Max camera yaw (default: 135)
- `c_mindistance` - Min camera distance (default: 30)
- `c_minpitch` - Min camera pitch (default: 0)

## Recommended UI Implementation

### New Checkbox Sections

1. **"Advanced Audio" Section**
   - Headphone EQ toggle
   - Mix-ahead latency slider (0.001-0.1)
   - MVP music muting toggle
   - Auto-detect latency toggle
   - Spatialization lerp slider

2. **"Advanced Network" Section**
   - Clock correction toggle
   - Steam datagram override toggle
   - Buffer ticks settings (for advanced users)

3. **"Advanced Prediction" Section**
   - Weapon drop prediction toggle
   - Bomb defusal prediction toggle
   - (Existing: body shot, head shot, kill ragdolls)

4. **"Mouse Precision" Section**
   - m_yaw setting (could be part of existing mouse section)
   - Advanced sensitivity options

5. **"Performance Optimization" Section**
   - Engine sleep settings
   - Demo flush toggle
   - Performance profiling toggles

6. **"Advanced Crosshair" Section**
   - Gap weapon value usage toggle
   - Additional crosshair precision settings

### Implementation Strategy

1. **Schema Updates**: Add new fields to `autoexecFormSchema` for each missing command
2. **UI Components**: Create new sections in `IncludeOptionsSection` with appropriate form controls
3. **Generation Logic**: Update `generateAutoexecContent` in `utils.ts` to handle new sections
4. **Default Values**: Add sensible defaults to `defaultAutoexecValues`

### Form Control Types

- **Toggles (0/1)**: Most prediction, network, and audio settings
- **Sliders**: Mix-ahead latency, spatialization lerp, engine sleep
- **Input Fields**: m_yaw, camera distances/angles
- **Dropdowns**: Buffer tick settings (0-8 range)

## Benefits of Implementation

1. **Power User Appeal**: Exposes advanced settings found in popular autoexec configurations
2. **Performance Optimization**: Allows fine-tuning of network and audio latency
3. **Competitive Advantage**: Provides access to prediction and precision settings
4. **Comprehensive Coverage**: Makes the generator more complete compared to manual autoexec creation

## Notes

- Many of these commands are found in high-level competitive player configurations
- Some settings may have minimal impact but are included for completeness
- Advanced settings should be clearly labeled and possibly grouped in an "Advanced" section
- Tooltips should explain the impact and recommended values for each setting