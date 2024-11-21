import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { ModalBodyComponent, ModalComponent } from "flowbite-angular/modal";

@Component({
    selector: "preview-product-modal",
    templateUrl: "./preview-product-modal.html",
    imports: [ModalComponent, ModalBodyComponent],
})
export class PreviewProductModalComponent {
    @ViewChild("preview_product_modal_trigger_open")
    triggerOpen!: ElementRef<HTMLButtonElement>;

    @ViewChild("preview_product_modal_trigger_close")
    triggerClose!: ElementRef<HTMLButtonElement>;

    @Input() product?: Product;

    setProduct(product: Product) {
        this.product = product;
    }

    openModal() {
        this.triggerOpen.nativeElement.click();
    }

    closeModal() {
        this.triggerClose.nativeElement.click();
    }
}
