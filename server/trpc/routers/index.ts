import { z } from 'zod';
import { publicProcedure, router } from "../trpc";

export const appRouter = router({
  health: publicProcedure
    .query(() => {
      return {
        status: "Healthy"
      }
    })
})

export type AppRouter = typeof appRouter