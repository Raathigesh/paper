import * as express from 'express';
import * as vscode from 'vscode';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as dirTree from 'directory-tree';

import { initializeStaticRoutes } from './static-files';
import { isAbsolute, join } from 'path';

export async function startApiServer(
    port: number,
    context: vscode.ExtensionContext
) {
    const app = express();
    app.use(bodyParser());
    app.use(cors());
    initializeStaticRoutes(app, port);

    app.post('/open-file', (req, res) => {
        const path = req.body.filePath;
        const fullPath = isAbsolute(path)
            ? path
            : join(vscode.workspace.rootPath || '', path);

        let selection = undefined;
        if (req.body.selection) {
            selection = new vscode.Selection(
                new vscode.Position(
                    req.body.selection.start.line,
                    req.body.selection.start.column
                ),
                new vscode.Position(
                    req.body.selection.end.line,
                    req.body.selection.end.column
                )
            );
        }

        vscode.window.showTextDocument(vscode.Uri.file(fullPath), {
            selection,
        });

        res.send('OK');
    });

    app.get('/content', (req, res) => {
        const content = context.workspaceState.get('paper-content');
        res.send(content);
    });

    app.post('/content', (req, res) => {
        const content = req.body.content;
        context.workspaceState.update('paper-content', content);
        res.send('OK');
    });

    app.post('/tree', (req, res) => {
        const tree = dirTree(req.body.directoryPath);
        res.json(tree);
    });

    app.get('/events', async function(req, res) {
        res.set({
            'Cache-Control': 'no-cache',
            'Content-Type': 'text/event-stream',
            Connection: 'keep-alive',
        });
        res.flushHeaders();

        // Tell the client to retry every 10 seconds if connectivity is lost
        res.write('retry: 10000\n\n');

        vscode.window.onDidChangeActiveTextEditor(event => {
            if (event) {
                res.write(
                    `data: ${JSON.stringify({
                        activeEditor: event?.document.fileName,
                    })}\n\n`
                );
            }
        });
    });

    return new Promise((resolve, reject) => {
        app.listen(port, () => {
            const url = `http://localhost:${port}`;
            console.log(`⚡  Insight is running at ${url} `);
            resolve(null);
        });
    });
}
