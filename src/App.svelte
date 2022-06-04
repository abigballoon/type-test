
<script>

  import Meter from "./meter/Meter.svelte";
  import Typebox from "./type-box/Typebox.svelte";
  import Control from "./control/Control.svelte";
  import Setting from "./settings/Settings.svelte";

  let wordcount = 0;
  let started = false;
  let completed = false;
  let restart = false;
  let settings = {maxLength: 500};

  function onWordChanged(data) {
    wordcount = data.detail;
  }

  function onStarted() {
    started = true;
  }

  function onCompleted() {
    completed = true;
  }

  function handleRestart() {
    restart = !restart;
  }

</script>

<main>
  <Meter bind:wordcountData={ wordcount } bind:started={ started } bind:completed={ completed } bind:restartToggle={ restart }/>
  <Typebox
      on:wordChanged={ onWordChanged }
      on:started={ onStarted }
      on:completed={ onCompleted }
      bind:restartToggle={ restart }
      bind:settings={ settings}/>

  <Control on:restart={ handleRestart } />
  <Setting bind:value={ settings } />
  <div style="text-align: center">
    <div>说明：</div>
    <div>1. 每行结尾都是一个空格</div>
    <div>2. 完成后要敲个回车</div>
    <div>3. Restart是整个重新开始</div>
  </div>
</main>

