import * as vscode from "vscode";
import { Config, getConfig } from "../configuration/getConfig";
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

const getHighlightedText = (): string | null => {
  const editor = vscode.window.activeTextEditor;
  const selection = editor?.selection;

  if (selection && !selection.isEmpty) {
    const selectionRange = new vscode.Range(
      selection.start.line,
      selection.start.character,
      selection.end.line,
      selection.end.character
    );
    const highlighted = editor.document.getText(selectionRange);
    return highlighted;
  }

  return null;
};

const getClipboardData = async (): Promise<string> =>
  vscode.env.clipboard.readText();

const getQuery = async () => {
  const highlightedText = getHighlightedText();

  if (highlightedText) {
    return highlightedText;
  }

  const clipboardData = await getClipboardData();

  if (clipboardData) {
    return clipboardData;
  }

  return "";
};

const findInFiles = async (config: Config, selectedPreset: Preset) => {
  const query = await getQuery();
  const defaults: Partial<IFindInFilesArgs> = {
    query,
    triggerSearch: !!query,
    filesToExclude: "",
    filesToInclude: "",
  };

  const findInFilesArgs = {
    ...defaults,
    ...config.globalPreset,
    ...selectedPreset,
  };

  vscode.commands.executeCommand(FIND_IN_FILES_COMMAND_KEY, findInFilesArgs);
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

    void findInFiles(config, selectedPreset);
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
