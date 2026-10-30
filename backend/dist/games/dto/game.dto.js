"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerGameDto = exports.StartGameDto = void 0;
class StartGameDto {
    title;
    subjectId;
    courseId;
    institutionId;
    createdById;
    mode;
    durationSeconds;
    questionLimit;
}
exports.StartGameDto = StartGameDto;
class AnswerGameDto {
    userId;
    questionId;
    selectedAnswerId;
}
exports.AnswerGameDto = AnswerGameDto;
//# sourceMappingURL=game.dto.js.map