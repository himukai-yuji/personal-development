package com.example.webCalendar.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.webCalendar.Entity.CalendarEntity;
import com.example.webCalendar.Repository.CalendarRepository;

@Service
public class CalendarService {
    
    @Autowired
    private CalendarRepository calendarRepository;

    public void saveEvent(CalendarEntity event) {
        calendarRepository.save(event);
    }

    public List<CalendarEntity> getAllCalendarEvents() {
        return calendarRepository.findAllCalendar();
    }
}

