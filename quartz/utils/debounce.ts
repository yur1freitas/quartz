export type ClearTimeoutInput = Parameters<typeof clearTimeout>[number]

export type DebounceCallbackArgs = unknown[]

export type DebounceCallback<
    T extends DebounceCallbackArgs = DebounceCallbackArgs
> = (...args: T) => void

export interface DebounceInput<
    T extends DebounceCallbackArgs = DebounceCallbackArgs
> {
    delay?: number
    callback: (...args: T) => void
}

export type DebounceOutput<
    T extends DebounceCallbackArgs = DebounceCallbackArgs
> = DebounceCallback<T>

export function debounce<
    T extends DebounceCallbackArgs = DebounceCallbackArgs
>({ delay = 1_000, callback }: DebounceInput<T>): DebounceOutput<T> {
    let timerId: ClearTimeoutInput | null = null

    return (...args: T) => {
        if (timerId) clearTimeout(timerId)
        timerId = setTimeout(() => callback(...args), delay)
    }
}
