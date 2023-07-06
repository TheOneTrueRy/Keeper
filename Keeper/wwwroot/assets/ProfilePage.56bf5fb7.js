import{_ as V,k as I,q as K,A as l,c as i,K as P,V as C,a as t,b as s,e as w,t as d,F as u,r as v,d as S,u as U,P as p,o as r,f as g,p as x,i as B,h}from"./index.68cd7d71.js";import{p as _}from"./ProfilesService.41eac3e0.js";const G="/broken-image.png";const N={setup(){const o=U();async function f(a){try{await _.getUsersVaults(a)}catch(c){p.error(c.message,"[Getting Users Vaults]")}}async function m(a){try{await _.getUsersKeeps(a)}catch(c){p.error(c.message,"[Getting Users Keeps]")}}async function e(a){try{await _.getProfile(a)}catch(c){p.error(c.message,"[Getting Profile]")}}return I(()=>{e(o.params.profileId),m(o.params.profileId),f(o.params.profileId)}),K(()=>{l.profile=null,l.keeps=[]}),{profile:i(()=>l.profile),keeps:i(()=>l.keeps),vaults:i(()=>l.vaults)}},components:{KeepCard:P,VaultCard:C}},k=o=>(x("data-v-6a74c003"),o=o(),B(),o),A={key:0,class:"container-fluid mb-5"},F={class:"row"},j={class:"col-12 col-md-8 offset-md-2 p-3"},q=["src","alt","title"],z={key:1,src:G,alt:"",class:"cover-image rounded border border-dark"},D={class:"col-12 d-flex flex-column align-items-center justify-content-center translate-up"},E=["alt","title"],L={class:"fs-2 pacifico"},M=k(()=>s("div",{class:"col-12 col-md-8 offset-md-2 mb-1"},[s("span",{class:"fs-1 fw-bold"},"Vaults")],-1)),R={class:"col-12 col-md-8 offset-md-2"},H={class:"bricks"},J={class:"rounded hover-card"},O=k(()=>s("div",{class:"col-12 col-md-8 offset-md-2 mb-1"},[s("span",{class:"fs-1 fw-bold"},"Keeps")],-1)),Q={class:"col-12 col-md-8 offset-md-2 mb-5"},T={class:"bricks"},W={class:"rounded hover-card"};function X(o,f,m,e,a,c){const b=h("VaultCard"),y=h("KeepCard");return e.profile?(r(),t("div",A,[s("div",F,[s("div",j,[e.profile.coverImage?(r(),t("img",{key:0,src:e.profile.coverImage,alt:`${e.profile.name}'s cover image.'`,title:`${e.profile.name}'s cover image.'`,class:"cover-image rounded border border-dark"},null,8,q)):(r(),t("img",z))]),s("div",D,[s("div",{style:w({backgroundImage:`url(${e.profile.picture})`}),alt:e.profile.name,title:`${e.profile.name}'s profile picture.'`,class:"profile-picture border border-dark elevation-1 cover-center"},null,12,E),s("span",L,d(e.profile.name),1),s("div",null,[s("span",null,d(e.vaults.length)+" Vaults | "+d(e.keeps.length)+" Keeps",1)])]),M,s("div",R,[s("div",H,[(r(!0),t(u,null,v(e.vaults,n=>(r(),t("div",J,[g(b,{vault:n},null,8,["vault"])]))),256))])]),O,s("div",Q,[s("div",T,[(r(!0),t(u,null,v(e.keeps,n=>(r(),t("div",W,[g(y,{keep:n},null,8,["keep"])]))),256))])])])])):S("",!0)}const $=V(N,[["render",X],["__scopeId","data-v-6a74c003"]]);export{$ as default};
