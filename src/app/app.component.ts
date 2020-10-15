import {AfterViewInit, Component, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <ng-container #entry></ng-container>
      <ng-template #tmpl>
        Todd Motto : England, UK
      </ng-template>
    </div>
  `
})
export class AppComponent implements AfterViewInit {

  @ViewChild('entry', {read: ViewContainerRef}) entry: ViewContainerRef;
  @ViewChild('tmpl') tmpl: TemplateRef<any>;


  ngAfterViewInit(): void {
    const view = this.tmpl.createEmbeddedView(null);
    this.entry.insert(view);
  }

}
