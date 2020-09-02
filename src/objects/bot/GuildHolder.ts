import { SqlStorage, SQLWrapper, StorageHolder } from "simpledatabases";
import { GuildWrapper } from "./GuildWrapper";

export class GuildHolder extends SqlStorage<GuildWrapper> {

    cachedGuilds: Map<string, GuildWrapper>;

    constructor(holder: StorageHolder, database: SQLWrapper) {
        super(holder, database);
        this.cachedGuilds = new Map();
    }
    getDummy(id?: string): GuildWrapper {
        return new GuildWrapper(id);
    }

    getOrCreate(id: string): Promise<GuildWrapper> {
        return new Promise(async resolve => {
            if (this.cachedGuilds.has(id)) resolve(this.cachedGuilds.get(id));
            const cache: GuildWrapper = await this.cache(id);
            if (cache !== undefined) this.cachedGuilds.set(id, cache);
            else await this.add(this.getDummy(id).loadDefaults());
            resolve(this.cachedGuilds.get(id));
        });
    }

    onAdd(object: GuildWrapper): void {
        this.cachedGuilds.set(object.id, object);
    }
    onRemove(object: GuildWrapper): void {
        this.cachedGuilds.delete(object.id);
    }

    getValues(): GuildWrapper[] {
        throw Array.of(this.cachedGuilds.values());
    }

}