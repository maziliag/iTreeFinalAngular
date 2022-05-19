import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/model/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  people: Person[];
  selectedPerson: Person;
  display = false;
  modalTitle = '';
  personData: Person;
  emptyPersonData: Person;
  modalDateType: String;

  btnDisplayVal = '';
  readOnlyVal = false;

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.personService.getPeople().subscribe((people) => {
      this.people = people;
    });
  }

  refresh() {
    this.personService.getPeople().subscribe((people) => {
      this.people = people;
    });
  }

  openData(person: any) {
    this.btnDisplayVal = 'none';
    this.display = true;
    this.personData = person;
    this.modalDateType = 'String';
    this.modalTitle = 'Person information';
    this.readOnlyVal = true;
  }

  closeModal() {
    this.display = false;
  }
  openModal() {
    this.display = true;
    this.btnDisplayVal = 'inline';
    this.modalDateType = 'date';
    this.modalTitle = 'Add new person';
    this.personData = this.emptyPersonData;
    this.readOnlyVal = false;
  }
}
