# DaggerForge: Feature Breakdown

---

## 1. Adversary Browser & Search Engine

**What It Does**  
A sidebar panel that displays adversary cards with real-time multi-filter search. Filter by name, tier level (1-4), type (Bruiser, Horde, Solo, etc.), or content source. Click any result to insert it into your note or canvas.

**How It Works**  
Search engine maintains current filters and searches across loaded adversaries. When you adjust any filter (name, tier, type, source), it instantly re-queries the data and re-renders results. Built-in JSON data and custom user-created adversaries are merged and displayed together.

**Pseudo Code**  
```
class SearchEngine:
  items = []
  filters = { query: "", tier: null, source: null, type: null }
  
  search():
    return items.filter(item => 
      matchesQuery(item) AND
      matchesTier(item) AND
      matchesSource(item) AND
      matchesType(item)
    )
  
  setFilters(newFilters):
    filters = merge(filters, newFilters)
    renderResults(search())

onTierChange(tier):
  searchEngine.setFilters({ tier })
  renderResults(searchEngine.search())
```

---

## 2. Card Builder & HTML Generator

**What It Does**  
Converts adversary data into styled HTML cards that render directly in your notes. Cards include interactive HP/Stress checkboxes, weapon stats, features, and visual badges showing difficulty and content source.

**How It Works**  
Takes raw data (name, HP value, difficulty, features array) and builds an HTML string. For each HP point, creates a checkbox. Repeats the entire HP/Stress section based on adversary count. Maps feature objects into formatted divs with names, types, costs, and descriptions.

**Pseudo Code**  
```
function buildCardHTML(values, features):
  hpTickboxes = Array.from(range(values.hp))
    .map(() => '<input type="checkbox" />')
    .join("")
  
  stressTickboxes = Array.from(range(values.stress))
    .map(() => '<input type="checkbox" />')
    .join("")
  
  repeatCount = values.count || 1
  hpStressRows = Array.from(range(repeatCount))
    .map(index => `
      <div class="df-hp-tickboxes">
        ${hpTickboxes}
        <span>${index + 1}</span>
      </div>
      <div class="df-stress-tickboxes">
        ${stressTickboxes}
      </div>
    `)
    .join("")
  
  featuresHTML = features
    .map(f => `
      <div class="df-feature">
        <span>${f.name} - ${f.type}: ${f.cost}</span>
        <span>${f.desc}</span>
      </div>
    `)
    .join("")
  
  return `
    <section class="df-card-outer">
      <h2>${values.name}</h2>
      <div>Tier ${values.tier} ${values.type}</div>
      ${hpStressRows}
      <div class="df-stats">
        HP: ${values.hp} | ATK: ${values.atk}
        ${values.stress ? 'Stress: ' + values.stress : ''}
      </div>
      ${featuresHTML}
    </section>
  `
```

---

## 3. Unique ID & Data Persistence

**What It Does**  
Every custom adversary and environment gets a unique identifier (CUA_timestamp_random). Stored in plugin's data.json file. Enables reliable deletion, editing, and prevents data duplication across sessions.

**How It Works**  
When creating custom content, generate ID: `CUA_${Date.now()}_${randomString}`. DataManager loads all stored data from `.obsidian/plugins/daggerforge/data.json`. Delete by ID: find index matching ID, remove from array, save. Update same way: find by ID, replace, save.

**Pseudo Code**  
```
function generateAdvUniqueId():
  timestamp = Date.now()
  random = Math.random().toString(36).substring(2, 10)
  return "CUA_" + timestamp + "_" + random

class DataManager:
  data = { adversaries: [], environments: [] }
  
  async load():
    data = await plugin.loadData()
    // Migrate old formats if present
    if data.custom_Adversaries exists:
      data.adversaries += data.custom_Adversaries
  
  async addAdversary(adv):
    if not adv.id:
      adv.id = generateAdvUniqueId()
    data.adversaries.push(adv)
    await save()
  
  async deleteAdversaryById(id):
    index = data.adversaries.findIndex(a => a.id === id)
    data.adversaries.splice(index, 1)
    await save()
  
  getAdversaries():
    return data.adversaries
```

---

## 4. Dice Roller: Floating Window

**What It Does**  
Draggable floating panel for rolling multiple dice. Select dice (d4, d6, d20, etc.), set quantity, queue them up, roll all at once. Results display in persistent log showing expression and total.

**How It Works**  
Click dice buttons to add to queue (e.g., "2d6", "1d20"). Click "Roll All" to evaluate expression. Drag header to move window around. Results appear in log below. Each log entry shows the full expression and breakdown.

**Pseudo Code**  
```
function openDiceRoller():
  container = createDiv("df-bg-floating-window")
  diceQueue = []
  diceLog = []
  
  header.addEventListener("mousedown", (e):
    isDragging = true
    offsetX = e.clientX - container.left
    offsetY = e.clientY - container.top
  )
  
  window.addEventListener("mousemove", (e):
    if isDragging:
      newLeft = e.clientX - offsetX
      newTop = e.clientY - offsetY
      container.style.setProperty('--df-left', newLeft + 'px')
      container.style.setProperty('--df-top', newTop + 'px')
  )
  
  window.addEventListener("mouseup", ():
    isDragging = false
  )
  
  diceButtons.forEach(btn =>
    btn.addEventListener("click", ():
      sides = btn.dataset.sides
      count = countInput.value || 1
      diceQueue.push(count + "d" + sides)
      updateQueue()
    )
  )
  
  rollBtn.addEventListener("click", ():
    expression = diceQueue.join(" + ")
    result = rollDice(expression)
    diceLog.push(expression + " = " + result.total)
    updateLog()
    diceQueue = []
  )
```

---

## 5. Battle Guide: Encounter Calculator

**What It Does**  
Calculate Battle Points for balanced encounters. Enter player count, adjust BP based on conditions (more difficult +2, special rules -1, etc.), then "spend" BP by adding adversaries. Real-time balance tracking.

**How It Works**  
Base BP formula: `3 × playerCount + 2`. Buttons add/subtract adjustments (each shows reason). Separate buttons "spend" BP by adding adversary types (Minion costs 1 BP, Solo costs 5 BP, etc.). UI shows total adjustments, total spent, and remaining BP in real-time.

**Pseudo Code**  
```
encounterState = {
  baseBP: 0,
  adjustments: [{ value: 2, reason: "More difficult" }],
  spentItems: [{ cost: 5, label: "Solo Adversary" }],
  pcCount: 3
}

function calculateBase():
  pcCount = parseInt(pcInput.value)
  baseBP = 3 * pcCount + 2
  adjustments = []
  spentItems = []
  updateDisplay()

adjustmentButtons.forEach(btn =>
  btn.addEventListener("click", ():
    value = parseInt(btn.dataset.adjust)
    reason = btn.textContent
    adjustments.push({ value, reason })
    updateDisplay()
  )
)

spendButtons.forEach(btn =>
  btn.addEventListener("click", ():
    cost = parseInt(btn.dataset.cost)
    label = btn.textContent
    spentItems.push({ cost, label })
    updateDisplay()
  )
)

function updateDisplay():
  totalAdj = adjustments.reduce((sum, a) => sum + a.value, 0)
  totalSpent = spentItems.reduce((sum, item) => sum + item.cost, 0)
  remaining = baseBP + totalAdj - totalSpent
  
  render adjustmentsList with all adjustments
  render spendingList with all items
  display "Total Adjustments: " + totalAdj
  display "Remaining BP: " + remaining
```

---

## 6. Environment Browser

**What It Does**  
Parallel to adversary browser. Display environments (locations, scenes) with searchable filters. Environments include features with bullets, questions for players, and impulse prompts. Insert as cards into notes or canvas.

**How It Works**  
Same filter system as adversaries (name, tier, type, source). Click environment to insert rich HTML card showing name, description, impulse, difficulty, and formatted features with bullets and player questions.

**Pseudo Code**  
```
class EnvironmentView extends ItemView:
  environments = []
  searchEngine = SearchEngine()
  
  onOpen():
    initializeView()
    loadEnvironmentData()
  
  loadEnvironmentData():
    builtIn = ENVIRONMENTS.map(e => ({ ...e, isCustom: false }))
    custom = plugin.dataManager.getEnvironments()
      .map(e => ({ ...e, isCustom: true }))
    environments = builtIn + custom
    searchEngine.setItems(environments)
    renderResults(environments)
  
  createEnvironmentCard(env):
    card = createDiv("df-env-card")
    card.innerHTML = `
      <h3>${env.name}</h3>
      <p>Tier ${env.tier} ${env.type}</p>
      <p>${env.desc}</p>
      <p><strong>Impulse:</strong> ${env.impulse}</p>
      ${renderFeatures(env.features)}
    `
    card.onClick = () => insertEnvironmentIntoNote(env)
    return card
  
  renderFeatures(features):
    return features.map(f =>
      `<div class="df-feature">
        <strong>${f.name} - ${f.type}</strong>
        <p>${f.text}</p>
        ${f.bullets ? '<ul>' + f.bullets.map(b => '<li>' + b) + '</ul>' : ''}
        ${f.questions ? f.questions.map(q => '<div>' + q + '</div>').join('') : ''}
      </div>`
    ).join('')
```

---

## 7. Card Editor Modal

**What It Does**  
Edit adversary or environment cards in-place. Opens form with pre-populated values. Modify any field (name, HP, features, etc.), click "Update Card" to replace original card without leaving note.

**How It Works**  
When user clicks edit button on card, modal opens showing all current values. Form has inputs for basic stats, textarea for description, feature rows that can be added/removed. Submit generates new HTML and replaces card via editor.

**Pseudo Code**  
```
class AdversaryEditorModal extends Modal:
  cardData = {}
  inputs = {}
  features = []
  
  onOpen():
    contentEl.innerHTML = `
      <h2>Edit Adversary</h2>
      <input type="text" name="name" value="${cardData.name}" />
      <input type="text" name="tier" value="${cardData.tier}" />
      <select name="type">
        <option selected>${cardData.type}</option>
      </select>
      <textarea name="desc">${cardData.desc}</textarea>
      ${renderFeatureInputs(cardData.features)}
      <button id="addFeatureBtn">Add Feature</button>
      <button id="submitBtn">Update Card</button>
    `
    
    this.inputs = collectFormElements()
    this.features = []
    
    addFeatureBtn.onClick = () => addFeature()
    
    submitBtn.onClick = ():
      values = Object.fromEntries(
        inputs.map(([key, el]) => [key, el.value.trim()])
      )
      features = getFeatureValues(this.features)
      newHTML = buildCardHTML(values, features)
      editor.replaceSelection(newHTML)
      this.close()
  
  renderFeatureInputs(features):
    return features.map(f =>
      `<div class="df-feature-row">
        <input type="text" name="featureName" value="${f.name}" />
        <input type="text" name="featureType" value="${f.type}" />
        <input type="text" name="featureCost" value="${f.cost}" />
        <textarea name="featureDesc">${f.desc}</textarea>
        <button class="remove-feature">Remove</button>
      </div>`
    ).join('')
```

---

## 8. Canvas Integration & Insertion

**What It Does**  
Detect whether user has canvas (visual note layout) or markdown view open. Insert cards into canvas as draggable blocks or into markdown as inline HTML.

**How It Works**  
Check active view type: if CanvasView, create new file with card HTML, add to canvas at calculated position. If MarkdownView, insert HTML at editor cursor. If neither, show error notice.

**Pseudo Code**  
```
function insertAdversaryIntoNote(adversary):
  isCanvas = isCanvasActive(app)
  if isCanvas:
    adversaryHTML = generateAdversaryMarkdown(adversary)
    position = getAvailableCanvasPosition(app)
    createCanvasCard(
      app,
      adversaryHTML,
      { x: position.x, y: position.y, width: 400, height: 600 }
    )
    return
  
  view = app.workspace.getActiveViewOfType(MarkdownView)
  if not view:
    showNotice("No note or canvas is open")
    return
  
  if view.getMode() !== "source":
    showNotice("Must be in edit mode")
    return
  
  editor = view.editor
  adversaryHTML = generateAdversaryMarkdown(adversary)
  editor.replaceSelection(adversaryHTML)

function getAvailableCanvasPosition(app):
  canvas = app.workspace.getActiveViewOfType(CanvasView)
  nodes = canvas.data.nodes
  if nodes.empty:
    return { x: 0, y: 0 }
  
  maxY = Math.max(...nodes.map(n => n.y + n.height))
  return { x: 0, y: maxY + 50 }

function createCanvasCard(app, htmlContent, dimensions):
  newFile = await app.vault.create(
    "adversary-card.md",
    htmlContent
  )
  canvas.addNode({
    id: generateId(),
    type: "file",
    file: newFile.path,
    x: dimensions.x,
    y: dimensions.y,
    width: dimensions.width,
    height: dimensions.height
  })
```

---

## 9. Search Controls UI Component

**What It Does**  
Reusable filter component that creates search input, tier dropdown, source dropdown, type dropdown, and clear button. Used by both adversary and environment browsers.

**How It Works**  
Config object specifies available options and callback functions. Factory method creates DOM elements and wires up event handlers. When option selected, callback fires and parent view re-renders filtered results.

**Pseudo Code**  
```
class SearchControlsUI:
  config = {}
  
  constructor(config):
    this.config = config  // callbacks: onSearchChange, onTierChange, etc.
  
  create(container):
    searchInput = container.createEl("input", { placeholder: config.placeholderText })
    tierSelect = container.createEl("select")
    sourceSelect = container.createEl("select")
    typeSelect = container.createEl("select")
    clearBtn = container.createEl("button", { text: "Clear" })
    
    searchInput.addEventListener("input", (e):
      config.onSearchChange(e.target.value)
    )
    
    tierSelect.addEventListener("change", (e):
      tier = e.target.value === "" ? null : parseInt(e.target.value)
      config.onTierChange(tier)
    )
    
    sourceSelect.addEventListener("change", (e):
      config.onSourceChange(e.target.value || null)
    )
    
    typeSelect.addEventListener("change", (e):
      config.onTypeChange(e.target.value || null)
    )
    
    clearBtn.addEventListener("click", ():
      searchInput.value = ""
      tierSelect.value = ""
      sourceSelect.value = ""
      typeSelect.value = ""
      config.onClear()
    )
    
    updateDropdownOptions(tierSelect, config.availableTiers)
    updateDropdownOptions(sourceSelect, config.availableSources)
    updateDropdownOptions(typeSelect, config.availableTypes)
  
  updateAvailableOptions(filterName, options):
    if filterName === "tiers":
      updateDropdownOptions(tierSelect, options)
    else if filterName === "sources":
      updateDropdownOptions(sourceSelect, options)
    else if filterName === "types":
      updateDropdownOptions(typeSelect, options)
```

---

## 10. Adversary Counter & Batch Operations

**What It Does**  
Multiplier counter (-, input field, +) that scales adversary insertion. Set count to 3, insert adversary = 3 copies with numbered HP/Stress rows.

**How It Works**  
Global counter state tracks current multiplier. Plus button increments, minus decrements (minimum 1), input allows direct entry. When inserting, card builder loops HP/Stress sections based on counter value. Clear filters button resets counter to 1.

**Pseudo Code**  
```
let adversaryCount = 1

function getAdversaryCount():
  return adversaryCount

function setAdversaryCount(count):
  adversaryCount = max(1, count)  // minimum 1

function incrementAdversaryCount(delta):
  adversaryCount += delta

function decrementAdversaryCount():
  adversaryCount = max(1, adversaryCount - 1)

function createCounterControls(container):
  minusBtn = container.createEl("button", { text: "-" })
  countInput = container.createEl("input", {
    type: "number",
    min: "1",
    value: adversaryCount.toString()
  })
  plusBtn = container.createEl("button", { text: "+" })
  
  minusBtn.onClick = ():
    decrementAdversaryCount()
    countInput.value = adversaryCount.toString()
  
  plusBtn.onClick = ():
    incrementAdversaryCount(1)
    countInput.value = adversaryCount.toString()
  
  countInput.addEventListener("input", ():
    value = parseInt(countInput.value) || 1
    value = max(1, value)  // enforce minimum
    setAdversaryCount(value)
  )
  
  countInput.addEventListener("blur", ():
    countInput.value = adversaryCount.toString()  // reset to valid state
  )

function buildCardHTML(values, features):
  countNum = parseInt(values.count) || 1
  
  hpStressRepeat = Array.from(range(countNum))
    .map(index =>
      `<div class="df-hp-tickboxes">
        <span>HP</span>
        ${generateCheckboxes(values.hp)}
        <span>${index + 1}</span>
      </div>
      <div class="df-stress-tickboxes">
        <span>Stress</span>
        ${generateCheckboxes(values.stress)}
      </div>`
    )
    .join("")
  
  // ... rest of card building ...
  return htmlCard
```

---

## Functions Created/Modified

### Data Management
- `DataManager.load()` - Load and migrate data
- `DataManager.addAdversary()` - Create custom adversary
- `DataManager.deleteAdversaryById()` - Delete by ID
- `DataManager.getAdversaries()` - Retrieve all
- `DataManager.updateAdversary()` - Modify existing
- `DataManager.importData()` / `exportData()` - Bulk operations

### Search System
- `SearchEngine.setItems()` - Load collection
- `SearchEngine.setFilters()` / `getFilters()` - Manage filters
- `SearchEngine.search()` - Execute multi-filter query
- `SearchEngine.getAvailableOptions()` - Extract filter options
- `SearchControlsUI.create()` - Render filter UI
- `SearchControlsUI.updateAvailableOptions()` - Update dropdowns

### Views & UI
- `AdversaryView.onOpen()` - Initialize sidebar
- `AdversaryView.loadAdversaryData()` - Load content
- `AdversaryView.createAdversaryCard()` - Build card DOM
- `AdversaryView.insertAdversaryIntoNote()` - Route insertion
- `EnvironmentView.loadEnvironmentData()` - Load environments
- `EnvironmentView.createEnvironmentCard()` - Build environment card

### Card Building & Editing
- `buildCardHTML()` - Generate card HTML
- `AdversaryEditorModal.onOpen()` - Open edit form
- `getFeatureValues()` - Extract feature data
- `addFeature()` - Add feature row to form

### Utilities
- `generateAdvUniqueId()` - Create adversary ID
- `generateEnvUniqueId()` - Create environment ID
- `isCanvasActive()` - Detect canvas view
- `createCanvasCard()` - Insert into canvas
- `getAvailableCanvasPosition()` - Calculate placement
- `getAdversaryCount()` / `setAdversaryCount()` - Counter management
- `incrementAdversaryCount()` / `decrementAdversaryCount()` - Counter operations
