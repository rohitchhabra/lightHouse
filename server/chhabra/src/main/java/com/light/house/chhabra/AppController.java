package com.light.house.chhabra;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.light.house.chhabra.pojo.CustomerDto;
import com.light.house.chhabra.pojo.ResponseDto;
import com.light.house.chhabra.service.AppService;
import com.light.house.chhabra.service.AppServiceImpl;

@RestController
public class AppController {

	private static final Logger LOGGER = LoggerFactory.getLogger(AppController.class);
	
	@Autowired
	private AppService appService;
	
	@RequestMapping("/server")
	public String ammbrServer() {
		return "Server is up";
	}
	
	@RequestMapping(value="/enquiry",consumes="application/json",produces="application/json",method=RequestMethod.POST)
	public ResponseDto saveEnquiry(@RequestBody CustomerDto customerDto){
		LOGGER.info("saveEnquiry called");
		return appService.saveEenquiry(customerDto);
	}
	
	@RequestMapping(value="/getAll",produces="application/json",method=RequestMethod.GET)
	public List<CustomerDto> getAllCustomers(){
		return appService.getAllCustomers();
	}
	
}
