import{_ as F}from"./C95bqZU5.js";import{_ as q}from"./CrhgAcVW.js";import{m as z,p as g,o as s,c as m,a as l,t as f,u as t,v as w,I as E,_ as A,s as $,n as M,b as T,K as G,L as H,q as j,F as K,y as J,z as O}from"./Czt5zaSC.js";import{u as D}from"./DiFsIU2o.js";import{u as R}from"./4q8ORZsQ.js";import"./BtEBIAU1.js";const Q="data:image/svg+xml,%3csvg%20width='18'%20height='18'%20viewBox='0%200%2018%2018'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M9.4043%202.6543L15.7499%208.99995L9.4043%2015.3456'%20stroke='%23414141'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M15.7499%209L2.25%209'%20stroke='%23414141'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e",U="data:image/svg+xml,%3csvg%20width='18'%20height='18'%20viewBox='0%200%2018%2018'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M9.4043%202.6543L15.7499%208.99995L9.4043%2015.3456'%20stroke='%238327cb'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M15.7499%209L2.25%209'%20stroke='%238327cb'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e",W=["disabled"],X={class:"button-text"},Y=["src"],Z=z({__name:"Primary",props:{label:{},type:{},disabled:{type:Boolean},icon:{}},setup(y){const o=y,_=g(()=>o.icon==="arrow-right"?o.type==="secondary"?U:Q:null),e=g(()=>`button button--${o.type||"primary"}`);return(k,c)=>(s(),m("button",{class:E(["ripple",t(e)]),disabled:o.disabled},[l("p",X,f(o.label),1),t(_)?(s(),m("img",{key:0,alt:"icon",src:t(_),class:"icon"},null,8,Y)):w("",!0)],10,W))}}),ee=A(Z,[["__scopeId","data-v-a5afe990"]]),te={class:"main"},oe={class:"content-wrapper"},ne={class:"info-section"},se={class:"categories-overview"},ae={class:"title"},ie={class:"description"},re=z({__name:"index",setup(y){const{getBuildingBlockCategories:o}=D(),{getStaticPage:_}=R(),{locale:e,buildingBlockCategories:k,banner:c}=$(D()),{pages:a}=$(R());M(o),M(async()=>_("home"));const u=g(()=>{var h,d,p,n,x,B,L,C,P,S;if(!a.value.home)return{title:null,content:null};const i=(h=a.value.home)==null?void 0:h.title[e.value],r=(p=(d=a.value.home)==null?void 0:d.content)==null?void 0:p.map(V=>V[e.value]),b={media:(n=a.value.home.hero)==null?void 0:n.media,title:(x=a.value.home.hero)==null?void 0:x.title[e.value],description:(B=a.value.home.hero)==null?void 0:B.description[e.value]},v={title:(L=c.value)==null?void 0:L.title[e.value],description:(C=c.value)==null?void 0:C.description[e.value],action:{label:(P=c.value)==null?void 0:P.action.label[e.value],url:(S=c.value)==null?void 0:S.action.url}};return{title:i,content:r,hero:b,banner:v}}),I=g(()=>k.value?k.value.map(({title:i,description:r})=>({title:i[e.value],description:r[e.value]})):[]),N={fr:"découvrir tous les blocs de construction",en:"discover all building blocks",nl:";ontdek alle bouwstenen"};return(i,r)=>{var d,p;const b=F,v=q,h=ee;return s(),m("main",te,[T(b,G(H(t(u).hero)),null,16),l("div",oe,[l("div",ne,[(d=t(u).content)!=null&&d.length?(s(),j(v,{key:0,html:"",title:" ",description:t(u).content[0]},null,8,["description"])):w("",!0),T(h,{label:N[t(e)],icon:"arrow-right",class:"action",type:"primary",onClick:r[0]||(r[0]=n=>("navigateTo"in i?i.navigateTo:t(O))("/building-blocks"))},null,8,["label"])]),l("div",se,[(p=t(u).content)!=null&&p.length?(s(),j(v,{key:0,html:"",title:" ",description:t(u).content[1]},null,8,["description"])):w("",!0),(s(!0),m(K,null,J(t(I),n=>(s(),m("div",{key:n.title,class:"card"},[l("h2",ae,f(n.title),1),l("p",ie,f(n.description),1)]))),128))])])])}}}),_e=A(re,[["__scopeId","data-v-f0ec78f8"]]);export{_e as default};