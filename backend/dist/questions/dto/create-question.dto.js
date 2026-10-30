"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateQuestionDto = exports.CreateQuestionAnswerDto = void 0;
class CreateQuestionAnswerDto {
    text;
    isCorrect;
    order;
}
exports.CreateQuestionAnswerDto = CreateQuestionAnswerDto;
class CreateQuestionDto {
    prompt;
    difficulty;
    explanation;
    subjectId;
    courseId;
    institutionId;
    answers;
}
exports.CreateQuestionDto = CreateQuestionDto;
//# sourceMappingURL=create-question.dto.js.map