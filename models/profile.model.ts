export interface ProfileModel {
  id: string
  username: string
  fullName: string
  team: string | null
  isBuddy?: boolean
}