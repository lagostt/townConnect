package com.project.townConnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.townConnect.model.UserModel;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {
	public List<UserModel> findByEmail(String email);
	public List<UserModel> findByEmailAndPassword(String email, String password);
	public List<UserModel> findByIsAdmin(boolean b);
}
