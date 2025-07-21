<script lang="ts">
    import {LogPrint} from "../../wailsjs/runtime/runtime";
    import Icon from "@iconify/svelte";
    import {onMount} from 'svelte';
    import hotkeys from "../hotkeys";

    type Option = {
        label: string
        mode: string
        icon: string
        hotkey?: string
    }

    let options:Option[] = [{
        label: "Select",
        mode: "select",
        icon: "bx:pointer",
        hotkey: "Ctrl+T"
    },{
        label: "Line",
        mode: "line",
        icon: "tabler:line",
        hotkey: "Ctrl+L"
    }, {
        label: "Curve",
        mode: "curve",
        icon: "ix:bezier-curve",
        hotkey: "Ctrl+B"
    }, {
        label: "Circle",
        mode: "circle",
        icon: "material-symbols:circle-outline",
        hotkey: "Ctrl+0"
    }, {
        label: "Entity",
        mode: "entity",
        icon: "uit:object-group",
        hotkey: "Ctrl+E"
    }]

    let selected = $state<Option|null>(null)
    const select = (opt:Option) => {
        selected = opt
        LogPrint(`Set mode: ${opt.mode}`)
    }

    onMount(() => {
        const unsubscribe = options.filter((opt) => opt.hotkey).map((opt) => hotkeys.subscribe(opt.hotkey!, ()=>select(opt)))
        return () => {
            unsubscribe.forEach((unSub) => unSub())
        }
    })
</script>

<div class="absolute top-0 left-0 flex-row justify-start flex items-start gap-1">
    {#each options as option, i}
        <button class="text-slate-900 px-2 py-1 rounded hover:bg-slate-500 w-8" class:bg-amber-500={option.mode === selected?.mode} class:bg-slate-50={option?.mode !== selected?.mode} onclick={()=>select(options[i])} title={option.label}><Icon icon={option.icon}/></button>
    {/each}
</div>