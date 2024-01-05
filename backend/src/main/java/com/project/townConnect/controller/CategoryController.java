package com.project.townConnect.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.townConnect.dto.CategoryDTO;
import com.project.townConnect.model.CategoryModel;
import com.project.townConnect.service.CategoryService;

@RestController
public class CategoryController {
	
	@Autowired
	private CategoryService cService;
	
	@GetMapping("/categories")
	public List<CategoryModel> getCategories() {
		return cService.getCategories();
	}
	
	@PostMapping("/category")
	public CategoryModel addCategory(@RequestBody CategoryDTO req) {
		return cService.addCategory(req);
	}
	
	@DeleteMapping("category/{id}")
	public void deleteCategory(@PathVariable Long id) {
		cService.deleteCategory(id);
	}
}
