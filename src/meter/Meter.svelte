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

  $: restartToggle, clear();

  $: if (started) {
    timeHandle = startTimer();
  }

  $: if (completed) {
    clearInterval(timeHandle);
  }

  $: if (wordcountData) {
    wordcount = wordcountData.wordcount;
    accuracy = Math.floor(((wordcountData.correct || 0) / (wordcountData.wordcountSpace || 1)) * 100);
  }

  function currentTime() {
      return (new Date()).getTime() / 1000;
  }

  function startTimer() {
    startAt = currentTime();

    return setInterval(() => {
      let timepassed = (currentTime() - startAt) / 60;
      time = timepassed;
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