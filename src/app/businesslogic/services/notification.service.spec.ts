import { TestBed } from '@angular/core/testing';
import { Command } from '../models/Command';
import { CommandService } from './command.service';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  let command1: Command;
  
  let command2: Command; 

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);

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


});
