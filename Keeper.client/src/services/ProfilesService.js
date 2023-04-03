import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"


class ProfilesService{

  async getProfile(profileId){
    const res = await api.get('api/profiles/' + profileId)
    AppState.profile = res.data
  }

}

export const profilesService = new ProfilesService()