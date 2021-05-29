package com.LongForYou.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class S3FileKey {
	private String s3filekey;
}