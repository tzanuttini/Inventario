import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFaccompraComponent } from './lista-faccompra.component';

describe('ListaFaccompraComponent', () => {
  let component: ListaFaccompraComponent;
  let fixture: ComponentFixture<ListaFaccompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaFaccompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFaccompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
