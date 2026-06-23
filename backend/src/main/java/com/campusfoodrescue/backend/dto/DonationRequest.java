package com.campusfoodrescue.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DonationRequest {

    @NotBlank(message = "Food name is required")
    private String foodName;

    @NotBlank(message = "Quantity is required")
    private String quantity;

    private String description;

    @NotBlank(message = "Pickup location is required")
    private String location;

    @NotNull(message = "Expiry time is required")
    private LocalDateTime expiryTime;

    // userId of the donor creating this donation
    @NotNull(message = "userId is required")
    private Long userId;
}
