import type { Immutable } from 'immer';
import type { Collections } from './collections/types';
import type { Widgets } from './widgets/types';

export type Store = Immutable<{
    widgets: Widgets;
    collections: Collections;
}>;

export type StoreItem<T> = {
    data: null | T;
    error: null | string;
};
