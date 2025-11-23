# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**冰封希望：最终幸存者 (Frozen Hope: The Last Survivors)** is an interactive narrative game based on cognitive psychology. Players must survive 10 days in an extreme environment while avoiding cognitive biases that can lead to poor decisions.

- **Tech Stack**: React 18 + TypeScript, Zustand (state management), Tailwind CSS, Vite
- **Game Duration**: 20-30 minutes per playthrough
- **Educational Focus**: Teaching 15 cognitive biases through interactive decision-making

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Type check (useful before commits)
tsc --noEmit
```

## Core Architecture

### State Management (Zustand)

The entire game state is managed through a single Zustand store at `src/stores/gameStore.ts`:

- **Phase system**: `start → character_select → act1 → act2 → act3 → ending → replay`
- **Core metrics**:
  - `stressClock` (0-15, game ends at 15)
  - `playerHP` (0-100, death at 0)
  - `beaconProgress` (0-100% or 'failed', rescue at 80%)
- **Day progression**: 10 days total (Day 1-3: Act 1, Day 4-7: Act 2, Day 8-10: Act 3)

**Critical functions**:
- `startGame()`: Initializes NPCs (excludes player's chosen role), sets starting HP
- `makeChoice()`: Applies consequences, saves to localStorage, checks game over, auto-loads next event
- `applyConsequences()`: Handles all stat changes, NPC deaths, flag updates, perfect decision bonuses
- `checkGameOver()`: Evaluates ending conditions (rescue/death/collapse/bitter victory)
- `nextEvent()`: Increments day, selects next event based on act and prerequisites

### Game Configuration

All game constants are centralized in `src/constants/gameConfig.ts`:
- **MAX_STRESS**: 15 (game ends at 15)
- **BEACON_RESCUE_THRESHOLD**: 80% (rescue ending triggers at 80%)
- **PERFECT_DECISION_BONUS.EXTRA_STRESS_REDUCTION**: Perfect decisions grant -1 additional stress
- **STREAK_REWARDS**: Consecutive perfect decisions provide special rewards (HP healing, stress reduction, beacon progress)
- **NPC_DEATH_STRESS_PENALTY**: 2 stress per NPC death
- **SKILL_COOLDOWNS**: Defines cooldown periods for character skills

### Event System

Events are defined in three act files: `events-act1.ts`, `events-act2.ts`, `events-act3.ts`

**Event selection logic** (`src/data/events.ts`):
1. Filter by current act
2. Exclude completed events
3. Check prerequisites (NPC alive/dead, HP thresholds, flags, day number)
4. **Critical**: Exclude events where player's role appears in `npcsInvolved` (prevents NPC talking to themselves)
5. Prioritize events with role-specific choices for current player

**Choice types**:
- `trap`: Falls for cognitive bias (records bias, usually increases stress)
- `rational`: Correct decision (may grant `perfectDecision` flag, often reduces stress)
- `skill`: Uses character ability (has HP/stress cost)
- `neutral`: No bias involved
- `special`: Role-specific flavor option

**Prerequisites** support comparisons: `<`, `>`, `>=`, `<=`, `==`, `!=` for HP, stress, beacon progress, day number

### Character System

Six roles with different starting HP, skills, and difficulty ratings (1-5 stars):
- **CEO** (Alex Chen): Command skill, 100 HP, difficulty 4
- **Programmer** (David Park): Repair skill, 100 HP, difficulty 2
- **Assistant** (Sarah Kim): First Aid skill, 100 HP, difficulty 2
- **Guide** (Tom Wilson): Wilderness Wisdom skill, 100 HP, difficulty 3
- **Pilot** (Mark Johnson): Mechanical Knowledge skill, **90 HP** (leg injury, difficulty 4)
- **Sales** (Lisa Anderson): Negotiation skill, 100 HP, difficulty 3

Skills have costs (HP or stress) and some have cooldowns.

### NPC State Machine

Each NPC tracks:
- `alive`: boolean (auto-set to false when HP reaches 0)
- `hp`: number (capped at role's `startingHP`, minimum 0)
- `mentalState`: `'calm' | 'agitated' | 'panicked'`
- `relationship`: `'neutral' | 'ally' | 'hostile'`

**Important**: When NPC HP drops to 0, `alive` is automatically set to `false` and adds +2 stress to the clock.

### Endings System

Four possible endings (defined in `src/data/endings.ts`):
1. **Rescue** (5 stars): Beacon reaches 100%
2. **Bitter Victory** (3 stars): Survive to Day 10 without rescue
3. **Collapse** (1 star): Stress clock reaches 15
4. **Your End** (1 star): Player HP reaches 0

Ending priority in `checkGameOver()`: Rescue > Player Death > Collapse > Day 10 Bitter Victory

### Component Structure

- `App.tsx`: Root component, phase-based routing
- `StartScreen.tsx`: Title screen with language selection
- `CharacterSelect.tsx`: Role selection with difficulty indicators
- `GamePlay.tsx`: Main game loop (displays event, choices, stats)
- `EndingScreen.tsx`: Shows ending narrative and final stats
- `ReplayScreen.tsx`: Cognitive bias analysis, replay data
- `AudioControl.tsx`: Audio settings control (mute, volume sliders for SFX/music)
- `LanguageSelector.tsx`: Language switching component (Chinese/English)

## Game Design Patterns

### Event Consequence Patterns

When creating new events, consequences can include:
```typescript
{
  stress: number,              // -1 for perfect decisions, +1-3 for traps
  playerHP: number,            // Damage/healing
  npcHP: [{ roleId, value }],  // NPC damage/healing
  npcState: [{ roleId, state }], // Mental state changes
  npcRelationship: [{ roleId, relationship }],
  npcDeath: [roleId],          // Direct kill (HP → 0, alive → false)
  beaconProgress: number,      // Usually +10 to +30, or -999 for 'failed'
  biasRecorded: BiasType,      // For trap choices
  perfectDecision: boolean,    // For rational choices
  flags: [{ key, value }],     // For event prerequisites
  immediateEnding: EndingType  // Force ending (rare)
}
```

### Bias Categories

15 cognitive biases organized by type:
- **Authority & Social**: authority_bias, groupthink, confirmation_bias
- **Probability**: gamblers_fallacy, survivorship_bias, availability_heuristic
- **Decision**: sunk_cost, omission_bias, anchoring_effect
- **Attribution**: fundamental_attribution_error, just_world_fallacy
- **Emotion**: emotional_reasoning, optimism_bias, backfire_effect
- **Perception**: mcnamara_fallacy, false_causality, scarcity_bias, pattern_recognition, normalcy_bias

Each bias has detailed `BiasInfo` in `src/data/biases.ts` with real-world examples and detection strategies.

## Data Persistence

- **Auto-save**: Triggered after every choice via `saveToLocalStorage()`
- **Storage key**: `frozen_hope_save`
- **Saved data**: phase, day, playerRole, playerHP, stressClock, beaconProgress, npcs, completedEvents, cognitiveTraps, perfectDecisions, inventory, flags, stressHistory
- **Language preference**: Saved in `localStorage` as `frozen_hope_language`
- **Clear save**: `localStorage.removeItem('frozen_hope_save')`
- **Clear language setting**: `localStorage.removeItem('frozen_hope_language')`

## Common Development Patterns

### Adding a New Event

1. Add to appropriate `src/data/events-actX.ts` file
2. Define `npcsInvolved` (only NPC roles, not player roles)
3. Set `prerequisites` if event requires specific game state
4. Create at least 3 choices:
   - One `trap` (with `biasRecorded`)
   - One `rational` (with `perfectDecision: true`)
   - Optional role-specific choices with `roleSpecific` field
5. Balance consequences (typical trap: +2-3 stress, rational: 0-1 stress or -1 stress)

### Adding a New Character

1. Add role definition to `src/data/roles.ts`
2. Define skill with cost (type: 'hp' or 'stress', value: number)
3. Add character to `RoleType` union in `src/types/index.ts`
4. Create role-specific choices in events using `roleSpecific` field
5. Update `CharacterSelect.tsx` to display new character

### Testing Event Flow

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Type check (useful before commits)
tsc --noEmit

# In browser console (when dev server is running), modify state for testing:
useGameStore.getState().day = 5  # Jump to day 5
useGameStore.getState().stressClock = 10  # Set high stress
useGameStore.getState().beaconProgress = 90  # Near rescue
useGameStore.getState().beaconProgress = 80  # Trigger rescue ending
```

## Known Issues & Fixes

- **Beacon rescue threshold**: Changed from 100% to 80% (see `gameConfig.ts:11`)
- **Perfect decision stress bonus**: Perfect decisions now grant -1 additional stress (see `gameConfig.ts:62`)
- **HP cannot exceed starting value**: Max HP enforced in `applyConsequences()`
- **Auto-death when HP=0**: Immediately triggers 'your_end' ending
- **Event filter**: Events with player role in `npcsInvolved` are filtered out (prevents NPCs talking to themselves)
- **Auto-progression**: After choice, game auto-loads next event or checks ending
- **Pilot starting HP**: Increased from 75 to 90 to improve survivability
- **Daily environmental damage**: Balanced to 4 HP base + modifiers based on stress and game progression
- **Audio system**: Implemented with master volume, SFX, and music controls
- **i18n**: Full Chinese/English translation support with persistent language preference

## Important Constants

See `src/constants/gameConfig.ts` for the complete list:

- **Max stress**: 15 (game ends at 15)
- **Max HP**: 100 (role-specific, Pilot starts at 90 after fixes)
- **Rescue threshold**: 80% beacon progress (not 100%)
- **Total days**: 10
- **NPC death penalty**: +2 stress per death
- **Perfect decision bonus**: -1 additional stress reduction
- **Act boundaries**: Days 1-3 (Act 1), 4-7 (Act 2), 8-10 (Act 3)
- **Daily environmental damage**: 4 HP + stress-based bonuses after Day 7

## File Organization

```
src/
├── components/       # React UI components (screens)
│   ├── AudioControl.tsx      # Audio settings control
│   ├── LanguageSelector.tsx  # Language switching
│   ├── StartScreen.tsx       # Title screen
│   ├── CharacterSelect.tsx   # Role selection
│   ├── GamePlay.tsx          # Main game loop
│   ├── EndingScreen.tsx      # Ending display
│   └── ReplayScreen.tsx      # Analysis & replay
├── data/            # Game content (roles, events, biases, endings)
├── stores/          # Zustand state management
├── types/           # TypeScript type definitions
├── constants/       # Game configuration & constants
│   └── gameConfig.ts         # Centralized game settings
├── i18n/            # Internationalization (Chinese/English)
│   ├── index.tsx             # Translation provider
│   ├── zh.ts                 # Chinese translations
│   ├── en.ts                 # English translations
│   ├── gameContent.ts        # Game text content
│   └── eventTranslations.ts  # Event-specific translations
├── systems/         # Game systems
│   ├── audioSystem.ts        # Audio playback system
│   └── npcBehavior.ts        # NPC AI behavior logic
└── utils/           # Utility functions (currently unused)
```

## Internationalization (i18n)

Full Chinese and English support implemented in `src/i18n/`:
- **Language detection**: Auto-detects browser language (Chinese/English)
- **Persistent storage**: Language preference saved to `localStorage` as `frozen_hope_language`
- **Translation system**: Context-based translation with parameter support
- **Game content**: All UI text, events, and cognitive bias descriptions are translated
- **Usage**: Use `useTranslation()` hook to access `t()` function for translations

## Audio System

Audio system implemented in `src/systems/audioSystem.ts` with `AudioControl.tsx` component:
- **Master volume control**: Global audio on/off toggle
- **SFX volume**: Sound effects volume control (button clicks, UI sounds)
- **Music volume**: Background music volume control (currently placeholder)
- **Right-click menu**: Access audio settings via right-click on the audio button
- **Persistent settings**: Audio preferences saved in localStorage
- **playSound()**: Function to play sound effects throughout the game
- **Default state**: Starts unmuted with default volume levels

## Tailwind Theme

Custom color palette defined in `tailwind.config.js`:
- `ice-*`: Blue-gray palette for frozen theme (100-900)
- `frost-*`: Cyan accents (100-700)

Background gradient: `from-gray-900 via-blue-900 to-gray-900`
