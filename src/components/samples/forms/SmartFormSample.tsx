import { SmartForm } from '@components/form/SmartForm';
import { ComponentExplainCard } from '@components/view/ComponentExplainCard';

export const SmartFormSample = () => {
  return (
    <ComponentExplainCard
      title='SMART FORM (SmartForm)'
      description={
        '다양한 상황을 가정한 FORM의 예시입니다.\n가변적으로 FORM 의 입력값을 상황에 맞춰 변경할 수 있습니다'
      }
    >
      <SmartForm />
    </ComponentExplainCard>
  );
};
