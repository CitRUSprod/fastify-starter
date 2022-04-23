export interface RegisterBody {
    email: string
    username: string
    password: string
}

export interface LoginBody {
    email: string
    password: string
}

export interface LogoutCookies {
    refreshToken?: string
}

export interface RefreshCookies {
    refreshToken?: string
}
