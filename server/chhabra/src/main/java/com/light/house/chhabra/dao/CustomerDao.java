package com.light.house.chhabra.dao;

import org.springframework.data.repository.CrudRepository;

import com.light.house.chhabra.model.Customer;

public interface CustomerDao extends CrudRepository<Customer, Long>{

}
