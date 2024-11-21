import {
    Component,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    Output,
    ViewChild,
} from "@angular/core";
import { ModalBodyComponent, ModalComponent } from "flowbite-angular/modal";
import { ProductsService } from "../../services/products.service";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
    selector: "update-product-modal",
    templateUrl: "./update-product-modal.html",
    imports: [ModalComponent, ModalBodyComponent, ReactiveFormsModule],
})
export class UpdateProductModalComponent {
    constructor(private productService: ProductsService) {}

    @ViewChild("update_product_modal_trigger_open")
    triggerOpen!: ElementRef<HTMLButtonElement>;

    @ViewChild("update_product_modal_trigger_close")
    triggerClose!: ElementRef<HTMLButtonElement>;

    @Input() product?: Product;
    @Output() updateProductEvent = new EventEmitter<Product>();

    private formBuilder = inject(FormBuilder);
    updateProductForm = this.formBuilder.group({
        name: ["", Validators.required],
        category: ["", Validators.required],
        brand: ["", Validators.required],
        price: [0, Validators.min(1)],
        description: ["", Validators.required],
    });

    categories = ["TV/Monitors", "PC", "Gaming/Console", "Phones"];

    onSubmit() {
        if (this.updateProductForm.valid && this.product) {
            this.productService
                .update(
                    this.product.id,
                    this.updateProductForm.value as Product
                )
                .subscribe((updatedProduct) => {
                    this.updateProductEvent.emit(updatedProduct);
                    this.updateProductForm.reset();
                    this.closeModal();
                });
        }
    }

    openModal() {
        if (this.product) {
            this.updateProductForm.setValue({
                name: this.product?.name,
                price: this.product?.price,
                description: this.product.description,
                brand: this.product.brand,
                category: this.product.category,
            });
        }
        this.triggerOpen.nativeElement.click();
    }

    closeModal() {
        this.triggerClose.nativeElement.click();
    }

    setProduct(product: Product) {
        this.product = product;
    }
}
