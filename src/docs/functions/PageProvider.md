# Component: PageProvider

## What it does

Provides page navigation state to all child components throughout the portfolio application. Acts as the central state management system for page routing and project selection, making this state accessible to any component in the tree without prop drilling.

## How it works

<div class="text">
Creates a React Context that wraps the entire application. Uses useState hooks to manage two pieces of state: the current page (aboutMe, projects, or skills) and the currently selected project ID. These state values and their setter functions are provided through the Context Provider, making them available to any child component via the usePage hook. The component also wraps children in the App and layout divs to maintain consistent structure.
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
FUNCTION PageProvider(children):
  CREATE state: page = "aboutMe"
  CREATE state: selectedProject = ""

  CREATE context_value = {
    page: page,
    setPage: function to update page,
    selectedProject: selectedProject,
    setSelectedProject: function to update selectedProject
  }

  RETURN:
    <PageContext.Provider value={context_value}>
      <div className="App">
        <div className="layout">
          {render children here}
        </div>
      </div>
    </PageContext.Provider>
```

## For beginners

Think of PageProvider as a "control tower" for your entire portfolio website. Just like a control tower at an airport keeps track of which planes are where, PageProvider keeps track of which page you're on and which project you're looking at. Instead of passing this information down through every single component (which would be messy), it broadcasts this information so any component can just "tune in" and get the current page or project information whenever it needs it. It's like having a radio station that all components can listen to!
