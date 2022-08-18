import { add } from "date-fns";
import { DateArray, EventAttributes } from "ics";
import { Lesson } from "webuntis";

/* Forgive me, for I have sinned */

const convertLessonToEvent = (lesson: Lesson): EventAttributes => {
  const classDate = convertNumberDateToDate(lesson.date);
  return {
    uid: String(lesson.id),
    title: `${lesson.lstext}\n${lesson.su.map((s) => s.longname).join(", ")}`,
    location: lesson.ro.map((room) => room.longname).join(", "),
    description: `Teacher: ${lesson.te
      .map((teacher) => teacher.longname)
      .join(", ")}\nClasses: ${lesson.kl.map((s) => s.name).join(" ")}`,
    startInputType: "local",
    startOutputType: "local",
    start: convertDateToDateArray(
      add(classDate, { minutes: convertNumberTimeToMinutes(lesson.startTime) })
    ),
    endInputType: "local",
    endOutputType: "local",
    end: convertDateToDateArray(
      add(classDate, { minutes: convertNumberTimeToMinutes(lesson.endTime) })
    ),
  };
};

const convertDateToDateArray = (date: Date): DateArray => {
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
  ];
};

const convertNumberTimeToMinutes = (time: number) => {
  const hours = Math.floor(time / 100);
  const minutes = time % 100;
  return hours * 60 + minutes;
};

const convertNumberDateToDate = (date: number) => {
  const years = Math.floor(date / 1e4);
  const months = Math.floor((date % 1e4) / 100);
  const days = date % 100;
  return new Date(years, months - 1, days);
};

export {
  convertLessonToEvent,
  convertDateToDateArray,
  convertNumberTimeToMinutes,
  convertNumberDateToDate,
};