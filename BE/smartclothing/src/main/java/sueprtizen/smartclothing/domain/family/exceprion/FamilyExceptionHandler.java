package sueprtizen.smartclothing.domain.family.exceprion;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import sueprtizen.smartclothing.global.dto.Message;


@Slf4j
@RestControllerAdvice
public class FamilyExceptionHandler {

    @ExceptionHandler(FamilyException.class)
    public ResponseEntity<Message<Void>> userException(FamilyException e) {
        log.error("가족 관련 오류: {}", e.getMessage());
        return ResponseEntity.status(e.getErrorCode().getHttpStatus()).body(Message.fail(e.getErrorCode().getHttpStatus(), e.getErrorCode().getErrorMessage()));
    }
}
