<script>
  import { createEventDispatcher } from "svelte";
  import Character from "./Character.svelte";

  export let text;
  export let restartToggle;

  const wordCountDispatch = createEventDispatcher();
  const startDispatch = createEventDispatcher();
  const completeDispatch = createEventDispatcher();

  let cursor = 0;
  let typedcontent = "";
  let started = false;
  let textarea;
  let disableTextarea = false;

  $: restartToggle, onRestart();

  function handleclick(event) {
    textarea.focus();
  }

  function handletyped(event) {
    let length = textarea.value.length;
    if (length == text.length + 1 && textarea.value[length - 1] == '\n') {
      handleComplete();
    } else if (length > text.length) {
      textarea.value = textarea.value.slice(0, text.length);
    }

    typedcontent = textarea.value;
    cursor = typedcontent.length;
    countWords();
    if (!started) {
      started = true;
      startDispatch("started");
    }
  }

  function handleComplete() {
    disableTextarea = true;
    completeDispatch("completed");
  }

  function countWords() {
    let correct = 0;
    for (let i = 0; i < typedcontent.length && i < text.length; i++) {
      if (typedcontent[i] == text[i]) {
        correct += 1;
      }
    }

    wordCountDispatch(
      "wordChanged",
      {
        // original text
        "wordcountSpace": text.length,
        // all typed characters (without space)
        "wordcount": (typedcontent.replace(/ /g, '')).length,
        // all typed characters (without \n)
        "totaltyped": (typedcontent.replace(/\n/g, '')).length,
        // all correctly typed characters
        "correct": correct,
      },
    );
  }

  function onRestart() {
    cursor = 0;
    typedcontent = "";
    started = false;
    disableTextarea = false;

    if (textarea) {
      textarea.value = "";
    }
  }

</script>

<div on:click={ handleclick }>
  {#each text as char, i}
    {#if i == cursor }
      <Character char={ char } state={ 'next' } />
    {:else if i < typedcontent.length && typedcontent[i] === char }
      <Character char={ char } state={ 'correct' }/>
    {:else if i < typedcontent.length && typedcontent[i] !== char }
      <Character char={ char } state={ 'wrong' }/>
    {:else }
      <Character char={ char } state={ 'inactive' }}/>
    {/if}
  {/each}
</div>
<textarea bind:this={ textarea } on:input={ handletyped } disabled={ disableTextarea }/>

<style>
  textarea {
    width: 0px;
    height: 0px;
    padding: 0;
    margin: 0;
    border: none;
    display: inherit;
  }
</style>
