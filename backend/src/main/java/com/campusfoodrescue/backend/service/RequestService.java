package com.campusfoodrescue.backend.service;

import com.campusfoodrescue.backend.dto.RequestCreateRequest;
import com.campusfoodrescue.backend.dto.RequestResponse;
import com.campusfoodrescue.backend.entity.Donation;
import com.campusfoodrescue.backend.entity.DonationStatus;
import com.campusfoodrescue.backend.entity.Request;
import com.campusfoodrescue.backend.entity.RequestStatus;
import com.campusfoodrescue.backend.repository.DonationRepository;
import com.campusfoodrescue.backend.repository.RequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RequestService {

    private final RequestRepository requestRepository;
    private final DonationRepository donationRepository;

    public RequestResponse createRequest(RequestCreateRequest dto) {
        Donation donation = donationRepository.findById(dto.getDonationId())
                .orElseThrow(() -> new IllegalArgumentException("Donation not found"));

        if (donation.getStatus() != DonationStatus.AVAILABLE) {
            throw new IllegalArgumentException("Donation is not available for pickup");
        }

        Request request = new Request();
        request.setDonationId(dto.getDonationId());
        request.setReceiverId(dto.getReceiverId());
        request.setStatus(RequestStatus.PENDING);
        Request saved = requestRepository.save(request);

        // Mark donation as requested so other receivers see it's no longer free
        donation.setStatus(DonationStatus.REQUESTED);
        donationRepository.save(donation);

        return toResponse(saved);
    }

    public List<RequestResponse> getRequestsByReceiver(Long receiverId) {
        return requestRepository.findByReceiverId(receiverId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public List<RequestResponse> getAllRequests() {
        return requestRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private RequestResponse toResponse(Request request) {
        return new RequestResponse(
                request.getId(),
                request.getDonationId(),
                request.getReceiverId(),
                request.getStatus()
        );
    }
}
