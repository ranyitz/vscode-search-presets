import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { CONFIG_SECTION_KEY, CUSTOM_PRESETS_CONFIG_KEY } from "../consts";

export const createCreatePresetCommand = (context: vscode.ExtensionContext) => {
  return async () => {
    const panel = vscode.window.createWebviewPanel(
      "createSearchPreset",
      "Create Search Preset",
      vscode.ViewColumn.One,
      {
        enableScripts: true,
      }
    );

    const htmlFilePath = path.join(
      context.extensionPath,
      "media",
      "createPreset.html"
    );

    let htmlContent = fs.readFileSync(htmlFilePath, "utf8");

    const webviewUri = panel.webview.asWebviewUri(
      vscode.Uri.file(htmlFilePath)
    );
    htmlContent = htmlContent.replace(/{{webviewUri}}/g, webviewUri.toString());

    panel.webview.html = htmlContent;

    panel.webview.onDidReceiveMessage(
      async (message) => {
        if (message.command === "savePreset") {
          const {
            presetName,
            query,
            filesToInclude,
            filesToExclude,
            isCaseSensitive,
            isRegex,
            matchWholeWord,
          } = message.data;

          if (!presetName) {
            vscode.window.showErrorMessage("Preset name is required.");
            return;
          }

          const workbenchConfig =
            vscode.workspace.getConfiguration(CONFIG_SECTION_KEY);

          const customPresets =
            workbenchConfig?.get<Record<string, any>>(
              CUSTOM_PRESETS_CONFIG_KEY
            ) || {};

          // TODO - implement an existing preset with the same name already exists" are you sure you want to overwrite it?
          customPresets[presetName] = {
            query,
            filesToInclude,
            filesToExclude,
            isCaseSensitive: isCaseSensitive ? true : undefined,
            isRegex: isRegex ? true : undefined,
            matchWholeWord: matchWholeWord ? true : undefined,
          };

          workbenchConfig.update(
            CUSTOM_PRESETS_CONFIG_KEY,
            customPresets,
            vscode.ConfigurationTarget.Global
          );

          vscode.window.showInformationMessage(
            `Preset "${presetName}" has been added successfully!`
          );

          vscode.commands.executeCommand("workbench.action.openSettingsJson");

          panel.dispose();
        }
      },
      undefined,
      context.subscriptions
    );
  };
};
