import { Component } from '@angular/core';
import {MatAnchor} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {SearchFormComponent} from "../../shared/form/search-form/search-form.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatAnchor,
    RouterLink,
    SearchFormComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
