package com.project.townConnect.controller;

import java.util.List;

import com.project.townConnect.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.project.townConnect.model.UserModel;
import com.project.townConnect.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;

@RestController
public class UserController {

	@Autowired
	private UserService uService;

	@PostMapping("/register")
	public UserModel register(@RequestBody RegisterDTO reg) {
		return uService.register(reg);
	}

	@PostMapping("/login")
	public UserModel login(@RequestBody LoginDTO log) {
		return uService.login(log);
	}
	@PostMapping("/login2")
	public TokenDTO login2(@RequestBody LoginDTO log) {
		return uService.login2(log);
	}

	@GetMapping("/users")
	public List<UserModel> getAllUsers() {
		return uService.getAllUsers();
	}

	@GetMapping("user/{id}")
	public UserModel getUserById(@PathVariable Long id) {
		return uService.getUserById(id);
	}

	@DeleteMapping("/user/{id}")
	public void deleteUser(@PathVariable Long id) {
		uService.deleteUser(id);
	}

	@PutMapping("/user/info/{id}")
	public boolean updateUserInfo(@PathVariable Long id, @RequestBody UserInfoDTO req) {
		return uService.updateUserInfo(id, req);
	}

	@PutMapping("/user/psw/{id}")
	public boolean updateUserPsw(@PathVariable Long id, @RequestBody UserPswDTO req) {
		return uService.updateUserPsw(id, req);
	}

	private static String getParentDirectory(String directory) {
		File currentDir = new File(directory);
		return currentDir.getParent();
	}

	@PostMapping("/user/img/{userId}")
	public ResponseEntity<String> uploadProfilePicture(@PathVariable Long userId,
			@RequestParam("file") MultipartFile file) throws IllegalStateException, IOException {

		try {
			String uploadDir = getParentDirectory(System.getProperty("user.dir"))
					+ "/frontend/public/images/usersImage";
			String fileName = userId + "_" + file.getOriginalFilename();
			String filePath = uploadDir + "/" + fileName;
			// Save the file to the specified directory

			file.transferTo(new File(filePath));

			// Check if the user already has a profile picture
			UserModel user = uService.getUserById(userId);

			if (user != null) {
				if (!user.getProfilePicture().equals("profil.png")) {
					String existingFilePath = uploadDir + "/" + user.getProfilePicture();
					File existingFile = new File(existingFilePath);
					existingFile.delete();
				}

				// Update the user's profile picture name in the database
				boolean success = uService.updateProfilePicture(userId, fileName);

				if (success) {
					return new ResponseEntity<>(fileName, HttpStatus.OK);
				} else {
					return new ResponseEntity<>("Failed to update profile picture name in the database",
							HttpStatus.INTERNAL_SERVER_ERROR);
				}
			} else {
				return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
			}

		} catch (Exception e) {
			return new ResponseEntity<>("Failed to update profile picture name in the database",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

}
