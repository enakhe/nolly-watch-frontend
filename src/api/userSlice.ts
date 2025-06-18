import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseUrl = "https://nolly-watch-backend.vercel.app/api/users"

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

export interface CreateWatchlistRequest {
    name: string
    description?: string
}

export interface AddToWatchlistRequest {
    watchlistId: string
    movieId: number
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
        register: builder.mutation<AuthResponse, RegisterRequest>({
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ["User"],
        }),

        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ["User"],
        }),

        getUserProfile: builder.query<{ user: User }, void>({
            query: () => '/get-profile',
            providesTags: ["User"],
        }),

        getUserById: builder.query<{ user: User }, string>({
            query: (id) => `/${id}`,
            providesTags: ["User"],
        }),

        // Watchlist endpoints (assuming they exist on your backend)
        getWatchlists: builder.query<{ watchlists: Watchlist[] }, void>({
            query: () => '/watchlists',
            providesTags: ["Watchlist"],
        }),

        createWatchlist: builder.mutation<{ watchlist: Watchlist }, CreateWatchlistRequest>({
            query: (watchlistData) => ({
                url: '/watchlists',
                method: 'POST',
                body: watchlistData,
            }),
            invalidatesTags: ["Watchlist"],
        }),

        addToWatchlist: builder.mutation<{ message: string }, AddToWatchlistRequest>({
            query: ({ watchlistId, movieId }) => ({
                url: `/watchlists/${watchlistId}/movies`,
                method: 'POST',
                body: { movieId },
            }),
            invalidatesTags: ["Watchlist"],
        }),

        removeFromWatchlist: builder.mutation<{ message: string }, AddToWatchlistRequest>({
            query: ({ watchlistId, movieId }) => ({
                url: `/watchlists/${watchlistId}/movies/${movieId}`,
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
    useCreateWatchlistMutation,
    useAddToWatchlistMutation,
    useRemoveFromWatchlistMutation,
} = userApiSlice