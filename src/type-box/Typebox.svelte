<script>
import { create_in_transition } from "svelte/internal";

import { onMount } from "svelte";

  import Content from "./Content.svelte";

  import { createRandomText } from "./text-generator.js";

  let text = "";

  onMount(() => {
    text = createRandomText();
  });

</script>

<div class="box">
  <div><Content text={ text } on:wordChanged on:started on:completed /></div>
</div>

<style>
  .box {
    text-align: center;
    padding: 1em;
    width: 40%;
    margin: 0 auto;
    border: 1px solid #b3b3b3;
    border-radius: 4px;
  }
</style>