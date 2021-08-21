import { Pizzaiolo } from "./Pizzailo";

export interface Command {
    uiid: string;
    assignedTo: Pizzaiolo | undefined
    isReady: boolean | undefined
}