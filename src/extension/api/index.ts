import * as express from 'express';
import * as vscode from 'vscode';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import { initializeStaticRoutes } from './static-files';
import { join } from 'path';

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
        vscode.window.showTextDocument(
            vscode.Uri.file(join(vscode.workspace.rootPath || '', path))
        );

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

    return new Promise((resolve, reject) => {
        app.listen(port, () => {
            const url = `http://localhost:${port}`;
            console.log(`⚡  Insight is running at ${url} `);
            resolve(null);
        });
    });
}
