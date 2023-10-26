import { ComponentExplainCard } from '@components/view/ComponentExplainCard';
import { HistoryView } from '@components/view/HistoryView';

export const HistoryViewSample = () => {
  return (
    <ComponentExplainCard
      title='연혁뷰 (HistoryViewSample)'
      description={
        '연혁을 보여주는 UI 컴포넌트입니다.\nJSON Array 형식의 데이터 입력으로 사용이 가능하고, 반응형 처리되어 있습니다'
      }
    >
      <HistoryView
        className='[&_p_>_br]:hidden lg:[&_p_>_br]:flex'
        data={[
          {
            type: 'year',
            direction: 'left',
            line: false,
            title: '2023',
          },
          {
            type: 'feat',
            direction: 'left',
            month: '04',
            explain: 'if디자인 어워드 건축부분 본상 수상',
          },
          {
            type: 'year',
            direction: 'right',
            line: true,
            title: '2022',
          },
          {
            type: 'feat',
            direction: 'right',
            month: '08',
            explain: '봉안당 2관(본향전) 개관',
          },
          {
            type: 'feat',
            direction: 'right',
            month: '05',
            explain:
              '증축 봉안당 2관(본향전) 건축물 사용 승인\n본향전 안치단 디자인 설계',
          },
          {
            type: 'year',
            direction: 'left',
            line: true,
            title: '2021',
          },
          {
            type: 'feat',
            direction: 'left',
            month: '07',
            explain: '증축 봉안당 2관(본향전) 공사 착공',
          },
          {
            type: 'year',
            direction: 'right',
            line: true,
            title: '2019',
          },
          {
            type: 'feat',
            direction: 'right',
            month: '07',
            explain: '크리스탈 난초, 장미 묘역 개장',
          },
          {
            type: 'year',
            direction: 'left',
            line: true,
            title: '2018',
          },
          {
            type: 'feat',
            direction: 'left',
            month: '08',
            explain: '크리스탈 매화 묘역 개장',
          },
          {
            type: 'year',
            direction: 'right',
            line: true,
            title: '2017',
          },
          {
            type: 'feat',
            direction: 'right',
            month: '02',
            explain: '크리스탈 연꽃 묘역 개장',
          },
          {
            type: 'feat',
            direction: 'right',
            month: '08',
            explain: '수목장 개장',
          },
          {
            type: 'year',
            direction: 'left',
            line: true,
            title: '2015',
          },
          {
            type: 'feat',
            direction: 'left',
            month: '07',
            explain: '준실내 봉안담 크리스탈 공사 시작',
          },
          {
            type: 'feat',
            direction: 'left',
            month: '09',
            explain: '크리스탈 진달래 묘역 개장',
          },
          {
            type: 'year',
            direction: 'right',
            line: true,
            title: '2010',
          },
          {
            type: 'feat',
            direction: 'right',
            month: '04',
            explain: "'뉴스메이커선정' 2010 한국을 이끄는 혁신리더 선정",
          },
          {
            type: 'feat',
            direction: 'right',
            month: '06',
            explain: "'시사투데이선정' 2010 올해의 존경받는 인물 대상",
          },
          {
            type: 'year',
            direction: 'left',
            line: true,
            title: '2009',
          },
          {
            type: 'feat',
            direction: 'left',
            month: '06',
            explain: '건축물 준공 사용 승인',
          },
          {
            type: 'feat',
            direction: 'left',
            month: '07',
            explain: '사설 봉안시설 설치 허가',
          },
          {
            type: 'feat',
            direction: 'left',
            month: '07',
            explain: '개원식',
          },
          {
            type: 'year',
            direction: 'right',
            line: true,
            title: '2008',
          },
          {
            type: 'feat',
            direction: 'right',
            month: '03',
            explain: '토목공사 완공',
          },
          {
            type: 'feat',
            direction: 'right',
            month: '06',
            explain: '재단법인 설립 제2008-01-34호 경기도지사',
          },
          {
            type: 'feat',
            direction: 'right',
            month: '07',
            explain: '봉안당, 봉안담, 주차건물 공사 착공',
          },
          {
            type: 'year',
            direction: 'left',
            line: true,
            title: '2006',
          },
          {
            type: 'feat',
            direction: 'left',
            month: '06',
            explain: '토목공사 착공',
          },
        ]}
      />
    </ComponentExplainCard>
  );
};
