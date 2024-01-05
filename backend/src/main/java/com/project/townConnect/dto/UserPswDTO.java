package com.project.townConnect.dto;

public class UserPswDTO {

	private String newPsw;
	private String actuelPsw;

	public UserPswDTO() {
	}

	public UserPswDTO(String newPsw, String actuelPsw) {
		this.newPsw = newPsw;
		this.actuelPsw = actuelPsw;
	}

	public String getNewPsw() {
		return newPsw;
	}

	public void setNewPsw(String newPsw) {
		this.newPsw = newPsw;
	}

	public String getActuelPsw() {
		return actuelPsw;
	}

	public void setActuelPsw(String actuelPsw) {
		this.actuelPsw = actuelPsw;
	}

	@Override
	public String toString() {
		return "UserPswDTO [newPsw=" + newPsw + ", actuelPsw=" + actuelPsw + "]";
	}

}
