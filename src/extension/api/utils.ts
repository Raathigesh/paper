import { isAbsolute, join, normalize, resolve } from 'path';

export function resolvePath(workspaceRoot: string, path: string) {
    if (resolve(path) === normalize(path)) {
        return path;
    }

    return join(workspaceRoot, path);
}
