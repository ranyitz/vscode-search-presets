import * as vscode from "vscode";
import { CONFIG_SECTION_KEY } from "../consts";
import { getPresets, Preset, SearchPresets } from "./presets";

export type Config = {
  presets: SearchPresets;
  globalPreset: Preset;
};

const useConfigOption = (field: string) => {
  const workbenchConfig = vscode.workspace.getConfiguration(CONFIG_SECTION_KEY);
  const value = workbenchConfig.get(field);

  if (value !== null && value !== undefined) {
    return { [field]: value };
  }

  return undefined;
};

export const getConfig = (context: vscode.ExtensionContext): Config => {
  return {
    presets: getPresets(context),
    globalPreset: {
      ...useConfigOption("filesToExclude"),
      ...useConfigOption("filesToInclude"),
      ...useConfigOption("isCaseSensitive"),
      ...useConfigOption("isRegex"),
      ...useConfigOption("matchWholeWord"),
    },
  };
};
