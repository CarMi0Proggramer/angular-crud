import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CrudLayout } from "./crud-layout/crud-layout";

@Component({
    selector: "app-root",
    imports: [RouterOutlet, CrudLayout],
    templateUrl: "./app.component.html",
})
export class AppComponent {
    valor = "adsas";
}
