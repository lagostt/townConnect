package com.project.townConnect.service;

import java.util.List;
import java.util.Optional;

import com.project.townConnect.dto.*;
import com.project.townConnect.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.townConnect.model.UserModel;
import com.project.townConnect.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository uRepository;
	@Autowired
	JwtUtils jwtUtils;

	@Override
	public UserModel register(RegisterDTO reg) {
		List<UserModel> fUser = uRepository.findByEmail(reg.getEmail().toLowerCase());
		if (fUser.size() == 0) {
			UserModel newUser = new UserModel(reg.getUsername(), reg.getEmail().toLowerCase(), reg.getPassword());
			return uRepository.save(newUser);
		} else {
			return null;
		}
	}

	@Override
	public UserModel login(LoginDTO log) {
		List<UserModel> userL = uRepository.findByEmailAndPassword(log.getEmail().toLowerCase(), log.getPassword());
		if (userL.size() != 0) {
			return userL.get(0);
		} else {
			return null;
		}
	}

	public TokenDTO login2(LoginDTO log) {
		List<UserModel> userL = uRepository.findByEmailAndPassword(log.getEmail().toLowerCase(), log.getPassword());
		if (userL.size() != 0) {
			return  new TokenDTO(jwtUtils.generateJwtToken(userL.get(0)));
		} else {
			return null;
		}
	}

	@Override
	public List<UserModel> getAllUsers() {
		return uRepository.findByIsAdmin(false);
	}

	@Override
	public UserModel getUserById(Long id) {
		Optional<UserModel> fuser = uRepository.findById(id);
		if (fuser.isPresent()) {
			return fuser.get();
		} else {
			return null;
		}
	}
	
	@Override
	public void deleteUser(Long id) {
		uRepository.deleteById(id);
	}

	@Override
	public boolean updateUserInfo(Long userId, UserInfoDTO req) {
		Optional<UserModel> fuser = uRepository.findById(userId);
		if (fuser.isPresent()) {
			UserModel user = fuser.get();
			user.setEmail(req.getEmail());
			user.setUsername(req.getUsername());
			uRepository.save(user);
			return true;
		} else {
			return false;
		}
	}

	@Override
	public boolean updateUserPsw(Long userId, UserPswDTO req) {
		Optional<UserModel> fuser = uRepository.findById(userId);
		if (fuser.isPresent()) {
			UserModel user = fuser.get();
			if(user.getPassword().equals(req.getActuelPsw())) {
				user.setPassword(req.getNewPsw());
				uRepository.save(user);
				return true;
			} else {
				return false;
			}
			
		} else {
			return false;
		}
	}
	
	@Override
	public boolean updateProfilePicture(Long userId, String fileName) {
	    Optional<UserModel> fuser = uRepository.findById(userId);
	    if (fuser.isPresent()) {
	        UserModel user = fuser.get();
	        user.setProfilePicture(fileName);
	        uRepository.save(user);
	        return true;
	    } else {
	        return false;
	    }
	}

}
