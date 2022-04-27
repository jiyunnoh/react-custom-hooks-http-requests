export type TaskItemType = {
    id: string,
    text: string
}

export type TaskType = {
    items: TaskItemType[];
    error: string | null;
    onFetch: any;
    loading: boolean;
}

export type RequestConfigType = {
    url: string,
    method?: string,
    headers?: HeadersInit,
    body?: object
}