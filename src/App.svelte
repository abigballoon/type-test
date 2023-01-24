
<script>

  import Meter from "./meter/Meter.svelte";
  import Typebox from "./type-box/Typebox.svelte";
  import Control from "./control/Control.svelte";
  import Setting from "./settings/Settings.svelte";
  import Keyboard from "./keyboard/Keyboard.svelte";

  let wordcount = 0;
  let started = false;
  let completed = false;
  let restart = false;
  let settings = {maxLength: 500};
  let keyboard;

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

  function onKeyPressed(key) {
    keyboard.press(key);
  }

  function onKeyUp(key) {
    keyboard.up(key);
  }

</script>

<main>
  <Meter bind:wordcountData={ wordcount } bind:started={ started } bind:completed={ completed } bind:restartToggle={ restart }/>
  <div class="content">
    <Typebox
        on:wordChanged={ onWordChanged }
        on:started={ onStarted }
        on:completed={ onCompleted }
        on:keyPressed= { onKeyPressed }
        on:keyUp= { onKeyUp }
        bind:restartToggle={ restart }
        bind:settings={ settings}/>
    <Keyboard bind:this={keyboard} />

    <Control on:restart={ handleRestart } />
    <Setting bind:value={ settings } />
  </div>

  <div style="text-align: center">
    <div>说明：</div>
    <div>1. 每行结尾都是一个空格</div>
    <div>2. 完成后要敲个回车</div>
    <div>3. Restart是整个重新开始</div>
  </div>
</main>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
