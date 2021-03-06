import { Component, OnInit, ViewChild } from '@angular/core';
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  logoImagePath: any = 'assets/logo.png';
  searchIcon = faSearch;
  searchTerm = '';
  notValid = false;
  @ViewChild('f', {static: false}) searchForm: NgForm;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {


        const paramsSearchTerm = params['search-term'];
        if (paramsSearchTerm) {
          localStorage.setItem('searchTerm', paramsSearchTerm);
        }

        this.searchTerm = localStorage.getItem('searchTerm');
      });
  }

  submitSearchTerm() {
    this.notValid = false;
    const currentSearchTerm = this.searchForm.value.searchTerm;
    this.checkBlankInput(currentSearchTerm);
    console.log('this.searchForm: ', this.searchForm);
    if (!this.notValid) {
      // console.log('this is searchForm: ', this.searchForm);
      localStorage.setItem('searchTerm', currentSearchTerm);
      // console.log('searchTerm: ', searchTerm);
      // console.log('route: ', this.route);

      this.router.navigate(['/search-result', currentSearchTerm]);

    } else {
      this.searchForm.form.patchValue({
        searchTerm: currentSearchTerm
      });
      // alert('search term cannot be empty!');
    }
  }

  checkBlankInput(searchTerm: string) {
    if (searchTerm.trim().length === 0) {
      this.notValid = true;
    }
  }
}
