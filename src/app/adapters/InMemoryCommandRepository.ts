
import { CommandRepository } from "../businesslogic/gateways/CommandRepository";
import { Command } from "../businesslogic/models/Command";

export class InMemoryCommandRepository implements CommandRepository {

    private commands: Command[];

    constructor() { 
        this.commands = [];
        
        let commands: Command[] = []
        for(let i= 0; i<6; i++) {
        const command: Command = {
            uiid: 'uiid:' + i,
            assignedTo: undefined,
            isReady: undefined
        }
        commands.push(command);
        }
        this.setCommands(commands);
    }

    setCommands(commands: Command[]) {
        this.commands = commands;
    }

    findAll(): Command[] {
        return this.commands;
    }
}