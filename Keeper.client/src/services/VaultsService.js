import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
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

  async createVault(vaultData){
    const res = await api.post('api/vaults', vaultData)
    AppState.myVaults.unshift(res.data)
  }

  async getVault(vaultId){
    const res = await api.get(`api/vaults/${vaultId}`)
    AppState.vault = res.data
  }

  async getKeepsInVault(vaultId){
    const res = await api.get(`api/vaults/${vaultId}/keeps`)
    AppState.keeps = res.data
    logger.log(AppState.keeps)
  }

  async deleteVault(vaultId){
    const res = await api.delete('api/vaults/' + vaultId)
  }

  async updateVault(vaultData){
    const res = await api.put(`api/vaults/${vaultData.id}`, vaultData)
    AppState.vault = res.data
  }
}

export const vaultsService = new VaultsService()