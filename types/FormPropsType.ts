export type FormProps = {
    form: any
    name: string
    placeholder?: string
    label?: string
    description?: string
    data?: { label: string, value: string }[]
    multi?: boolean
    state?: any
    setState?: any
}