!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):n.emitt=e()}(this,function(){function n(n){return n=n||Object.create(null),{on:function(e,t){(n[e]||(n[e]=[])).push(t)},off:function(e,t){n[e]&&n[e].splice(n[e].indexOf(t)>>>0,1)},emit:function(e){for(var t=[],o=arguments.length-1;o-- >0;)t[o]=arguments[o+1];(n[e]||[]).slice().map(function(n){n.apply(void 0,t)}),(n["*"]||[]).slice().map(function(n){n.apply(void 0,[e].concat(t))})}}}return n});
//# sourceMappingURL=mitt.umd.js.map