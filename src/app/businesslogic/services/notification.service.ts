import { Injectable } from '@angular/core';
import { Notify } from '../enums/Notify';
import { Command } from '../models/Command';
import { NotifyCommand } from '../models/NotifyCommand';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationsToSend: NotifyCommand[];

  constructor() { 
    this.notificationsToSend = [];
  }

  setService(notifyCommands: NotifyCommand[]) {
    this.notificationsToSend = notifyCommands;
  }

  getNotifyCommands(): NotifyCommand[] {
    return this.notificationsToSend;
  }

  send(notification: string, command: Command): void {
    this.notificationsToSend.push({
      notify: notification,
      command: command
    });
    // TODO with BACK-END
  }


}
