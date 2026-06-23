package com.campusfoodrescue.backend.repository;

import com.campusfoodrescue.backend.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long> {

    List<Request> findByReceiverId(Long receiverId);

    List<Request> findByDonationId(Long donationId);
}
