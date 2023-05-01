import{_ as k,w as y,c as i,K as V,V as w,M as C,a as t,b as s,t as f,F as _,r as m,d as K,e as l,f as S,A as c,g as x,h as n,o,p as A,i as M,P as u,v as F}from"./index.66b70267.js";import{_ as I,p as N}from"./broken-image.460bb234.js";const P={setup(){async function a(r){try{await N.getUsersKeeps(r)}catch(e){u.error(e.message,"[Getting Users Keeps]")}}async function p(){try{await F.getMyVaults()}catch(r){u.error(r.message,"[Getting My Vaults]")}}return y(()=>{c.account.id&&(a(c.account.id),p())}),{profile:i(()=>c.account),keeps:i(()=>c.keeps),vaults:i(()=>c.myVaults)}},components:{KeepCard:V,VaultCard:w,Modal:C}},B=a=>(A("data-v-0f4029f8"),a=a(),M(),a),E={key:0,class:"container-fluid mb-5"},U={class:"row"},D={class:"col-12 col-md-8 offset-md-2 p-3"},G=["src","alt","title"],j={key:1,src:I,alt:"",class:"cover-image rounded border border-dark"},L={class:"col-4 offset-4 d-flex flex-column align-items-center justify-content-center translate-up"},Y=["src","alt","title"],q={class:"fs-2 pacifico"},z=x('<div class="col-2" data-v-0f4029f8><button class="btn btn-dark" title="Edit Your Account Details" data-bs-toggle="modal" data-bs-target="#accountForm" data-v-0f4029f8><span data-v-0f4029f8><i class="mdi mdi-pencil" data-v-0f4029f8></i></span></button></div><div class="col-12 col-md-8 offset-md-2" data-v-0f4029f8><span class="fs-2 fw-bold" data-v-0f4029f8>Vaults</span></div>',2),H={class:"col-12 col-md-8 offset-md-2"},J={class:"bricks"},O={class:"rounded hover-card"},Q=B(()=>s("div",{class:"col-12 col-md-8 offset-md-2"},[s("span",{class:"fs-2 fw-bold"},"Keeps")],-1)),R={class:"col-12 col-md-8 offset-md-2 mb-5"},T={class:"bricks"},W={class:"rounded hover-card"};function X(a,p,r,e,Z,$){const v=n("VaultCard"),g=n("KeepCard"),h=n("AccountForm"),b=n("Modal");return o(),t(_,null,[e.profile?(o(),t("div",E,[s("div",U,[s("div",D,[e.profile.coverImage?(o(),t("img",{key:0,src:e.profile.coverImage,alt:`${e.profile.name}'s cover image.'`,title:`${e.profile.name}'s cover image.`,class:"cover-image rounded border border-dark"},null,8,G)):(o(),t("img",j))]),s("div",L,[s("img",{src:e.profile.picture,alt:e.profile.name,title:`${e.profile.name}'s profile picture.'`,class:"profile-picture border border-dark elevation-1"},null,8,Y),s("span",q,f(e.profile.name),1),s("div",null,[s("span",null,f(e.vaults.length)+" Vaults | "+f(e.keeps.length)+" Keeps",1)])]),z,s("div",H,[s("div",J,[(o(!0),t(_,null,m(e.vaults,d=>(o(),t("div",O,[l(v,{vault:d},null,8,["vault"])]))),256))])]),Q,s("div",R,[s("div",T,[(o(!0),t(_,null,m(e.keeps,d=>(o(),t("div",W,[l(g,{keep:d},null,8,["keep"])]))),256))])])])])):K("",!0),l(b,{id:"accountForm"},{default:S(()=>[l(h)]),_:1})],64)}const te=k(P,[["render",X],["__scopeId","data-v-0f4029f8"]]);export{te as default};
