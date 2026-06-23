package com.campusfoodrescue.backend.repository;

import com.campusfoodrescue.backend.entity.Donation;
import com.campusfoodrescue.backend.entity.DonationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DonationRepository extends JpaRepository<Donation, Long> {

    List<Donation> findByUserId(Long userId);

    List<Donation> findByStatus(DonationStatus status);
}
