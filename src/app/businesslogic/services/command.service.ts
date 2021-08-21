import { inject, Injectable, InjectionToken } from '@angular/core';
import { InMemoryCommandRepository } from 'src/app/adapters/InMemoryCommandRepository';
import { CommandRepository } from '../gateways/CommandRepository';
import { Command } from '../models/Command';
import { Pizzaiolo } from '../models/Pizzailo';



@Injectable({
  providedIn: 'root',
})
export class CommandService {

  private commandRepository: InMemoryCommandRepository;

  constructor() {//(commandRepository: InMemoryCommandRepository) {
    this.commandRepository = new InMemoryCommandRepository(); //= commandRepository;
  }

  getUnassignedCommands(): Command[] {
    return this.commandRepository.findAll().filter(c => c.assignedTo === undefined);;
  }

  assign(command: Command, pizzaiolo: Pizzaiolo): void {
    this.commandRepository.findAll().find(c => c.uiid === command.uiid && c.isReady === undefined)!.assignedTo = pizzaiolo;
  }

  getAssignedCommands(): Command[] {
    return this.commandRepository.findAll().filter(c => c.assignedTo !== undefined && c.isReady === undefined);
  }

  deliver(command: Command): void {
    this.commandRepository.findAll().find(c => c.uiid === command.uiid && c.assignedTo !== undefined)!.isReady = true;
  }

  getReadyCommands(): Command[] {
    return this.commandRepository.findAll().filter(c => c.isReady === true);
  }



}
