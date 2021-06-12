(()=>{"use strict";function e(t,n){return(e=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(t,n)}function t(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function n(r,c,o){return(n=t()?Reflect.construct:function(t,n,r){var c=[null];c.push.apply(c,n);var o=new(Function.bind.apply(t,c));return r&&e(o,r.prototype),o}).apply(null,arguments)}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var c=function e(t,n,c,o,i,s,a,u){r(this,e),this.id=t,this.name=n,this.servings=c,this.ingredients=o,this.time=i,this.description=s,this.appliance=a,this.ustensils=u};function o(){this.create=function(e,t){for(var r=arguments.length,o=new Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];return n(c,[e,t].concat(o))}}function i(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&e(t,n)}function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function a(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function u(e,t){return!t||"object"!==s(t)&&"function"!=typeof t?a(e):t}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(t){var r="function"==typeof Map?new Map:void 0;return(f=function(t){if(null===t||(c=t,-1===Function.toString.call(c).indexOf("[native code]")))return t;var c;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==r){if(r.has(t))return r.get(t);r.set(t,o)}function o(){return n(t,arguments,l(this).constructor)}return o.prototype=Object.create(t.prototype,{constructor:{value:o,enumerable:!1,writable:!0,configurable:!0}}),e(o,t)})(t)}function d(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=l(e);if(t){var c=l(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return u(this,n)}}var p=function(e){i(n,e);var t=d(n);function n(){var e;r(this,n);(e=t.call(this)).setAttribute("class","main-search"),e.innerHTML='<div class="input-group d-inline m-0">\n                <div class="form-outline d-flex flex-row">\n                    <input type="search" id="main-search-input" class="form-control rounded" placeholder="'.concat("Rechercher un ingrédient, appareil, ustensile ou une recette",'" aria-label="Search" aria-describedby="search-addon"/>\n                    <label class="form-label visuallyHidden" for="main-search-input">Search</label>\n                    <span class="icon-search input-group-text border-0" id="search-addon">\n                        <i class="fas fa-search"></i>\n                    </span>\n                    <span class="icon-search input-group-text border-0" id="reset-search-icon">\n                        <i class="fa fa-times-circle-o"></i>\n                    </span>\n                </div>\n            </div>');var c=e.querySelector("#main-search-input"),o=e.querySelector("#search-addon");o.classList.add("d-inline-block");var i=e.querySelector("#reset-search-icon");i.style.display="none";i.addEventListener("click",(function(e){var t;(t=document.querySelector("#tagsWrapper"))&&t.hasChildNodes()?function(e){c.value=e.target,c.value=""}(e):j.resetSearch()}));var s=e.querySelector(".form-outline"),a=document.createElement("div");a.setAttribute("id","main-suggestions"),a.setAttribute("class","main-suggestions"),s.appendChild(a);var u="",l=!1;function f(){l&&!u&&c==document.activeElement&&(console.log("NEW SEARCH PENDING"),j.resetAllFromPreviousSearch(),j.resetDefaultView())}return c.addEventListener("input",(function(e){" "===(u=e.target.value)&&(u="-"),j.processCurrentMainSearch(u),l=!0,f()}),!1),c.addEventListener("keydown",(function(e){if(u=e.target.value,"Backspace"===e.key)return f(),j.removeNoResults(),!1;"Enter"===e.key&&j.confirmCurrentChars()}),!1),o.addEventListener("click",(function(){u=c.value,j.confirmCurrentChars(),o.classList.remove("d-inline-block"),o.style.display="none",i.style.display="inline-block"}),!1),e}return n}(f(HTMLElement));function h(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=l(e);if(t){var c=l(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return u(this,n)}}customElements.define("searchbar-component",p);var v=function(e){i(n,e);var t=h(n);function n(e){var c;return r(this,n),(c=t.call(this)).innerHTML="\n\n            <li>\n                <a>".concat(e,"</a>\n            </li>\n        "),c}return n}(f(HTMLElement));function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=e&&("undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]);if(null!=n){var r,c,o=[],i=!0,s=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);i=!0);}catch(e){s=!0,c=e}finally{try{i||null==n.return||n.return()}finally{if(s)throw c}}return o}}(e,t)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}customElements.define("menu-list-item-component",v);var g,S,b=[],E=[],w=[];function C(e,t){g=performance.now(),b=[],E=[],j.resetSuggestions(),e.forEach((function(e){!function(e,t,n){g=performance.now(),t.toLowerCase().split(" ").filter((function(t){t.includes(n)&&((S=performance.now())-g>0&&console.log("======= searchInName MATCH FOUND FOR ",n," TOOK",S-g,"milliseconds"),E.includes(t)||(E.push(t),j.addSuggestionInList(t)),b.includes(e)||b.push(e))}))}(e,e.name,t),function(e,t,n){g=performance.now(),t.toLowerCase().split(" ").filter((function(t){var r=/e(z|r)+(\.?|,?)$/i,c=/\.|,$/i;if(t.includes(n)&&!r.test(t)){if((S=performance.now())-g>0&&console.log("======= searchInDesc MATCH FOUND FOR ",n," TOOK",S-g,"milliseconds"),c.test(t))return t.substring(0,t.length-1);E.includes(t)||(E.push(t),j.addSuggestionInList(t)),b.includes(e)||b.push(e)}}))}(e,e.description,t),function(e,t,n){g=performance.now(),t.forEach((function(t){for(var r=0,c=Object.entries(t);r<c.length;r++){var o=y(c[r],2),i=o[0],s=o[1];if("ingredient"===i){var a=s.toLowerCase();a.includes(n)&&((S=performance.now())-g>0&&console.log("======= searchInIngredients MATCH FOUND FOR ",n," TOOK",S-g,"milliseconds"),E.includes(a)||(E.push(a),j.addSuggestionInList(a)),b.includes(e)||b.push(e))}}}))}(e,e.ingredients,t)})),b.length>0?(S=performance.now(),j.setResults(b),S-g>0&&console.log("******* FIND MATCHES FOR SEARCH TERM : ",t," AND RETRIEVE RESULTS TOOK",S-g,"milliseconds","\n","RESULTS=",b),E.length>0&&(S=performance.now(),j.setSuggestions(E),S-g>0&&console.log("******* FIND SUGGESTIONS FOR SEARCH TERM : ",t,"TOOK",S-g,"milliseconds"))):j.displayNoResults()}function L(e,t,n){w=[],"appareils"===n&&(n="appliance"),e.forEach((function(e){for(var r=0,c=Object.keys(e);r<c.length;r++){var o=c[r];if(o===n){if("ingredients"===o)return e.ingredients.forEach((function(n){for(var r=0,c=Object.entries(n);r<c.length;r++){var o=y(c[r],2),i=o[0],s=o[1];if("ingredient"===i){var a=s.toLowerCase();(a===t.toLowerCase()||a.includes(t.toLowerCase()))&&(w.includes(e)||w.push(e))}}})),w;if("appliance"===o){var i=e.appliance;return(i.toLowerCase()===t.toLowerCase()||i.toLowerCase().includes(t.toLowerCase()))&&(w.includes(e)||w.push(e)),w}if("ustensils"===o)return e.ustensils.forEach((function(n){(n.toLowerCase()===t.toLowerCase()||n.toLowerCase().includes(t.toLowerCase()))&&(w.includes(e)||w.push(e))})),w}}})),j.setResults(w)}function A(e){return e=O(e=R(e=e.toLowerCase()))}function R(e){var t=/[çèéêëîïâàä]/g;if(t.test(e)){var n=e.search(t);return/[èéêë]/g.test(e.charAt(n))?e=e.replace(e.charAt(n),"e"):/[îï]/g.test(e.charAt(n))?e=e.replace(e.charAt(n),"i"):/[âàä]/g.test(e.charAt(n))?e=e.replace(e.charAt(n),"a"):/[ç]/g.test(e.charAt(n))&&(e=e.replace(e.charAt(n),"c")),R(e)}return e}function O(e){return e.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"").replace(/\s{2,}/g," ")}function q(e,t){if(!e.find((function(e){return e===t}))&&!e.find((function(e){return e===t.concat("s")}))){var n=e.find((function(e){return e===t.substring(0,t.length-1)}));if(n){var r=e.indexOf(n);e.splice(r,1,t)}else t=t.toLowerCase(),e.push(t)}}function T(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=l(e);if(t){var c=l(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return u(this,n)}}var x=function(e){i(n,e);var t=T(n);function n(e,c){var o;r(this,n),(o=t.call(this)).innerHTML='\n            \n            <div class="menu-header closed" id="menu-header-close-'.concat(e,'" isActive="false">\n                <button class="btn"\n                        id="btn-').concat(e,'" \n                        type="button" \n                        aria-expanded="false"\n                        aria-controls="').concat(e,'">').concat(e,'\n                </button>\n                <i id="caret-down" class="fas fa-angle-down"></i>\n            </div>\n\n            <div class="menu-header open" id="menu-header-open-').concat(e,'" isActive="true">\n                <input id="searchInto-').concat(e,'" class="searchInput" placeholder="rechercher un ').concat(e,'">\n                <i id="caret-up" class="fas fa-angle-up"></i>\n            </div>\n\n            <div class="collapse multi-collapse category-menu" id="menu-').concat(e,'" isOpen="false">\n                <div class="card card-body" id="body-items">\n                    <ul id="').concat(e,'-list" class="list">\n                    </ul>\n                </div>\n                <div class="card card-body" id="').concat(e,'-input-suggestions">\n                    <ul id="').concat(e,'-suggestions-list" class="list suggestions-list">\n                    </ul>\n                </div>\n            </div>\n        '),o.setAttribute("isActive","false"),o.setAttribute("id","collapsing-"+e);var i,u=a(o),l=o.querySelector("#menu-header-close-"+e),f=o.querySelector("#menu-header-open-"+e),d=o.querySelector("#menu-"+e),p=o.querySelector("#caret-up"),h=[],m=o.querySelector("#body-items"),y=o.querySelector("#"+e+"-input-suggestions"),g=document.querySelector(".adv-search-wrapper");g.classList.add("row","col-12","col-lg-6"),u.setAttribute("class","col");var S=o.querySelector("#"+e+"-list");c.forEach((function(e){var t=new v(e);t.addEventListener("click",(function(e){L(e)}),!1),S.appendChild(t)})),f.style.display="none";var b=o.querySelector("#"+e+"-input-suggestions");b.style.display="none",l.addEventListener("click",(function(e){!function(e){b.style.display="none",A(),m.style.display="flex",l=e.currentTarget,e.stopPropagation(),j.checkWhosOpen(),u.removeAttribute("isActive","false"),u.setAttribute("isActive","true"),i=u;var t=u.querySelector("input");t.value&&(t.value="");l.style.display="none",f.style.display="flex",d.style.display="flex",p.addEventListener("click",(function(e){!function(e){p=e.currentTarget,e.stopPropagation(),f.style.display="none",l.style.display="flex",d.style.display="none",u.removeAttribute("isActive","true"),u.setAttribute("isActive","false"),g.classList.replace("col-lg-10","col-lg-6"),g.classList.remove("col-lg-offset-2"),u.classList.remove("col-12"),u.classList.replace("col-lg-8","col")}(e)}),!1),function(e){g.classList.replace("col-lg-6","col-lg-10"),g.classList.add("col-lg-offset-2"),e.classList.add("col-12"),e.classList.replace("col","col-lg-8")}(i)}(e)}),!1);var E=o.querySelector("#searchInto-"+e),w="",C=!1;function L(t){var n=t.target.innerText;document.querySelector("#searchInto-"+e).value=n}function A(e){for(;b.firstChild;)b.removeChild(b.firstChild);if(e)for(;e.length>0;)e.pop()}E.addEventListener("input",(function(e){!function(e){w=e.target.value;var t=(E=e.target).getAttribute("id");t=t.slice(11,t.length),3===w.length&&function(e,t){var n=[],r=[];"appliance"===t&&(t="appareils");document.querySelector("#"+t+"-list").querySelectorAll("a").forEach((function(e){r.push(e.innerText)})),n=function(e,t,n){var r=[],c=/\.|,$/i;return n.forEach((function(t){if(t=t.toLowerCase(),c.test(t))return t.substring(0,t.length-1);t.includes(e.toLowerCase())&&(r.includes(t)||r.push(t))})),r}(e,0,r),console.log("currentSuggestions==",n),function(e){A(),m.style.display="none",y.style.display="flex",e.forEach((function(e){var t=new v(e);t.addEventListener("click",(function(e){L(e)}),!1),b.appendChild(t)}))}(n)}(w,t);C=!0,C&&!w&&E==document.activeElement&&(n=[],j.removeNoResults(),A(n),b.style.display="none",m.style.display="flex");var n}(e)}),!1),E.addEventListener("keydown",(function(e){!function(e){w=e.target.value;var t=(E=e.target).getAttribute("id");if(t=t.slice(11,t.length),C=!0,"Enter"===e.key){if(j.processAdvancedSearch(w,t),!T().includes(w)){var n=function(e){var t=document.createElement("div");t.setAttribute("class","searchTag"),t.setAttribute("id","searchTag-"+e);var n=document.createElement("i");n.setAttribute("class","fa fa-times-circle-o"),n.setAttribute("id","close-"+e),/\((.*)\)/.test(e)&&(console.log("contains parentheses"),O(e));var r=document.createTextNode(e);return t.appendChild(r),t.appendChild(n),n.addEventListener("click",(function(e){x(e)}),!1),t}(w);!function(){if(g.contains(document.querySelector("#tagsWrapper")))return;var e=document.createElement("div");e.setAttribute("id","tagsWrapper"),e.setAttribute("class","tagsWrapper"),g.prepend(e)}(),document.querySelector("#tagsWrapper").appendChild(n),q(w),p.click()}}}(e)}),!1);var R,q=function(e){h.push(e)},T=function(){return h};function x(t){t.stopPropagation();document.querySelector("#close-"+w);var n=t.currentTarget.parentNode;document.querySelector("#tagsWrapper").removeChild(n),function(e){var t=T();console.log("currenttags==",t);var n=h.indexOf(e);h.splice(n,1),console.log("currenttags AFTER REMOVE==",h,"type==",s(h))}(n.textContent),(h=T()).forEach((function(t){j.processAdvancedSearch(t,e)})),document.querySelector("#tagsWrapper").hasChildNodes()||(R=!0),R&&j.handleAdvancedSearchReset()}return o}return n}(f(HTMLElement));function k(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=l(e);if(t){var c=l(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return u(this,n)}}customElements.define("collapsing-menu-component",x);var N=function(e){i(n,e);var t=k(n);function n(e){var c;r(this,n),(c=t.call(this)).setAttribute("class","col"),c.innerHTML='\n            <div class="card recipe-card col m-0 p-0">\n                <img src="" class="card-img-top" alt="">\n                <div class="card-body">\n                    <div class="card-header-recipe row">\n                        <h5 class="card-title col-10 m-0 p-0">'.concat(e.name,'</h5>\n                        <div class="card-time col-2 m-0 p-0">\n                            <i class="far fa-clock m-0 p-0"></i>\n                            <h5 class="time m-0 p-0">').concat(e.time,'min</h5>\n                        </div>\n                    </div>\n                    <div class="recipe-description row">\n                        <ul id="ingredients-list" class="ingredients-list col m-0 p-0">\n                        </ul>\n                        <div class="recipe-txt col m-0 p-0">\n                            <p class="m-0">').concat(e.description,"</p>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            ");var o=c.querySelector("#ingredients-list");return e.ingredients.forEach((function(e){var t=document.createElement("li"),n=document.createTextNode(e.ingredient);e.quantity&&(n.textContent+=": "+e.quantity),e.unit&&("g"===e.unit||"ml"===e.unit?n.textContent+=""+e.unit:n.textContent+=" "+e.unit),t.appendChild(n),o.appendChild(t)})),c}return n}(f(HTMLElement));function I(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=l(e);if(t){var c=l(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return u(this,n)}}customElements.define("card-component",N);var M=function(e){i(n,e);var t=I(n);function n(){var e;return r(this,n),(e=t.call(this)).innerHTML='\n        <div id="header-wrapper" class="header-wrapper d-flex flex-col align-items-center justify-content-center">\n            <header class="header" role="banner" id="header">\n                <div id="header__logo-wrapper" class="header__logo-wrapper text-center" tabindex="0">\n                    <a href="" aria-label="Les petits plats homepage"><img src="./assets/icons/toque.png" alt="Les petits plats logo"></a>\n                    <h1>Les petits plats</h1>\n                </div>\n            </header>\n        </div>\n        ',e.querySelector("#header__logo-wrapper").addEventListener("focus",(function(e){var t=e.target;t==document.activeElement&&t.addEventListener("keydown",(function(e){13===e.keyCode&&t.firstElementChild.click()}),!1)}),!1),e}return n}(f(HTMLElement));customElements.define("header-template-component",M);var j=function(){var e=document.querySelector("#root"),t=[],n=[],r=[],c=[],i=[],s=[],a=[],u=[],l=window.localStorage;fetch("./assets/data.json").then((function(e){var t=e.headers.get("content-type");if(!t||!t.includes("application/json"))throw new TypeError("no JSON content was found!");return e.json()})).then((function(r){r.recipes.map((function(e){t.push(e)})),function(t){var r=new M;document.body.insertBefore(r,e),c=new p,e.appendChild(c),function(t){var r=new o;t.forEach((function(e){var c=r.create(e.id,e.name,e.servings,e.ingredients,e.time,e.description,e.appliance,e.ustensils);d(e),T(t),n.push(c)})),l.setItem("allRecipes",JSON.stringify(n)),m(n),c=document.createElement("section"),c.setAttribute("class","adv-search-wrapper"),e.insertBefore(c,f),function(e){var t=["ingredients","appareils","ustensils"],n=document.querySelector(".adv-search-wrapper");e.forEach((function(e,r){var c=t[r],o=new x(c,e);n.appendChild(o)}))}(s);var c}(t);var c}(t)})).catch((function(e){return console.log(e)}));var f=document.createElement("section");function d(t){var n=new N(t);f.appendChild(n),e.appendChild(f)}function h(e){e.length>=3&&C(t,e)}f.setAttribute("id","recipes-list"),f.setAttribute("class","row");var m=function(e){a=e},y=function(){return a};function g(e){var n=e.target.innerText,r=document.querySelector("#main-search-input");r.value=n,C(t,r.value),S(),E()}function S(e){for(e=document.querySelector("#main-suggestions");e.firstChild;)e.removeChild(e.firstChild);return e}function b(){var e=JSON.parse(l.getItem("allRecipes"));m(e),E(e)}function E(e){for(var t=document.querySelector("#recipes-list");t.firstChild;)t.removeChild(t.firstChild);y(),(e=y())||(e=JSON.parse(l.getItem("allRecipes"))),e.forEach((function(e){d(e)})),function(e){var t=document.querySelector("#ingredients-list"),n=document.querySelector("#appareils-list"),r=document.querySelector("#ustensils-list");[t,n,r].forEach((function(e){for(;e.firstChild;)e.removeChild(e.firstChild)})),e[0].forEach((function(e){var n=new v(e);t.appendChild(n);var r="ingredients";n.addEventListener("click",(function(e){k(e,r)}),!1)})),e[1].forEach((function(e){var t=new v(e);n.appendChild(t);var r="appareils";t.addEventListener("click",(function(e){k(e,r)}),!1)})),e[2].forEach((function(e){var t=new v(e);r.appendChild(t);var n="ustensils";t.addEventListener("click",(function(e){k(e,n)}),!1)}))}(s=T(e))}var w=document.createElement("div");w.setAttribute("id","no-results-message"),w.setAttribute("class","no-results-message");var R=document.createTextNode("Pas de résultat pour la recherche!");function O(){var t=document.querySelector("#no-results-message");e.contains(t)&&e.removeChild(t)}function T(e){return r=[],c=[],i=[],s=[],e.forEach((function(e){e.ingredients.forEach((function(e){var t,n,c=e.ingredient;A(c=c.toLowerCase()),n=(t=e).unit,Object.values(t).includes("grammes")&&(n="g",t.unit=n),q(r,c)}));var t=e.appliance;A(t=t.toLowerCase()),q(c,t),e.ustensils.forEach((function(e){var t=e;A(t=t.toLowerCase()),q(i,t)}))})),s.push(r,c,i),s}function k(e,t){var n=e.target.innerText;document.querySelector("#btn-"+t).click(e),document.querySelector("#searchInto-"+t).value=n}return w.appendChild(R),{processCurrentMainSearch:h,addSuggestionInList:function(e){var t=document.createElement("p"),n=document.createTextNode(e);t.appendChild(n),document.querySelector("#main-suggestions").appendChild(t),t.addEventListener("click",(function(e){g(e)}),!1),t.addEventListener("keydown",(function(e){g(e)}),!1)},resetSuggestions:S,resetSearchArray:function(e){if(e)for(;e.length>0;)e.pop()},setResults:m,getResults:y,setSuggestions:function(e){u=e},resetAllFromPreviousSearch:function(){S(),a=[],O()},resetDefaultView:b,confirmCurrentChars:function(){var e=y();m(e),E(e),S()},retrieveFirstSuggestion:function(){return u[0]},displaySearchResults:E,processAdvancedSearch:function(e,t){L(j.getResults(),e,t),E(j.getResults())},checkWhosOpen:function(){document.querySelectorAll("collapsing-menu-component").forEach((function(e){"true"===e.getAttribute("isActive")&&e.querySelector("#caret-up").click()}))},resetSearch:function(e){window.location.reload()},displayNoResults:function(){var t=document.querySelector(".adv-search-wrapper");e.insertBefore(w,t)},removeNoResults:O,handleAdvancedSearchReset:function(){var e=document.querySelector("#main-search-input");e.value?(!0,h(e.value)):(!1,b())}}}()})();