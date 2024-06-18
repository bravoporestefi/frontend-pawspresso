import { Component } from '@angular/core';
import { CatsService } from '../../servicios/cats.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cat',
  standalone: true,
  providers: [CatsService],
  imports: [HttpClientModule, CommonModule],
  templateUrl: './cat.component.html',
  styleUrl: './cat.component.scss'
})
export class CatComponent {
  cats: any = [];
  constructor(private catsService: CatsService) {
    this.catsService.getCats().subscribe((cats) => {
      this.cats = cats;
    })
  }
}
