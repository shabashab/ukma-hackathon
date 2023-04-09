import { ProfileModel } from "./profile.model";

export interface TeamModel {
  id: string
  name: string
  profiles: ProfileModel[]
  'created_by': string
}