export interface IAllCourses {
    id: string;
    title: string;
    description: string;
    containsLockedLessons: boolean;
    lessonsCount: number;
    rating: number;
    previewImageLink: string;
    meta: {
        courseVideoPreview: {
            link: string;
            previewImageLink: string;
        }
        skills: string[];
    }
}

export interface AllCoursesResponse {
    courses: IAllCourses[];
}

export interface ILesson {
    id: string;
    link: string;
    order: number;
    previewImageLink: string;
    status: string;
    title: string;
    type: string;
}

export interface ICourseDatails {
    id: string;
    title: string;
    description: string;
    containsLockedLessons: boolean;
    lessons: ILesson[];
    rating: number;
    previewImageLink: string;
    meta: {
        courseVideoPreview: {
            link: string;
            previewImageLink: string;
        }
        skills: string[];
    }
}