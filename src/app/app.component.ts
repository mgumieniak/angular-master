import {AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, OnDestroy, ViewChild, ViewContainerRef} from '@angular/core';
import {AuthFormComponent} from './auth-form/auth-form.component';
import {User} from './auth-form/auth-form.interface';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <button (click)="destroyComponent()">
        Destroy
      </button>
      <button (click)="moveComponent()">
        Move
      </button>
      <div #entry></div>
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
    this.entry.createComponent(authFormFactory)
      .changeDetectorRef.detectChanges();    // The first component (LOGIN)

    this.compRef = this.entry.createComponent(authFormFactory, 0); // The second component (Create account)
    this.compRef.instance.title = 'Create account'; // change component variable (name to create account)
    this.compRef.instance.submitted.subscribe(this.loginUser);
    this.compRef.changeDetectorRef.detectChanges();
  }

  loginUser = (user: User): void => {
    console.log('Login', user);
  };

  destroyComponent = (): void => {
    if (this.compRef) {
      this.compRef.destroy();
    }
  };

  moveComponent = () => {
    this.entry.move(this.compRef.hostView, 1);
  };

  ngOnDestroy(): void {
    if (this.compRef) {
      this.compRef.destroy();
    }
  }
}
