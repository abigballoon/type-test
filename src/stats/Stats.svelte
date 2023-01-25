<script>
    import { onMount } from "svelte";
    let stats = {};
    let statsList = [];

    function refreshStats() {
        let result = [];
        Object.keys(stats).forEach(item => {
            let percentage = stats[item].correct / stats[item].total;
            percentage = Math.round(percentage * 10000);
            percentage = percentage / 100;
            result.push({
                character: item,
                percentage: percentage,
                total: stats[item].total,
            });
        });

        result.sort((a, b) => a.percentage - b.percentage);
        return result;
    }

    function save(data) {
        localStorage.setItem("stat", JSON.stringify(data));
    }

    function load() {
        let text = localStorage.getItem("stat");
        if (text) {
            stats = JSON.parse(text);
            statsList = refreshStats();
        }
    }

    onMount(() => {
        load();
    });

    export function add(data) {
        let character = data.character;
        let correct = data.correct;
        if (!stats[character]) {
            stats[character] = {total: 0, correct: 0};
        }

        stats[character].total += 1;
        if (correct) {
            stats[character].correct += 1;
        }

        statsList = refreshStats();
        save(stats);
    }
</script>

<div>
    {#each statsList as row, i}
        <div>
            <span>{ i + 1}. </span>
            <span class="character">{ row.character }</span>
            <span class="stat">{ row.percentage }% ({ row.total })</span>
        </div>
    {/each}
</div>

<style>
.character {
  
}

.stat {
  color: #888;
}
</style>
