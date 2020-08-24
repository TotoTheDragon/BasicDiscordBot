import { readdir, stat } from 'fs/promises';
import { join } from 'path';

export async function findFiles(dir: string, recursive: boolean = false) {
    if (recursive) return await (await findFilesRecursive(dir)).map(f => f.substr(join(dir).length))
    return await (readdir(dir));
}

async function findFilesRecursive(dir: string, allFiles: string[] = []): Promise<string[]> {
    const files = (await readdir(dir)).map(f => join(dir, f))
    allFiles.push(...files)
    await Promise.all(files.map(async f => (await stat(f)).isDirectory() && findFilesRecursive(f, allFiles)));
    return allFiles;
}