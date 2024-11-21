import { Component, OnInit } from "@angular/core";
import { ButtonComponent } from "flowbite-angular/button";
import {
    DropdownComponent,
    DropdownItemComponent,
} from "flowbite-angular/dropdown";
import { ProductsService } from "../../services/products.service";
import { AddProductModalComponent } from "../add-product-modal/add-product-modal";
import { UpdateProductModalComponent } from "../update-product-modal/update-product-modal";
import { PreviewProductModalComponent } from "../preview-product-modal/preview-product-modal";
import { DeleteProductModalComponent } from "../delete-product-modal/delete-product-modal";

@Component({
    selector: "crud-layout",
    templateUrl: "./crud-layout.html",
    imports: [
        ButtonComponent,
        DropdownComponent,
        DropdownItemComponent,
        AddProductModalComponent,
        UpdateProductModalComponent,
        PreviewProductModalComponent,
        DeleteProductModalComponent
    ],
})
export class CrudLayout implements OnInit {
    products: Product[] = [];

    constructor(private productsService: ProductsService) {}

    ngOnInit() {
        this.productsService
            .getAll()
            .subscribe((data) => (this.products = data));
    }

    onProductAdded(product: Product) {
        this.products.push(product);
    }

    onProductDeleted(id: number) {
        this.products = this.products.filter((product) => product.id !== id);
    }
    onProductUpdated(updatedProduct: Product) {
        this.products = this.products.map((product) => {
            if (product.id == updatedProduct.id) {
                return updatedProduct;
            }

            return product;
        });
    }
}
