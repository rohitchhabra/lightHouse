package com.light.house.chhabra.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.light.house.chhabra.dao.CustomerDao;
import com.light.house.chhabra.model.Customer;
import com.light.house.chhabra.pojo.CustomerDto;
import com.light.house.chhabra.pojo.ResponseDto;
import com.light.house.chhabra.utils.AppConstants;

@Service
public class AppServiceImpl implements AppService{

	@Autowired
	private CustomerDao customerDao;
	
	@Override
	public ResponseDto saveEenquiry(CustomerDto customerDto){
		ResponseDto responseDto = new ResponseDto();
		responseDto.setResultCode(200);
		responseDto.setResultDesc("Success");
		try{			
			if(customerDto.getEnquiryType().equals(AppConstants.GENERATOR) || 
					customerDto.getEnquiryType().equals(AppConstants.KEYS)){
			}else{
				responseDto.setErrorCode(901);
				responseDto.setErrorDesc("EnquiryType not exits");
				return responseDto;
			}
			if(customerDto.getContactNumber().length()!=10){
				responseDto.setErrorCode(902);
				responseDto.setErrorDesc("Mobile number not valid");
				return responseDto;
			}
			Customer customer = new Customer();
			customer.setName(customerDto.getName());
			customer.setAddress(customerDto.getAddress());
			customer.setContactNumber(customerDto.getContactNumber());
			customer.setCity(customerDto.getCity());
			customer.setState(customerDto.getState());
			customer.setZipCode(customerDto.getZipCode());
			customer.setEnquiryType(customerDto.getEnquiryType());
			customer.setCreationDate(new Date());
			customerDao.save(customer);
		}catch(Exception e){
			responseDto.setErrorCode(500);
			responseDto.setErrorDesc("Internal Server Error "+e);
		}
		return responseDto;		
	}

	@Override
	public List<CustomerDto> getAllCustomers() {
		// TODO Auto-generated method stub
		List<Customer> customerList = (List<Customer>) customerDao.findAll();
		List<CustomerDto> dtoList = new ArrayList<CustomerDto>();
		for(Customer each : customerList){
			CustomerDto customerDto = new CustomerDto();
			customerDto.setName(each.getName());
			customerDto.setContactNumber(each.getContactNumber());
			customerDto.setCreationDate(""+each.getCreationDate());
			customerDto.setCity(each.getCity());
			customerDto.setState(each.getState());
			customerDto.setZipCode(each.getZipCode());
			customerDto.setEnquiryType(each.getEnquiryType());
			dtoList.add(customerDto);
		}
		return dtoList;
	}
}
