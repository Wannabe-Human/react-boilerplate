export interface ProjectInfo {
  id: string; // 세부 페이지 명칭 및 프로젝트
  title: string; // 정식 프로젝트 제목
  abbreviated_title: string; // 약칭 프로젝트 제목
}
export const PROJECT_LIST: ProjectInfo[] = [];
export const PROJECT_NAV_LIST: Pick<ProjectInfo, 'id' | 'abbreviated_title'>[] =
  PROJECT_LIST.map((item) => ({
    id: item.id,
    abbreviated_title: item.abbreviated_title,
  }));
