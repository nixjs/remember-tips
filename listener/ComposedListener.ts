import { EventListener, Listener } from './EventListener'

export class ComposedListener {
    private count: number = 0
    private listeners: Record<string, EventListener> = {}

    public getSize = (event?: string | null): number => {
        if (event) {
            const entry = this.listeners[event]
            if (entry) {
                return entry.getSize()
            }
            return 0
        }
        return this.count
    }

    public add = (event: string, action: Listener.ListenerAction): Listener.ListenerRemover => {
        this.count += 1
        const entry = this.listeners[event] ?? (this.listeners[event] = new EventListener())
        const remove = entry.add(action)
        return (): boolean => {
            if (remove()) {
                this.count -= 1
                if (!entry.getSize()) {
                    delete this.listeners[event]
                }
                return true
            }
            return false
        }
    }

    public remove = (event: string, action: Listener.ListenerAction): boolean => {
        const entry = this.listeners[event]
        if (entry == null) {
            return false
        }
        if (action) {
            if (entry.remove(action)) {
                this.count -= 1
                if (!entry.getSize()) {
                    delete this.listeners[event]
                }
                return true
            }
            return false
        } else {
            this.count -= entry.getSize()
            delete this.listeners[event]
            return true
        }
    }

    public fire = (event: string, parameters: unknown): void => {
        const entry = this.listeners[event]
        if (entry) {
            entry.fire(parameters)
        }
    }

    public clean = (): void => {
        if (this.count > 0) {
            this.count = 0
            this.listeners = {}
        }
    }
}

export const composedListener = new ComposedListener()

// listener.add('event-name-1', (name: string, age: number, city: string): void => {
//     console.log(`event-name-1 -> Function 1: ${name} ${age} ${city}`)
// })
// listener.add('event-name-1', (name: string, age: number, city: string): void => {
//     console.log(`event-name-1 -> Function 2: ${name} ${age} ${city}`)
// })
// listener.add('event-name-2', (name: string, age: number, city: string): void => {
//     console.log(`event-name-2 -> Function 3: ${name} ${age} ${city}`)
// })

// listener.fire('event-name-1', 'John', 25, 'London')
// listener.fire('event-name-2', 'Kate', 21, 'Melbourne')
