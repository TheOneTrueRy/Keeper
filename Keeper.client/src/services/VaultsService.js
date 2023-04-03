import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"


class VaultsService{
  async getMyVaults(){
    const res = await api.get('account/vaults')
    AppState.myVaults = res.data
  }
}

export const vaultsService = new VaultsService()