
<script>
export let key;
export let shiftActive;
export let capActive;
let active;

export function press() {
  if (key.stateful) {
    active = !active;
  } else {
    active = true;
  }
}

export function up() {
  if (!key.stateful) {
    active = false;
  }
}

function text() {
  let val = key.key;
  if (_shiftActive) {
    return key.shiftMod;
  } else if (capActive) {
    return key.capMod || val;
  } else {
    return "?";
  }
}

</script>
{#if key.empty }
<div class="empty" style="width: { key.width || 20 }px; height: {key.height || 20}px;"> </div>
{:else }
  <div class="key" class:active={ active } style="width: { key.width || 20 }px; height: { key.height || 20 }px;">
  {#if shiftActive}
    <span>{ key.shiftMod || key.key }</span>
  {:else if capActive }
    <span>{ key.capMod || key.key }</span>
  {:else }
    <span>{ key.key }</span>
  {/if }
  </div>
{/if }


<style>
.key {
  display: flex;
  border-radius: 4px;
  font-size: 0.5rem;
  margin: 1px;
  border: 1px solid #818181;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-shrink: 0;
}

.empty {
  display: flex;
  border-radius: 4px;
  font-size: 0.5rem;
  margin: 1px;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-shrink: 0;
}

.active {
  color: #efd51f;
  border-color: #fbe651;
}
</style>
