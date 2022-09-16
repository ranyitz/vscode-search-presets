// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

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
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	let disposable = vscode.commands.registerCommand('search-presets.search', async () => {
		const workbenchConfig = vscode.workspace.getConfiguration();

		const presets = workbenchConfig.get('search-presets');
		// TODO: validate presets
		
		// TODO: if there is an existing query - reuse it!
		const searchConfig: Partial<IFindInFilesArgs> = {
			query: '',
			triggerSearch: false,
			filesToExclude: '',
			filesToInclude: '',
		};

		const presetNames = Object.keys(presets as Object);

		vscode.window.showQuickPick(presetNames).then(selectedPresetName => {
			// the user canceled the selection
			if (!selectedPresetName) {
			  return;
			}
		  
			const selectedPreset = (presets as any)[selectedPresetName];

			vscode.commands.executeCommand('workbench.action.findInFiles', {...searchConfig, ...selectedPreset});
		  });
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
