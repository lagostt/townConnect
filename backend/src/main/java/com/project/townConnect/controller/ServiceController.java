package com.project.townConnect.controller;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.townConnect.dto.ServiceDTO;
import com.project.townConnect.model.ServiceModel;
import com.project.townConnect.service.ServiceService;

@RestController
public class ServiceController {

	@Autowired
	private ServiceService sService;

	@GetMapping("/allServices")
	public List<ServiceModel> getAllServices() {
		return sService.getAllServices();
	}

	@GetMapping("/services")
	public List<ServiceModel> getConfirmedServices() {
		return sService.getConfirmedServices();
	}

	@GetMapping("service/{id}")
	public ServiceModel getService(@PathVariable Long id) {
		return sService.getService(id);
	}

	@GetMapping("/user/services/{id}")
	public List<ServiceModel> getUserServices(@PathVariable Long id) {
		return sService.getUserServices(id);
	}

	private static String getParentDirectory(String directory) {
		File currentDir = new File(directory);
		return currentDir.getParent();
	}

	@PostMapping("/service")
	public ResponseEntity<String> addService(
			@RequestParam(value = "serviceImage", required = false) MultipartFile serviceImage,
			@RequestParam("userId") Long userId, @RequestParam("title") String title,
			@RequestParam("category") String category, @RequestParam("phone") String phone,
			@RequestParam("description") String description, @RequestParam("government") String government,
			@RequestParam("delegation") String delegation, @RequestParam("street") String street,
			@RequestParam("municipalityNumber") int municipalityNumber,
			@RequestParam(value = "fbLink", required = false) String fbLink,
			@RequestParam(value = "ybLink", required = false) String ybLink,
			@RequestParam(value = "instaLink", required = false) String instaLink) {

		try {

			String uploadDir = getParentDirectory(System.getProperty("user.dir"))
					+ "/frontend/public/images/servicesImage";
			String fileName = userId + "_" + serviceImage.getOriginalFilename();
			String filePath = uploadDir + "/" + fileName;
			// Save the file to the specified directory
			serviceImage.transferTo(new File(filePath));

			// Create a Service entity and populate its fields
			ServiceDTO service = new ServiceDTO();
			service.setUser_id(userId);
			service.setTitle(title);
			service.setCategory(category);
			service.setPhone(phone);
			service.setDescription(description);
			service.setGovernment(government);
			service.setDelegation(delegation);
			service.setStreet(street);
			service.setMunicipalityNumber(municipalityNumber);
			service.setFbLink(fbLink);
			service.setYbLink(ybLink);
			service.setInstaLink(instaLink);
			service.setServicePicture(fileName);

			sService.addService(service);

			return ResponseEntity.ok("Data received and saved successfully!");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
		}
	}

	@PutMapping("/service/{id}")
	public ResponseEntity<String> editService(@PathVariable Long id,
			@RequestParam(value = "serviceImage", required = false) MultipartFile serviceImage,
			@RequestParam("title") String title, @RequestParam("category") String category,
			@RequestParam("phone") String phone,
			@RequestParam(value = "description", required = false) String description,
			@RequestParam("government") String government, @RequestParam("delegation") String delegation,
			@RequestParam("street") String street, @RequestParam("municipalityNumber") int municipalityNumber,
			@RequestParam(value = "fbLink", required = false) String fbLink,
			@RequestParam(value = "ybLink", required = false) String ybLink,
			@RequestParam(value = "instaLink", required = false) String instaLink) {

		try {
			ServiceDTO serviceDTO = new ServiceDTO();
			if (serviceImage != null) {
				String uploadDir = getParentDirectory(System.getProperty("user.dir"))
						+ "/frontend/public/images/servicesImage";
				String fileName = id + "_" + serviceImage.getOriginalFilename();
				String filePath = uploadDir + "/" + fileName;

				ServiceModel service = sService.getService(id);
				if (!service.getServicePicture().equals("") && service.getServicePicture() != null) {
					String existingFilePath = uploadDir + "/" + service.getServicePicture();
					File existingFile = new File(existingFilePath);
					existingFile.delete();
				}
				// Save the file to the specified directory
				serviceImage.transferTo(new File(filePath));
				serviceDTO.setServicePicture(fileName);
			}
			// Create a Service entity and populate its fields
			serviceDTO.setTitle(title);
			serviceDTO.setCategory(category);
			serviceDTO.setPhone(phone);
			serviceDTO.setDescription(description);
			serviceDTO.setGovernment(government);
			serviceDTO.setDelegation(delegation);
			serviceDTO.setStreet(street);
			serviceDTO.setMunicipalityNumber(municipalityNumber);
			serviceDTO.setFbLink(fbLink);
			serviceDTO.setYbLink(ybLink);
			serviceDTO.setInstaLink(instaLink);

			sService.updateService(id, serviceDTO);

			return ResponseEntity.ok("Data received and saved successfully!");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
		}
	}

	@DeleteMapping("/service/{id}")
	public void deleteService(@PathVariable Long id) {
		sService.deleteService(id);
	}

	@PutMapping("/service/valid/{id}")
	public ServiceModel validService(@PathVariable Long id) {
		return sService.validService(id);
	}

	@PutMapping("/service/rate/{id}/{rate}")
	public boolean rateService(@PathVariable Long id, @PathVariable int rate) {
		return sService.rateService(id, rate);
	}

	@PutMapping("/service/signal/{id}")
	public boolean signalService(@PathVariable Long id) {
		return sService.signalService(id);
	}
}
