package Ecommerce.project.DTO;

import java.util.List;

public record CartListResponse(
    Long id,
    Long userId,
    String userEmail,
    List<CartItemResponse> items,
    Double totalPrice,
    Integer totalItems
) {}
