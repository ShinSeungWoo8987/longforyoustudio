package com.LongForYou.server.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data //기본적인 getter/setter와 toString, 생성자메소드, String값으로만 비교하는 equals 오버라이딩 메소드를 생성해 준다.
@AllArgsConstructor
@Builder //builder메소드 추가. builder메소드를 통해 모든 매개변수가 아닌 '일부' 매개변수 만으로도 객체를 생성할 수 있는 생성자를 반환해 준다.
public class Member {
	private String use_id;
	private String use_pw;
}