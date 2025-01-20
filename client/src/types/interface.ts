

export interface PreviewMainInterface {
    handleViewChange: () => void,
    code: string,
}

export interface OverviewMainInterface {
    handleViewChange: () => void,
    code: string,
    content: string,
    loader: boolean
}