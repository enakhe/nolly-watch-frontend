import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Actor, apiBaseUrl, Genre, Movie } from "../constant"

interface MovieResponse {
    page: number,
    results: Movie[],
    total_pages: number,
    total_results: number
}

interface GenreResponse {
    genres: Genre[]
}

interface ActorResponse {
    page: number,
    results: Actor[],
    total_pages: number,
    total_results: number
}

const accessToken = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;

export const movieApiSlice = createApi({
    reducerPath: "movieApi",
    baseQuery: fetchBaseQuery({
        baseUrl: apiBaseUrl,
        prepareHeaders: headers => {
            if (accessToken) {
                headers.set("Authorization", `Bearer ${accessToken}`)
            }

            return headers;
        },
    }),

    tagTypes: ["Movie"],
    endpoints: builder => ({
        getNowPlayingMovies: builder.query<MovieResponse, void>({
            query: () => ({
                url: `movie/now_playing?with_origin_country=NG&region=NG&sort_by=popularity.desc&include_adult=false&include_video=true&language=en-US&page=${1}`,
                method: "GET",
            }),
        }),

        getMoviesWithFiltering: builder.query<MovieResponse, { pageNumber: number }>({
            query: ({ pageNumber }) => ({
                url: `discover/movie?with_origin_country=NG&region=NG&sort_by=popularity.desc&include_adult=false&include_video=true&language=en-US&page=${pageNumber}`,
                method: "GET",
            }),
        }),

        getTvShowsWithFiltering: builder.query<MovieResponse, { pageNumber: number }>({
            query: ({ pageNumber }) => ({
                url: `discover/tv?with_origin_country=NG&region=NG&sort_by=popularity.desc&include_adult=false&include_video=true&language=en-US&page=${pageNumber}`,
                method: "GET",
            }),
        }),

        getPopularMovie: builder.query<MovieResponse, void>({
            query: () => ({
                url: "/discover/movie?region=NG&with_origin_country=NG&sort_by=popularity.desc&include_adult=false&language=en-US&page=1",
                method: "GET",
            }),
        }),

        getUpcomingMovies: builder.query<MovieResponse, { pageNumber: number }>({
            query: ({ pageNumber }) => ({
                url: `/movie/upcoming?with_origin_country=NG&region=NG&sort_by=popularity.desc&include_adult=false&include_video=true&language=en-US&page=${pageNumber}`,
                method: "GET",
            })
        }),

        getMovieGenres: builder.query<GenreResponse, void>({
            query: () => ({
                url: "/genre/movie/list?with_origin_country=NG&region=NG&language=en",
                method: "GET",
            })
        }),

        getActors: builder.query<ActorResponse, { pageNumber: number }>({
            query: ({ pageNumber }) => ({
                url: `/person/popular?with_origin_country=NG&region=NG&language=en-US&page=${pageNumber}`,
                method: "GET",
            })
        })
    })
})

export const {
    useGetNowPlayingMoviesQuery,
    useGetMoviesWithFilteringQuery,
    useGetTvShowsWithFilteringQuery,
    useGetPopularMovieQuery,
    useGetUpcomingMoviesQuery,
    useGetMovieGenresQuery,
    useGetActorsQuery
} = movieApiSlice