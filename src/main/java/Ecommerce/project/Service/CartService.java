package Ecommerce.project.Service;

import Ecommerce.project.DTO.CartItemRequest;
import Ecommerce.project.DTO.CartItemResponse;
import Ecommerce.project.DTO.CartResponse;
import Ecommerce.project.Model.Cart;
import Ecommerce.project.Model.CartItem;
import Ecommerce.project.Model.Product;
import Ecommerce.project.Repo.CartRepo;
import Ecommerce.project.Repo.ProductRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private CartRepo cartRepo;
    @Autowired
    private ProductRepo productRepo;

    @Transactional
    public CartResponse addItemToCart(CartItemRequest request) {
        if (request.getQuantity() == null || request.getQuantity() <= 0) {
            throw new RuntimeException("Quantity must be greater than 0");
        }

        Cart cart = cartRepo.findById(request.getCartId())
                .orElseThrow(()-> new RuntimeException("Cart not found"));

        if (cart.getItems() == null) {
            cart.setItems(new ArrayList<>());
        }

        Product productModel = productRepo.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (request.getQuantity() > productModel.getStock()) {
            throw new RuntimeException("Requested quantity exceeds available stock");
        }

        Optional<CartItem> existingItemOpt = cart.getItems().stream()
                .filter(item->item.getProducts().getId().equals(productModel.getId()))
                .findFirst();

        if (existingItemOpt.isPresent()) {
            CartItem existingItem = existingItemOpt.get();
            int newQuantity = existingItem.getQuantity() + request.getQuantity();
            if (newQuantity > productModel.getStock()) {
                throw new RuntimeException("Requested quantity exceeds available stock");
            }
            existingItem.setQuantity(newQuantity);
        } else {
            CartItem newItem = new CartItem();
            newItem.setProducts(productModel);
            newItem.setQuantity(request.getQuantity());
            newItem.setCart(cart);
            cart.getItems().add(newItem);
        }

        List<CartItemResponse> itemResponses = cart.getItems().stream().map(item -> {
            return new CartItemResponse(
                    item.getId(),
                    item.getProducts().getName(),
                    item.getProducts().getDescription(),
                    item.getProducts().getImage(),
                    item.getProducts().getPrice(),
                    item.getQuantity()
            );
        }).toList();

        double totalAmount = cart.getItems().stream()
                .mapToDouble(item -> item.getProducts().getPrice() * item.getQuantity())
                .sum();
        int totalQuantity = cart.getItems().stream()
                .mapToInt(CartItem::getQuantity)
                .sum();

        cart.setTotalPrice(totalAmount);
        cart.setTotalItems(totalQuantity);
        Cart savedCart = cartRepo.save(cart);

        return new CartResponse(
                savedCart.getId(),
                itemResponses,
                totalAmount,
                totalQuantity
        );
    }
}
