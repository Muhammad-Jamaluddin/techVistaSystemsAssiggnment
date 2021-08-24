package com.employee.employeeapi.controller;

import com.employee.employeeapi.entity.Employees;
import com.employee.employeeapi.service.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class EmployeeController {

    @Autowired
    public IEmployeeService employeeService;

    @GetMapping("/employee/getAll")
    @ResponseBody
    public Page<Employees> getAll(Pageable pageable) {
        return employeeService.getAll(pageable);
    }

    @PostMapping("/employee/create")
    @ResponseBody
    public Employees create(@RequestBody Employees employee) {
        return employeeService.create(employee);
    }
}
