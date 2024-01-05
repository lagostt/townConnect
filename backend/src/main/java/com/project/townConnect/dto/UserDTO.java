package com.project.townConnect.dto;

public class UserDTO {

	private String username;

	private String email;

	private String password;

	private String profilePicture;

	public UserDTO() {
	}

	public UserDTO(String username, String email, String password, String profilePicture) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.profilePicture = profilePicture;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getProfilePicture() {
		return profilePicture;
	}

	public void setProfilePicture(String profilePicture) {
		this.profilePicture = profilePicture;
	}

	@Override
	public String toString() {
		return "UserDTO [username=" + username + ", email=" + email + ", password=" + password + ", profilePicture="
				+ profilePicture + "]";
	}

}
