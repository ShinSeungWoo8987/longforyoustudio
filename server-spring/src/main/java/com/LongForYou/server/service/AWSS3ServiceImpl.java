package com.LongForYou.server.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;

@Component
@Service(value = "awsS3Service")
public class AWSS3ServiceImpl implements AWSS3Service {
	
	private String key1;
    private String key2;

    @Value("${s3.key1}")    
    public void setKey1(String key1) {
    	this.key1 = key1;
    }

    @Value("${s3.key2}")
    public void setKey2(String key2) {
    	this.key2 = key2;
    }

	
	@Override
	public String uploadS3(String folderName, String fileName, MultipartFile file) {
		System.out.println(folderName);
		System.out.println(fileName);
		
		AWSCredentials credentials = new BasicAWSCredentials(key1, key2);

		AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
		        .withCredentials(new AWSStaticCredentialsProvider(credentials))
		        .withRegion(Regions.AP_NORTHEAST_2)
		        .build();
		
		try {
			s3Client.putObject(new PutObjectRequest("longforyoustudio", folderName+"/"+fileName, file.getInputStream(), null)
	                .withCannedAcl(CannedAccessControlList.PublicRead));
		} catch (AmazonServiceException e) {
            e.printStackTrace();
        } catch (SdkClientException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
		return s3Client.getUrl("longforyoustudio", folderName+"/"+fileName).toString();
	}
	
	@Override
	public void deleteS3(String fileKey) { // S3에는 폴더의 개념이 없다. 그러므로, 삭제시 (폴더명/파일명 형식으로 이루어진)키 하나만 넘겨주어야한다.
		AWSCredentials credentials = new BasicAWSCredentials(key1, key2);

		AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
		        .withCredentials(new AWSStaticCredentialsProvider(credentials))
		        .withRegion(Regions.AP_NORTHEAST_2)
		        .build();
		try {
			s3Client.deleteObject(new DeleteObjectRequest("longforyoustudio", fileKey));
		} catch (AmazonServiceException e) {
            e.printStackTrace();
        } catch (SdkClientException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
	}
}