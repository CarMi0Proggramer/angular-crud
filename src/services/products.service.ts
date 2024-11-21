import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

type CreateProductParams = {
    name: string;
    price: number;
    description: string;
    brand: string;
    category: string;
};

type UpdateProductParams = {
    name?: string;
    price?: number;
    description?: string;
    brand?: string;
    category?: string;
};

@Injectable({
    providedIn: "root",
})
export class ProductsService {
    private apiUrl = "https://angular-crud-backend.onrender.com/products";

    constructor(private http: HttpClient) {}

    getAll() {
        return this.http.get<Product[]>(this.apiUrl);
    }

    getById(id: number) {
        return this.http.get<Product>(`${this.apiUrl}/${id}`);
    }

    create(data: CreateProductParams) {
        return this.http.post<Product>(this.apiUrl, data);
    }

    update(id: number, data: UpdateProductParams) {
        return this.http.patch<Product>(`${this.apiUrl}/${id}`, data);
    }

    delete(id: number) {
        return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
    }
}
