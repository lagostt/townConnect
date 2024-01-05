package com.project.townConnect.dto;

import java.util.Date;

public class ServiceDTO {

	private Long user_id;
	private String title;
	private String category;
	private String phone;
	private String description;
	private String government;
	private String delegation;
	private String street;
	private int municipalityNumber;
	private String servicePicture;
	private String fbLink;
	private String ybLink;
	private String instaLink;
	private boolean confirm;
	private Date createdAt;
	private Date updatedAt;

	public ServiceDTO(Long user_id,String title, String category, String phone, String description, String government,
			String delegation, String street, int municipalityNumber, String servicePicture, String fbLink,
			String ybLink, String instaLink, boolean confirm, Date createdAt, Date updatedAt) {
		this.user_id = user_id;
		this.title = title;
		this.category = category;
		this.phone = phone;
		this.description = description;
		this.government = government;
		this.delegation = delegation;
		this.street = street;
		this.municipalityNumber = municipalityNumber;
		this.servicePicture = servicePicture;
		this.fbLink = fbLink;
		this.ybLink = ybLink;
		this.instaLink = instaLink;
		this.confirm = confirm;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public ServiceDTO() {
	}

	public Long getUser_id() {
		return user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getGovernment() {
		return government;
	}

	public void setGovernment(String government) {
		this.government = government;
	}

	public String getDelegation() {
		return delegation;
	}

	public void setDelegation(String delegation) {
		this.delegation = delegation;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public int getMunicipalityNumber() {
		return municipalityNumber;
	}

	public void setMunicipalityNumber(int municipalityNumber) {
		this.municipalityNumber = municipalityNumber;
	}

	public String getServicePicture() {
		return servicePicture;
	}

	public void setServicePicture(String servicePicture) {
		this.servicePicture = servicePicture;
	}

	public String getFbLink() {
		return fbLink;
	}

	public void setFbLink(String fbLink) {
		this.fbLink = fbLink;
	}

	public String getYbLink() {
		return ybLink;
	}

	public void setYbLink(String ybLink) {
		this.ybLink = ybLink;
	}

	public String getInstaLink() {
		return instaLink;
	}

	public void setInstaLink(String instaLink) {
		this.instaLink = instaLink;
	}

	public boolean isConfirm() {
		return confirm;
	}

	public void setConfirm(boolean confirm) {
		this.confirm = confirm;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	@Override
	public String toString() {
		return "ServiceDTO [title=" + title + ", category=" + category + ", phone=" + phone + ", description="
				+ description + ", goverment=" + government + ", delegation=" + delegation + ", street=" + street
				+ ", municiapalityNumber=" + municipalityNumber + ", servicePicture=" + servicePicture + ", fbLink="
				+ fbLink + ", ybLink=" + ybLink + ", instaLink=" + instaLink + ", confirm=" + confirm + ", createdAt="
				+ createdAt + ", updatedAt=" + updatedAt + "]";
	}

}
