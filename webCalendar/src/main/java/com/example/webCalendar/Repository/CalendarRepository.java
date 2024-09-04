package com.example.webCalendar.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.webCalendar.Entity.CalendarEntity;

@Repository
public interface CalendarRepository extends JpaRepository<CalendarEntity, Long> {
    
    @Query(value = "SELECT * FROM calendar_table ORDER BY date", nativeQuery = true)
    List<CalendarEntity> findAllCalendar();
}
