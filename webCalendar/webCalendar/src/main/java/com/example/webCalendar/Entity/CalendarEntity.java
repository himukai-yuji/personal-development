package com.example.webCalendar.Entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "calendar_table")
@Data
public class CalendarEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id; // フィールド名を小文字に変更
    
    @Column(name = "DATE")
    private LocalDate date; // LocalDate型で日付を管理

    @Column(name = "todo")
    private String todo; // TODO項目
}
