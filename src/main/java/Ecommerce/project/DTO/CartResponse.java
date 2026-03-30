package Ecommerce.project.DTO;


import java.util.List;

public record CartResponse(
        Long id,
        List<CartItemResponse> items,
        Double totalAmount,
        Integer quantity) {

}
