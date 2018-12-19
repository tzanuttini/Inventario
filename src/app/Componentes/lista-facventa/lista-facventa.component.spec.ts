import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFacventaComponent } from './lista-facventa.component';

describe('ListaFacventaComponent', () => {
  let component: ListaFacventaComponent;
  let fixture: ComponentFixture<ListaFacventaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaFacventaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFacventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
