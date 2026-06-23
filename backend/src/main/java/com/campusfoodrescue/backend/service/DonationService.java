package com.campusfoodrescue.backend.service;

import com.campusfoodrescue.backend.dto.DonationRequest;
import com.campusfoodrescue.backend.dto.DonationResponse;
import com.campusfoodrescue.backend.entity.Donation;
import com.campusfoodrescue.backend.entity.DonationStatus;
import com.campusfoodrescue.backend.repository.DonationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DonationService {

    private final DonationRepository donationRepository;

    public DonationResponse createDonation(DonationRequest request) {
        Donation donation = new Donation();
        donation.setFoodName(request.getFoodName());
        donation.setQuantity(request.getQuantity());
        donation.setDescription(request.getDescription());
        donation.setLocation(request.getLocation());
        donation.setExpiryTime(request.getExpiryTime());
        donation.setUserId(request.getUserId());
        donation.setStatus(DonationStatus.AVAILABLE);

        Donation saved = donationRepository.save(donation);
        return toResponse(saved);
    }

    public DonationResponse updateDonation(Long id, DonationRequest request) {
        Donation donation = donationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Donation not found"));

        donation.setFoodName(request.getFoodName());
        donation.setQuantity(request.getQuantity());
        donation.setDescription(request.getDescription());
        donation.setLocation(request.getLocation());
        donation.setExpiryTime(request.getExpiryTime());

        Donation saved = donationRepository.save(donation);
        return toResponse(saved);
    }

    public void deleteDonation(Long id) {
        if (!donationRepository.existsById(id)) {
            throw new IllegalArgumentException("Donation not found");
        }
        donationRepository.deleteById(id);
    }

    public List<DonationResponse> getDonationsByUser(Long userId) {
        return donationRepository.findByUserId(userId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public List<DonationResponse> getAvailableDonations() {
        return donationRepository.findByStatus(DonationStatus.AVAILABLE)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public List<DonationResponse> getAllDonations() {
        return donationRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public DonationResponse updateStatus(Long id, DonationStatus status) {
        Donation donation = donationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Donation not found"));
        donation.setStatus(status);
        return toResponse(donationRepository.save(donation));
    }

    private DonationResponse toResponse(Donation donation) {
        return new DonationResponse(
                donation.getId(),
                donation.getFoodName(),
                donation.getQuantity(),
                donation.getDescription(),
                donation.getLocation(),
                donation.getExpiryTime(),
                donation.getStatus(),
                donation.getUserId()
        );
    }
}
