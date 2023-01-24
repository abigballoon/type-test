<script>
import Key from "./Key.svelte";

let keys = [
  [
  {code: "Backquote", key: "`", shiftMod: "~", capMod: null},
  {code: "Digit1", key: "1", shiftMod: "!", capMod: null},
  {code: "Digit2", key: "2", shiftMod: "@", capMod: null},
  {code: "Digit3", key: "3", shiftMod: "#", capMod: null},
  {code: "Digit4", key: "4", shiftMod: "$", capMod: null},
  {code: "Digit5", key: "5", shiftMod: "%", capMod: null},
  {code: "Digit6", key: "6", shiftMod: "^", capMod: null},
  {code: "Digit7", key: "7", shiftMod: "&", capMod: null},
  {code: "Digit8", key: "8", shiftMod: "*", capMod: null},
  {code: "Digit9", key: "9", shiftMod: "(", capMod: null},
  {code: "Digit0", key: "0", shiftMod: ")", capMod: null},
  {code: "Minus", key: "-", shiftMod: "_", capMod: null},
  {code: "Equal", key: "=", shiftMod: "+", capMod: null},
  {code: "Backspace", key: "backspace", shiftMod: null, capMod: null, width:"60"}
  ],

  [
  {code: "Tab", key: "Tab", shiftMod: null, capMod: null, width: "50"},
  {code: "KeyQ", key: "q", shiftMod: "Q", capMod: "Q"},
  {code: "KeyW", key: "w", shiftMod: "W", capMod: "W"},
  {code: "KeyE", key: "e", shiftMod: "E", capMod: "E"},
  {code: "KeyR", key: "r", shiftMod: "R", capMod: "R"},
  {code: "KeyT", key: "t", shiftMod: "T", capMod: "T"},
  {code: "KeyY", key: "y", shiftMod: "Y", capMod: "Y"},
  {code: "KeyU", key: "u", shiftMod: "U", capMod: "U"},
  {code: "KeyI", key: "i", shiftMod: "I", capMod: "I"},
  {code: "KeyO", key: "o", shiftMod: "O", capMod: "O"},
  {code: "KeyP", key: "p", shiftMod: "P", capMod: "P"},
  {code: "BracketLeft", key: "[", shiftMod: "{", capMod: null},
  {code: "BracketRight", key: "]", shiftMod: "}", capMod: null},
  {code: "Backslash", key: "\\", shiftMod: "|", capMod: null, width: "30"}
  ],

  [
  {code: "CapsLock", key: "caps lock", shiftMod: null, capMod: null, width: "60", stateful: true},
  {code: "KeyA", key: "a", shiftMod: "A", capMod: "A"},
  {code: "KeyS", key: "s", shiftMod: "S", capMod: "S"},
  {code: "KeyD", key: "d", shiftMod: "D", capMod: "D"},
  {code: "KeyF", key: "f", shiftMod: "F", capMod: "F"},
  {code: "KeyG", key: "g", shiftMod: "G", capMod: "G"},
  {code: "KeyH", key: "h", shiftMod: "H", capMod: "H"},
  {code: "KeyJ", key: "j", shiftMod: "J", capMod: "J"},
  {code: "KeyK", key: "k", shiftMod: "K", capMod: "K"},
  {code: "KeyL", key: "l", shiftMod: "L", capMod: "L"},
  {code: "Semicolon", key: ";", shiftMod: ":", capMod: null},
  {code: "Quote", key: "'", shiftMod: "\"", capMod: null}
  ],

  [
  {code: "ShiftLeft", key: "shift", shiftMod: null, capMod: null, width: "70"},
  {code: "KeyZ", key: "z", shiftMod: "Z", capMod: "Z"},
  {code: "KeyX", key: "x", shiftMod: "X", capMod: "X"},
  {code: "KeyC", key: "c", shiftMod: "C", capMod: "C"},
  {code: "KeyV", key: "v", shiftMod: "V", capMod: "V"},
  {code: "KeyB", key: "b", shiftMod: "B", capMod: "B"},
  {code: "KeyN", key: "n", shiftMod: "N", capMod: "N"},
  {code: "KeyM", key: "m", shiftMod: "M", capMod: "M"},
  {code: "Comma", key: ",", shiftMod: "<", capMod: null},
  {code: "Period", key: ".", shiftMod: ">", capMod: null},
  {code: "Slash", key: "/", shiftMod: "?", capMod: null},
  {code: "ShiftRight", key: "shift", shiftMod: null, capMod: null, width: "58"}
  ],
 
  [{code: null, empty: true, width: "120"},
   {code: "Space", key: "SPACE", width:"116"}],
];


let keyLookup = {};
let shiftActive = false;
let capActive = false;

export function press(key) {
  let data = key.detail;
  let keyObj = keyLookup[data.code];
  if (keyObj) {
    keyObj.press();
  }

  if (data.code == "ShiftLeft" || data.code == "ShiftRight") {
    shiftActive = true;
  }

  if (data.code == "CapsLock") {
    capActive = !capActive;
  }
}

export function up(key) {
  let data = key.detail;
  let keyObj = keyLookup[data.code];
  if (keyObj) {
    keyObj.up();
  }

  if (data.code == "ShiftLeft" || data.code == "ShiftRight") {
    shiftActive = false;
  }
}
</script>
<div>
{#each keys as row}
  <div class="row">
  {#each row as key}
      <Key bind:this={ keyLookup[key.code] } bind:key={ key } shiftActive={ shiftActive } capActive={ capActive } />
  {/each}
  </div>
{/each}
</div>
<style>
.row {
  display: flex;
}
</style>
