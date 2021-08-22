import { Component } from '@angular/core';

import { Command } from './businesslogic/models/Command';
import { Pizzaiolo } from './businesslogic/models/Pizzailo';
import { CommandService } from './businesslogic/services/command.service';
import { PizzaioloService } from './businesslogic/services/pizzaiolo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  
  constructor(private pizzaioloService: PizzaioloService, private commandService: CommandService) {
  }

  title = 'pizzaio';

  getPizzaiolos(): Pizzaiolo[] {
    return this.pizzaioloService.getPizzaiolos();
  }

  getUnassignedCommands(): Command[] {
    return this.commandService.getUnassignedCommands();
  }

  selectedCommand: Command | undefined;

  select(command: Command): void {
    this.selectedCommand = command;
  }

  assign() {
    this.commandService.assign(this.selectedCommand!, this.getPizzaiolos()[0]);
  }

  getAssignedCommands(): Command[] {
    return this.commandService.getAssignedCommands();
  }

  deliver() {
    this.commandService.deliver(this.selectedCommand!);
  }

  getReadyCommands(): Command[] {
    return this.commandService.getReadyCommands();
  }

  selectPizzaiolo(position: number): void {
    this.pizzaioloService.selectPizzaiolo(position);
  }
  
}
