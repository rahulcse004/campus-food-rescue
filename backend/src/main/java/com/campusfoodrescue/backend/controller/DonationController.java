package com.campusfoodrescue.backend.controller;

import com.campusfoodrescue.backend.dto.DonationRequest;
import com.campusfoodrescue.backend.dto.DonationResponse;
import com.campusfoodrescue.backend.service.DonationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donations")
@RequiredArgsConstructor
public class DonationController {

    private final DonationService donationService;

    // Donor: create a donation
    @PostMapping
    public ResponseEntity<DonationResponse> createDonation(@Valid @RequestBody DonationRequest request) {
        return ResponseEntity.ok(donationService.createDonation(request));
    }

    // Donor: edit a donation
    @PutMapping("/{id}")
    public ResponseEntity<DonationResponse> updateDonation(@PathVariable Long id,
                                                             @Valid @RequestBody DonationRequest request) {
        return ResponseEntity.ok(donationService.updateDonation(id, request));
    }

    // Donor or Admin: delete a donation
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDonation(@PathVariable Long id) {
        donationService.deleteDonation(id);
        return ResponseEntity.noContent().build();
    }

    // Donor: view own donations
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<DonationResponse>> getDonationsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(donationService.getDonationsByUser(userId));
    }

    // Receiver: view available donations
    @GetMapping("/available")
    public ResponseEntity<List<DonationResponse>> getAvailableDonations() {
        return ResponseEntity.ok(donationService.getAvailableDonations());
    }

    // Admin: view all donations
    @GetMapping
    public ResponseEntity<List<DonationResponse>> getAllDonations() {
        return ResponseEntity.ok(donationService.getAllDonations());
    }
}
