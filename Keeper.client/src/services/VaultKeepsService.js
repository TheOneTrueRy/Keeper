import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class VaultKeepsService{
  async vaultAKeep(vaultId, keepId){
    const res = await api.post('api/vaultkeeps', {vaultId, keepId})
    AppState.keep.kept++
  }
}

export const vaultKeepsService = new VaultKeepsService()