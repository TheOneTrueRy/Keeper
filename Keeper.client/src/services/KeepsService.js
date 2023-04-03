import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class KeepsService{
  async getAllKeeps(){
    const res = await api.get('api/keeps')
    AppState.keeps = res.data
    logger.log(AppState.keeps)
  }

  async setKeep(keepId){
    const res = await api.get('api/keeps/' + keepId)
    AppState.keep = res.data
  }
}

export const keepsService = new KeepsService()