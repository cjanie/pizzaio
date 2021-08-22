import { Pizzaiolo } from "../models/Pizzailo";

export interface PizzaoloRepository {

    findAll: () => Pizzaiolo[];

}