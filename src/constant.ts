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

export interface SingleMovieResponse {
    adult: boolean,
    backdrop_path: string,
    belongs_to_collection: {
        id: number,
        name: string,
        poster_path: string,
        backdrop_path: string
    } | null,
    budget: number,
    genres: Genre[],
    homepage: string,
    id: number,
    imdb_id: string,
    original_language: string,
    original_title: string,
    origin_country: string[],
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: {
        id: number,
        logo_path: string | null,
        name: string,
        origin_country: string
    }[],
    production_countries: {
        iso_3166_1: string,
        name: string
    }[],
    release_date: string,
    revenue: number,
    runtime: number | null,
    spoken_languages: {
        english_name: string,
        iso_639_1: string,
        name: string
    }[],
    status: string,
    tagline: string,
    title: string,
    video: boolean,
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

export interface MovieCast {
    cast: {
        adult: boolean,
        gender: number,
        id: number,
        known_for_department: string,
        name: string,
        original_name: string,
        popularity: number,
        profile_path: string | null,
        cast_id: number,
        character: string,
        credit_id: string,
        order: number
    }[],
    crew: {
        adult: boolean,
        gender: number,
        id: number,
        known_for_department: string,
        name: string,
        original_name: string,
        popularity: number,
        profile_path: string | null,
        credit_id: string,
        department: string,
        job: string
    }[],
    id: number
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

export function mapMovieGenres(movie: Movie, genres: Genre[]): string[] {
    return movie.genre_ids
        .map(genreId => {
            const genre = genres.find(g => g.id === genreId);
            return genre ? genre.name : null;
        })
        .filter((name): name is string => name !== null);
}