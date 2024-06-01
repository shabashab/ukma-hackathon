<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import type {Database} from "~/database.types";

const supabase = useSupabaseClient<Database>()
const toast = useToast()

interface Team {
  id: string
  name: string
  answers: {
    grade: number | null
  }[]
}

const { data: teams , error } = await supabase
    .from('teams')
    .select('id, name ,answers(grade)')

if (error || !teams) {
  toast.add({
    severity: 'error',
    summary: 'Error',
    detail: 'An error occurred while fetching the teams'
  })
}


const calculateGradeSumForTeam = (team: Team) => {
  return team.answers.reduce((acc, curr) => acc + (curr.grade ?? 0), 0)
}

const countGrades = (team: Team) => {
  return team.answers.filter(answer => answer.grade !== null).length ?? 0
}

const cauntAnswers = (team: Team) => {
  return team.answers.length ?? 0
}

const teamsWithGrades = computed(() => {
  if (!teams) return []

  return teams.map((team) => ({
  ...team,
  gradeSum: calculateGradeSumForTeam(team) ?? 0,
  countGrades: countGrades(team) ?? 0,
  countAnswers: cauntAnswers(team) ?? 0,

}))})


const sortedTeams = computed(() => {
  return teamsWithGrades.value.sort((a, b) => (
    b.gradeSum - a.gradeSum
  )).map((team, index) => ({
    ...team,
    index: index
  }));
})

const getIconNameByPlace = (index: number) => {
  const options = {
    0: 'noto:clown-face',
    1: 'openmoji:1st-place-medal',
    2: 'openmoji:2nd-place-medal',
    3: 'openmoji:3rd-place-medal'
  }

  return options[index as 0|1|2|3] ?? 'material-symbols:accessible';
}

</script>

<template>
  <DataTable :value="sortedTeams" class="mt-10">
    <template #header>
      <h1>
        Leader board
      </h1>
    </template>
    <Column field="index" header="Place" >
      <template #body="{data}">
        <div>
          {{ data.index }}
          <Icon :name="getIconNameByPlace(data.index)"></Icon>
        </div>
      </template>
    </Column>
    <Column field="name" header="Team" />
    <Column field="gradeSum" header="Total Points" />
    <Column  header="Evaluated" >
      <template #body="{data}">
        {{ (data.countGrades / data.countAnswers * 100).toFixed(2) }}%
        ({{ data.countGrades}}/{{data.countAnswers }})
      </template>
    </Column>
  </DataTable>
</template>