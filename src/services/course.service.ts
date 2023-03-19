import { privateAPI } from "../api/api";
import { TResponse } from '../types/request.types';
import { AllCoursesResponse, ICourseDatails } from "../types/course.types";


export default class CourseService {
    static async GetAllCourses(): Promise<TResponse<AllCoursesResponse>> {
        return privateAPI.get<AllCoursesResponse>(`core/preview-courses`)
    }

    static async CourseDetails(id: string): Promise<TResponse<ICourseDatails>> {
        return privateAPI.get<ICourseDatails>(`core/preview-courses/${id}`)
    }
}
