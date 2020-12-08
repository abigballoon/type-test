<script>
  export let char;
  export let state = 'inactive';
</script>

<span class:next='{ state == 'next' }' class:inactive='{ state == 'inactive' }' class:correct='{ state == 'correct'}' class:wrong='{ state == 'wrong'}'>{ char }</span>

<style>
  span {
    color: #b3b3b3;
    font-family: monospace;
    font-size: 1.2rem;
  }

  .next {
    border-bottom: 4px solid #b3b3b3;
  }

  .inactive {
    color: #b3b3b3;
  }

  .correct {
    color: black;
  }

  .wrong {
    color: #f34c3b;
    border-bottom: 1px solid #f34c3b;
  }
</style>