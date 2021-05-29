package com.LongForYou.server.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

import com.LongForYou.server.model.Member;
import com.LongForYou.server.model.Message;
import com.LongForYou.server.model.Product;
import com.LongForYou.server.model.S3FileKey;
import com.LongForYou.server.model.Image;
import com.LongForYou.server.model.Information;
import com.LongForYou.server.model.InsertMessage;


@Mapper
public interface LongForYouMapper {
	public Member getMember(String id);
	
	public List<Information> getInformation();
	public List<Product> getProduct();
	public List<Image> getImageGroup(int num);
	public List<Image> getImageThumbnail();
	public List<Message> getMessage(int num);
	public String getMessageCnt();
	public void insertMessage(InsertMessage message);
	public void insertMessageUn(InsertMessage message);
	public void updateInformation(Information information);
	public void updateProduct(Product product);
	public int nextGroupId();
	public void insertProfiles(Image image);
	public List<S3FileKey> getFileKeyByGroupId(int groupId);
	public void deleteImageGroup(int groupId);
}