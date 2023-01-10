import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ChienService } from 'src/app/services/chien.service';
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  [x: string]: any;
  chiens: any[];
  constructor(private http: HttpClient,private chienService: ChienService ,route: ActivatedRoute, router: Router) { }

  ngOnInit() {
    this.loadChiens() ;
  }

  loadChiens(){

    this.http
     .get('http://localhost:8091/chiens')
     .subscribe((result:any)=>{
       this.chiens = result ;
      //console.log(this.municipalites)

    });
  }

  reloadCurrentPage() {
    window.location.reload();
   }


  deleteChien(g,name){
    if(confirm("Voulez-vous Confirmez la supression de chien : "+name)) {
      this.chienService.delete(g)
      .subscribe(
        response =>{
          console.log(response);
          this.router.navigate([''])
        },
        error=> {
          console.log(error);
        }
      )
      //this.loadMunicipalites();
      this.loadChiens();
    }

  }




}
