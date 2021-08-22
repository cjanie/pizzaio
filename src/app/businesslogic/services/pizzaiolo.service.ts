import { Injectable } from '@angular/core';
import { InMemoryPizzaioloRepository } from 'src/app/adapters/InMemoryPizzaioloRepository';
import { Pizzaiolo } from '../models/Pizzailo';

@Injectable({
  providedIn: 'root'
})
export class PizzaioloService {

  private pizzaioloRepository: InMemoryPizzaioloRepository;

  constructor() {
    this.pizzaioloRepository = new InMemoryPizzaioloRepository();
  }

  setService(pizzailos: Pizzaiolo[]) {
    this.pizzaioloRepository.setPizzailos(pizzailos);
  }

  getPizzaiolos(): Pizzaiolo[] {
    return this.pizzaioloRepository.findAll();
  }

  selectPizzaiolo(position: number) {
    
    this.getPizzaiolos().splice(0, 0, this.getPizzaiolos()[position])
    this.getPizzaiolos().splice(position + 1, 1);
    
    //this.getPizzaiolos().splice(position +1, 1, this.getPizzaiolos()[position +1])
  }
}
