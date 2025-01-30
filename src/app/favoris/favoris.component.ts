import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Residence } from '../core/models/residence';
import { ResidenceService } from '../services/residence.service';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})
export class FavorisComponent {

  list: Residence[] = [];

  displayColumns = ['id', 'name', 'image', 'status'];
  dataSource = new MatTableDataSource(this.list);

  constructor(private residenceService: ResidenceService){}

  
  ngOnInit(): void {
    this.residenceService.myWishlist$.subscribe(updatedWishlist => {
      this.list = updatedWishlist;
      this.dataSource = new MatTableDataSource(this.list);
    })
  }
  

}
