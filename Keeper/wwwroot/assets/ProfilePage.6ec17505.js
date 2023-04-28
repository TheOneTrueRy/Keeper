import{_ as V,k as I,q as K,A as l,c as n,K as P,V as C,a as t,b as s,t as d,F as u,r as v,d as w,u as U,P as p,o as r,e as g,p as x,i as S,h}from"./index.19c0dfaa.js";import{p as _,_ as B}from"./broken-image.33dcee94.js";const G={setup(){const o=U();async function f(a){try{await _.getUsersVaults(a)}catch(c){p.error(c.message,"[Getting Users Vaults]")}}async function m(a){try{await _.getUsersKeeps(a)}catch(c){p.error(c.message,"[Getting Users Keeps]")}}async function e(a){try{await _.getProfile(a)}catch(c){p.error(c.message,"[Getting Profile]")}}return I(()=>{e(o.params.profileId),m(o.params.profileId),f(o.params.profileId)}),K(()=>{l.profile=null,l.keeps=[]}),{profile:n(()=>l.profile),keeps:n(()=>l.keeps),vaults:n(()=>l.vaults)}},components:{KeepCard:P,VaultCard:C}},b=o=>(x("data-v-1c09e3b5"),o=o(),S(),o),N={key:0,class:"container-fluid mb-5"},A={class:"row"},F={class:"col-12 col-md-8 offset-md-2 p-3"},j=["src","alt","title"],q={key:1,src:B,alt:"",class:"cover-image rounded border border-dark"},D={class:"col-12 d-flex flex-column align-items-center justify-content-center translate-up"},E=["src","alt","title"],L={class:"fs-2 pacifico"},M=b(()=>s("div",{class:"col-12 col-md-8 offset-md-2 mb-1"},[s("span",{class:"fs-1 fw-bold"},"Vaults")],-1)),R={class:"col-12 col-md-8 offset-md-2"},z={class:"bricks"},H={class:"rounded hover-card"},J=b(()=>s("div",{class:"col-12 col-md-8 offset-md-2 mb-1"},[s("span",{class:"fs-1 fw-bold"},"Keeps")],-1)),O={class:"col-12 col-md-8 offset-md-2 mb-5"},Q={class:"bricks"},T={class:"rounded hover-card"};function W(o,f,m,e,a,c){const k=h("VaultCard"),y=h("KeepCard");return e.profile?(r(),t("div",N,[s("div",A,[s("div",F,[e.profile.coverImage?(r(),t("img",{key:0,src:e.profile.coverImage,alt:`${e.profile.name}'s cover image.'`,title:`${e.profile.name}'s cover image.'`,class:"cover-image rounded border border-dark"},null,8,j)):(r(),t("img",q))]),s("div",D,[s("img",{src:e.profile.picture,alt:e.profile.name,title:`${e.profile.name}'s profile picture.'`,class:"profile-picture border border-dark elevation-1"},null,8,E),s("span",L,d(e.profile.name),1),s("div",null,[s("span",null,d(e.vaults.length)+" Vaults | "+d(e.keeps.length)+" Keeps",1)])]),M,s("div",R,[s("div",z,[(r(!0),t(u,null,v(e.vaults,i=>(r(),t("div",H,[g(k,{vault:i},null,8,["vault"])]))),256))])]),J,s("div",O,[s("div",Q,[(r(!0),t(u,null,v(e.keeps,i=>(r(),t("div",T,[g(y,{keep:i},null,8,["keep"])]))),256))])])])])):w("",!0)}const Z=V(G,[["render",W],["__scopeId","data-v-1c09e3b5"]]);export{Z as default};
