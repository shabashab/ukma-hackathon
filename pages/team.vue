<script lang="ts" setup>
import { useTeamStore } from '~/stores/team.store';
import { useAuthStore } from '../stores/auth.store';

const teamStore = useTeamStore()
const authStore = useAuthStore()

const teamName = ref<string>('')
const inviteCode = ref<string>('')

const onCreateTeamButtonClick = async () => {
  await teamStore.create(teamName.value)
}

const onJoinTeamButtonClick = async () => {
  try {
    await teamStore.join(inviteCode.value)
  } catch (e) {
    alert("TEAM DOES NOT EXIST YOU SUCKER")
  }
}

const onCopyInviteButtonClick = () => {
  navigator.clipboard.writeText(teamStore.team!.id)
}
</script>

<template>
  <div>
    <div v-if="teamStore.team">
      <h1>My team: {{ teamStore.team.name }}</h1>
      <div class="text-black/60">
        <span class="">Invite code:</span>
        <button 
        @click="onCopyInviteButtonClick"
          class="appearance-none bg-transparent border-none outline-none text-black/60 hover:(cursor-pointer)"
        >
          <Icon name="material-symbols:content-copy-outline"></Icon>
        {{ teamStore.team.id }}</button>
      </div>
      <h2>Members:</h2>
      <div class="flex flex-col gap-7">
        <TeamMember 
          :profile="profile" 
          v-for="profile of teamStore.team.profiles"
          :captain="profile.id == teamStore.team['created_by']"
        />
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4" v-else>
      <div class="flex flex-col justify-center gap-4 items-center bg-light-300 rounded-xl h-[400px]">
        <span class="font-bold text-[36px] text-black/80 mb-10">Create a team</span>
        <InputText v-model="teamName" placeholder="Team Name"/>
        <Button @click="onCreateTeamButtonClick">Create</Button>
      </div>
      <div class="flex flex-col justify-center gap-4 items-center bg-light-300 rounded-xl h-[400px]">
        <span class="font-bold text-[36px] text-black/80 mb-10">Join a team</span>
        <InputText v-model="inviteCode" placeholder="Invite code"/>
        <Button @click="onJoinTeamButtonClick">Join</Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>