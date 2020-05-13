import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RepoInfoComponent } from './detail-content/repo-info/repo-info.component';
import { OwnerInfoComponent } from './detail-content/owner-info/owner-info.component';
import { TrendingInfoComponent } from './detail-content/trending-info/trending-info.component';
import { SimilarReposComponent } from './detail-content/similar-repos/similar-repos.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailContentComponent } from './detail-content/detail-content.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RepoFilterComponent } from './search-result/repo-filter/repo-filter.component';
import { PipeModule } from './shared/pipes/pipe.module';
import { FooterComponent } from './footer/footer.component';
import { ShareModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    SearchResultComponent,
    HomeComponent,
    RepoInfoComponent,
    OwnerInfoComponent,
    TrendingInfoComponent,
    SimilarReposComponent,
    SearchBarComponent,
    DetailContentComponent,
    PageNotFoundComponent,
    RepoFilterComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    HttpClientModule,
    ShareModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
