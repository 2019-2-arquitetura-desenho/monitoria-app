import React from 'react';

import DisciplineCard from './disciplineCard';

function DisciplinesList({ disciplines, labelButtonAction, action }) {
  let disciplinesList = disciplines.map((discipline, index) => {

    return (
      <DisciplineCard
        key={index}
        title={discipline.name}
        code={discipline.code}
        classrooms={discipline.discipline_class}
        labelButtonAction={labelButtonAction}
        action={action}
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