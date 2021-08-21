import { TestBed } from '@angular/core/testing';
import { InMemoryCommandRepository } from 'src/app/adapters/InMemoryCommandRepository';

import { CommandService } from './command.service';

describe('CommandService', () => {
  let service: CommandService;
  let commandRepository: InMemoryCommandRepository;

  beforeEach(() => {
    commandRepository = new InMemoryCommandRepository();
    service = new CommandService(commandRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get 1 command when 1 is available', () => {
    commandRepository.setCommands([]);
    commandRepository.setCommands([
      {
        uiid: "ioo",
        assignedTo: undefined,
        isReady:undefined
      }
    ]);
    expect(service.getUnassignedCommands().length).toBe(1);
  });

  it('get 2 commands when 2 are available', () => {
    commandRepository.setCommands([]);
    commandRepository.setCommands([
      {
        uiid: "ioo",
        assignedTo: undefined,
        isReady:undefined
      },
      {
        uiid: "iooi",
        assignedTo: undefined,
        isReady:undefined
      }
    ]);
    expect(service.getUnassignedCommands().length).toBe(2);
  });

  it('get empty when there is no command', () => {
    commandRepository.setCommands([]);
    expect(service.getUnassignedCommands().length).toBe(0);
  });

  // ASSIGN
  it('assign decrements unassigned commands', () => {
    commandRepository.setCommands([]);
    commandRepository.setCommands([
      {
        uiid: "ioo",
        assignedTo: undefined,
        isReady:undefined
      }
    ]);
    expect(service.getUnassignedCommands().length).toBe(1);
    service.assign(service.getUnassignedCommands()[0], {name: "jojo"});
    expect(service.getUnassignedCommands().length).toBe(0);
  });

  it('assign increments assigned commands', () => {
    commandRepository.setCommands([]);
    commandRepository.setCommands([
      {
        uiid: "ioo",
        assignedTo: undefined,
        isReady: undefined
      }
    ]);
    expect(service.getUnassignedCommands().length).toBe(1);
    service.assign(service.getUnassignedCommands()[0], {name: "jojo"});
    expect(service.getAssignedCommands().length).toBe(1);
  });

  it('list of assigned commands is empty when no command is assigned', () => {
    commandRepository.setCommands([]);
    expect(service.getAssignedCommands().length).toBe(0);
  });

  

  it('get 1 assigned command when there is 1', () => {
    commandRepository.setCommands([]);
    commandRepository.setCommands([
      {
        uiid: "ioo",
        assignedTo: undefined,
        isReady: undefined
      }
    ]);
    expect(service.getUnassignedCommands().length).toBe(1);
    service.assign(service.getUnassignedCommands()[0], {name: "jojo"});
    expect(service.getAssignedCommands().length).toBe(1);
  });

  it('get 2 assigned commands when there are 2', () => {
    commandRepository.setCommands([]);
    commandRepository.setCommands([
      {
        uiid: "ioo",
        assignedTo: undefined,
        isReady: undefined
      },
      {
        uiid: "iao",
        assignedTo: undefined,
        isReady: undefined
      }
    ]);
    expect(service.getUnassignedCommands().length).toBe(2);
    service.assign(service.getUnassignedCommands()[0], {name: "jojo"});
    service.assign(service.getUnassignedCommands()[0], {name: "jaja"});
    expect(service.getAssignedCommands().length).toBe(2);
  });

  it('deliver command should increment ready commands', () => {
    commandRepository.setCommands([]);
    commandRepository.setCommands([
      {
        uiid: "ioo",
        assignedTo: undefined,
        isReady: undefined
      },
      {
        uiid: "iao",
        assignedTo: undefined,
        isReady: undefined
      }
    ]);
    expect(service.getUnassignedCommands().length).toBe(2);
    service.assign(service.getUnassignedCommands()[0], {name: "jojo"});
    service.assign(service.getUnassignedCommands()[0], {name: "jaja"});
    expect(service.getAssignedCommands().length).toBe(2);

    service.deliver(service.getAssignedCommands()[0]);
    
    expect(service.getReadyCommands().length).toBe(1);
  })

  it('deliver command should decrement pending commands', () => {
    commandRepository.setCommands([]);
    commandRepository.setCommands([
      {
        uiid: "ioo",
        assignedTo: undefined,
        isReady: undefined
      },
      {
        uiid: "iao",
        assignedTo: undefined,
        isReady: undefined
      }
    ]);
    expect(service.getUnassignedCommands().length).toBe(2);
    service.assign(service.getUnassignedCommands()[0], {name: "jojo"});
    service.assign(service.getUnassignedCommands()[0], {name: "jaja"});
    expect(service.getAssignedCommands().length).toBe(2);
    service.deliver(service.getAssignedCommands()[0]);
    expect(service.getAssignedCommands().length).toBe(1);

  });

  it('cannot deliver command that have not been prepared', () => {
    commandRepository.setCommands([]);
    commandRepository.setCommands([
      {
        uiid: "ioo",
        assignedTo: undefined,
        isReady: undefined
      },
      {
        uiid: "iao",
        assignedTo: undefined,
        isReady: undefined
      }
    ]);
    expect(service.getUnassignedCommands().length).toBe(2);
    try {
      service.deliver(service.getUnassignedCommands()[0]);
    } catch {

    }
    expect(service.getReadyCommands().length).toBe(0);
    expect(service.getUnassignedCommands().length).toBe(2);
  });

});




