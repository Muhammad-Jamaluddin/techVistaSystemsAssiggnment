package com.employee.employeeapi.service.impl;

import com.employee.employeeapi.entity.Employees;
import com.employee.employeeapi.repository.EmployeeRepository;
import com.employee.employeeapi.service.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class EmployeeService implements IEmployeeService {

    @Autowired
    public EmployeeRepository employeeRepository;

    @Override
    public Page<Employees> getAll(Pageable pageable) {
        return employeeRepository.findAll(pageable);
    }

    @Override
    public Employees create(Employees employee) {

        try {

            if (employee.getFirstName() == null || employee.getFirstName().isEmpty() || employee.getFirstName().length() < 3) {
                throw new Exception("Invalid Firstname");
            }

            if (employee.getLastName() == null || employee.getLastName().isEmpty() || employee.getLastName().length() < 3) {
                throw new Exception("Invalid Lastname");
            }

            if (employee.getSalary() <= 0) {
                throw new Exception("Invalid Salary");
            }

            Pattern pattern = Pattern.compile("^([0-9]+?(-)[0-9]+)+$");
            Matcher matcher = pattern.matcher(employee.getPhoneNumber());
            if (matcher.find() == false) {
                throw new Exception("Invalid PhoneNumber");
            }

            pattern = Pattern.compile("^([_a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*(\\.[a-zA-Z]{1,6}))?$");
            matcher = pattern.matcher(employee.getEmail());
            if (matcher.find() == false) {
                throw new Exception("Invalid Email");
            }

            employee.setEmployeeId(0);
            employee.setDepartmentId(1);
            employee.setManagerId(1);
            employee.setHireDate(Timestamp.from(Instant.now()));

            return employeeRepository.saveAndFlush(employee);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
