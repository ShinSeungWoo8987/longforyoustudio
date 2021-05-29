package com.LongForYou.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class Image {
	private int Ima_id;
	private String Ima_type;
	private boolean Ima_thumbnail;
	private int Ima_groupid;
	private String Ima_content;
}