import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from "@angular/core";
import { ButtonComponent } from "flowbite-angular/button";
import { ModalBodyComponent, ModalComponent } from "flowbite-angular/modal";
import { ProductsService } from "../../services/products.service";

@Component({
    selector: "delete-product-modal",
    templateUrl: "./delete-product-modal.html",
    imports: [ModalBodyComponent, ModalComponent, ButtonComponent],
})
export class DeleteProductModalComponent {
    @Input() product?: Product;
    @Output() deleteProductEvent = new EventEmitter<number>();
    @ViewChild("delete_product_modal_trigger_open")
    triggerOpen!: ElementRef<HTMLButtonElement>;
    @ViewChild("delete_product_modal_trigger_close")
    triggerClose!: ElementRef<HTMLButtonElement>;

    constructor(private productService: ProductsService) {}

    openModal() {
        this.triggerOpen.nativeElement.click();
    }

    closeModal() {
        this.triggerClose.nativeElement.click();
    }

    setProduct(product: Product) {
        this.product = product;
    }

    onDelete() {
        if (this.product) {
            this.productService.delete(this.product.id).subscribe(() => {
                this.deleteProductEvent.emit(this.product?.id);
                this.closeModal();
            });
        }
    }
}
