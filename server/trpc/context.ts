import { inferAsyncReturnType } from '@trpc/server'
import { serverSupabaseUser } from '#supabase/server'
import type { H3Event } from 'h3'

export const createContext = (event: H3Event) => {
  const user = serverSupabaseUser(event)

  return {
    user
  }
}

export type Context = inferAsyncReturnType<typeof createContext>