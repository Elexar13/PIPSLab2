import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import contacts from '../assets/phone_book.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  public contactList = contacts["contacts"];
  public contact: any;
  public style = {'font-size': '13px'};

  // @ts-ignore
  @ViewChild('mainScreen') mainScreen: ElementRef;

  ngAfterViewInit() {
    // @ts-ignore
    this.resizeText(this.mainScreen.nativeElement.clientWidth);
  }
  constructor() {
    this.contact = {};
  }

  addContactToContactList() {
    if (this.contact.name && this.contact.lastname && this.contact.phoneNumber) { //check required fields
      this.contact.id = this.generateNewId();
      this.contactList.push(this.contact);
      this.contact = {};
    } else {
      alert('Заповнені не всі обов`язкові поля');
    }
  }

  private generateNewId() {
    return Math.max.apply(Math, this.contactList.map((contact: any) => contact.id)) + 1;
  }

  removeContactFromContactList(selectedContact: any) {
    this.contactList = this.contactList.filter((contact: any) => {
      return contact.id !== selectedContact.id;
    });
  }

  changeTextSizeIfNeeded(event: Event) {
    // @ts-ignore
    this.resizeText(event.target.innerWidth);
  }

  resizeText(screenWidth: number) {
    if (screenWidth >= 1200) {
      this.style['font-size'] = '18px';
    } else if (screenWidth < 1200 && screenWidth >= 768) {
      this.style['font-size'] = '14px';
    } else if (screenWidth < 768 && screenWidth >= 480) {
      this.style['font-size'] = '12px';
    } else if (screenWidth < 480 && screenWidth >= 320) {
      this.style['font-size'] = '11px';
    }
  }
}
