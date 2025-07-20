<script lang="ts">
    import { onMount } from 'svelte'

    type Point = {x:number, y:number}
    export let width = 300
    export let height = 300
    export let color = '#333'
    export let background = '#fff'

    let canvas:HTMLCanvasElement
    let context:CanvasRenderingContext2D
    let isDrawing:boolean
    let start:Point

    let t:number, l:number

    onMount(() => {
        context = canvas.getContext('2d')!
        context.lineWidth = 3

        handleSize()
    })

    $: if(context) {
        context.strokeStyle = color
    }

    const handleStart = (({ offsetX: x, offsetY: y }) => {
        if(color === background) {
            context.clearRect(0, 0, width, height)
        } else {
            isDrawing = true
            start = { x, y }
        }
    })

    const handleEnd = () => { isDrawing = false }
    const handleMove = (({ offsetX: x1, offsetY: y1 }) => {
        if(!isDrawing) return

        const { x, y } = start
        context.beginPath()
        context.moveTo(x, y)
        context.lineTo(x1, y1)
        context.closePath()
        context.stroke()

        start = { x: x1, y: y1 }
    })

    const handleSize = () => {
        const { top, left } = canvas.getBoundingClientRect()
        t = top
        l = left
    }
</script>

<svelte:window on:resize={handleSize} />

<canvas
        {width}
        {height}
        style:background
        bind:this={canvas}
        on:mousedown={handleStart}
        on:touchstart={e => {
					const { clientX, clientY } = e.touches[0]
					handleStart({
						offsetX: clientX - l,
						offsetY: clientY - t
					})
				}}
        on:mouseup={handleEnd}
        on:touchend={handleEnd}
        on:mouseleave={handleEnd}
        on:mousemove={handleMove}
        on:touchmove={e => {
					const { clientX, clientY } = e.touches[0]
					handleMove({
						offsetX: clientX - l,
						offsetY: clientY - t
					})
				}}
></canvas>