<script>
  export let wordcountData;
  export let started = false;
  export let completed = false;
  export let restartToggle = false;

  let time = 0;
  let startAt = 0;
  let timeHandle;

  let wordcount = 0;
  let wpm = 0;
  let accuracy = 0.0;
  let timepassed = 0;

  $: restartToggle, clear();

  $: if (started) {
    timeHandle = startTimer();
  }

  $: if (completed) {
    clearInterval(timeHandle);
  }

  $: if (wordcountData) {
    wordcount = wordcountData.wordcount;
    accuracy = Math.floor(((wordcountData.correct || 0) / (wordcountData.totaltyped || 1)) * 100);
  }

  function currentTime() {
      return (new Date()).getTime() / 1000;
  }

  function startTimer() {
    startAt = currentTime();

    return setInterval(() => {
      timepassed = (currentTime() - startAt);
      time = timepassed / 60;
      wpm = Math.round(wordcount / 5 / time);
    }, 1000);
  }

  function clear() {
    started = false;
    completed = false;

    time = 0;
    startAt = 0;
    timeHandle;

    wordcount = 0;
    wpm = 0;
    accuracy = 0.0;
  }

</script>

<div>
  <span style="margin-right: 1rem">WPM: { wpm }</span>
  <span>Accuracy: { accuracy }%</span>
  <span>Time: { startAt == 0 ? 0 : Math.round(timepassed) }s</span>
</div>

<style>
  div {
    text-align: center;
    margin-bottom: 0.5rem;
  }
  span {
    font-size: 2rem;
  }
</style>
