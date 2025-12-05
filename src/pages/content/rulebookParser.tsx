import { CollapsibleSection } from "../../utils/pageContext";

const whatIsRulebookParser = (
  <>
    <h2 className="rightSideSection__h2">What is Daggerheart Rulebook Parser?</h2>
    <p className="rightSideSection__p">
      A command-line tool written in Go that parses plain-text rulebook data and converts it 
      into structured JSON. It automatically extracts adversaries (monsters) and environments 
      (locations) from formatted text files, assigns unique identifiers, and outputs 
      production-ready JSON. Designed to handle the Daggerheart TTRPG rulebook format with 
      support for versioning and automated ID generation across multiple sources.
    </p>
  </>
);

const InteractiveCLI = (
  <>
    <CollapsibleSection title="Interactive CLI">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Terminal interface that guides users through parsing configuration step-by-step. 
        Users select parsing mode (Environments or Adversaries), choose input file from available options, 
        specify source/version name, and execute the parser with all settings collected.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        Displays colored menu prompts using ANSI escape codes (cyan, green, yellow, red, blue). 
        Scans input directory for files matching prefix (env or adv). Recursively validates user 
        input and re-prompts on invalid choices. Builds config struct and routes to appropriate 
        parser function based on selected mode.
      </p>
    </CollapsibleSection>
  </>
);

const AdversaryParser = (
  <>
    <CollapsibleSection title="Adversary Parser">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Converts plain-text adversary blocks into structured JSON. Extracts name, tier, type, 
        description, motives, difficulty, thresholds (major/severe), HP, Stress, ATK stats, 
        weapon details, XP value, and all features with their types and costs.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        Reads input file and splits text into individual monster blocks by detecting uppercase 
        headers. Cleans and normalizes lines. Uses regex patterns to extract stat blocks 
        (Difficulty | Thresholds | HP | Stress), ATK line (ATK | Weapon : Range | Damage), 
        and description sections. Parses features by matching "Name - Type: Description" patterns. 
        Handles multi-line feature descriptions. Assigns unique ID to each adversary and marshals 
        to pretty-printed JSON.
      </p>
    </CollapsibleSection>
  </>
);

const EnvironmentParser = (
  <>
    <CollapsibleSection title="Environment Parser">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Parses location and scene data from plain-text rulebook format into structured JSON. 
        Extracts environment names, tiers, types, descriptions, impulses, difficulty ratings, 
        potential adversaries, and all features with bullets and player questions.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        Reads file line-by-line and detects environment headers using uppercase regex pattern. 
        Groups lines into environment blocks. For each block, parses header line, extracts 
        basic metadata, identifies feature sections by type (Description, Feature, Impulse, Difficulty). 
        Captures bulleted lists and player questions. Supports multi-part descriptions. 
        Builds Environment struct with nested envFeature objects and outputs as JSON.
      </p>
    </CollapsibleSection>
  </>
);

const FeatureParser = (
  <>
    <CollapsibleSection title="Feature Parser">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Extracts feature metadata from both adversary and environment feature blocks. 
        Parses feature name, type (Action/Reaction/Passive), cost (if any), and multi-line descriptions. 
        Handles continuation lines that span multiple rows.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        Uses regex to match pattern: "FeatureName - Type: Description". Detects costs like 
        "Mark a Stress" or "Spend a Fear" at description start. Tracks current feature state. 
        When continuation lines appear (non-matching lines), appends them to the feature description. 
        Returns array of complete feature objects with all fields populated.
      </p>
    </CollapsibleSection>
  </>
);

const IDGeneration = (
  <>
    <CollapsibleSection title="Unique ID Generation">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Automatically assigns unique identifiers to parsed entities. Each adversary and environment 
        receives an ID like [CA001], [IA001], [CE001], [IE001] (Category-Source-Number format). 
        Persists counter state across sessions to prevent duplicate IDs.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        IDGenerator maintains separate counters per source and entity type. When parsing begins, 
        increments counter for each entity. Formats ID as: [Category][Source][Number]. 
        Category codes: CA (Custom Adversary), IA (Import Adversary), CE (Custom Environment), 
        IE (Import Environment). Saves counter state to JSON file after parse completes, 
        allowing subsequent runs to continue numbering correctly.
      </p>
    </CollapsibleSection>
  </>
);

const BlockSplitting = (
  <>
    <CollapsibleSection title="Block Detection & Splitting">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Intelligently segments input file into individual entity blocks (adversaries or environments). 
        Uses uppercase header detection to identify block boundaries and filters out incomplete blocks.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p">
        Scans all lines and matches headers against uppercase regex pattern (`^[A-Z0-9\\s'\\-:]+$`). 
        When header detected, saves current block and starts new one. Filters out blocks with fewer 
        than 3-4 lines (incomplete data). For environments, also matches commas and parentheses in headers. 
        Returns array of complete, validated blocks ready for individual parsing.
      </p>
    </CollapsibleSection>
  </>
);

const FileHandling = (
  <>
    <CollapsibleSection title="File I/O & Configuration">
      <h3 className="rightSideSection__h3">What It Does</h3>
      <p className="rightSideSection__p">
        Manages reading input files and writing output JSON. Auto-generates output filename 
        based on source name and mode. Extracts tier information from input filename and applies 
        config settings to entire parsing job.
      </p>
      <h3 className="rightSideSection__h3">How It Works</h3>
      <p className="rightSideSection__p_end">
        Reads input file as text. Extracts tier from filename by scanning for first digit. 
        Builds Config struct with Mode, Tier, Source, InputFile, OutputFile. Output path 
        constructed as `output/[env|adv][Source].json`. Uses JSON marshaling with indentation 
        for readability. Writes file with standard permissions (0644). All errors logged with 
        color-coded CLI output.
      </p>
    </CollapsibleSection>
  </>
);

const featureBreakdown = (
  <>
    <h1 className="rightSideSection__h1">Features</h1>
    {InteractiveCLI}
    {AdversaryParser}
    {EnvironmentParser}
    {FeatureParser}
    {IDGeneration}
    {BlockSplitting}
    {FileHandling}
  </>
);

export const rulebookParserContent = (
  <>
    <h1 className="rightSide__h">Daggerheart Rulebook Parser</h1>
    {whatIsRulebookParser}
    {featureBreakdown}
  </>
);
