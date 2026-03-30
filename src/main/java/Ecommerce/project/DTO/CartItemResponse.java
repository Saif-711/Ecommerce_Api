package Ecommerce.project.DTO;


public record CartItemResponse(
        Long id,
        String name,
        String description,
        String image,
        Double price,
        Integer quantity) {
}