package com.LongForYou.server.service;

import java.util.List;

import com.LongForYou.server.model.Member;
import com.LongForYou.server.model.Message;
import com.LongForYou.server.model.Product;
import com.LongForYou.server.model.S3FileKey;
import com.LongForYou.server.model.Image;
import com.LongForYou.server.model.Information;
import com.LongForYou.server.model.InsertMessage;

public interface LongForYouService {
	Member getMember(String id);
	
	List<Information> getInformation();
	List<Product> getProduct();
	List<Image> getImage(String num);
	List<Message> getMessage(String num);
	String getMessageCnt();
	void insertMessage(InsertMessage message);
	void updateInformation(Information information);
	void updateProduct(Product product);
	
	int nextGroupId();
	void insertProfiles(Image image);
	List<Image> getImageThumbnail();
	List<S3FileKey> getFileKeyByGroupId(int groupId);
	void deleteImageGroup(int groupId);
}