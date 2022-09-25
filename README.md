<p align="center">
  <img width="250px" src="https://user-images.githubusercontent.com/11733036/191082260-cb3820c5-b335-4ead-bf8f-31db8d68b278.png" alt="search-presets-logo"/>
</p>

# VSCode Search Presets

> vscode extension to configure search presets

Sometimes you want to search through a specific set of files, you can use vscode's search include/exclude configurations to filter the results.
There are some common workflows that are repeated throughout your day, like searching only test files, only source files, only `package.json` files, etc.
This extension lets you configure presets which configure your search by typing a single command.

![search presets](https://user-images.githubusercontent.com/11733036/192136766-f8003514-d027-4083-94d8-5252546d8554.gif)

## Installation

[Click Here](https://marketplace.visualstudio.com/items?itemName=ranyitz.search-presets)

## How to use it?

Use the command palette and type `Search Presets` Or use one of the shortcuts:

- Windows: `shift + alt + f`
- Mac: `option + alt + f`

## How does it know what query to take?
It will resolve the query in the following order

* A query which is configured for the preset.
* Highlighted text in VSCode.
* Clipboard text
* Empty query

> Unfortunatly at the moment, [there is no API for reading the current query in the search widget]([url](https://github.com/microsoft/vscode/issues/152301#issuecomment-1250070003))

## Extension Settings

#### filesToInclude

Files to include in the search

#### filesToExclude

Files to exclude from the search

#### isCaseSensitive

Match Case (Aa)

#### matchWholeWord

Match Whole Word (_ab_)

#### isRegex

Use Regular Expressions (.\*)

#### triggerSearch

Trigger search after selecting a preset

#### query

Enforce a specific search query

### Custom Preset Configuration

> null means that the preset will not override the existing search configuration

```
"search-presets.custom": {
    [PresetName]": {
        "filesToInclude": string | null,
        "filesToExclude": string | null,
        "isCaseSensitive": boolean | null,
        "matchWholeWord": boolean | null,
        "isRegex": boolean | null,
        "triggerSearch": boolean | null,
        "query": string | null
    }
}
```

### Global Configurations

> Apply as defaults for all preset configurations

```
"search-presets.isCaseSensitive": boolean | null,
"search-presets.matchWholeWord": boolean | null,
"search-presets.isRegex": boolean | null,
"search-presets.triggerSearch": boolean | null
```

## Default presets

> If you don't configure anything, this are the presets you'll get

```json
"search-presets": {
    "Tests": {
      "filesToInclude": ".test.*, .spec.*, .e2e.*, .driver.*"
    },
    "Source Files": {
      "filesToExclude": "*.test.js, *.driver.*, *.json"
    },
    "package.json": {
        "filesToInclude": "package.json"
    }
}
```
