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
        getMoviesWithFiltering: builder.query<MovieResponse, { pageNumber: number }>({
            query: ({ pageNumber }) => ({
                url: `/discover/movie?include_adult=false&include_video=true&language=en-US&page=${pageNumber}&sort_by=popularity.desc`,
                method: "GET",
            }),
        }),

        getPopularMovie: builder.query<MovieResponse, void>({
            query: () => ({
                url: "/movie/popular?language=en-US&page=1",
                method: "GET",
            }),
        }),

        getMovieGenres: builder.query<GenreResponse, void>({
            query: () => ({
                url: "/genre/movie/list?language=en",
                method: "GET",
            })
        }),

        getActors: builder.query<ActorResponse, { pageNumber: number }>({
            query: ({ pageNumber }) => ({
                url: `/person/popular?language=en-US&page=${pageNumber}`,
                method: "GET",
            })
        })
    })
})

export const {
    useGetMoviesWithFilteringQuery,
    useGetPopularMovieQuery,
    useGetMovieGenresQuery,
    useGetActorsQuery
} = movieApiSlice