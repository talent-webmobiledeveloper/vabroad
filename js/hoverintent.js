﻿!function(t){t.fn.hoverIntent=function(e,n){var o,r,i,u,v={sensitivity:7,interval:100,timeout:0};v=t.extend(v,n?{over:e,out:n}:e);var a=function(t){o=t.pageX,r=t.pageY},s=function(e,n){if(n.hoverIntent_t=clearTimeout(n.hoverIntent_t),Math.abs(i-o)+Math.abs(u-r)<v.sensitivity)return t(n).unbind("mousemove",a),n.hoverIntent_s=1,v.over.apply(n,[e]);i=o,u=r,n.hoverIntent_t=setTimeout(function(){s(e,n)},v.interval)},h=function(e){var n=jQuery.extend({},e),o=this;o.hoverIntent_t&&(o.hoverIntent_t=clearTimeout(o.hoverIntent_t)),"mouseenter"==e.type?(i=n.pageX,u=n.pageY,t(o).bind("mousemove",a),1!=o.hoverIntent_s&&(o.hoverIntent_t=setTimeout(function(){s(n,o)},v.interval))):(t(o).unbind("mousemove",a),1==o.hoverIntent_s&&(o.hoverIntent_t=setTimeout(function(){var t,e;t=n,(e=o).hoverIntent_t=clearTimeout(e.hoverIntent_t),e.hoverIntent_s=0,v.out.apply(e,[t])},v.timeout)))};return this.bind("mouseenter",h).bind("mouseleave",h)}}(jQuery);