export interface AnswerModel {
  team: string
  'submitted_by': string
  text: string
  task: number
  grade: number | null
}