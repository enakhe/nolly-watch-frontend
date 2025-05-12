// filepath: src/global.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
        REACT_APP_API_KEY: string;
        VITE_TMDB_READ_ACCESS_TOKEN: string;
    }
}