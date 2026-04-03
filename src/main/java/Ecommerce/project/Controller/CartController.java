package Ecommerce.project.Controller;

import Ecommerce.project.DTO.CartItemRequest;
import Ecommerce.project.DTO.CartResponse;
import Ecommerce.project.DTO.CartListResponse;
import Ecommerce.project.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @PostMapping("/items")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<CartResponse> addItem(@RequestBody CartItemRequest request) {
        return new ResponseEntity<>(cartService.addItemToCart(request), HttpStatus.OK);
    }
    
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<java.util.List<CartListResponse>> getAllCarts() {
        try {
            java.util.List<CartListResponse> carts = cartService.findAllCarts();
            return new ResponseEntity<>(carts, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    @GetMapping("/{cartId}")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<CartListResponse> getCartById(@PathVariable Long cartId) {
        try {
            CartListResponse cart = cartService.findCartById(cartId);
            return new ResponseEntity<>(cart, HttpStatus.OK);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
