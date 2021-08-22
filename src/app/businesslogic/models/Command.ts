import { CommandLine } from "./CommandLine";
import { Pizzaiolo } from "./Pizzailo";

export interface Command {
    uiid: string
    commandLines: CommandLine[]
    assignedTo: Pizzaiolo | undefined
    isReady: boolean
    isPayed: boolean
    total: number
}