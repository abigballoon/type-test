<script>
  export let char;
  export let state = 'inactive';
</script>

<span
  class:next='{ state == 'next' }'
  class:inactive='{ state == 'inactive' }'
  class:correct='{ state == 'correct'}'
  class:wrong='{ state == 'wrong'}'
  class:wide='{ char == ' '}'>{ char }</span>

<style>
  span {
    color: #969696;
    font-size: 1.5rem;
  }

  .next {
    border-bottom: 4px solid #969696;
  }

  .inactive {
    color: #969696;
  }

  .correct {
    color: black;
  }

  .wrong {
    color: #f34c3b;
    border-bottom: 1px solid #f34c3b;
  }

  .wide {
    padding-left: 3px;
    padding-right: 3px;
  }
</style>
