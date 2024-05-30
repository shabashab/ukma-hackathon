<script lang="ts" setup>
import IncDevLogo from '~/assets/images/inc-dev-logo.svg'
import { useAuthStore } from '~/stores/auth.store';
import { useTeamStore } from '~/stores/team.store';
import type { MenuItem } from 'primevue/menuitem';
import type Menu from 'primevue/menu';

const supabase = useSupabaseClient()

const authStore = useAuthStore()
const teamStore = useTeamStore()
const profileMenu = ref<Menu>()
const router = useRouter()

const menubarItems: ComputedRef<MenuItem[]> = computed(() => ([
  ...(teamStore.team ? [
      {
        label: 'Tasks',
        url: '/'
      }
    ] : []
  ),
  {
    label: 'My team',
    url: '/team'
  },
  ...(authStore.profile?.isBuddy ? [
      {
        label: 'Task management',
        url: '/tasks/management'
      },
      {
        label: 'Answer management',
        url: '/answers'
      }
    ] : []
  ),
]))

const profileMenuItems: MenuItem[] = [
  {
    label: 'Log out',
    command: async () => {
      await supabase.auth.signOut()
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
      <div class="flex flex-row items-center py-2">
        <a class="mr-4" href="https://inc-dev.com"><img :src="IncDevLogo" height="30px"></a>
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
        <img class="rounded-full w-[30px] col-start-1 col-end-2 row-start-1 row-end-3" :src="`https://github.com/${authStore?.profile?.username}.png`" alt="">
      </div>
    </template>
  </Menubar>
</template>

<style lang="scss" scoped>

</style>