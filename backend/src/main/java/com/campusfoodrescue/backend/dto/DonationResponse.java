package com.campusfoodrescue.backend.dto;

import com.campusfoodrescue.backend.entity.DonationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DonationResponse {
    private Long id;
    private String foodName;
    private String quantity;
    private String description;
    private String location;
    private LocalDateTime expiryTime;
    private DonationStatus status;
    private Long userId;
}
