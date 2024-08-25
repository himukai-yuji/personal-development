package com.example.webCalendar.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.webCalendar.Entity.CalendarEntity;
import com.example.webCalendar.Service.CalendarService;

@RestController
@RequestMapping("/calendar")
public class HomeController {
    
    @Autowired
    private CalendarService calendarService;

    // 複数のTODOを保存するメソッド
    @PostMapping("/saveEvents")
    public ResponseEntity<Object> saveEvents(@RequestBody List<CalendarEntity> events) {
        for (CalendarEntity event : events) {
            calendarService.saveEvent(event);
        }
        return ResponseEntity.ok().build();
    }

    // 単一のTODOを保存するメソッド
    @PostMapping("/saveTodo")
    public ResponseEntity<Void> saveTodo(@RequestBody CalendarEntity event) {
        calendarService.saveEvent(event);
        return ResponseEntity.ok().build();
    }
}