!function(a,M){b=(a,c,e)=>{X=M.round;if(a.sub){e=parseInt(d(a),16);return[e>>16,255&e>>8,255&e]}return(X(a[2]||e)|X(a[1]||c)<<8|X(a[0]||a)<<16|1<<24).toString(16).slice(1)},c=a=>"rgb("+a[0]+","+a[1]+","+a[2]+")",d=a=>(a=a.replace(/#/g,""),3===a.length&&(a=[a[0]+a[0],a[1]+a[1],a[2]+a[2]].join("")),a),e=a=>{for(var b=0;3>b;b++)a(b)};a.grad=function(a){var A=[].slice.call(arguments);if(a.sub)a={src:A.filter(x=>x.sub),i:A.filter(x=>x.toFixed)[0]};if(2<a.src.length){for(var f=a.src.length-1,g=M[a.up?"ceil":"floor"]((a.i-1)/f),h=[],j=0;j<f;j++)h=[].concat(h,grad(Object.assign({},a,{src:[a.src[j],a.src[j+1]],i:g,a:1})));k=d(a.src[f]),l=b(k);return h.push(a.raw?l:a.rgb?c(l):k),h}m=b(a.src[0]),n=b(a.src[1]),o=[];e(b=>o[b]=(n[b]-m[b])/(a.a?a.i:a.i-1));for(var p,q=[m],r=1;r<a.i;r++)p=[].concat(q[r-1]),e(a=>p[a]+=o[a]),q[r]=p;return q=q.map(b=>b.map(b=>+b.toFixed(a.accuracy!==void 0?a.accuracy:5))),a.rgb?q=q.map(a=>c(a)):!a.raw&&(q=q.map(a=>b(a))),q}}(this,Math);
