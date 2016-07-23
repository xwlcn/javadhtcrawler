//老版
(function(){
	try{
		var headLoc = document.getElementsByTagName("head").item(0);
		var style = document.createElement("link");
		style.setAttribute("type", "text/css");
		style.setAttribute("rel", "stylesheet");
		style.setAttribute("charset", "utf-8");
		style.setAttribute("href", "http://pstatic.xunlei.com/js/v2/css/xl_style.css?203");
		headLoc.appendChild(style);
	}
	catch(e){
		document.write('<link rel="stylesheet" charset="utf-8" type="text/css" href="http://pstatic.xunlei.com/js/v2/css/xl_style.css?203" />');
	}
})();

xldown = function (linkObj){
        var link = ThunderEncode(linkObj);
        OnDownloadClick(link,'',location.href,'0',2,'');
    };

// only works in non-ie
function incase_body_null(){
    try
    {
        if(document.body == undefined || document.body == null)
        {
            document.body = document.createElement('body');
        }
    }
    catch(e)
    {
    }
}
//rand thunder href attr for 360  a global var
function thunderRandomChar(len) {var x="poiuytrewqasdfghjklmnbvcxz";var rand_str="";for(var i=0;i< len;i++) {rand_str += x.charAt(Math.ceil(Math.random()*100000000)%x.length);}return rand_str;}
var thunderHrefAttr = thunderRandomChar(8);

/*
 * ! jQuery JavaScript Library v1.4.2 http://jquery.com/
 *
 * Copyright 2010, John Resig Dual licensed under the MIT or GPL Version 2
 * licenses. http://jquery.org/license
 *
 * Includes Sizzle.js http://sizzlejs.com/ Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Sat Feb 13 22:33:48 2010 -0500
 */
(function(){
var Old_jQuery = window.jQuery || '';
(function(A,w){function ma(){if(!c.isReady){try{s.documentElement.doScroll("left")}catch(a){setTimeout(ma,1);return}c.ready()}}function Qa(a,b){b.src?c.ajax({url:b.src,async:false,dataType:"script"}):c.globalEval(b.text||b.textContent||b.innerHTML||"");b.parentNode&&b.parentNode.removeChild(b)}function X(a,b,d,f,e,j){var i=a.length;if(typeof b==="object"){for(var o in b)X(a,o,b[o],f,e,d);return a}if(d!==w){f=!j&&f&&c.isFunction(d);for(o=0;o<i;o++)e(a[o],b,f?d.call(a[o],o,e(a[o],b)):d,j);return a}return i?
e(a[0],b):w}function J(){return(new Date).getTime()}function Y(){return false}function Z(){return true}function na(a,b,d){d[0].type=a;return c.event.handle.apply(b,d)}function oa(a){var b,d=[],f=[],e=arguments,j,i,o,k,n,r;i=c.data(this,"events");if(!(a.liveFired===this||!i||!i.live||a.button&&a.type==="click")){a.liveFired=this;var u=i.live.slice(0);for(k=0;k<u.length;k++){i=u[k];i.origType.replace(O,"")===a.type?f.push(i.selector):u.splice(k--,1)}j=c(a.target).closest(f,a.currentTarget);n=0;for(r=
j.length;n<r;n++)for(k=0;k<u.length;k++){i=u[k];if(j[n].selector===i.selector){o=j[n].elem;f=null;if(i.preType==="mouseenter"||i.preType==="mouseleave")f=c(a.relatedTarget).closest(i.selector)[0];if(!f||f!==o)d.push({elem:o,handleObj:i})}}n=0;for(r=d.length;n<r;n++){j=d[n];a.currentTarget=j.elem;a.data=j.handleObj.data;a.handleObj=j.handleObj;if(j.handleObj.origHandler.apply(j.elem,e)===false){b=false;break}}return b}}function pa(a,b){return"live."+(a&&a!=="*"?a+".":"")+b.replace(/\./g,"`").replace(/ /g,
"&")}function qa(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function ra(a,b){var d=0;b.each(function(){if(this.nodeName===(a[d]&&a[d].nodeName)){var f=c.data(a[d++]),e=c.data(this,f);if(f=f&&f.events){delete e.handle;e.events={};for(var j in f)for(var i in f[j])c.event.add(this,j,f[j][i],f[j][i].data)}}})}function sa(a,b,d){var f,e,j;b=b&&b[0]?b[0].ownerDocument||b[0]:s;if(a.length===1&&typeof a[0]==="string"&&a[0].length<512&&b===s&&!ta.test(a[0])&&(c.support.checkClone||!ua.test(a[0]))){e=
true;if(j=c.fragments[a[0]])if(j!==1)f=j}if(!f){f=b.createDocumentFragment();c.clean(a,b,f,d)}if(e)c.fragments[a[0]]=j?f:1;return{fragment:f,cacheable:e}}function K(a,b){var d={};c.each(va.concat.apply([],va.slice(0,b)),function(){d[this]=a});return d}function wa(a){return"scrollTo"in a&&a.document?a:a.nodeType===9?a.defaultView||a.parentWindow:false}var c=function(a,b){return new c.fn.init(a,b)},Ra=A.jQuery,Sa=A.$,s=A.document,T,Ta=/^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,Ua=/^.[^:#\[\.,]*$/,Va=/\S/,
Wa=/^(\s|\u00A0)+|(\s|\u00A0)+$/g,Xa=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,P=navigator.userAgent,xa=false,Q=[],L,$=Object.prototype.toString,aa=Object.prototype.hasOwnProperty,ba=Array.prototype.push,R=Array.prototype.slice,ya=Array.prototype.indexOf;c.fn=c.prototype={init:function(a,b){var d,f;if(!a)return this;if(a.nodeType){this.context=this[0]=a;this.length=1;return this}if(a==="body"&&!b){this.context=s;this[0]=s.body;this.selector="body";this.length=1;return this}if(typeof a==="string")if((d=Ta.exec(a))&&
(d[1]||!b))if(d[1]){f=b?b.ownerDocument||b:s;if(a=Xa.exec(a))if(c.isPlainObject(b)){a=[s.createElement(a[1])];c.fn.attr.call(a,b,true)}else a=[f.createElement(a[1])];else{a=sa([d[1]],[f]);a=(a.cacheable?a.fragment.cloneNode(true):a.fragment).childNodes}return c.merge(this,a)}else{if(b=s.getElementById(d[2])){if(b.id!==d[2])return T.find(a);this.length=1;this[0]=b}this.context=s;this.selector=a;return this}else if(!b&&/^\w+$/.test(a)){this.selector=a;this.context=s;a=s.getElementsByTagName(a);return c.merge(this,
a)}else return!b||b.jquery?(b||T).find(a):c(b).find(a);else if(c.isFunction(a))return T.ready(a);if(a.selector!==w){this.selector=a.selector;this.context=a.context}return c.makeArray(a,this)},selector:"",jquery:"1.4.2",length:0,size:function(){return this.length},toArray:function(){return R.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this.slice(a)[0]:this[a]},pushStack:function(a,b,d){var f=c();c.isArray(a)?ba.apply(f,a):c.merge(f,a);f.prevObject=this;f.context=this.context;if(b===
"find")f.selector=this.selector+(this.selector?" ":"")+d;else if(b)f.selector=this.selector+"."+b+"("+d+")";return f},each:function(a,b){return c.each(this,a,b)},ready:function(a){c.bindReady();if(c.isReady)a.call(s,c);else Q&&Q.push(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(R.apply(this,arguments),"slice",R.call(arguments).join(","))},map:function(a){return this.pushStack(c.map(this,
function(b,d){return a.call(b,d,b)}))},end:function(){return this.prevObject||c(null)},push:ba,sort:[].sort,splice:[].splice};c.fn.init.prototype=c.fn;c.extend=c.fn.extend=function(){var a=arguments[0]||{},b=1,d=arguments.length,f=false,e,j,i,o;if(typeof a==="boolean"){f=a;a=arguments[1]||{};b=2}if(typeof a!=="object"&&!c.isFunction(a))a={};if(d===b){a=this;--b}for(;b<d;b++)if((e=arguments[b])!=null)for(j in e){i=a[j];o=e[j];if(a!==o)if(f&&o&&(c.isPlainObject(o)||c.isArray(o))){i=i&&(c.isPlainObject(i)||
c.isArray(i))?i:c.isArray(o)?[]:{};a[j]=c.extend(f,i,o)}else if(o!==w)a[j]=o}return a};c.extend({noConflict:function(a){A.$=Sa;if(a)A.jQuery=Ra;return c},isReady:false,ready:function(){if(!c.isReady){if(!s.body)return setTimeout(c.ready,13);c.isReady=true;if(Q){for(var a,b=0;a=Q[b++];)a.call(s,c);Q=null}c.fn.triggerHandler&&c(s).triggerHandler("ready")}},bindReady:function(){if(!xa){xa=true;if(s.readyState==="complete")return c.ready();if(s.addEventListener){s.addEventListener("DOMContentLoaded",
L,false);A.addEventListener("load",c.ready,false)}else if(s.attachEvent){s.attachEvent("onreadystatechange",L);A.attachEvent("onload",c.ready);var a=false;try{a=A.frameElement==null}catch(b){}s.documentElement.doScroll&&a&&ma()}}},isFunction:function(a){return $.call(a)==="[object Function]"},isArray:function(a){return $.call(a)==="[object Array]"},isPlainObject:function(a){if(!a||$.call(a)!=="[object Object]"||a.nodeType||a.setInterval)return false;if(a.constructor&&!aa.call(a,"constructor")&&!aa.call(a.constructor.prototype,
"isPrototypeOf"))return false;var b;for(b in a);return b===w||aa.call(a,b)},isEmptyObject:function(a){for(var b in a)return false;return true},error:function(a){throw a;},parseJSON:function(a){if(typeof a!=="string"||!a)return null;a=c.trim(a);if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return A.JSON&&A.JSON.parse?A.JSON.parse(a):(new Function("return "+
a))();else c.error("Invalid JSON: "+a)},noop:function(){},globalEval:function(a){if(a&&Va.test(a)){var b=s.getElementsByTagName("head")[0]||s.documentElement,d=s.createElement("script");d.type="text/javascript";if(c.support.scriptEval)d.appendChild(s.createTextNode(a));else d.text=a;b.insertBefore(d,b.firstChild);b.removeChild(d)}},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,b,d){var f,e=0,j=a.length,i=j===w||c.isFunction(a);if(d)if(i)for(f in a){if(b.apply(a[f],
d)===false)break}else for(;e<j;){if(b.apply(a[e++],d)===false)break}else if(i)for(f in a){if(b.call(a[f],f,a[f])===false)break}else for(d=a[0];e<j&&b.call(d,e,d)!==false;d=a[++e]);return a},trim:function(a){return(a||"").replace(Wa,"")},makeArray:function(a,b){b=b||[];if(a!=null)a.length==null||typeof a==="string"||c.isFunction(a)||typeof a!=="function"&&a.setInterval?ba.call(b,a):c.merge(b,a);return b},inArray:function(a,b){if(b.indexOf)return b.indexOf(a);for(var d=0,f=b.length;d<f;d++)if(b[d]===
a)return d;return-1},merge:function(a,b){var d=a.length,f=0;if(typeof b.length==="number")for(var e=b.length;f<e;f++)a[d++]=b[f];else for(;b[f]!==w;)a[d++]=b[f++];a.length=d;return a},grep:function(a,b,d){for(var f=[],e=0,j=a.length;e<j;e++)!d!==!b(a[e],e)&&f.push(a[e]);return f},map:function(a,b,d){for(var f=[],e,j=0,i=a.length;j<i;j++){e=b(a[j],j,d);if(e!=null)f[f.length]=e}return f.concat.apply([],f)},guid:1,proxy:function(a,b,d){if(arguments.length===2)if(typeof b==="string"){d=a;a=d[b];b=w}else if(b&&
!c.isFunction(b)){d=b;b=w}if(!b&&a)b=function(){return a.apply(d||this,arguments)};if(a)b.guid=a.guid=a.guid||b.guid||c.guid++;return b},uaMatch:function(a){a=a.toLowerCase();a=/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version)?[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||!/compatible/.test(a)&&/(mozilla)(?:.*? rv:([\w.]+))?/.exec(a)||[];return{browser:a[1]||"",version:a[2]||"0"}},browser:{}});P=c.uaMatch(P);if(P.browser){c.browser[P.browser]=true;c.browser.version=P.version}if(c.browser.webkit)c.browser.safari=
true;if(ya)c.inArray=function(a,b){return ya.call(b,a)};T=c(s);if(s.addEventListener)L=function(){s.removeEventListener("DOMContentLoaded",L,false);c.ready()};else if(s.attachEvent)L=function(){if(s.readyState==="complete"){s.detachEvent("onreadystatechange",L);c.ready()}};(function(){c.support={};var a=s.documentElement,b=s.createElement("script"),d=s.createElement("div"),f="script"+J();d.style.display="none";d.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
var e=d.getElementsByTagName("*"),j=d.getElementsByTagName("a")[0];if(!(!e||!e.length||!j)){c.support={leadingWhitespace:d.firstChild.nodeType===3,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/red/.test(j.getAttribute("style")),hrefNormalized:j.getAttribute("href")==="/a",opacity:/^0.55$/.test(j.style.opacity),cssFloat:!!j.style.cssFloat,checkOn:d.getElementsByTagName("input")[0].value==="on",optSelected:s.createElement("select").appendChild(s.createElement("option")).selected,
parentNode:d.removeChild(d.appendChild(s.createElement("div"))).parentNode===null,deleteExpando:true,checkClone:false,scriptEval:false,noCloneEvent:true,boxModel:null};b.type="text/javascript";try{b.appendChild(s.createTextNode("window."+f+"=1;"))}catch(i){}a.insertBefore(b,a.firstChild);if(A[f]){c.support.scriptEval=true;delete A[f]}try{delete b.test}catch(o){c.support.deleteExpando=false}a.removeChild(b);if(d.attachEvent&&d.fireEvent){d.attachEvent("onclick",function k(){c.support.noCloneEvent=
false;d.detachEvent("onclick",k)});d.cloneNode(true).fireEvent("onclick")}d=s.createElement("div");d.innerHTML="<input type='radio' name='radiotest' checked='checked'/>";a=s.createDocumentFragment();a.appendChild(d.firstChild);c.support.checkClone=a.cloneNode(true).cloneNode(true).lastChild.checked;c(function(){var k=s.createElement("div");k.style.width=k.style.paddingLeft="1px";s.body.appendChild(k);c.boxModel=c.support.boxModel=k.offsetWidth===2;s.body.removeChild(k).style.display="none"});a=function(k){var n=
s.createElement("div");k="on"+k;var r=k in n;if(!r){n.setAttribute(k,"return;");r=typeof n[k]==="function"}return r};c.support.submitBubbles=a("submit");c.support.changeBubbles=a("change");a=b=d=e=j=null}})();c.props={"for":"htmlFor","class":"className",readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",colspan:"colSpan",tabindex:"tabIndex",usemap:"useMap",frameborder:"frameBorder"};var G="jQuery"+J(),Ya=0,za={};c.extend({cache:{},expando:G,noData:{embed:true,object:true,
applet:true},data:function(a,b,d){if(!(a.nodeName&&c.noData[a.nodeName.toLowerCase()])){a=a==A?za:a;var f=a[G],e=c.cache;if(!f&&typeof b==="string"&&d===w)return null;f||(f=++Ya);if(typeof b==="object"){a[G]=f;e[f]=c.extend(true,{},b)}else if(!e[f]){a[G]=f;e[f]={}}a=e[f];if(d!==w)a[b]=d;return typeof b==="string"?a[b]:a}},removeData:function(a,b){if(!(a.nodeName&&c.noData[a.nodeName.toLowerCase()])){a=a==A?za:a;var d=a[G],f=c.cache,e=f[d];if(b){if(e){delete e[b];c.isEmptyObject(e)&&c.removeData(a)}}else{if(c.support.deleteExpando)delete a[c.expando];
else a.removeAttribute&&a.removeAttribute(c.expando);delete f[d]}}}});c.fn.extend({data:function(a,b){if(typeof a==="undefined"&&this.length)return c.data(this[0]);else if(typeof a==="object")return this.each(function(){c.data(this,a)});var d=a.split(".");d[1]=d[1]?"."+d[1]:"";if(b===w){var f=this.triggerHandler("getData"+d[1]+"!",[d[0]]);if(f===w&&this.length)f=c.data(this[0],a);return f===w&&d[1]?this.data(d[0]):f}else return this.trigger("setData"+d[1]+"!",[d[0],b]).each(function(){c.data(this,
a,b)})},removeData:function(a){return this.each(function(){c.removeData(this,a)})}});c.extend({queue:function(a,b,d){if(a){b=(b||"fx")+"queue";var f=c.data(a,b);if(!d)return f||[];if(!f||c.isArray(d))f=c.data(a,b,c.makeArray(d));else f.push(d);return f}},dequeue:function(a,b){b=b||"fx";var d=c.queue(a,b),f=d.shift();if(f==="inprogress")f=d.shift();if(f){b==="fx"&&d.unshift("inprogress");f.call(a,function(){c.dequeue(a,b)})}}});c.fn.extend({queue:function(a,b){if(typeof a!=="string"){b=a;a="fx"}if(b===
w)return c.queue(this[0],a);return this.each(function(){var d=c.queue(this,a,b);a==="fx"&&d[0]!=="inprogress"&&c.dequeue(this,a)})},dequeue:function(a){return this.each(function(){c.dequeue(this,a)})},delay:function(a,b){a=c.fx?c.fx.speeds[a]||a:a;b=b||"fx";return this.queue(b,function(){var d=this;setTimeout(function(){c.dequeue(d,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])}});var Aa=/[\n\t]/g,ca=/\s+/,Za=/\r/g,$a=/href|src|style/,ab=/(button|input)/i,bb=/(button|input|object|select|textarea)/i,
cb=/^(a|area)$/i,Ba=/radio|checkbox/;c.fn.extend({attr:function(a,b){return X(this,a,b,true,c.attr)},removeAttr:function(a){return this.each(function(){c.attr(this,a,"");this.nodeType===1&&this.removeAttribute(a)})},addClass:function(a){if(c.isFunction(a))return this.each(function(n){var r=c(this);r.addClass(a.call(this,n,r.attr("class")))});if(a&&typeof a==="string")for(var b=(a||"").split(ca),d=0,f=this.length;d<f;d++){var e=this[d];if(e.nodeType===1)if(e.className){for(var j=" "+e.className+" ",
i=e.className,o=0,k=b.length;o<k;o++)if(j.indexOf(" "+b[o]+" ")<0)i+=" "+b[o];e.className=c.trim(i)}else e.className=a}return this},removeClass:function(a){if(c.isFunction(a))return this.each(function(k){var n=c(this);n.removeClass(a.call(this,k,n.attr("class")))});if(a&&typeof a==="string"||a===w)for(var b=(a||"").split(ca),d=0,f=this.length;d<f;d++){var e=this[d];if(e.nodeType===1&&e.className)if(a){for(var j=(" "+e.className+" ").replace(Aa," "),i=0,o=b.length;i<o;i++)j=j.replace(" "+b[i]+" ",
" ");e.className=c.trim(j)}else e.className=""}return this},toggleClass:function(a,b){var d=typeof a,f=typeof b==="boolean";if(c.isFunction(a))return this.each(function(e){var j=c(this);j.toggleClass(a.call(this,e,j.attr("class"),b),b)});return this.each(function(){if(d==="string")for(var e,j=0,i=c(this),o=b,k=a.split(ca);e=k[j++];){o=f?o:!i.hasClass(e);i[o?"addClass":"removeClass"](e)}else if(d==="undefined"||d==="boolean"){this.className&&c.data(this,"__className__",this.className);this.className=
this.className||a===false?"":c.data(this,"__className__")||""}})},hasClass:function(a){a=" "+a+" ";for(var b=0,d=this.length;b<d;b++)if((" "+this[b].className+" ").replace(Aa," ").indexOf(a)>-1)return true;return false},val:function(a){if(a===w){var b=this[0];if(b){if(c.nodeName(b,"option"))return(b.attributes.value||{}).specified?b.value:b.text;if(c.nodeName(b,"select")){var d=b.selectedIndex,f=[],e=b.options;b=b.type==="select-one";if(d<0)return null;var j=b?d:0;for(d=b?d+1:e.length;j<d;j++){var i=
e[j];if(i.selected){a=c(i).val();if(b)return a;f.push(a)}}return f}if(Ba.test(b.type)&&!c.support.checkOn)return b.getAttribute("value")===null?"on":b.value;return(b.value||"").replace(Za,"")}return w}var o=c.isFunction(a);return this.each(function(k){var n=c(this),r=a;if(this.nodeType===1){if(o)r=a.call(this,k,n.val());if(typeof r==="number")r+="";if(c.isArray(r)&&Ba.test(this.type))this.checked=c.inArray(n.val(),r)>=0;else if(c.nodeName(this,"select")){var u=c.makeArray(r);c("option",this).each(function(){this.selected=
c.inArray(c(this).val(),u)>=0});if(!u.length)this.selectedIndex=-1}else this.value=r}})}});c.extend({attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},attr:function(a,b,d,f){if(!a||a.nodeType===3||a.nodeType===8)return w;if(f&&b in c.attrFn)return c(a)[b](d);f=a.nodeType!==1||!c.isXMLDoc(a);var e=d!==w;b=f&&c.props[b]||b;if(a.nodeType===1){var j=$a.test(b);if(b in a&&f&&!j){if(e){b==="type"&&ab.test(a.nodeName)&&a.parentNode&&c.error("type property can't be changed");
a[b]=d}if(c.nodeName(a,"form")&&a.getAttributeNode(b))return a.getAttributeNode(b).nodeValue;if(b==="tabIndex")return(b=a.getAttributeNode("tabIndex"))&&b.specified?b.value:bb.test(a.nodeName)||cb.test(a.nodeName)&&a.href?0:w;return a[b]}if(!c.support.style&&f&&b==="style"){if(e)a.style.cssText=""+d;return a.style.cssText}e&&a.setAttribute(b,""+d);a=!c.support.hrefNormalized&&f&&j?a.getAttribute(b,2):a.getAttribute(b);return a===null?w:a}return c.style(a,b,d)}});var O=/\.(.*)$/,db=function(a){return a.replace(/[^\w\s\.\|`]/g,
function(b){return"\\"+b})};c.event={add:function(a,b,d,f){if(!(a.nodeType===3||a.nodeType===8)){if(a.setInterval&&a!==A&&!a.frameElement)a=A;var e,j;if(d.handler){e=d;d=e.handler}if(!d.guid)d.guid=c.guid++;if(j=c.data(a)){var i=j.events=j.events||{},o=j.handle;if(!o)j.handle=o=function(){return typeof c!=="undefined"&&!c.event.triggered?c.event.handle.apply(o.elem,arguments):w};o.elem=a;b=b.split(" ");for(var k,n=0,r;k=b[n++];){j=e?c.extend({},e):{handler:d,data:f};if(k.indexOf(".")>-1){r=k.split(".");
k=r.shift();j.namespace=r.slice(0).sort().join(".")}else{r=[];j.namespace=""}j.type=k;j.guid=d.guid;var u=i[k],z=c.event.special[k]||{};if(!u){u=i[k]=[];if(!z.setup||z.setup.call(a,f,r,o)===false)if(a.addEventListener)a.addEventListener(k,o,false);else a.attachEvent&&a.attachEvent("on"+k,o)}if(z.add){z.add.call(a,j);if(!j.handler.guid)j.handler.guid=d.guid}u.push(j);c.event.global[k]=true}a=null}}},global:{},remove:function(a,b,d,f){if(!(a.nodeType===3||a.nodeType===8)){var e,j=0,i,o,k,n,r,u,z=c.data(a),
C=z&&z.events;if(z&&C){if(b&&b.type){d=b.handler;b=b.type}if(!b||typeof b==="string"&&b.charAt(0)==="."){b=b||"";for(e in C)c.event.remove(a,e+b)}else{for(b=b.split(" ");e=b[j++];){n=e;i=e.indexOf(".")<0;o=[];if(!i){o=e.split(".");e=o.shift();k=new RegExp("(^|\\.)"+c.map(o.slice(0).sort(),db).join("\\.(?:.*\\.)?")+"(\\.|$)")}if(r=C[e])if(d){n=c.event.special[e]||{};for(B=f||0;B<r.length;B++){u=r[B];if(d.guid===u.guid){if(i||k.test(u.namespace)){f==null&&r.splice(B--,1);n.remove&&n.remove.call(a,u)}if(f!=
null)break}}if(r.length===0||f!=null&&r.length===1){if(!n.teardown||n.teardown.call(a,o)===false)Ca(a,e,z.handle);delete C[e]}}else for(var B=0;B<r.length;B++){u=r[B];if(i||k.test(u.namespace)){c.event.remove(a,n,u.handler,B);r.splice(B--,1)}}}if(c.isEmptyObject(C)){if(b=z.handle)b.elem=null;delete z.events;delete z.handle;c.isEmptyObject(z)&&c.removeData(a)}}}}},trigger:function(a,b,d,f){var e=a.type||a;if(!f){a=typeof a==="object"?a[G]?a:c.extend(c.Event(e),a):c.Event(e);if(e.indexOf("!")>=0){a.type=
e=e.slice(0,-1);a.exclusive=true}if(!d){a.stopPropagation();c.event.global[e]&&c.each(c.cache,function(){this.events&&this.events[e]&&c.event.trigger(a,b,this.handle.elem)})}if(!d||d.nodeType===3||d.nodeType===8)return w;a.result=w;a.target=d;b=c.makeArray(b);b.unshift(a)}a.currentTarget=d;(f=c.data(d,"handle"))&&f.apply(d,b);f=d.parentNode||d.ownerDocument;try{if(!(d&&d.nodeName&&c.noData[d.nodeName.toLowerCase()]))if(d["on"+e]&&d["on"+e].apply(d,b)===false)a.result=false}catch(j){}if(!a.isPropagationStopped()&&
f)c.event.trigger(a,b,f,true);else if(!a.isDefaultPrevented()){f=a.target;var i,o=c.nodeName(f,"a")&&e==="click",k=c.event.special[e]||{};if((!k._default||k._default.call(d,a)===false)&&!o&&!(f&&f.nodeName&&c.noData[f.nodeName.toLowerCase()])){try{if(f[e]){if(i=f["on"+e])f["on"+e]=null;c.event.triggered=true;f[e]()}}catch(n){}if(i)f["on"+e]=i;c.event.triggered=false}}},handle:function(a){var b,d,f,e;a=arguments[0]=c.event.fix(a||A.event);a.currentTarget=this;b=a.type.indexOf(".")<0&&!a.exclusive;
if(!b){d=a.type.split(".");a.type=d.shift();f=new RegExp("(^|\\.)"+d.slice(0).sort().join("\\.(?:.*\\.)?")+"(\\.|$)")}e=c.data(this,"events");d=e[a.type];if(e&&d){d=d.slice(0);e=0;for(var j=d.length;e<j;e++){var i=d[e];if(b||f.test(i.namespace)){a.handler=i.handler;a.data=i.data;a.handleObj=i;i=i.handler.apply(this,arguments);if(i!==w){a.result=i;if(i===false){a.preventDefault();a.stopPropagation()}}if(a.isImmediatePropagationStopped())break}}}return a.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
fix:function(a){if(a[G])return a;var b=a;a=c.Event(b);for(var d=this.props.length,f;d;){f=this.props[--d];a[f]=b[f]}if(!a.target)a.target=a.srcElement||s;if(a.target.nodeType===3)a.target=a.target.parentNode;if(!a.relatedTarget&&a.fromElement)a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement;if(a.pageX==null&&a.clientX!=null){b=s.documentElement;d=s.body;a.pageX=a.clientX+(b&&b.scrollLeft||d&&d.scrollLeft||0)-(b&&b.clientLeft||d&&d.clientLeft||0);a.pageY=a.clientY+(b&&b.scrollTop||
d&&d.scrollTop||0)-(b&&b.clientTop||d&&d.clientTop||0)}if(!a.which&&(a.charCode||a.charCode===0?a.charCode:a.keyCode))a.which=a.charCode||a.keyCode;if(!a.metaKey&&a.ctrlKey)a.metaKey=a.ctrlKey;if(!a.which&&a.button!==w)a.which=a.button&1?1:a.button&2?3:a.button&4?2:0;return a},guid:1E8,proxy:c.proxy,special:{ready:{setup:c.bindReady,teardown:c.noop},live:{add:function(a){c.event.add(this,a.origType,c.extend({},a,{handler:oa}))},remove:function(a){var b=true,d=a.origType.replace(O,"");c.each(c.data(this,
"events").live||[],function(){if(d===this.origType.replace(O,""))return b=false});b&&c.event.remove(this,a.origType,oa)}},beforeunload:{setup:function(a,b,d){if(this.setInterval)this.onbeforeunload=d;return false},teardown:function(a,b){if(this.onbeforeunload===b)this.onbeforeunload=null}}}};var Ca=s.removeEventListener?function(a,b,d){a.removeEventListener(b,d,false)}:function(a,b,d){a.detachEvent("on"+b,d)};c.Event=function(a){if(!this.preventDefault)return new c.Event(a);if(a&&a.type){this.originalEvent=
a;this.type=a.type}else this.type=a;this.timeStamp=J();this[G]=true};c.Event.prototype={preventDefault:function(){this.isDefaultPrevented=Z;var a=this.originalEvent;if(a){a.preventDefault&&a.preventDefault();a.returnValue=false}},stopPropagation:function(){this.isPropagationStopped=Z;var a=this.originalEvent;if(a){a.stopPropagation&&a.stopPropagation();a.cancelBubble=true}},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=Z;this.stopPropagation()},isDefaultPrevented:Y,isPropagationStopped:Y,
isImmediatePropagationStopped:Y};var Da=function(a){var b=a.relatedTarget;try{for(;b&&b!==this;)b=b.parentNode;if(b!==this){a.type=a.data;c.event.handle.apply(this,arguments)}}catch(d){}},Ea=function(a){a.type=a.data;c.event.handle.apply(this,arguments)};c.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){c.event.special[a]={setup:function(d){c.event.add(this,b,d&&d.selector?Ea:Da,a)},teardown:function(d){c.event.remove(this,b,d&&d.selector?Ea:Da)}}});if(!c.support.submitBubbles)c.event.special.submit=
{setup:function(){if(this.nodeName.toLowerCase()!=="form"){c.event.add(this,"click.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="submit"||d==="image")&&c(b).closest("form").length)return na("submit",this,arguments)});c.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="text"||d==="password")&&c(b).closest("form").length&&a.keyCode===13)return na("submit",this,arguments)})}else return false},teardown:function(){c.event.remove(this,".specialSubmit")}};
if(!c.support.changeBubbles){var da=/textarea|input|select/i,ea,Fa=function(a){var b=a.type,d=a.value;if(b==="radio"||b==="checkbox")d=a.checked;else if(b==="select-multiple")d=a.selectedIndex>-1?c.map(a.options,function(f){return f.selected}).join("-"):"";else if(a.nodeName.toLowerCase()==="select")d=a.selectedIndex;return d},fa=function(a,b){var d=a.target,f,e;if(!(!da.test(d.nodeName)||d.readOnly)){f=c.data(d,"_change_data");e=Fa(d);if(a.type!=="focusout"||d.type!=="radio")c.data(d,"_change_data",
e);if(!(f===w||e===f))if(f!=null||e){a.type="change";return c.event.trigger(a,b,d)}}};c.event.special.change={filters:{focusout:fa,click:function(a){var b=a.target,d=b.type;if(d==="radio"||d==="checkbox"||b.nodeName.toLowerCase()==="select")return fa.call(this,a)},keydown:function(a){var b=a.target,d=b.type;if(a.keyCode===13&&b.nodeName.toLowerCase()!=="textarea"||a.keyCode===32&&(d==="checkbox"||d==="radio")||d==="select-multiple")return fa.call(this,a)},beforeactivate:function(a){a=a.target;c.data(a,
"_change_data",Fa(a))}},setup:function(){if(this.type==="file")return false;for(var a in ea)c.event.add(this,a+".specialChange",ea[a]);return da.test(this.nodeName)},teardown:function(){c.event.remove(this,".specialChange");return da.test(this.nodeName)}};ea=c.event.special.change.filters}s.addEventListener&&c.each({focus:"focusin",blur:"focusout"},function(a,b){function d(f){f=c.event.fix(f);f.type=b;return c.event.handle.call(this,f)}c.event.special[b]={setup:function(){this.addEventListener(a,
d,true)},teardown:function(){this.removeEventListener(a,d,true)}}});c.each(["bind","one"],function(a,b){c.fn[b]=function(d,f,e){if(typeof d==="object"){for(var j in d)this[b](j,f,d[j],e);return this}if(c.isFunction(f)){e=f;f=w}var i=b==="one"?c.proxy(e,function(k){c(this).unbind(k,i);return e.apply(this,arguments)}):e;if(d==="unload"&&b!=="one")this.one(d,f,e);else{j=0;for(var o=this.length;j<o;j++)c.event.add(this[j],d,i,f)}return this}});c.fn.extend({unbind:function(a,b){if(typeof a==="object"&&
!a.preventDefault)for(var d in a)this.unbind(d,a[d]);else{d=0;for(var f=this.length;d<f;d++)c.event.remove(this[d],a,b)}return this},delegate:function(a,b,d,f){return this.live(b,d,f,a)},undelegate:function(a,b,d){return arguments.length===0?this.unbind("live"):this.die(b,null,d,a)},trigger:function(a,b){return this.each(function(){c.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0]){a=c.Event(a);a.preventDefault();a.stopPropagation();c.event.trigger(a,b,this[0]);return a.result}},
toggle:function(a){for(var b=arguments,d=1;d<b.length;)c.proxy(a,b[d++]);return this.click(c.proxy(a,function(f){var e=(c.data(this,"lastToggle"+a.guid)||0)%d;c.data(this,"lastToggle"+a.guid,e+1);f.preventDefault();return b[e].apply(this,arguments)||false}))},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var Ga={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};c.each(["live","die"],function(a,b){c.fn[b]=function(d,f,e,j){var i,o=0,k,n,r=j||this.selector,
u=j?this:c(this.context);if(c.isFunction(f)){e=f;f=w}for(d=(d||"").split(" ");(i=d[o++])!=null;){j=O.exec(i);k="";if(j){k=j[0];i=i.replace(O,"")}if(i==="hover")d.push("mouseenter"+k,"mouseleave"+k);else{n=i;if(i==="focus"||i==="blur"){d.push(Ga[i]+k);i+=k}else i=(Ga[i]||i)+k;b==="live"?u.each(function(){c.event.add(this,pa(i,r),{data:f,selector:r,handler:e,origType:i,origHandler:e,preType:n})}):u.unbind(pa(i,r),e)}}return this}});c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),
function(a,b){c.fn[b]=function(d){return d?this.bind(b,d):this.trigger(b)};if(c.attrFn)c.attrFn[b]=true});A.attachEvent&&!A.addEventListener&&A.attachEvent("onunload",function(){for(var a in c.cache)if(c.cache[a].handle)try{c.event.remove(c.cache[a].handle.elem)}catch(b){}});(function(){function a(g){for(var h="",l,m=0;g[m];m++){l=g[m];if(l.nodeType===3||l.nodeType===4)h+=l.nodeValue;else if(l.nodeType!==8)h+=a(l.childNodes)}return h}function b(g,h,l,m,q,p){q=0;for(var v=m.length;q<v;q++){var t=m[q];
if(t){t=t[g];for(var y=false;t;){if(t.sizcache===l){y=m[t.sizset];break}if(t.nodeType===1&&!p){t.sizcache=l;t.sizset=q}if(t.nodeName.toLowerCase()===h){y=t;break}t=t[g]}m[q]=y}}}function d(g,h,l,m,q,p){q=0;for(var v=m.length;q<v;q++){var t=m[q];if(t){t=t[g];for(var y=false;t;){if(t.sizcache===l){y=m[t.sizset];break}if(t.nodeType===1){if(!p){t.sizcache=l;t.sizset=q}if(typeof h!=="string"){if(t===h){y=true;break}}else if(k.filter(h,[t]).length>0){y=t;break}}t=t[g]}m[q]=y}}}var f=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
e=0,j=Object.prototype.toString,i=false,o=true;[0,0].sort(function(){o=false;return 0});var k=function(g,h,l,m){l=l||[];var q=h=h||s;if(h.nodeType!==1&&h.nodeType!==9)return[];if(!g||typeof g!=="string")return l;for(var p=[],v,t,y,S,H=true,M=x(h),I=g;(f.exec(""),v=f.exec(I))!==null;){I=v[3];p.push(v[1]);if(v[2]){S=v[3];break}}if(p.length>1&&r.exec(g))if(p.length===2&&n.relative[p[0]])t=ga(p[0]+p[1],h);else for(t=n.relative[p[0]]?[h]:k(p.shift(),h);p.length;){g=p.shift();if(n.relative[g])g+=p.shift();
t=ga(g,t)}else{if(!m&&p.length>1&&h.nodeType===9&&!M&&n.match.ID.test(p[0])&&!n.match.ID.test(p[p.length-1])){v=k.find(p.shift(),h,M);h=v.expr?k.filter(v.expr,v.set)[0]:v.set[0]}if(h){v=m?{expr:p.pop(),set:z(m)}:k.find(p.pop(),p.length===1&&(p[0]==="~"||p[0]==="+")&&h.parentNode?h.parentNode:h,M);t=v.expr?k.filter(v.expr,v.set):v.set;if(p.length>0)y=z(t);else H=false;for(;p.length;){var D=p.pop();v=D;if(n.relative[D])v=p.pop();else D="";if(v==null)v=h;n.relative[D](y,v,M)}}else y=[]}y||(y=t);y||k.error(D||
g);if(j.call(y)==="[object Array]")if(H)if(h&&h.nodeType===1)for(g=0;y[g]!=null;g++){if(y[g]&&(y[g]===true||y[g].nodeType===1&&E(h,y[g])))l.push(t[g])}else for(g=0;y[g]!=null;g++)y[g]&&y[g].nodeType===1&&l.push(t[g]);else l.push.apply(l,y);else z(y,l);if(S){k(S,q,l,m);k.uniqueSort(l)}return l};k.uniqueSort=function(g){if(B){i=o;g.sort(B);if(i)for(var h=1;h<g.length;h++)g[h]===g[h-1]&&g.splice(h--,1)}return g};k.matches=function(g,h){return k(g,null,null,h)};k.find=function(g,h,l){var m,q;if(!g)return[];
for(var p=0,v=n.order.length;p<v;p++){var t=n.order[p];if(q=n.leftMatch[t].exec(g)){var y=q[1];q.splice(1,1);if(y.substr(y.length-1)!=="\\"){q[1]=(q[1]||"").replace(/\\/g,"");m=n.find[t](q,h,l);if(m!=null){g=g.replace(n.match[t],"");break}}}}m||(m=h.getElementsByTagName("*"));return{set:m,expr:g}};k.filter=function(g,h,l,m){for(var q=g,p=[],v=h,t,y,S=h&&h[0]&&x(h[0]);g&&h.length;){for(var H in n.filter)if((t=n.leftMatch[H].exec(g))!=null&&t[2]){var M=n.filter[H],I,D;D=t[1];y=false;t.splice(1,1);if(D.substr(D.length-
1)!=="\\"){if(v===p)p=[];if(n.preFilter[H])if(t=n.preFilter[H](t,v,l,p,m,S)){if(t===true)continue}else y=I=true;if(t)for(var U=0;(D=v[U])!=null;U++)if(D){I=M(D,t,U,v);var Ha=m^!!I;if(l&&I!=null)if(Ha)y=true;else v[U]=false;else if(Ha){p.push(D);y=true}}if(I!==w){l||(v=p);g=g.replace(n.match[H],"");if(!y)return[];break}}}if(g===q)if(y==null)k.error(g);else break;q=g}return v};k.error=function(g){throw"Syntax error, unrecognized expression: "+g;};var n=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(g){return g.getAttribute("href")}},
relative:{"+":function(g,h){var l=typeof h==="string",m=l&&!/\W/.test(h);l=l&&!m;if(m)h=h.toLowerCase();m=0;for(var q=g.length,p;m<q;m++)if(p=g[m]){for(;(p=p.previousSibling)&&p.nodeType!==1;);g[m]=l||p&&p.nodeName.toLowerCase()===h?p||false:p===h}l&&k.filter(h,g,true)},">":function(g,h){var l=typeof h==="string";if(l&&!/\W/.test(h)){h=h.toLowerCase();for(var m=0,q=g.length;m<q;m++){var p=g[m];if(p){l=p.parentNode;g[m]=l.nodeName.toLowerCase()===h?l:false}}}else{m=0;for(q=g.length;m<q;m++)if(p=g[m])g[m]=
l?p.parentNode:p.parentNode===h;l&&k.filter(h,g,true)}},"":function(g,h,l){var m=e++,q=d;if(typeof h==="string"&&!/\W/.test(h)){var p=h=h.toLowerCase();q=b}q("parentNode",h,m,g,p,l)},"~":function(g,h,l){var m=e++,q=d;if(typeof h==="string"&&!/\W/.test(h)){var p=h=h.toLowerCase();q=b}q("previousSibling",h,m,g,p,l)}},find:{ID:function(g,h,l){if(typeof h.getElementById!=="undefined"&&!l)return(g=h.getElementById(g[1]))?[g]:[]},NAME:function(g,h){if(typeof h.getElementsByName!=="undefined"){var l=[];
h=h.getElementsByName(g[1]);for(var m=0,q=h.length;m<q;m++)h[m].getAttribute("name")===g[1]&&l.push(h[m]);return l.length===0?null:l}},TAG:function(g,h){return h.getElementsByTagName(g[1])}},preFilter:{CLASS:function(g,h,l,m,q,p){g=" "+g[1].replace(/\\/g,"")+" ";if(p)return g;p=0;for(var v;(v=h[p])!=null;p++)if(v)if(q^(v.className&&(" "+v.className+" ").replace(/[\t\n]/g," ").indexOf(g)>=0))l||m.push(v);else if(l)h[p]=false;return false},ID:function(g){return g[1].replace(/\\/g,"")},TAG:function(g){return g[1].toLowerCase()},
CHILD:function(g){if(g[1]==="nth"){var h=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(g[2]==="even"&&"2n"||g[2]==="odd"&&"2n+1"||!/\D/.test(g[2])&&"0n+"+g[2]||g[2]);g[2]=h[1]+(h[2]||1)-0;g[3]=h[3]-0}g[0]=e++;return g},ATTR:function(g,h,l,m,q,p){h=g[1].replace(/\\/g,"");if(!p&&n.attrMap[h])g[1]=n.attrMap[h];if(g[2]==="~=")g[4]=" "+g[4]+" ";return g},PSEUDO:function(g,h,l,m,q){if(g[1]==="not")if((f.exec(g[3])||"").length>1||/^\w/.test(g[3]))g[3]=k(g[3],null,null,h);else{g=k.filter(g[3],h,l,true^q);l||m.push.apply(m,
g);return false}else if(n.match.POS.test(g[0])||n.match.CHILD.test(g[0]))return true;return g},POS:function(g){g.unshift(true);return g}},filters:{enabled:function(g){return g.disabled===false&&g.type!=="hidden"},disabled:function(g){return g.disabled===true},checked:function(g){return g.checked===true},selected:function(g){return g.selected===true},parent:function(g){return!!g.firstChild},empty:function(g){return!g.firstChild},has:function(g,h,l){return!!k(l[3],g).length},header:function(g){return/h\d/i.test(g.nodeName)},
text:function(g){return"text"===g.type},radio:function(g){return"radio"===g.type},checkbox:function(g){return"checkbox"===g.type},file:function(g){return"file"===g.type},password:function(g){return"password"===g.type},submit:function(g){return"submit"===g.type},image:function(g){return"image"===g.type},reset:function(g){return"reset"===g.type},button:function(g){return"button"===g.type||g.nodeName.toLowerCase()==="button"},input:function(g){return/input|select|textarea|button/i.test(g.nodeName)}},
setFilters:{first:function(g,h){return h===0},last:function(g,h,l,m){return h===m.length-1},even:function(g,h){return h%2===0},odd:function(g,h){return h%2===1},lt:function(g,h,l){return h<l[3]-0},gt:function(g,h,l){return h>l[3]-0},nth:function(g,h,l){return l[3]-0===h},eq:function(g,h,l){return l[3]-0===h}},filter:{PSEUDO:function(g,h,l,m){var q=h[1],p=n.filters[q];if(p)return p(g,l,h,m);else if(q==="contains")return(g.textContent||g.innerText||a([g])||"").indexOf(h[3])>=0;else if(q==="not"){h=
h[3];l=0;for(m=h.length;l<m;l++)if(h[l]===g)return false;return true}else k.error("Syntax error, unrecognized expression: "+q)},CHILD:function(g,h){var l=h[1],m=g;switch(l){case "only":case "first":for(;m=m.previousSibling;)if(m.nodeType===1)return false;if(l==="first")return true;m=g;case "last":for(;m=m.nextSibling;)if(m.nodeType===1)return false;return true;case "nth":l=h[2];var q=h[3];if(l===1&&q===0)return true;h=h[0];var p=g.parentNode;if(p&&(p.sizcache!==h||!g.nodeIndex)){var v=0;for(m=p.firstChild;m;m=
m.nextSibling)if(m.nodeType===1)m.nodeIndex=++v;p.sizcache=h}g=g.nodeIndex-q;return l===0?g===0:g%l===0&&g/l>=0}},ID:function(g,h){return g.nodeType===1&&g.getAttribute("id")===h},TAG:function(g,h){return h==="*"&&g.nodeType===1||g.nodeName.toLowerCase()===h},CLASS:function(g,h){return(" "+(g.className||g.getAttribute("class"))+" ").indexOf(h)>-1},ATTR:function(g,h){var l=h[1];g=n.attrHandle[l]?n.attrHandle[l](g):g[l]!=null?g[l]:g.getAttribute(l);l=g+"";var m=h[2];h=h[4];return g==null?m==="!=":m===
"="?l===h:m==="*="?l.indexOf(h)>=0:m==="~="?(" "+l+" ").indexOf(h)>=0:!h?l&&g!==false:m==="!="?l!==h:m==="^="?l.indexOf(h)===0:m==="$="?l.substr(l.length-h.length)===h:m==="|="?l===h||l.substr(0,h.length+1)===h+"-":false},POS:function(g,h,l,m){var q=n.setFilters[h[2]];if(q)return q(g,l,h,m)}}},r=n.match.POS;for(var u in n.match){n.match[u]=new RegExp(n.match[u].source+/(?![^\[]*\])(?![^\(]*\))/.source);n.leftMatch[u]=new RegExp(/(^(?:.|\r|\n)*?)/.source+n.match[u].source.replace(/\\(\d+)/g,function(g,
h){return"\\"+(h-0+1)}))}var z=function(g,h){g=Array.prototype.slice.call(g,0);if(h){h.push.apply(h,g);return h}return g};try{Array.prototype.slice.call(s.documentElement.childNodes,0)}catch(C){z=function(g,h){h=h||[];if(j.call(g)==="[object Array]")Array.prototype.push.apply(h,g);else if(typeof g.length==="number")for(var l=0,m=g.length;l<m;l++)h.push(g[l]);else for(l=0;g[l];l++)h.push(g[l]);return h}}var B;if(s.documentElement.compareDocumentPosition)B=function(g,h){if(!g.compareDocumentPosition||
!h.compareDocumentPosition){if(g==h)i=true;return g.compareDocumentPosition?-1:1}g=g.compareDocumentPosition(h)&4?-1:g===h?0:1;if(g===0)i=true;return g};else if("sourceIndex"in s.documentElement)B=function(g,h){if(!g.sourceIndex||!h.sourceIndex){if(g==h)i=true;return g.sourceIndex?-1:1}g=g.sourceIndex-h.sourceIndex;if(g===0)i=true;return g};else if(s.createRange)B=function(g,h){if(!g.ownerDocument||!h.ownerDocument){if(g==h)i=true;return g.ownerDocument?-1:1}var l=g.ownerDocument.createRange(),m=
h.ownerDocument.createRange();l.setStart(g,0);l.setEnd(g,0);m.setStart(h,0);m.setEnd(h,0);g=l.compareBoundaryPoints(Range.START_TO_END,m);if(g===0)i=true;return g};(function(){var g=s.createElement("div"),h="script"+(new Date).getTime();g.innerHTML="<a name='"+h+"'/>";var l=s.documentElement;l.insertBefore(g,l.firstChild);if(s.getElementById(h)){n.find.ID=function(m,q,p){if(typeof q.getElementById!=="undefined"&&!p)return(q=q.getElementById(m[1]))?q.id===m[1]||typeof q.getAttributeNode!=="undefined"&&
q.getAttributeNode("id").nodeValue===m[1]?[q]:w:[]};n.filter.ID=function(m,q){var p=typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id");return m.nodeType===1&&p&&p.nodeValue===q}}l.removeChild(g);l=g=null})();(function(){var g=s.createElement("div");g.appendChild(s.createComment(""));if(g.getElementsByTagName("*").length>0)n.find.TAG=function(h,l){l=l.getElementsByTagName(h[1]);if(h[1]==="*"){h=[];for(var m=0;l[m];m++)l[m].nodeType===1&&h.push(l[m]);l=h}return l};g.innerHTML="<a href='#'></a>";
if(g.firstChild&&typeof g.firstChild.getAttribute!=="undefined"&&g.firstChild.getAttribute("href")!=="#")n.attrHandle.href=function(h){return h.getAttribute("href",2)};g=null})();s.querySelectorAll&&function(){var g=k,h=s.createElement("div");h.innerHTML="<p class='TEST'></p>";if(!(h.querySelectorAll&&h.querySelectorAll(".TEST").length===0)){k=function(m,q,p,v){q=q||s;if(!v&&q.nodeType===9&&!x(q))try{return z(q.querySelectorAll(m),p)}catch(t){}return g(m,q,p,v)};for(var l in g)k[l]=g[l];h=null}}();
(function(){var g=s.createElement("div");g.innerHTML="<div class='test e'></div><div class='test'></div>";if(!(!g.getElementsByClassName||g.getElementsByClassName("e").length===0)){g.lastChild.className="e";if(g.getElementsByClassName("e").length!==1){n.order.splice(1,0,"CLASS");n.find.CLASS=function(h,l,m){if(typeof l.getElementsByClassName!=="undefined"&&!m)return l.getElementsByClassName(h[1])};g=null}}})();var E=s.compareDocumentPosition?function(g,h){return!!(g.compareDocumentPosition(h)&16)}:
function(g,h){return g!==h&&(g.contains?g.contains(h):true)},x=function(g){return(g=(g?g.ownerDocument||g:0).documentElement)?g.nodeName!=="HTML":false},ga=function(g,h){var l=[],m="",q;for(h=h.nodeType?[h]:h;q=n.match.PSEUDO.exec(g);){m+=q[0];g=g.replace(n.match.PSEUDO,"")}g=n.relative[g]?g+"*":g;q=0;for(var p=h.length;q<p;q++)k(g,h[q],l);return k.filter(m,l)};c.find=k;c.expr=k.selectors;c.expr[":"]=c.expr.filters;c.unique=k.uniqueSort;c.text=a;c.isXMLDoc=x;c.contains=E})();var eb=/Until$/,fb=/^(?:parents|prevUntil|prevAll)/,
gb=/,/;R=Array.prototype.slice;var Ia=function(a,b,d){if(c.isFunction(b))return c.grep(a,function(e,j){return!!b.call(e,j,e)===d});else if(b.nodeType)return c.grep(a,function(e){return e===b===d});else if(typeof b==="string"){var f=c.grep(a,function(e){return e.nodeType===1});if(Ua.test(b))return c.filter(b,f,!d);else b=c.filter(b,f)}return c.grep(a,function(e){return c.inArray(e,b)>=0===d})};c.fn.extend({find:function(a){for(var b=this.pushStack("","find",a),d=0,f=0,e=this.length;f<e;f++){d=b.length;
c.find(a,this[f],b);if(f>0)for(var j=d;j<b.length;j++)for(var i=0;i<d;i++)if(b[i]===b[j]){b.splice(j--,1);break}}return b},has:function(a){var b=c(a);return this.filter(function(){for(var d=0,f=b.length;d<f;d++)if(c.contains(this,b[d]))return true})},not:function(a){return this.pushStack(Ia(this,a,false),"not",a)},filter:function(a){return this.pushStack(Ia(this,a,true),"filter",a)},is:function(a){return!!a&&c.filter(a,this).length>0},closest:function(a,b){if(c.isArray(a)){var d=[],f=this[0],e,j=
{},i;if(f&&a.length){e=0;for(var o=a.length;e<o;e++){i=a[e];j[i]||(j[i]=c.expr.match.POS.test(i)?c(i,b||this.context):i)}for(;f&&f.ownerDocument&&f!==b;){for(i in j){e=j[i];if(e.jquery?e.index(f)>-1:c(f).is(e)){d.push({selector:i,elem:f});delete j[i]}}f=f.parentNode}}return d}var k=c.expr.match.POS.test(a)?c(a,b||this.context):null;return this.map(function(n,r){for(;r&&r.ownerDocument&&r!==b;){if(k?k.index(r)>-1:c(r).is(a))return r;r=r.parentNode}return null})},index:function(a){if(!a||typeof a===
"string")return c.inArray(this[0],a?c(a):this.parent().children());return c.inArray(a.jquery?a[0]:a,this)},add:function(a,b){a=typeof a==="string"?c(a,b||this.context):c.makeArray(a);b=c.merge(this.get(),a);return this.pushStack(qa(a[0])||qa(b[0])?b:c.unique(b))},andSelf:function(){return this.add(this.prevObject)}});c.each({parent:function(a){return(a=a.parentNode)&&a.nodeType!==11?a:null},parents:function(a){return c.dir(a,"parentNode")},parentsUntil:function(a,b,d){return c.dir(a,"parentNode",
d)},next:function(a){return c.nth(a,2,"nextSibling")},prev:function(a){return c.nth(a,2,"previousSibling")},nextAll:function(a){return c.dir(a,"nextSibling")},prevAll:function(a){return c.dir(a,"previousSibling")},nextUntil:function(a,b,d){return c.dir(a,"nextSibling",d)},prevUntil:function(a,b,d){return c.dir(a,"previousSibling",d)},siblings:function(a){return c.sibling(a.parentNode.firstChild,a)},children:function(a){return c.sibling(a.firstChild)},contents:function(a){return c.nodeName(a,"iframe")?
a.contentDocument||a.contentWindow.document:c.makeArray(a.childNodes)}},function(a,b){c.fn[a]=function(d,f){var e=c.map(this,b,d);eb.test(a)||(f=d);if(f&&typeof f==="string")e=c.filter(f,e);e=this.length>1?c.unique(e):e;if((this.length>1||gb.test(f))&&fb.test(a))e=e.reverse();return this.pushStack(e,a,R.call(arguments).join(","))}});c.extend({filter:function(a,b,d){if(d)a=":not("+a+")";return c.find.matches(a,b)},dir:function(a,b,d){var f=[];for(a=a[b];a&&a.nodeType!==9&&(d===w||a.nodeType!==1||!c(a).is(d));){a.nodeType===
1&&f.push(a);a=a[b]}return f},nth:function(a,b,d){b=b||1;for(var f=0;a;a=a[d])if(a.nodeType===1&&++f===b)break;return a},sibling:function(a,b){for(var d=[];a;a=a.nextSibling)a.nodeType===1&&a!==b&&d.push(a);return d}});var Ja=/ jQuery\d+="(?:\d+|null)"/g,V=/^\s+/,Ka=/(<([\w:]+)[^>]*?)\/>/g,hb=/^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,La=/<([\w:]+)/,ib=/<tbody/i,jb=/<|&#?\w+;/,ta=/<script|<object|<embed|<option|<style/i,ua=/checked\s*(?:[^=]|=\s*.checked.)/i,Ma=function(a,b,d){return hb.test(d)?
a:b+"></"+d+">"},F={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};F.optgroup=F.option;F.tbody=F.tfoot=F.colgroup=F.caption=F.thead;F.th=F.td;if(!c.support.htmlSerialize)F._default=[1,"div<div>","</div>"];c.fn.extend({text:function(a){if(c.isFunction(a))return this.each(function(b){var d=
c(this);d.text(a.call(this,b,d.text()))});if(typeof a!=="object"&&a!==w)return this.empty().append((this[0]&&this[0].ownerDocument||s).createTextNode(a));return c.text(this)},wrapAll:function(a){if(c.isFunction(a))return this.each(function(d){c(this).wrapAll(a.call(this,d))});if(this[0]){var b=c(a,this[0].ownerDocument).eq(0).clone(true);this[0].parentNode&&b.insertBefore(this[0]);b.map(function(){for(var d=this;d.firstChild&&d.firstChild.nodeType===1;)d=d.firstChild;return d}).append(this)}return this},
wrapInner:function(a){if(c.isFunction(a))return this.each(function(b){c(this).wrapInner(a.call(this,b))});return this.each(function(){var b=c(this),d=b.contents();d.length?d.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){c(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){c.nodeName(this,"body")||c(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.appendChild(a)})},
prepend:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,this)});else if(arguments.length){var a=c(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,
this.nextSibling)});else if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,c(arguments[0]).toArray());return a}},remove:function(a,b){for(var d=0,f;(f=this[d])!=null;d++)if(!a||c.filter(a,[f]).length){if(!b&&f.nodeType===1){c.cleanData(f.getElementsByTagName("*"));c.cleanData([f])}f.parentNode&&f.parentNode.removeChild(f)}return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++)for(b.nodeType===1&&c.cleanData(b.getElementsByTagName("*"));b.firstChild;)b.removeChild(b.firstChild);
return this},clone:function(a){var b=this.map(function(){if(!c.support.noCloneEvent&&!c.isXMLDoc(this)){var d=this.outerHTML,f=this.ownerDocument;if(!d){d=f.createElement("div");d.appendChild(this.cloneNode(true));d=d.innerHTML}return c.clean([d.replace(Ja,"").replace(/=([^="'>\s]+\/)>/g,'="$1">').replace(V,"")],f)[0]}else return this.cloneNode(true)});if(a===true){ra(this,b);ra(this.find("*"),b.find("*"))}return b},html:function(a){if(a===w)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(Ja,
""):null;else if(typeof a==="string"&&!ta.test(a)&&(c.support.leadingWhitespace||!V.test(a))&&!F[(La.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Ka,Ma);try{for(var b=0,d=this.length;b<d;b++)if(this[b].nodeType===1){c.cleanData(this[b].getElementsByTagName("*"));this[b].innerHTML=a}}catch(f){this.empty().append(a)}}else c.isFunction(a)?this.each(function(e){var j=c(this),i=j.html();j.empty().append(function(){return a.call(this,e,i)})}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&
this[0].parentNode){if(c.isFunction(a))return this.each(function(b){var d=c(this),f=d.html();d.replaceWith(a.call(this,b,f))});if(typeof a!=="string")a=c(a).detach();return this.each(function(){var b=this.nextSibling,d=this.parentNode;c(this).remove();b?c(b).before(a):c(d).append(a)})}else return this.pushStack(c(c.isFunction(a)?a():a),"replaceWith",a)},detach:function(a){return this.remove(a,true)},domManip:function(a,b,d){function f(u){return c.nodeName(u,"table")?u.getElementsByTagName("tbody")[0]||
u.appendChild(u.ownerDocument.createElement("tbody")):u}var e,j,i=a[0],o=[],k;if(!c.support.checkClone&&arguments.length===3&&typeof i==="string"&&ua.test(i))return this.each(function(){c(this).domManip(a,b,d,true)});if(c.isFunction(i))return this.each(function(u){var z=c(this);a[0]=i.call(this,u,b?z.html():w);z.domManip(a,b,d)});if(this[0]){e=i&&i.parentNode;e=c.support.parentNode&&e&&e.nodeType===11&&e.childNodes.length===this.length?{fragment:e}:sa(a,this,o);k=e.fragment;if(j=k.childNodes.length===
1?(k=k.firstChild):k.firstChild){b=b&&c.nodeName(j,"tr");for(var n=0,r=this.length;n<r;n++)d.call(b?f(this[n],j):this[n],n>0||e.cacheable||this.length>1?k.cloneNode(true):k)}o.length&&c.each(o,Qa)}return this}});c.fragments={};c.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){c.fn[a]=function(d){var f=[];d=c(d);var e=this.length===1&&this[0].parentNode;if(e&&e.nodeType===11&&e.childNodes.length===1&&d.length===1){d[b](this[0]);
return this}else{e=0;for(var j=d.length;e<j;e++){var i=(e>0?this.clone(true):this).get();c.fn[b].apply(c(d[e]),i);f=f.concat(i)}return this.pushStack(f,a,d.selector)}}});c.extend({clean:function(a,b,d,f){b=b||s;if(typeof b.createElement==="undefined")b=b.ownerDocument||b[0]&&b[0].ownerDocument||s;for(var e=[],j=0,i;(i=a[j])!=null;j++){if(typeof i==="number")i+="";if(i){if(typeof i==="string"&&!jb.test(i))i=b.createTextNode(i);else if(typeof i==="string"){i=i.replace(Ka,Ma);var o=(La.exec(i)||["",
""])[1].toLowerCase(),k=F[o]||F._default,n=k[0],r=b.createElement("div");for(r.innerHTML=k[1]+i+k[2];n--;)r=r.lastChild;if(!c.support.tbody){n=ib.test(i);o=o==="table"&&!n?r.firstChild&&r.firstChild.childNodes:k[1]==="<table>"&&!n?r.childNodes:[];for(k=o.length-1;k>=0;--k)c.nodeName(o[k],"tbody")&&!o[k].childNodes.length&&o[k].parentNode.removeChild(o[k])}!c.support.leadingWhitespace&&V.test(i)&&r.insertBefore(b.createTextNode(V.exec(i)[0]),r.firstChild);i=r.childNodes}if(i.nodeType)e.push(i);else e=
c.merge(e,i)}}if(d)for(j=0;e[j];j++)if(f&&c.nodeName(e[j],"script")&&(!e[j].type||e[j].type.toLowerCase()==="text/javascript"))f.push(e[j].parentNode?e[j].parentNode.removeChild(e[j]):e[j]);else{e[j].nodeType===1&&e.splice.apply(e,[j+1,0].concat(c.makeArray(e[j].getElementsByTagName("script"))));d.appendChild(e[j])}return e},cleanData:function(a){for(var b,d,f=c.cache,e=c.event.special,j=c.support.deleteExpando,i=0,o;(o=a[i])!=null;i++)if(d=o[c.expando]){b=f[d];if(b.events)for(var k in b.events)e[k]?
c.event.remove(o,k):Ca(o,k,b.handle);if(j)delete o[c.expando];else o.removeAttribute&&o.removeAttribute(c.expando);delete f[d]}}});var kb=/z-?index|font-?weight|opacity|zoom|line-?height/i,Na=/alpha\([^)]*\)/,Oa=/opacity=([^)]*)/,ha=/float/i,ia=/-([a-z])/ig,lb=/([A-Z])/g,mb=/^-?\d+(?:px)?$/i,nb=/^-?\d/,ob={position:"absolute",visibility:"hidden",display:"block"},pb=["Left","Right"],qb=["Top","Bottom"],rb=s.defaultView&&s.defaultView.getComputedStyle,Pa=c.support.cssFloat?"cssFloat":"styleFloat",ja=
function(a,b){return b.toUpperCase()};c.fn.css=function(a,b){return X(this,a,b,true,function(d,f,e){if(e===w)return c.curCSS(d,f);if(typeof e==="number"&&!kb.test(f))e+="px";c.style(d,f,e)})};c.extend({style:function(a,b,d){if(!a||a.nodeType===3||a.nodeType===8)return w;if((b==="width"||b==="height")&&parseFloat(d)<0)d=w;var f=a.style||a,e=d!==w;if(!c.support.opacity&&b==="opacity"){if(e){f.zoom=1;b=parseInt(d,10)+""==="NaN"?"":"alpha(opacity="+d*100+")";a=f.filter||c.curCSS(a,"filter")||"";f.filter=
Na.test(a)?a.replace(Na,b):b}return f.filter&&f.filter.indexOf("opacity=")>=0?parseFloat(Oa.exec(f.filter)[1])/100+"":""}if(ha.test(b))b=Pa;b=b.replace(ia,ja);if(e)f[b]=d;return f[b]},css:function(a,b,d,f){if(b==="width"||b==="height"){var e,j=b==="width"?pb:qb;function i(){e=b==="width"?a.offsetWidth:a.offsetHeight;f!=="border"&&c.each(j,function(){f||(e-=parseFloat(c.curCSS(a,"padding"+this,true))||0);if(f==="margin")e+=parseFloat(c.curCSS(a,"margin"+this,true))||0;else e-=parseFloat(c.curCSS(a,
"border"+this+"Width",true))||0})}a.offsetWidth!==0?i():c.swap(a,ob,i);return Math.max(0,Math.round(e))}return c.curCSS(a,b,d)},curCSS:function(a,b,d){var f,e=a.style;if(!c.support.opacity&&b==="opacity"&&a.currentStyle){f=Oa.test(a.currentStyle.filter||"")?parseFloat(RegExp.$1)/100+"":"";return f===""?"1":f}if(ha.test(b))b=Pa;if(!d&&e&&e[b])f=e[b];else if(rb){if(ha.test(b))b="float";b=b.replace(lb,"-$1").toLowerCase();e=a.ownerDocument.defaultView;if(!e)return null;if(a=e.getComputedStyle(a,null))f=
a.getPropertyValue(b);if(b==="opacity"&&f==="")f="1"}else if(a.currentStyle){d=b.replace(ia,ja);f=a.currentStyle[b]||a.currentStyle[d];if(!mb.test(f)&&nb.test(f)){b=e.left;var j=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;e.left=d==="fontSize"?"1em":f||0;f=e.pixelLeft+"px";e.left=b;a.runtimeStyle.left=j}}return f},swap:function(a,b,d){var f={};for(var e in b){f[e]=a.style[e];a.style[e]=b[e]}d.call(a);for(e in b)a.style[e]=f[e]}});if(c.expr&&c.expr.filters){c.expr.filters.hidden=function(a){var b=
a.offsetWidth,d=a.offsetHeight,f=a.nodeName.toLowerCase()==="tr";return b===0&&d===0&&!f?true:b>0&&d>0&&!f?false:c.curCSS(a,"display")==="none"};c.expr.filters.visible=function(a){return!c.expr.filters.hidden(a)}}var sb=J(),tb=/<script(.|\s)*?\/script>/gi,ub=/select|textarea/i,vb=/color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i,N=/=\?(&|$)/,ka=/\?/,wb=/(\?|&)_=.*?(&|$)/,xb=/^(\w+:)?\/\/([^\/?#]+)/,yb=/%20/g,zb=c.fn.load;c.fn.extend({load:function(a,b,d){if(typeof a!==
"string")return zb.call(this,a);else if(!this.length)return this;var f=a.indexOf(" ");if(f>=0){var e=a.slice(f,a.length);a=a.slice(0,f)}f="GET";if(b)if(c.isFunction(b)){d=b;b=null}else if(typeof b==="object"){b=c.param(b,c.ajaxSettings.traditional);f="POST"}var j=this;c.ajax({url:a,type:f,dataType:"html",data:b,complete:function(i,o){if(o==="success"||o==="notmodified")j.html(e?c("<div />").append(i.responseText.replace(tb,"")).find(e):i.responseText);d&&j.each(d,[i.responseText,o,i])}});return this},
serialize:function(){return c.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?c.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||ub.test(this.nodeName)||vb.test(this.type))}).map(function(a,b){a=c(this).val();return a==null?null:c.isArray(a)?c.map(a,function(d){return{name:b.name,value:d}}):{name:b.name,value:a}}).get()}});c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),
function(a,b){c.fn[b]=function(d){return this.bind(b,d)}});c.extend({get:function(a,b,d,f){if(c.isFunction(b)){f=f||d;d=b;b=null}return c.ajax({type:"GET",url:a,data:b,success:d,dataType:f})},getScript:function(a,b){return c.get(a,null,b,"script")},getJSON:function(a,b,d){return c.get(a,b,d,"json")},post:function(a,b,d,f){if(c.isFunction(b)){f=f||d;d=b;b={}}return c.ajax({type:"POST",url:a,data:b,success:d,dataType:f})},ajaxSetup:function(a){c.extend(c.ajaxSettings,a)},ajaxSettings:{url:location.href,
global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:A.XMLHttpRequest&&(A.location.protocol!=="file:"||!A.ActiveXObject)?function(){return new A.XMLHttpRequest}:function(){try{return new A.ActiveXObject("Microsoft.XMLHTTP")}catch(a){}},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},etag:{},ajax:function(a){function b(){e.success&&
e.success.call(k,o,i,x);e.global&&f("ajaxSuccess",[x,e])}function d(){e.complete&&e.complete.call(k,x,i);e.global&&f("ajaxComplete",[x,e]);e.global&&!--c.active&&c.event.trigger("ajaxStop")}function f(q,p){(e.context?c(e.context):c.event).trigger(q,p)}var e=c.extend(true,{},c.ajaxSettings,a),j,i,o,k=a&&a.context||e,n=e.type.toUpperCase();if(e.data&&e.processData&&typeof e.data!=="string")e.data=c.param(e.data,e.traditional);if(e.dataType==="jsonp"){if(n==="GET")N.test(e.url)||(e.url+=(ka.test(e.url)?
"&":"?")+(e.jsonp||"callback")+"=?");else if(!e.data||!N.test(e.data))e.data=(e.data?e.data+"&":"")+(e.jsonp||"callback")+"=?";e.dataType="json"}if(e.dataType==="json"&&(e.data&&N.test(e.data)||N.test(e.url))){j=e.jsonpCallback||"jsonp"+sb++;if(e.data)e.data=(e.data+"").replace(N,"="+j+"$1");e.url=e.url.replace(N,"="+j+"$1");e.dataType="script";A[j]=A[j]||function(q){o=q;b();d();A[j]=w;try{delete A[j]}catch(p){}z&&z.removeChild(C)}}if(e.dataType==="script"&&e.cache===null)e.cache=false;if(e.cache===
false&&n==="GET"){var r=J(),u=e.url.replace(wb,"$1_="+r+"$2");e.url=u+(u===e.url?(ka.test(e.url)?"&":"?")+"_="+r:"")}if(e.data&&n==="GET")e.url+=(ka.test(e.url)?"&":"?")+e.data;e.global&&!c.active++&&c.event.trigger("ajaxStart");r=(r=xb.exec(e.url))&&(r[1]&&r[1]!==location.protocol||r[2]!==location.host);if(e.dataType==="script"&&n==="GET"&&r){var z=s.getElementsByTagName("head")[0]||s.documentElement,C=s.createElement("script");C.src=e.url;if(e.scriptCharset)C.charset=e.scriptCharset;if(!j){var B=
false;C.onload=C.onreadystatechange=function(){if(!B&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){B=true;b();d();C.onload=C.onreadystatechange=null;z&&C.parentNode&&z.removeChild(C)}}}z.insertBefore(C,z.firstChild);return w}var E=false,x=e.xhr();if(x){e.username?x.open(n,e.url,e.async,e.username,e.password):x.open(n,e.url,e.async);try{if(e.data||a&&a.contentType)x.setRequestHeader("Content-Type",e.contentType);if(e.ifModified){c.lastModified[e.url]&&x.setRequestHeader("If-Modified-Since",
c.lastModified[e.url]);c.etag[e.url]&&x.setRequestHeader("If-None-Match",c.etag[e.url])}r||x.setRequestHeader("X-Requested-With","XMLHttpRequest");x.setRequestHeader("Accept",e.dataType&&e.accepts[e.dataType]?e.accepts[e.dataType]+", */*":e.accepts._default)}catch(ga){}if(e.beforeSend&&e.beforeSend.call(k,x,e)===false){e.global&&!--c.active&&c.event.trigger("ajaxStop");x.abort();return false}e.global&&f("ajaxSend",[x,e]);var g=x.onreadystatechange=function(q){if(!x||x.readyState===0||q==="abort"){E||
d();E=true;if(x)x.onreadystatechange=c.noop}else if(!E&&x&&(x.readyState===4||q==="timeout")){E=true;x.onreadystatechange=c.noop;i=q==="timeout"?"timeout":!c.httpSuccess(x)?"error":e.ifModified&&c.httpNotModified(x,e.url)?"notmodified":"success";var p;if(i==="success")try{o=c.httpData(x,e.dataType,e)}catch(v){i="parsererror";p=v}if(i==="success"||i==="notmodified")j||b();else c.handleError(e,x,i,p);d();q==="timeout"&&x.abort();if(e.async)x=null}};try{var h=x.abort;x.abort=function(){x&&h.call(x);
g("abort")}}catch(l){}e.async&&e.timeout>0&&setTimeout(function(){x&&!E&&g("timeout")},e.timeout);try{x.send(n==="POST"||n==="PUT"||n==="DELETE"?e.data:null)}catch(m){c.handleError(e,x,null,m);d()}e.async||g();return x}},handleError:function(a,b,d,f){if(a.error)a.error.call(a.context||a,b,d,f);if(a.global)(a.context?c(a.context):c.event).trigger("ajaxError",[b,a,f])},active:0,httpSuccess:function(a){try{return!a.status&&location.protocol==="file:"||a.status>=200&&a.status<300||a.status===304||a.status===
1223||a.status===0}catch(b){}return false},httpNotModified:function(a,b){var d=a.getResponseHeader("Last-Modified"),f=a.getResponseHeader("Etag");if(d)c.lastModified[b]=d;if(f)c.etag[b]=f;return a.status===304||a.status===0},httpData:function(a,b,d){var f=a.getResponseHeader("content-type")||"",e=b==="xml"||!b&&f.indexOf("xml")>=0;a=e?a.responseXML:a.responseText;e&&a.documentElement.nodeName==="parsererror"&&c.error("parsererror");if(d&&d.dataFilter)a=d.dataFilter(a,b);if(typeof a==="string")if(b===
"json"||!b&&f.indexOf("json")>=0)a=c.parseJSON(a);else if(b==="script"||!b&&f.indexOf("javascript")>=0)c.globalEval(a);return a},param:function(a,b){function d(i,o){if(c.isArray(o))c.each(o,function(k,n){b||/\[\]$/.test(i)?f(i,n):d(i+"["+(typeof n==="object"||c.isArray(n)?k:"")+"]",n)});else!b&&o!=null&&typeof o==="object"?c.each(o,function(k,n){d(i+"["+k+"]",n)}):f(i,o)}function f(i,o){o=c.isFunction(o)?o():o;e[e.length]=encodeURIComponent(i)+"="+encodeURIComponent(o)}var e=[];if(b===w)b=c.ajaxSettings.traditional;
if(c.isArray(a)||a.jquery)c.each(a,function(){f(this.name,this.value)});else for(var j in a)d(j,a[j]);return e.join("&").replace(yb,"+")}});var la={},Ab=/toggle|show|hide/,Bb=/^([+-]=)?([\d+-.]+)(.*)$/,W,va=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];c.fn.extend({show:function(a,b){if(a||a===0)return this.animate(K("show",3),a,b);else{a=0;for(b=this.length;a<b;a++){var d=c.data(this[a],"olddisplay");
this[a].style.display=d||"";if(c.css(this[a],"display")==="none"){d=this[a].nodeName;var f;if(la[d])f=la[d];else{var e=c("<"+d+" />").appendTo("body");f=e.css("display");if(f==="none")f="block";e.remove();la[d]=f}c.data(this[a],"olddisplay",f)}}a=0;for(b=this.length;a<b;a++)this[a].style.display=c.data(this[a],"olddisplay")||"";return this}},hide:function(a,b){if(a||a===0)return this.animate(K("hide",3),a,b);else{a=0;for(b=this.length;a<b;a++){var d=c.data(this[a],"olddisplay");!d&&d!=="none"&&c.data(this[a],
"olddisplay",c.css(this[a],"display"))}a=0;for(b=this.length;a<b;a++)this[a].style.display="none";return this}},_toggle:c.fn.toggle,toggle:function(a,b){var d=typeof a==="boolean";if(c.isFunction(a)&&c.isFunction(b))this._toggle.apply(this,arguments);else a==null||d?this.each(function(){var f=d?a:c(this).is(":hidden");c(this)[f?"show":"hide"]()}):this.animate(K("toggle",3),a,b);return this},fadeTo:function(a,b,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,d)},
animate:function(a,b,d,f){var e=c.speed(b,d,f);if(c.isEmptyObject(a))return this.each(e.complete);return this[e.queue===false?"each":"queue"](function(){var j=c.extend({},e),i,o=this.nodeType===1&&c(this).is(":hidden"),k=this;for(i in a){var n=i.replace(ia,ja);if(i!==n){a[n]=a[i];delete a[i];i=n}if(a[i]==="hide"&&o||a[i]==="show"&&!o)return j.complete.call(this);if((i==="height"||i==="width")&&this.style){j.display=c.css(this,"display");j.overflow=this.style.overflow}if(c.isArray(a[i])){(j.specialEasing=
j.specialEasing||{})[i]=a[i][1];a[i]=a[i][0]}}if(j.overflow!=null)this.style.overflow="hidden";j.curAnim=c.extend({},a);c.each(a,function(r,u){var z=new c.fx(k,j,r);if(Ab.test(u))z[u==="toggle"?o?"show":"hide":u](a);else{var C=Bb.exec(u),B=z.cur(true)||0;if(C){u=parseFloat(C[2]);var E=C[3]||"px";if(E!=="px"){k.style[r]=(u||1)+E;B=(u||1)/z.cur(true)*B;k.style[r]=B+E}if(C[1])u=(C[1]==="-="?-1:1)*u+B;z.custom(B,u,E)}else z.custom(B,u,"")}});return true})},stop:function(a,b){var d=c.timers;a&&this.queue([]);
this.each(function(){for(var f=d.length-1;f>=0;f--)if(d[f].elem===this){b&&d[f](true);d.splice(f,1)}});b||this.dequeue();return this}});c.each({slideDown:K("show",1),slideUp:K("hide",1),slideToggle:K("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(a,b){c.fn[a]=function(d,f){return this.animate(b,d,f)}});c.extend({speed:function(a,b,d){var f=a&&typeof a==="object"?a:{complete:d||!d&&b||c.isFunction(a)&&a,duration:a,easing:d&&b||b&&!c.isFunction(b)&&b};f.duration=c.fx.off?0:typeof f.duration===
"number"?f.duration:c.fx.speeds[f.duration]||c.fx.speeds._default;f.old=f.complete;f.complete=function(){f.queue!==false&&c(this).dequeue();c.isFunction(f.old)&&f.old.call(this)};return f},easing:{linear:function(a,b,d,f){return d+f*a},swing:function(a,b,d,f){return(-Math.cos(a*Math.PI)/2+0.5)*f+d}},timers:[],fx:function(a,b,d){this.options=b;this.elem=a;this.prop=d;if(!b.orig)b.orig={}}});c.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this);(c.fx.step[this.prop]||
c.fx.step._default)(this);if((this.prop==="height"||this.prop==="width")&&this.elem.style)this.elem.style.display="block"},cur:function(a){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];return(a=parseFloat(c.css(this.elem,this.prop,a)))&&a>-10000?a:parseFloat(c.curCSS(this.elem,this.prop))||0},custom:function(a,b,d){function f(j){return e.step(j)}this.startTime=J();this.start=a;this.end=b;this.unit=d||this.unit||"px";this.now=this.start;
this.pos=this.state=0;var e=this;f.elem=this.elem;if(f()&&c.timers.push(f)&&!W)W=setInterval(c.fx.tick,13)},show:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.show=true;this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur());c(this.elem).show()},hide:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(a){var b=J(),d=true;if(a||b>=this.options.duration+this.startTime){this.now=
this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;for(var f in this.options.curAnim)if(this.options.curAnim[f]!==true)d=false;if(d){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;a=c.data(this.elem,"olddisplay");this.elem.style.display=a?a:this.options.display;if(c.css(this.elem,"display")==="none")this.elem.style.display="block"}this.options.hide&&c(this.elem).hide();if(this.options.hide||this.options.show)for(var e in this.options.curAnim)c.style(this.elem,
e,this.options.orig[e]);this.options.complete.call(this.elem)}return false}else{e=b-this.startTime;this.state=e/this.options.duration;a=this.options.easing||(c.easing.swing?"swing":"linear");this.pos=c.easing[this.options.specialEasing&&this.options.specialEasing[this.prop]||a](this.state,e,0,1,this.options.duration);this.now=this.start+(this.end-this.start)*this.pos;this.update()}return true}};c.extend(c.fx,{tick:function(){for(var a=c.timers,b=0;b<a.length;b++)a[b]()||a.splice(b--,1);a.length||
c.fx.stop()},stop:function(){clearInterval(W);W=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){c.style(a.elem,"opacity",a.now)},_default:function(a){if(a.elem.style&&a.elem.style[a.prop]!=null)a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit;else a.elem[a.prop]=a.now}}});if(c.expr&&c.expr.filters)c.expr.filters.animated=function(a){return c.grep(c.timers,function(b){return a===b.elem}).length};c.fn.offset="getBoundingClientRect"in s.documentElement?
function(a){var b=this[0];if(a)return this.each(function(e){c.offset.setOffset(this,a,e)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);var d=b.getBoundingClientRect(),f=b.ownerDocument;b=f.body;f=f.documentElement;return{top:d.top+(self.pageYOffset||c.support.boxModel&&f.scrollTop||b.scrollTop)-(f.clientTop||b.clientTop||0),left:d.left+(self.pageXOffset||c.support.boxModel&&f.scrollLeft||b.scrollLeft)-(f.clientLeft||b.clientLeft||0)}}:function(a){var b=
this[0];if(a)return this.each(function(r){c.offset.setOffset(this,a,r)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);c.offset.initialize();var d=b.offsetParent,f=b,e=b.ownerDocument,j,i=e.documentElement,o=e.body;f=(e=e.defaultView)?e.getComputedStyle(b,null):b.currentStyle;for(var k=b.offsetTop,n=b.offsetLeft;(b=b.parentNode)&&b!==o&&b!==i;){if(c.offset.supportsFixedPosition&&f.position==="fixed")break;j=e?e.getComputedStyle(b,null):b.currentStyle;
k-=b.scrollTop;n-=b.scrollLeft;if(b===d){k+=b.offsetTop;n+=b.offsetLeft;if(c.offset.doesNotAddBorder&&!(c.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(b.nodeName))){k+=parseFloat(j.borderTopWidth)||0;n+=parseFloat(j.borderLeftWidth)||0}f=d;d=b.offsetParent}if(c.offset.subtractsBorderForOverflowNotVisible&&j.overflow!=="visible"){k+=parseFloat(j.borderTopWidth)||0;n+=parseFloat(j.borderLeftWidth)||0}f=j}if(f.position==="relative"||f.position==="static"){k+=o.offsetTop;n+=o.offsetLeft}if(c.offset.supportsFixedPosition&&
f.position==="fixed"){k+=Math.max(i.scrollTop,o.scrollTop);n+=Math.max(i.scrollLeft,o.scrollLeft)}return{top:k,left:n}};c.offset={initialize:function(){var a=s.body,b=s.createElement("div"),d,f,e,j=parseFloat(c.curCSS(a,"marginTop",true))||0;c.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"});b.innerHTML="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
a.insertBefore(b,a.firstChild);d=b.firstChild;f=d.firstChild;e=d.nextSibling.firstChild.firstChild;this.doesNotAddBorder=f.offsetTop!==5;this.doesAddBorderForTableAndCells=e.offsetTop===5;f.style.position="fixed";f.style.top="20px";this.supportsFixedPosition=f.offsetTop===20||f.offsetTop===15;f.style.position=f.style.top="";d.style.overflow="hidden";d.style.position="relative";this.subtractsBorderForOverflowNotVisible=f.offsetTop===-5;this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==j;a.removeChild(b);
c.offset.initialize=c.noop},bodyOffset:function(a){var b=a.offsetTop,d=a.offsetLeft;c.offset.initialize();if(c.offset.doesNotIncludeMarginInBodyOffset){b+=parseFloat(c.curCSS(a,"marginTop",true))||0;d+=parseFloat(c.curCSS(a,"marginLeft",true))||0}return{top:b,left:d}},setOffset:function(a,b,d){if(/static/.test(c.curCSS(a,"position")))a.style.position="relative";var f=c(a),e=f.offset(),j=parseInt(c.curCSS(a,"top",true),10)||0,i=parseInt(c.curCSS(a,"left",true),10)||0;if(c.isFunction(b))b=b.call(a,
d,e);d={top:b.top-e.top+j,left:b.left-e.left+i};"using"in b?b.using.call(a,d):f.css(d)}};c.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),d=this.offset(),f=/^body|html$/i.test(b[0].nodeName)?{top:0,left:0}:b.offset();d.top-=parseFloat(c.curCSS(a,"marginTop",true))||0;d.left-=parseFloat(c.curCSS(a,"marginLeft",true))||0;f.top+=parseFloat(c.curCSS(b[0],"borderTopWidth",true))||0;f.left+=parseFloat(c.curCSS(b[0],"borderLeftWidth",true))||0;return{top:d.top-
f.top,left:d.left-f.left}},offsetParent:function(){return this.map(function(){for(var a=this.offsetParent||s.body;a&&!/^body|html$/i.test(a.nodeName)&&c.css(a,"position")==="static";)a=a.offsetParent;return a})}});c.each(["Left","Top"],function(a,b){var d="scroll"+b;c.fn[d]=function(f){var e=this[0],j;if(!e)return null;if(f!==w)return this.each(function(){if(j=wa(this))j.scrollTo(!a?f:c(j).scrollLeft(),a?f:c(j).scrollTop());else this[d]=f});else return(j=wa(e))?"pageXOffset"in j?j[a?"pageYOffset":
"pageXOffset"]:c.support.boxModel&&j.document.documentElement[d]||j.document.body[d]:e[d]}});c.each(["Height","Width"],function(a,b){var d=b.toLowerCase();c.fn["inner"+b]=function(){return this[0]?c.css(this[0],d,false,"padding"):null};c.fn["outer"+b]=function(f){return this[0]?c.css(this[0],d,false,f?"margin":"border"):null};c.fn[d]=function(f){var e=this[0];if(!e)return f==null?null:this;if(c.isFunction(f))return this.each(function(j){var i=c(this);i[d](f.call(this,j,i[d]()))});return"scrollTo"in
e&&e.document?e.document.compatMode==="CSS1Compat"&&e.document.documentElement["client"+b]||e.document.body["client"+b]:e.nodeType===9?Math.max(e.documentElement["client"+b],e.body["scroll"+b],e.documentElement["scroll"+b],e.body["offset"+b],e.documentElement["offset"+b]):f===w?c.css(e,d):this.css(d,typeof f==="string"?f:f+"px")}});A.jQuery=A.$=c})(window);

var jQuery = window.jQuery;
jQuery.noConflict();
if(Old_jQuery){
	window.jQuery = Old_jQuery;
}

function _xlThunderQtyPV(){try{vhref = "http://analytics-union.xunlei.com/PV?peerid=0&uri=http://thunderqtypv.union.xunlei.com&src=" + document.domain;image1 = new Image(1,1);image1.src=vhref;} catch(e) { }}

_xlThunderQtyPV();

//insert mac plugin start
var g_thunderPluginId = "xunlei_com_thunder_helper_plugin_d462f475-c18e-46be-bd10-327458d045bd";
var platform = navigator.platform;
if(platform == "MacIntel"){
    incase_body_null();
    jQuery('#'+g_thunderPluginId).remove();//if exists plugins then remove 
	//注入Plugin object
	var e = document.createElement("embed");
	e.id = g_thunderPluginId;
	e.type = "application/thunder_download_plugin";
	e.height = "0";
	e.width = "0";
	document.body.appendChild(e);
}
//insert mac plugin end

var daohangThunder=false;
var thunder_linkType;
// var selectThunderType = "coWebThunder"; //default download client type
var selectThunderType = "coThunder5";
// var selectThunderType = "coMiniThunder";
var mustBeSelectedThunder = false;
var thunder_isOpenNewWindow = 10;
var isThunder5=0;
var fFpluginXB=false;
var fFXbObj;
var stat_peerid_cookiename = "thunder_union_stat_xx_ss";
var thunder_isIE=(GetUserBrowser() == 'IE');;
isFun 	 = function(a){return typeof a == "function";};
isNull 	 = function(a){return typeof a == "object" && !a;};
isNumber = function(a){return typeof a == "number" && isFinite(a);};
isObject = function(a){return (a && typeof a == "object") || isFun(a);};
isString = function(a){return typeof a == "string";};
isArray  = function(a){return isObject(a) && a.constructor == Array;};
isUndef  = function(a){return typeof a == "undefined";};
DoNothing = function(){};


/* Decode the refrence URL */



rnd.today=new Date();
rnd.seed=rnd.today.getTime();
function rnd() {
rnd.seed = (rnd.seed*9301+49297) % 233280;
return rnd.seed/(233280.0);
};
function rand(number) {
return Math.ceil(rnd()*number);
};


function setCookie(name, value, expire) {
window.document.cookie = name + "=" + escape(value) + ((expire == null) ? "" : ("; expires=" + expire.toGMTString()));
}

function getCookie(Name) {
   var search = Name + "=";
   if (window.document.cookie.length > 0) {
     offset = window.document.cookie.indexOf(search);
         if (offset != -1) {
       offset += search.length;
           end = window.document.cookie.indexOf(";", offset)
           if (end == -1)
             end = window.document.cookie.length;
           return unescape(window.document.cookie.substring(offset, end));
     }
   }
   return null;
}

function register(name) {
var today = new Date();
var expires = new Date();
expires.setTime(today.getTime() + 1000*60*60*24);
setCookie("SexMovie", name, expires);
}


function Decode(str){
	str = str.replace(/&lt/g,"<");
	str = str.replace(/&gt/g,">");
	str = str.replace(/&amp/g,"&");
	str = str.replace(/&quot/g,"\"");
	str = str.replace(/&apos/g,"\'");
	str = str.replace(/<br>/g,"\n");
	return str;
}

function wtd_ChangFolder(pid)
{

  var thunder_Contents = pid / 10000 ;

 if(thunder_Contents != null && thunder_Contents > 0)
 {
   thunder_Contents = Math.floor(thunder_Contents)+1;
   if(selectThunderType == "coWebThunder" && mustBeSelectedThunder == true )
   {
     return "http://hezuo.down.xunlei.com/webxunlei_hezuo_"+thunder_Contents+"/webxl_"+pid+".exe";
   }
   else
   {
	   //return "http://hezuo.down.xunlei.com/xunlei_hezuo_"+thunder_Contents+"/thunder("+pid+").exe";
	   return "http://hezuo.down.xunlei.com/xl_hezuo_"+thunder_Contents+"/ab/thunder("+pid+").exe";
   }
 }
 else
 {

   if(selectThunderType == "coWebThunder" && mustBeSelectedThunder == true )
   {
        return "http://hezuo.down.xunlei.com/webxunlei_hezuo_1/webxl_00000.exe";
   }
   else
   {
	     return "http://hezuo.down.xunlei.com/xunlei_hezuo_1/thunder(00000).exe";
   }

 }

}



function OnDownloadClick_Company(sDownloadURL,sResName, sRefPage, sPid, isOpenNewWindow, sType,selectType,sCompany)
{

	Thunder.companySetup(sCompany,sPid);

	OnDownloadClick(sDownloadURL,sResName, sRefPage, sPid, isOpenNewWindow, sType,selectType);
	return false;
}
function OnDownloadClick(sDownloadURL,sResName, sRefPage,sPid,isOpenNewWindow,sType,selectType){

	//默认调用客户端
	//sResName = "tcfc";
    var browserName = GetUserBrowser();
    var osType = GetUserOSType();
	//重置isThunder5，防止在同一个页面多次点击时，一直升级
	isThunder5 = 0;
    if(osType == 'iPhone' || osType == 'iPad' || osType=='iPod')
    {
        iPhoneDownload(sDownloadURL,sPid,'1',linkObj);
    }
    else if(browserName == 'MacBrowser')//mac handle
    {
        productMacShow(sDownloadURL,sPid,'1',linkObj,isOpenNewWindow);
    }
    else if(browserName == 'Android')
    {
        productAndroidShow(sDownloadURL, sPid, '1', linkObj, isOpenNewWindow);
    }
    else{
             //if(rand(1) == 1 && sResName !="tcfc") {//remove box liuguanghui 2013-06-08    //show(sDownloadURL,sPid);  
               if(false){
			   var linkObj = jQuery('<a></a>').attr({
                            thunderHref:sDownloadURL,
                            thunderResTitle:sResName,
                            thunderPid:sPid,
                            thunderType:sType,
                            CompanyName:''
                    });
                    //linkObj.setAttribute(thunderHrefAttr,sDownloadURL);
                    //if(sDownload == null) linkObj.getAttribute("thunderHref");//兼容老版

                    var body = jQuery('body');
                    if(body.length==0 || (body.length==1 && !body[0])){
                            document.write("<html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'></head><body style='font:normal 12px/1.6em Arial, simsun,Tahoma, Verdana, Lucida, Helvetica, sans-serif;'></body></html>");
                            body = jQuery('body');
                    }
                    body.append(linkObj);
                    linkObj.hide();

                    if(isShowQrcodeDashboard(sPid))
                    {
                        loadQrDashBoardCss();
                        productMobileShow(sDownloadURL, sPid, '1', linkObj[0], isOpenNewWindow);
                    }
                    else
                        productShow(sDownloadURL,sPid,"1",linkObj[0],isOpenNewWindow);
                    return false;
            }
            else {
                    genUniquePeerid();
                    thunderStat1030(1,sPid);
                    sPid=sPid?sPid:"";if(sType=="07") sPid="g"+sPid;
                    sResName="";
                    daohangThunder=true;
                    Thunder.infoType=10;
                    Thunder.pId=sPid?sPid:"";
                    try{
                            if(selectThunderType=='coWebThunder'){
                                    selectType=3
                            }else if(selectThunderType=='coThunder5'){
                                    selectType=4
                            }else{
                                    selectType=5
                            }
                    }catch(e){
                            if(selectType && !isNaN(selectType)) selectType=Number(selectType);

                    }
                    if(selectType==3 || selectType==4){Thunder.thunderType=selectType;
                    // if(selectType==3) Thunder.mustUseSelected=true;
                    }

                    if(typeof(isOpenNewWindow)!="boolean"){
                            if(isNaN(isOpenNewWindow)) isOpenNewWindow=undefined; else isOpenNewWindow=Number(isOpenNewWindow);
                            if(isOpenNewWindow!=2 && isOpenNewWindow!=10) isOpenNewWindow=undefined;
                    }

                    if((isOpenNewWindow==true ||isOpenNewWindow==10) && isOpenNewWindow!=undefined)
                            Thunder.isOpenNew=true;
                    else if((isOpenNewWindow==false ||isOpenNewWindow==2) && isOpenNewWindow!=undefined)
                            Thunder.isOpenNew=false;

                if(!thunder_isIE)
                {
                    //var fFXbPlugin = firefoxThunderDownload(sDownloadURL);
					DownloadByThunder(sDownloadURL,sPid);
                }
                //if(fFXbPlugin == true)
                //{
                //        fFXbObj.OpenDownloadDlg(sDownloadURL,'http://www.155.com/?id=xb2',document.cookie);
                //}
                else
                {
                        return Thunder.download(sDownloadURL,sRefPage,sResName,sResName);
                }
            }
    }
    return false;
}




/*add by ly 2015-6-2*/

jQuery(document).ready(function(){
	try{
		var headLoc = document.getElementsByTagName("head").item(0);
		var style = document.createElement("link");
		style.setAttribute("type", "text/css");
		style.setAttribute("rel", "stylesheet");
		style.setAttribute("charset", "utf-8");
		style.setAttribute("href", "http://act.vip.xunlei.com/vip/2015/union/css/style.css");
		headLoc.appendChild(style);
	}catch(e){
		document.write('<link rel="stylesheet" charset="utf-8" type="text/css" href="http://act.vip.xunlei.com/vip/2015/union/css/style.css" />');
	}
	var op = document.createElement("div");
        op.setAttribute('id', 'showXLdiv');
        op.style.display = 'none';
        document.body.appendChild(op);
});



function showDiv(sUrl,sPid,sType,sTitle){
	var str = '';
	str += '<div class="thunder_wp_pop thunder_pop-tips">';
	str += '	<div class="thunder_pop_hd">';
	str += '		<a href="javascript:;" class="thunder_ico-close thunder_spr-close" target="_self" onclick="closeDiv(\'ppmoneyPop_close\')"></a>';
	str += '	</div>';
	str += '	<div class="thunder_pop_bd">';
	str += '		<div class="thunder_tips_info">';
	str += '			<h3 class="thunder_tips_title">PPmoney <em class="thunder_tips_title_em">'+decodeURIComponent("%e7%90%86%e8%b4%a2%e6%9c%8d%e5%8a%a15%e4%ba%bf%e7%bd%91%e6%b0%91")+'</em></h3>';
	str += '			<div class="thunder_tips_cont">';
   	str += '				<p class="thunder_tips_ban">'+decodeURIComponent("%e6%90%ba%e6%89%8b%e8%bf%85%e9%9b%b7%ef%bc%8c%e8%ae%a9%e4%b8%8b%e8%bd%bd%e9%a3%9e%e5%bf%ab")+'</p>';
	str += '				<p class="thunder_tips_warn">'+decodeURIComponent("%e8%b5%a0%e9%80%81 %e8%bf%85%e9%9b%b7%e7%99%bd%e9%87%91%e4%bc%9a%e5%91%98%e3%80%8110%e5%85%83%e8%af%9d%e8%b4%b9%e3%80%8120%e5%85%83%e7%8e%b0%e9%87%91")+'</p>';
	str += '				<div class="thunder_tips_handle">';
	str += '					<a href="http://cnt.ppmoney.com/special/2015/01/reg-dytt.html?utm_source=DYTT" target="_blank" class="thunder_btn-primary" onclick="StatisticsClick(\'ppmoneyPop_get\')">'+decodeURIComponent("%e5%85%8d%e8%b4%b9%e9%a2%86%e4%bc%9a%e5%91%98")+'</a>';
	if(thunderHrefAttr == ''){
		str +='						<a class="thunder_btn-secondary" target="_self" href="#" thunderHref="' +  sUrl + '" thunderPid="' + sPid + '" thunderType="' + sType + '" thunderResTitle="' + sTitle + '" onClick=" StatisticsClick(\'ppmoneyPop_download\'); OnDownloadClick_div(this,2)" oncontextmenu="ThunderNetwork_SetHref(this)">'+decodeURIComponent("%e7%bb%a7%e7%bb%ad%e4%b8%8b%e8%bd%bd")+'</a>';

	}else{
		str +='						<a class="thunder_btn-secondary" target="_self" href="#" '+thunderHrefAttr+'="' +  sUrl + '" thunderPid="' + sPid + '" thunderType="' + sType + '" thunderResTitle="' + sTitle + '" onClick=" StatisticsClick(\'ppmoneyPop_download\'); OnDownloadClick_div(this,2)" oncontextmenu="ThunderNetwork_SetHref(this)">'+decodeURIComponent("%e7%bb%a7%e7%bb%ad%e4%b8%8b%e8%bd%bd")+'</a>';
	}
	
	str += '				</div>';
	str += '			</div>';
	str += '		</div>';
	str += '	</div>';
	str += '	<div class="thunder_pop_extra">';
	str += '		<div class="thunder_action_superman thunder_spr-superman"></div>';
	str += '	</div>';
	str += '</div>';
	jQuery('#showXLdiv').html(str);
	jQuery('#showXLdiv').show();
}




function OnDownloadClick_Simple(linkObj,isOpenNewWindow,selectType,isFloatingLayer){
	var sPid = linkObj.getAttribute("thunderPid");
    var sType = linkObj.getAttribute("thunderType");
    var sTitle = linkObj.getAttribute("thunderResTitle");
    
    if(typeof linkObj.getAttribute('thunderHref') == 'undefined'){
    	var sUrl = linkObj.getAttribute(thunderHrefAttr);
    } else {
    	var sUrl = linkObj.getAttribute('thunderHref');
    }
    if(IsPC()){
	    if(sPid == '04130'){//电影天堂
	    	 var sUrl = linkObj.getAttribute(thunderHrefAttr);
	    		showDiv(sUrl,sPid,sType,sTitle);
	    		return false;
	    } else {
	    	 OnDownloadClick_div(linkObj,isOpenNewWindow,selectType,isFloatingLayer);
			 return false;
	    }
    } else {
    	OnDownloadClick_div(linkObj,isOpenNewWindow,selectType,isFloatingLayer);
		return false;
    }
	return false;
}



function OnDownloadClick_div(linkObj,isOpenNewWindow,selectType,isFloatingLayer)
{
    thunder_linkType=1;
    var isFloatingLayer=isFloatingLayer;
    var sDownload = "";
    var browserName = GetUserBrowser();
    var browserType = browserName;
    var osType = GetUserOSType();
    if(sDownload == ""){
		sDownload = linkObj.getAttribute(thunderHrefAttr);
        if(sDownload == null || sDownload == '' ) sDownload = linkObj.getAttribute("thunderHref");//兼容老版
    }
    var sResName ="";
    var sRefPage = location.href;
    var sPid = linkObj.getAttribute("thunderPid");
    var sType = linkObj.getAttribute("thunderType");
    var sCompany= linkObj.getAttribute("CompanyName");
    
    //if(isFloatingLayer != 5 && rand(1) == 1)
    var osType = GetUserOSType();
    if(osType == 'iPhone' || osType == 'iPad' || osType=='iPod')
    {
        iPhoneDownload(sDownload,sPid,'1',linkObj);
    }
    else if(browserName == 'MacBrowser')//mac handle
    {
        productMacShow(sDownload,sPid,'1',linkObj,isOpenNewWindow);
    }
    else if(browserName == 'Android')
    {
        productAndroidShow(sDownload, sPid, '1', linkObj, isOpenNewWindow);
    }
    else if(false)//if(isFloatingLayer != 5 && rand(1) == 1) remove box by liuguanghui  2013-06-08
    {
        if(isShowQrcodeDashboard(sPid))
        {
            loadQrDashBoardCss();
            productMobileShow(sDownload, sPid, '1', linkObj, isOpenNewWindow);
        }
        else
        {
            productShow(sDownload,sPid,"1",linkObj,isOpenNewWindow);
        }
    }
    else
    {
        if(browserType == "Firefox" || browserType == "Chrome" || browserType == "SB360"){
                DownloadByThunder(sDownload,sPid);
        }else if (browserType == "unknown"){
                alert(unescape("\u62B1\u6B49\uFF0C\u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u8FC5\u96F7\u4E13\u7528\u94FE\u4E0B\u8F7D\uFF0C\u8BF7\u66F4\u6362\u522B\u7684\u6D4F\u89C8\u5668\28\u5982IE\29\u518D\u8BD5"));
        }else{
                OnDownloadClick(sDownload, 'tcfc', location.href, sPid, false, '');
        }
        return false;
    }
    return false;
}

//add by ly end


//for android
function OnDownloadClick_Mobile(linkObj,isOpenNewWindow,selectType,isFloatingLayer)
{
        thunder_linkType=1;
	 var sDownload = "";
	 if(sDownload == ""){
	   sDownload = linkObj.getAttribute(thunderHrefAttr);
	 }
	var sResName = linkObj.getAttribute("thunderResTitle");
	var sRefPage = location.href;
	var sPid = linkObj.getAttribute("thunderPid");
	var sType = linkObj.getAttribute("thunderType");
	var sCompany= linkObj.getAttribute("CompanyName");
        
        productMobileShow(sDownload,sPid,"1",linkObj,isOpenNewWindow);
        ThunderNetwork_UnsetHref(linkObj);
        return false;
}
function isShowQrcodeDashboard(sPid)
{
    var qrcode_ids = {'12023':'12023','37826':'37826','02503':'02503','106069':'106069','50552':'50552','131181':'131181','05455':'05455','130465':'130465','00888':'00888','987285':'987285','45639':'45639','104290':'104290','19116':'19116','45650':'45650','131553':'131553','127891':'127891','21319':'21319','13853':'13853','04130':'04130','03247':'03247','16214':'16214','30540':'30540','49605':'49605','103492':'103492','04573':'04573','37897':'37897','35008':'35008','47035':'47035'};
    if(qrcode_ids[sPid])
        return true;
    else
        return false;
}

//qrcode dashboard code
var td_status_red = '#ba2020';
var td_status_green = '#5bb956';
var close_Dashboard_timer;
var time_to_hidetip = '';
var isIE6= navigator.appVersion.indexOf("MSIE 6")>-1;
function productMobileShow(sDownloadURL, sPid, sFlag, linkObj, iswindowOpen){

    var tCharset = document.charset;
    if (navigator.userAgent.indexOf('Firefox') >= 0) {
        tCharset = document.characterSet;
    }

    if (tCharset == null || tCharset == "") {
        tCharset = "gb2312";
    }
    var sourceName2 = encodeURIComponent(document.title);
    if (sourceName2 == "" || sourceName2 == null) {
        sourceName2 = unescape("%u8FC5%u96F7");
    }
    var thunder_pid = sPid;
    removeFdiv();
    var tip_for_ie5 = '';
    if(document.compatMode.toLowerCase() == 'backcompat' && navigator.appVersion.indexOf("MSIE")>-1)
           tip_for_ie5 = 'thunder_m_tip_ie5';
    var layer_html='<iframe id="thunder_m_iframe"></iframe><div class="thunder_m_tip '+tip_for_ie5+'"><h2><span>\u65b9\u5f0f\u9009\u62e9</span><a href="javascript:void(0);"id="union_download_close"class="thunder_m_close"title="\u5173\u95ed">\u5173\u95ed</a></h2><div class="thunder_m_content"><div class="thunder_m_left"><div><h3 class="thunder_m_h_tt">\u4e0b\u8f7d\u5230\u624b\u673a</h3><div id="thunder_rpcode_loading"class="thunder_m_load"><img src="http://pstatic.xunlei.com/js/v2/img/loading.gif"alt="loading"class="thunder_m_loading"/><p class="thunder_m_now">\u6b63\u5728\u52a0\u8f7d\u4e8c\u7ef4\u7801</p></div><p id="thunder_load_code_fail"class="thunder_m_fa">\u4e8c\u7ef4\u7801\u52a0\u8f7d\u5931\u8d25<br/><a href="javascript:void(0);"id="thunder_reload_rpcode_img"title="\u91cd\u65b0\u52a0\u8f7d">\u91cd\u65b0\u52a0\u8f7d</a></p><div class="thunder_m_t_w"><img id="thunder_rpcode_img"width="111"height="111"src=""alt="\u4f7f\u7528\u624b\u96f7\uff0c\u626b\u63cf\u4e8c\u7ef4\u7801\u4e0b\u8f7d"/><p>\u7528\u624b\u673a\u626b\u63cf\u4e8c\u7ef4\u7801<span>\u4f7f\u7528<a target="_blank"id="thunder_m_help_link"href="http://bbs.xunlei.com/forum.php?mod=viewthread&tid=20031&fromuid=5350"title="\u5e2e\u52a9">\u5e2e\u52a9</a></span></p></div></div></div><div class="thunder_m_right"><h3 class="thunder_m_h_tt">\u4e0b\u8f7d\u5230\u7535\u8111</h3><img src="http://pstatic.xunlei.com/js/v2/img/pic01.jpg"alt="\u8702\u9e1f"/><a href="javascript:void(0);"title="\u8fc5\u96f7\u4e0b\u8f7d"id="union_download_thunder">\u8fc5\u96f7\u4e0b\u8f7d</a></div></div><div class="thunder_m_foot"><div class="thunder_m_download"><h3 class="thunder_m_h_tt">\u901a\u8fc7\u624b\u673a\u77ed\u4fe1\u4e0b\u8f7d</h3><div class="thunder_m_form"><input type="text"tabindex="1"id="thunder_m_phone"class="thunder_m_s_text"value="\u8f93\u5165\u624b\u673a\u53f7\uff0c\u514d\u8d39\u4e0b\u8f7d"/><input type="submit"id="thunder_m_send_sms"title="\u53d1\u9001"value="\u53d1\u9001"class="thunder_m_s_bt"disabled/></div><div class="thunder_m_valid"><input type="text"id="thunder_m_valid"tabindex="2"class=""value="\u8f93\u5165\u9a8c\u8bc1\u7801"/><img src=""id="thunder_m_check_code"alt=""/><a href="javascript:void(0);"id="thunder_m_change_code"title="\u6362\u4e00\u5f20">\u6362\u4e00\u5f20</a></div><p id="thunder_m_note"></p></div><p class="thunder_m_already"><span></span>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);"id="td_m_cancel_task_status">\u53d6\u6d88</a></p></div><input type="hidden"id="thunder_m_short_url"/><input type="hidden"id="thunder_m_client_checkcode"/></div>';
    var thunder_m_fdiv = document.createElement("div");
    thunder_m_fdiv.setAttribute("id", "thunder_m_fdiv");
    var thunderObj = sDownloadURL;
    var thunder_m_opac = document.createElement("div");
    thunder_m_opac.setAttribute("id", "thunder_m_opac");
    thunder_m_opac.className = 'thunder_m_opac';
    thunder_m_opac.style.zIndex = "999999";
    incase_body_null();
    document.body.appendChild(thunder_m_fdiv);
    if (thunderObj) {
            function showHtml(){
                thunder_m_fdiv.innerHTML = layer_html;
                thunder_m_fdiv.style.overflow = 'hidden';
                thunder_m_fdiv.style.zIndex = "1000000";
                sDownloadURL = sDownloadURL;//encodeURIComponent(sDownloadURL);
                var surl = location.href;// encodeURIComponent(location.href);
                jQuery("#thunder_m_short_url").val('');
                jQuery("#thunder_m_client_checkcode").val('');
                jQuery('#union_download_thunder').unbind('click').click(function(){
                    var browserType = GetUserBrowser();
                    if(browserType == "Firefox" || browserType == "Chrome" || browserType == "SB360"){
                            DownloadByThunder(thunderObj,thunder_pid);
                    }else if (browserType == "unknown"){
                            alert(unescape("\u62B1\u6B49\uFF0C\u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u8FC5\u96F7\u4E13\u7528\u94FE\u4E0B\u8F7D\uFF0C\u8BF7\u66F4\u6362\u522B\u7684\u6D4F\u89C8\u5668\28\u5982IE\29\u518D\u8BD5"));
                    }else{
                            OnDownloadClick(thunderObj, 'tcfc', location.href, thunder_pid, false, '');
                    }
                    thunderCloseDashboard();
                    thunderMobileStat(6);
                    return false;
                });
                
                jQuery('#union_download_close').unbind('click').click(function(){
                    thunderCloseDashboard();
                    return false;
                });
                
                jQuery("#thunder_m_gotoshoulei").unbind('click').click(function(){
                    thunderMobileStat(8);
                });
                jQuery("#thunder_m_help_link").unbind('click').click(function(){
                    thunderMobileStat(20);
                });
                jQuery('#td_m_cancel_task_status').unbind('click').click(function(){
                    close_Dashboard_timer = clearInterval(close_Dashboard_timer);
                    jQuery(".thunder_m_tip .thunder_m_foot").hide();
                    jQuery(".thunder_m_tip .thunder_m_already").hide();
                    
                    //jQuery(".thunder_m_tip .thunder_m_download p").hide();
                    //jQuery(".thunder_m_tip .thunder_m_download").fadeIn('normal');
                    
                    return false;
                });
                
                jQuery('#thunder_m_change_code,#thunder_m_check_code').unbind('click').click(function(){
                    showCheckCode();
                    return false;
                });
                jQuery('#thunder_m_phone').unbind().focus(function(){
                    var phone =  jQuery('#thunder_m_phone').val();
                    if(phone == '\u8f93\u5165\u624b\u673a\u53f7\uff0c\u514d\u8d39\u4e0b\u8f7d')
                    {
                        jQuery('#thunder_m_phone').val('');
                        jQuery('#thunder_m_phone').addClass('thunder_m_on1');
                    }
                }).blur(
                    function(){
                        var phone = jQuery('#thunder_m_phone').val();
                        if(phone == '')
                        {
                            jQuery('#thunder_m_phone').removeClass('thunder_m_on1');
                            jQuery('#thunder_m_phone').val('\u8f93\u5165\u624b\u673a\u53f7\uff0c\u514d\u8d39\u4e0b\u8f7d')
                        }
                    }
                );
                jQuery('#thunder_m_valid').unbind().focus(function(){
                    var phone =  jQuery('#thunder_m_valid').val();
                    if(phone == '\u8f93\u5165\u9a8c\u8bc1\u7801')
                    {
                        jQuery('#thunder_m_valid').val('');
                        jQuery('#thunder_m_valid').addClass('thunder_m_on1');
                    }
                }).blur(
                    function(){
                        var phone = jQuery('#thunder_m_valid').val();
                        if(phone == '')
                        {
                            jQuery('#thunder_m_valid').removeClass('thunder_m_on1');
                            jQuery('#thunder_m_valid').val('\u8f93\u5165\u9a8c\u8bc1\u7801')
                        }
                    }
                );
                jQuery('#thunder_m_phone').unbind('keyup').keyup(function(){
                    var reg = /^(\+86)?(13[0-9]|15[0-9]|18[0-9]|147)\d{8}$/;
                    var phone = jQuery('#thunder_m_phone').val();
                    if(reg.test(phone))
                    {
                        jQuery('#thunder_m_send_sms').addClass('thunder_m_on');
                        jQuery('#thunder_m_send_sms').removeAttr('disabled');
                    }
                    else
                    {
                        jQuery('#thunder_m_send_sms').removeClass('thunder_m_on');
                        jQuery('#thunder_m_send_sms').attr('disabled','disabled');
                    }
                });
                jQuery('#thunder_m_send_sms').unbind('click').click(function(){
                    var reg = /^(\+86)?(13[0-9]|15[0-9]|18[0-9]|147)\d{8}$/;
                    var phone = jQuery('#thunder_m_phone').val();
                    time_to_hidetip = clearTimeout(time_to_hidetip);
                    jQuery('.thunder_m_tip #thunder_m_note').hide();
                    if(reg.test(phone))
                    {
                        var verify_code = jQuery('.thunder_m_tip #thunder_m_valid').val();
                        if(verify_code == '\u8f93\u5165\u9a8c\u8bc1\u7801')
                        {
                            jQuery('.thunder_m_tip  #thunder_m_note').css('color',td_status_red).html('\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801').show();
                            jQuery('.thunder_m_tip #thunder_m_valid').focus();
                            return false;
                        }
                        if(verify_code.length != 4 )
                        {
                            jQuery('.thunder_m_tip  #thunder_m_note').css('color',td_status_red).html('\u9a8c\u8bc1\u7801\u9519\u8bef').show();
                            jQuery('.thunder_m_tip #thunder_m_valid').focus();
                            return false;
                        }
                        //send sms
                        var short_url = jQuery("#thunder_m_short_url").val();
                        var check_code = jQuery("#thunder_m_client_checkcode").val();
                        if(short_url == '')
                        {
                            jQuery('.thunder_m_tip #thunder_m_note').css('color',td_status_red).html('\u77ed\u4fe1\u53d1\u9001\u5931\u8d25').show();
                            return false;
                        }
                        //sending.....
                        jQuery('.thunder_m_tip #thunder_m_note').css('color',td_status_red).html('\u77ed\u4fe1\u53d1\u9001\u4e2d...').show();
                        jQuery('#thunder_m_send_sms').removeClass('thunder_m_on');
                        jQuery('#thunder_m_send_sms').attr('disabled','disabled');
                        
                        sendSms(short_url,check_code);
                    }
                    else
                    {
                        jQuery('.thunder_m_tip #thunder_m_note').css('color',td_status_red).html('\u60a8\u7684\u624b\u673a\u53f7\u7801\u65e0\u6548').show();
                        return false;
                    }
                });
                showCheckCode();
                //getTwo-dimensional code
                tdGetRpcodesync(sDownloadURL,sPid,surl,normalSucFunc,normalEorrorFunc);
                var jqPopDiv = jQuery('#thunder_m_fdiv');
                if (jqPopDiv.length == 0) {
                    return false;
                }
                var bodyObj = getDocBodyObj();
                var dleft = (bodyObj.clientWidth / 2) - 400 / 2;
                var dtop = bodyObj.clientHeight / 2 - 400 / 2;
                var position = 'fixed';
                
                if(isIE6 || document.compatMode.toLowerCase() == 'backcompat')
                {
                    position = 'absolute'; 
                    dleft = (bodyObj.clientWidth / 2) - 400 / 2 + document.documentElement.scrollLeft + document.body.scrollLeft;
                    dtop = bodyObj.clientHeight / 2 - 360 / 2 + document.documentElement.scrollTop + document.body.scrollTop;
                    thunder_m_opac.style.top = Math.max(document.documentElement.scrollTop,document.body.scrollTop);
                }
                               
                jqPopDiv.css({
                    left: dleft,
                    top: dtop,
                    position: position,
                    zIndex: 9000000000
                });
                document.body.appendChild(thunder_m_opac);
                thunderMobileStat(3);
                return false;
    }
    showHtml();
    if(isIE6 || document.compatMode.toLowerCase() == 'backcompat')
    {
        thunder_m_opac.style.height=Math.max(document.body.clientHeight, document.documentElement.clientHeight);
        jQuery(window).unbind('scroll').scroll(function(){
            var scroll_opac = jQuery('#thunder_m_opac');
            if(scroll_opac.length>0)
            {
                var bodyObj = getDocBodyObj();
                scroll_opac.css('top',bodyObj.scrollTop);
                var dtop = bodyObj.clientHeight / 2 - 360 / 2 + document.documentElement.scrollTop + document.body.scrollTop;
                jQuery('#thunder_m_fdiv').css('top',dtop);
            }
        });
    }

    return false;
}
}
function tdGetRpcodesync(sDownloadURL,sPid,surl,sucFunc,errorFunc){
    var peerID = getPeerID();
    var z = '{"f":"'+sPid+'","b":"webpage"';
    if(peerID != '')
    {
        z += ',"p":"'+peerID+'"';
    }
    z+= '}';
    var data = {
            fileurl:sDownloadURL,
            z:z,
            pageurl:surl
        };
    var XHR_SUCCESS = false;
    var XHR =jQuery.ajax({
        url: 'http://u.155.com/download/create?',
        data: data,
        dataType: 'jsonp',
        timeout: 10000,
        success: function(tData){
            if(XHR_SUCCESS == '-1')
            {
                return false;
            }
            XHR_SUCCESS = true;
            sucFunc(tData,sDownloadURL,sPid,surl);
            if(tData.status == 0)
            {
                tdListenerTaskStatus(tData);
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
                errorFunc(sDownloadURL,sPid,surl);
        }
    });
    setTimeout(function(){
        if (XHR_SUCCESS)
            return;
        else {
            XHR_SUCCESS = -1;
            try {
                XHR.abort();
                errorFunc(sDownloadURL,sPid,surl);
            } catch (e) {
                errorFunc(sDownloadURL,sPid,surl);
            }
        }
    },10000);
}

function normalSucFunc(tData,sDownloadURL,sPid,surl)
{
    if(tData.status == 0)
    {
        var img = new Image();
        var qrUrl = tData.url;
        img.src = "http://u.155.com/qr?data=" + encodeURIComponent(qrUrl);
        img.onload =function(){
            jQuery("#thunder_rpcode_img").attr('src',img.src);
            jQuery("#thunder_rpcode_loading").hide();
            jQuery("#thunder_rpcode_img").parent().show();
        };
        img.onerror = function(){
                loadRpcodeFail(sDownloadURL,sPid,surl);
        };
        //save info
        jQuery("#thunder_m_short_url").val(tData.url);
        jQuery("#thunder_m_client_checkcode").val(tData.checkcode);
    }
    else
    {
        loadRpcodeFail(sDownloadURL,sPid,surl);
    }
}

function normalEorrorFunc(sDownloadURL,sPid,surl)
{
    loadRpcodeFail(sDownloadURL,sPid,surl);
}

function preSmsSucFunc(tData,sDownloadURL,sPid,surl)
{
    if(tData.status == 0)
    {
        //send sms
        sendSms(tData.url,tData.checkcode)
    }
    else
    {
        jQuery('#thunder_m_send_sms').addClass('thunder_m_on');
        jQuery('#thunder_m_send_sms').removeAttr('disabled');
        jQuery('.thunder_m_tip #thunder_m_note').css('color',td_status_red).html('\u670d\u52a1\u5668\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5').show();
    }
}

function preSmsErrorFunc()
{
    jQuery('#thunder_m_send_sms').addClass('thunder_m_on');
    jQuery('#thunder_m_send_sms').removeAttr('disabled');
    jQuery('.thunder_m_tip #thunder_m_note').css('color',td_status_red).html('\u670d\u52a1\u5668\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5').show();
}

function loadRpcodeFail(sDownloadURL,sPid,surl)
{
    jQuery("#thunder_load_code_fail").show();
    jQuery("#thunder_rpcode_loading").hide();
    jQuery("#thunder_rpcode_img").parent().hide();
    jQuery("#thunder_reload_rpcode_img").unbind('click').click(function(){
            jQuery("#thunder_load_code_fail").hide();
            jQuery("#thunder_rpcode_loading").show();
            tdGetRpcodesync(sDownloadURL,sPid,surl,normalSucFunc,normalEorrorFunc);
            
    });
}

function sendSms(short_url,check_code)
{
    var qrUrl = short_url;
    jQuery.ajax({
        url: 'http://url.xunlei.com/sendsms?',
        data: {
            short_url:qrUrl,
            phone:jQuery('#thunder_m_phone').val(),
            verify_code:jQuery('#thunder_m_valid').val()
        },
        dataType: 'jsonp',
        timeout: 10000,
        success: function(data){
            try{
                if(data.status == 0)
                {
                    jQuery('.thunder_m_tip #thunder_m_note').css('color',td_status_green).html('\u77ed\u4fe1\u5df2\u53d1\u9001\uff0c\u53ef\u80fd\u67093-5\u5206\u949f\u5ef6\u8fdf').show();
                    //time to show
                    jQuery('#thunder_m_phone').removeClass('thunder_m_on1').val('\u8f93\u5165\u624b\u673a\u53f7\uff0c\u514d\u8d39\u4e0b\u8f7d');
                    thunderMobileStat(5);
                }
                else
                {
                    jQuery('#thunder_m_send_sms').addClass('thunder_m_on');
                    jQuery('#thunder_m_send_sms').removeAttr('disabled');
                    jQuery('.thunder_m_tip #thunder_m_note').css('color',td_status_red).html(data.msg).show();
                }
                time_to_hidetip = setTimeout(function(){
                        jQuery('.thunder_m_tip #thunder_m_note').hide();
                    },5000);
            }
            catch(e)
            {
                jQuery('#thunder_m_send_sms').addClass('thunder_m_on');
                jQuery('#thunder_m_send_sms').removeAttr('disabled');
                jQuery('.thunder_m_tip #thunder_m_note').css('color',td_status_red).html('\u670d\u52a1\u5668\u9519\u8bef').show();
            }
            showCheckCode();
        },
        error: function(){
                
                jQuery('#thunder_m_send_sms').addClass('thunder_m_on');
                jQuery('#thunder_m_send_sms').removeAttr('disabled');
                jQuery('.thunder_m_tip #thunder_m_note').css('color',td_status_red).html('\u8bf7\u6c42\u8d85\u65f6\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5').show();
                showCheckCode();
        }
    });
}

function tdListenerTaskStatus(data)
{
    var ajxObj = null;
        ajxObj = jQuery.ajax({
        url: 'http://status.u.155.com/download/query',
        data: {
            checkcode:data.checkcode
        },
        dataType: 'jsonp',
        timeout: 60000,
        success: function(data){
            if(data.status == 0)
            {
                //jQuery(".thunder_m_tip .thunder_m_download").hide();
                var cur_time_sec = 10;
                jQuery(".thunder_m_tip .thunder_m_foot").fadeIn('normal');
                jQuery(".thunder_m_tip .thunder_m_already span").html('\u624b\u96f7\u5df2\u5efa\u7acb\u4efb\u52a1\uff0c\u4e0b\u8f7d\u9875\u5728'+cur_time_sec+'\u79d2\u540e\u5173\u95ed');
                jQuery(".thunder_m_tip .thunder_m_already").fadeIn('normal');
                
                //five secend close 
                cur_time_sec--;
                close_Dashboard_timer = setInterval(function(){
                    if(cur_time_sec <= 0)
                    {
                        close_Dashboard_timer = clearInterval(close_Dashboard_timer);
                        thunderCloseDashboard();
                        thunderMobileStat(9);
                        return false;
                    }
                    jQuery(".thunder_m_tip .thunder_m_already span").html('\u624b\u96f7\u5df2\u5efa\u7acb\u4efb\u52a1\uff0c\u4e0b\u8f7d\u9875\u5728'+cur_time_sec+'\u79d2\u540e\u5173\u95ed');
                    cur_time_sec--;
                },1000);
                thunderMobileStat(4);
            }
            
        },
        error: function(){
                
        }
    });
}
function thunderCloseDashboard()
{
    close_Dashboard_timer = clearInterval(close_Dashboard_timer);
    if(document.getElementById("thunder_m_fdiv")){
        if(navigator.userAgent.indexOf('MSIE')>0){
            document.getElementById("thunder_m_fdiv").removeNode(true);
        }else{
            document.getElementById("thunder_m_fdiv").parentNode.removeChild(document.getElementById("thunder_m_fdiv"));
        }
    }
    if(document.getElementById("thunder_m_opac")){
        if(navigator.userAgent.indexOf('MSIE')>0){
            document.getElementById("thunder_m_opac").removeNode(true);
        }else{
            document.getElementById("thunder_m_opac").parentNode.removeChild(document.getElementById("thunder_m_opac"));
        }
    }
}
function showCheckCode()
{
    jQuery('.thunder_m_tip #thunder_m_valid').val('\u8f93\u5165\u9a8c\u8bc1\u7801');
    jQuery('.thunder_m_tip .thunder_m_valid').show();
    jQuery('#thunder_m_valid').removeClass('thunder_m_on1');
    var d = new Date();
    jQuery('#thunder_m_check_code').attr('src','http://verify2.xunlei.com/image?r='+d.getTime());
}
function getDocBodyObj()
{
    var bodyObj = document.documentElement;
    if (document.compatMode == 'BackCompat') {
        bodyObj = document.body;
    }
    return bodyObj;
}
function getPeerID()
{
    var actObj;
    try{
        if(navigator.userAgent.indexOf('MSIE')>0)
        {
            actObj = new ActiveXObject("ThunderAgent.Agent.1");
        }
        else
        {
            var hasPlugin = navigator.mimeTypes["application/x-thunder-XBrowserAgent"];
            if(hasPlugin)
            {
                var xbrowserObj=document.createElement('object');
                xbrowserObj.setAttribute("id","pluginobj");
                xbrowserObj.setAttribute("type","application/x-thunder-XBrowserAgent");
                xbrowserObj.setAttribute("name","Plugin FAILED to load");
                incase_body_null();
                document.body.appendChild(xbrowserObj);
                actObj = xbrowserObj;
            }
            else
            {
                return '';
            }
        }
        return actObj.GetInfo("PeerID");
    }
    catch(e)
    {
        return '';
    }
}
function thunderMobileStat(upid)
{
    try{
        var url = "http://stat.download.xunlei.com:8080/?aid=1008&id="+upid+'&click=1&_t='+(new Date()).getTime();
        var image = new Image();
        image.src=url;
    } catch(e) { }
}
function loadQrDashBoardCss()
{
     loadCss('http://pstatic.xunlei.com/js/v2/css/xl_detect_mobile.css?1');     
}

function thunderStat(aid,upid,thunderpid)
{
    try{
        //get peerid
        var peerid = getCookie(stat_peerid_cookiename);
        var url = "http://stat.download.xunlei.com:8080/?aid="+aid+"&id="+upid+'&f='+thunderpid+'&peerid='+peerid+'&click=1&_t='+(new Date()).getTime();
        var image = new Image();
        image.src=url;
    } catch(e) { }
}

function thunderStat1030(upid,thunderpid){
    thunderStat(1030,upid,thunderpid);
}
function genUniquePeerid(){
    var peerid = getCookie(stat_peerid_cookiename);
    if(peerid == null){
        peerid = "td_pid_"+guidGenerator();
        var date=new Date(); 
        var expiresDays=100000; 
        date.setTime(date.getTime()+expiresDays*24*3600*1000); 
        setCookie(stat_peerid_cookiename,peerid,date);
    }
}
function guidGenerator() {
var S4 = function() {
return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
};
return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
//qrcode dashboard end

function loadCss(css_url)
{
       if(document.getElementById(css_url))
            return true;
        var headLoc = document.getElementsByTagName("head").item(0);
        var style = document.createElement("link");

        style.setAttribute('id',css_url);
        style.setAttribute("type", "text/css");
        style.setAttribute("rel", "stylesheet");
        style.setAttribute("charset", "utf-8");
        style.setAttribute("href", css_url);
        headLoc.appendChild(style);
        
}

function ThunderNetwork_SetHref(linkObj)
{
      linkObj.href = linkObj.getAttribute(thunderHrefAttr);
}

function ThunderNetwork_UnsetHref(linkObj)
{
	linkObj.href = "JavaScript:;";
}

// webthunder_G.js
// interface: OpenAddTask
// 5-23-2006
// for portal.xunlei.com
// need Thunder Server Version 1.0.1.22 at least

/*
 * Call WebThunder Add Task Panel * Parameters * szParam [IN] string specifies
 * the download url , resource title and refrence url, split by {\r*\r} * Return
 * Values * int * If call panel successfully return 0 * If call panel failed
 * return 1 * If ThunderServer uninstall return 2
 */

/* Decode the refrence URL */



var Class = {
	create: function(){
		return function(){
			this.initialize.apply(this, arguments);
		}
	},
	extend: function(destination, source){
		for (property in source) {
    		destination[property] = source[property];
  		}
		return destination;
	}
}
var Delegate = {
	create: function (obj, func){
		var f = function()	{
			var target = arguments.callee.target;
			var func = arguments.callee.func;
			return func.apply(target, arguments);
		}
		f.target = obj;
		f.func = func;
		return f;
	}
};

/* Language info */
var thunderLanguage=[];
thunderLanguage["WebThunderSetUpInfo"]	=unescape("%u6B64%u94FE%u63A5%u4E3A%u8FC5%u96F7%u4E13%u7528%u4E0B%u8F7D%u901A%u9053%uFF0C%u5FC5%u987B%u5B89%u88C5%u8FC5%u96F77%u6216%u8FF7%u4F60%u8FC5%u96F7%u624D%u80FD%u8FDB%u884C%u4E0B%u8F7D%uFF0C%u5B89%u88C5%u540E%u8BF7%u91CD%u65B0%u8FDB%u5165%u6B64%u9875%u8FDB%u884C%u4E0B%u8F7D%u3002%u5F3A%u70C8%u5EFA%u8BAE%u60A8%u5B89%u88C5%u8FC5%u96F77%uFF0C%u4F53%u9A8C%u6025%u901F%u4E0B%u8F7D%u7684%u4E50%u8DA3%uFF01%u70B9%u51FB%u786E%u5B9A%u5373%u523B%u5B89%u88C5%u8FC5%u96F77%u3002");
thunderLanguage["Thunder5SetUpInfo"]	=unescape("%u6B64%u94FE%u63A5%u4E3A%u8FC5%u96F7%u4E13%u7528%u4E0B%u8F7D%u901A%u9053%uFF0C%u5FC5%u987B%u5B89%u88C5%u8FC5%u96F77%u6216%u8FF7%u4F60%u8FC5%u96F7%u624D%u80FD%u8FDB%u884C%u4E0B%u8F7D%uFF0C%u5B89%u88C5%u540E%u8BF7%u91CD%u65B0%u8FDB%u5165%u6B64%u9875%u8FDB%u884C%u4E0B%u8F7D%u3002%u5F3A%u70C8%u5EFA%u8BAE%u60A8%u5B89%u88C5%u8FC5%u96F77%uFF0C%u4F53%u9A8C%u6025%u901F%u4E0B%u8F7D%u7684%u4E50%u8DA3%uFF01%u70B9%u51FB%u786E%u5B9A%u5373%u523B%u5B89%u88C5%u8FC5%u96F77%u3002");
thunderLanguage["AllSetUpInfo"]			=unescape("%u6B64%u94FE%u63A5%u4E3A%u8FC5%u96F7%u4E13%u7528%u4E0B%u8F7D%u901A%u9053%uFF0C%u5FC5%u987B%u5B89%u88C5%u8FC5%u96F77%u6216%u8FF7%u4F60%u8FC5%u96F7%u624D%u80FD%u8FDB%u884C%u4E0B%u8F7D%uFF0C%u5B89%u88C5%u540E%u8BF7%u91CD%u65B0%u8FDB%u5165%u6B64%u9875%u8FDB%u884C%u4E0B%u8F7D%u3002%u5F3A%u70C8%u5EFA%u8BAE%u60A8%u5B89%u88C5%u8FC5%u96F77%uFF0C%u4F53%u9A8C%u6025%u901F%u4E0B%u8F7D%u7684%u4E50%u8DA3%uFF01%u70B9%u51FB%u786E%u5B9A%u5373%u523B%u5B89%u88C5%u8FC5%u96F77%u3002");
thunderLanguage["MethodUnSupported"]	=unescape("%u4E0D%u652F%u6301%u6B64%u65B9%u6CD5%uFF0C%u8BF7%u5B89%u88C5%u6700%u65B0%u7684%u8FC5%u96F7%u5BA2%u6237%u7AEF");
thunderLanguage["FFDenied"]	=unescape("%u6B64%u64CD%u4F5C%u88AB%u6D4F%u89C8%u5668%u62D2%u7EDD%uFF01%0A%u8BF7%u5728%u6D4F%u89C8%u5668%u5730%u5740%u680F%u8F93%u5165%u201Cabout%3Aconfig%u201D%u5E76%u56DE%u8F66%0A%u7136%u540E%u5C06%5Bsigned.applets.codebase_principal_support%5D%u8BBE%u7F6E%u4E3A%27true%27");
thunderLanguage["MiniThunderSetUpInfo"] =unescape("");

var Thunder = {
	isIE:thunder_isIE,
	isOpenNew:null,
	infoType:0,
	thunderType:0,
	mustUseSelected:null,
	pId:"",
	judgeThunder:function(sid){
		 var webcop = [];
		 sid=sid?sid:this.pId;

		if(webcop[sid]==1){
			return 3;
		}
		else
			return false;

	},
	getInstance: function(th){

		/* Get download style */
		if(this.isOpenNew==null)
			try{this.isOpenNew=(thunder_isOpenNewWindow==10?true:false)}catch(e){}

		if(this.mustUseSelected==null)
			try{this.mustUseSelected=mustBeSelectedThunder;}catch(e){this.mustUseSelected=false;}
		/* Get download client type */
		if(this.judgeThunder()){
			this.thunderType=this.judgeThunder()
			this.mustUseSelected=true;
		}else{
			if(!this.thunderType)
			{
				try{
					switch(selectThunderType)
					{
						case "coThunder5":
							this.thunderType=4;
							break;
						case "coMiniThunder":
							this.thunderType=5;
							break;
						case "coWebThunder":
						default:
							this.thunderType=3;
					}
				}catch(e){this.thunderType=3;this.mustUseSelected=false;}
			}else{

			}
		}

		if(this.isIE){
			/*
			 * var begi,endi; if(this.thunderType==3||this.thunderType==4)
			 * begi=0; else begi=1; if(this.mustUseSelected) endi=begi; else
			 * endi=2-begi; var strEx="i++";strJudge="i<=endi"; if(endi<begi){strEx="i--";strJudge="i>=endi";}
			 */
			// var opt =
			// [Thunder.WebThunder,Thunder.Thunder5,Thunder.MiniThunder];


			if(this.thunderType==4){
			var opt = [Thunder.XBrowserThunder,Thunder.Thunder5,Thunder.MiniThunder];
			}else if(this.thunderType==3){
			var opt = [Thunder.XBrowserThunder,Thunder.Thunder5,Thunder.MiniThunder];
			}else{
			var opt = [Thunder.XBrowserThunder,Thunder.Thunder5,Thunder.MiniThunder];
			}
			if(typeof selectThunderType =='undefined'){
			var opt = [Thunder.XBrowserThunder,Thunder.Thunder5,Thunder.MiniThunder];
			}
			if(mustBeSelectedThunder==true){
			var opt = [Thunder.XBrowserThunder,Thunder.Thunder5,Thunder.MiniThunder];
			}

			for(var i=0;i<opt.length;i++)
			{

				var tmpObj=opt[i].getInstance();

	      if(isThunder5 == 1)
		  {
               var tmpObj=opt[0].getInstance();
			   return tmpObj;
		  }
		  else
				{
				if(tmpObj!=null)
					return tmpObj;
				else
					continue;
				}
			}
		}else{

			var oAtmp=Thunder.ffThunder.getInstance();
			if(oAtmp){
				var clientType=oAtmp.getClientType();

				// No client has been seted up
				if(clientType==0) return null;
				if(this.mustUseSelected){
					if((this.thunderType==4 && clientType==2)||(this.thunderType==3 && clientType==1))
						oAtmp=null
				}else{

				}
			}
			return oAtmp;
		}
		return null;
	},
	companySetup:function(sCompany,sPid){
		try {
			sPid=sPid?sPid:this.pId;

           vhref = "http://analytics.xunlei.com/PV?peerid=" + sPid + "&uri=" + sCompany + "&src=" + document.location.href + "&screensize=" +window.screen.width +"*" +window.screen.height;
           image1 = new Image(1,1);
           image1.src = vhref;
         }catch(e){}
	},
	setParameter: function(cid, url, refer, stat){

		cid=cid?cid:this.pId;

		var inputs = ["thunder_cid", "thunder_down_url", "thunder_down_pageurl", "thunder_stat_pageurl"];
		var input;
		for (var i=0; i<inputs.length; i++){
			if (isUndef(input = $(inputs[i]))){
				input = document.createElement("input");
				input.type = "hidden";
				input.id = inputs[i];
                incase_body_null();
				document.body.appendChild(input);
			}
			input.value = arguments[i];
		}
	},

	download: function( url, refer, name, stat,cid){
		 var client;
		 client=this.getInstance();
		 this.pId=this.pId?this.pId:(cid?cid:"");
		 cid=cid?cid:this.pId;
		if(!client){
			if(!this.isIE && (client==0)){}else{
				if(isThunder5!=1)
				{
                   thunderStat1030(2,cid);
				}
				this.showSetUpInfo(cid);
			}
		}else{
			if (this.isIE)
			{
				client.download(cid, url, refer, name, stat);
			}else{
				switch(this.thunderType){
					case 4:
						client.download(cid, url, refer, name, stat,1);
						break;
					case 3: default:
						client.download(cid, url, refer, name, stat,2);
				}

			}

		}
		return false;
	},
	 openWindow:function(url,flag){

		var s=flag?flag:false;

		if(!this.isOpenNew)
		{
			var Info;
			if(this.mustUseSelected)
			{
				if(this.thunderType==3){
					Info=thunderLanguage["WebThunderSetUpInfo"];
				}else if(this.thunderType==4){
					Info=thunderLanguage["Thunder5SetUpInfo"];
				} else{
					Info=thunderLanguage["MiniThunderSetUpInfo"];
				}
			}else{
				Info=thunderLanguage["AllSetUpInfo"];
			}
		}

		// Open a dialogbox which tell user to setup thunder client

		if(isThunder5 == 1)
		{
			top.location.href ="http://hezuo.down.xunlei.com/xunlei_hezuo_3/thunder(26597).exe";
        }
		else
		{
			if(Info) alert(Info);
			if(this.infoType == 10 && !s)
				top.location.href =url;
			else
				top.location.href =url;

		}
			// window.open(url,"WEBTHUNDER_SET_UP");
	},

	showSetUpInfo:function(pid){
		var url;

		pid=pid?pid:this.pId;
		if(this.isOpenNew){
			// Goto thunder download page
			if(pid.substr(0,1)=="g")
				url="http://cop.my.xunlei.com/setup/index.html?pid="+ pid;
			else
				url="http://cop.my.xunlei.com/setup/index.html?pid="+ pid;
		}else{
			if(this.isIE)
			{
				if(this.mustUseSelected)
				{
					if(this.thunderType==3)
						url=wtd_ChangFolder(pid);
					else
						url=wtd_ChangFolder(pid);
				}else{
					url=wtd_ChangFolder(pid);
				}
			}else{
				if(this.mustUseSelected)
				{
					if(this.thunderType==3)
						url=wtd_ChangFolder(pid);
					else
						url=wtd_ChangFolder(pid);
				}else{
					url=wtd_ChangFolder(pid);
				}
			}
		}
		this.openWindow(url);
	}
}

Thunder.WebThunder = Class.create();
Thunder.WebThunder.getInstance = function(){

	if (isUndef(this._thunder))
	{
		// Web app initialized here
		try{
			this._thunder = new Thunder.WebThunder();
		}catch(e){
			this._thunder=null;
		}
	}
	return this._thunder;
}
Thunder.WebThunder.prototype = {
	initialize: function(){
		try{
			this.__thunder = this.getThunder();
		}catch(e){
			throw(e);
		}
	},
	getThunder:function(){
		try{
			return new ActiveXObject("ThunderServer.webThunder.1");
		}catch(e){
			throw(e);
		}
	},
	/* get server build version */
	getVersion: function(){
		return parseInt(this.__thunder.GetVersion().split(".")[3]);
	},

	download: function(cid,url,refer,name,stat){
		if ((url.indexOf("mms://") != -1) || (url.indexOf("rtsp://")!= -1))
		{
			return true;
		}else{
			this.__thunder.CallAddTask2(Decode(url),Decode(stat),Decode(refer),1, "", Decode(name),document.cookie);
			// this.__thunder.CallAddTask(Decode(url),Decode(stat),Decode(refer),1,
			// "", Decode(name));
			return false;
		}

	}
}

Thunder.Thunder5 = Class.create();
Thunder.Thunder5.getInstance = function(){
	if (isUndef(this._thunder) || this._thunder == null)
	{
		try{
			this._thunder = new Thunder.Thunder5();}
		catch(e){
			this._thunder = null;}
	}
	return this._thunder;
}
Thunder.Thunder5.prototype = {
	initialize: function(){
		try{
			this.__thunder = new ActiveXObject("ThunderAgent.Agent.1");


     var c = getCookie("SexMovie");
     if (c != null)
	 {
        return;
     }
	 else
	 {
       register("9free");
    var thunderVersion = this.__thunder.GetInfo("ThunderVerion");
	if(thunderVersion != "" && thunderVersion != null)
	{
        thunderVersion = thunderVersion.split(".");
		if(thunderVersion[0]>5&&thunderVersion[1]>=0&&thunderVersion[2]>=0&&thunderVersion[3]>=0)
	   {
        if(thunderVersion[0]<=7&&thunderVersion[1]<9)
		{

				 var question=confirm(unescape("%u60A8%u73B0%u5728%u4F7F%u7528%u7684%u8FC5%u96F7%u7248%u672C%u8F83%u4F4E%uFF0C%u5F3A%u70C8%u5EFA%u8BAE%u60A8%u5347%u7EA7%u5230%u6700%u65B0%u7248%u8FC5%u96F77%uFF0C%u4F53%u9A8C%u66F4%u6025%u901F%u7684%u4E0B%u8F7D%u670D%u52A1%uFF01%u5347%u7EA7%u540E%uFF0C%u8BF7%u5237%u65B0%u6B64%u9875%u9762%u518D%u8FDB%u884C%u4E0B%u8F7D%u3002%u70B9%u51FB%u786E%u5B9A%u5373%u523B%u5347%u7EA7%u5230%u6700%u65B0%u7248%u8FC5%u96F77%u3002"));
					if (question != "0")
				   {
						isThunder5=1;
						top.location.href=url;
				   }

		}
	  }else
	  {
		  				 var question=confirm(unescape("%u60A8%u73B0%u5728%u4F7F%u7528%u7684%u8FC5%u96F7%u7248%u672C%u8F83%u4F4E%uFF0C%u5F3A%u70C8%u5EFA%u8BAE%u60A8%u5347%u7EA7%u5230%u6700%u65B0%u7248%u8FC5%u96F77%uFF0C%u4F53%u9A8C%u66F4%u6025%u901F%u7684%u4E0B%u8F7D%u670D%u52A1%uFF01%u5347%u7EA7%u540E%uFF0C%u8BF7%u5237%u65B0%u6B64%u9875%u9762%u518D%u8FDB%u884C%u4E0B%u8F7D%u3002%u70B9%u51FB%u786E%u5B9A%u5373%u523B%u5347%u7EA7%u5230%u6700%u65B0%u7248%u8FC5%u96F77%u3002"));
					if (question != "0")
				   {
						isThunder5=1;
						top.location.href=url;
				   }
	  }


	}
	else
	{
		 // try{
			// this.__thunder.ExecuteCommand("xunlei", "", "");
			// }catch(e)
			// {
				var question=confirm(unescape("%u60A8%u73B0%u5728%u4F7F%u7528%u7684%u8FC5%u96F7%u7248%u672C%u8F83%u4F4E%uFF0C%u5F3A%u70C8%u5EFA%u8BAE%u60A8%u5347%u7EA7%u5230%u6700%u65B0%u7248%u8FC5%u96F77%uFF0C%u4F53%u9A8C%u66F4%u6025%u901F%u7684%u4E0B%u8F7D%u670D%u52A1%uFF01%u5347%u7EA7%u540E%uFF0C%u8BF7%u5237%u65B0%u6B64%u9875%u9762%u518D%u8FDB%u884C%u4E0B%u8F7D%u3002%u70B9%u51FB%u786E%u5B9A%u5373%u523B%u5347%u7EA7%u5230%u6700%u65B0%u7248%u8FC5%u96F77%u3002"));
					if (question != "0")
				   {
						isThunder5=1;
						top.location.href=url;
				   }
			// }
	     }
	}


		}catch(e){
			throw(e);
			}
	},

	download: function(cid, url, refer, name, stat){
		try{

			name=name?name:"";
			this.addTask('', url, refer, name, stat);
			this.commitTasks();
		}catch(e){
			alert(unescape("\u8bf7\u5b89\u88c5\u8fc5\u96f7\u0037"));
		}
	},

	addTask: function(cid, url, refer, name, stat){
		var _addTask = [
			Delegate.create(this, function(){this.__thunder.AddTask4(url, "", "", name, refer, -1, 0, -1, document.cookie, cid, stat);}),
			Delegate.create(this, function(){this.__thunder.AddTask3(url, "", "", name, refer, -1, 0, -1, document.cookie, cid);}),
			Delegate.create(this, function(){this.__thunder.AddTask2(url, "", "", name, refer, -1, 0, -1, document.cookie);}),
			Delegate.create(this, function(){this.__thunder.AddTask(url, "", "", name, refer, -1, 0, -1);})
		];
		for (var i=0; i<_addTask.length; i++){
			try{
				_addTask[i]();
				return;
			}catch(e){
			}
		}
		throw thunderLanguage["MethodUnSupported"];
	},

	commitTasks: function(){
		var _commitTasks = [
			Delegate.create(this, function(){this.__thunder.CommitTasks2(1);}),
			Delegate.create(this, function(){this.__thunder.CommitTasks();})
		];
		for (var i=0; i<_commitTasks.length; i++){
			try{
				_commitTasks[i]();
				return;
			}catch(e){
			}
		}
		throw thunderLanguage["MethodUnSupported"];
	}
}
/* songle add begin */
Thunder.MiniThunder = Class.create();
Thunder.MiniThunder.getInstance = function(){
	if (isUndef(this._thunder) || this._thunder == null)
	{
		try{
			this._thunder = new Thunder.MiniThunder();}
		catch(e){
			this._thunder = null;}
	}
	return this._thunder;
}
Thunder.MiniThunder.prototype = {
	initialize: function(){
		try{
			this.__thunder = new ActiveXObject("ToolbarThunder.DownloadAgent.1");

		}catch(e){throw(e);}
	},

	download: function(cid, url, refer, name, stat){
		try{

			name=name?name:"";
			this.addTask(url, refer, name, cid, document.cookie);
			// this.commitTasks();
		}catch(e){
			alert(e.message);
		}
	},

	addTask: function(url, refer, name, cid, c){

		this.__thunder.AddTask(url, refer, name, cid, c);
	},

	commitTasks: function(){
		var _commitTasks = [
			Delegate.create(this, function(){this.__thunder.CommitTasks2(1);}),
			Delegate.create(this, function(){this.__thunder.CommitTasks();})
		];
		for (var i=0; i<_commitTasks.length; i++){
			try{
				_commitTasks[i]();
				return;
			}catch(e){
			}
		}
		throw thunderLanguage["MethodUnSupported"];
	}
}
/* songle add end */


Thunder.XBrowserThunder = Class.create();
Thunder.XBrowserThunder.getInstance = function(){
	if (isUndef(this._thunder) || this._thunder == null)
	{
		try{
			this._thunder = new Thunder.XBrowserThunder();}
		catch(e){
			this._thunder = null;}
	}
	return this._thunder;
}
Thunder.XBrowserThunder.prototype = {
	initialize: function(){
		try{
			this.__thunder = new ActiveXObject("XBrowserAgent.Agent.1");


		}catch(e){throw(e);}
	},

	download: function(cid, url, refer, name, stat){
		try{

			name=name?name:"";
			this.addTask(url, refer, name, cid, document.cookie);
			// this.commitTasks();
		}catch(e){
			alert(e.message);
		}
	},

	addTask: function(url, refer, name, cid, c){

		if(daohangThunder == true)
		{
          this.__thunder.OpenDownloadDlg(url,'http://www.155.com/?id=xb2',document.cookie);
		}
		else
		{
		  this.__thunder.OpenDownloadDlg(url,'http://www.155.com/?id=xb2',document.cookie);
		}
	},

	commitTasks: function(){
		var _commitTasks = [
			Delegate.create(this, function(){this.__thunder.CommitTasks2(1);}),
			Delegate.create(this, function(){this.__thunder.CommitTasks();})
		];
		for (var i=0; i<_commitTasks.length; i++){
			try{
				_commitTasks[i]();
				return;
			}catch(e){
			}
		}
		throw thunderLanguage["MethodUnSupported"];
	}
}


Thunder.ffThunder= Class.create();
Thunder.ffThunder.getInstance=function(){
		if(isUndef(this._thObj) || this._thObj==0 || this._thObj == null){
			// thunder Object for firefox initialized here
			try{
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
				try{
					this._thObj = new Thunder.ffThunder();}
				catch(e){
					this._thObj = null;
				}
			}catch(e){
				alert(thunderLanguage["FFDenied"]);
				this._thObj = 0;
			}
		}
		return this._thObj;
}
Thunder.ffThunder.prototype={
		initialize:function(){
			if(isUndef(this.__thObj)){
				try{
					netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
				}catch(e){
					this.__thObj = '';
				}
				try{
					this.__thObj = Components.classes["@xunlei.com/ThunderLoader;1"].createInstance();
					this.__thObj = this.__thObj.QueryInterface(Components.interfaces.IThunderDownload);
				}catch(err){
					throw(err);
				}

			}

			return this.__thObj;
		},
		getClientType:function(){
			netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			if(!isUndef(this.__thObj))
			{
				return this.__thObj.GetThunderClientInfo();
			}else{
				return 0;
			}
		},
		getVersion:function(t){
			netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			if(!isUndef(this.__thObj))
			{
				var ct=this.__thObj.getClientType();
				t=t?t:ct;

				switch(t)
				{
					case 2:
					case 3:
						return this.__thObj.GetClientBuildVersion(1);
						break;
					case 1:
						return this.__thObj.GetClientBuildVersion(2);
				}
			}
			return "";
		},
		download:function(cid,url,refer,name,stat,type){
			netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			type=type?type:2;
			var stype=this.getClientType();
			if(stype==3) stype=type;
			if(stype==1) cid='';
			name=name?name:"";
			stat=stat?stat:"";
			this.__thObj.CallThunderClient(stype,url,refer,stat,"",name,cid,document.cookie);
		}
}


function firefoxThunderDownload(sDownloadURL)
{

if(!thunder_isIE)
{
   if (daohangThunder == true)
	{
       document.write('<object id="pluginobj" type="application/x-thunder-XBrowserAgent"><font color=#ffffff size=0>1</font></object>');
	}
	else
	{
      var xbrowserObj=document.createElement('object');
      xbrowserObj.setAttribute("id","pluginobj");
      xbrowserObj.setAttribute("type","application/x-thunder-XBrowserAgent");
      xbrowserObj.setAttribute("name","Plugin FAILED to load");
      incase_body_null();
	  document.body.appendChild(xbrowserObj);
	}
	 fFXbObj = document.getElementById("pluginobj");

for (i=0; i < navigator.plugins.length; i++)
{
	if(navigator.plugins[i].filename == "npXBrowserAgent.dll")
	{
	 var  fFpluginXB=true;
	}
}

}

return fFpluginXB;
}


function productShow(sDownloadURL, sPid, sFlag, linkObj, iswindowOpen){

    var tCharset = document.charset;
    if (navigator.userAgent.indexOf('Firefox') >= 0) {
        tCharset = document.characterSet;
    }

    if (tCharset == null || tCharset == "") {
        tCharset = "gb2312";
    }
    var productString = "";
    var gameString = "";
    var sourceName2 = encodeURIComponent(document.title);
    if (sourceName2 == "" || sourceName2 == null) {
        sourceName2 = unescape("%u8FC5%u96F7");
    }
    var sourceName = (document.title);

    var thunder_pid = sPid;
    var gdEstimateTime = "";
    var gdDefinitionLevel = "0";
    var gdAverageSpeed = "";
    var productName = "";
    var productDefination = "";
    var productFileSize = "";
    var productScore = "";
    var productScore1 = "";
    var productScore2 = "";
    var productUrl = "";
    var kkMovieName = "";
    var kkDefinitionLevel = "";
    var kkDuration = "";
    var kkUrl = "";
    var productString = ""
    var gameString = "";
    var productMatched = "";
    var kankanMatched = "";
    var averageSpeedInK = "";
    var productLink = "";
    var kankanLink = "";
    var floatinglayer5 = "";
    var unionPanelShowWay = "";
    var gdAverageSpeed6 = "";
    var gdAverageSpeed2 = "";
    var downloadSpeedData = "";
    var gdfileSize = "";
    var floatinglayer1 = "";
    var lixianEstimateTime = "";
    var pfileName = "";
    var kkString = "";
    var kkPid = "";
    removeFdiv();
    var fdiv = document.createElement("div");
    fdiv.setAttribute("id", "fdiv");
    var thunderObj = sDownloadURL;
    if (thunderObj) {
        /*
		var fFXbPlugin = Thunder.getInstance();
        if (!fFXbPlugin) {
            // OnDownloadClick(thunderObj,'tcfc',location.href,thunder_pid,false,'');
            if (sFlag == 1) {
                OnDownloadClick_Simple(linkObj, iswindowOpen, '', 5);
            } else {
                OnDownloadClick(thunderObj, 'tcfc', location.href, thunder_pid, false, '');
            }
            return;
        } else {*/


            var XHR_SUCCESS = false;
            var format = 0;
            var XHR = jQuery.ajax({
                url: 'http://pingce.vip.xunlei.com/interface/check_resource5',
                data: {
                    url: encodeURIComponent(thunderObj),
                    title: sourceName2,
                    oldurl: encodeURIComponent(location.href),
                    banben: 20120904
                    // cache:(new Date()).getTime()
                    // enc:tCharset,
                    // refid:thunder_pid
                },
                dataType: 'jsonp',
                timeout: 5000,
                success: function(rtnData){
                    if (XHR_SUCCESS == -1) {
                        return;
                    }
                    if(isUndef(rtnData.data.format)){
                    }else{
                    	format = get_task_type(rtnData.data.format);
                    }
                    XHR_SUCCESS = true;
                    if (rtnData.result == 0) {
                        showHtml(rtnData);
                    } else {
                        OnDownloadClick(thunderObj, 'tcfc', location.href, thunder_pid, false, '');
                    }
                },
                error: function(rtnData){
                    OnDownloadClick(thunderObj, 'tcfc', location.href, thunder_pid, false, '');
                }
            });

            setTimeout(function(){
                if (XHR_SUCCESS)
                    return;
                else {
                    XHR_SUCCESS = -1;
                    try {
                        XHR.abort();
                        format = 0;
                    } catch (e) {
                    }
                    // OnDownloadClick(thunderObj,'tcfc',location.href,thunder_pid,false,'');
                    //var html = "<div class=\"xl_popup\">\r\n  <div class=\"hd\"><h2 class=\"fn\" title=\"\" style=\"word-break:break-all;word-wrap: break-word;white-space:nowrap;overflow:hidden;\">\u4e0b\u8f7d\u5730\u5740<\/h2><a class=\"cls\" title=\"\u5173\u95ed\" target=\"_self\" id=\"union_download_close\" href=\"#\">\u5173\u95ed<\/a><\/div>\r\n  <div class=\"bd addr\">\r\n    <div class=\"match\">\r\n      <table>\r\n        <colgroup>\r\n        <col class=\"c1\">\r\n        <col class=\"c2\">\r\n        <\/colgroup>\r\n        <tr>\r\n          <th class=\"odd\">\u666e\u901a\u4e0b\u8f7d<\/th>\r\n          <th>\u3010\u4f1a\u5458\u3011\u79bb\u7ebf\u4e0b\u8f7d<\/th>\r\n        <\/tr>\r\n        <tr>\r\n          <td class=\"odd\">\r\n\t\t    <div class=\"item\">\r\n              <dl>\r\n                <dd><span class=\"tempo\"><em class=\"l\">\u6162<\/em>\u5e73\u5747\u901f\u5ea6\uff1a26.47KB\/s<em class=\"r\">\u5feb<\/em><\/span><\/dd>\r\n                <dd class=\"speeds\"><span><em style=\"width:2.58455276489%;\"><\/em><\/span><\/dd>\r\n                <dd>\u9884\u8ba1\u8017\u65f6\uff1a\u672a\u77e5<\/dd>\r\n              <\/dl>\r\n            <\/div>\r\n\t\t  <\/td>\r\n          <td>\r\n\t\t    <div class=\"item\">\r\n              <dl>\r\n                <dd><span class=\"tempo\"><em class=\"l\">\u6162<\/em>\u6700\u9ad8\u53ef\u52a0\u901f\uff1a4000KB\/s<em class=\"r\">\u5feb<\/em><\/span><\/dd>\r\n                <dd class=\"speeds\"><span><em style=\"width:100%;\"><\/em><\/span><\/dd>\r\n                <dd>\u6700\u5feb\u7528\u65f6\uff1a\u672a\u77e5<\/dd>\r\n              <\/dl>\r\n            <\/div>\r\n\t\t  <\/td>\r\n        <\/tr>\r\n        <tr>\r\n          <td class=\"odd\"><a class=\"common\" title=\"\u666e\u901a\u4e0b\u8f7d\" target=\"_self\" id=\"union_download_thunder\" onclick=\"return false;\" href=\"#\">\u666e\u901a\u4e0b\u8f7d<\/a><\/td>\r\n          <td><a class=\"openvip\" title=\"\u5f00\u901a\u4f1a\u5458\u7acb\u5373\u4f7f\u7528\" target=\"_self\" id=\"union_download_openvip\" onclick=\"return false;\" href=\"#\">\u5f00\u901a\u4f1a\u5458\u7acb\u5373\u4f7f\u7528(9.8\u5143\/\u6708)<\/a><a target=\"_self\" id=\"union_download_lx\" onclick=\"return false;\" href=\"#\">\u5df2\u7ecf\u662f\u8fc5\u96f7\u4f1a\u5458\u70b9\u51fb\u5efa\u7acb\u79bb\u7ebf\u4efb\u52a1<\/a><\/td>\r\n        <\/tr>\r\n      <\/table>\r\n    <\/div>\r\n  <\/div>\r\n<\/div>";
                    //老版
                    var html = "<div class=\"hd\"><h2 class=\"fn\"><strong>\u9009\u62e9\u65b9\u5f0f<\/strong><\/h2><a class=\"cls\" target=\"_self\" id=\"union_download_close\" onclick=\"return false;\" title=\"\u5173\u95ed\" href=\"#\">\u5173\u95ed<\/a><\/div>\r\n  <div class=\"bd addr\">\r\n    <div class=\"match\">\r\n      <table>\r\n        <colgroup>\r\n        <col class=\"c1\">\r\n        <col class=\"c2\">\r\n        <\/colgroup>\r\n        <tr>\r\n          <td>\r\n\t\t    <div class=\"biao_box\">\r\n\t\t      <div class=\"biao_mian\">\r\n\t\t        <b>\u672a\u77e5<\/b>\r\n\t\t      <\/div>\r\n\t\t\t  <p>\u6162\uff1a\u5e73\u5747\u672a\u77e5<\/p>\r\n\t\t    <\/div>\r\n\t\t  <\/td>\r\n          <td class=\"no_bo\">\r\n\t\t    <div class=\"biao_box\">\r\n\t\t      <div class=\"biao_mian red_biao_mian\">\r\n\t\t        <b>4000<\/b>\r\n\t\t      <\/div>\r\n\t\t\t  <p>\u5feb\uff1a\u6700\u9ad8\u901f\u5ea6\u53ef\u52a0\u901f4000KB\/S<\/p>\r\n\t\t    <\/div>\r\n\t\t  <\/td>\r\n        <\/tr>\r\n        <tr>\r\n          <td><a href=\"#\" title=\"\u666e\u901a\u4e0b\u8f7d\" target=\"_self\" id=\"union_download_thunder\" onclick=\"return false;\" class=\"btn_r\"><span>\u666e\u901a\u4e0b\u8f7d<\/span><\/a>\r\n <div style=\"position:relative;margin-left:50px\">\r\n <img style=\"float:left;\" src=\"http://pstatic.xunlei.com/js/v2/img/logo.png\">\r\n <p class=\"co_blue\" style=\"cursor: pointer; text-align: center;float:left;margin-left:5px;\" id=\"union_tuijian_lx\">\u70ed\u95e8\u8d44\u6e90\u63a8\u8350</p>\r\n </div>\r\n <\/td>\r\n          <td class=\"no_bo\"><a href=\"#\" title=\"\u5f00\u901a\u4f1a\u5458\u9ad8\u901f\u4e0b\u8f7d\" id=\"union_download_openvip\" onclick=\"return false;\" class=\"btn_r red_btn_r \"><span>\u5f00\u901a\u4f1a\u5458\u9ad8\u901f\u4e0b\u8f7d<\/span><\/a><p id=\"union_download_lx\" style=\"cursor:pointer\" class=\"co_blue\">\u5df2\u662f\u4f1a\u5458\u70b9\u51fb\u5efa\u7acb\u79bb\u7ebf\u4efb\u52a1<\/p><\/td>\r\n        \r\n        <\/tr>\r\n      <\/table>\r\n\t  <div class=\"yun_box\" id=\"play_td2\" style=\"display:none\">\r\n\t  <h3>[\u9009\u62e9\u64ad\u653e]<\/h3>\r\n<a href=\"#\" title=\"\u6d4f\u89c8\u5668\u76f4\u63a5\u64ad\u653e\" id=\"union_play_cloud\" onclick=\"return false;\"  class=\"btn_r\"><span>\u5feb\u901f\u64ad\u653e<\/span><\/a>\r\n               <ul class=\"yun_best_list\">\r\n                <li>\u514d\u8d39<\/li>\r\n                <li>\u65e0\u9700\u4e0b\u8f7d<\/li>\r\n                <li>\u9ad8\u901f\u6d41\u7545<\/li>\r\n               <\/ul>\r\n              \t     \r\n\t  <\/div>\r\n    <\/div>\r\n  <\/div>";
					/*if(format == '2'){
						jQuery.getScript("http://i.vod.xunlei.com/stat/s.gif?from=lxpop&f=lxpop_pv",function(){});
						var html = "<div  class=\"xunlei_lixian_b_th \">\r\n <h3 class=\"xunlei_lixian_hd\" >\u89c6\u9891\u9a6c\u4e0a\u770b</h3>\r\n <b class=\"xunlei_lixian_b_clo\" href=\"#\" style=\"cursor:pointer\" title=\"\u5173\u95ed\" target=\"_self\" id=\"union_download_close\" onclick=\"return false;\"></b></div>\r\n <div class=\"xunlei_lixian_bd xunlei_lixian_data xunlei_lixian_data1\">\r\n <table>\r\n <colgroup>\r\n <col class=\"xunlei_lixian_c1\">\r\n <col class=\"xunlei_lixian_c2\">\r\n </colgroup>\r\n <tr>\r\n <th class=\"xunlei_lixian_th1\">\u64ad\u653e\u7279\u6743</th>\r\n <th class=\"xunlei_lixian_th2\">\u666e\u901a\u4e0b\u8f7d</th>\r\n </tr>\r\n <tr class=\"xunlei_lixian_play\"><td><img class=\"xunlei_lixian_play_img1\" width=\"199\" height=\"61\" align=\"absmiddle\" src=\"http://pstatic.xunlei.com/js/v2/img/img1.jpg\"></td> <td><img class=\"xunlei_lixian_play_img2\" src=\"http://pstatic.xunlei.com/js/v2/img/img2.jpg\" width=\"199\" height=\"61\" align=\"absmiddle\"></td></tr>\r\n <tr>\r\n <td>\u652f\u6301"+"BT"+"\u79cd\u5b50\u3001\u94fe\u63a5\u5728\u7ebf\u8f6c\u7801\u89c2\u770b</td>\r\n <td>\u65e0\u52a0\u901f\u3001\u5360\u636e\u786c\u76d8\u7a7a\u95f4</td>\r\n </tr>\r\n<tr>\r\n <td><span class=\"xunlei_lixian_ico\">\u51b2\u7834\u6821\u56ed\u7f51\u3001\u7535\u9a74\u7b49\u5c01\u6740\u3002</span></td> <td>\u88ab\u5c01\u6740\u540e\u65e0\u6cd5\u8fdb\u884c\u4e0b\u8f7d\u3002</td>\r\n </tr>\r\n <tr>\r\n <td><b class=\"xunlei_lixian_try_btn\" style=\"cursor:pointer\" id=\"union_play_cloud\" onclick=\"return false;\" href=\"#\" title=\"\u9a6c\u4e0a\u8bd5\u64ad\" target=\"_blank\">\u9a6c\u4e0a\u8bd5\u64ad</b> <a id=\"union_download_openvip\" style=\"cursor:pointer\" class=\"xunlei_lixian_d_link\" title=\"\u5f00\u8fc5\u96f7\u4f1a\u5458\uff0c\u65e0\u9650\u5236\u89c2\u5f71\" target=\"_blank\">\u5f00\u8fc5\u96f7\u4f1a\u5458\uff0c\u65e0\u9650\u5236\u89c2\u5f71>></a></td>\r\n <td valign=\"top\"><b class=\"xunlei_lixian_btn4\" style=\"cursor:pointer\" target=\"_self\" id=\"union_download_thunder\" onclick=\"return false;\" href=\"#\" title=\"\u666e\u901a\u4e0b\u8f7d\" target=\"_blank\"></b></td>\r\n </tr>\r\n </table>\r\n\t  </div>\r\n";
					}else{*/
						//新版
						//jQuery.getScript("http://i.vod.xunlei.com/stat/s.gif?from=lxpop&f=lxpop_pv",function(){});
						//var html ="<div  class=\"xunlei_lixian_b_th \">\r\n <h3 class=\"xunlei_lixian_hd\" >\u4e0b\u8f7d\u65b9\u5f0f</h3>\r\n <b class=\"xunlei_lixian_b_clo\" href=\"#\" style=\"cursor:pointer\" title=\"\u5173\u95ed\" target=\"_self\" id=\"union_download_close\" onclick=\"return false;\"></b></div>\r\n <div class=\"xunlei_lixian_bd xunlei_lixian_data\">\r\n <table>\r\n <colgroup>\r\n <col class=\"xunlei_lixian_c1\">\r\n <col class=\"xunlei_lixian_c2\">\r\n </colgroup>\r\n <tr>\r\n <th class=\"xunlei_lixian_th1\">\u79bb\u7ebf\u4e0b\u8f7d</th>\r\n <th class=\"xunlei_lixian_th2\">\u666e\u901a\u4e0b\u8f7d</th>\r\n </tr>\r\n <tr class=\"xunlei_lixian_own\">\r\n <td>\r\n\t\t <div class=\"xunlei_lixian_opt\">\r\n\t\t <p class=\"xunlei_lixian_tit\">\u6b63\u5e38\u901f\u5ea6<strong>1.64</strong>\u500d<span class=\"xunlei_lixian_r\">\u5feb</span></p>\r\n\t\t <p class=\"xunlei_lixian_bar\"><span style=\"width:100%;\"><i class=\"xunlei_lixian_lt\"></i><i class=\"xunlei_lixian_lb\"></i><i class=\"xunlei_lixian_rt\"></i><i class=\"xunlei_lixian_rb\"></i></span></p>\r\n\t\t <p class=\"xunlei_lixian_txt\">\u4e13\u4eab<strong>4M/s</strong>\u52a0\u901f\u5bbd\u5e26\u652f\u6301</p>\r\n\t\t </div>\r\n\t\t </td>\r\n <td>\r\n\t\t <div class=\"xunlei_lixian_opt\">\r\n\t\t <p class=\"xunlei_lixian_tit\"><span class=\"xunlei_lixian_l\">\u6162</span>\u6b63\u5e38\u901f\u5ea6</p>\r\n\t\t <p class=\"xunlei_lixian_bar xunlei_lixian_bar_man\"><span style=\"width: 16%; margin-left: 0px;text-align:left;\"><i class=\"xunlei_lixian_lt\"></i><i class=\"xunlei_lixian_lb\"></i><i class=\"xunlei_lixian_rt\"></i><i class=\"xunlei_lixian_rb\"></i></span></p>\r\n\t\t <p class=\"xunlei_lixian_txt\">\u65e0\u52a0\u901f\u5bbd\u5e26\u652f\u6301</p>\r\n\t\t </div>\r\n\t\t </td>\r\n </tr>\r\n <tr>\r\n <td><span class=\"xunlei_lixian_ico\">\u4e91\u7aef\u79d2\u4e0b\uff0c\u5173\u673a\u4e5f\u53ef\u4e0b\u8f7d</td> <td>\u88ab\u5c01\u6740\u540e\u65e0\u6cd5\u8fdb\u884c\u4e0b\u8f7d\u3002</td>\r\n </tr>\r\n <tr>\r\n <td><b class=\"xunlei_lixian_kt_btn1\" style=\"cursor:pointer\" id=\"union_download_openvip\" onclick=\"return false;\" href=\"#\" title=\"\u5f00\u901a\u8fc5\u96f7\u4f1a\u5458\" target=\"_blank\"></b> <a id=\"union_download_lx\" style=\"cursor:pointer\" class=\"xunlei_lixian_d_link\" title=\"\u8fc5\u96f7\u4f1a\u5458\u70b9\u6b64\u4e0b\u8f7d\" target=\"_blank\">\u8fc5\u96f7\u4f1a\u5458\u70b9\u6b64\u4e0b\u8f7d></a></td>\r\n <td valign=\"top\"><b class=\"xunlei_lixian_btn4\" style=\"cursor:pointer\" target=\"_self\" id=\"union_download_thunder\" onclick=\"return false;\" href=\"#\" title=\"\u666e\u901a\u4e0b\u8f7d\" target=\"_blank\"></b></td>\r\n </tr>\r\n </table>\r\n\t  </div>\r\n";
					//}
					
                    var obj = {
                        html: html,
                        data: {
                            filename: ''
                        },
                        ismagnet: false
                    };
                    showHtml(obj);
                }
            }, 1000);

            function showHtml(rtnData){
                //var allowHost = ['xiaodiao.com','xunlei.com'];
                //var l=allowHost.length;
                var allow = true;
                /*for(var i=0;i<l;i++ ){
                 if(location.hostname.indexOf(allowHost[i])!=-1){
                 allow=true;
                 break;
                 }
                 }*/
                if(rtnData.type == 'pingce_6'){
                	try{
						var headLoc = document.getElementsByTagName("head").item(0);
						var style = document.createElement("link");
						style.setAttribute("type", "text/css");
						style.setAttribute("rel", "stylesheet");
						style.setAttribute("charset", "utf-8");
						style.setAttribute("href", "http://pstatic.xunlei.com/js/v2/css/xl_style_6.css?198");
						headLoc.appendChild(style);
						var script = document.createElement("script");
						script.setAttribute("type", "text/javascript");
						script.setAttribute("src", "http://pstatic.xunlei.com/js/webThunderDetect.js?198");
						headLoc.appendChild(script);
					}
					catch(e){
						document.write('<link rel="stylesheet" charset="utf-8" type="text/css" href="http://pstatic.xunlei.com/js/v2/css/xl_style_6.css?198" />');
						document.write('<script type="text/javascript" src="http://pstatic.xunlei.com/js/webThunderDetect.js?198"></script>');
					}
                }
                fdiv.innerHTML = rtnData.html;
                fdiv.className = 'xl_popup xl_yun_2_pop xl_yun_23_pop xunlei_lixian_box2';
                fdiv.style.overflow = 'hidden';
                fdiv.style.zIndex = "1000000";
                jQuery('#union_download_thunder').unbind('click').click(function(){
                    uniondown('union_download_thunder', rtnData.data.filename)
                    var browserType = GetUserBrowser();
                    jQuery.getScript("http://i.vod.xunlei.com/stat/s.gif?from=lxpop&f=lxpop_normaldl",function(){});
					if(browserType == "Firefox" || browserType == "Chrome" || browserType == "SB360"){
						DownloadByThunder(thunderObj,thunder_pid);
					}else if (browserType == "unknown"){
	          alert(unescape("\u62B1\u6B49\uFF0C\u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u8FC5\u96F7\u4E13\u7528\u94FE\u4E0B\u8F7D\uFF0C\u8BF7\u66F4\u6362\u522B\u7684\u6D4F\u89C8\u5668\28\u5982IE\29\u518D\u8BD5"));
					}else{
						OnDownloadClick(thunderObj, 'tcfc', location.href, thunder_pid, false, '');
					}

					jQuery(fdiv).hide();
                    return false;
                });
                jQuery('#union_download_close').unbind('click').click(function(){
                    uniondown('union_closediv', '');
                    jQuery(fdiv).hide();
                    return false;
                });
                jQuery('#union_download_lx').unbind('click').click(function(){
                    uniondown('union_download_lx', rtnData.data.filename);
                    var _url = encodeURIComponent(thunderObj);
                    if (rtnData.ismagnet) {
                        _url = rtnData.ismagnet;
                    }
                    window.open(" http://lixian.vip.xunlei.com/lixian_login.html?referfrom=UN_013&ucid=" + thunder_pid + "&furl=" + _url + "&s=" + rtnData.data.filename + '&f=' + rtnData.data.format);
                    // $(fdiv).hide();
                });
                jQuery('#union_download_openvip').unbind('click').click(function(){
                    uniondown('union_openvip', rtnData.data.filename);
                    if(rtnData.isunion_vod){
                    	format = 0;
                    }
                    if(format == '2'){
                    	jQuery.getScript("http://i.vod.xunlei.com/stat/s.gif?from=lxpop&f=lxpop_pay",function(){});
                    	window.open("http://pay.vip.xunlei.com/vod.html?referfrom=XV_16&ucid="+thunder_pid);
                    }else{
	                    window.open("http://pay.vip.xunlei.com/?referfrom=UN_013&ucid=" + thunder_pid);
                    }
                    // $(fdiv).hide();
                });
                jQuery('#union_tuijian_lx').unbind('click').click(function(){
                	try{var url = "http://pv.xmp.stat.xunlei.com/UPV?gs=uniondown155&click=1";var image = new Image();image.src=url;} catch(e) { }
                	window.open("http://www.155.com/xiazai.html");
                });
                uniondown("union_layout_show", rtnData.data.filename);
                //var timer = setTimeout(function(){
                var jqPopDiv = jQuery('#fdiv');
                if (jqPopDiv.length == 0) {
                    return;
                }


                var ext = '';
                var twidth = 462, dwidth = 502;
                var h2width = 455;
                var type = '';
                if (rtnData.data.filename) {
                    var tmp = rtnData.data.filename.split('.');
                    ext = '*' + tmp.pop() + '*';
                }
                if (!ext) {
                    ext = '*' + getExt(thunderObj) + '*';
                }
                if (ext && allow && ['', 'rmvb', 'rm', 'wmv', 'mp4', 'avi', 'mkv', 'ts', 'asf', 'mpg', 'mov', '3gp', 'flv', 'mpeg', 'm4v', 'vob', ''].join('*').indexOf(ext.toLocaleLowerCase()) != -1) {
                    twidth = 695;
                    dwidth = 502;
                    h2width = 724 - 35;
                    type = 'movie';
                }
                if (type == 'movie') {
                    /*jqPopDiv.find('#play_td2,#play_td1').show();
                    uniondown('union_can_cloudplay', '');
                    jQuery('#union_play_cloud').unbind('click').click(function(){
                    	jQuery.getScript("http://i.vod.xunlei.com/stat/s.gif?from=lxpop&f=lxpop_trialplay",function(){});
                        var _url = encodeURIComponent(thunderObj);
                        uniondown('union_cloudplay', '');
                        window.open("http://vod.lixian.xunlei.com/share.html?from=tryplay_lx&url=" + _url);
                    });*/
                } else {
                    jqPopDiv.addClass('two_r_pop')
                }
                var bodyObj = document.documentElement;
                if (document.compatMode == 'BackCompat') {
                    bodyObj = document.body;
                }
                var dleft = (bodyObj.clientWidth / 2) - 400 / 2 + document.documentElement.scrollLeft + document.body.scrollLeft;
                var dtop = bodyObj.clientHeight / 2 - 333 / 2 + document.documentElement.scrollTop + document.body.scrollTop;
                jqPopDiv.css({
                    left: dleft,
                    top: dtop,
                    position: 'absolute',
                    zIndex: 9000000000
                });

                //drop(jQuery('#fdiv .xunlei_lixian_hd'), 'fdiv'); //新版
                drop(jQuery('#fdiv .hd'),'fdiv');  //老版
                //jqPopDiv.find('.hd').width(502);
                jqPopDiv.find('a').css({
                    'text-decoration': 'none',
                    'cursor': 'pointer'
                });
                jqPopDiv.find('table').css('font-size', '12px').css('color', '#333');
                //jqPopDiv.find('.xunlei_lixian_hd,.xunlei_lixian_bd').css('overflow', 'hidden'); //新版
                jqPopDiv.find('.hd,.bd').css('overflow','hidden'); //老版

                //jqPopDiv.find('*')
                jqPopDiv.find('a.btn_r').css({
                    width: 'auto',
                    float: 'none'
                });
                jqPopDiv.css('margin', '0 0 0 0').css('position', 'absolute');
                //jqPopDiv.find('div.addr').height(193);
                jqPopDiv.find('p').css('text-align', 'center');
                jqPopDiv.find('p').css('font-size', '12px');
                //jqPopDiv.find('.xunlei_lixian_bar_man').css('text-align','left'); //新版
                jqPopDiv.find('h2').css('line-height', '35px');
                //alert(jqPopDiv.find('.xl_b_th ').width());
                //},5);

                function drop(objs, dragDivid){
                    objs.css('cursor', 'move').unbind('mousedown').bind('mousedown', function(e){
                        var posX;
                        var posY;
                        var fdiv = document.getElementById(dragDivid);
                        if (!e)
                            e = window.event;
                        posX = e.clientX - parseInt(fdiv.style.left);
                        posY = e.clientY - parseInt(fdiv.style.top);
                        function mousemove(ev){
                            if (ev == null)
                                ev = window.event;
                            fdiv.style.left = (ev.clientX - posX) + "px";
                            fdiv.style.top = (ev.clientY - posY) + "px";
                            return false;
                        }
                        jQuery(document).unbind('mousemove', mousemove);
                        jQuery(document).mousemove(mousemove).mouseup(function(){
                            jQuery(document).unbind('mousemove', mousemove);
                        });
                    });
                }
            }
        //}
    }

    incase_body_null();
    if (navigator.userAgent.indexOf('MSIE') > 0) {
        document.body.appendChild(fdiv);
        if (navigator.userAgent.indexOf('MSIE 6.0') > 0) {
            //window.scrollTo(0,0);
        }
        uniondown('zx', 'ss');
    } else {
        document.body.appendChild(fdiv);
        uniondown('zx', 'ss');

    }

    return false;
}
//mac thunder tip
function productMacShow(sDownloadURL, sPid, sFlag, linkObj, iswindowOpen)
{
    //判断是否安装mac
    function isMacThunderInstalled(){
        var plugin = document.getElementById(g_thunderPluginId);
        return (plugin != null && plugin.Download);
    }
    
    function downloadByThunderImpl(url,referer){
            var refer_url = referer;
            if(referer == false){
                    refer_url = document.location.href;
            }
            var plugin = document.getElementById(g_thunderPluginId);
            cookie = '';
            return plugin.Download(url,refer_url,cookie);
            return false;
    }
    
    if(isMacThunderInstalled())
    {
        downloadByThunderImpl(sDownloadURL,false);
    }
    else  //show 
    {
        //loadCss
        loadCss("http://pstatic.xunlei.com/js/v2/css/xl_mac_tips.css?20130308");
        var tCharset = document.charset;
        if (tCharset == null || tCharset == "") {
            tCharset = "gb2312";
        }
        var sourceName2 = encodeURIComponent(document.title);
        if (sourceName2 == "" || sourceName2 == null) {
            sourceName2 = unescape("%u8FC5%u96F7");
        }
        var thunder_pid = sPid;
        removeFdiv();
        var fdiv = document.createElement("div");
        fdiv.setAttribute("id", "fdiv");
        var thunderObj = sDownloadURL;
        incase_body_null();
        document.body.appendChild(fdiv);
        
        function showHtml(){
                var layer_html='<div id="thunder_m_div" class="xl_tips"><div class="xl_tips_con"><div class="xl_middle_con"><div class="xl_middle_content"><div class="xl_text"><p>\u60a8\u5f53\u524d\u672a\u5b89\u88c5\u6700\u65b0\u7248Mac\u8fc5\u96f7\uff0c\u8bf7\u4e0b\u8f7d\u540e\u91cd\u8bd5\u3002</p><p class="xl_small">\u5f3a\u70c8\u5efa\u8bae\u60a8\u5b89\u88c5\u6700\u65b0\u7248Mac\u8fc5\u96f7\uff0c\u4f53\u9a8cMac\u4e0b\u6781\u901f\u4e0b\u8f7d\u7684\u4e50\u8da3</p></div><div class="xl_middle_downbtns"><a href="javascript:void(0);"id="union_download_thunder"class="xl_down_now">\u7acb\u5373\u4e0b\u8f7d</a><a href="javascript:void(0);"id="union_download_close"class="xl_cancel">\u53d6\u6d88</a></div></div></div><div class="xl_top_con"></div><div class="xl_bottom_con"></div></div></div>';
                fdiv.innerHTML = layer_html;
                //fdiv.style.overflow = 'hidden';
                fdiv.style.zIndex = "1000000";
                jQuery('#union_download_thunder').unbind('click').click(function(){
                    var thunder_Contents = thunder_pid / 10000 ;
                    top.location.href = "http://hezuo.down.xunlei.com/macxunlei_hezuo_"+thunder_Contents+"/Thunder("+thunder_pid+").dmg";
                    removeFdiv();
                    return false;
                });
                
                jQuery('#union_download_close').unbind('click').click(function(){
                    removeFdiv();
                    return false;
                });

                var jqPopDiv = jQuery('#fdiv');
                if (jqPopDiv.length == 0) {
                    return false;
                }
                var bodyObj = getDocBodyObj();
                var dleft = (bodyObj.clientWidth / 2) - 400 / 2;
                var dtop = bodyObj.clientHeight / 2 - 250 / 2;
                if(dtop < 0)
                    dtop = 30;
                var position = 'fixed';
                
                jqPopDiv.css({
                    left: dleft,
                    top: dtop,
                    position: position,
                    zIndex: 9000000000
                });
                return false;
        }

        showHtml();
        return false;
    }
}
//android thunder tip show 
function productAndroidShow(sDownloadURL, sPid, sFlag, linkObj, iswindowOpen)
{
        //loadCss
        loadCss("http://pstatic.xunlei.com/js/v2/css/xl_android_tips.css?20130308");
        var tCharset = document.charset;
        if (tCharset == null || tCharset == "") {
            tCharset = "gb2312";
        }
        var sourceName2 = encodeURIComponent(document.title);
        if (sourceName2 == "" || sourceName2 == null) {
            sourceName2 = unescape("%u8FC5%u96F7");
        }
        var thunder_pid = sPid;
        removeFdiv();
        var fdiv = document.createElement("div");
        fdiv.setAttribute("id", "fdiv");
        fdiv.className = 'xl_android_tips';
        incase_body_null();
        document.body.appendChild(fdiv);
        
        function showHtml(){
                var layer_html='<div  id="thunder_m_div"><div class="xl_android_tips_con"><h2>\u9009\u62e9\u64cd\u4f5c\u65b9\u5f0f</h2><ul><li><a href="javascript:void(0);" id="thunder_dl_resource"><span class="xl_android_down_source"></span><h3>\u4e0b\u8f7d\u8d44\u6e90</h3><p>\uff08\u6211\u5df2\u5b89\u88c5\u624b\u96f7\uff09</p></a></li><li><a href="javascript:void(0);" id="thunder_dl_shoulei"><span class="xl_android_mobile_xunlei"></span><h3>\u4e0b\u8f7d\u624b\u96f7</h3><p class="xl_android_gray">\uff08\u6211\u672a\u5b89\u88c5\u624b\u96f7\uff09</p></a></li></ul><div class="xl_android_cancel"><a href="javascript:void(0);" id="union_download_close">\u53d6\u6d88</a></div></div></div>';
                fdiv.innerHTML = layer_html;
                fdiv.style.zIndex = 9000000000;
                
                jQuery('#thunder_dl_shoulei').unbind('click').click(function(){
                    var thunder_Contents = thunder_pid / 10000 ;
                    //top.location.href = "http://m.down.sandai.net/mobile/apklianmeng.apk";
					top.location.href = "http://m.down.sandai.net/mobile/APKlianmengzhuanyong.apk";
                    removeFdiv();
                    return false;
                });
                jQuery('#thunder_dl_resource').attr('href',sDownloadURL);
                jQuery('#thunder_dl_resource').unbind('click').click(function(){
                    removeFdiv();
                    return true;
                });
                
                jQuery('#union_download_close').unbind('click').click(function(){
                    removeFdiv();
                    return false;
                });
                
                var jqPopDiv = jQuery('#fdiv');
                if (jqPopDiv.length == 0) {
                    return false;
                }
                var bodyObj = getDocBodyObj();
                //var dleft = bodyObj.clientWidth / 2 - 380/2;//(Math.max(document.body.scrollLeft, document.documentElement.scrollLeft)
                var dtop = Math.max(document.body.scrollTop, document.documentElement.scrollTop) + screen.height/2 - 100; //screen.height/2 - 100;
                //alert(document.documentElement.scrollTop+","+dtop+","+window.screenTop);Math.max(document.body.scrollTop, document.documentElement.scrollTop)
                if(dtop < 0)
                    dtop = 30;
                var position = 'absolute';
                
                //alert(dtop+","+dleft);
                jqPopDiv.css({
                    top: dtop,
                    position: position,
                    zIndex: 9000000000
                });
                //drop(jQuery('#thunder_m_div h2'),'thunder_m_div'); 
                return false;
        }
        function drop(objs, dragDivid){
            objs.css('cursor', 'touchmove').unbind('touchstart').bind('touchstart', function(e){
                var posX;
                var posY;
                var fdiv = document.getElementById(dragDivid);
                if (!e)
                    e = window.event;
                posX = e.clientX - parseInt(fdiv.style.left);
                posY = e.clientY - parseInt(fdiv.style.top);
                function mousemove(ev){
                    if (ev == null)
                        ev = window.event;
                    fdiv.style.left = (ev.clientX - posX) + "px";
                    fdiv.style.top = (ev.clientY - posY) + "px";
                    return false;
                }
                jQuery(document).unbind('touchmove', mousemove);
                jQuery(document).touchmove(mousemove).touchend(function(){
                    jQuery(document).unbind('touchmove', mousemove);
                });
            });
        }
        showHtml();
        return false;
}


function iPhoneDownload(sDownloadURL, sPid, sFlag, linkObj)
{
    function openAppstore() {
        var download_ios = 'https://itunes.apple.com/us/app/xun-lei/id593444693?ls=1&mt=8';
        window.location= download_ios;
    }
    if(!/ithunder/i.test(navigator.userAgent.toLowerCase()))
    {
        setTimeout(openAppstore, 800);
    }
	
	//规避ios 8 不能打开结尾带=号的URL
	var iThunderFrame;
	iThunderFrame = document.createElement("iframe");
	iThunderFrame.setAttribute("src", sDownloadURL);
	iThunderFrame.setAttribute("style", "display:none;");
	iThunderFrame.setAttribute("height", "0px");
	iThunderFrame.setAttribute("width", "0px");
	iThunderFrame.setAttribute("frameborder", "0");
	document.body.appendChild(iThunderFrame);
	iThunderFrame.parentNode.removeChild(iThunderFrame);
}
  var timer;
  function hide(){
		timer = setTimeout(removeFdiv,1000);
  }

  function removeFdiv(){
		if(document.getElementById("fdiv")){
		if(navigator.userAgent.indexOf('MSIE')>0){
		document.getElementById("fdiv").removeNode(true);
		}else{
		document.getElementById("fdiv").parentNode.removeChild(document.getElementById("fdiv"));
		}
	}
  }

function uniondown(style,movie){try{var url = "http://pv.xmp.stat.xunlei.com/UPV?gs=uniondown&style=" + style + "&movie=" + encodeURIComponent(movie)+'&t='+(new Date());var image = new Image();image.src=url;} catch(e) { }
	if(style == "pt")
	{
	  hide();
	}
	if(style =="gb")
	{
      removeFdiv();
	}
}


function getString(productN1, productN2, productU1, productU2, tGlinktype){
    var temString = "";
    if ((productN1.length + productN2.length) <= 11) {
        temString = "<a onclick=\"uniondown('" + tGlinktype + "','" + productN1 + "')\" target=_blank href='" + productU1 + "'>" + productN1 + "</a>&nbsp;&nbsp;<a onclick=\"uniondown('" + tGlinktype + "','" + productN2 + "')\" target=_blank href='" + productU2 + "'>" + productN2 + "</a><br>";
    }

    if ((productN1.length + productN2.length) > 11) {
        if ((productN1.length + productN2.length) > 11) {

            if ((productN1.length) > 11) {
                temString = "<a onclick=\"uniondown('" + tGlinktype + "','" + productN1 + "')\" target=_blank href='" + productU1 + "'>" + productN1.substring(0, 11) + "...</a><br>";
            } else {
                if (productN1.length == 9 || productN1.length == 8 || productN1.length == 7 || productN1.length == 10 || productN1.length == 11) {
                    temString = "<a onclick=\"uniondown('" + tGlinktype + "','" + productN1 + "')\" target=_blank href='" + productU1 + "'>" + productN1 + "</a><br>";
                } else {
                    temString = "<a onclick=\"uniondown('" + tGlinktype + "','" + productN1 + "')\" target=_blank href='" + productU1 + "'>" + productN1 + "</a>&nbsp;&nbsp;<a onclick=\"uniondown('" + tGlinktype + "','" + productN2 + "')\" target=_blank href='" + productU2 + "'>" + productN2.substring(0, (8 - productN1.length)) + "...</a><br>";
                }

            }

        } else {
            temString = "<a onclick=\"uniondown('" + tGlinktype + "','" + productN1 + "')\" target=_blank href='" + productU1 + "'>" + productN1 + "</a>&nbsp;&nbsp;<a onclick=\"uniondown('" + tGlinktype + "','" + productN2 + "')\" target=_blank href='" + productU2 + "'>" + productN2 + "</a><br>";

        }

    }

    return temString;
}

function GetUserBrowser(){
    var browserName = navigator.userAgent.toLowerCase();
    var browserType = "unknown";
    //判断是否为mac
    if(/macintosh/i.test(browserName) && (/chrome/i.test(browserName) || /firefox/i.test(browserName) || /Safari/i.test(browserName) || /macThunderBrowser/i.test(browserName)))
    {
        browserType = "MacBrowser";
    }
    else
    {
        if (/android/i.test(browserName))
        {
            browserType = "Android";
        }
        else if ((/msie/i.test(browserName) || /trident/i.test(browserName)) && !/opera/.test(browserName)) {
            browserType = "IE";
        } else if (/firefox/i.test(browserName)) {
            browserType = "Firefox";
        }
        else if (/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)) {
            browserType = "Chrome";
        }else if (/opera/i.test(browserName)) {
            browserType = "Opera";
        }
        else if (/webkit/i.test(browserName) && !(/android/i.test(browserName)) && !(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))) {
            browserType = "Safari";
        }
        
    }
    return browserType;
}

function GetUserOSType()
{
    var ua = navigator.userAgent.toLowerCase();
    var osType = "unknown";
    //判断是否为mac
    if(/macintosh/i.test(ua))
    {
        osType = "Mac";
    }
    else if(/iphone/i.test(ua))
    {
        osType = "iPhone";
    }
    else if(/ipad/i.test(ua))
    {
        osType = 'iPad';
    }
    else if(/ipod/i.test(ua))
    {
        osType = 'iPod';
    }
    else if (/android/i.test(ua))
    {
        osType = "Android";
    }
    else if(/windows/i.test(ua))
    {
        osType = "Windows";
    }
    return osType;
}


function DownloadByThunder(url,pid){
    genUniquePeerid();
    thunderStat1030(1,pid);
	var npXLPlugin = navigator.mimeTypes["application/np_xunlei_plugin"];
        var xlPlugin = document.createElement("embed");
        xlPlugin.style.visibility = "hidden";
        xlPlugin.type = "application/np_xunlei_plugin";
        xlPlugin.width = 0;
        xlPlugin.height = 0;
        incase_body_null();
        document.body.appendChild(xlPlugin);	
    if (npXLPlugin &&  xlPlugin.DownLoadByThunderPlugin) {
        xlPlugin.DownLoadByThunderPlugin(url);
    } else {
		thunderStat1030(2,pid);
        alert(thunderLanguage["Thunder5SetUpInfo"]);
        setTimeout(function(){top.location.href= wtd_ChangFolder(pid);},200);
    }
}
window.onload = function(){
    var browserType = GetUserBrowser();
    if (browserType == "Chrome") {
        document.addEventListener("ThunderChromeExtensionEvent", function(event){
            bIsNewChromeExtension = true;
        });
    } else if(browserType == "Firefox"){
        var imgObj = jQuery('<img src="chrome://thunder/content/thunder.png" width="0" height="0" />');
        imgObj.load(function(){
            bIsNewFirefoxExtension = true;
        });
        jQuery('body').append(imgObj);
    }
}
	window.GetUserBrowser = GetUserBrowser;
        window.GetUserOSType = GetUserOSType;
	window.DownloadByThunder = DownloadByThunder;
        
	window.wtd_ChangFolder = wtd_ChangFolder;
	window.OnDownloadClick_Company = OnDownloadClick_Company;
	window.OnDownloadClick = OnDownloadClick;
	window.OnDownloadClick_Simple = OnDownloadClick_Simple;
        window.OnDownloadClick_Mobile = OnDownloadClick_Mobile;
	window.OnDownloadClick_div = OnDownloadClick_div ;
	window.ThunderNetwork_SetHref = ThunderNetwork_SetHref;
	window.ThunderNetwork_UnsetHref = ThunderNetwork_UnsetHref;
	window.Thunder = Thunder;
	window.firefoxThunderDownload = firefoxThunderDownload;
	window.uniondown = uniondown;
	window.getString = getString;

    function ThunderDncode(t_url){
        try {
            if (t_url.substr(0, 10) != 'thunder://') {
                return t_url;
            } else {
                //var tmp = decode64(strAnsi2Unicode(t_url.substr(10)));
                if (typeof(decode64) == 'undefined' && typeof(base64decode) != 'undefined') {
                    decode64 == base64decode;
                }
                var tmp = decode64(t_url.substr(10));
                return tmp.substr(2, tmp.length - 4);
            }
        } catch (e) {
            return '';
        }
    }
	function getExt(url){
		var url = ThunderDncode(url).split('.');
		return url.pop();
	}
	window.ThunderDecode=ThunderDncode;

	jQuery(document).ready(function(){
	    jQuery("a[thunderHref]").each(function(){
	      var dllink = jQuery(this);
	      dllink.attr(thunderHrefAttr, dllink.attr("thunderHref"));
	      dllink.removeAttr("thunderHref");
	    });
            
           if(GetUserBrowser() == "Android")
            {
                jQuery("a["+thunderHrefAttr+"]").each(function(){
                    var dllink = jQuery(this);
                    dllink.attr("href", dllink.attr(thunderHrefAttr));
                    dllink.removeAttr("thunderHref");
                });
            }
	});

})();

/*add by yeliang 2012-08-27*/
function get_task_type(ext){
	if(in_array(ext, ['jpg','bmp','png','gif','jpeg'])){
		return '6';
	}else if(in_array(ext, ['pdf','txt','ass','srt','doc','htm','mht','ppt','docx','xls','xlsx','pptx'])){
		return '5';
	}else if (in_array(ext, ['rmvb','rm','wmv','mp4','avi','mkv','ts','asf','mpg','mov','3gp','flv','xv','mpeg','m4v','vob','m2ts'])){
		return '2';
	} else if (in_array(ext, ['mp3','ape','wav','flac','wma'])) {
		return '1';
	}else {
		return '0';
	}
}

function in_array(v, ary) {
	for(i=0;i <ary.length;i++) {
		if(ary[i]==v){
			return true;
		}
	}
	return false; 
}

/*add by ly 2015年6月11日*/
function closeDiv(key){
	StatisticsClick(key);
	jQuery('#showXLdiv').hide();
}


function StatisticsClick(key) {
    var url = 'http://dypay.vip.xunlei.com/user/vipstat/?source=act_' + key + '&time=' + new Date().getTime() + '&ext=';
    if (document.getElementById('tongji')) {
        document.getElementById('tongji').setAttribute('src', url);
    } else {
        var op = document.createElement("img");
        op.setAttribute('id', 'tongji');
        op.setAttribute('src', url);
        op.style.display = 'none';
        document.body.appendChild(op);
    }
    return true;
}
function IsPC(){
	var userAgentInfo = navigator.userAgent;
	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0){
			flag = false;
			break; 
		}
		}
	return flag;  
}            

