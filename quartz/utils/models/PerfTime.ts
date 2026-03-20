import { styleText } from 'node:util'

import pretty from 'pretty-time'

export class PerfTimer {
    events: { [key: string]: [number, number] }

    constructor() {
        this.events = {}
        this.addEvent('start')
    }

    addEvent(eventName: string) {
        this.events[eventName] = process.hrtime()
    }

    timeSince(evtName?: string): string {
        return styleText(
            'yellow',
            pretty(process.hrtime(this.events[evtName ?? 'start']))
        )
    }
}
