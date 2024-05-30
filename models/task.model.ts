export interface TaskModel {
  id: number
  title: string
  description: string
  competition?: string
  category: string
  difficulty: number
  points: number
  answers: any[]
}