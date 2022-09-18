import * as vscode from "vscode";
import { getPresets } from "./presets";

export const getConfig = (context: vscode.ExtensionContext) => {
  return {
    presets: getPresets(context),
  };
};
