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

    public List<CalendarEntity> getAllCalendars() {
        return calendarRepository.findAllCalendar();
    }

    public CalendarEntity saveCalendar(CalendarEntity calendarEntity) {
        return calendarRepository.save(calendarEntity);
    }

    public CalendarEntity getCalendarById(Long id) {
        return calendarRepository.findById(id).orElse(null);
    }

    public void deleteCalendar(Long id) {
        calendarRepository.deleteById(id);
    }
}
