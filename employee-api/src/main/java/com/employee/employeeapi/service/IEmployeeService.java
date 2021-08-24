package com.employee.employeeapi.service;

import com.employee.employeeapi.entity.Employees;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IEmployeeService {

    Page<Employees> getAll(Pageable pageable);

    Employees create(Employees employee);
}
