import React from 'react';

import DisciplineCard from './disciplineCard';

function DisciplinesList({ disciplines, onPress, labelButtonAction }) {
  let disciplinesList = disciplines.map((discipline, index) => {

    return (
      <DisciplineCard
        key={index}
        title={discipline.name}
        code={discipline.code}
        classrooms={discipline.discipline_class}
        onPress={onPress}
        labelButtonAction={labelButtonAction}
      />
    );
  });

  return (
    <div style={{ width: '100%' }}>
      {disciplinesList}
    </div>
  )
}

export default DisciplinesList;