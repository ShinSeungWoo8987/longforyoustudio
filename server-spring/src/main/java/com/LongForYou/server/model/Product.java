package com.LongForYou.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class Product {
	private int Pro_id;
	private String Pro_title;
	private String Pro_content;
}