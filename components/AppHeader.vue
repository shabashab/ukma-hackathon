<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth.store';
import { useTeamStore } from '~/stores/team.store';
import type { MenuItem } from 'primevue/menuitem';
import type Menu from 'primevue/menu';

const supabase = useSupabaseAuthClient()

const authStore = useAuthStore()
const teamStore = useTeamStore()
const profileMenu = ref<Menu>()
const router = useRouter()

const menubarItems: ComputedRef<MenuItem[]> = computed(() => ([
  ...(teamStore.team ? [
      {
        label: 'Tasks',
        to: {
          path: '/'
        }
      }
    ] : []
  ),
  {
    label: 'My team',
    to: {
      path: '/team'
    }
  },
  ...(authStore.profile?.isBuddy ? [
      {
        label: 'Task management',
        to: {
          path: '/tasks/management'
        }
      },
      {
        label: 'Answer management',
        to: {
          path: '/answers'
        }
      }
    ] : []
  ),
]))

const profileMenuItems: MenuItem[] = [
  {
    label: 'Log out',
    command: async () => {
      await supabase.auth.signOut()
      console.log(authStore.user)
      router.push({ path: '/auth' })
    }
  }
]

const toggleProfileMenu = (event: Event) => {
  profileMenu.value?.toggle(event)
}
</script>

<template>
  <Menubar :model="menubarItems">
    <template #end>
      <Button 
        @click="toggleProfileMenu" 
        v-if="authStore.profile" 
        text
        aria-haspopup="true" 
        aria-controls="overlay_menu"
      >
        <span>{{ authStore.profile.fullName }}</span>
      </Button>
      <Menu ref="profileMenu" id="overlay_menu" :model="profileMenuItems" :popup="true" />
    </template>
  </Menubar>
</template>

<style lang="scss" scoped>

</style>