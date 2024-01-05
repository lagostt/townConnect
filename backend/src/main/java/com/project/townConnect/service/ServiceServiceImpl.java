package com.project.townConnect.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project.townConnect.dto.ServiceDTO;
import com.project.townConnect.model.ServiceModel;
import com.project.townConnect.model.UserModel;
import com.project.townConnect.repository.ServiceRepository;
import com.project.townConnect.repository.UserRepository;

@Service
public class ServiceServiceImpl implements ServiceService {
	
	@Autowired
	private ServiceRepository sRepository;
	
	@Autowired
	private UserRepository uRepository;
	
	@Override
	public List<ServiceModel> getAllServices() {
		return sRepository.findAll();
	}
	
	@Override
	public List<ServiceModel> getConfirmedServices() {
		return sRepository.findByConfirm(true);
	}
	
	@Override
	public List<ServiceModel> getUserServices(Long id) {
		return sRepository.findByUserId(id);
	}
	
	@Override
	public ServiceModel getService(Long id) {
		Optional<ServiceModel> fservice = sRepository.findById(id);
		if(fservice.isPresent()) {
			return fservice.get();
		} else {
			return null;
		}
	}

	@Override
	public ServiceModel addService(ServiceDTO req) {
		Optional<UserModel> fuser = uRepository.findById(req.getUser_id());
		if(fuser.isPresent()) {
			UserModel user = fuser.get();
			ServiceModel newService = new ServiceModel(user, req);
			return sRepository.save(newService);
		} else {
			return null;
		}
	}

	@Override
	public ServiceModel updateService(Long id, ServiceDTO req) {
		ServiceModel service = getService(id);
		service.setTitle(req.getTitle());
		service.setCategory(req.getCategory());
		service.setPhone(req.getPhone());
		service.setDescription(req.getDescription());
		service.setGovernment(req.getGovernment());
		service.setDelegation(req.getDelegation());
		service.setStreet(req.getStreet());
		service.setMunicipalityNumber(req.getMunicipalityNumber());
		service.setFbLink(req.getFbLink());
		service.setYbLink(req.getYbLink());
		service.setInstaLink(req.getInstaLink());
		if(req.getServicePicture() != null)
			service.setServicePicture(req.getServicePicture());
		return sRepository.save(service);
	}

	@Override
	public void deleteService(Long id) {
		sRepository.deleteById(id);
	}

	@Override
	public ServiceModel validService(Long id) {
		ServiceModel service = getService(id);
		service.setConfirm(true);
		sRepository.save(service);
		return service;
	}
	
	@Override
	public boolean rateService(Long id, int rate) {
		try {
			ServiceModel service = getService(id);
			int actualRate = service.getRate();
			if(actualRate == -1) {
				service.setRate(rate);
			} else {
				service.setRate((actualRate + rate) / 2);
			}
			sRepository.save(service);
			return true;
		} catch(Exception e) {
			return false;
		}
	}

	@Override
	public boolean signalService(Long id) {
		try {
			ServiceModel service = getService(id);
			service.setSignal(service.getSignal() + 1);
			sRepository.save(service);
			return true;
		} catch(Exception e) {
			return false;
		}
		
	}

}