import * as vscode from "vscode";
import { createSearchCommand } from "./commands/search";
import { COMMAND_KEY } from "./consts";

export function activate(context: vscode.ExtensionContext) {
  let searchCommand = vscode.commands.registerCommand(
    COMMAND_KEY,
    createSearchCommand(context)
  );

  context.subscriptions.push(searchCommand);
}