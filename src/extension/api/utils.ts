import { isAbsolute, join } from 'path';

export function resolvePath(workspaceRoot: string, path: string) {
    if (isAbsolute(path)) {
        return path;
    }

    return join(workspaceRoot, path);
}
