import { Pizzaiolo } from "../businesslogic/models/Pizzailo";

export class InMemoryPizzaioloRepository {

    private pizzaiolos: Pizzaiolo[];
    
    constructor() {
        this.pizzaiolos = [];
        this.setPizzailos([{name: "Jojo"}, {name: 'Ludo'}, {name: 'Lola'}]);
    }

    setPizzailos(pizzailos: Pizzaiolo[]) {
        this.pizzaiolos = pizzailos;
    }

    findAll(): Pizzaiolo[] {
        return this.pizzaiolos;
    }
}