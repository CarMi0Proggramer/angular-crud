import {
    Component,
    ElementRef,
    EventEmitter,
    inject,
    Output,
    ViewChild,
} from "@angular/core";
import { ButtonComponent } from "flowbite-angular/button";
import { ModalBodyComponent, ModalComponent } from "flowbite-angular/modal";
import { ProductsService } from "../../services/products.service";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
    selector: "add-product-modal",
    templateUrl: "./add-product-modal.html",
    imports: [ModalComponent, ModalBodyComponent, ReactiveFormsModule],
})
export class AddProductModalComponent {
    private formBuilder = inject(FormBuilder);
    addProductForm = this.formBuilder.group({
        name: ["", Validators.required],
        category: ["", Validators.required],
        brand: ["", Validators.required],
        price: [0, Validators.min(1)],
        description: ["", Validators.required],
    });

    @Output() addProductEvent = new EventEmitter<Product>();
    @ViewChild("add_product_modal_trigger_open")
    triggerOpen!: ElementRef<HTMLButtonElement>;
    @ViewChild("add_product_modal_trigger_close")
    triggerClose!: ElementRef<HTMLButtonElement>;

    constructor(private productService: ProductsService) {}

    onSubmit() {
        if (this.addProductForm.valid) {
            this.productService
                .create(this.addProductForm.value as Product)
                .subscribe((newProduct) => {
                    this.addProductEvent.emit(newProduct);
                    this.addProductForm.reset();
                    this.closeModal();
                });
        }
    }

    openModal() {
        this.triggerOpen.nativeElement.click();
    }

    closeModal() {
        this.triggerClose.nativeElement.click();
    }
}
