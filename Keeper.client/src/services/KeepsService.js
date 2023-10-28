import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class KeepsService {
  async getAllKeeps() {
    const res = await api.get('api/keeps')
    AppState.keeps = res.data
    logger.log(AppState.keeps)
  }

  async setKeep(keepId) {
    const res = await api.get('api/keeps/' + keepId)
    AppState.keep = res.data
  }

  async createKeep(keepData) {
    const res = await api.post('api/keeps', keepData)
    keepData = res.data
    keepData.creator = AppState.account
    AppState.keeps.unshift(res.data)
  }

  async deleteKeep(keepId) {
    const res = await api.delete('api/keeps/' + keepId)
    const keepIndex = AppState.keeps.findIndex(k => k.id == keepId)
    AppState.keeps.splice(keepIndex, 1)
  }
}

export const keepsService = new KeepsService()