import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"


class ProfilesService{

  async getProfile(profileId){
    const res = await api.get('api/profiles/' + profileId)
    AppState.profile = res.data
  }

  async getUsersKeeps(profileId){
    const res = await api.get(`api/profiles/${profileId}/keeps`)
    AppState.keeps = res.data
  }

  async getUsersVaults(profileId){
    const res = await api.get(`api/profiles/${profileId}/vaults`)
    AppState.vaults = res.data
  }

}

export const profilesService = new ProfilesService()