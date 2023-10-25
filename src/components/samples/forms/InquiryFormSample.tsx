import { InquiryForm } from '@components/form/InquiryForm';
import { ComponentExplainCard } from '@components/view/ComponentExplainCard';

export const InquiryFormSample = () => {
  return (
    <ComponentExplainCard
      title='미리정의된 FORM (InquiryForm)'
      description={
        '미리 정의된 FORM의 예시입니다.\n가변적으로 FORM 의 입력값을 상황에 맞춰 변경할 수도 있지만, 이런 조치가 필요하지 않고, 반복적으로 사용되는 내용의 경우의 활용법'
      }
    >
      <InquiryForm />
    </ComponentExplainCard>
  );
};
