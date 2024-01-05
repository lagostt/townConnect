package com.project.townConnect.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import com.project.townConnect.dto.ServiceDTO;

@Entity
@Table(name = "services")
public class ServiceModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "userId")
	private UserModel user;

	@Column(name = "title")
	private String title;

	@Column(name = "category")
	private String category;

	@Column(name = "phone")
	private String phone;

	@Column(name = "description")
	private String description;

	@Column(name = "government")
	private String government;

	@Column(name = "delegation")
	private String delegation;

	@Column(name = "street")
	private String street;

	@Column(name = "municipalityNumber")
	private int municipalityNumber;

	@Column(name = "servicePicture")
	private String servicePicture;

	@Column(name = "fbLink")
	private String fbLink;

	@Column(name = "ybLink")
	private String ybLink;

	@Column(name = "instaLink")
	private String instaLink;

	@Column(name = "confirm")
	private boolean confirm = false;
	
	@Column(name = "total_signal")
	private int signal = 0;
	
	@Column(name = "rate_avg")
	private int rate = -1;

	@CreationTimestamp
	@Column(name = "createdAt", nullable = false, updatable = false)
	private Date createdAt;

	@UpdateTimestamp
	@Column(name = "updatedAt")
	private Date updatedAt;

	public ServiceModel() {
	}

	public ServiceModel(UserModel user, ServiceDTO req) {
		this.user = user;
		this.title = req.getTitle();
		this.category = req.getCategory();
		this.phone = req.getPhone();
		this.description = req.getDescription();
		this.government = req.getGovernment();
		this.delegation = req.getDelegation();
		this.street = req.getStreet();
		this.municipalityNumber = req.getMunicipalityNumber();
		this.servicePicture = req.getServicePicture();
		this.fbLink = req.getFbLink();
		this.ybLink = req.getYbLink();
		this.instaLink = req.getInstaLink();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public UserModel getUser() {
		return user;
	}

	public void setUser(UserModel user) {
		this.user = user;
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

	public int getSignal() {
		return signal;
	}

	public void setSignal(int signal) {
		this.signal = signal;
	}

	public int getRate() {
		return rate;
	}

	public void setRate(int rate) {
		this.rate = rate;
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
		return "ServiceModel [id=" + id + ", user=" + user + ", title=" + title + ", category=" + category + ", phone="
				+ phone + ", description=" + description + ", government=" + government + ", delegation=" + delegation
				+ ", street=" + street + ", municipalityNumber=" + municipalityNumber + ", servicePicture="
				+ servicePicture + ", fbLink=" + fbLink + ", ybLink=" + ybLink + ", instaLink=" + instaLink
				+ ", confirm=" + confirm + ", signal=" + signal + ", rate=" + rate + ", createdAt=" + createdAt
				+ ", updatedAt=" + updatedAt + "]";
	}
}
