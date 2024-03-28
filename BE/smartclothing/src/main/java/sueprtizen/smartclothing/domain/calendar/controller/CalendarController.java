package sueprtizen.smartclothing.domain.calendar.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sueprtizen.smartclothing.domain.calendar.dto.CalendarMonthlyScheduleResponseDTO;
import sueprtizen.smartclothing.domain.calendar.dto.ScheduleSaveRequestDTO;
import sueprtizen.smartclothing.domain.calendar.service.CalendarService;
import sueprtizen.smartclothing.global.dto.Message;

@RequestMapping("/calendar")
@RestController
@RequiredArgsConstructor
public class CalendarController {

    final CalendarService calendarService;

    @GetMapping()
    public ResponseEntity<Message<CalendarMonthlyScheduleResponseDTO>> clothingConfirm(
            @RequestHeader("User-ID") int userId,
            @RequestParam String startDate,
            @RequestParam String endDate
    ) {
        CalendarMonthlyScheduleResponseDTO calendarMonthlyScheduleResponseDTO = calendarService.calendarMonthlySchedules(userId, startDate, endDate);
        return ResponseEntity.ok(Message.success(calendarMonthlyScheduleResponseDTO));
    }

    @PostMapping()
    public ResponseEntity<Message<Void>> scheduleSave(
            @RequestHeader("User-ID") int userId,
            @RequestBody ScheduleSaveRequestDTO scheduleSaveRequestDTO

    ) {
        calendarService.scheduleSave(userId, scheduleSaveRequestDTO);
        return ResponseEntity.ok(Message.success());
    }

    @DeleteMapping("/{scheduleId}")
    public ResponseEntity<Message<Void>> scheduleDelete(
            @RequestHeader("User-ID") int userId,
            @PathVariable int scheduleId
    ) {
        calendarService.scheduleDelete(userId, scheduleId);
        return ResponseEntity.ok(Message.success());
    }
}