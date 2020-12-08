<script>
  import { createEventDispatcher } from "svelte";

  let restartDispatcher = createEventDispatcher();

  function restart() {
    restartDispatcher("restart");
  }
</script>

<div>
  <button on:click={ restart }>Restart</button>
</div>

<style>
  div {
    margin-top: 1rem;
    text-align: center;
  }
</style>