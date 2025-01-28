import { Component, inject, Input, OnInit } from '@angular/core';
import { Residence } from '../core/models/residence';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../utils/modal/modal.component';
import { ResidenceService } from '../services/residence.service';

@Component({
  selector: 'app-residences',
  templateUrl: './residences.component.html',
  styleUrls: ['./residences.component.css'],
})
export class ResidencesComponent implements OnInit {

  displayColumns = ['id', 'name', 'image', 'status', 'action'];
  isLike: boolean = true;
  isVisible: boolean = false;
  isDisabled: boolean = true;
  adresse: string = '';
  whishlist: Residence[] = this.residenceService.getWishlist();
  
  listResidences: Residence[] = this.residenceService.getResidencesList();
 

  list: Residence[] = [];
  dataSource = new MatTableDataSource(this.list);
  readonly dialog = inject(MatDialog);
  
  constructor(private residenceService: ResidenceService){}

  
  ngOnInit(): void {
    this.residenceService.list$.subscribe(updatedList => {
      this.list = updatedList;
      this.dataSource = new MatTableDataSource(this.list);
    })
  }

  
  


  


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onClickHandler(address: string): void {
    this.adresse = address;
  }

  openDialog() {
    this.dialog.open(ModalComponent, {
      data: {
        message: this.adresse
      },
    });
  }

  

  onWishlist(residence: Residence): void {
    const exists = this.whishlist.map(item => item.id === residence.id).some(Boolean);

    if (!exists) {
      residence.favorite = true;
      this.isLike = residence.favorite;
      residence.likeBtn = "Dislike";
      this.residenceService.setWishlist(residence);
    } else{
      residence.favorite = false;
      this.isLike = residence.favorite;
      residence.likeBtn = "Like";
      this.residenceService.setWishlist(residence);
      
    }
  
    
  }
}
