import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"


class VaultsService{
  async getMyVaults(){
    const res = await api.get('account/vaults')
    AppState.myVaults = res.data
  }

  async setVault(vaultId){
    const res = await api.get('api/vaults/' + vaultId)
    AppState.vault = res.data
  }
}

export const vaultsService = new VaultsService()