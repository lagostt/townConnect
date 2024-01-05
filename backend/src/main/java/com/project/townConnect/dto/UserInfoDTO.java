package com.project.townConnect.dto;

public class UserInfoDTO {

	private String email;
	private String username;

	public UserInfoDTO() {
	}

	public UserInfoDTO(String email, String username) {
		this.email = email;
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	public String toString() {
		return "UserInfoDTO [email=" + email + ", username=" + username + "]";
	}

	
}
