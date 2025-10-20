# CS2 Autoexec Generator - Visual Reference Guide
## Steam 2003 UI Components

This guide provides visual ASCII representations and detailed specifications for implementing the Steam 2003 aesthetic.

---

## 1. Button States

### Default Button
```
┌─────────────────┐
│  Generate CFG   │  ← Light border top/left
└─────────────────┘  ← Dark border bottom/right
```

### Hover Button
```
┌─────────────────┐
│  Generate CFG   │  ← Slightly darker background
└─────────────────┘  ← Cursor: pointer
```

### Active/Pressed Button
```
╔═════════════════╗
║  Generate CFG   ║  ← Inverted borders (inset)
╚═════════════════╝  ← Darker background, gold text
```

### Disabled Button
```
┌─────────────────┐
│  Generate CFG   │  ← 50% opacity, dimmed text
└─────────────────┘  ← Cursor: not-allowed
```

---

## 2. Form Elements

### Text Input (Default)
```
╔═══════════════════════════════╗
║ Enter value...                ║  ← Inset border
╚═══════════════════════════════╝  ← Light green text
```

### Text Input (Focused)
```
╔═══════════════════════════════╗
║ Typing here...█               ║  ← Gold outline glow
╚═══════════════════════════════╝  ← White text
```

### Select Dropdown (Closed)
```
╔═══════════════════════════════╗
║ Default                     ▼ ║  ← Inset border
╚═══════════════════════════════╝  ← Down arrow icon
```

### Select Dropdown (Open)
```
╔═══════════════════════════════╗
║ Default                     ▲ ║
╠═══════════════════════════════╣
║ Option 1                      ║  ← Hover: darker bg
║ Option 2                      ║
║ Option 3                      ║
╚═══════════════════════════════╝
```

### Checkbox (Unchecked)
```
╔═╗
║ ║  ← Inset border, empty
╚═╝
```

### Checkbox (Checked)
```
╔═╗
║✓║  ← Gold checkmark
╚═╝
```

### Range Slider
```
╔════════════════════════════════╗
║▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░║  ← Track (inset)
╚════════════════════════════════╝
          ┌─┐
          │█│  ← Thumb (outset, draggable)
          └─┘
```

---

## 3. Window Components

### Window with Title Bar
```
┌─────────────────────────────────────────┐
│ [i] Window Title              [_][□][×] │  ← Title bar (gradient)
├─────────────────────────────────────────┤
│                                         │
│  Content area with inset border         │
│                                         │
│  ╔═══════════════════════════════════╗ │
│  ║ Nested content panel              ║ │
│  ╚═══════════════════════════════════╝ │
│                                         │
└─────────────────────────────────────────┘
   ▼ Drop shadow (5px offset)
```

### Section Header
```
═══════════════════════════════════════════
  HUD & UI SETTINGS
───────────────────────────────────────────  ← Gold text, uppercase
```

### Collapsible Section (Collapsed)
```
┌─────────────────────────────────────────┐
│ ▶ CROSSHAIR SETTINGS          [Select All]│
└─────────────────────────────────────────┘
```

### Collapsible Section (Expanded)
```
┌─────────────────────────────────────────┐
│ ▼ CROSSHAIR SETTINGS          [Select All]│
├─────────────────────────────────────────┤
│ ╔═══════════════════════════════════════╗│
│ ║ ☑ Crosshair Size      [2.5] ▓▓▓▓▓░░░ ║│
│ ║ ☑ Crosshair Color     [Green ▼]      ║│
│ ║ ☑ Crosshair Gap       [1.0] ▓▓▓▓▓▓░░ ║│
│ ╚═══════════════════════════════════════╝│
└─────────────────────────────────────────┘
```

---

## 4. Preview Window

### Live Preview Panel
```
┌─────────────────────────────────────────────────┐
│ AUTOEXEC PREVIEW                    [−][□][×]   │
├─────────────────────────────────────────────────┤
│ Path: ..\Steam\..\csgo\cfg\autoexec.cfg        │
│                                                 │
│ ╔═════════════════════════════════════════════╗ │
│ ║  1 | // CS2 Autoexec Configuration         ║ │
│ ║  2 | // Generated: 2025-10-20              ║ │
│ ║  3 |                                        ║ │
│ ║  4 | // ===== HUD SETTINGS =====           ║ │
│ ║  5 | cl_hud_color "0"                      ║ │
│ ║  6 | hud_scaling "0.85"                    ║ │
│ ║  7 | cl_radar_scale "1.0"                  ║ │
│ ║  8 |                                        ║ │
│ ║  9 | // ===== CROSSHAIR SETTINGS =====     ║ │
│ ║ 10 | cl_crosshairsize "2.5"                ║ │
│ ║    ⋮                                        ║ │
│ ╚═════════════════════════════════════════════╝ │
│                                                 │
│ Lines: 156 | Size: 4.2 KB | Modified: Just now │
│ [Copy All] [Download] [Expand] [Syntax: On]    │
└─────────────────────────────────────────────────┘
```

---

## 5. Navigation & Tabs

### Tab Navigation
```
┌───────┬───────┬───────┬───────┬───────────────┐
│  HUD  │ Cross │ Audio │Network│               │
│       │ hair  │       │       │               │
└───────┴───────┴───────┴───────┴───────────────┘
  ▲ Active tab (inset, gold text)
```

### Breadcrumb Navigation
```
Home > Settings > HUD & UI > Radar Configuration
                              ▲ Current location (gold)
```

---

## 6. Scrollbar

### Vertical Scrollbar
```
┌─┐
│▲│  ← Up button (outset)
├─┤
│ │
│█│  ← Thumb (outset, draggable)
│ │
│ │
├─┤
│▼│  ← Down button (outset)
└─┘
```

### Horizontal Scrollbar
```
┌──┬────────────────────────────────┬──┐
│◄ │        ████                    │► │
└──┴────────────────────────────────┴──┘
```

---

## 7. Modals & Dialogs

### Confirmation Dialog
```
┌─────────────────────────────────────────┐
│ [!] Confirm Action              [×]     │
├─────────────────────────────────────────┤
│                                         │
│  Are you sure you want to reset all     │
│  settings to default values?            │
│                                         │
│  This action cannot be undone.          │
│                                         │
│         [Yes, Reset] [Cancel]           │
│                                         │
└─────────────────────────────────────────┘
```

### Loading Dialog
```
┌─────────────────────────────────────────┐
│ Generating Configuration...             │
├─────────────────────────────────────────┤
│                                         │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░ 65%    │
│                                         │
│  ✓ Validating settings                  │
│  ✓ Generating configuration             │
│  ⟳ Creating file...                     │
│  ○ Finalizing                           │
│                                         │
└─────────────────────────────────────────┘
```

### Error Dialog
```
┌─────────────────────────────────────────┐
│ [✗] Error                       [×]     │
├─────────────────────────────────────────┤
│                                         │
│  Failed to generate configuration       │
│                                         │
│  Error: Invalid crosshair size          │
│  Value must be between 0 and 5          │
│                                         │
│              [OK]                       │
│                                         │
└─────────────────────────────────────────┘
```

---

## 8. Toast Notifications

### Success Toast
```
┌─────────────────────────────────────────┐
│ ✓ Configuration saved successfully!     │
│   autoexec.cfg (4.2 KB)                 │
└─────────────────────────────────────────┘
  ▲ Slides in from bottom-right
```

### Warning Toast
```
┌─────────────────────────────────────────┐
│ ⚠ Some values are outside recommended   │
│   ranges. Review before generating.     │
└─────────────────────────────────────────┘
```

### Error Toast
```
┌─────────────────────────────────────────┐
│ ✗ Failed to import configuration        │
│   Invalid file format                   │
└─────────────────────────────────────────┘
```

---

## 9. Progress Indicators

### Determinate Progress Bar
```
╔════════════════════════════════════════╗
║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░║ 55%
╚════════════════════════════════════════╝
```

### Indeterminate Progress Bar
```
╔════════════════════════════════════════╗
║░░░░░░░░▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░║
╚════════════════════════════════════════╝
  ▲ Animated sliding pattern
```

### Spinner
```
    ⟳
  Loading...
```

---

## 10. Lists & Tables

### Setting List
```
┌─────────────────────────────────────────┐
│ ☑ HUD Scale                             │
│   [0.85] ▓▓▓▓▓▓▓░░░                     │
│   Range: 0.5 - 0.95 | Default: 0.85    │
├─────────────────────────────────────────┤
│ ☑ HUD Color                             │
│   [Default ▼]                           │
│   Choose HUD color scheme               │
├─────────────────────────────────────────┤
│ ☐ Radar Rotate                          │
│   [Off ▼]                               │
│   Rotate radar with player view         │
└─────────────────────────────────────────┘
```

### Data Table
```
┌──────────────┬──────────┬──────────┬────────┐
│ Setting      │ Value    │ Default  │ Status │
├──────────────┼──────────┼──────────┼────────┤
│ HUD Scale    │ 0.85     │ 0.85     │   ✓    │
│ Crosshair    │ 2.5      │ 2.0      │   ⚠    │
│ Sensitivity  │ 1.8      │ 2.5      │   ✓    │
└──────────────┴──────────┴──────────┴────────┘
```

---

## 11. Search & Filter

### Search Bar
```
┌─────────────────────────────────────────┐
│ 🔍 Search settings...                   │
└─────────────────────────────────────────┘
```

### Search with Results
```
┌─────────────────────────────────────────┐
│ 🔍 crosshair                            │
├─────────────────────────────────────────┤
│ Results (8):                            │
│                                         │
│ ▸ Crosshair Settings                    │
│   • cl_crosshairsize                    │
│   • cl_crosshaircolor                   │
│   • cl_crosshairgap                     │
│                                         │
│ ▸ HUD Settings                          │
│   • cl_crosshairalpha                   │
│   • cl_crosshairdot                     │
└─────────────────────────────────────────┘
```

### Filter Chips
```
[All] [HUD] [Crosshair] [Audio] [Network] [×]
  ▲     ▲       ▲         ▲        ▲       ▲
Active  Inactive filters              Clear
```

---

## 12. Tooltips & Help

### Tooltip
```
┌─────────────────────────────────────────┐
│ Controls the size of the HUD elements.  │
│ Range: 0.5 - 0.95                       │
│ Default: 0.85                           │
│ Recommended: 0.75 - 0.85                │
└─────────────────────────────────────────┘
  ▲ Appears on hover
```

### Inline Help Icon
```
☑ HUD Scale [?]
  [0.85] ▓▓▓▓▓▓▓░░░
         ▲ Click for help
```

---

## 13. Status Indicators

### Validation States
```
✓ Valid value (green)
⚠ Warning: unusual value (yellow)
✗ Error: invalid value (red)
ℹ Info: helpful tip (blue)
```

### Connection Status
```
● Connected (green)
● Connecting... (yellow)
● Disconnected (red)
```

---

## 14. Empty States

### No Results
```
┌─────────────────────────────────────────┐
│                                         │
│              🔍                         │
│                                         │
│        No results found                 │
│                                         │
│   Try adjusting your search terms       │
│                                         │
└─────────────────────────────────────────┘
```

### No Custom Commands
```
┌─────────────────────────────────────────┐
│                                         │
│              📝                         │
│                                         │
│   No custom commands added yet          │
│                                         │
│   Add your own console commands here    │
│   for advanced customization            │
│                                         │
│          [Add Command]                  │
│                                         │
└─────────────────────────────────────────┘
```

---

## 15. Color Swatches

### Color Palette Display
```
Steam 2003 Color Palette:

Background Colors:
███ #293021  Deep Olive (bg-dark)
███ #4C5844  Panel (main)
███ #3E4637  Panel Dark
███ #2F3529  Panel Darker

Text Colors:
███ #FFFFFF  White (primary text)
███ #A0AA95  Light Green (secondary)
███ #7A8470  Dim (disabled)

Accent Colors:
███ #C4B550  Gold (accent)
███ #c6b652  Link Gold

Border Colors:
███ #889180  Light Border
███ #282E22  Dark Border
```

---

## 16. Responsive Layouts

### Desktop Layout (1024px+)
```
┌─────────────────────────────────────────────────────────┐
│ [Logo] CS2 Autoexec Generator              [Help] [?]   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────┐  ┌─────────────────────────────┐  │
│  │                 │  │                             │  │
│  │  Preview        │  │  Configuration              │  │
│  │  Window         │  │  Sections                   │  │
│  │                 │  │                             │  │
│  │  (Sticky)       │  │  (Scrollable)               │  │
│  │                 │  │                             │  │
│  └─────────────────┘  └─────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Tablet Layout (768px - 1023px)
```
┌─────────────────────────────────────────┐
│ [☰] CS2 Autoexec Generator      [?]     │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Preview Window (Collapsible)    │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Configuration Sections          │   │
│  │ (Full Width)                    │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

### Mobile Layout (< 768px)
```
┌─────────────────────┐
│ ☰  CS2 Autoexec  🔍 │
├─────────────────────┤
│                     │
│ ▼ HUD Settings      │
│ ┌─────────────────┐ │
│ │ ☑ HUD Scale     │ │
│ │ [0.85] ▓▓▓▓▓░   │ │
│ └─────────────────┘ │
│                     │
│ ▶ Crosshair         │
│ ▶ Audio             │
│                     │
├─────────────────────┤
│ [Preview][Generate] │
└─────────────────────┘
```

---

## 17. Animation States

### Button Press Animation
```
Frame 1 (Default):
┌─────────────┐
│   Click Me  │
└─────────────┘

Frame 2 (Pressed):
╔═════════════╗
║   Click Me  ║  ← Shifted down 1px
╚═════════════╝  ← Inverted borders
```

### Loading Animation
```
Frame 1:  ⠋ Loading...
Frame 2:  ⠙ Loading...
Frame 3:  ⠹ Loading...
Frame 4:  ⠸ Loading...
Frame 5:  ⠼ Loading...
Frame 6:  ⠴ Loading...
Frame 7:  ⠦ Loading...
Frame 8:  ⠧ Loading...
```

### Progress Bar Animation
```
Frame 1: ▓░░░░░░░░░ 10%
Frame 2: ▓▓░░░░░░░░ 20%
Frame 3: ▓▓▓░░░░░░░ 30%
Frame 4: ▓▓▓▓░░░░░░ 40%
Frame 5: ▓▓▓▓▓░░░░░ 50%
```

---

## 18. Keyboard Focus Indicators

### Button Focus
```
┌─────────────────┐
│  Generate CFG   │  ← Gold outline (2px)
└─────────────────┘
  ▲ Visible focus ring
```

### Input Focus
```
╔═══════════════════════════════╗
║ Typing here...█               ║  ← Gold glow
╚═══════════════════════════════╝
  ▲ Focus indicator
```

### Tab Focus Order
```
1 → [Generate] → 2 → [Preview] → 3 → [Load Preset]
                                      ↓
6 ← [Setting 3] ← 5 ← [Setting 2] ← 4
```

---

## 19. Context Menus

### Right-Click Menu
```
┌─────────────────────┐
│ Copy                │
│ Paste               │
│ ───────────────────│
│ Reset to Default    │
│ ───────────────────│
│ Help                │
└─────────────────────┘
```

---

## 20. Drag & Drop Areas

### File Upload Zone (Default)
```
┌─────────────────────────────────────────┐
│                                         │
│              📁                         │
│                                         │
│     Drag & drop autoexec.cfg here       │
│     or click to browse                  │
│                                         │
│     Supported: .cfg, .json              │
│                                         │
└─────────────────────────────────────────┘
```

### File Upload Zone (Hover)
```
╔═════════════════════════════════════════╗
║                                         ║
║              📁                         ║
║                                         ║
║     Drop file to upload                 ║
║                                         ║
╚═════════════════════════════════════════╝
  ▲ Gold border, darker background
```

---

**End of Visual Reference Guide**

*Use these ASCII representations as a guide for implementing the Steam 2003 aesthetic. All components should maintain the characteristic beveled borders, olive-green color palette, and authentic retro feel.*