package com.LongForYou.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class Information {
	private String Inf_type;
	private String Inf_content;
}