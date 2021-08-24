package com.employee.employeeapi.controller;

import com.employee.employeeapi.entity.Departments;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class DepartmentController {

    @GetMapping("/department/getAll")
    public List<Departments> getAll() {
        return new ArrayList<>();
    }

}
