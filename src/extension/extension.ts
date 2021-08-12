import * as vscode from 'vscode';
import ContentProvider from './ContentProvider';
import { startApiServer } from './api';
import { join } from 'path';
const getPort = require('get-port');

let isServerRunning = false;
let port = 0;

export function activate(context: vscode.ExtensionContext) {
    initialize(context);
}

export function deactivate() {}

async function initialize(context: vscode.ExtensionContext) {
    if (vscode.workspace.rootPath) {
        process.env.projectRoot = vscode.workspace.rootPath;
    }

    if (!isServerRunning) {
        port = await getPort({ port: 4545 });
        await startApiServer(port, context);
        isServerRunning = true;
    }

    const provider = new WaypointViewProvider();
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            WaypointViewProvider.viewType,
            provider
        )
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('paper.copyRange', () => {
            if (vscode.window.activeTextEditor?.selection.start) {
                const selectionRange = new vscode.Range(
                    vscode.window.activeTextEditor?.selection.start,
                    vscode.window.activeTextEditor?.selection.end
                );
                const text = vscode.window.activeTextEditor?.document.getText(
                    selectionRange
                );

                const fullTxt = `${text}|${vscode.window.activeTextEditor?.document.fileName}|${selectionRange.start.line}|${selectionRange.start.character}|${selectionRange.end.line}|${selectionRange.end.character}`;
                vscode.env.clipboard.writeText(fullTxt);
            }
        })
    );
}

class WaypointViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'paper';

    private _view?: vscode.WebviewView;

    constructor() {}

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken
    ) {
        this._view = webviewView;

        webviewView.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,
        };

        const contentProvider = new ContentProvider();
        webviewView.webview.html = contentProvider.getContent(port);
    }
}
