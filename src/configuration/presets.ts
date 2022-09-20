import * as vscode from "vscode";
import { z } from "zod";
import {
  NO_CONFIG_KEY_WARNING,
  CUSTOM_PRESETS_CONFIG_KEY,
  CONFIG_SECTION_KEY,
} from "../consts";
import defaultPresets from "./defaultPresets.json";
import { isEmpty } from "lodash";

const preset = z.object({
  filesToInclude: z.optional(z.string()),
  filesToExclude: z.optional(z.string()),
  query: z.optional(z.string()),
  triggerSearch: z.optional(z.boolean()),
  isRegex: z.optional(z.boolean()),
  isCaseSensitive: z.optional(z.boolean()),
  matchWholeWord: z.optional(z.boolean()),
});

const searchPresets = z.record(preset);

export type Preset = z.infer<typeof preset>;
export type SearchPresets = z.infer<typeof searchPresets>;

export const getPresets = (context: vscode.ExtensionContext): SearchPresets => {
  const workbenchConfig = vscode.workspace.getConfiguration(CONFIG_SECTION_KEY);
  const hasConfigurationKey = !isEmpty(
    workbenchConfig.get(CUSTOM_PRESETS_CONFIG_KEY)
  );

  if (!hasConfigurationKey) {
    if (!context.workspaceState.get(NO_CONFIG_KEY_WARNING)) {
      vscode.window
        .showInformationMessage(
          `You need to add '${CONFIG_SECTION_KEY}.${CUSTOM_PRESETS_CONFIG_KEY}' to your settings.json, do you want to set it up with extension defaults?`,
          "yes",
          "no"
        )
        .then((shouldUpdateConfig) => {
          if (shouldUpdateConfig === "yes") {
            workbenchConfig.update(
              CUSTOM_PRESETS_CONFIG_KEY,
              defaultPresets,
              vscode.ConfigurationTarget.Workspace
            );
          }
        });

      context.workspaceState.update(NO_CONFIG_KEY_WARNING, true);
    }

    return defaultPresets;
  }

  const rawConfig = workbenchConfig.get(CUSTOM_PRESETS_CONFIG_KEY);

  const result = searchPresets.safeParse(rawConfig);

  if (!result.success) {
    const formatted = result.error.format();

    vscode.window.showErrorMessage(
      `error with parsing SearchPresets config\n\n${JSON.stringify(formatted)}`
    );

    return defaultPresets;
  }

  return result.data;
};
