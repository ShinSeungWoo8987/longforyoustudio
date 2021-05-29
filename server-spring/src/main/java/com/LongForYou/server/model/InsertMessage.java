package com.LongForYou.server.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class InsertMessage {
	private int Mes_id;
	private int Pro_id;
	private String Mes_date;
	private String Mes_name;
	private String Mes_phone;
	private String Mes_content;
	private String Mes_hopedate;
	private String Pro_title;
}