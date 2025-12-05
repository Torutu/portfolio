# Component: CollapsibleSection

## What it does
Creates an interactive accordion-style UI component that can expand and collapse to show or hide content. Used throughout the Daggerforge project page to organize feature descriptions in a clean, space-efficient way. Each section has a clickable header that toggles the visibility of its content.

## How it works
<div class="text">
Uses React's useState hook to track whether the section is open or closed (boolean state). When the user clicks the button in the header, it toggles this state between true and false. The arrow icon changes direction based on the state (▼ when closed, ▲ when open). The children content only renders when the open state is true, using conditional rendering. This creates the expanding/collapsing effect without any complex animations - just showing or hiding content based on state.
</div>

**CSS for "How it works" section:**
```css
.text {
  color: red;
  font-family: Papyrus, fantasy;
}
```

## Pseudo code
```
FUNCTION CollapsibleSection(title, children):
  CREATE state: open = false
  
  RETURN:
    <div className="collapsibleSection">
      <button onClick={() => toggle open state}>
        IF open is true:
          SHOW arrow pointing up (▲)
        ELSE:
          SHOW arrow pointing down (▼)
        SHOW title text
      </button>
      
      IF open is true:
        <div className="collapsibleContent">
          RENDER children content
        </div>
    </div>
```

## For beginners
Imagine a CollapsibleSection like an accordion folder or those expandable file folders you might use in school or an office. When it's closed, you just see the title label on the tab. When you click on it, it opens up to show all the papers (content) inside. Click it again, and it folds back up to save space. This is perfect for organizing lots of information on a webpage - you can have many sections that people can open one at a time to read what they're interested in, without overwhelming them with a giant wall of text all at once. It's like having organized drawers instead of everything scattered on a desk!
