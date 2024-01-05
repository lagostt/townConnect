package com.project.townConnect.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.townConnect.dto.CategoryDTO;
import com.project.townConnect.model.CategoryModel;
import com.project.townConnect.repository.CategoryRepository;


@Service
public class CategoryServiceImpl implements CategoryService {
	
	@Autowired
	private CategoryRepository cRepository;

	@Override
	public List<CategoryModel> getCategories() {
		return cRepository.findAll();
	}

	@Override
	public void deleteCategory(Long id) {
		cRepository.deleteById(id);
	}

	@Override
	public CategoryModel addCategory(CategoryDTO req) {
		CategoryModel category = new CategoryModel(req.getName());
		return cRepository.save(category);
	}
}
