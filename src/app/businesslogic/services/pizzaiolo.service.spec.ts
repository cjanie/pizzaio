import { TestBed } from '@angular/core/testing';

import { PizzaioloService } from './pizzaiolo.service';

describe('PizzaioloService', () => {
  let service: PizzaioloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PizzaioloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return pizzailos', () => {
    service.setService([{name: 'Janie'}, {name: 'Cyril'}]);
    expect(service.getPizzaiolos().length).toBe(2);
  })

  it('select pizzailo should not increment list of pizzaiolos', () => {
    service.setService([{name: 'Janie'}, {name: 'Cyril'}, {name: 'Martha'}]);
    service.selectPizzaiolo(1);
    expect(service.getPizzaiolos().length).toBe(3);
    expect(service.getPizzaiolos()[0].name).toBe('Cyril');
    expect(service.getPizzaiolos()[1].name).toBe('Janie');
    expect(service.getPizzaiolos()[2].name).toBe('Martha');
  });

  

  
});
