package com.campusfoodrescue.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RequestCreateRequest {

    @NotNull(message = "donationId is required")
    private Long donationId;

    @NotNull(message = "receiverId is required")
    private Long receiverId;
}
