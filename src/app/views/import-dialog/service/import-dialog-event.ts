export interface ImportDialogEvent {
    multiple: boolean
    command: (files: File[]) => void
}