export interface Action<T = string> {
    type: T;
}

export interface ActionPayload<P> extends Action {
    payload: P;
}
