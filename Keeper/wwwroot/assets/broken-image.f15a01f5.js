import{i as a,A as t}from"./index.44ff51dd.js";class i{async getProfile(e){const s=await a.get("api/profiles/"+e);t.profile=s.data}async getUsersKeeps(e){const s=await a.get(`api/profiles/${e}/keeps`);t.keeps=s.data}async getUsersVaults(e){const s=await a.get(`api/profiles/${e}/vaults`);t.vaults=s.data}}const o=new i,c="/broken-image.png";export{c as _,o as p};