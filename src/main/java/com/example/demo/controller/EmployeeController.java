package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Map;

@Controller
public class EmployeeController {

  @GetMapping("/")
  public String showDirectory(Model model) {
    List<Map<String, String>> employees = List.of(
        Map.of("id", "1", "firstName", "John", "lastName", "Doe", "email", "john@example.com", "department", "HR", "role", "Manager"),
        Map.of("id", "2", "firstName", "Jane", "lastName", "Smith", "email", "jane@example.com", "department", "IT", "role", "Developer"),
        Map.of("id", "3", "firstName", "Tom", "lastName", "Hanks", "email", "tom@example.com", "department", "Finance", "role", "Analyst")
    );
    model.addAttribute("employees", employees);
    return "index";
  }
}
