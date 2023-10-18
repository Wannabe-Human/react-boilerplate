export interface ComponentInfo {
  id: string; // 컴포넌트 아이디
  title: string; // 컴포넌트 이름(class name)
}
export const COMPONENT_LIST: ComponentInfo[] = [];

/**
 * 컴포넌트 카테고리(분류): list, view, button 등등
 * type or Variant list : 적용 가능한 스타일 종류
 */
