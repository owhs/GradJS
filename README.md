# GradJS
#### Lightweight (< 1kb) colour gradient generator

----
 
## Usage:

```
grad({
   src: ["#ffffff","#000000"], // array of colours, as many as you need
   i: 10, // length of output / iterations required
   accuracy: 5, // (for rgb/raw output) number of decimal places
   rgb: 0, // output as rgb string
   raw: 0, // output as raw rgb array
   up: 0 // for multi-gradients round down by default for grouping
})
```
Outputs: `["ffffff", "e3e3e3", "c6c6c6", "aaaaaa", "8e8e8e", "717171", "555555", "393939", "1c1c1c", "000000"]`

----
 
## Versions:

| Name  | Size (bytes) | Desc |
| - | - | - |
| [index.min.js](https://github.com/owhs/GradJS/blob/master/index.min.js)  | 966 | full api usage |
| [index.no-shorthand.js](https://github.com/owhs/GradJS/blob/master/index.no-shorthand.js) | 865 | full api usage, no shorthand functionality |
| [index.simpleGrad.js](https://github.com/owhs/GradJS/blob/master/index.simpleGrad.js) | 566 | only able to generate single grads, no - rgb, raw or shorthand|
| [index.simpleMulitGrad.js](https://github.com/owhs/GradJS/blob/master/index.simpleMulitGrad.js) | 765 | Can create multi grads, no - rgb, raw or shorthand|
| `*` [index.simpleMultiGrad-shorthand.js](https://github.com/owhs/GradJS/blob/master/index.simpleMultiGrad-shorthand.js) | 860 | Can create multi grads & use shorthand, no - rgb or raw |

`*` My personal favourite

----
 
## Limitations:

For some multi gradients, due to rounding issues, it will not be able to create the exact number of values as requested.
In these situations, it will always round down, and thus produce less than requested - never more. (Usually only ever by 1 or 2)

If you 100% require atleast the number you ask for, you can add `up:true` to the arguments, you'll end up probably recieving more (by 1 or 2).

----
 
## Examples:

### Single gradient:

##### Input: `grad({ src:["fff", "000"], i: 10 })`
######  Shorthand: `grad("fff", "000", 10)`
##### Output:
`["ffffff", "e3e3e3", "c6c6c6", "aaaaaa", "8e8e8e", "717171", "555555", "393939", "1c1c1c", "000000"]`

----

### Multi gradient:

##### Input: `grad({ src:["f00", "0f0", "00f"], i: 10 })`
######  Shorthand: `grad("fff", "000", "00f", 10)`
##### Output:
`["ff0000", "bf4000", "808000", "40bf00", "00ff00", "00bf40", "008080", "0040bf", "0000ff"]`

###### Note - It cannot produce the requested length (10) in this instance.<br />It will always opt return an array length less than requested amount, rather than go over.

----

### Multi gradient: (no rounding issue)

##### Input: `grad({ src:["f00", "0f0", "00f", "000"], i: 10 })`
######  Shorthand: `grad("f00", "0f0", "00f", "000", 10)`
##### Output:
`["ff0000", "aa5500", "55aa00", "00ff00", "00aa55", "0055aa", "0000ff", "0000aa", "000055", "000000"]`

----

### Output as rgb string

##### Input: `grad({ src:["fff", "000"], i: 5, rgb: 1 })`
##### Output:
`["rgb(255,255,255)", "rgb(191.25,191.25,191.25)", "rgb(127.5,127.5,127.5)", "rgb(63.75,63.75,63.75)", "rgb(0,0,0)"]`

----

### Output as rgb string, with difference accuracy

##### Input: `grad({ src:["fff", "000"], i: 5, accuracy: 1, rgb: 1 })`
##### Output:
`["rgb(255,255,255)", "rgb(191.3,191.3,191.3)", "rgb(127.5,127.5,127.5)", "rgb(63.8,63.8,63.8)", "rgb(0,0,0)"]`

----

### Output as raw rgb array

##### Input: `grad({ src:["fff", "000"], i: 5, raw: 1 })`
##### Output:
`[[255, 255, 255], [191.25, 191.25, 191.25], [127.5, 127.5, 127.5], [63.75, 63.75, 63.75], [0, 0, 0]]`
