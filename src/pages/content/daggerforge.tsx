const whatIsDaggerforge = (
    <>
      <h2 className="rightSideSection__h2">What is Daggerforge?</h2>
      <p className="rightSideSection__p">
        Daggerforge is an Obsidian plugin for Daggerheart a table top role playing game.
        that lets Dungeon Masters browse, build, and insert fully interactive Daggerheart encounter 
        content right into their notes. It gives Dungeon Masters searchable adversaries and environments, 
        a card generator with automatic HP/Stress trackers, a custom data system for saving 
        their own creations, a draggable dice roller, an encounter calculator, and seamless 
        canvas/markdown integration, basically everything a Dungeon Master needs to prep and run fast, 
        balanced encounters without leaving Obsidian.
    </p>
    </>
  );

    const AdversaryBrowser = (
    <>
      <h2 className="rightSideSection__h2">Adversary Browser</h2>
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        A sidebar panel that displays adversary cards with 
        real-time multi-filter search. Filter by name, tier level (1-4), 
        type (Bruiser, Horde, Solo, etc.), or content source. Click any 
        result to insert it into your note or canvas.
    </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        Search engine maintains current filters 
        and searches across loaded adversaries. When you adjust any filter (name, tier, type, source), 
        it instantly re-queries the data and re-renders results. Built-in JSON data and 
        custom user-created adversaries are merged and displayed together.
    </p>
        {/* <h3 className="rightSideSection__h3">Pseudo Code</h3>
        <pre className="rightSideSection__pseudoCode">
        {`.ts

WIP
        `}
        </pre> */}
    </>
  );

    const CardBuilderandHTMLGenerator = (
    <>
    <h2 className="rightSideSection__h2">Card Builder</h2>
    <h3 className="rightSideSection__h3">What It Does</h3>
    <p className="rightSideSection__p">
        Converts data into styled HTML cards that 
        render directly in your notes. Cards include interactive HP/Stress checkboxes, weapon stats, 
        features, and visual badges showing difficulty and content source.
    </p>
    <h3 className="rightSideSection__h3">How It Works</h3>
    <p className="rightSideSection__p">
        Takes raw data (name, HP value, difficulty, features array, etc.) 
        and builds an HTML string. For each HP point, creates a checkbox. 
        Repeats the entire HP/Stress section based on adversary count. 
        Maps feature objects into formatted divs with names, types, 
        costs, and descriptions.
    </p>
      {/* <h3 className="rightSideSection__h3">Pseudo Code</h3>
      <pre className="rightSideSection__pseudoCode">
      {`.ts

WIP
      `}
      </pre> */}
    </>
  )

    const UniqueIDandDataPersistence = (
    <>
    <h2 className="rightSideSection__h2">Unique ID & Data Persistence</h2>
    <h3 className="rightSideSection__h3">What It Does</h3>
    <p className="rightSideSection__p">
        Every custom adversary and environment gets a 
        unique identifier (CUA_timestamp_random). 
        Stored in plugin's data.json file. 
        Enables reliable deletion, editing, and prevents data duplication across sessions.
    </p>
    <h3 className="rightSideSection__h3">How It Works</h3>
    <p className="rightSideSection__p">
        {`When creating custom content, generate ID: CUA_\${Date.now()}_\${randomString}.
         DataManager loads all stored data from .obsidian/plugins/daggerforge/data.json. 
         Delete by ID: find index matching ID, remove from array, save. 
         Update same way: find by ID, replace in notes, duplicate with a unique ID, save.`}
    </p>
      {/* <h3 className="rightSideSection__h3">Pseudo Code</h3>
      <pre className="rightSideSection__pseudoCode">
      {`.ts

WIP
      `}
      </pre> */}
    </>
  )

    const DiceRoller = (
    <>
    <h2 className="rightSideSection__h2">Dice Roller</h2>
    <h3 className="rightSideSection__h3">What It Does</h3>
    <p className="rightSideSection__p">
        Draggable floating panel for rolling multiple dice.
        Select dice (d4, d6, d20, etc.), set quantity, queue them up, roll all at once. 
        Results display in persistent log showing expression and total.
    </p>
    <h3 className="rightSideSection__h3">How It Works</h3>
    <p className="rightSideSection__p">
        Click dice buttons to add to queue (e.g., "2d6", "1d20"). 
        Click "Roll All" to evaluate expression. Drag header to move window around. 
        Results appear in log below. Each log entry shows the full expression and breakdown.</p>
      {/* <h3 className="rightSideSection__h3">Pseudo Code</h3>
      <pre className="rightSideSection__pseudoCode">
      {`.ts

WIP
      `}
      </pre> */}
    </>
  )

    const EncounterCalculator = (
    <>
    <h2 className="rightSideSection__h2">Encounter Calculator</h2>
    <h3 className="rightSideSection__h3">What It Does</h3>
    <p className="rightSideSection__p">
        Calculate Battle Points for balanced encounters. Enter player count,
        adjust BP based on conditions (more difficult +2, special rules -1, etc.), 
        then "spend" BP by adding adversaries. Real-time balance tracking.</p>
    <h3 className="rightSideSection__h3">How It Works</h3>
    <p className="rightSideSection__p">
        Base BP formula from the book: 3 × playerCount + 2. 
        Buttons add/subtract adjustments (each shows reason). Separate buttons "spend" BP 
        by adding adversary types (Minion costs 1 BP, Solo costs 5 BP, etc.). UI shows total 
        adjustments, total spent, and remaining BP in real-time.</p>
      {/* <h3 className="rightSideSection__h3">Pseudo Code</h3>
      <pre className="rightSideSection__pseudoCode">
      {`.ts

WIP
      `}
      </pre> */}
    </>
  )

    const EnvironmentBrowser = (
    <>
    <h2 className="rightSideSection__h2">Environment Browser</h2>
    <h3 className="rightSideSection__h3">What It Does</h3>
    <p className="rightSideSection__p">
        Parallel to adversary browser. Display environments 
        (locations, scenes) with searchable filters. Environments include features 
        with bullets, questions for players, and impulse prompts. Insert as cards 
        into notes or canvas.</p>
    <h3 className="rightSideSection__h3">How It Works</h3>
    <p className="rightSideSection__p">
        Same filter system as adversaries 
        (name, tier, type, source). Click environment to insert rich HTML card 
        showing name, description, impulse, difficulty, and formatted features 
        with bullets and player questions.</p>
        {/* <h3 className="rightSideSection__h3">Pseudo Code</h3>
        <pre className="rightSideSection__pseudoCode">
        {`.ts

WIP
        `}
        </pre> */}
    </>
  );

    const CardEditor = (
    <>
    <h2 className="rightSideSection__h2">Card Editor</h2>
    <h3 className="rightSideSection__h3">What It Does</h3>
    <p className="rightSideSection__p">
        Edit adversary or environment cards in-place. 
        Opens form with pre-populated values. Modify any field (name, HP, features, etc.), 
        click "Update Card" to replace original card without leaving note.</p>
    <h3 className="rightSideSection__h3">How It Works</h3>
    <p className="rightSideSection__p">
        When user clicks edit button on card, modal opens 
        showing all current values. Form has inputs for basic stats, textarea for 
        description, feature rows that can be added/removed. Submit generates new 
        HTML and replaces card via editor.</p>
        {/* <h3 className="rightSideSection__h3">Pseudo Code</h3>
        <pre className="rightSideSection__pseudoCode">
        {`.ts

WIP
        `}
        </pre> */}
    </>
  );

    const CanvasIntegration = (
    <>
    <h2 className="rightSideSection__h2">Canvas Integration</h2>
    <h3 className="rightSideSection__h3">What It Does</h3>
    <p className="rightSideSection__p">
        Detect whether user has canvas (visual note layout) or markdown view open. 
        Insert cards into canvas as draggable blocks or into markdown as inline HTML.
    </p>
    <h3 className="rightSideSection__h3">How It Works</h3>
    <p className="rightSideSection__p">
        Check active view type: if CanvasView, create new file with card HTML,
        add to canvas at calculated position. If MarkdownView, insert HTML at editor position. 
        If neither, show error notice.
    </p>
        {/* <h3 className="rightSideSection__h3">Pseudo Code</h3>
        <pre className="rightSideSection__pseudoCode">
        {`.ts

WIP
    `}
        </pre> */}
    </>
  );

const featureBreakdown = (
    <>
      <h1 className="rightSideSection__h1">Feature Breakdown</h1>
      {AdversaryBrowser}
      {EnvironmentBrowser}
      {CardBuilderandHTMLGenerator}
      {UniqueIDandDataPersistence}
      {DiceRoller}
      {EncounterCalculator}
      {CardEditor}
      {CanvasIntegration}
    </>
  );
export const daggerforgeContent = (
    <>
      <h1 className="rightSide__h">Daggerforge</h1>
      {whatIsDaggerforge}
      {featureBreakdown}
    </>
  );
