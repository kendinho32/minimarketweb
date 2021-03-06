import { Component, OnInit } from '@angular/core';
import { SliderService } from '../services/slider.service';
import { environment } from '../../environments/environment';
import { Slider } from '../models/slider';

@Component({
  selector: 'app-getsliders',
  templateUrl: './getsliders.component.html',
  styleUrls: ['./getsliders.component.css'],
  providers: [SliderService]
})
export class GetslidersComponent implements OnInit {

  public response: any;
  public sliders: Slider[];
  public url;

  constructor(private sliderService: SliderService) {
      this.url = environment.apiBase;
  }

  ngOnInit() {
      this.getAllSlider();
  }

  getAllSlider() {
      this.sliderService.getSliders().subscribe(
            response => {
               this.response = response;
               console.log(this.response);
               if (this.response.success) {
                this.sliders = this.response.data;
                console.log(this.sliders);
               }
            },
            error => {
                console.log(error);
            }
        );
  }

}
