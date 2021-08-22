import { TestBed } from '@angular/core/testing';
import { InMemoryCommandRepository } from 'src/app/adapters/InMemoryCommandRepository';
import { Command } from '../models/Command';

import { CommandService } from './command.service';

describe('CommandService', () => {
  let service: CommandService;

  let command1: Command;
  
  let command2: Command; 

  beforeEach(() => {
    service = new CommandService();
    service.setService([]);

    command1 = {
      uiid: "ioo",
      commandLines: [],
      assignedTo: undefined,
      isReady: false,
      isPayed: false,
      total:12
    }

    command2 = {
      uiid: "iao",
      commandLines: [],
      assignedTo: undefined,
      isReady: false,
      isPayed: false,
      total:2
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

it('get 1 command when 1 is available', () => {
  service.setService([command1]);
  expect(service.getUnassignedCommands().length).toBe(1);
});

      
  it('get 2 commands when 2 are available', () => {
    service.setService([command1, command2]);
    expect(service.getUnassignedCommands().length).toBe(2);
  });

  it('get empty when there is no command', () => {
    service.setService([]);
    expect(service.getUnassignedCommands().length).toBe(0);
  });

  // ASSIGN
  it('assign decrements unassigned commands', () => {
    service.setService([command1]);
    expect(service.getUnassignedCommands().length).toBe(1);
    
    service.assign(service.getUnassignedCommands()[0], {name: "jojo"});
    
    
    expect(service.getUnassignedCommands().length).toBe(0);
  });

  it('assign increments assigned commands', () => {
    service.setService([command1]);
    expect(service.getUnassignedCommands().length).toBe(1);
    service.assign(service.getUnassignedCommands()[0], {name: "jojo"});
    expect(service.getAssignedCommands().length).toBe(1);
  });

  it('list of assigned commands is empty when no command is assigned', () => {
    service.setService([]);
    expect(service.getAssignedCommands().length).toBe(0);
  });

  it('get 1 assigned command when there is 1', () => {
    service.setService([command1]);
    expect(service.getUnassignedCommands().length).toBe(1);
    
    service.assign(service.getUnassignedCommands()[0], {name: "jojo"});
    expect(service.getAssignedCommands().length).toBe(1);
  });

  it('get 2 assigned commands when there are 2', () => {
    service.setService([command1, command2]);
    expect(service.getUnassignedCommands().length).toBe(2);
    service.assign(service.getUnassignedCommands()[0], {name: "jojo"});
    service.assign(service.getUnassignedCommands()[0], {name: "jaja"});
    expect(service.getAssignedCommands().length).toBe(2);
  });

  it('assign does not update when already assigned to a pizzaiolo', () => {
    service.setService([command1]);
    expect(service.getUnassignedCommands().length).toBe(1);
    service.assign(service.getUnassignedCommands()[0], {name: 'jojo'});
    expect(service.getAssignedCommands().length).toBe(1);
    service.assign(service.getAssignedCommands()[0], {name: 'Jaja'});
    expect(service.getAssignedCommands().length).toBe(1);
    expect(service.getAssignedCommands()[0].assignedTo!.name).toBe('jojo');
  });

  it('assign sends notification', () => {
    service.setNotifications([]);
    service.setService([command1]);
    expect(service.getUnassignedCommands().length).toBe(1);
    service.assign(service.getUnassignedCommands()[0], {name: 'jojo'});
    expect(service.getNotifications().length).toBe(1);
  });

  it('assign does not send two same noticications', () => {
    service.setNotifications([]);
    service.setService([command1]);
    expect(service.getUnassignedCommands().length).toBe(1);
    service.assign(service.getUnassignedCommands()[0], {name: 'jojo'});
    service.assign(service.getAssignedCommands()[0], {name: 'jojo'});
    expect(service.getNotifications().length).toBe(1);
  });

  it('deliver command should increment ready commands', () => {
    service.setService([command1, command2]);
    expect(service.getUnassignedCommands().length).toBe(2);
    service.assign(service.getUnassignedCommands()[0], {name: "jojo"});
    service.assign(service.getUnassignedCommands()[0], {name: "jaja"});
    expect(service.getAssignedCommands().length).toBe(2);

    service.deliver(service.getAssignedCommands()[0]);
    
    expect(service.getReadyCommands().length).toBe(1);
  })

  it('deliver command should decrement pending commands', () => {
    service.setService([command1, command2]);
    expect(service.getUnassignedCommands().length).toBe(2);
    service.assign(service.getUnassignedCommands()[0], {name: "jojo"});
    service.assign(service.getUnassignedCommands()[0], {name: "jaja"});
    expect(service.getAssignedCommands().length).toBe(2);
    service.deliver(service.getAssignedCommands()[0]);
    expect(service.getAssignedCommands().length).toBe(1);

  });

  it('cannot deliver command that have not been prepared', () => {
    service.setService([command1, command2]);
    expect(service.getUnassignedCommands().length).toBe(2);
    try {
      service.deliver(service.getUnassignedCommands()[0]);
    } catch {

    }
    expect(service.getReadyCommands().length).toBe(0);
    expect(service.getUnassignedCommands().length).toBe(2);
  });

  it('command can not prepare a ready command', () => {
    service.setService([
      {
        uiid: "ioo",
        commandLines: [],
        assignedTo: {name: 'Janie'},
        isReady: false,
        isPayed: false,
        total: 12
      }
    ]);
    service.deliver(service.getAssignedCommands()[0]);
    try {
      service.assign(service.getReadyCommands()[0], {name: "Janie"});
    } catch {

    }
    expect(service.getAssignedCommands().length).toBe(0);
  });

  it('deliver sends notification', () => {
    service.setNotifications([]);
    service.setService([command1]);
    service.assign(service.getUnassignedCommands()[0], {name: 'jaj'});
    expect(service.getNotifications().length).toBe(1);
    service.deliver(service.getAssignedCommands()[0]);
    expect(service.getNotifications().length).toBe(2);
  });

  it('deliver does not send two same notifications', () => {
    service.setNotifications([]);
    service.setService([command1]);
    service.assign(service.getUnassignedCommands()[0], {name: 'jaj'});
    expect(service.getNotifications().length).toBe(1);
    service.deliver(service.getAssignedCommands()[0]);
    service.deliver(service.getReadyCommands()[0]);
    expect(service.getNotifications().length).toBe(2);
  });

});




