package com.project.townConnect.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.townConnect.model.CategoryModel;

public interface CategoryRepository extends JpaRepository<CategoryModel, Long> {

}
