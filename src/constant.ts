export const apiBaseUrl = "https://api.themoviedb.org/3";
export const baseImageUrl = 'https://image.tmdb.org/t/p/w500';

export interface Movie {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: false,
    vote_average: number,
    vote_count: number
}

export interface Genre {
    id: number,
    name: string
}

export interface Actor {
    adult: boolean,
    gender: number,
    id: number,
    known_for: KnownFor[],
    known_for_department: string,
    name: string,
    popularity: number,
    profile_path: string
}

export interface KnownFor {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    media_type: string,
    original_language: string,
    original_title: string,
    overview: string,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number

}