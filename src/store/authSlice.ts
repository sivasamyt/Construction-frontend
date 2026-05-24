import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authService } from '../services/authService'
import { tenantAuthService } from '../services/tenantAuthService'
import type { AuthState, LoginPayload, RegisterOwnerPayload, User } from '../types'

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('auth_token'),
  tenantDomain: localStorage.getItem('tenant_domain'),
  isAuthenticated: !!localStorage.getItem('auth_token'),
  loading: false,
}

export const login = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await authService.login(payload)
      localStorage.setItem('auth_token', response.data.token)
      localStorage.removeItem('tenant_domain')
      return { ...response.data, tenantDomain: null as string | null }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } }
      const message =
        err.response?.data?.errors?.email?.[0] ||
        err.response?.data?.message ||
        'Login failed'
      return rejectWithValue(message)
    }
  }
)

export const tenantLogin = createAsyncThunk(
  'auth/tenantLogin',
  async ({ domain, ...payload }: LoginPayload & { domain: string }, { rejectWithValue }) => {
    try {
      const response = await tenantAuthService.login(domain, payload)
      localStorage.setItem('auth_token', response.data.token)
      localStorage.setItem('tenant_domain', domain)
      return { ...response.data, tenantDomain: domain }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } }
      const message =
        err.response?.data?.errors?.email?.[0] ||
        err.response?.data?.message ||
        'Login failed'
      return rejectWithValue(message)
    }
  }
)

export const registerOwner = createAsyncThunk(
  'auth/registerOwner',
  async (
    { domain, ...payload }: RegisterOwnerPayload & { domain: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await tenantAuthService.registerOwner(domain, payload)
      localStorage.setItem('auth_token', response.data.token)
      localStorage.setItem('tenant_domain', domain)
      return { ...response.data, tenantDomain: domain }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } }
      const message =
        err.response?.data?.errors?.email?.[0] ||
        err.response?.data?.message ||
        'Registration failed'
      return rejectWithValue(message)
    }
  }
)

export const fetchMe = createAsyncThunk('auth/me', async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as { auth: AuthState }
    const domain = state.auth.tenantDomain
    if (domain) {
      const response = await tenantAuthService.me(domain)
      return response.data as User
    }
    const response = await authService.me()
    return response.data as User
  } catch {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('tenant_domain')
    return rejectWithValue('Session expired')
  }
})

export const logout = createAsyncThunk('auth/logout', async (_, { getState }) => {
  const state = getState() as { auth: AuthState }
  try {
    if (state.auth.tenantDomain) {
      await tenantAuthService.logout(state.auth.tenantDomain)
    } else {
      await authService.logout()
    }
  } finally {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('tenant_domain')
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.tenantDomain = null
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state) => {
        state.loading = false
        state.isAuthenticated = false
      })
      .addCase(tenantLogin.pending, (state) => {
        state.loading = true
      })
      .addCase(tenantLogin.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.tenantDomain = action.payload.tenantDomain
        state.isAuthenticated = true
      })
      .addCase(tenantLogin.rejected, (state) => {
        state.loading = false
        state.isAuthenticated = false
      })
      .addCase(registerOwner.pending, (state) => {
        state.loading = true
      })
      .addCase(registerOwner.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.tenantDomain = action.payload.tenantDomain
        state.isAuthenticated = true
      })
      .addCase(registerOwner.rejected, (state) => {
        state.loading = false
      })
      .addCase(fetchMe.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload as User
        state.isAuthenticated = true
      })
      .addCase(fetchMe.rejected, (state) => {
        state.loading = false
        state.user = null
        state.token = null
        state.tenantDomain = null
        state.isAuthenticated = false
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.tenantDomain = null
        state.isAuthenticated = false
        state.loading = false
      })
  },
})

export default authSlice.reducer
