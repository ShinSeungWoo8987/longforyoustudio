package com.LongForYou.server.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.LongForYou.server.model.Image;
import com.LongForYou.server.model.S3FileKey;
import com.LongForYou.server.service.AWSS3Service;
import com.LongForYou.server.service.LongForYouService;

@CrossOrigin
@RestController(value = "fileUploadController")
public class FileController {
	@Autowired
	private AWSS3Service awsS3Service;

	@Autowired
	private LongForYouService longForYouService;

	@RequestMapping(value = "/information/img", method = RequestMethod.POST, consumes = "multipart/form-data")
	public String updateAvatarImage(MultipartHttpServletRequest request) throws Exception {
		String url = this.awsS3Service.uploadS3("information", request.getParameter("type"), request.getFile("file"));
		return url;
	}

	@RequestMapping(value = "/backgroundVideo", method = RequestMethod.POST, consumes = "multipart/form-data")
	public void updateBackgroundVideo(MultipartHttpServletRequest request) throws Exception {
		this.awsS3Service.uploadS3("information", "background-video.mp4", request.getFile("video"));
	}

	@DeleteMapping("/delete/image/{groupId}")
	public void deleteImageGroup(@PathVariable String groupId) throws Exception {
		// DB에서 삭제 및 삭제할 폴더명 가져오는 메소드
		List<S3FileKey> s3FileKeyList = this.longForYouService.getFileKeyByGroupId(Integer.parseInt(groupId));
		this.longForYouService.deleteImageGroup(Integer.parseInt(groupId));

		// S3에서 삭제하는 메소드
		for (int i = 0; i < s3FileKeyList.size(); i++) {
			this.awsS3Service.deleteS3(s3FileKeyList.get(i).getS3filekey());
		}
	}

	@PostMapping("/profile")
	public List<Image> insertProfiles(MultipartHttpServletRequest request) throws Exception {
		
		// 다음 그룹아이디 가져오기
		int nextGroupId = this.longForYouService.nextGroupId();

		// 폴더명 랜덤생성
		String folderName = UUID.randomUUID().toString();
		
		// 썸네일 업로드 및 업로드된 url가져오기
		String thumbnailUrl = awsS3Service.uploadS3(folderName, UUID.randomUUID().toString(),
				request.getFile("thumbnail"));
		
		// profile 파일들 업로드 및 profileUrls변수에 url 저장
		ArrayList<String> profileUrls = new ArrayList<String>();
		Map<String, MultipartFile> profileList = request.getFileMap();
		for (int i = 0; i < profileList.size() - 1; i++) {
			MultipartFile file = request.getFile("profile" + i);
			profileUrls.add(awsS3Service.uploadS3(folderName, UUID.randomUUID().toString(), file));
		}
		
		// 썸네일 DB저장
		Image thumbnail = Image.builder().Ima_type(request.getParameter("type")).Ima_thumbnail(true)
				.Ima_groupid(nextGroupId).Ima_content(thumbnailUrl).build();
		this.longForYouService.insertProfiles(thumbnail);
		
		// profiles DB저장
		for (int i = 0; i < profileUrls.size(); i++) {
			Image profile = Image.builder().Ima_type(request.getParameter("type")).Ima_thumbnail(false)
					.Ima_groupid(nextGroupId).Ima_content(profileUrls.get(i)).build();
			this.longForYouService.insertProfiles(profile);
		}
		
		// DB 다시 읽어오기
		List<Image> imageList = this.longForYouService.getImageThumbnail(); 
		return imageList;
	}

}
