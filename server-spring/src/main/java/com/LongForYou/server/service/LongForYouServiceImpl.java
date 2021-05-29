package com.LongForYou.server.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.LongForYou.server.mapper.LongForYouMapper;
import com.LongForYou.server.model.Member;
import com.LongForYou.server.model.Message;
import com.LongForYou.server.model.Product;
import com.LongForYou.server.model.S3FileKey;
import com.LongForYou.server.model.Image;
import com.LongForYou.server.model.Information;
import com.LongForYou.server.model.InsertMessage;

@Service(value = "longForYouService")
public class LongForYouServiceImpl implements LongForYouService {

	@Autowired
	private LongForYouMapper longForYouMapper;
	
	@Override
	public Member getMember(String id) {
		return this.longForYouMapper.getMember(id);
	}

	@Override
	public List<Information> getInformation() {
		List<Information> list = this.longForYouMapper.getInformation();
		return list;
	}
	
	@Override
	public List<Product> getProduct() {
		List<Product> product= this.longForYouMapper.getProduct();
		return product;
	}

	@Override
	public List<Image> getImage(String num) {
		List<Image> list;
		if(num.equalsIgnoreCase("all")) {
			list = this.longForYouMapper.getImageThumbnail();
			return list;
		}else {
			list = this.longForYouMapper.getImageGroup( Integer.parseInt(num) );
			return list;
		}
	}

	@Override
	public List<Message> getMessage(String num) {
		List<Message> list = this.longForYouMapper.getMessage((Integer.parseInt(num)-1)*20);
		return list;
	}

	@Override
	public String getMessageCnt() {
		String list = this.longForYouMapper.getMessageCnt();
		return list;
	}

	@Override
	public void insertMessage(InsertMessage message) {
		if(message.getPro_id()==0) {
			this.longForYouMapper.insertMessageUn(message);
		}else {
			this.longForYouMapper.insertMessage(message);			
		}
		 
	}

	@Override
	public void updateInformation(Information information) {
		this.longForYouMapper.updateInformation(information);
	}
	
	@Override
	public void updateProduct(Product product) {
		this.longForYouMapper.updateProduct(product);
	}

	@Override
	public List<Image> getImageThumbnail() {
		return this.longForYouMapper.getImageThumbnail();
	}

	@Override
	public int nextGroupId() {
		return this.longForYouMapper.nextGroupId();
	}

	@Override
	public void insertProfiles(Image image) {
		this.longForYouMapper.insertProfiles(image);
	}
	

	@Override
	public List<S3FileKey> getFileKeyByGroupId(int groupId) {
		return this.longForYouMapper.getFileKeyByGroupId(groupId);
	}

	@Override
	public void deleteImageGroup(int groupId) {
		this.longForYouMapper.deleteImageGroup(groupId);
	}
	
	
	
}