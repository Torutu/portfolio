# DaggerForge: Technical Feature Breakdown

A comprehensive guide to the advanced features powering DaggerForge, an Obsidian plugin for tabletop RPG game masters. Each section details what the feature does, how it works, and the technical architecture behind it.

---

## 1. Adversary Browser & Search Engine

### What It Does

The Adversary Browser provides game masters with an intuitive interface to discover, filter, and insert adversary cards (enemies) into their notes or canvas-based encounters. It displays both built-in core content from JSON files and custom user-created adversaries, allowing real-time filtering by name, tier, type, and source.

### How It Works

Users access a dedicated view in Obsidian's sidebar that displays all available adversaries. They can use multiple filters simultaneously—search by name, narrow by difficulty tier (1-4), filter by type (Bruiser, Horde, Leader, etc.), or view only content from specific sources (core, custom, expansions). Clicking an adversary inserts it as a formatted HTML card into the active note or canvas.

### Technical Architecture & Technologies

**Core Components:**

- **SearchEngine<T>** - A generic TypeScript class implementing multi-filter search logic

  - Maintains a list of searchable items and filter state
  - Implements `search()` method using compound filter predicates
  - Supports dynamic filter combinations without re-querying entire dataset
  - Tracks available filter options extracted from data

- **SearchControlsUI** - Reusable UI component factory for filter controls

  - Creates dropdown menus, text inputs, and checkboxes
  - Manages event handlers for filter state changes
  - Auto-updates available options based on loaded data
  - Supports dynamic filter enabling/disabling

- **AdversaryView (ItemView)** - Obsidian's custom view for sidebar panels
  - Implements `registerEvent()` for workspace listeners (memory safe)
  - Manages lifecycle: `onOpen()`, `onClose()`, refresh state preservation
  - Loads both JSON-based core adversaries and custom data from DataManager
  - Normalizes inconsistent data formats (camelCase vs PascalCase) for compatibility

**Data Flow:**

```
Built-in JSON Data + Custom DataManager → Normalize Format → SearchEngine
→ Apply Filters → Render HTML Cards → Insert into Note/Canvas
```

**Key Technologies:**

- **TypeScript Generics** - `SearchEngine<T>` works with any searchable item type
- **Obsidian ItemView API** - Integrates plugin into sidebar ecosystem
- **Event Registration Pattern** - Uses `registerEvent()` to prevent memory leaks
- **Compound Predicates** - Filters combined with logical AND across multiple fields
- **Template Literals** - Dynamic HTML generation with embedded data

---

## 2. Adversary Card Builder & HTML Generation

### What It Does

The Card Builder transforms structured adversary data into beautifully formatted HTML cards that render directly in Obsidian notes. These cards include interactive tickboxes for tracking HP and stress, weapon statistics, features, and visual indicators of difficulty level and source.

### How It Works

When inserting an adversary, the system takes raw data fields (name, HP, difficulty ratings, features, etc.) and generates semantic HTML with CSS classes for styling. The card includes:

- Interactive checkbox rows for HP and Stress damage tracking
- Multiple copies of HP/Stress rows if the user specifies multiple adversaries
- Color-coded source badges (core, custom, expansion content)
- Formatted feature lists with costs and descriptions
- Weapon statistics and experience rewards

### Technical Architecture & Technologies

**Core Components:**

- **buildCardHTML()** - Pure function generating HTML string from data

  - Takes `Record<string, string>` of form values and array of Feature objects
  - Handles numeric validation (HP, stress, count quantities)
  - Generates dynamic tickbox arrays using `Array.from()` loops
  - Includes data attributes for CSS targeting and JavaScript manipulation

- **Feature System** - Modular ability/power structure
  - Each feature has `name`, `type`, `cost`, and `desc`
  - Rendered as individual sections with formatted labels
  - Cost field shows action economy requirements
  - Supports arbitrary feature types from JSON data

**HTML Structure:**

```html
<section class="df-card-outer">
  <div class="df-card-inner">
    <!-- HP/Stress Tickboxes -->
    <div class="df-hp-tickboxes">
      <input type="checkbox" class="df-hp-tickbox" />
      <!-- repeated based on HP value -->
    </div>

    <!-- Core Stats -->
    <h2>${name}</h2>
    <div class="df-stats">Difficulty: ${difficulty} | HP: ${hp}</div>

    <!-- Features Array -->
    <div class="df-feature">
      <span class="df-feature-title">${name} - ${type}: ${cost}</span>
      <span class="df-feature-desc">${desc}</span>
    </div>
  </div>
</section>
```

**Key Technologies:**

- **Semantic HTML5** - Proper `<section>`, `<h2>`, structured markup
- **Data Attributes** - `data-weapon-range`, `data-type`, `data-count` for CSS selectors
- **CSS Custom Properties** - `--df-left`, `--df-top` for dynamic positioning
- **Pure Functions** - No side effects, deterministic output
- **String Concatenation** - `.join("")` for efficient array-to-HTML conversion
- **Template Literals** - Backticks for readable multi-line HTML generation

**Styling System:**

- **CSS Classes** - Scoped with `df-` prefix to prevent conflicts
- **Theme Variables** - Uses Obsidian's `--text-normal`, `--background-primary`
- **Source-Based Styling** - `.df-source-badge-core`, `.df-source-badge-custom` for theming
- **Type-Based Classes** - Allow different visual treatments for adversary roles

---

## 3. Unique ID System & Data Persistence

### What It Does

Ensures every custom adversary and environment maintains a stable, unique identifier even as user data evolves. This ID system prevents data duplication, enables reliable deletion/editing operations, and supports data migration from older plugin versions without losing information.

### How It Works

When a custom item is created, it receives a unique ID combining a timestamp and random string. This ID stays constant through edits and deletions. The DataManager stores all custom content in a single `data.json` file in Obsidian's plugin directory (`.obsidian/plugins/daggerforge/data.json`), indexed by these IDs for fast retrieval and updates.

### Technical Architecture & Technologies

**Core Components:**

- **idGenerator.ts** - Unique ID factory functions

  - Adversaries: `CUA_${timestamp}_${random}` format
  - Environments: `CUE_${timestamp}_${random}` format
  - Prefix distinguishes content type, prevents collisions
  - Random component ensures uniqueness within millisecond boundaries

- **DataManager** - Centralized data persistence layer
  - Implements CRUD operations: `addAdversary()`, `updateAdversary()`, `deleteAdversaryById()`
  - Handles version migrations from legacy data formats
  - Automatic ID generation for items lacking IDs (backwards compatibility)
  - Single source of truth stored via Obsidian's `saveData()` API

**Data Structure:**

```typescript
interface StoredData {
  version: string; // Enables future migrations
  adversaries: CardData[]; // Array of custom adversaries
  environments: EnvironmentData[];
  lastUpdated: number; // Timestamp for conflict detection
}
```

**Deletion Operation:**

1. ID-based lookup finds exact index: `findIndex(a => a.id === id)`
2. Array splice removes at that index
3. `saveData()` persists immediately to disk
4. View refresh re-queries and re-renders

**Migration Logic:**

```typescript
// Converts old format keys to new unified structure
if (Array.isArray(saved.custom_Adversaries))
  allAdversaries.push(...saved.custom_Adversaries);
if (Array.isArray(saved.incredible_Adversaries))
  allAdversaries.push(...saved.incredible_Adversaries);
// Old keys removed, new unified format saved
```

**Key Technologies:**

- **Obsidian Plugin API** - `loadData()` / `saveData()` for persistent JSON storage
- **Timestamps** - `Date.now()` provides millisecond precision
- **Random String Generation** - `Math.random().toString(36).substring(2, 10)`
- **Array Index Matching** - `findIndex()` with predicate for identity lookup
- **Shallow Spreading** - `...adv` operator for non-destructive updates
- **Version Tracking** - Schema versioning for safe data evolution

---

## 4. Dice Roller: Interactive Floating Window

### What It Does

Provides a dedicated floating panel for rolling multiple dice and maintaining a persistent roll history log. Users can queue different dice types (d4, d6, d20, etc.), specify roll counts, and see results with full expression breakdowns.

### How It Works

Users launch the dice roller window, which appears as a draggable floating panel. They select dice from buttons (d4, d6, d8, d10, d12, d20, d100), optionally adjust the count, add to a queue, then roll all at once. The expression and result display in a scrollable log that persists until cleared.

### Technical Architecture & Technologies

**Core Components:**

- **openDiceRoller()** - Factory function creating isolated window instance

  - Manages lifecycle: cleanup previous instance, create new DOM tree
  - Uses closure to capture `diceQueue` and `diceLog` state
  - Event listeners attached to new container elements only

- **Drag System** - Custom implementation for cross-device compatibility

  - `mousedown` on header captures offset coordinates
  - `mousemove` calculates new position: `newLeft = e.clientX - offsetX`
  - CSS custom properties store position: `--df-left`, `--df-top`
  - `mouseup` terminates drag without persisting position (resets on close)

- **Dice Parser & Roller** - Expression evaluation
  - Accepts notation like `"2d6 + 3d4"` (sum of expressions)
  - Each expression generates array of rolls (e.g., `[4, 3]` for `2d6`)
  - Calculates: total value, individual die values, and human-readable breakdown
  - Returns `{ total: number, details: string }`

**State Management:**

```typescript
let diceQueue: string[] = []; // Current queued rolls: ["2d6", "1d20"]
let diceLog: string[] = []; // History: ["2d6 + 1d20 -> [4,3] + [15] = 22"]
let isDragging: boolean = false; // Drag state
let offsetX: number = 0; // Click offset from element edge
```

**UI Update Pattern:**

```typescript
function updateQueue() {
  queueContainer.empty();
  diceQueue.forEach((expr, idx) => {
    const div = queueContainer.createEl("div");
    div.createEl("span", { text: expr });
    // Add remove button for each queue item
  });
}
```

**Key Technologies:**

- **Event Listeners** - `mousedown`, `mousemove`, `mouseup` for drag mechanics
- **Closure State** - `diceQueue` and `diceLog` maintained in function scope
- **CSS Custom Properties** - Dynamic positioning without inline styles
- **DOM Manipulation** - `.appendChild()`, `.empty()`, event delegation
- **String Parsing** - Regular expressions for dice notation validation
- **Array Methods** - `.split()`, `.join()`, `.splice()` for queue management
- **Scrollable Containers** - `scrollHeight`, `scrollTop` for auto-scroll on new entries

---

## 5. Battle Guide: Encounter Calculator

### What It Does

Calculates Battle Points (BP) for encounter balance. Game masters input player count, adjust BP based on conditions (difficulty adjustments, special circumstances), then "spend" BP by adding adversaries. The calculator tracks total available points and remaining balance in real-time.

### How It Works

1. **Calculate Base**: User enters PC count, calculates base BP: `3 × playerCount + 2`
2. **Adjust**: Add/subtract BP for encounter modifiers (more difficult +2, fewer adversaries -1, etc.)
3. **Spend**: Add adversary types (each costs different BP: Minion=1, Solo=5, etc.)
4. **Track**: Visual display shows adjustments, spending, and remaining BP

### Technical Architecture & Technologies

**Core Components:**

- **openEncounterCalculator()** - Encounter builder factory function

  - Creates two-column layout: Adjustments (left) and Spending (right)
  - Manages `encounterState` across all user interactions
  - Handles drag mechanics identical to dice roller

- **State Machine** - Persistent encounter state

  ```typescript
  interface EncounterState {
    baseBP: number;
    adjustments: { value: number; reason: string }[];
    spentItems: { cost: number; label: string }[];
    pcCount: number;
  }
  ```

- **Calculation Engine** - Real-time balance updates
  ```typescript
  function calculateTotals() {
    const totalAdj = adjustments.reduce((sum, a) => sum + a.value, 0);
    const totalSpent = spentItems.reduce((sum, item) => sum + item.cost, 0);
    const remaining = baseBP + totalAdj - totalSpent;
    return { totalAdj, totalSpent, remaining };
  }
  ```

**UI Pattern - Two-Column Design:**

```
┌─────────────────────────────────────┐
│ Adjustments     │  Spending         │
│ ─────────────   │  ─────────────    │
│ More difficult  │  Solo Adversary   │
│ +2              │  -5 BP            │
│                 │                   │
│ Total Adj: +2   │  Remaining: 12 BP │
└─────────────────────────────────────┘
```

**Button System:**

- **Adjustment Buttons**: Each applies a modifier with a reason label
- **Spend Buttons**: Each subtracts BP and adds item to spending list
- **Data Attributes**: `[data-adjust]`, `[data-cost]` for value extraction

**Key Technologies:**

- **Reducer Pattern** - `.reduce()` for computing running totals
- **Query Selectors** - `querySelectorAll("[data-adjust]")` for group operations
- **Event Delegation** - Single handler extracting value from `dataset`
- **DOM Manipulation** - `.empty()` and `.createEl()` for live updates
- **CSS Grid/Flexbox** - Column layout for balanced visual hierarchy
- **Scroll Auto-Anchor** - `scrollTop = scrollHeight` keeps latest entries visible
- **Number Formatting** - Display remaining BP with +/- indicators

---

## 6. Environment Browser

### What It Does

Parallel system to the Adversary Browser, allowing discovery and insertion of environment cards (locations, scenes, settings) with features, difficulty ratings, and potential adversary recommendations. Supports the same multi-filter search system and canvas integration.

### How It Works

Similar to adversaries: display all environments in a searchable sidebar view, apply filters (name, tier, type, source), and insert selected environments as formatted HTML cards. Environments include features with descriptions, bullets, questions for players, impulses (GM prompts), and difficulty indicators.

### Technical Architecture & Technologies

**Core Components:**

- **EnvironmentView (ItemView)** - Custom sidebar view

  - Reuses `SearchEngine<EnvironmentData>` for consistent filtering
  - Implements same `registerEvent()` pattern for memory safety
  - Loads from both JSON and custom DataManager

- **Environment Data Model** - Rich structure

  ```typescript
  interface EnvironmentData {
    id?: string;
    name: string;
    tier: number;
    type: string; // Social, Exploration, Event, Traversal
    desc: string;
    difficulty: string;
    impulse: string; // GM prompt/trigger
    potentialAdversaries: string;
    features: EnvironmentFeature[];
  }

  interface EnvironmentFeature {
    name: string;
    type: string;
    cost?: string;
    text: string;
    bullets?: string[]; // Bullet point list
    questions?: string[]; // Questions for players
    textAfter?: string;
  }
  ```

- **HTML Generation** - Rich card structure
  - Features can have bullet lists (`<ul>`)
  - Questions rendered as separate `<div>` elements
  - Source badge styling applied dynamically
  - Semantic HTML with data attributes for CSS targeting

**Feature Rendering Logic:**

```typescript
const featuresHTML = env.features
  .map((f) => {
    const bulletsHTML = Array.isArray(f.bullets)
      ? `<ul class="df-env-bullet">${f.bullets
          .map((b) => `<li class="df-env-bullet-item">${b}</li>`)
          .join("")}</ul>`
      : "";

    const questionsHTML = f.questions?.length
      ? `<div class="df-env-questions">${f.questions
          .map((q) => `<div class="df-env-question">${q}</div>`)
          .join("")}</div>`
      : "";

    return `<div class="df-feature">${f.name} - ${f.type}: ${f.cost}${bulletsHTML}${questionsHTML}</div>`;
  })
  .join("");
```

**Deletion System** - Identical to adversaries

- ID-based lookup in DataManager
- `deleteEnvironmentById(id)` removes custom environment
- View refresh re-queries and re-renders filtered results
- Custom items show delete button, built-in items do not

**Key Technologies:**

- **Conditional Rendering** - Ternary operators for optional elements
- **Array Mapping** - `.map()` for feature transformation
- **Template Literals** - Multi-line HTML with embedded variables
- **Data Normalization** - Ensures all environments have consistent structure
- **Event Stopping** - `e.stopPropagation()` prevents unwanted event bubbling
- **CSS Class Toggling** - Dynamic source-based styling

---

## 7. Card Editing Modal

### What It Does

Allows game masters to edit existing adversary or environment cards in place. Changes are reflected immediately in the note without requiring card deletion and re-insertion, maintaining context and position.

### How It Works

User clicks the edit button (pencil icon) on a card. A modal dialog opens with pre-populated form fields showing current values. User modifies any field, adds/removes features, then clicks "Update Card" to regenerate the HTML and replace the original card in the note.

### Technical Architecture & Technologies

**Core Components:**

- **AdversaryEditorModal (Modal)** - Form builder and submission

  - Extends Obsidian's `Modal` class
  - `onOpen()` constructs form UI with current values
  - Form handlers capture input and rebuild HTML

- **Form Field Creation System** - Reusable helpers

  ```typescript
  createField(
    container, // HTMLElement to append to
    inputs, // Form state object
    label, // Display label
    key, // Data key (e.g., "name", "hp")
    type, // "input", "textarea", "select"
    customClass, // CSS class for styling
    savedValues // Pre-populate with existing values
  );
  ```

- **Feature Management** - Dynamic feature rows
  - `addFeature()` creates new feature input row
  - Each feature has `name`, `type`, `cost`, `desc` fields
  - Features can be added/removed without limits
  - `getFeatureValues()` extracts all feature data on submit

**Form Submission Flow:**

```typescript
insertBtn.onclick = () => {
  // Extract all input values from form
  const values = Object.fromEntries(
    Object.entries(inputs).map(([key, el]) => [
      key,
      (el as HTMLInputElement).value.trim(),
    ])
  );

  // Get features array
  const features = getFeatureValues(this.features);

  // Rebuild HTML with new values
  const newHTML = buildCardHTML(values, features);

  // Replace original card in note
  if (this.onSubmit) this.onSubmit(newHTML);
  this.close();
};
```

**State Isolation** - Critical for preventing data contamination

- Modal creates isolated `inputs` object
- Form values only live in modal scope
- Closing modal without submit discards changes
- Pre-population from `cardData` doesn't modify source

**Key Technologies:**

- **Obsidian Modal API** - `onOpen()`, `onClose()`, `contentEl`
- **Form Handling** - Input validation, value extraction, submission
- **Object Mapping** - `Object.entries()` and `Object.fromEntries()` for data transformation
- **DOM Construction** - Obsidian's `.createEl()` for type-safe element creation
- **Callback Pattern** - `onSubmit` callback for card replacement logic
- **Trim Operations** - Whitespace removal before value submission

---

## 8. Canvas Integration & Card Insertion

### What It Does

Seamlessly inserts adversaries and environments into Obsidian Canvas files (visual note organization system). Cards are placed as draggable canvas elements alongside notes, images, and other content.

### How It Works

System detects if user has canvas or markdown view active. For canvas, it calculates available space using existing card positions, creates new card with HTML content, and adds to canvas with proper dimensions and positioning. For markdown, it inserts HTML as inline content.

### Technical Architecture & Technologies

**Core Components:**

- **Canvas Detection & Integration**

  ```typescript
  const isCanvas = isCanvasActive(this.app);
  if (isCanvas) {
    const position = getAvailableCanvasPosition(this.app);
    createCanvasCard(this.app, htmlContent, {
      x: position.x,
      y: position.y,
      width: 400,
      height: 600,
    });
  }
  ```

- **Position Calculation Algorithm** - Avoids overlaps

  - Queries existing canvas nodes
  - Finds bounding box of current cards
  - Places new card below lowest existing card
  - Fallback default position if canvas empty
  - Respects scroll offset and viewport boundaries

- **Canvas Card Creation** - Wrapper format
  - Creates text file (markdown) on disk
  - Adds as file node to canvas
  - Canvas automatically renders with specified dimensions
  - File persists in vault for editing

**DOM Target Detection:**

```typescript
// Identify which editor is active
const isCanvasActive = (app: App): boolean => {
  const activeView = app.workspace.getActiveViewOfType(CanvasView);
  return activeView !== null;
};

const isMarkdownActive = (app: App): boolean => {
  const activeView = app.workspace.getActiveViewOfType(MarkdownView);
  return activeView?.getMode() === "source";
};
```

**Insertion Flow:**

```
User clicks "Insert Adversary"
  ↓
Check: Canvas active?
  ├─ Yes: Calculate position → Create canvas card → Place at coords
  └─ No: Check markdown view active?
    ├─ Yes: Get editor → Insert HTML at cursor
    └─ No: Show notice "No active editor"
```

**Key Technologies:**

- **Obsidian Workspace API** - `getActiveViewOfType()` for context detection
- **Canvas File Nodes** - Files rendered as draggable blocks with dimensions
- **Bounding Box Calculation** - `Math.max()`, `Math.min()` for viewport math
- **File Persistence** - Created files survive vault closure
- **Error Handling** - Graceful fallback when no editor active
- **Notice System** - User feedback via Obsidian notifications

---

## 9. Search Controls UI Component

### What It Does

Reusable filter UI factory that creates search bars, dropdown filters, and clear buttons. Used by both Adversary and Environment browsers to maintain consistent filtering UX across the plugin.

### How It Works

Configuration object specifies available filter options, placeholder text, and callback functions. Factory method creates DOM elements, wires up event handlers, and manages filter state changes. Updates UI dynamically as new data loads.

### Technical Architecture & Technologies

**Core Components:**

- **SearchControlsUI** - Configurable component

  ```typescript
  interface SearchControlsUIConfig {
    placeholderText: string;
    showTypeFilter: boolean;
    availableTiers: number[];
    availableSources: string[];
    availableTypes: string[];
    onSearchChange: (query: string) => void;
    onTierChange: (tier: number | null) => void;
    onSourceChange: (source: string | null) => void;
    onTypeChange: (type: string | null) => void;
    onClear: () => void;
  }
  ```

- **Dynamic Filter Builder** - Creates controls based on config

  - Search input: text-based query
  - Dropdowns: tier, source, type selections
  - Clear button: resets all filters
  - Each control has `change` event handler

- **Option Update System** - Reflects available data
  ```typescript
  updateAvailableOptions(
    filterName: "sources" | "types" | "tiers",
    options: string[] | number[]
  ) {
    // Update dropdown options dynamically
    // Preserve selected value if still valid
  }
  ```

**Event Handler Pattern:**

```typescript
// Search input triggers query updates
searchInput.addEventListener("input", (e) => {
  const query = (e.target as HTMLInputElement).value;
  this.config.onSearchChange(query);
});

// Dropdown change triggers filter updates
tierSelect.addEventListener("change", (e) => {
  const value = (e.target as HTMLSelectElement).value;
  const tier = value === "" ? null : parseInt(value, 10);
  this.config.onTierChange(tier);
});

// Clear button resets everything
clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  tierSelect.value = "";
  sourceSelect.value = "";
  typeSelect.value = "";
  this.config.onClear();
});
```

**Reusability Pattern:**

- Single component serves both Adversary and Environment views
- Configuration drives available options
- Callbacks decouple UI from business logic
- Dynamic option updates support data-driven filtering

**Key Technologies:**

- **Factory Pattern** - Configuration-driven component creation
- **Callback Functions** - Decoupled event handling
- **Event Listeners** - `input`, `change` for different control types
- **DOM Events** - Native HTML form events
- **CSS Scoping** - Classes prevent style conflicts across instances
- **Dropdown Management** - Option addition/removal without re-rendering

---

## 10. Adversary Counter & Batch Operations

### What It Does

Multiplies selected adversaries: if user selects "Count: 3", inserting a single adversary card creates 3 copies. Useful for spawning large groups of identical enemies without repetitive clicking.

### How It Works

Counter state tracked in memory (in-memory integer). When rendering cards, loop repeats HP/Stress tickbox sections based on count. Each copy gets numbered (1, 2, 3...). Counter resets when user clicks "Clear Filters" button.

### Technical Architecture & Technologies

**Core Components:**

- **Counter State Management** - Global state

  ```typescript
  let adversaryCount: number = 1;

  export function getAdversaryCount(): number {
    return adversaryCount;
  }
  export function setAdversaryCount(count: number): void {
    adversaryCount = count;
  }
  export function incrementAdversaryCount(delta: number): void {
    adversaryCount += delta;
  }
  export function decrementAdversaryCount(): void {
    adversaryCount = Math.max(1, adversaryCount - 1);
  }
  export function resetAdversaryCount(): void {
    adversaryCount = 1;
  }
  ```

- **Counter UI** - Plus/minus buttons

  ```typescript
  const minusBtn = container.createEl("button", { text: "-" });
  const counterInput = container.createEl("input", {
    type: "number",
    min: "1",
  });
  const plusBtn = container.createEl("button", { text: "+" });

  minusBtn.onclick = () => {
    decrementAdversaryCount();
    counterInput.value = getAdversaryCount().toString();
  };
  ```

- **Card Replication Logic** - In CardBuilder

  ```typescript
  let countNum = Number(count);
  countNum = Number.isInteger(countNum) && countNum >= 1 ? countNum : 1;

  const hpStressRepeat = Array.from({ length: countNum }, (_, index) => {
    // Generate HP/Stress tickboxes for this copy
    return `<div class="df-hp-tickboxes">...</div>`;
  }).join("");
  ```

**Input Validation:**

- Minimum: 1 (prevent zero-count cards)
- Maximum: none (support large groups)
- Non-integer: floor to valid integer
- Empty: default to 1

**Counter Display Markup:**

```html
<div class="df-adversary-counter-container">
  <button class="df-adversary-counter-btn">-</button>
  <input type="number" class="count-input" value="1" min="1" />
  <button class="df-adversary-counter-btn">+</button>
</div>
```

**HTML Output - Multiple Copies:**

```html
<!-- Copy 1 -->
<div class="df-hp-tickboxes">
  <span class="df-hp-stress">HP</span>
  <input type="checkbox" />
  <input type="checkbox" />
  <span class="df-adversary-count">1</span>
</div>

<!-- Copy 2 -->
<div class="df-hp-tickboxes">
  <span class="df-hp-stress">HP</span>
  <input type="checkbox" />
  <input type="checkbox" />
  <span class="df-adversary-count">2</span>
</div>
```

**Key Technologies:**

- **Module Scope** - Counter persists in module closure
- **Input Sanitization** - `Number.isInteger()` validation
- **Array.from()** - Generate array of length N for looping
- **String Interpolation** - Index in template: `${index + 1}`
- **Event Listeners** - Plus/minus buttons update UI and state
- **HTML Input Constraints** - `min="1"` enforces lower bound

---

## Summary: Technology Stack

**Language & Type System:**

- TypeScript with strict null checks
- Generics for reusable search logic
- Interface-based contracts for data

**Obsidian APIs:**

- Plugin lifecycle: `onload()`, `onunload()`
- Views: Custom `ItemView` for sidebars
- Modals: `Modal` for forms
- Events: `registerEvent()`, `registerDomEvent()` for memory safety
- Data: `loadData()` / `saveData()` for persistence
- Workspace: Editor, MarkdownView, CanvasView detection

**Web Technologies:**

- DOM manipulation: `createElement()`, `.innerHTML`, `.appendChild()`
- Event handling: `addEventListener()`, event delegation
- CSS: Custom properties, scoped classes, semantic HTML
- Forms: Input validation, form state management

**Architecture Patterns:**

- Factory functions for UI component creation
- Generic classes for reusable logic
- Callback-based decoupling
- Pure functions for transformations
- Closure-based state management
- Event-driven state updates

**Data Structures:**

- JSON files for bundled content
- Plugin data JSON for custom content
- TypeScript interfaces for type safety
- Arrays and objects for collections

---

## Functions Modified or Created

### Data Management

- `DataManager.ts` - Core data persistence class with full CRUD
  - `load()` - Migrate legacy data formats
  - `addAdversary()` / `addEnvironment()` - Create custom content
  - `updateAdversary()` / `updateEnvironment()` - Modify existing
  - `deleteAdversaryById()` / `deleteEnvironmentById()` - ID-based deletion
  - `getAdversaries()` / `getEnvironments()` - Retrieve all items
  - `searchAdversaries()` / `searchEnvironments()` - Query by name
  - `importData()` / `exportData()` - Bulk operations
  - `ensureAdversariesHaveIds()` / `ensureEnvironmentsHaveIds()` - Migration helpers
  - `getStatistics()` - Summary stats

### Search System

- `searchEngine.ts` - Generic filterable search class

  - `setItems()` - Load searchable collection
  - `setFilters()` / `getFilters()` - Filter state management
  - `search()` - Execute multi-filter query
  - `searchWith()` - Temporary filter override
  - `clearFilters()` - Reset to defaults
  - `getAvailableOptions()` - Dynamic filter options extraction
  - `getResultCount()` / `getCountWith()` - Result counting
  - `matchesAllFilters()` - Compound predicate checking
  - `matchesQuery()`, `matchesTier()`, `matchesSource()`, `matchesType()` - Filter predicates

- `searchControlsUI.ts` - Reusable filter UI component
  - `create()` - Render controls into container
  - `updateAvailableOptions()` - Update dropdown options dynamically

### Adversary Features

- `AdvSearch.ts` - Adversary browser view

  - `AdversaryView` class (ItemView)
  - `onOpen()` - Initialize view on first load
  - `refresh()` - Reload data preserving filters
  - `loadAdversaryData()` - Fetch from JSON + DataManager
  - `loadCustomAdversaries()` - Query custom content
  - `normalizeAdversary()` - Format conversion (camelCase/PascalCase)
  - `createAdversaryCard()` - Build card DOM element
  - `insertAdversaryIntoNote()` - Route to canvas or markdown
  - `generateAdversaryMarkdown()` - Create insertion content
  - `deleteCustomAdversary()` - Remove by ID
  - `handleSearchChange()`, `handleTierChange()`, `handleSourceChange()`, `handleTypeChange()` - Filter callbacks
  - `createCounterControls()` - Plus/minus multiplier UI

- `CardBuilder.ts` - HTML generation

  - `buildCardHTML()` - Pure function generating card HTML

- `AdvEditorModal.ts` - Card editing form
  - `AdversaryEditorModal` class (Modal)
  - `onOpen()` - Render form with pre-populated values
  - `onClose()` - Clean up modal state

### Environment Features

- `EnvSearch.ts` - Environment browser view

  - `EnvironmentView` class (ItemView)
  - `onOpen()` - Initialize view
  - `loadEnvironmentData()` - Load built-in + custom
  - `loadCustomEnvironments()` - Query DataManager
  - `createEnvironmentCard()` - Build card DOM
  - `deleteCustomEnvironment()` - Remove by ID
  - Handler methods for filter callbacks
  - Rich HTML generation with features, bullets, questions

- `EnvEditorModal.ts` - Environment editing

### Extra Utilities

- `diceRoller.ts` - Dice rolling floating window

  - `openDiceRoller()` - Launch draggable dice panel
  - Queue management functions
  - Drag handler functions
  - Log update and display

- `encounterCalc.ts` - Battle point calculator

  - `openEncounterCalculator()` - Launch encounter builder
  - `calculateTotals()` - Sum adjustments and spending
  - `updateDisplay()` - Refresh UI with current state

- `idGenerator.ts` - Unique ID creation
  - `generateAdvUniqueId()` - Create adversary IDs
  - `generateEnvUniqueId()` - Create environment IDs

### Utility Functions

- `canvasHelpers.ts` - Canvas integration

  - `isCanvasActive()` - Detect canvas view
  - `createCanvasCard()` - Create canvas node
  - `getAvailableCanvasPosition()` - Calculate placement

- `adversaryCounter.ts` - Batch multiplier

  - `getAdversaryCount()` / `setAdversaryCount()` / `incrementAdversaryCount()` / etc.

- Various helper modules for form fields, data filters, etc.

---

**Last Updated:** January 2025
**Plugin Scope:** Obsidian Plugin Architecture
**Target Audience:** Portfolio reviewers, technical documentation
