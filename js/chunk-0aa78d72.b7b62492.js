(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0aa78d72"],{"7a7d":function(n,e,t){"use strict";t("ce7a")},"96bb":function(n,e,t){"use strict";t.r(e);var c=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticClass:"login-container"},[t("van-nav-bar",{staticClass:"app-nav-bar",attrs:{title:"输入昵称","left-arrow":""},on:{"click-left":function(e){return n.$router.back()}}}),t("van-form",{ref:"login-form",attrs:{"show-error":!1,"show-error-message":!1,"validate-first":""},on:{failed:n.onFailed}},[t("van-field",{attrs:{name:"nickname",maxlength:"10","left-icon":"user-circle-o",placeholder:"请输入2-10位昵称",rules:n.formRules.nickname},model:{value:n.user.nickname,callback:function(e){n.$set(n.user,"nickname",e)},expression:"user.nickname"}}),t("div",{staticClass:"login-btn-wraper"},[t("van-button",{staticClass:"login-btn",attrs:{type:"info",block:"",loading:n.isLoading},on:{click:n.onFinishRegister}},[n._v("提交注册")])],1)],1)],1)},a=[],r=t("1da1"),o=(t("96cf"),t("c24f")),s={name:"Nickname",data:function(){return{user:{nickname:""},formRules:{nickname:[{required:!0,message:"请输入昵称"},{pattern:/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_]){2,10}$/,message:"昵称格式错误"}]},isLoading:!1}},methods:{onFailed:function(n){console.log(n),n.errors[0]&&this.$toast({message:n.errors[0].message,position:"top"})},onFinishRegister:function(){var n=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var t,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n.$store.state.user.nickname=n.user.nickname,n.isLoading=!0,e.prev=2,e.next=5,Object(o["i"])({captcha:n.$store.state.user.captcha,phone:n.$store.state.user.phone,password:n.$store.state.user.password,nickname:n.user.nickname});case 5:t=e.sent,c=t.data,n.isLoading=!1,console.log(c),n.$toast.success("注册成功"),n.$router.push("/my"),e.next=17;break;case 13:e.prev=13,e.t0=e["catch"](2),console.log("注册失败，请稍后再试",e.t0),n.isLoading=!1;case 17:case"end":return e.stop()}}),e,null,[[2,13]])})))()}}},i=s,u=(t("7a7d"),t("2877")),l=Object(u["a"])(i,c,a,!1,null,"5b175dba",null);e["default"]=l.exports},c24f:function(n,e,t){"use strict";t.d(e,"b",(function(){return a})),t.d(e,"c",(function(){return r})),t.d(e,"a",(function(){return o})),t.d(e,"i",(function(){return s})),t.d(e,"g",(function(){return i})),t.d(e,"d",(function(){return u})),t.d(e,"f",(function(){return l})),t.d(e,"h",(function(){return d}));t("99af");var c=t("b775"),a=function(n){return Object(c["a"])({method:"GET",url:"/cellphone/existence/check?phone=".concat(n)})},r=function(n){return Object(c["a"])({method:"GET",url:"/captcha/sent?phone=".concat(n)})},o=function(n){return Object(c["a"])({method:"GET",url:"/captcha/verify?phone=".concat(n.phone,"&captcha=").concat(n.captcha)})},s=function(n){return Object(c["a"])({method:"GET",url:"/register/cellphone?phone=".concat(n.phone,"&password=").concat(n.password,"&captcha=").concat(n.captcha,"&nickname=").concat(n.nickname)})},i=function(n){return Object(c["a"])({method:"GET",url:"/login/cellphone?phone=".concat(n.phone,"&password=").concat(n.password)})},u=function(n){return Object(c["a"])({method:"GET",url:"/user/detail?uid=".concat(n)})},l=function(n){return Object(c["a"])({method:"GET",url:"/user/follows?uid=".concat(n)})},d=function(n){return Object(c["a"])({method:"GET",url:"/comment?t=".concat(n.t,"&type=").concat(n.type,"&id=").concat(n.id,"&content=").concat(n.content)})}},ce7a:function(n,e,t){}}]);
//# sourceMappingURL=chunk-0aa78d72.b7b62492.js.map