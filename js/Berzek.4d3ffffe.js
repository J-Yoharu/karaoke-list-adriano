(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Berzek"],{"0111":function(t,e,r){"use strict";r("d81d"),r("a434"),r("d3b7"),r("ac1f"),r("25f0"),r("5319"),r("498a");var a=r("2909"),n=(r("96cf"),r("1da1"));e["a"]={methods:{valid:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"raf",r=localStorage[e];if(void 0===r||null===r)return console.log("não existe bd salvo, criando bd local..."),void this.loadSongs(e);this.$axios.get("./bd_".concat(e,".json")).then((function(a){if(a.data.data.length!=JSON.parse(r).length)return localStorage.removeItem(e),void t.loadSongs(e)})),this.getCurrentVersion(e),console.log("existe bd local, validando versão...")},loadSongs:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:e.loading=!0,e.$axios("./bd_".concat(t,".json")).then((function(r){e.db=r.data.data.map((function(r){return{cantor:e.textFormat(r.cantor),titulo:e.textFormat(r.titulo),cod:e.textFormat(r.cod),favorite:!1,type:t}})),localStorage[t]=JSON.stringify(e.db),localStorage["".concat(t,"_version")]=r.data.version})).finally((function(){e.loading=!1}));case 2:case"end":return r.stop()}}),r)})))()},textFormat:function(t){return"number"==typeof t&&(t=t.toString()),t.normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim()},compareAndUpdate:function(t,e){return t.push.apply(t,Object(a["a"])(e.splice(t.length,e.length))),t},getCurrentVersion:function(t){var e=this;this.$axios("./bd_".concat(t,".json")).then((function(r){var a=localStorage["".concat(t,"_version")];return void 0===a||null===a?(localStorage["".concat(t,"_version")]=r.data.version,void e.updateDb(r.data.data,t)):r.data.version==localStorage["".concat(t,"_version")]?(console.log("TÁ ATUALIZADO SEU DB!"),void(e.db=JSON.parse(localStorage[t]))):(console.log("não tá atualizado seu bd, vamos atualizar..."),localStorage["".concat(t,"_version")]=r.data.version,e.updateDb(r.data.data,t),void console.log("Atualizado."))}))},updateDb:function(t,e){var r=this.compareAndUpdate(JSON.parse(localStorage[e]),t);localStorage["".concat(e,"_version")]=JSON.stringify(r),this.db=JSON.parse(localStorage[e])}}}},"21af":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-row",[a("v-col",{staticClass:"d-flex justify-center",attrs:{cols:"12"}},[a("img",{staticStyle:{width:"30vw"},attrs:{src:r("bca0"),"max-width":"100",alt:"Logo videoke Augusto"}})]),a("v-col",{attrs:{cols:"12"}},[a("List",{attrs:{db:t.db,type:"berzek",loadLastMusics:!1}}),t.loading?a("div",{staticClass:"d-flex justify-center mt-10"},[a("v-progress-circular",{attrs:{indeterminate:"",color:"primary"}})],1):t._e()],1)],1)},n=[],i=(r("d3b7"),r("0111")),o={mixins:[i["a"]],data:function(){return{db:[],loading:!1}},components:{List:function(){return Promise.all([r.e("chunk-6447c429"),r.e("chunk-29a72536"),r.e("chunk-538fd2be")]).then(r.bind(null,"2e90"))}},created:function(){this.valid("berzek")}},s=o,c=r("2877"),l=r("6544"),u=r.n(l),d=r("62ad"),h=r("490a"),f=r("0fd9"),v=Object(c["a"])(s,a,n,!1,null,null,null);e["default"]=v.exports;u()(v,{VCol:d["a"],VProgressCircular:h["a"],VRow:f["a"]})},2909:function(t,e,r){"use strict";r.d(e,"a",(function(){return c}));var a=r("6b75");function n(t){if(Array.isArray(t))return Object(a["a"])(t)}r("a4d3"),r("e01a"),r("d28b"),r("a630"),r("d3b7"),r("3ca3"),r("ddb0");function i(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}var o=r("06c5");function s(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(t){return n(t)||i(t)||Object(o["a"])(t)||s()}},"490a":function(t,e,r){"use strict";r("99af"),r("a9e3"),r("8d4f");var a=r("a9ad"),n=r("80d2");e["a"]=a["a"].extend({name:"v-progress-circular",props:{button:Boolean,indeterminate:Boolean,rotate:{type:[Number,String],default:0},size:{type:[Number,String],default:32},width:{type:[Number,String],default:4},value:{type:[Number,String],default:0}},data:function(){return{radius:20}},computed:{calculatedSize:function(){return Number(this.size)+(this.button?8:0)},circumference:function(){return 2*Math.PI*this.radius},classes:function(){return{"v-progress-circular--indeterminate":this.indeterminate,"v-progress-circular--button":this.button}},normalizedValue:function(){return this.value<0?0:this.value>100?100:parseFloat(this.value)},strokeDashArray:function(){return Math.round(1e3*this.circumference)/1e3},strokeDashOffset:function(){return(100-this.normalizedValue)/100*this.circumference+"px"},strokeWidth:function(){return Number(this.width)/+this.size*this.viewBoxSize*2},styles:function(){return{height:Object(n["e"])(this.calculatedSize),width:Object(n["e"])(this.calculatedSize)}},svgStyles:function(){return{transform:"rotate(".concat(Number(this.rotate),"deg)")}},viewBoxSize:function(){return this.radius/(1-Number(this.width)/+this.size)}},methods:{genCircle:function(t,e){return this.$createElement("circle",{class:"v-progress-circular__".concat(t),attrs:{fill:"transparent",cx:2*this.viewBoxSize,cy:2*this.viewBoxSize,r:this.radius,"stroke-width":this.strokeWidth,"stroke-dasharray":this.strokeDashArray,"stroke-dashoffset":e}})},genSvg:function(){var t=[this.indeterminate||this.genCircle("underlay",0),this.genCircle("overlay",this.strokeDashOffset)];return this.$createElement("svg",{style:this.svgStyles,attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"".concat(this.viewBoxSize," ").concat(this.viewBoxSize," ").concat(2*this.viewBoxSize," ").concat(2*this.viewBoxSize)}},t)},genInfo:function(){return this.$createElement("div",{staticClass:"v-progress-circular__info"},this.$slots.default)}},render:function(t){return t("div",this.setTextColor(this.color,{staticClass:"v-progress-circular",attrs:{role:"progressbar","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":this.indeterminate?void 0:this.normalizedValue},class:this.classes,style:this.styles,on:this.$listeners}),[this.genSvg(),this.genInfo()])}})},"8d4f":function(t,e,r){},bca0:function(t,e,r){t.exports=r.p+"img/Logo.62c7f3d1.png"}}]);
//# sourceMappingURL=Berzek.4d3ffffe.js.map