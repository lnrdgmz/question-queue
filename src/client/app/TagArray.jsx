import React from 'react';
import Chip from 'material-ui/Chip';


const TagArray = (props) => {
  const styles = {
    chip: {
      margin: 4,
    },
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  };

  function renderChip(tag, idx) {
    return (
      <Chip
        key={ idx }
        onRequestDelete={
          props.handleTagDelete
          ? () => props.handleTagDelete(tag, props.question)
          : null
        }
        style={ styles.chip }
       >
        { tag }
      </Chip>
    );
  }

  return (
    <div style={ styles.wrapper }>
      { props.tags.map(renderChip) }
    </div>
  );
};

export default TagArray;