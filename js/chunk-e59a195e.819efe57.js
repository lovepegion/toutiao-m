(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e59a195e"],{"2bd1":function(e,t,n){"use strict";n("db96")},"9ed6":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login-container"},[n("van-nav-bar",{staticClass:"app-nav-bar",attrs:{title:"登录","left-arrow":""},on:{"click-left":function(t){return e.$router.back()}}}),n("van-form",{ref:"login-form",attrs:{"show-error":!1,"show-error-message":!1,"validate-first":""},on:{submit:e.onLogin,failed:e.onFailed}},[n("van-field",{attrs:{name:"mobile","icon-prefix":"toutiao","left-icon":"shouji",placeholder:"请输入手机号",rules:e.formRules.phone},model:{value:e.user.phone,callback:function(t){e.$set(e.user,"phone",t)},expression:"user.phone"}}),n("van-field",{attrs:{name:"password",type:"password",maxlength:"18","left-icon":"bag-o",placeholder:"请输入6-18位密码",rules:e.formRules.password},model:{value:e.user.password,callback:function(t){e.$set(e.user,"password",t)},expression:"user.password"}}),n("div",{staticClass:"login-btn-wraper"},[n("van-button",{staticClass:"login-btn",attrs:{type:"info",block:""}},[e._v("登录")]),n("br")],1)],1),n("div",{staticClass:"login-btn-wraper"},[n("van-button",{staticClass:"login-btn",attrs:{type:"info",block:"",to:"/register"}},[e._v("去注册")])],1)],1)},r=[],a=n("1da1"),s=(n("96cf"),n("c24f")),c=n("5d2d"),u={name:"LoginIndex",data:function(){return{user:{phone:"",password:""},formRules:{phone:[{required:!0,message:"请输入手机号"},{pattern:/^1[3|5|7|8|9]\d{9}$/,message:"手机号格式错误"}],password:[{required:!0,message:"请输入密码"},{pattern:/^[\da-zA-Z~!@#$%^&*]{6,18}/,message:"密码格式错误"}]}}},methods:{onLogin:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var n,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.$store.state.user.phone=e.user.phone,e.$store.state.user.password=e.user.password,e.$toast.loading({message:"登录中...",fobidClick:!0,duration:3e3}),t.prev=3,t.next=6,Object(s["g"])(e.user);case 6:n=t.sent,o=n.data,console.log(o),e.$toast.success("登录成功"),e.$store.state.user.token=o.token,Object(c["c"])("token",o.token),e.$store.state.profile=o.profile,Object(c["c"])("profile",o.profile),e.$store.commit("removeCachePages","LayoutIndex"),e.$router.push(e.$route.query.redirect||"/"),t.next=23;break;case 18:t.prev=18,t.t0=t["catch"](3),console.log(t.t0),console.log("登录失败"),e.$toast.fail("登录失败");case 23:case"end":return t.stop()}}),t,null,[[3,18]])})))()},onFailed:function(e){console.log(e),e.errors[0]&&this.$toast({message:e.errors[0].message,position:"top"})}}},i=u,l=(n("2bd1"),n("2877")),d=Object(l["a"])(i,o,r,!1,null,"4fd602c0",null);t["default"]=d.exports},c24f:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return s})),n.d(t,"i",(function(){return c})),n.d(t,"g",(function(){return u})),n.d(t,"d",(function(){return i})),n.d(t,"f",(function(){return l})),n.d(t,"h",(function(){return d}));n("99af");var o=n("b775"),r=function(e){return Object(o["a"])({method:"GET",url:"/cellphone/existence/check?phone=".concat(e)})},a=function(e){return Object(o["a"])({method:"GET",url:"/captcha/sent?phone=".concat(e)})},s=function(e){return Object(o["a"])({method:"GET",url:"/captcha/verify?phone=".concat(e.phone,"&captcha=").concat(e.captcha)})},c=function(e){return Object(o["a"])({method:"GET",url:"/register/cellphone?phone=".concat(e.phone,"&password=").concat(e.password,"&captcha=").concat(e.captcha,"&nickname=").concat(e.nickname)})},u=function(e){return Object(o["a"])({method:"GET",url:"/login/cellphone?phone=".concat(e.phone,"&password=").concat(e.password)})},i=function(e){return Object(o["a"])({method:"GET",url:"/user/detail?uid=".concat(e)})},l=function(e){return Object(o["a"])({method:"GET",url:"/user/follows?uid=".concat(e)})},d=function(e){return Object(o["a"])({method:"GET",url:"/comment?t=".concat(e.t,"&type=").concat(e.type,"&id=").concat(e.id,"&content=").concat(e.content)})}},db96:function(e,t,n){}}]);
//# sourceMappingURL=chunk-e59a195e.819efe57.js.map