import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"


class VaultKeepsService{
  async vaultAKeep(vaultId, keepId){
    const res = await api.post('api/vaultkeeps', {vaultId, keepId})
    AppState.keep.kept++
  }

  async removeKeep(vaultKeepId){
    const res = await api.delete('api/vaultkeeps/' + vaultKeepId)
    const keepIndex = AppState.keeps.findIndex(k => k.vaultKeepId == vaultKeepId)
    AppState.keeps.splice(keepIndex, 1)
  }
}

export const vaultKeepsService = new VaultKeepsService()