(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-00cb127b"],{"0810":function(t,e,n){"use strict";n("3286")},3286:function(t,e,n){},"4ff4":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Searchbar"),n("div",{staticClass:"t1_wrap"},[n("span",{staticStyle:{fontWeight:"bold"}},[t._v(t._s(t.currentGroupTitle))]),n("div",{on:{click:function(e){t.isSearching=!t.isSearching}}},[n("span",[t._v("全部分类")]),n("van-icon",{attrs:{"class-prefix":"toutiao",name:"quanbu",size:"0.4rem"}})],1)]),n("div",{staticClass:"contentwrap"},[n("transition",{attrs:{name:"searchArea",appear:""}},[t.isSearching?n("div",{staticClass:"t2_wrap"},[n("van-grid",{attrs:{"column-num":6}},t._l(t.groupList,(function(t,e){return n("van-grid-item",{key:e,attrs:{text:t.name}})})),1)],1):t._e()]),n("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了"},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(20,(function(t,e){return n("van-cell",{key:e,attrs:{title:"接口地址已改变"}})})),1)],1),n("van-tabbar",{attrs:{route:""}},[n("van-tabbar-item",{attrs:{icon:"home-o",to:"/"}},[t._v("首页")]),n("van-tabbar-item",{attrs:{icon:"comment-o",to:"/radio"}},[t._v("电台")]),n("van-tabbar-item",{attrs:{icon:"video-o",to:"/vedio"}},[t._v("视频")]),n("van-tabbar-item",{attrs:{icon:"user-o",to:"/my"}},[t._v("我的")])],1)],1)},i=[],r=n("1da1"),o=(n("96cf"),n("86e1")),s=n("b3aa"),c={name:"Vedio",components:{Searchbar:o["a"]},data:function(){return{isSearching:!1,currentGroupTitle:"推荐",list:[1,2,3],loading:!1,finished:!0,offset:0,currentGroup:{id:58100,name:"现场"},groupList:[{id:58101,name:"听BGM"},{id:2100,name:"生活"},{id:2103,name:"游戏"},{id:57104,name:"ACG音"},{id:1103,name:"萌宠"},{id:9102,name:"演唱会"},{id:57105,name:"粤语现场"},{id:59101,name:"华语现场"},{id:57106,name:"欧美现场"},{id:57107,name:"韩语现场"},{id:60101,name:"日语现场"},{id:3110,name:"宅舞"},{id:3109,name:"街舞"},{id:10161,name:"民族舞"},{id:57116,name:"舞蹈教程"},{id:58113,name:"舞蹈表演"},{id:58114,name:"舞蹈现场"},{id:59118,name:"古典舞"},{id:57118,name:"中国风"},{id:59119,name:"ACG"},{id:58112,name:"MMD"},{id:57115,name:"动漫音乐"},{id:59114,name:"GMV"},{id:3107,name:"混剪"},{id:9107,name:"COS"},{id:4108,name:"动漫"},{id:3102,name:"二次元"},{id:4101,name:"娱乐"},{id:3100,name:"影视"},{id:3101,name:"综艺"}]}},methods:{onLoad:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(s["a"])({id:t.currentGroup.id,offset:t.offset});case 2:n=e.sent,a=n.data,console.log("livevedio",a);case 5:case"end":return e.stop()}}),e)})))()}}},d=c,u=(n("0810"),n("2877")),l=Object(u["a"])(d,a,i,!1,null,"856f89da",null);e["default"]=l.exports},"636e":function(t,e,n){},"86e1":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("van-nav-bar",[n("div",{staticClass:"t0-wrap",attrs:{slot:"left"},slot:"left"},[n("van-icon",{attrs:{"class-prefix":"toutiao",name:"yinleyule",size:"0.8rem",color:"red"}}),n("span",{staticClass:"t0_2-name"},[t._v("海丽音乐")])],1),n("van-button",{staticClass:"t1-button",attrs:{slot:"title",icon:"search",type:"info",round:"",to:"/search"},slot:"title"},[t._v("搜索")])],1)},i=[],r={name:"Searchbar"},o=r,s=(n("e2de"),n("2877")),c=Object(s["a"])(o,a,i,!1,null,"4871a77d",null);e["a"]=c.exports},b3aa:function(t,e,n){"use strict";n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return o}));n("99af");var a=n("b775"),i=function(t){return Object(a["a"])({method:"GET",url:"/video/url?id=".concat(t)})},r=function(t){return Object(a["a"])({method:"GET",url:"/video/group?id=".concat(t.id,"&offset=").concat(t.offset)})},o=function(t){return Object(a["a"])({method:"GET",url:"/video/detail/info?vid=".concat(t)})}},e2de:function(t,e,n){"use strict";n("636e")}}]);
//# sourceMappingURL=chunk-00cb127b.f7f7f961.js.map