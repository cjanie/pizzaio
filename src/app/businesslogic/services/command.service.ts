import { Injectable } from '@angular/core';
import { InMemoryCommandRepository } from 'src/app/adapters/InMemoryCommandRepository';
import { Notify } from '../enums/Notify';
import { Command } from '../models/Command';
import { NotifyCommand } from '../models/NotifyCommand';
import { Pizzaiolo } from '../models/Pizzailo';
import { NotificationService } from './notification.service';



@Injectable({
  providedIn: 'root',
})
export class CommandService {

  private commandRepository: InMemoryCommandRepository;
  private notificationService: NotificationService;

  constructor() {
    this.commandRepository = new InMemoryCommandRepository();
    this.notificationService = new NotificationService();
  }

  setService( commands: Command[]): void {
    this.commandRepository.setCommands(commands);
  }

  getUnassignedCommands(): Command[] {
    return this.commandRepository.findAll().filter(c => c.assignedTo === undefined);;
  }

  assign(command: Command, pizzaiolo: Pizzaiolo): void {
    if(command.assignedTo === undefined) {
      this.commandRepository.findAll()
        .find(c => c.uiid === command.uiid && c.isReady === false)!.assignedTo = pizzaiolo;
      this.notificationService.send(Notify.PREPARATION.toString(), command);
    }
  }

  getAssignedCommands(): Command[] {
    return this.commandRepository.findAll()
      .filter(c => c.assignedTo !== undefined && c.isReady === false);
  }

  deliver(command: Command): void {
    if(command.isReady === false) {
      this.commandRepository.findAll()
        .find(c => c.uiid === command.uiid && c.assignedTo !== undefined)!.isReady = true;
      this.notificationService.send(Notify.DELIVERY.toString(), command);
    }
  }

  getReadyCommands(): Command[] {
    return this.commandRepository.findAll().filter(c => c.isReady === true);
  }

  // for test

  getNotifications(): NotifyCommand[] {
    return this.notificationService.getNotifyCommands();
  }

  setNotifications(notifyCommands: NotifyCommand[]) {
    this.notificationService.setService(notifyCommands);
  }

}
