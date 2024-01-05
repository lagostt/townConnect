package com.project.townConnect.service;

import java.util.List;

import com.project.townConnect.dto.*;
import com.project.townConnect.model.UserModel;

public interface UserService {
	public UserModel register(RegisterDTO reg);
	public UserModel login(LoginDTO log);
	public TokenDTO login2(LoginDTO log);
	public List<UserModel> getAllUsers();
	public UserModel getUserById(Long id);
	public void deleteUser(Long id);
	public boolean updateUserInfo(Long userId, UserInfoDTO req);
	public boolean updateUserPsw(Long userId, UserPswDTO req);
	boolean updateProfilePicture(Long userId, String fileName);
}
