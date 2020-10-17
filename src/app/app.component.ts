import {AfterViewInit, Component, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <ng-container #entry></ng-container>
    </div>

    <ng-template #tmpl let-name let-location="location">
      {{ name }} : {{ location }}
    </ng-template>
  `
})
export class AppComponent implements AfterViewInit {

  @ViewChild('entry', {read: ViewContainerRef}) entry: ViewContainerRef;
  @ViewChild('tmpl') tmpl: TemplateRef<any>;


  ngAfterViewInit(): void {
    this.entry.createEmbeddedView(this.tmpl, {
      $implicit: 'Motto Todd',
      location: 'UK, England'
    });
  }
}
