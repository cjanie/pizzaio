
import { CommandRepository } from "../businesslogic/gateways/CommandRepository";
import { Command } from "../businesslogic/models/Command";
import { CommandLine } from "../businesslogic/models/CommandLine";

export class InMemoryCommandRepository implements CommandRepository {

    private commands: Command[];

    constructor() { 
        this.commands = [];
        
        let commands: Command[] = []
        for(let i= 0; i<6; i++) {
        let commandLine1: CommandLine = {
            pizza: {name: "pizza", ingredients: [{name: 'chèvre chaud'}, {name: 'artichaux'}]}, 
            quantity: 2
        }
        let commandLine2: CommandLine = {
            pizza: {name: "pizza", ingredients: [{name: 'chèvre chaud'}, {name: 'artichaux'}]}, 
            quantity: 6
        }
        const command: Command = {
            uiid: 'uiid:' + i,
            commandLines: [commandLine1, commandLine2],
            assignedTo: undefined,
            isReady: false,
            isPayed: false,
            total: 60
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