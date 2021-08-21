import { Command } from "../models/Command";

export interface CommandRepository {

    findAll: () => Command[];

}