package Ecommerce.project.Service;

import Ecommerce.project.Model.Product;
import Ecommerce.project.Repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepo;

    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    public Product getProductById(int id) {
        return productRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Product not found with id " + id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Product createProduct(Product product) {
        return productRepo.save(product);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public Product updateProduct(int id, Product updatedProduct) {
        Product product = getProductById(id);

        product.setName(updatedProduct.getName());
        product.setDescription(updatedProduct.getDescription());
        product.setPrice(updatedProduct.getPrice());
        product.setStock(updatedProduct.getStock());

        return productRepo.save(product);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteProduct(int id) {
        getProductById(id);
        productRepo.deleteById(id);
    }
}
