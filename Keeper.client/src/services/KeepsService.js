import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"


class KeepsService{
  async getAllKeeps(){
    const res = await api.get('api/keeps')
    AppState.keeps = res.data
  }
}

export const keepsService = new KeepsService()