import * as vscode from 'vscode';
import { getConfig } from './configuration/getConfig';

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

export interface IFindInFilesArgs {
	query?: string;
	replace?: string;
	triggerSearch?: boolean;
	filesToInclude?: string;
	filesToExclude?: string;
	isRegex?: boolean;
	isCaseSensitive?: boolean;
	matchWholeWord?: boolean;
}

export function activate(context: vscode.ExtensionContext) {	
	let searchCommand = vscode.commands.registerCommand('SearchPresets.search', async () => {
		const config = getConfig();
		const presets = config.presets;
		const presetNames = Object.keys(presets as Object);

		const defaultConfig: Partial<IFindInFilesArgs> = {
			query: '',
			triggerSearch: false,
			filesToExclude: '',
			filesToInclude: '',
		};
		
		vscode.window.showQuickPick(presetNames).then(selectedPresetName => {
			// the user canceled the selection
			if (!selectedPresetName) {
			  return;
			}
		  
			const selectedPreset = (presets as any)[selectedPresetName];

			vscode.commands.executeCommand('workbench.action.findInFiles', { ...defaultConfig, ...selectedPreset });
		  });
	});

	context.subscriptions.push(searchCommand);
}

// this method is called when your extension is deactivated
export function deactivate() {}
