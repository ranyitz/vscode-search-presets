# vscode SearchPresets 🔍

> vscode extension to configure search presets

Sometimes you want to search through specific set of files, you can use vscode's search include/exclude configurations to filter the results.

There are some common workflows that are repeted through your day, like searcing only test files, only source files, only `package.json` files etc.

This extension let you configure presets which configures your search by typing a single command.

![search-presets](https://user-images.githubusercontent.com/11733036/190897640-1f961c10-43e5-4ed7-8552-5c6e377f9483.gif)

## Installation

[Click Here](https://marketplace.visualstudio.com/items?itemName=ranyitz.search-presets)

## How to use?

Use the command pallete and type `Search Presets` Or use one of the shortcuts:

- Windows: `shift + alt + f`
- Mac: `option + alt + f`

## Extension Settings

This extension contributes the following settings:

- `search-presets`: your custom presets configuration

```
// settings.json

"search-presets": {
    [PresetName]": {
        "filesToInclude": String
        "filesToExclude": String
    },
},
```

## Default config

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
},
```

## Preset ideas

```json
{
  "Tests": {
    "filesToInclude": ".test.*, .spec.*, .e2e.*, .driver.*"
  },
  "Source Files": {
    "filesToExclude": "*.test.js, *.driver.*, *.json"
  },
  "package.json": {
    "filesToInclude": "package.json"
  },
  "Lock File": {
    "filesToInclude": "yarn.lock"
  }
}
```
