import React from 'react';

import DisciplineCard from './disciplineCard';

function DisciplinesList({ disciplines, onPress }) {
  let disciplinesList = disciplines.map((discipline, index) => {
    return (
      <DisciplineCard
        key={index}
        title={discipline.name}
        code={discipline.code}
        classrooms={discipline.discipline_class}
        onPress={onPress}
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