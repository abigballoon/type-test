<script>
  import { onMount } from "svelte";
  import Content from "./Content.svelte";
  import { createRandomText } from "./text-generator.js";

  export let restartToggle = false;
  export let settings;

  let text = "";

  $: restartToggle, onRestart();

  onMount(() => {
    text = createRandomText(settings);
  });

  function onRestart() {
    text = createRandomText(settings);
  }

</script>

<div class="box">
  <div><Content text={ text } on:wordChanged on:started on:completed on:keyPressed on:keyUp bind:restartToggle={ restartToggle }/></div>
</div>

<style>
  .box {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    border: 1px solid #b3b3b3;
    border-radius: 4px;
  }
</style>
