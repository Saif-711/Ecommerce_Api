package Ecommerce.project.Controller;


import Ecommerce.project.DTO.CartItemRequest;
import Ecommerce.project.DTO.CartResponse;
import Ecommerce.project.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
