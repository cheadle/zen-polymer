!function(a){"use strict";a.addEventListener("polymer-ready",function(){console.log("Polymer is ready to rock!")});var b,c,d,e="projects",f=a.querySelector('template[is="auto-binding"]');f.pages=[{name:"Projects",hash:"projects",url:"/demo/projects.html"},{name:"Orders",hash:"orders",url:"/demo/orders.html"},{name:"Products",hash:"products",url:"/demo/products.html"}],f.addEventListener("template-bound",function(){d=a.querySelector("#scaffold"),b=a.querySelector("#ajax"),c=a.querySelector("#pages");var g=a.querySelector("#keys"),h=Array.apply(null,f.pages).map(function(a,b){return b+1}).reduce(function(a,b){return a+" "+b});g.keys+=" "+h,this.route=this.route||e}),f.keyHandler=function(a,b){var d=parseInt(b.key);if(!isNaN(d)&&d<=this.pages.length)return void c.selectIndex(d-1);switch(b.key){case"left":case"up":c.selectPrevious();break;case"right":case"down":c.selectNext();break;case"space":b.shift?c.selectPrevious():c.selectNext()}},f.menuItemSelected=function(a,b){b.isSelected&&this.async(function(){d.closeDrawer()})},f.cyclePages=function(a,b,c){"a"!=a.path[0].localName&&(a.shiftKey?c.selectPrevious(!0):c.selectNext(!0))},f.ajaxLoad=function(a){a.preventDefault()},f.onResponse=function(b,c){var d=c.response.querySelector("scroll-area article"),e=a.querySelector("#pages");this.injectBoundHTML(d.innerHTML,e.selectedItem.firstElementChild)}}(wrap(document));