package com.light.house.chhabra;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.light.house.chhabra.pojo.CustomerDto;
import com.light.house.chhabra.pojo.ResponseDto;
import com.light.house.chhabra.service.AppService;

@RestController
public class AppController {

	@Autowired
	private AppService appService;
	
	@RequestMapping("/server")
	public String ammbrServer() {
		return "Server is up";
	}
	
	@RequestMapping(value="/enquiry",consumes="application/json",produces="application/json",method=RequestMethod.POST)
	public ResponseDto saveEnquiry(@RequestBody CustomerDto customerDto){
		return appService.saveEenquiry(customerDto);
	}
	
	@RequestMapping(value="/getAll",produces="application/json",method=RequestMethod.GET)
	public List<CustomerDto> getAllCustomers(){
		return appService.getAllCustomers();
	}
	
}
