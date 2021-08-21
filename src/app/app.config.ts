import { InjectionToken } from "@angular/core";
import { InMemoryCommandRepository } from "./adapters/InMemoryCommandRepository";

export const COMMAND_CONFIG = {
    commandQuery: new InMemoryCommandRepository()
}

