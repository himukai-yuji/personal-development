package com.example.webCalendar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.example.webCalendar")

public class WebCalendarApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebCalendarApplication.class, args);
	}

}
