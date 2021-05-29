package com.LongForYou.server.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.LongForYou.server.model.Image;
import com.LongForYou.server.model.Information;
import com.LongForYou.server.model.InsertMessage;
import com.LongForYou.server.model.Message;
import com.LongForYou.server.model.Product;
import com.LongForYou.server.service.LongForYouService;

@CrossOrigin
@RestController(value = "longForYouController")
public class LongForYouController {
	
	@Autowired
    private LongForYouService longForYouService;
	
	@GetMapping("/information")
    public List<Information> getInformation() throws Exception {
        return this.longForYouService.getInformation();
    }
	
	@GetMapping("/product")
    public List<Product> getProduct() throws Exception {
        return this.longForYouService.getProduct();
    }
	
	@GetMapping("/image/{num}")
    public List<Image> getImage(@PathVariable String num) throws Exception {
        return this.longForYouService.getImage(num);
    }
	
	@PostMapping("/message")
    public void insertMessage(@RequestBody InsertMessage message) throws Exception {
        this.longForYouService.insertMessage(message);
    }
	
	@GetMapping("/message/{num}")
    public List<Message> getMessage(@PathVariable String num) throws Exception {
        return this.longForYouService.getMessage(num);
    }
	
//	@GetMapping("/message/{num}")
//    public void getMessage(@PathVariable String num) throws Exception {
//		System.out.println(num);
//    }
	
	@GetMapping("/messageCnt")
    public String getMessageCnt() throws Exception {
        return this.longForYouService.getMessageCnt();
    }
	
	@PostMapping("/information/update")
    public void updateInformation(@RequestBody Information information) throws Exception {
        this.longForYouService.updateInformation(information);
    }
	
	@PostMapping("/product/update")
    public void updateProduct(@RequestBody Product product) throws Exception {
        this.longForYouService.updateProduct(product);
    }
}