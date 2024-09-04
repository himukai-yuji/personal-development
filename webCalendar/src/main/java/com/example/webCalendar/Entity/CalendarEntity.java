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
    @Column(name = "ID")
    private Long id; // フィールド名を小文字に変更
    
    @Column(name = "DATE",nullable=false)
    private LocalDate date; // フィールド名を小文字に変更

    @Column(name = "TODO",nullable=false)
    private String todo; // フィールド名を小文字に変更
}

