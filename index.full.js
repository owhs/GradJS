// RGB & Hex conversion forked from https://github.com/daniellmb/HEX-RGB-Conversion

!function (t) {

  /* Output rgb Array */
  t.toRGB = function (a) {
    a = a.replace(/#/g, ""), // remove hash
    3 === a.length && (a += a); // convert to 6 long
    var b = parseInt(a, 16);
    return [b >> 16, 255 & b >> 8, 255 & b]
  };
  
  /* Output hex string */
  t.toHex = function (r, g, b) { //enter 3 args or 1 array
    return (Math.round(r[2] || b) | Math.round(r[1] || g) << 8 | Math.round(r[0] || r) << 16 | 1 << 24).toString(16).slice(1)
  };
  
  /* Output array */
  t.grad = function (g) {
  
    /* ## Control flow for multi-gradients ## */
    if (g.src.length > 2) {
    
      var o = g.src.length - 1, // Number of grads needed
          n = Math.floor((g.i - 1) / o), // Sub grad array size
          a = []; // return master grad
          
      for (var u = 0; u < o; u++) { // run through required grads
        a = [].concat(a, grad(Object.assign({}, g, { // create arg from original & modify
              src: [g.src[u], g.src[u + 1]], // to only calculate required grads
              i: n, // sub array size
              a: 1 // dont run till end (don't double up colours)
            })))};
      
      var l = g.src[o], b = toRGB(l); // get last item to add, get rgb vals
      return a.push(g.raw ? b : g.rgb ? "rgb(" + b[0] + "," + b[1] + "," + b[2] + ")" : l), // change format of last one if needed
      a // return multi-gradient array
    }
    /* ## End multi grad control flow ## */
    
    /* ## Control flow for single gradient ## */
    
    /* Initalise values  */
    var u = toRGB(g.src[0]), // rgb array for start colour
        f = toRGB(g.src[1]), // rgb array for end colour
        c = [] //step differences
    for (var e = 0; 3 > e; e++) // iterate over rgb chanels
      c[e] = (f[e] - u[e]) / (g.a ? g.i : g.i - 1); // calc step diffs, if g.a is set it will run to second last color
      
    /* Calc gradient */
    var r = [u]; // first val = inputted
    for (var i = 1; i < g.i; i++) {
    
      var h = [].concat(r[i - 1]); // get previous val to add step diff to
      
      for (var e = 0; 3 > e; e++) // iterate over rgb chanels
        h[e] += c[e]; // to step diff calc

      r[i] = h // push array
    }
    
    g.ac = g.accuracy !== undefined ? g.accuracy : 5; // get accuracy
    r = r.map(s => s.map(m => (+m.toFixed(g.ac)))); // set accuracy
    
    /* Formatting for return */
    if (g.rgb) { // rgb:1 set to return rgb string
      r = r.map(s => "rgb(" + s[0] + "," + s[1] + "," + s[2] + ")")
    } else if (!g.raw) { // hex if raw:1 isn't set
      r = r.map(s => toHex(s))
    }
    
    return r // return gradient array
    /* ## End grad control flow ## */
  }
}
(this);
