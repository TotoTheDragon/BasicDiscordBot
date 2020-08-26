import { readdir, readFile, stat, writeFile } from 'fs/promises';
import { join } from 'path';

export async function findFiles(dir: string, recursive: boolean = false): Promise<string[]> {
    try {
        if (recursive) return await (await findFilesRecursive(dir)).map(f => f.substr(join(dir).length))
        return await (readdir(dir));
    } catch (err) {
        return [];
    }

}

async function findFilesRecursive(dir: string, allFiles: string[] = []): Promise<string[]> {
    const files = (await readdir(dir)).map(f => join(dir, f))
    allFiles.push(...files)
    await Promise.all(files.map(async f => (await stat(f)).isDirectory() && findFilesRecursive(f, allFiles)));
    return allFiles;
}

export async function doesFileExist(dir: string): Promise<boolean> {
    try {
        await stat(dir);
        return true;
    } catch (err) {
        return false;
    }
}