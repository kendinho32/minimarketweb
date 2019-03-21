import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { environment } from '../../environments/environment';
import { Slider } from '../models/slider';

@Component({
  selector: 'app-createslider',
  templateUrl: './createslider.component.html',
  styleUrls: ['./createslider.component.css']
})
export class CreatesliderComponent implements OnInit {

  public sliderForm: FormGroup;
  public slider: Slider;
  public url;

  constructor(public fb: FormBuilder) {
      this.sliderForm = this.fb.group({
        title: ['', Validators.compose([Validators.required])],
        description: ['', Validators.compose([Validators.required])],
        status: ['', Validators.compose([Validators.required])]
      });
      this.url = environment.apiBase;
  }

  ngOnInit() {
  }

  onSubmit() {
  }

}
