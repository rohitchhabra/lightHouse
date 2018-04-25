package com.light.house.chhabra.service;

import java.util.List;

import com.light.house.chhabra.pojo.CustomerDto;
import com.light.house.chhabra.pojo.ResponseDto;

public interface AppService {

	ResponseDto saveEenquiry(CustomerDto customerDto);
	List<CustomerDto> getAllCustomers();
}
