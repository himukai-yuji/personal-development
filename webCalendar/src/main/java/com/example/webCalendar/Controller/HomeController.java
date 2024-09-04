package com.example.webCalendar.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.webCalendar.Entity.CalendarEntity;
import com.example.webCalendar.Service.CalendarService;

@RestController
@RequestMapping("/api/calendars")
public class HomeController {

    @Autowired
    private CalendarService calendarService;

    @GetMapping
    public List<CalendarEntity> getAllCalendars() {
        return calendarService.getAllCalendars();
    }

    @PostMapping
    public CalendarEntity createCalendar(@RequestBody CalendarEntity calendarEntity) {
        return calendarService.saveCalendar(calendarEntity);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CalendarEntity> getCalendarById(@PathVariable Long id) {
        CalendarEntity calendarEntity = calendarService.getCalendarById(id);
        if (calendarEntity != null) {
            return ResponseEntity.ok(calendarEntity);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCalendar(@PathVariable Long id) {
        calendarService.deleteCalendar(id);
        return ResponseEntity.noContent().build();
    }
}