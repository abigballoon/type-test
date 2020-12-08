<script>
  export let wordcount = 0;
  export let started = false;
  export let completed = false;

  let time = 0;
  let startAt = 0;
  let wpm = 0;
  let accuracy = 0.0;
  let timeHandle;

  $: if (started) {
    timeHandle = startTimer();
  }

  $: if (completed) {
    clearInterval(timeHandle);
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

</script>

<div>
  <p>WPM: { wpm }</p>
</div>

<style>
  div {
    text-align: center;
  }
</style>