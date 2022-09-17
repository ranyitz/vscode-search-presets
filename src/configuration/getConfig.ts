import * as vscode from 'vscode';
import { z } from "zod";

const preset = z.object({
    filesToInclude: z.optional(z.string()),
	filesToExclude: z.optional(z.string())
});

const customPresets = z.record(preset);

type Preset = z.infer<typeof preset>;
type CustomPresets = z.infer<typeof customPresets>;

const defaultPresets = {
    Tests: {
        "filesToInclude": ".test.*, .spec.*, .e2e.*, .driver.*"
    },
    "Source Files": {
        "filesToExclude": ".e2e.*, .spec.*, .test.*, .driver.*, .json, .md, .lock"
    },
    "package.json": {
        "filesToInclude": "package.json"
    }
};

let messageShown = false;

export const getConfig = () => {
    const workbenchConfig = vscode.workspace.getConfiguration();

    const rawConfig = workbenchConfig.get('SearchPresets');
    let presets = defaultPresets;

    if (rawConfig) {
        const result = customPresets.safeParse(rawConfig);
    
        if (!result.success) {
            const formatted = result.error.format();
            console.error('error with parsing of your config');
            console.error(formatted);
            vscode.window.showErrorMessage(`error with parsing SearchPresets config\n\n${JSON.stringify(formatted)}`);
        }
    } else {
        if(!messageShown) {
            vscode.window.showWarningMessage(`You need to add an object named "SearchPresets" to your settings.json`);
            messageShown = true;
        } 
    }

    return {
        presets,
    };
};

