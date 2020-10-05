import {AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, OnDestroy, ViewChild, ViewContainerRef} from '@angular/core';
import {AuthFormComponent} from './auth-form/auth-form.component';
import {User} from './auth-form/auth-form.interface';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <ng-container #entry></ng-container>
    </div>
  `
})
export class AppComponent implements AfterViewInit, OnDestroy {

  @ViewChild('entry', {read: ViewContainerRef}) entry: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver
  ) {
  }

  private compRef: ComponentRef<AuthFormComponent>;

  ngAfterViewInit(): void {
    const authFormFactory = this.resolver.resolveComponentFactory(AuthFormComponent);
    this.compRef = this.entry.createComponent(authFormFactory);
    this.compRef.instance.title = 'Create account';
    this.compRef.instance.submitted.subscribe(this.loginUser);
    this.compRef.changeDetectorRef.detectChanges();
  }

  loginUser = (user: User): void => {
    console.log('Login', user);
  }

  ngOnDestroy(): void {
    if (this.compRef) {
      this.compRef.destroy();
    }
  }
}
