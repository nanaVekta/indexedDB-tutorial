import { Component } from '@angular/core';
import { IndexDetails, NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'indexeddb-app';
  returnMsg: string;
  submitted: boolean = false;
  fileData: any;

  //import the ngxindexed service
  constructor(private dbService: NgxIndexedDBService){

  }

  submitData(form){
    //get value of form
    const data = form.value;

    this.submitted = true;

    //check if form is valid
    if(data.first_name && data.last_name && data.email && data.photo){
      //add data to indexedDB
      this.dbService.add('coolTable', {
        first_name: data.first_name,
        last_name: data.last_name,
        profile_photo: data.photo,
        email: data.email
      })
      .subscribe((key) => {
        this.returnMsg = "Data added successfully";
        console.log('key: ', key);
      });
    }
    else{
      //return an error
      this.returnMsg = 'Enter all form values';
    }

  }

  //function to get attached file
  fileEvent(e, form){
    //get attached file
    this.fileData = e.target.files[0];

    //set the value of photo to attached file
    let data = form.value;
    data.photo = this.fileData;

  }

  //function to retrive all by index
  getFromIndexDb(email){
    let index_detail:IndexDetails = {
      indexName: 'email',
      order: 'asc'
    }

    //get all data with the email field equal to the email passed
    this.dbService.getAllByIndex('coolTable', 'email', IDBKeyRange.only(email))
    .subscribe((kpis) => {
      console.log(kpis);
    })
  }
}
