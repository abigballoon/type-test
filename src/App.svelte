<script>
  import Meter from "./meter/Meter.svelte";
  import Typebox from "./type-box/Typebox.svelte";
  import Control from "./control/Control.svelte";

  let wordcount = 0;
  let started = false;
  let completed = false;

  function onWordChanged(data) {
    wordcount = data.detail.wordcount;
  }

  function onStarted() {
    started = true;
  }

  function onCompleted() {
    completed = true;
  }
</script>

<main>
  <Meter bind:wordcount={ wordcount } bind:started={ started } bind:completed={ completed }/>
  <Typebox on:wordChanged={ onWordChanged } on:started={ onStarted } on:completed={ onCompleted }/>
  <Control />
</main>