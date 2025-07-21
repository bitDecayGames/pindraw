<script lang="ts">
  import {onMount} from 'svelte';
  import {writable} from 'svelte/store';
  import hotkeys from './hotkeys.js';
  import logo from './assets/images/logo-universal.png'
  import Canvas from './Canvas/Canvas.svelte'
  import {Changed, Greet, Save} from '../wailsjs/go/main/App.js'
  import {EventsOn, LogPrint} from '../wailsjs/runtime/runtime'
  import Toolbox from "./Toolbox/Toolbox.svelte";
  import {main} from "../wailsjs/go/models";

  LogPrint("Loading App.svelte")

  let world: main.World|null|undefined = undefined
  let worldWritable = writable<main.World|null|undefined>(world)

  onMount(() => {
    const unsubLoad = EventsOn(main.EventType.load, (data) => {
      LogPrint(`load ${JSON.stringify(data)}`)
      if (data) {
        const w = new main.World(data)
        worldWritable.set(w)
        world = w
      }
    })
    const unsubSave = EventsOn(main.EventType.save, () => {
      LogPrint(`save`)
      if (world) {
        Save(world, false)
      }
    })
    const unsubSaveAs = EventsOn(main.EventType.saveAs, () => {
      LogPrint(`save as`)
      if (world) {
        Save(world, true)
      }
    })
    const unsubWorld = worldWritable.subscribe((w:main.World|null|undefined) => {
      LogPrint(`world changed`)
      Changed(w!)
    })

    const hotKeysUnsubscribe = hotkeys.listen()
    return () => {
      unsubLoad()
      unsubSave()
      unsubSaveAs()
      unsubWorld()
      hotKeysUnsubscribe()
    }
  })

  let resultText: string = "Please enter your name below 👇"
  let name: string
  function greet(): void {
    Greet(name).then(result => resultText = result)
  }
</script>

<main>
  <Toolbox/>
  <img alt="Wails logo" id="logo" src="{logo}">
  <div class="result">{world?.id}</div>
  <div class="result">{world?.label}</div>
  <div class="input-box" id="input">
    <input autocomplete="off" bind:value={name} class="input" id="name" type="text"/>
    <button class="btn" onclick={greet}>Greet</button>
  </div>
  <Canvas/>
  <h1>Hello world</h1>
</main>

<style>

  #logo {
    display: block;
    width: 50%;
    height: 50%;
    margin: auto;
    padding: 10% 0 0;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-origin: content-box;
  }

  .result {
    height: 20px;
    line-height: 20px;
    margin: 1.5rem auto;
  }

  .input-box .btn {
    width: 60px;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    border: none;
    margin: 0 0 0 20px;
    padding: 0 8px;
    cursor: pointer;
  }

  .input-box .btn:hover {
    background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
    color: #333333;
  }

  .input-box .input {
    border: none;
    border-radius: 3px;
    outline: none;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    background-color: rgba(240, 240, 240, 1);
    -webkit-font-smoothing: antialiased;
  }

  .input-box .input:hover {
    border: none;
    background-color: rgba(255, 255, 255, 1);
  }

  .input-box .input:focus {
    border: none;
    background-color: rgba(255, 255, 255, 1);
  }

</style>
