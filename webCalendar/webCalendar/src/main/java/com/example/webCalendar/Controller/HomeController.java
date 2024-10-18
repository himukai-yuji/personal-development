package com.example.webCalendar.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.webCalendar.Entity.CalendarEntity;
import com.example.webCalendar.Service.CalendarService;

//@CrossOrigin(origins = "http://localhost:8080") // フロントエンドのURL
@Controller
//@RequestMapping("/api/calendars")
public class HomeController {

    @Autowired
    private CalendarService calendarService;

    @GetMapping("/")
    public String home(){
        return "calendar.html";
    }
    
    @GetMapping("/getTodos")
    @ResponseBody
    public List<CalendarEntity> getTodos(){
    	System.out.println("GetMapping");
    	return calendarService.getAllCalendars();
    }

    @PostMapping("/saveEvents")
    @ResponseBody 
    public CalendarEntity saveEvent(@RequestBody CalendarEntity calendarEntity) {
        //受け取ったデータをコンソールに出力
    	System.out.println("追加したカレンダー情報"+calendarEntity);
    	return calendarService.saveCalendar(calendarEntity);
    }
}
