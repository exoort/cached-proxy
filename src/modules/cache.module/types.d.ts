declare namespace fastify {
    export type DataCacheKey = string | {
        key: string,
        secret?: string,
    }

    export type DataCacheItem = {
        value: any,
        time: number | typeof Infinity,
    }

    export type DataCacheItems = Map<DataCacheKey, DataCacheItem>

    export interface DataCache {
        getAll(): Promise<DataCacheItems>;

        fetch<Data = any>(key: DataCacheKey, dataSource: any, seconds?: number): Promise<Data>;

        set(key: DataCacheKey, data: any, seconds?: number): Promise<boolean>;

        get<Data = any>(key: DataCacheKey): Promise<Data>;

        remove(key: DataCacheKey): Promise<boolean>;
    }

    export const cacheModule: DataCache
}
