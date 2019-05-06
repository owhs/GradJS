// RGB & Hex conversion forked from https://github.com/daniellmb/HEX-RGB-Conversion

!function (win) {

  win.grad = function (args) {

    if (args.src.length > 2) { // Multi Gradient Control

      var len = args.src.length - 1,
      subArrLen = Math.floor((args.i - 1) / len),
      masterArr = [];

      /* Create gradients and add to master array */
      for (var u = 0; u < len; u++) {
        masterArr = [].concat(masterArr, grad(Object.assign({}, args, {
              src: [args.src[u], args.src[u + 1]],
              i: subArrLen,
              a: 1 // this hidden tag means that it will leave off the last colour (specifically for multi gradients)
            })))
      };

      /* Add last colour */
      var lastHex = HexParse(args.src[len]),
      lastRGB = colourParse(lastHex);
      masterArr.push(args.raw ? lastRGB : args.rgb ? RGB_Str(lastRGB) : lastHex);

      return masterArr

    } else {

      var firstColour = colourParse(args.src[0]),
      lastColour = colourParse(args.src[1]),
      differenceVal = [];

      /* Calculate difference step for each itteration */
      eachRGB((channel) => {
        differenceVal[channel] = (lastColour[channel] - firstColour[channel]) / (args.a ? args.i : args.i - 1)
      });

      /* First colour is first in resArr */
      var resArr = [firstColour];

      /* Run through rgb chanels and calc difference, push result to resArr */
      for (var i = 1; i < args.i; i++) {
        var nxtVal = [].concat(resArr[i - 1]);
        eachRGB((channel) => {
          nxtVal[channel] += differenceVal[channel];
        });
        resArr[i] = nxtVal
      }

      /* Clean up decimal points */
      args.accuracy = args.accuracy !== undefined ? args.accuracy : 5;
      resArr = resArr.map(values => values.map(val => (+val.toFixed(args.accuracy))));

      /* Format output */
      if (args.rgb) {
        resArr = resArr.map(val => RGB_Str(val))
      } else if (!args.raw) {
        resArr = resArr.map(val => colourParse(val))
      }

      return resArr
    }
  };

  /* Tools */

  /* Parse Colours:
  input hex string to output rgb array
  input rgb array or 3 args to output hex
   */
  function colourParse(r, g, b) {
    if (typeof r === "string") {
      var b = parseInt(HexParse(r), 16);
      return [b >> 16, 255 & b >> 8, 255 & b]
    } else
      return (Math.round(r[2] || b) | Math.round(r[1] || g) << 8 | Math.round(r[0] || r) << 16 | 1 << 24).toString(16).slice(1)
  }

  /* Return rgb string from rgb array */
  function RGB_Str(i) {
    return "rgb(" + i[0] + "," + i[1] + "," + i[2] + ")"
  }

  /* Parse Hex - remove # and convert 3 to 6 if needed */
  function HexParse(i) {
    i = i.replace(/#/g, "");
    if (3 === i.length) {
      i = [i[0] + i[0], i[1] + i[1], i[2] + i[2]].join("")
    }
    return i
  }

  /* Iterate 3 times */
  function eachRGB(x) {
    for (var e = 0; 3 > e; e++) {
      x(e)
    }
  }

}
(this);
