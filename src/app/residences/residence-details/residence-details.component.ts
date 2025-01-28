import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-residence-details',
  templateUrl: './residence-details.component.html',
  styleUrls: ['./residence-details.component.css']
})
export class ResidenceDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  residenceId: string = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.residenceId = params.get('id')!;
      console.log(this.residenceId);
    });
  }

}
