import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule as NgCommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import {
    MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatIconModule,
    MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatRadioModule, MatTreeModule, MatAutocompleteModule, MatTableModule, MatSortModule,
    MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggle, MatSlideToggleModule, MatTooltipModule, MatFormFieldModule
} from '@angular/material';

import { OnlyFloatInputDirective, OnlyIntegerInputDirective, VisibilityHiddenDirective } from './directives';

import { ContentComponent } from '../components/content/content.component'
import { UnsavedChangesGuard } from './guards';
import { ButtonComponent } from './components/button/button.component';
import { FieldComponent } from './components/field/field.component';
import { RowComponent } from './components/grid/row/row.component';
import { ColumnComponent } from './components/grid/column/column.component';
import { MatFieldComponent } from './components/mat.field/mat.field.component';
import { SpinnerComponent } from './components/spinner/spinner.component'
import { EmptyRouterLinkDirective } from './directives/empty.router.link/empty.router.link.directive';
import { WeatherComponent } from './../components/weather/weather.component';

const COMMON_COMPONENTS = [
    ContentComponent,
    ButtonComponent,
    FieldComponent,
    RowComponent,
    ColumnComponent,
    FieldComponent,
    MatFieldComponent,
    SpinnerComponent,
    OnlyIntegerInputDirective,
    OnlyFloatInputDirective,
    VisibilityHiddenDirective,
    EmptyRouterLinkDirective,
    WeatherComponent
];

const THIRD_PARTY_MODULES = [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgCommonModule,
    RouterModule,
    BrowserAnimationsModule,

    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatSidenavModule,
    MatMenuModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTreeModule,
    MatTableModule,
    MatSortModule
];

@NgModule({
    imports: [
        ...THIRD_PARTY_MODULES
    ],
    declarations: [
        COMMON_COMPONENTS,
    ],
    exports: [
        ...COMMON_COMPONENTS,
        ...THIRD_PARTY_MODULES
    ],
    entryComponents: [
    ]
})

export class CommonModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: CommonModule,
            providers: [
                UnsavedChangesGuard
            ]
        };
    }
}