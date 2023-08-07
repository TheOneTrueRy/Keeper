import{_ as V,w as C,c as r,K,V as w,M as x,a as t,b as e,n as S,t as m,d as A,e as p,F as u,r as h,f as d,g as I,A as a,h as i,o,p as M,i as F,P as v,v as N}from"./index.e970179e.js";import{_ as P,p as B}from"./broken-image.2e9b3572.js";const E={setup(){async function c(n){try{await B.getUsersKeeps(n)}catch(s){v.error(s.message,"[Getting Users Keeps]")}}async function f(){try{await N.getMyVaults()}catch(n){v.error(n.message,"[Getting My Vaults]")}}return C(()=>{a.account.id&&(c(a.account.id),f())}),{profile:r(()=>a.account),keeps:r(()=>a.keeps),vaults:r(()=>a.myVaults),theme:r(()=>a.theme)}},components:{KeepCard:K,VaultCard:w,Modal:x}},l=c=>(M("data-v-2c09d834"),c=c(),F(),c),U={key:0,class:"container-fluid mb-5"},Y={class:"row"},z={class:"col-12 col-md-8 offset-md-2 p-3"},D=["src","alt","title"],G={key:1,src:P,alt:"",class:"cover-image rounded border border-dark"},j={class:"col-4 offset-4 d-flex flex-column align-items-center justify-content-center translate-up"},L=["alt","title"],q={class:"fs-2 pacifico"},H={class:"col-2"},J=l(()=>e("span",null,[e("i",{class:"mdi mdi-pencil"})],-1)),O=[J],Q=l(()=>e("div",{class:"col-12 col-md-8 offset-md-2"},[e("span",{class:"fs-2 fw-bold"},"Vaults")],-1)),R={key:0,class:"col-12 col-md-8 offset-md-2 text-center mb-5"},T=l(()=>e("span",{class:"fs-3"}," No Vaults Yet ",-1)),W=[T],X={class:"col-12 col-md-8 offset-md-2"},Z={class:"bricks"},$={class:"rounded hover-card"},ee=l(()=>e("div",{class:"col-12 col-md-8 offset-md-2"},[e("span",{class:"fs-2 fw-bold"},"Keeps")],-1)),se={key:1,class:"col-12 col-md-8 offset-md-2 text-center"},te=l(()=>e("span",{class:"fs-3"}," No Keeps Yet ",-1)),oe=[te],ce={class:"col-12 col-md-8 offset-md-2 mb-5"},ae={class:"bricks"},le={class:"rounded hover-card"};function ne(c,f,n,s,re,de){const g=i("VaultCard"),b=i("KeepCard"),k=i("AccountForm"),y=i("Modal");return o(),t(u,null,[s.profile?(o(),t("div",U,[e("div",Y,[e("div",z,[s.profile.coverImage?(o(),t("img",{key:0,src:s.profile.coverImage,alt:`${s.profile.name}'s cover image.'`,title:`${s.profile.name}'s cover image.`,class:"cover-image rounded border border-dark"},null,8,D)):(o(),t("img",G))]),e("div",j,[e("div",{style:S({backgroundImage:`url(${s.profile.picture})`}),alt:s.profile.name,title:`${s.profile.name}'s profile picture.'`,class:"profile-picture border border-dark elevation-1 cover-center"},null,12,L),e("span",q,m(s.profile.name),1),e("div",null,[e("span",null,m(s.vaults.length)+" Vaults | "+m(s.keeps.length)+" Keeps",1)])]),e("div",H,[e("button",{class:A(["btn",[s.theme=="light"?"btn-dark":"btn-light"]]),title:"Edit Your Account Details","data-bs-toggle":"modal","data-bs-target":"#accountForm"},O,2)]),Q,s.vaults.length==0?(o(),t("div",R,W)):p("",!0),e("div",X,[e("div",Z,[(o(!0),t(u,null,h(s.vaults,_=>(o(),t("div",$,[d(g,{vault:_},null,8,["vault"])]))),256))])]),ee,s.keeps.length==0?(o(),t("div",se,oe)):p("",!0),e("div",ce,[e("div",ae,[(o(!0),t(u,null,h(s.keeps,_=>(o(),t("div",le,[d(b,{keep:_},null,8,["keep"])]))),256))])])])])):p("",!0),d(y,{id:"accountForm"},{default:I(()=>[d(k)]),_:1})],64)}const me=V(E,[["render",ne],["__scopeId","data-v-2c09d834"]]);export{me as default};