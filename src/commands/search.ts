import * as vscode from "vscode";
import { getConfig } from "../configuration/getConfig";
import { Preset } from "../configuration/presets";
import { FIND_IN_FILES_COMMAND_KEY } from "../consts";

interface IFindInFilesArgs {
  query?: string;
  replace?: string;
  triggerSearch?: boolean;
  filesToInclude?: string;
  filesToExclude?: string;
  isRegex?: boolean;
  isCaseSensitive?: boolean;
  matchWholeWord?: boolean;
}

const findInFiles = (customPreset: Preset) => {
  const defaults: Partial<IFindInFilesArgs> = {
    query: "",
    triggerSearch: false,
    filesToExclude: "",
    filesToInclude: "",
  };

  vscode.commands.executeCommand(FIND_IN_FILES_COMMAND_KEY, {
    ...defaults,
    ...customPreset,
  });
};

export const createSearchCommand = (context: vscode.ExtensionContext) => {
  return async () => {
    const config = getConfig(context);
    const presets = config.presets;
    const presetNames = Object.keys(presets as Object);

    const selectedPresetName = await vscode.window.showQuickPick(presetNames);

    // the user canceled the selection
    if (!selectedPresetName) {
      return;
    }

    const selectedPreset = presets[selectedPresetName];

    void findInFiles(selectedPreset);
  };
};

// const searchEditor = () => {
// let success = await vscode.commands.executeCommand('search.action.openEditor', searchConfig);
// type SearchConfiguration = {
// 	query: string,
// 	includes: string,
// 	excludes: string,
// 	contextLines: number,
// 	wholeWord: boolean,
// 	caseSensitive: boolean,
// 	regexp: boolean,
// 	useIgnores: boolean,
// 	showIncludesExcludes: boolean,
// };
// };
