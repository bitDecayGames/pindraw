import './style.css'
import { mount } from 'svelte'
import App from './App.svelte'
import {LogPrint} from '../wailsjs/runtime/runtime'

LogPrint("Starting Svelte app")
const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
