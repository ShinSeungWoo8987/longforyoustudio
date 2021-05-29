package com.LongForYou.server.service;

import org.springframework.web.multipart.MultipartFile;

public interface AWSS3Service {
	String uploadS3(String folderName,String fileName, MultipartFile file);
	void deleteS3(String fileKey);
}