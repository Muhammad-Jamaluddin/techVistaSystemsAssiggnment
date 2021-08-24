package com.employee.employeeapi.repository;

import com.employee.employeeapi.entity.Departments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Departments, Integer> {
}
