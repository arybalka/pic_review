(function(e){function t(t){for(var i,s,a=t[0],c=t[1],l=t[2],p=0,h=[];p<a.length;p++)s=a[p],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&h.push(o[s][0]),o[s]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(e[i]=c[i]);u&&u(t);while(h.length)h.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],i=!0,a=1;a<n.length;a++){var c=n[a];0!==o[c]&&(i=!1)}i&&(r.splice(t--,1),e=s(s.s=n[0]))}return e}var i={},o={app:0},r=[];function s(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=i,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(n,i,function(t){return e[t]}.bind(null,i));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var l=0;l<a.length;l++)t(a[l]);var u=c;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},2395:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[e.image_url?[n("ReviewablePicture",{attrs:{src:e.image_url,saved_pins:e.pins,"image-width":1200,"image-height":1e3},on:{save:e.saveProject}})]:e._e()],2)},r=[],s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{wrapper:!0,"dialog-mode":e.show_add_note}},[n("link",{attrs:{rel:"stylesheet",href:"https://cdn.materialdesignicons.com/4.9.95/css/materialdesignicons.min.css"}}),n("div",{staticClass:"tool"},[n("div",{staticClass:"tools-panel"},[n("a",{class:{mdi:!0,"mdi-arrow-top-left":!0,active:"select"===e.active_tool},on:{click:function(t){return e.useTool("select")}}}),n("a",{class:{mdi:!0,"mdi-pin-outline":!0,active:"pin"===e.active_tool},on:{click:function(t){return e.useTool("pin")}}}),n("a",{class:{mdi:!0,"mdi-selection-drag":!0,active:"rect"===e.active_tool},on:{click:function(t){return e.useTool("rect")}}}),n("a",{class:{mdi:!0,"mdi-shape-polygon-plus":!0,active:"poly"===e.active_tool},on:{click:function(t){return e.useTool("poly")}}})]),n("div",{staticClass:"viewport",style:{width:e.imageWidth+"px"}},[n("canvas",{ref:"canvas",attrs:{width:.8*e.imageWidth,height:Math.round(.8*e.imageWidth*(e.picture?e.picture.height/e.picture.width:1))},on:{click:e.onClick,mousemove:e.onMouseMove}}),n("div",{staticClass:"notes"},e._l(e.pins,(function(t){return n("div",{class:{note:!0,active:null!=e.active_pin&&e.active_pin===t},on:{mousemove:function(n){return e.noteMouseMove(t)}}},[n("div",{staticClass:"note-author"},[n("span",{domProps:{textContent:e._s(t.author+":")}}),n("a",{staticClass:"mdi mdi-delete",on:{click:function(n){return e.removeNote(t)}}})]),n("div",{staticClass:"note-text",domProps:{textContent:e._s(t.note)}})])})),0)])]),n("div",{staticClass:"add-pin-wrapper"},[n("div",{staticClass:"add-pin-box"},[n("div",{staticClass:"title"},[e._v(" Add Note ")]),n("div",[n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.add_note_text,expression:"add_note_text"}],attrs:{placeholder:"Note Text"},domProps:{value:e.add_note_text},on:{input:function(t){t.target.composing||(e.add_note_text=t.target.value)}}})]),n("div",[n("compact-picker",{model:{value:e.selected_color,callback:function(t){e.selected_color=t},expression:"selected_color"}})],1),n("div",{staticClass:"actions"},[n("button",{on:{click:function(t){return e.createNote()}}},[e._v("Create")])])])])])},a=[],c=(n("99af"),n("cb29"),n("4de4"),n("4160"),n("a9e3"),n("d3b7"),n("159b"),n("2909")),l=n("b85c"),u=(n("96cf"),n("1da1")),p=n("7e84"),h=n("45eb"),d=n("262e"),f=n("2caf"),v=n("d4ec"),_=n("bee2"),y=n("c345"),m="#fa28ff",b="#ffe500";function k(e,t,n,i,o){e.beginPath(),e.moveTo(t.x,t.y),e.lineTo(t.x,n.y),e.lineTo(n.x,n.y),e.lineTo(n.x,t.y),e.lineTo(t.x,t.y),e.lineWidth=i,e.strokeStyle=o,e.stroke()}function x(e,t,n,i,o,r){e.beginPath(),t.length>1&&(t.forEach((function(t,n){0===n?e.moveTo(t.x,t.y):e.lineTo(t.x,t.y)})),n&&e.lineTo(t[0].x,t[0].y)),e.lineWidth=o,e.strokeStyle=r,e.stroke(),!n&&t.length>0&&g(e,t[0],i,o,"#ffffff",r)}function g(e,t,n,i,o,r){e.beginPath(),e.arc(t.x,t.y,n,0,2*Math.PI,!1),e.fillStyle=o,e.fill(),e.lineWidth=i,e.strokeStyle=r,e.stroke()}function w(e,t,n,i,o){e.beginPath(),e.moveTo(t.x-n,t.y),e.lineTo(t.x+n,t.y),e.moveTo(t.x,t.y-n),e.lineTo(t.x,t.y+n),e.lineWidth=i,e.strokeStyle=o,e.stroke()}var j=function(){function e(t,n,i,o){Object(v["a"])(this,e),this.color=t,this.author=n,this.note=i,this.click_callback=o,this.base_color=null,this.is_mouse_inside=!1}return Object(_["a"])(e,[{key:"render",value:function(e){}},{key:"isInside",value:function(e,t){}},{key:"asJSON",value:function(){}},{key:"onClick",value:function(e,t){this.click_callback(this,e,t)}},{key:"onMouseInside",value:function(e,t){var n=this.is_mouse_inside;return this.is_mouse_inside=!0,!n&&(this.color=b,!0)}},{key:"onMouseOutside",value:function(e,t){var n=this.is_mouse_inside;return this.is_mouse_inside=!1,!!n&&(this.color=this.base_color,!0)}},{key:"makeActive",value:function(){return!this.is_mouse_inside&&(this.is_mouse_inside=!0,this.color=b,!0)}},{key:"makeInactive",value:function(){this.is_mouse_inside=!1,this.color=this.base_color}}]),e}(),O=function(e){Object(d["a"])(n,e);var t=Object(f["a"])(n);function n(e,i,o,r,s,a,c){var l;return Object(v["a"])(this,n),l=t.call(this,r,s,a,c),l.base_color=r,l.x=e,l.y=i,l.radius=o,l}return Object(_["a"])(n,[{key:"render",value:function(e){Object(h["a"])(Object(p["a"])(n.prototype),"render",this).call(this),g(e,{x:this.x,y:this.y},this.radius,5,"#ffffff",this.color)}},{key:"isInside",value:function(e,t){var n=e-this.x,i=t-this.y;return n*n+i*i<=this.radius*this.radius}},{key:"asJSON",value:function(){return{type:"point",color:this.color,author:this.author,note:this.note,x:this.x,y:this.y,radius:this.radius}}}]),n}(j),C=function(e){Object(d["a"])(n,e);var t=Object(f["a"])(n);function n(e,i,o,r,s,a){var c;return Object(v["a"])(this,n),c=t.call(this,o,r,s,a),c.base_color=o,c.p1=e,c.p2=i,c}return Object(_["a"])(n,[{key:"render",value:function(e){Object(h["a"])(Object(p["a"])(n.prototype),"render",this).call(this),k(e,this.p1,this.p2,2,this.color)}},{key:"isInside",value:function(e,t){return e>=Math.min(this.p1.x,this.p2.x)&&t>=Math.min(this.p1.y,this.p2.y)&&e<=Math.max(this.p1.x,this.p2.x)&&t<=Math.max(this.p1.y,this.p2.y)}},{key:"asJSON",value:function(){return{type:"rect",color:this.color,author:this.author,note:this.note,p1:this.p1,p2:this.p2}}}]),n}(j),P=function(e){Object(d["a"])(n,e);var t=Object(f["a"])(n);function n(e,i,o,r,s,a){var c;return Object(v["a"])(this,n),c=t.call(this,o,r,s,a),c.base_color=o,c.points=e,c.close_radius=i,c}return Object(_["a"])(n,[{key:"render",value:function(e){Object(h["a"])(Object(p["a"])(n.prototype),"render",this).call(this),x(e,this.points,!0,10,2,this.color)}},{key:"isInside",value:function(e,t){for(var n=!1,i=0,o=this.points.length-1;i<this.points.length;o=i++){var r=this.points[i],s=this.points[o];r.y>t!==s.y>t&&e<(s.x-r.x)*(t-r.y)/(s.y-r.y)+r.x&&(n=!n)}return n}},{key:"asJSON",value:function(){return{type:"poly",color:this.color,author:this.author,note:this.note,points:this.points}}}]),n}(j),M={name:"ReviewablePicture",components:{"compact-picker":y["Compact"]},props:{src:String,imageWidth:{type:Number,default:0,required:!0},imageHeight:{type:Number,default:0,required:!0},saved_pins:{type:Array,default:[],required:!1}},data:function(){return{context:null,picture:null,selected_color:{hex:m},active_tool:"select",active_pin:null,rect_p1:null,poly_points:null,poly_first_point:null,show_add_note:!1,pins:[],ask_for_note_resolve:null,add_note_text:""}},methods:{loadPicture:function(e){return Object(u["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t,n){var i=new Image;i.addEventListener("load",(function(){return t(i)})),i.addEventListener("error",(function(e){return n(e)})),i.src=e})));case 1:case"end":return t.stop()}}),t)})))()},initCanvas:function(e){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function n(){var i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=t.$refs.canvas,t.context=i.getContext("2d"),n.next=4,t.loadPicture(e);case 4:t.picture=n.sent,console.log("Loaded picture",t.picture.width,t.picture.height),t.render();case 7:case"end":return n.stop()}}),n)})))()},render:function(){if(this.picture){var e=.8*this.imageWidth,t=this.picture.height/this.picture.width,n=e*t;this.context.drawImage(this.picture,0,0,e,n);var i,o=Object(l["a"])(this.pins);try{for(o.s();!(i=o.n()).done;){var r=i.value;r.render(this.context)}}catch(s){o.e(s)}finally{o.f()}}},getPins:function(){var e,t=[],n=Object(l["a"])(this.pins);try{for(n.s();!(e=n.n()).done;){var i=e.value;t.push(i.asJSON())}}catch(o){n.e(o)}finally{n.f()}return t},save:function(){this.$emit("save",this.getPins())},onClick:function(e){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function n(){var i,o,r,s,a,c,u,p,h,d,f;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:console.log(e),n.t0=t.active_tool,n.next="select"===n.t0?4:"pin"===n.t0?9:"rect"===n.t0?17:"poly"===n.t0?30:52;break;case 4:t.rect_p1=null,i=Object(l["a"])(t.pins);try{for(i.s();!(o=i.n()).done;)r=o.value,r.isInside(e.offsetX,e.offsetY)&&r.onClick(e.offsetX,e.offsetY)}catch(v){i.e(v)}finally{i.f()}return t.render(),n.abrupt("break",52);case 9:return t.rect_p1=null,n.next=12,t.askForNote();case 12:return s=n.sent,t.pins.push(new O(e.offsetX,e.offsetY,10,t.selected_color["hex"],"Myself",s,t.pinClicked)),t.save(),t.render(),n.abrupt("break",52);case 17:if(null===t.rect_p1){n.next=27;break}return a={x:e.offsetX,y:e.offsetY},n.next=21,t.askForNote();case 21:c=n.sent,t.pins.push(new C(t.rect_p1,a,t.selected_color["hex"],"Myself",c,t.rectClicked)),t.save(),t.rect_p1=null,n.next=28;break;case 27:t.rect_p1={x:e.offsetX,y:e.offsetY};case 28:return t.render(),n.abrupt("break",52);case 30:if(u={x:e.offsetX,y:e.offsetY},null!==t.poly_first_point){n.next=36;break}t.poly_first_point=u,t.poly_points=[u],n.next=50;break;case 36:if(p=t.poly_first_point.x-u.x,h=t.poly_first_point.y-u.y,d=10,console.log(p,h),!(p*p+h*h<=d*d)){n.next=49;break}return n.next=42,t.askForNote();case 42:f=n.sent,t.pins.push(new P(t.poly_points,d,t.selected_color["hex"],"Myself",f,t.polyClicked)),t.save(),t.poly_first_point=null,t.poly_points=null,n.next=50;break;case 49:t.poly_points.push(u);case 50:return t.render(),n.abrupt("break",52);case 52:case"end":return n.stop()}}),n)})))()},onMouseMove:function(e){var t={x:e.offsetX,y:e.offsetY};return"rect"===this.active_tool&&null!==this.rect_p1?(this.render(),void k(this.context,this.rect_p1,t,1,"#ff0000")):"poly"===this.active_tool&&null!==this.poly_points?(this.render(),void x(this.context,[].concat(Object(c["a"])(this.poly_points),[t]),!1,10,1,"#ff0000")):("pin"===this.active_tool?(this.render(),g(this.context,t,5,3,"#ffffff","#ff0000")):("rect"===this.active_tool||"poly"===this.active_tool)&&(this.render(),w(this.context,t,10,1,"#ff0000")),void this.activatePins(e.offsetX,e.offsetY))},activatePins:function(e,t){var n,i=!1,o=Object(l["a"])(this.pins);try{for(o.s();!(n=o.n()).done;){var r=n.value;if(r.isInside(e,t)){var s=r.onMouseInside(e,t);i=s||i,s&&(this.active_pin=r)}else{var a=r.onMouseOutside(e,t);i=a||i,a&&(this.active_pin=null)}}}catch(c){o.e(c)}finally{o.f()}i&&this.render()},pinClicked:function(e,t,n){console.log("Pin Point Clicked",this)},rectClicked:function(e,t,n){console.log("Rect Clicked",this)},polyClicked:function(e,t,n){console.log("Poly Clicked",this)},useTool:function(e){this.active_tool=e},noteMouseMove:function(e){var t,n=!1,i=Object(l["a"])(this.pins);try{for(i.s();!(t=i.n()).done;){var o=t.value;o===e?(this.active_pin=e,n=e.makeActive()||n):o.makeInactive()}}catch(r){i.e(r)}finally{i.f()}n&&this.render()},removeNote:function(e){this.pins=this.pins.filter((function(t){return t!==e})),this.save(),this.render()},askForNote:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.show_add_note=!0,e.add_note_text="",t.abrupt("return",new Promise((function(t,n){e.ask_for_note_resolve=t})));case 3:case"end":return t.stop()}}),t)})))()},createNote:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:console.log("Save note"),e.ask_for_note_resolve(e.add_note_text),e.show_add_note=!1;case 3:case"end":return t.stop()}}),t)})))()},loadPins:function(e){this.pins=[];var t,n=Object(l["a"])(e);try{for(n.s();!(t=n.n()).done;){var i=t.value,o=null;switch(i.type){case"point":o=new O(i.x,i.y,i.radius,i.color,i.author,i.note,this.pinClicked);break;case"rect":o=new C(i.p1,i.p2,i.color,i.author,i.note,this.pinClicked);break;case"poly":o=new P(i.points,i.radius,i.color,i.author,i.note,this.pinClicked);break}o&&this.pins.push(o)}}catch(r){n.e(r)}finally{n.f()}}},mounted:function(){this.initCanvas(this.src),this.loadPins(this.saved_pins)},computed:{},watch:{picture:function(){var e=this;console.log("Invalidate canvas"),window.setTimeout((function(){e.render()}))}}},T=M,N=(n("ba65"),n("2877")),S=Object(N["a"])(T,s,a,!1,null,"4c988100",null),I=S.exports,R=n("bc3a"),W=n.n(R),X={name:"App",components:{ReviewablePicture:I},data:function(){return{api_entry_point:null,project_id:null,image_url:null,pins:[]}},mounted:function(){var e=this;this.api_entry_point=window.globs.api_entry_point,this.project_id=window.globs.project_id,W.a.get(this.api_entry_point+"?project_id="+this.project_id,{crossdomain:!0}).then((function(t){e.image_url=t.data.image_url,e.pins=t.data.pins}))},methods:{saveProject:function(e){console.log("saveProject",e),W.a.put(this.api_entry_point+"?project_id="+this.project_id,e)}}},Y=X,J=(n("7c55"),Object(N["a"])(Y,o,r,!1,null,null,null)),A=J.exports;i["a"].config.productionTip=!1,new i["a"]({render:function(e){return e(A)}}).$mount("#app")},"7c55":function(e,t,n){"use strict";var i=n("2395"),o=n.n(i);o.a},ba65:function(e,t,n){"use strict";var i=n("ce6b"),o=n.n(i);o.a},ce6b:function(e,t,n){}});
//# sourceMappingURL=app.888ad267.js.map