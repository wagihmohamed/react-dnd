import { columnsFromBackend } from "../mockup";

export interface Task {
    id: string;
    title: string;
    description: string;
    showDiscription: boolean;
}

export type ColumnsArray = typeof columnsFromBackend;
