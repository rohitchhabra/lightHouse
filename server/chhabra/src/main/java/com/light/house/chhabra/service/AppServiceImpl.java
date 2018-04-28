package com.light.house.chhabra.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.light.house.chhabra.dao.CustomerDao;
import com.light.house.chhabra.model.Customer;
import com.light.house.chhabra.pojo.CustomerDto;
import com.light.house.chhabra.pojo.ResponseDto;
import com.light.house.chhabra.utils.AppConstants;

@Service
public class AppServiceImpl implements AppService{

	private static final Logger LOGGER = LoggerFactory.getLogger(AppServiceImpl.class);
	
	@Autowired
	private CustomerDao customerDao;
	
	@Autowired
    public JavaMailSender emailSender;
	
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
			LOGGER.info("save enquiry for : "+customerDto.getEnquiryType());
			Customer customer = new Customer();
			customer.setName(customerDto.getName());
			customer.setAddress(customerDto.getAddress());
			customer.setContactNumber(customerDto.getContactNumber());
			customer.setCity(customerDto.getCity());
			customer.setState(customerDto.getState());
			customer.setZipCode(customerDto.getZipCode());
			customer.setEnquiryType(customerDto.getEnquiryType());
			customer.setVehicleType(customerDto.getVehicleType());
			customer.setVehicleNumber(customerDto.getVehicleNumber());
			customer.setCreationDate(new Date());
			sendMail(customerDto);
			customerDao.save(customer);
			LOGGER.info("Enquiry saved");
		}catch(Exception e){
			LOGGER.error("Error while save enquiry "+e);
			responseDto.setErrorCode(500);
			responseDto.setErrorDesc("Internal Server Error "+e);
		}
		return responseDto;		
	}

	@Override
	public List<CustomerDto> getAllCustomers() {
		// TODO Auto-generated method stub
		List<Customer> customerList = (List<Customer>) customerDao.findAll();
		LOGGER.info("enquiryList size : "+customerList.size());
		List<CustomerDto> dtoList = new ArrayList<CustomerDto>();
		for(Customer each : customerList){
			CustomerDto customerDto = new CustomerDto();
			customerDto.setName(each.getName());
			customerDto.setContactNumber(each.getContactNumber());
			customerDto.setCreationDate(""+each.getCreationDate());
			customerDto.setCity(each.getCity());
			customerDto.setState(each.getState());
			customerDto.setZipCode(each.getZipCode());
			customerDto.setAddress(each.getAddress());
			customerDto.setEnquiryType(each.getEnquiryType());
			customerDto.setVehicleType(each.getVehicleType());
			customerDto.setVehicleNumber(each.getVehicleNumber());
			dtoList.add(customerDto);
		}
		return dtoList;
	}
	
	private void sendMail(CustomerDto customerDto){
		String text = "Name : "+customerDto.getName()+"Contact Number : "+customerDto.getContactNumber()
        		+" Address : "+customerDto.getAddress()+" city : "+customerDto.getCity()+" ZipCode : "+
        		customerDto.getZipCode()+" state : "+customerDto.getState()+" VehicleType : "+customerDto.getVehicleType()+" VehicleNumber : "+customerDto.getVehicleNumber();
		LOGGER.info("sending email with msg : "+text);
		 SimpleMailMessage message = new SimpleMailMessage(); 
	        message.setTo("rohitchhh@gmail.com"); 
	        message.setSubject("Enquiry "+customerDto.getEnquiryType()); 
	        message.setText(text);
	        emailSender.send(message);
	}
}
