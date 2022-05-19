import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Person } from 'src/app/model/person';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  public people: Person[];
  @Input() personDataProp: Person;
  @Input() dateType: String;

  // Dynimac titles to change between modals
  @Input() title: String = '';
  // Inputs disabled when viewing data in a modal
  @Input() readonlyValue = true;
  // Btn display property to change between modals
  @Input() btnDisplay = 'inline';

  constructor(private personService: PersonService) {}

  ngOnInit(): void {}

  @Input() display: boolean = false;
  @Output() newModalEvent = new EventEmitter<boolean>();

  @Output() refreshRequest = new EventEmitter();
  refresh() {
    this.refreshRequest.emit();
  }

  // Event is raised when clicking on submit btn
  public onAddPerson(addForm: NgForm): void {
    if (this.numMessage != 'ok') {
      alert(this.numMessage);
      return;
    } else if (this.emailMessage != 'ok') {
      alert(this.emailMessage);
      return;
    } else if (this.dobMessage < 18) {
      alert('Person must be over 18 years old');
      return;
    }
    this.personService.addPeople(addForm.value).subscribe(
      (response: Person) => {},
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  resetFields(addForm: NgForm) {
    addForm.reset();
  }

  // Event is raised when modal is closed
  public hideDialog(addForm: NgForm): void {
    if (
      this.numMessage != 'ok' ||
      this.emailMessage != 'ok' ||
      this.dobMessage < 18
    ) {
      return;
    }
    this.refresh();
    this.display = false;
    this.newModalEvent.emit(this.display);
    setTimeout(() => {
      addForm.reset();
    }, 100);
  }

  // Form validations
  // Email validation
  emailValue: String;
  emailMessage: String;
  regex: any = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  getInputEmail(event: Event) {
    this.emailValue = (event.target as HTMLInputElement).value;
    if (!this.emailValue.match(this.regex)) {
      this.emailMessage = 'Email must be valid';
    } else {
      this.emailMessage = 'ok';
    }
  }

  // Phone number validation
  numValue: String;
  numMessage: String;
  getInputNumber(event: Event) {
    this.numValue = (event.target as HTMLInputElement).value;
    if (this.numValue.length < 11 || this.numValue.length > 11) {
      this.numMessage = 'Number must be 11 digits starting with 307';
    } else {
      this.numMessage = 'ok';
    }
  }

  // Dob validation
  dobValue: any;
  dobMessage: any;
  today: any;
  getInputDob(event: Event) {
    this.today = new Date();
    this.dobValue = new Date((event.target as HTMLInputElement).value);
    this.dobMessage = Math.floor(
      Math.abs(this.today - this.dobValue) / (1000 * 3600 * 24 * 365)
    );
  }
}
