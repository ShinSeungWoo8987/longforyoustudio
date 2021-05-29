package com.LongForYou.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class LongForYouServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(LongForYouServerApplication.class, args);
		
		String springVersion = org.springframework.core.SpringVersion.getVersion();
		System.out.println(springVersion);
	}
}
