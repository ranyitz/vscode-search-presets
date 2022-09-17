# SearchPresets 🔍

Sometimes you want to search through specific set of files, you can use vscode's search include/exclude configurations to filter the results.

There are some common workflows that are repeted through your day, like searcing only test files, only source files, only `package.json` files etc.

This extension let you configure presets which configures your search by typing a single command.

## How to use?

Use the command pallete (`cmd+shift+p`) to use one of your search presets. Type:
```
SearchPresets
```

And choose the preset to use.
## Extension Settings

This extension contributes the following settings:
* `SearchPresets`: your custom presets configuration
```json
"SearchPresets": {
    [PresetName]": {
        "filesToInclude": String
        "filesToExclude": String
    },
}, 
```

### Example default config

```json
"SearchPresets": {
    "English Translations": {
      "filesToInclude": "*_en.json"
    },
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