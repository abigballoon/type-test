<script>
  import { onMount } from "svelte";

  let settings = {
    maxLength : 500,
  };

  export let value;
  $: value = {maxLength: settings.maxLength};


  onMount(() => {
    value = settings;
  });
</script>

<div class="setting-main">
  <span>Total characters: </span><input bind:value={ settings.maxLength } />
</div>

<style>

.setting-main {
  text-align: center;
}

</style>

