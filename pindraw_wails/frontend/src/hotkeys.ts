type Hotkey = [string[], ()=>void]
const parseShortcut = (shortcut:string):string[] => {
    return shortcut.toLowerCase().split("+").map(v => v.trim())
}
// Helper to parse the keyboard combination
const getPressedKeys = (event:KeyboardEvent) => {
    // Get the pressed keys
    return [
        (event.ctrlKey || event.metaKey) ? 'ctrl' : '',
        event.altKey ? 'alt' : '',
        event.shiftKey ? 'shift' : '',
        event.key.toLowerCase()
    ].filter(Boolean);
}
const subscribers:Set<Hotkey> = new Set<Hotkey>()
const enabled = true

const handleKeydown = (e:KeyboardEvent) => {
    const pressed = getPressedKeys(e)
    subscribers.forEach((sub) => {
        if (pressed.every((key, index) => key === sub[0][index])) sub[1]()
    })
}

export default {
    listen: ():()=>void => {
        window.addEventListener('keydown', handleKeydown);
        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    },
    subscribe: (shortcut:string, fn:()=>void):()=>void => {
        const sub:Hotkey = [parseShortcut(shortcut), fn]
        subscribers.add(sub)

        return () => {
            subscribers.delete(sub)
        }
    }
}