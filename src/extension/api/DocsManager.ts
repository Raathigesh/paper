import * as vscode from 'vscode';

const StateKey = 'paper-documents';

interface Document {
    content: string;
    id: string;
    type: 'doc';
    name: string;
}

interface State {
    activeDocument: null | string;
    documents: Document[];
}

export class DocsManager {
    context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
    }

    getActiveDocument(): Document | null {
        if (this.context.workspaceState.get(StateKey) === undefined) {
            const newDocId = new Date().valueOf().toString();
            this.context.workspaceState.update(StateKey, {
                activeDocument: newDocId,
                documents: [
                    {
                        content:
                            this.context.workspaceState.get('paper-content') ||
                            '',
                        id: newDocId,
                        type: 'doc',
                        name: 'Untitled',
                    },
                ],
            } as State);
        }

        const state: State = this.context.workspaceState.get(StateKey) as any;
        const activeDocument = state.documents.find(
            item => item.id === state.activeDocument
        );
        if (!activeDocument) {
            return null;
        }
        return activeDocument;
    }

    setActiveDocument(id: string) {
        const state: State = this.context.workspaceState.get(StateKey) as any;
        this.context.workspaceState.update(StateKey, {
            ...state,
            activeDocument: id,
        } as State);
    }

    updateDocument(id: string, content: string) {
        const state: State = this.context.workspaceState.get(StateKey) as any;
        const updatedDocuments = state.documents.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    content,
                };
            }
            return item;
        });

        const nextState: State = {
            ...state,
            documents: updatedDocuments,
        };
        this.context.workspaceState.update(StateKey, nextState);
    }

    createDocument(name: string, content: string, type: 'doc') {
        const state: State = this.context.workspaceState.get(StateKey) as any;
        const id = new Date().valueOf().toString();
        const nextState: State = {
            ...state,
            documents: [
                ...state.documents,
                {
                    id,
                    content,
                    type,
                    name,
                },
            ],
        };
        this.context.workspaceState.update(StateKey, nextState);

        return id;
    }

    deleteDocument(id: string) {
        const state: State = this.context.workspaceState.get(StateKey) as any;
        const nextState: State = {
            ...state,
            activeDocument:
                id === state.activeDocument ? null : state.activeDocument,
            documents: state.documents.filter(item => item.id !== id),
        };
        this.context.workspaceState.update(StateKey, nextState);
    }

    getDocumentsList(): Document[] {
        const state: State = this.context.workspaceState.get(StateKey) as any;
        return state.documents;
    }

    renameDoc(id: string, name: string) {
        const state: State = this.context.workspaceState.get(StateKey) as any;
        const updatedDocuments = state.documents.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    name,
                };
            }
            return item;
        });

        const nextState: State = {
            ...state,
            documents: updatedDocuments,
        };
        this.context.workspaceState.update(StateKey, nextState);
    }
}
