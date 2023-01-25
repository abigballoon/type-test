<script>
  import { createEventDispatcher, onMount } from "svelte";
  import Character from "./Character.svelte";

  export let text;
  export let restartToggle;

  const eventDispatch = createEventDispatcher();

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
    console.log(event);
    let length = textarea.value.length;
    if (length == text.length + 1 && textarea.value[length - 1] == '\n') {
      handleComplete();
    } else if (length > text.length) {
      textarea.value = textarea.value.slice(0, text.length);
    }

    typedcontent = textarea.value;
    cursor = typedcontent.length;
    countWords(event.data);
    if (!started) {
      started = true;
      eventDispatch("started");
    }
  }

  function handleComplete() {
    disableTextarea = true;
    eventDispatch("completed");
  }

  function countWords(key) {
    let correct = 0;
    for (let i = 0; i < typedcontent.length && i < text.length; i++) {
      if (typedcontent[i] == text[i]) {
        correct += 1;
      }
    }

    eventDispatch(
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

    if (!typedcontent.length) { return; }
    if (!key) { return; }
    let target = text[typedcontent.length - 1];
    if (target == " ") { return; }
    let typed = typedcontent[typedcontent.length - 1];
    let targetCorrect = target == typed;
    eventDispatch(
      "statsUpdate",
      {"character": target.toUpperCase(), "correct": targetCorrect},
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

  onMount(() => {
    textarea.addEventListener("keydown", e => {
      eventDispatch("keyPressed", e);
    });
    textarea.addEventListener("keyup", e => {
      eventDispatch("keyUp", e);
    });
  });

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
