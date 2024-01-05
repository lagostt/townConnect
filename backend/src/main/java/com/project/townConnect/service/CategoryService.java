package com.project.townConnect.service;

import java.util.List;

import com.project.townConnect.dto.CategoryDTO;
import com.project.townConnect.model.CategoryModel;

public interface CategoryService {
	public List<CategoryModel> getCategories();
	public void deleteCategory(Long id);
	public CategoryModel addCategory(CategoryDTO req);
}
