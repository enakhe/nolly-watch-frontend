import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseUrl = "https://nolly-watch-backend.vercel.app/api"

export interface User {
    _id: string
    fullName: string
    username: string
    email: string
    profilePicture: string
    createdAt: string
    updatedAt: string
}

export interface RegisterRequest {
    fullName: string
    username: string
    email: string
    password: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface AuthResponse {
    success: boolean
    message: string
    user: User
    token: string
}

export interface Watchlist {
    _id: string
    name: string
    description?: string
    movies: number[]
    user: string
    createdAt: string
    updatedAt: string
}

export interface WatchlistWithMovies {
    _id: string
    name: string
    description?: string
    movies: {
        movieId: number
        addedAt: string
    }[]
    user: string
    createdAt: string
    updatedAt: string
}

export interface CreateWatchlistRequest {
    name: string
    description?: string
}

export interface AddToWatchlistRequest {
    watchlistId: string
    movieId: number
}

export interface RemoveFromWatchlistRequest {
    watchlistId: string
    movieId: number
}

export interface UpdateWatchlistNameRequest {
    watchlistId: string
    name: string
}

export const userApiSlice = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token')
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ["User", "Watchlist"],
    endpoints: (builder) => ({
        // Auth endpoints
        register: builder.mutation<AuthResponse, RegisterRequest>({
            query: (userData) => ({
                url: '/users/register',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ["User"],
        }),

        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/users/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ["User"],
        }),

        getUserProfile: builder.query<{ user: User }, void>({
            query: () => '/users/get-profile',
            providesTags: ["User"],
        }),

        getUserById: builder.query<{ user: User }, string>({
            query: (id) => `/users/${id}`,
            providesTags: ["User"],
        }),

        // Watchlist endpoints
        getWatchlists: builder.query<{ watchlists: Watchlist[] }, void>({
            query: () => '/watchlist',
            providesTags: ["Watchlist"],
        }),

        getWatchlistsWithMovies: builder.query<{ watchlists: WatchlistWithMovies[] }, void>({
            query: () => '/watchlist/with-movies',
            providesTags: ["Watchlist"],
        }),

        getWatchlistById: builder.query<{ watchlist: Watchlist }, string>({
            query: (id) => `/watchlist/${id}`,
            providesTags: ["Watchlist"],
        }),

        getMoviesInWatchlist: builder.query<{ movies: number[] }, string>({
            query: (id) => `/watchlist/movies/${id}`,
            providesTags: ["Watchlist"],
        }),

        createWatchlist: builder.mutation<{ watchlist: Watchlist }, CreateWatchlistRequest>({
            query: (watchlistData) => ({
                url: '/watchlist/create',
                method: 'POST',
                body: watchlistData,
            }),
            invalidatesTags: ["Watchlist"],
        }),

        addToWatchlist: builder.mutation<{ message: string }, AddToWatchlistRequest>({
            query: ({ watchlistId, movieId }) => ({
                url: '/watchlist/add-movie',
                method: 'POST',
                body: { watchlistId, movieId },
            }),
            invalidatesTags: ["Watchlist"],
        }),

        removeFromWatchlist: builder.mutation<{ message: string }, RemoveFromWatchlistRequest>({
            query: ({ watchlistId, movieId }) => ({
                url: '/watchlist/remove-movie',
                method: 'POST',
                body: { watchlistId, movieId },
            }),
            invalidatesTags: ["Watchlist"],
        }),

        updateWatchlistName: builder.mutation<{ watchlist: Watchlist }, UpdateWatchlistNameRequest>({
            query: ({ watchlistId, name }) => ({
                url: `/watchlist/update-name/${watchlistId}`,
                method: 'PUT',
                body: { name },
            }),
            invalidatesTags: ["Watchlist"],
        }),

        deleteWatchlist: builder.mutation<{ message: string }, string>({
            query: (watchlistId) => ({
                url: `/watchlist/delete/${watchlistId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Watchlist"],
        }),
    }),
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useGetUserProfileQuery,
    useGetUserByIdQuery,
    useGetWatchlistsQuery,
    useGetWatchlistsWithMoviesQuery,
    useGetWatchlistByIdQuery,
    useGetMoviesInWatchlistQuery,
    useCreateWatchlistMutation,
    useAddToWatchlistMutation,
    useRemoveFromWatchlistMutation,
    useUpdateWatchlistNameMutation,
    useDeleteWatchlistMutation,
} = userApiSlice