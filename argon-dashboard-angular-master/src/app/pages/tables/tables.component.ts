import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  chiens: any[];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadChiens() ;
  }

  loadChiens(){
    
    this.http
     .get('http://localhost:8090/chiens')
     .subscribe((result:any)=>{
       this.chiens = result ;
      //console.log(this.municipalites)
       
    });
  }

  reloadCurrentPage() {
    window.location.reload();
   }



}
