package com.project.townConnect.service;

import java.util.List;

import com.project.townConnect.dto.ServiceDTO;
import com.project.townConnect.model.ServiceModel;

public interface ServiceService {
	public List<ServiceModel> getAllServices();
	public List<ServiceModel> getUserServices(Long id);
	public List<ServiceModel> getConfirmedServices();
	public ServiceModel getService(Long id);
	public ServiceModel addService(ServiceDTO req);
	public ServiceModel updateService(Long id, ServiceDTO req);
	public void deleteService(Long id);
	public ServiceModel validService(Long id);
	public boolean rateService(Long id, int rate);
	public boolean signalService(Long id);
}
