
<script>

  import Meter from "./meter/Meter.svelte";
  import Typebox from "./type-box/Typebox.svelte";
  import Control from "./control/Control.svelte";
  import Setting from "./settings/Settings.svelte";
  import Keyboard from "./keyboard/Keyboard.svelte";
  import Stats from "./stats/Stats.svelte";

  let wordcount = 0;
  let started = false;
  let completed = false;
  let restart = false;
  let settings = {maxLength: 500};
  let keyboard;
  let stats;

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

  function onStatsUpdate(data) {
    stats.add(data.detail);
  }

</script>

<main>
  <Meter bind:wordcountData={ wordcount } bind:started={ started } bind:completed={ completed } bind:restartToggle={ restart }/>
  <div class="content">
    <div class="side-bar">
      <Stats bind:this={ stats } />
    </div>
    <div class="center">
      <Typebox
          on:wordChanged={ onWordChanged }
          on:started={ onStarted }
          on:completed={ onCompleted }
          on:keyPressed= { onKeyPressed }
          on:keyUp={ onKeyUp }
          on:statsUpdate={ onStatsUpdate }
          bind:restartToggle={ restart }
          bind:settings={ settings}/>
      <Keyboard bind:this={ keyboard } />

      <Control on:restart={ handleRestart } />
      <Setting bind:value={ settings } />
      <div style="text-align: center">
        <div>说明：</div>
        <div>1. 每行结尾都是一个空格</div>
        <div>2. 完成后要敲个回车</div>
        <div>3. Restart是整个重新开始</div>
      </div>
    </div>
    <div class="side-bar"> </div>
  </div>

</main>

<style>
.content {
  display: flex;
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.side-bar {
    width: 20%;
    flex-shrink: 0;
    padding-left: 20px;
    padding-right: 20px;
}

</style>
