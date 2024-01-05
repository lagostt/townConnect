package com.project.townConnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.project.townConnect.model.ServiceModel;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceModel, Long> {
	public List<ServiceModel> findByUserId(Long id);
	public List<ServiceModel> findByConfirm(boolean b);
}
