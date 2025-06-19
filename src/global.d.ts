// filepath: src/global.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
        REACT_APP_API_KEY: string;
        VITE_TMDB_READ_ACCESS_TOKEN: string;
        VITE_BACKEND_API_URL: string;
    }
}

interface ImportMetaEnv {
    readonly VITE_TMDB_READ_ACCESS_TOKEN: string;
    readonly VITE_BACKEND_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}