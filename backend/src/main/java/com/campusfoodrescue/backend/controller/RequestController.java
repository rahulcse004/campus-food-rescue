package com.campusfoodrescue.backend.controller;

import com.campusfoodrescue.backend.dto.RequestCreateRequest;
import com.campusfoodrescue.backend.dto.RequestResponse;
import com.campusfoodrescue.backend.service.RequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@RequiredArgsConstructor
public class RequestController {

    private final RequestService requestService;

    // Receiver: request pickup of a donation
    @PostMapping
    public ResponseEntity<RequestResponse> createRequest(@Valid @RequestBody RequestCreateRequest request) {
        return ResponseEntity.ok(requestService.createRequest(request));
    }

    // Receiver: view own requests
    @GetMapping("/receiver/{receiverId}")
    public ResponseEntity<List<RequestResponse>> getRequestsByReceiver(@PathVariable Long receiverId) {
        return ResponseEntity.ok(requestService.getRequestsByReceiver(receiverId));
    }

    // Admin: view all requests
    @GetMapping
    public ResponseEntity<List<RequestResponse>> getAllRequests() {
        return ResponseEntity.ok(requestService.getAllRequests());
    }
}
