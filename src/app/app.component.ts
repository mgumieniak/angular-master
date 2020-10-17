import {AfterViewInit, Component, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <ng-container
        [ngTemplateOutlet]="tmpl">
      </ng-container>
    </div>
    <ng-template #tmpl>
      Todd Motto : England, UK
    </ng-template>
  `
})
export class AppComponent {

}
