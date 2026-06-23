package com.campusfoodrescue.backend.dto;

import com.campusfoodrescue.backend.entity.RequestStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestResponse {
    private Long id;
    private Long donationId;
    private Long receiverId;
    private RequestStatus status;
}
