import * as vscode from "vscode";
import { createSearchCommand } from "./commands/search";
import { SEARCH_COMMAND_KEY, CREATE_PRESET_COMMAND_KEY } from "./consts";
import { createCreatePresetCommand } from "./commands/createPreset";

export function activate(context: vscode.ExtensionContext) {
  const searchCommand = vscode.commands.registerCommand(
    SEARCH_COMMAND_KEY,
    createSearchCommand(context)
  );

  const createPresetCommand = vscode.commands.registerCommand(
    CREATE_PRESET_COMMAND_KEY,
    createCreatePresetCommand(context)
  );

  context.subscriptions.push(searchCommand, createPresetCommand);
}
